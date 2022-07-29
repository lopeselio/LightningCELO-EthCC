import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useConnect, useNetwork } from 'wagmi'
import { Text } from '@chakra-ui/react';
import { getChainIcon } from '../helpers';
import Image from 'next/image';

function Network() {
    const { activeChain } = useNetwork();
    const { isConnected } = useConnect();

    const icon = getChainIcon(activeChain);
    
    if (isConnected === false || !activeChain) return <></>
    return (
        <>
            {activeChain ? 
            <Box borderWidth={1} borderRadius='md' height={"40px"} display={"flex"} width={"max"} alignItems={"center"} p={"0 0.75rem"}>
                { icon ? <Image src={icon} width={"24px"} height={"24px"}/> : ''}
                <Text ml={icon ? "0.5rem" : "0rem"}>{activeChain.name}</Text>
            </Box> : ''
            }
        </>
        
    )
}

export default Network