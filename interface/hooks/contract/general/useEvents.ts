import { useEffect } from "react";
import { useSablierContract } from "../sablier"
import { useRouter } from "next/router";
import toast from "react-hot-toast";

enum EventType {
    CreateStream = "CreateStream",
    WithdrawFromStream = "WithdrawFromStream",
    CancelStream = "CancelStream",
}

const useEvents = () => {
    const sablier = useSablierContract();
    const router = useRouter();

    const handleCreateStreamEvent = () => {
        toast.success('Stream ID successfully created!')
    }
    const handleWithdrawFromStreamEvent = () => {
        toast.success('Withdrawn from stream was successful!')
    }

    const handleCancelStreamEvent = () => {
        toast.success('Stream successfully cancelled!')
    }

    const refreshData = () => {
        sablier?.on(EventType.CreateStream, handleCreateStreamEvent);
        sablier?.on(EventType.WithdrawFromStream, handleWithdrawFromStreamEvent);
        sablier?.on(EventType.CancelStream, handleCancelStreamEvent);
    
        return () => {
            sablier?.off(EventType.CreateStream, handleCreateStreamEvent);
            sablier?.off(EventType.WithdrawFromStream, handleWithdrawFromStreamEvent);
            sablier?.off(EventType.CancelStream, handleCancelStreamEvent);
        }
    }
    
    useEffect(() => {
        refreshData();
    }, [sablier.chainId, router])
};

export default useEvents;