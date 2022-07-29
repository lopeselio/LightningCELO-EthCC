import { ethers } from "ethers"

const useCancelStream = async (sablierContract: ethers.Contract, streamId: number) => {
    const isStreamCancelled = await sablierContract.cancelStream(streamId);
    return isStreamCancelled;
}

export default useCancelStream;