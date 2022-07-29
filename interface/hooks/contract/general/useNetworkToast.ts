import { useEffect, useState } from "react";
import { useNetwork, useDisconnect } from "wagmi";
import toast, { Toast } from "react-hot-toast";
import { useAppDispatch } from "../../../redux/hooks";



const useNetworkToast = () => {
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    // const dispatch = useAppDispatch();
    // const handleSetAccount = (newAccount: string | null) => dispatch(setAccount(newAccount));
    // const disconnect = useDisconnect({ onSuccess() { handleSetAccount(null); } });

    /* const { 
        error,
        activeChain,
        switchNetwork,
    } = useNetwork({
        chainId: 83,
        onMutate(args) {
            console.log('Mutate: ', args)
            //setIsLoading(true);
        },
        onSettled(data, error) {
            console.log('Settled', {data, error})
            //setIsLoading(false);
        }
    });
    
    const toastIfWrongNetwork = () => {
        console.log(`Active chain is: ${activeChain}`);
        if (activeChain && activeChain.id !== 83) {
            toast.error(`Active chain is set to ${activeChain.name}, please change to Celo Testnet (Alfajores)`);
            if (switchNetwork !== undefined) {
                switchNetwork(83);
            }
        }
        if (activeChain && activeChain.id === 83) {
            toast.success('Successfully connected to Celo Testnet (Alfajores)');
        }
        
    }
    
    return {
        toastIfWrongNetwork
    } */
}

export default useNetworkToast;