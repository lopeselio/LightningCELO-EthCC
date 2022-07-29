import { useConnect, useDisconnect } from "wagmi";
import { useAppDispatch } from "../../../redux/hooks";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const useConnectCustom = () => {
    const { 
        error,
        connectors,
    } = useConnect();


    const requireSignIn = () => {
        if (error?.name === "ConnectorNotFoundError") {
            return toast.error("Metamask extension required to sign in")
        }
        if (error) {
            return toast.error('Unknown error')
        }
    }

    useEffect(() => {
        requireSignIn();
    }, []);

    const { data } = useAccount()
    const connect = useConnect({
        connector: connectors[0] || connectors[2] || connectors[1],
    })
    const disconnect = useDisconnect();

    return {
        data, connect, disconnect
    }
}
    
export default useConnectCustom