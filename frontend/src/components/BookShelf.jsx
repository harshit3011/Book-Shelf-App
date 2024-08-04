// Bookshelf.js

import React, { useEffect, useState } from "react";
import { Grid, Box, Heading } from "@chakra-ui/react"; // Assuming BookCard is in the same directory
import Navbar from "./Navbar.jsx";
import BookCard from "./Bookcard.jsx";

const Bookshelf = () => {
    const [loggedInUser,setLoggedInUser] = useState("")
    const [bookData, setBookData] = useState({})
    const [length,setLength] = useState(0)
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const fetchBooks= async()=>{
        try {
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }  
          const res = await fetch("http://localhost:8000/books/getbooks",headers)
          console.log(res)
          console.log(localStorage.getItem('user'))
          const data = await res.json()
          console.log(data)
          setBookData(data)
          setLength(data.data.length)
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        fetchBooks()
    },[])
    if(length===0){
        return (
            <>
            <Navbar></Navbar>
            <Heading pt={10} size="lg" textAlign={"center"}>Oops! No books! You gotta add some</Heading>
            </>
        )
    }
  return (
    <>
            <Navbar />
            <Box p={12}>
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)", // 1 column on small screens
                        sm: "repeat(2, 1fr)",  // 2 columns on small-medium screens
                        md: "repeat(3, 1fr)",  // 3 columns on medium screens
                        lg: "repeat(4, 1fr)",  // 4 columns on large screens
                    }}
                    gap={6}
                >
                    {bookData.data.map((book) => (
                        <BookCard
                            key={book._id}
                            title={book.title}
                            author={book.author}
                            image={book.image}
                            bookId={book._id}
                        />
                    ))}
                </Grid>
            </Box>
        </>
  );
};

export default Bookshelf;
