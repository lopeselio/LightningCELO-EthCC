import React, { useEffect } from 'react'
import { Button } from "@chakra-ui/react"
import useConnectCustom from '../hooks/contract/general/useConnectCustom'
import toast from 'react-hot-toast'


interface ConnectButtonProps {
    text?: string
}

function ConnectButton({text}: ConnectButtonProps) {
    const { data, connect, disconnect } = useConnectCustom();
    if (data) {
        return (
            <Button fontSize={"sm"} onClick={() => disconnect.disconnect()}>Disconnect</Button>
        )
    }
    return (
        <Button fontSize={"sm"} onClick={() => connect.connect()}>{text ? text : 'Connect Wallet'}</Button>
    )
}



export default ConnectButton