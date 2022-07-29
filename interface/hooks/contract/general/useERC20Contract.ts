import { ethers } from "ethers";
import ERC20Contract from '../../../../packages/protocol/src/abis/ERC20.json'
import { useSigner, useProvider, useContract } from "wagmi"
import * as wagmi from "wagmi"

const erc20ABI = ERC20Contract.abi;


const useERC20Contract = (erc20Address: string): ethers.Contract => {
    const { data: signer } = useSigner();
    const provider = useProvider();
    const contract = wagmi.useContract({
        addressOrName: erc20Address,
        contractInterface: erc20ABI,
        signerOrProvider: signer || provider
    });
    return contract;
}

export default useERC20Contract;