import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Books from '@/components/Books'
import Navbar from '@/components/navbar'
const inter = Inter({ subsets: ['latin'] })
import { useState, useEffect } from 'react'
import { getAllBook } from '../modules/fetch'
import { Container, Flex } from '@chakra-ui/react'

export default function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const {books} = await getAllBook();
      setBooks(books);
    };
    fetchBooks();
  }, []);
  console.log(books)
  return (
    <>
    <Navbar />
    <Container maxW='container.xl' pt={10}>
      <Flex flexWrap='wrap'>
          {books !== null &&
          books?.map ((book)=>(
            <Books key={`${book.id} ${book.title} `}{...book}/>
          ))}
      </Flex>
    </Container>
   
    
    

    </>
  )
}
