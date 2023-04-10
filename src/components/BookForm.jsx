import React from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createBook, updateBookById } from '@/modules/fetch';


const BookForm = (bookData) =>{

     const data = bookData

     const book = data.bookData

    //  console.log(book)

    const [selectedImage, setSelectedImage] = useState(null)

    const toast = useToast({
        position : "top"
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedImage){
            toast({
                title: "Error",
                description: "Please select image",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        const formData = new FormData(e.target)   

        const title = formData.get("title")
        const author = formData.get("author")
        const publisher = formData.get("publisher")
        const year = parseInt(formData.get("year"))
        const pages = parseInt(formData.get("pages"))
        const id = book.id
        
        if(book){
            
            try {
                 const res = await updateBookById (id, title, author, publisher, year, pages)
                    toast({
                    title: "Success",
                    description: "Updated Book successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    });
                
            } catch (err) {
                console.log(err)
                // toast({
                //     title: "Error",
                //     description: err || "Something went wrong",
                //     status: "error",
                //     duration: 5000,
                //     isClosable: true,
                // });                
            }
            return;
        } 
        try {
                const books = await createBook(formData)
                e.target.reset();
                toast({
                    title: "Success",
                    description: "Book created successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                setSelectedImage(""); 
        } catch (err) {
            console.log(err)
            toast({
                title: "Error",
                description: err || "Something went wrong",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

        

       
    }

    useEffect(() => {
    if (book?.image) {
      setSelectedImage(book?.image);
    }
  }, [book]);
    return (
        <>
        <form onSubmit={handleSubmit}>
        <VStack spacing={4} m={10}>
            <FormControl>
            <FormLabel>Title</FormLabel>
            <Input name="title" defaultValue={book?.title} required  />
            </FormControl>
            <FormControl>
            <FormLabel>Author</FormLabel>
            <Input name="author" defaultValue={book?.author} required  />
            </FormControl>
            <FormControl>
            <FormLabel>Publisher</FormLabel>
            <Input name="publisher" defaultValue={book?.publisher} required  />
            </FormControl>
            <FormControl>
            <FormLabel>Year</FormLabel>
            <Input
                name="year"
                type="number"
                required
                defaultValue={book?.year}
            />
            </FormControl>
            <FormControl>
            <FormLabel>Pages</FormLabel>
            <Input
                name="pages"
                type="number"
                required
                defaultValue={book?.pages}
            />
            </FormControl>
            {selectedImage && (
            <Image width="64" height="70" src={`/uploads/${selectedImage}`} alt="Selected Image" />
            )}
        
            <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                }}
                />
            </FormControl>
            <Button type="submit">{book ? "Edit Book" : "Create Book"}</Button>
        </VStack>
        </form>
        </>
    )
}

export default BookForm
