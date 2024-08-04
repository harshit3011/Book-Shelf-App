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
  FormHelperText,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  const navigate = useNavigate()
  const [loginInfo,setloginInfo] = useState({
    email:"",
    password:"",
  })

  const handleLogin=async(e)=>{
    e.preventDefault()
    const {email,password} = loginInfo
    if (!email || !password){
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
        const url = `http://localhost:8000/users/login`;
        const res= await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
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
        console.log(res)
        const data = await res.json()
        console.log(data)
        localStorage.setItem('token',data.data.token);
        localStorage.setItem('user',JSON.stringify(data.data))
        localStorage.setItem('loggedInUser', data.data.name);
        setTimeout(() => {
            navigate('/home');
        }, 1000);
        
        
    } catch (error) {
        handleError(error);
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
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              bg="blue.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" onChange={(e) => setloginInfo({ ...loginInfo, email: e.target.value })} value={loginInfo.email}/>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setloginInfo({ ...loginInfo, password: e.target.value })} value={loginInfo.password}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
      <Text color="gray.600">
          New Reader?{" "}
          <Link color="teal.500" href="/signup">
            Sign Up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginPage;
