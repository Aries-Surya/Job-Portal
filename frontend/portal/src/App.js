import { useEffect, useState } from "react";
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
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function getCookie(name) {
  console.log(document.cookie)
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  console.log(parts, "Adfdf")
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const handleShowClick = () => setShowPassword(!showPassword);
  const history = useNavigate()
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const cookie = localStorage.getItem("job_cookie");
    setLoading(false);
    if (cookie) history('/home')
  })



  async function handleSubmit() {
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        'Content-Type': "application/json",
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    console.log(data);
    if (data.isLogged)
    {
      localStorage.setItem("job_cookie", "true");
      history('/home')
    }
  }
  if(!isLoading)
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
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                onClick={handleSubmit}
                borderRadius={0}
                type="button"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" href="signup">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default App;
