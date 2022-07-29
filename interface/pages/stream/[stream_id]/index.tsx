import React, { useEffect, useState } from 'react'
import type {GetServerSideProps, NextPage} from "next";
import { useBalanceOf, useGetStream } from '../../../hooks/contract/sablier';
import { useSablierContract, useWithdrawFromStream, useCancelStream } from '../../../hooks/contract/sablier'
import { IStreamInfo, IStreamInfoRaw, IFullStreamInfo } from '../../../hooks/contract/sablier/useGetStream';
import Head from 'next/head'
import Header from '../../../components/Header';
import { Box, Container, Flex, Heading, Progress, Text, Link as ChakraLink, Button, Alert,
AlertIcon, AlertTitle, AlertDescription, Spinner, Center, Tooltip } from '@chakra-ui/react'
import Address from '../../../components/Address'
import { convertFromUnix, shortenAddress } from "../../../helpers/index"
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAccount, useConnect } from 'wagmi';
import { BigNumber } from 'ethers';
import { formatUnits, parseEther } from 'ethers/lib/utils';
import { CELO_TESTNET_COINS } from '../../../constants';
import CUSD from '../../../public/icons/currency/CUSD.png'
import Image from 'next/image'

interface StreamIdPageProps {
    streamId: number
}


const StreamIdPage: NextPage = ({streamId} : StreamIdPageProps) => {
    const [isStreamExists, setIsStreamExists] = useState<boolean>(true);
    const [isStreamWithdrawn, setIsStreamWithdrawn] = useState<boolean>(false);

    const [streamInfo, setStreamInfo] = useState<IFullStreamInfo>();
    const [recipientRawBal, setRecipientRawBal] = useState<BigNumber>();


    const { isConnected } = useConnect();
    const { data: accountData } = useAccount()
    
    const sablier = useSablierContract();
    const nowDate = new Date().getTime();
    const endDate = convertFromUnix(streamInfo?.stopTime);

    console.log(streamInfo)

    const handleStreamInfo = async () => {
        const rawInfo = await useGetStream(
            sablier, Number(streamId), false
        ).catch((err) => {
            if (err) {
                return setIsStreamExists(false)
            }
        });

        if (isStreamExists === false) return;
        if (!rawInfo) return;

        const recipientBal = await useBalanceOf(
            sablier,
            Number(streamId),
            rawInfo?.recipient,
        );
        setRecipientRawBal(recipientBal);
        const senderBal = await useBalanceOf(
            sablier,
            Number(streamId),
            rawInfo?.sender,
        );
        const recipientFormatBal = formatUnits(recipientBal);
        const senderFormatBal = formatUnits(senderBal)
        console.log(recipientFormatBal, senderFormatBal)
        const fullInfo = await useGetStream(
            sablier,
            Number(streamId),
            true,
            recipientFormatBal,
            senderFormatBal,
        );
        setStreamInfo(fullInfo);
    }


    const handleWithdrawFromStream = async () => {
        toast(`Initiating a withdrawal`);
        if (streamInfo?.recipientBalance === undefined) return toast.error('Error during withdraw');
        const amount = recipientRawBal!
        const isWithdrawSuccessful = await useWithdrawFromStream(
            sablier, Number(streamId), amount
        );
        if (isWithdrawSuccessful) {
            toast(`Withrawing ${streamInfo?.recipientBalance} CUSD...`);
            if (streamInfo?.streamedPerc > 99 && nowDate > (streamInfo?.stopTime)) {
                setIsStreamWithdrawn(true);
            }
        } else {
            toast(`Withdraw failed`);
        }
    }

    const handleCancelStream = async () => {
        const isStreamCancelled = await useCancelStream(sablier, Number(streamId));
        if (!isStreamCancelled) toast.error('Error, something went wrong :/')
        if (isStreamCancelled) toast.success('Stream succesfully cancelled!');
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isStreamExists && !isStreamWithdrawn) {
                handleStreamInfo();
            }
        }, 1000);
        return () => clearInterval(intervalId)
    }, []);

    
    const LoadDashboard =
    <>
        <Heading size="md" mt={"1rem"}>Stream is loading...</Heading>
        <Center mt={"3rem"} mb={"1rem"}>
            <Spinner
                color='gray.500' speed='0.75s' size='xl' height={"10rem"} width={"10rem"} thickness={"1rem"}
             />
        </Center>
    </>

    const FailDashboard =
    <>
        <Alert status="error" mt={"1.5rem"} borderRadius={"md"}>
            <AlertIcon/>
            <AlertTitle>Stream Id haven't found.</AlertTitle>
            <AlertDescription>Make sure you are Celo testnet. Go back to homepage and try again.</AlertDescription>
        </Alert>
    </>

    const SuccessDashboard =
    <>
        <Alert status='success' mt={"1.5rem"}>
            <AlertIcon/>
            <AlertTitle>Successfully withdrawn all tokens.</AlertTitle>
        </Alert>
        <Alert status="warning" mt={"1rem"} borderRadius={"md"}>
            <AlertIcon/>
            <AlertTitle>Stream and Stream ID will be deleted shortly.</AlertTitle>
        </Alert>
    </>

    const Dashboard =
    <>
        <Flex mt={"2rem"} alignItems={"center"}>
            <Text mr={"1rem"} width={"3rem"}>From:</Text>
            <Address avatarSize={24} address={streamInfo?.sender} shorten={false} display={false}/>
        </Flex>
        <Flex mt={"0.5rem"} alignItems={"center"}>
            <Text mr={"1rem"} width={"3rem"}>To:</Text>
            <Address avatarSize={24} address={streamInfo?.recipient} shorten={false} display={false}/>
        </Flex>
        <Flex mt={"3rem"} alignItems={"center"} justifyContent="center">
            
            <Image width={"28px"} height={"28px"} src={CUSD} />
            <Heading ml={"0.25rem"} size={"lg"} color={"gray.700"}>
                {Number(streamInfo?.streamed)} CUSD /&nbsp;
            </Heading>
            
            
            <Image width={"28px"} height={"28px"} src={CUSD} />
            <Heading ml={"0.25rem"} size={"lg"} color={"gray.700"}>
                {Number(streamInfo?.withdrawable)} CUSD
            </Heading>
        </Flex>
        <Flex justifyContent={"center"}>
            <Text color={"gray.500"}>Total Amount / Withdrawable</Text>
        </Flex>
        {/* <Flex justifyContent={"center"}>Total streamed / Withdrawable</Flex> */}
        
        <Flex mt={"1rem"} justifyContent={"space-between"} alignItems={"center"}>
            <Text width={"8rem"} display={"block"}>Total: </Text>
            <Progress borderRadius={"md"} width={"100%"} value={streamInfo?.streamedPerc} height={"1.5rem"} hasStripe colorScheme={'purple'} isAnimated={true} />
        </Flex> 
        <Flex mt={"1rem"} justifyContent={"space-between"} alignItems={"center"}>
            <Text width={"8rem"} display={"block"}>Withdrawable: </Text>
            <Progress borderRadius={"md"} width={"100%"} value={streamInfo?.withdrawablePerc} height={"1.5rem"} hasStripe colorScheme={'blue'} isAnimated={true} />
        </Flex>
        <Heading size={"sm"} mt={"3rem"} textAlign={"center"} color={"gray.700"}>
            {shortenAddress(streamInfo?.recipient)}
            &nbsp;has a balance of {Number(streamInfo?.recipientBalance)}&nbsp;CUSD
            </Heading>
        <Flex m={"1rem 0 3rem"} gap={"1rem"} alignItems="center" justifyContent={"center"}>
            <Button colorScheme={"purple"} onClick={() => handleWithdrawFromStream()}>
                Withdraw
            </Button>
            <Button colorScheme={"red"} onClick={() => handleCancelStream()}>
                Cancel
            </Button>
        </Flex>
        <Box m={"3rem auto 0"} borderRadius={"md"} width={"12rem"} bgColor={"gray.100"} p={"1rem"}>
            <Text textAlign={"center"}>
                {(nowDate >= (streamInfo?.stopTime))
                    ? <Text fontWeight={"bold"}>Stream ended on:</Text>
                    : <Text fontWeight={"bold"}>Stream will end on:</Text>
                }
                    {endDate}
                </Text>
        </Box>
    </>

    
    const displayDashboard = () => {
        if (isStreamExists) {
            if (streamInfo) return Dashboard;
            if (!streamInfo) return LoadDashboard;
        }
        if (isStreamWithdrawn) return SuccessDashboard;
        if (!isStreamExists) return FailDashboard;
    }
    return (
        <>
        <Head>
            <title>LightningStream - {streamId} stream</title>
            <meta name="description" content="Stream money on Celo Network!" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Header />
        <Box bg="gray.50" minH={"100vh"} pt={"3rem"}>
            <Container 
                maxW={"container.lg"} bg={'white'} borderWidth={1} p={"2rem"}
                borderRadius={"md"} height={"max"} boxShadow={"xl"}
            >
                <ChakraLink color={"gray.500"}>
                    <Link href="/">
                        Back to homepage
                    </Link>
                </ChakraLink>
                <Heading size={"lg"} color={"gray.700"}>Stream #{streamId}</Heading>
                {displayDashboard()}
            </Container>
        </Box>
        </>
    )
}

export default StreamIdPage;


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;
    const streamId = Number(params!.streamId);


    return {
        props: {
            streamId
        }
    }
}