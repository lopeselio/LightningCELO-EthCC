import React, { useEffect, useState } from 'react'
import { useSablierContract, useCreateStream, useGetNextStreamId } from "../hooks/contract/sablier"
import { useERC20Contract, useNetworkToast } from "../hooks/contract/general"
import { Button, Input, Select, Box, FormControl, FormLabel, useDisclosure, chakra } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { shortenAddress } from "../helpers/index"
import { toast } from "react-hot-toast"
import { CELO_TESTNET_COINS } from '../constants';
import Image from 'next/image' 
import { useRouter } from 'next/router';
import { nanoid } from '@reduxjs/toolkit'
interface CreateStreamModalProps {
  
}
interface IStableCoins {
    [key: string]: string
}

function CreateStreamModal({}: CreateStreamModalProps) {
    const [recipient, setRecipient] = useState<string>('');
    const [tokenAddress, setTokenAddress] = useState<string>('0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1');
    const [amountToStream, setAmountToStream] = useState<number>(0);
    const [stopTime, setStopTime] = useState<number>(0);
    const [nextStreamId, setNextStreamId] = useState<number>(100000);

    const router = useRouter();
    const sablier = useSablierContract();
    const erc20 = useERC20Contract(tokenAddress);

    const { isOpen, onOpen, onClose } = useDisclosure();

    
    const shortRecipient = shortenAddress(recipient);


    const handleCreateStream = async () => {
        const id = await useGetNextStreamId(sablier);
        setNextStreamId(id);
        const startTime = Math.round((new Date().getTime() / 1000) + 60);
        const createStream = await useCreateStream(
          sablier, erc20, recipient, amountToStream,
          tokenAddress, startTime, stopTime
        ).then(() => {
            toast.success(`Stream id created: ${id}
            Please save your stream ID so you can access your stream later!`, {
                duration: 10000
            });
            toast(`After a few seconds the app will navigate to your stream page`, {
                duration: 10000
            });
            setTimeout(() => {
                router.push(`/stream/${id}`);
            }, 10000)
        });
    }

    const handleTokenChange = (symbol: string) => {
        const token = CELO_TESTNET_COINS.find((coin) => coin.symbol === symbol);
        const address = token?.address;
        address ? setTokenAddress(address) : '';
    }

    const handleTimeChange = (whatTime: 'stop' | 'start', time: string) => {
        const unixTime = (new Date(time).getTime() / 1000);
        if (whatTime === 'stop') setStopTime(unixTime);
    }

    useEffect(() => {
        async () => {
            const id = await useGetNextStreamId(sablier);
            setNextStreamId(id);
        };
    }, [])


    const CreateStreamModal = 
    <Box className='CreateStreamModal'>
        <FormControl display={"block"} mb={"1rem"} className="CreateStreamModal-recipient">
            <FormLabel className="CreateStreamModal-label" htmlFor="recipient">
                What address do you want stream to?
            </FormLabel>
            <Input className="CreateStreamModal-input" display={"flex"} alignItems={"center"} 
                type="text" id="recipient" name="recipient" required placeholder='Enter a Celo Address'
                onChange={(e) => setRecipient(e.target.value)} value={recipient}
            />
            
        </FormControl>
        <FormControl display={"block"} mb={"1rem"} className="CreateStreamModal-token">
            <FormLabel className="CreateStreamModal-label" htmlFor="token">
                What token do you want to use?
            </FormLabel>
            <Select className='CreateStreamModal-input' display={"flex"} alignItems={"center"}
                name="token" id="token" onChange={(e) => handleTokenChange(e.target.value)}>
                {CELO_TESTNET_COINS.map((coin) => {
                    return <chakra.option key={nanoid()} value={coin.symbol} display={"flex"} alignItems={"center"}>
                        {coin.symbol} - ({coin.name})
                    </chakra.option>
                })}
            </Select>
        </FormControl>
        <FormControl display={"block"} mb={"1rem"} className="CreateStreamModal-amount">
            <FormLabel className="CreateStreamModal-label" htmlFor="amount">
                How much do you want to stream?
            </FormLabel>
            <Input className="CreateStreamModal-input" display={"flex"} alignItems={"center"}
                type="number" id="amount" name="amount" placeholder='Amount to stream'
                onChange={(e) => setAmountToStream(Number(e.target.value))}
            />
        </FormControl>
        <FormControl display={"block"} mb={"1rem"} className="CreateStreamModal-stopTime">
            <FormLabel className="CreateStreamModal-label" htmlFor="stopTime">
                When should the stream end?
            </FormLabel>
            <Input className="CreateStreamModal-input" display={"flex"} alignItems={"center"} 
                type="datetime-local" id="stopTime" name="stopTime"
                onChange={(e) => handleTimeChange('stop', e.target.value)}
            />
        </FormControl>
    </Box>
 
    return (
        <Box>
            {/* <Center className='Modal-tapText' mb={'0.5rem'} display={'block'}>Tap the button to create your first stream!</Center> */}
            <Button bg='#5D6BE8' color='gray.100' _hover={{ bg: '#4151E8'}} onClick={onOpen} className='Modal-tapButton'>Create Stream</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent mt={"15vh"}>
                    <ModalHeader className='Modal-header'>Create Stream</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {CreateStreamModal}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            bg='#5D6BE8' color='gray.100'
                            _hover={{ bg: '#4151E8'}}
                            disabled={!recipient ? true : false}
                            onClick={() => {handleCreateStream(); onClose();}}>
                            {recipient ? `Send Stream to ${shortRecipient}` : 'Send Stream'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}




export default CreateStreamModal;