import React, {useState} from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Flex,
    Box,
    Heading,
    Button,
    VStack,
    useToast,
    Toast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link  from 'next/link';
// import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/navbar';
import { registerUser } from '@/modules/fetch';

const Register = () => {

    const toast = useToast({
      position: 'top'
    })
    // const navigate = useNavigate();
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleRegister = async (data) => {
    
    const {name , email, password, confirmPassword} = data

    try{

      if(password === confirmPassword){
        const res = await registerUser(name, email, password)

        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        //  navigate("/login") 
      } else{
        toast({
          title: "password is not match",
          description: "password is not match. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        
      }
     
    }catch(err){
         toast({
          title: "An error occurred.",
          description: err?.message || "An error occurred. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    }
  }
  return (
    <>
          <Navbar />
          <VStack height="91vh" bgColor="teal">
                <Flex margin="auto" >
                    <Box p={8} width={{base:"200", lg:"500px"}} maxHeight="1000px" borderWidth={1} borderRadius={8} boxShadow="lg" bgColor="white">
                        <Box textAlign="center">
                            <Heading>Register</Heading>
                        </Box>
                        <Box my={4} textAlign="left">
                            <form onSubmit={handleSubmit(handleRegister)} >
                                <FormControl >
                                  <FormLabel>Name</FormLabel>
                                    <Input type="text"{...register('name', { required: true })}/>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" placeholder="test@test.com" {...register('email', { required: true })}/>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" placeholder="*******" {...register('password', { required: true })} />
                                    <FormLabel>Password Confirmation</FormLabel>
                                    <Input type="password" placeholder="*******" {...register('confirmPassword', { required: true })} />
                                </FormControl>
                                <Button width="full" mt={4} type="submit" colorScheme="teal">
                                    Register
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Flex>
            </VStack>
    </>
  )
}

export default Register