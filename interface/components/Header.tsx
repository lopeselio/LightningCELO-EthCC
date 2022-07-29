import React from 'react'
import { Container, Flex, Heading, Wrap, WrapItem, Spacer, Box, Button, Icon, Link as ChakraLink } from '@chakra-ui/react'
import ConnectButton from './ConnectButton'
import Address from './Address'
import Network from './Network'
import lightningCUSD from '../public/icons/lightning.png'
// import useTransak from '../hooks/useTransak'
import walletIcon from "../public/wallet-solid.svg"
import Link from 'next/link'
import Image from 'next/image'

function Header() {
    // const transakAPIkey = process.env.TRANSAK_API_KEY || 'e3217dd8-1d50-44d2-855a-ff99f40bea0c';
    
    return (
        <Box pb={"1rem"} pt={"1rem"} borderBottom={"1px solid"} borderBottomColor={"gray.200"} >
            <Container maxW={'container.lg'}>
                <Flex as="header" justifyContent={"space-between"} alignItems={"center"}>
                    <ChakraLink>
                        <Heading size="md" color={""}>
                            <Image src={lightningCUSD} width="40px" height="40px" />
                            <Link href="/">LightningCELO</Link>
                        </Heading>
                    </ChakraLink>
                    {/* <Button
                        size={"md"} color={"gray.600"} fontSize={"sm"}
                        onClick={() => useTransak(window, transakAPIkey)}
                    >
                        Buy Crypto
                    </Button> */}
                    <Wrap className='Header-left'>
                        <WrapItem>
                            <Network />
                        </WrapItem>
                        <WrapItem>
                            <Address shorten={true} />
                        </WrapItem>
                        <WrapItem>
                            <ConnectButton/>
                        </WrapItem>
                    </Wrap>
                </Flex>
            </Container>
        </Box>
    )
}

export default Header