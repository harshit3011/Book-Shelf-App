import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  Text,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEnvelope, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../util.js";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEnvelope = chakra(FaEnvelope);
const CFaUser = chakra(FaUser);

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const toast = useToast()
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()
const handleSignup=async(e)=>{
    e.preventDefault();
    console.log(signupInfo)
    const { name, username, email, password } = signupInfo;
        if (!name || !username || !email || !password){
            toast({
                title: "Error",
                description: "Please fill the proper credentials",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
    try {
        const res = await fetch("http://localhost:8000/users/signup",{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body : JSON.stringify(signupInfo)
        })
        if (!res.ok) {
                
            toast({
                title: "Error",
                description: "Please fill the proper credentials",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        const data = await res.json()
        localStorage.setItem("user", JSON.stringify(data));
        setTimeout(() => {
            navigate('/home');
        }, 1000);
    } catch (error) {
        handleError(error)
    }
}

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Sign Up</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              bg="blue.900"
              boxShadow="md"
            >
              {/* Name Field */}
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUser color="gray.300" />}
                  />
                  <Input type="text" placeholder="Full Name" required onChange={(e) => setsignupInfo({ ...signupInfo, name: e.target.value })} value={signupInfo.name}/>
                </InputGroup>
              </FormControl>

              {/* Username Field */}
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="text" placeholder="Username" required onChange={(e) => setsignupInfo({ ...signupInfo, username: e.target.value })} value={signupInfo.username}/>
                </InputGroup>
              </FormControl>

              {/* Email Field */}
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaEnvelope color="gray.300" />}
                  />
                  <Input type="email" placeholder="Email address" required onChange={(e) => setsignupInfo({ ...signupInfo, email: e.target.value })} value={signupInfo.email}/>
                </InputGroup>
              </FormControl>

              {/* Password Field */}
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    onChange={(e) => setsignupInfo({ ...signupInfo, password: e.target.value })} value={signupInfo.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowPasswordClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Sign Up Button */}
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleSignup}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box mt={4}>
        <Text color="gray.600">
          Already have an account?{" "}
          <Link color="teal.500" href="/login">
            Login
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
