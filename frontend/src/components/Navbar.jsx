import { Button, Container, Flex, HStack, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
// You can use an SVG or an image for the book logo
import { FaBook } from "react-icons/fa"; // Example using a book icon
import AddBook from "./AddBook.jsx";
import { handleSuccess } from "../util.js";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()

  const handleLogout=async(e)=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        handleSuccess('User Loggedout');
        navigate('/login')
  }
  return (
    <>
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
        pt={5}
      >
        <Link to={"/"}>
            <FaBook size={60} /> {/* Book logo */}
          </Link>
        <HStack
          spacing={4}
          alignItems={"center"}
          justifyContent={{
            base: "center",
            sm: "flex-start",
          }}
          width={{ base: "100%", sm: "auto" }}
        >
          

          <Text
            fontSize={{ base: "28", sm: "45" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
            flex={1}
          >
            My Book-Shelf
          </Text>
        </HStack>

        <HStack spacing={2} alignItems={"center"}>
            <Button onClick={onOpen}>
              <PlusSquareIcon fontSize={20} />
            </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
          <Button onClick={handleLogout}>
            <FiLogOut size={20} />
          </Button>
        </HStack>
      </Flex>
    </Container>
    <AddBook isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Navbar;
