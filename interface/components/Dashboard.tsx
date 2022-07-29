import React, { useState } from 'react'
import { Button, Flex, Heading, Text, Spacer, Box, Center, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Container } from '@chakra-ui/react'
import CreateStreamModal from './CreateStreamModal';
import { NextRouter, useRouter } from 'next/router';
import { useAppDispatch } from '../redux/hooks';
import { setId } from '../features/streamInfo/streamInfoSlice';


function Dashboard() {
  const [streamId, setStreamId] = useState<number>(100000);
  
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleGetStream = async () => {
    dispatch(setId(streamId));
    router.push({
      pathname: `/stream/${streamId}`
    });
  }

  return (
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
  )
}


export default Dashboard;