import {
    CELO, CUSD
} from '../public/icons/currency'

const CELO_TESTNET_COINS = [
    {
        name: 'Celo',
        display: CELO,
        symbol: 'CELO',
        address: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9'
    },
    {
        name: 'Celo Dollar',
        display: CUSD,
        symbol: 'CUSD',
        address: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'
    }
]
    





export {
    CELO_TESTNET_COINS,
}

export type ICeloTestnetCoins = typeof CELO_TESTNET_COINS;
