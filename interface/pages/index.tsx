import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import CreateStreamModal from '../components/CreateStreamModal'
import Header from '../components/Header'
import { Container, Box, Text, Flex, Button, Heading, FormControl, Center, Input, FormHelperText} from '@chakra-ui/react'
import ConnectButton from '../components/ConnectButton'
import { useRouter } from 'next/router'
import { useConnect } from 'wagmi'
import { useAppDispatch } from '../redux/hooks'
import { setId } from '../features/streamInfo/streamInfoSlice'




const Home: NextPage = () => {
  const [streamId, setStreamId] = useState<number>(100000);
  const router = useRouter();

  const { isConnected } = useConnect();

  const handleGetStream = () => {
    router.push({
      pathname: `/stream/${streamId}`
    });
  }

  const Connect =
  <Flex width={"100%"} justifyContent="center" alignItems={"center"} height={"70vh"} flexDir={"column"}>
    <Text display={"block"} mb={"1rem"}>Login to Create your First Stream!</Text>
    <ConnectButton text='Create Stream' />
  </Flex>

  const ConnectedDashboard =
  <Box padding={'2rem 1rem'}>
    <Flex width={'100%'} justifyContent='space-between' mb={3}>
      <Box>
        <Heading size={"lg"}>Dashboard</Heading>
        <Text fontSize={"md"} color={"gray.500"}>Access your stream or create a new one!</Text>
      </Box>
    </Flex>
    <Center>
    <FormControl maxW={"sm"} m={"8rem auto 0"}>
        <Flex>
          <Input 
            id="streamID" type="number" placeholder='Stream ID' mr={"1rem"}
            onChange={(e) => setStreamId(Number(e.target.value))}
          />
          <Button
            size={"md"} p={"0 2rem"} fontSize={"sm"} color={"gray.600"}
            onClick={() => handleGetStream()}
          >Access Stream</Button>
        </Flex>
        <FormHelperText>Input your Stream ID to access your stream!</FormHelperText>
      </FormControl>
    </Center>
    <Center m={"2rem auto"}>
      <Text fontWeight={"bold"} color={"gray.500"}>OR</Text>
    </Center>
    <Center>
      <CreateStreamModal/>
    </Center>
  </Box>

  return (
    <>
      <Head>
        <title>LightningStream</title>
        <meta name="description" content="Stream money on Celo Network!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <Box bg="gray.50" minH={"100vh"} pt={"3rem"}>
        <Container 
          maxW={"container.lg"} bg={'white'} borderWidth={1}
          borderRadius={"md"} height={"70vh"} boxShadow={"lg"}
        >
          {isConnected ? ConnectedDashboard : Connect}
        </Container>
      </Box>
    </>
  )
};




export default Home