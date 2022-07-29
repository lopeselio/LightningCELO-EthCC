import { ethers } from "ethers"
import SablierContract from '../../../../packages/protocol/src/abis/Sablier.json'
import * as wagmi from "wagmi"
import { useSigner, useProvider } from "wagmi"


const contractAddress = process.env.SABLIER_CONTRACT_ADDRESS || '0x671580C2d0e99Bb17690B5D4D805F1902d26f5b0';
const contractABI = SablierContract.abi;

interface ExtendedContract {
    contract: ethers.Contract
    chainId: string | undefined
}



const useSablierContract = (): ethers.Contract => {
    const { data: signer } = useSigner();
    const provider = useProvider();
    const contract = wagmi.useContract({
        addressOrName: contractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer || provider
    });
    return contract;
}

const useSablierContractWithInfo = (): ExtendedContract => {
    const { data: signer } = useSigner();
    const provider = useProvider();
    const contract = wagmi.useContract({
        addressOrName: contractAddress,
        contractInterface: contractABI,
        signerOrProvider: signer || provider
    });
    return {
        contract,
        chainId: contract.provider.network?.chainId
    };
}




export default useSablierContract;
export { useSablierContractWithInfo }