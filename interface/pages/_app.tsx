import type { AppProps } from 'next/app'

import { Provider as ReduxProvider } from 'react-redux'
import store from '../redux/store'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'
import { WagmiConfig } from "wagmi"
import client from "../helpers/client"



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig  client={client}>
      <ReduxProvider store={store}>
        <ChakraProvider>
            <Toaster />
            <Component {...pageProps} />
        </ChakraProvider>
      </ReduxProvider>
    </WagmiConfig>
  )
}

export default MyApp