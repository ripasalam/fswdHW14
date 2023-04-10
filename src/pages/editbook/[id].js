import Navbar from "@/components/navbar"
import BookForm from "@/components/BookForm"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getBookById } from "@/modules/fetch";
const EditBook = () => {
    const router = useRouter();
    const [book, setBook] = useState(null);

    
     useEffect(() => {
        
        const fetchDataId = async () =>{

            const data = await getBookById(router.query.id)
            setBook(data.books) 
        }
        fetchDataId()
    }, [router.query.id]);
  return (
    <>
     <Navbar />
      <BookForm bookData = {book}  />
      
    </>
  )
}

export default EditBook
