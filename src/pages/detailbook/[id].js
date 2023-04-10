import React from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { deletebookById, getBookById } from '@/modules/fetch';

const DetailBook = () => {
    
    const router = useRouter()
    const [isLoading, setIsLoading] =useState(true)
    const [book, setBook] = useState(null);
    
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
    
      
      
      if(Cookies.get("token") == undefined){
        setIsLogin(false)
      }else{
        setIsLogin(true)
      }
    },[Cookies.get("token")]);
    
    useEffect(() => {
        
        const fetchDataId = async () =>{

          try {
            const data = await getBookById(router.query.id)
            setBook(data.books)
            console.log(data)
            setIsLoading(false)
          } catch (error) {
            console.log(error)  
          }
            
        }
        fetchDataId()
    }, [router.query.id]);

    const handleDelete = () =>{

       
            
            const deleteData=  async() =>{

                try {
                   const response =await deletebookById(router.query.id)
                
                    router.push("/")
                   
                } catch (err) {
                    console.log(err)
                }
            }
            deleteData()
    }
  return (
    <>
    <Navbar />
    <Box>
      {isLoading ? (
        <Skeleton height="300px" my="6" mx="6" />
      ) : (
        <Flex my="6" mx="6">
          <Box w="300px">
            <Image
              src={`/uploads/${book.image}`}
              width="500"
              height="700"
              alt={book.title}
            />
          </Box>
          <Box ml="8">
            <Heading as="h1" size="lg">
              {book.title}
            </Heading>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              {book.author}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500">
              {book.publisher}
            </Text>
            <Text fontSize="xl" fontWeight="semibold" color="gray.500" mb="4">
              {book.year} | {book.pages} pages
            </Text>
          </Box>
        </Flex>
      )}
      {isLogin && (
        <HStack px="6">
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="red">Delete</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                Are you sure you want to delete this book?
              </PopoverBody>
              <Button onClick={handleDelete}  colorScheme="red">
                Delete
              </Button>
            </PopoverContent>
          </Popover>
          <Link href={`/editbook/${router.query.id}`}>
            <Button>Edit</Button>
          </Link>
        </HStack>
      )}
    </Box>
    
    </>
  )
}

export default DetailBook