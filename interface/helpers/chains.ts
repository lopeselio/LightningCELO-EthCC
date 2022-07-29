import { Chain } from "wagmi"

const celoTestnetChain: Chain = {
    network: '',
    id: 44787,
    name: 'Alfajores',
    nativeCurrency: {
      name: 'Celo',
      symbol: 'CELO',
      decimals: 18,
    },
    rpcUrls: {
      default: "https://alfajores-forno.celo-testnet.org",
    },
    blockExplorers: {
      default: { name: "Alfajores Celo Explorer", url: "https://alfajores-blockscout.celo-testnet.org/"},
      celo_explorer: { name: "Alfajores Celo Explorer", url: "https://alfajores-blockscout.celo-testnet.org/"}
    },
    testnet: true
}


export { celoTestnetChain };