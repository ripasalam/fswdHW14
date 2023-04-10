import { instance } from "../axios";


const registerUser = async (name, email, password) =>{

 
  try {
    const response = await instance.post("/register", {name, email, password})
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}

const loginUser = async(email, password) =>{

  try {
    const response = await instance.post("/login",{email, password})
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}
const createBook = async (formData) =>{
    try {
      
    const response = await instance.post('/books', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
    
}

const getAllBook = async()=>{

    try {
        const response = await instance.get('/books')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
    
}

const getBookById = async (id) =>{
    try {
      const response = await instance.get(`/books/${id}`)
      return response.data
    } catch (error) {
       throw new Error(error.response.data.message || 'Something went wrong');
      
    }
    
}

const updateBookById = async (id, title, author, publisher, year, pages)=> {
  try {
    
    const response = await instance.put(`/books/${id}`, {title, author, publisher, year, pages}, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message || 'Something went wrong');
  }
}
const deletebookById = async (id) =>{
  try {
     const response = await instance.delete(`/books/${id}`)
     return response.data
  } catch (error) {
     throw new Error(error.response.data.message || 'Something went wrong');
  }
 
}
export  {loginUser, registerUser, getAllBook, createBook, getBookById, updateBookById ,deletebookById}