// AddBook.js

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";

const AddBook = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    if(!title || !author){
        toast({
            title: "Error",
            description: "Title & Author are required",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          onClose()
          return
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id; // Extract user ID
    console.log(userId)
    try {
      const res = await fetch("http://localhost:8000/books/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          title: title,
          author: author,
          image: imageUrl || "",
          bookOf: userId, // Add the bookOf field
        }),
      });
      console.log(res)
      if (res.ok) {
      // Display success message
      toast({
        title: "Book Added",
        description: "Your book has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Clear form fields
      setTitle("");
      setAuthor("");
      setImageUrl("");
      onClose();
    }
    else{
        toast({
            title: "Error",
            description: "Error while adding a book",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
    }
    } catch (error) {
      // Display error message
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setTitle("");
      setAuthor("");
      setImageUrl("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Book Title"
                />
              </FormControl>
              <FormControl id="author" isRequired>
                <FormLabel>Author</FormLabel>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author's Name"
                />
              </FormControl>
              <FormControl id="imageUrl">
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="URL to Book Cover Image"
                />
              </FormControl>
            </Stack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add Book
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddBook;
