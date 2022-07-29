import { BigNumber, ethers } from "ethers"
import { formatUnits } from "ethers/lib/utils"

/* export const formatBalance = (balance: any) => {
    let formattedBalance: any = ethers.utils.formatEther(balance)
    formattedBalance = Math.ceil(formattedBalance * 1e4) / 1e4
    return formattedBalance;
} */

const useBalanceOf = async (
    sablierContract: ethers.Contract,
    streamId: number,
    address: string,
): Promise<BigNumber> => {
    const unformatted: BigNumber = await sablierContract.balanceOf(streamId, address);
    return unformatted;
}

export default useBalanceOf;