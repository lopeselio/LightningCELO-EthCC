import { ethers } from "ethers"

const useDeltaOf = async (sablierContract: ethers.Contract, streamId: number) => {
    const delta = await sablierContract.deltaOf(streamId);
    return delta.toBigInt();
}

export default useDeltaOf;