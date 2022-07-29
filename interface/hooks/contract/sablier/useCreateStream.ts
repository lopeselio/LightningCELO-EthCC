import { ethers, BigNumber } from "ethers"
import { parseEther } from "ethers/lib/utils"

// HELPERS
const calculateFinalWeiDeposit = (
    ethDeposit: number, startTime: number, stopTime: number
) => {
    /**
   * @notice The contract reverts if deposit is not multiple of time delta.
   * That means we may not use exact amounts like 1000.
   * Thus we have to stream a value that is very close to the fixed deposit, but not it.
   */
    const timeDelta = stopTime - startTime;
    const initialDeposit = parseEther(`${ethDeposit}`);
    const depositDelta = initialDeposit.div(timeDelta);
    const remainder = initialDeposit.mod(depositDelta);
    const finalDeposit = initialDeposit.sub(remainder);
    return finalDeposit
}

const approveERC20 = async (
    erc20Contract: ethers.Contract,
    sablierContract: ethers.Contract,
    finalWeiDeposit: BigNumber
) => {
    const approveTx = await erc20Contract.approve(sablierContract.address, finalWeiDeposit);
    await approveTx.wait()
}

// ACTUAL HOOK
const useCreateStream = async (
    sablierContract: ethers.Contract,
    erc20Contract: ethers.Contract,
    recipient: string,
    initialEthDeposit: number,
    tokenAddress: string,
    startTime: number,
    stopTime: number,
): Promise<number> => {
    // 1. Calculate Final Wei Deposit
    const finalWeiDeposit = calculateFinalWeiDeposit(initialEthDeposit, startTime, stopTime);
    // 2. Approve Wei Deposit
    const approveTx = await approveERC20(erc20Contract, sablierContract, finalWeiDeposit);
    
    // 3. Finally Create Stream by Calling the Contract
    const createStream = await sablierContract.createStream(
        recipient,
        finalWeiDeposit,
        tokenAddress,
        startTime,
        stopTime,
    );
    const streamId = createStream.wait()
    return streamId;
}

export default useCreateStream;