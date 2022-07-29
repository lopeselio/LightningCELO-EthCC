import { Chain } from 'wagmi';
import {
    celo
} from '../public/icons/chains'

type IActiveChain = 
(Chain & {
    id: number;
    unsupported?: boolean | undefined;
}) | undefined  


const getChainIcon = (activeChain: IActiveChain) => {
    if (!activeChain) return;
    if (activeChain.id === 44787) return celo;
    return;
}

export default getChainIcon