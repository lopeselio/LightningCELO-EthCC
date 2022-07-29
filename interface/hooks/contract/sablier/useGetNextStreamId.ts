import { ethers } from "ethers"
import { useAppDispatch } from "../../../redux/hooks";
import { useNetworkToast } from "../general";
import { setId } from "../../../features/streamInfo/streamInfoSlice";

const useGetNextStreamId = async (
    sablierContract: ethers.Contract
    ): Promise<number> => 
{
    // INVALID HOOK: SEE RULES OF HOOKS: no hook in hook you fuckin hook!
    // const { activeChain } = useNetworkToast();
    // const dispatch = useAppDispatch();
    //if (activeChain?.id === 82) { dispatch(setId(nextStreamId)); }
    const nextStreamId = await sablierContract.nextStreamId();
    return Number(nextStreamId);
}

export default useGetNextStreamId;