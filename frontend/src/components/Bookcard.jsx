// BookCard.jsx

import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  Button,
  Text,
  Image,
  Checkbox,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

const BookCard = ({ title, author, image,bookId }) => {
  const [isRead, setIsRead] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const toast = useToast()

  // Handler for the delete button
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/books/${bookId}`, {
        method: "DELETE",
        headers: {
          "Authorization": localStorage.getItem('token'),
        },
      });

      if (res.ok) {
        toast({
          title: "Book deleted",
          description: "Your book has been deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        setIsDeleted(true);
        // Refresh the book list after successful deletion
      } else {
        // Handle error
        toast({
          title: "Error",
          description: "Error while deleting",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Error while deleting",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      console.error("Error deleting book:", error);
    }
  };

  // Early return if the card is deleted
  if (isDeleted) return null;

  return (
    <Card maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <CardBody>
        <Image
          src={image} // Use the image URL passed as a prop
          alt={title}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"}>
            {title} {/* Use the title passed as a prop */}
          </Heading>
          <Text
            color="blue.300"
            fontSize="xl"
            textAlign={"center"}
            fontWeight={"bold"}
          >
            Author: {author} {/* Use the author passed as a prop */}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <HStack justifyContent="space-between" width="100%">
          <Checkbox
            colorScheme="blue"
            isChecked={isRead}
            onChange={(e) => setIsRead(e.target.checked)}
          >
            Read Already
          </Checkbox>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={handleDelete}
            leftIcon={<FiTrash2 />}
          >
            Delete
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
