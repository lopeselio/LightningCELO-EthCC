import { BigNumber, ethers } from "ethers"

const useWithdrawFromStream = async (
    sablierContract: ethers.Contract,
    streamId: number,
    amount: BigNumber
) => {
    const isWithdrawSuccessful = await sablierContract.
        withdrawFromStream(streamId, amount)
    return isWithdrawSuccessful;
}

export default useWithdrawFromStream;