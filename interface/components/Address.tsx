import React from 'react'
import { useAppSelector } from '../redux/hooks'
import { RootState } from '../redux/store';
import { Center, Box } from '@chakra-ui/react';
import Davatar from '@davatar/react'
import { shortenAddress } from '../helpers';
import { useAccount, useConnect } from 'wagmi';

interface AddressProps {
    display?: boolean
    address?: string,
    shorten: boolean,
    avatarSize?: number,
}

function Address({address, shorten, avatarSize, display}: AddressProps) {
    const { isConnected } = useConnect();
    const { data } = useAccount();
    
    const account = data?.address;

    const addressCond = address ? address : account
    const addressShort = shorten ? shortenAddress(addressCond!) : addressCond;
    const AddressJSX = 
        <Box borderWidth={1} borderRadius='md' height={"40px"} display={"flex"} width={"max"} alignItems={"center"} p={"0 0.75rem"}>
            <Davatar
                size={avatarSize ? avatarSize : 24} 
                address={addressCond!}
                generatedAvatarType='jazzicon'
            />
            <Center ml={"0.5rem"}>
                {addressShort}
            </Center>
        </Box>
    if (display === false && (!address)) return <></>;
    if (isConnected === false && (!address)) return <></>
    return (
        <>
            { account || address ? AddressJSX: ''}
        </>
    )
}


export default Address