import { celoTestnetChain } from "./chains"
import { configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public"
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const defaultChains = [celoTestnetChain];
const defaultChain = celoTestnetChain

const { chains } = configureChains(defaultChains, [
    publicProvider()
]);

const client = createClient({
    autoConnect: true,
    connectors({ chainId }) {
        const chain = defaultChain;
        const rpcUrl = chain.rpcUrls.default;
        return [
            new MetaMaskConnector({ chains }),
            new WalletConnectConnector({
                chains,
                options: {
                    qrcode: true,
                    rpc: { [chain.id]: rpcUrl },
                }
            }),
            new InjectedConnector({
                chains,
                options: {
                    name: 'Injected',
                    shimDisconnect: true
                }
            })
        ]
    }
})

export default client;