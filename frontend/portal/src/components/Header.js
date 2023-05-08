import { Box, Text, Flex, Icon } from "@chakra-ui/react"
import { MdPeople } from "react-icons/md"
import JobGrid from "./Grid"

export function Header() {
    return (
        <Flex w="100vw"h="100%" marginTop="2.4vh" ml='10' justifyContent={'space-between'} alignItems={"center"} flexDirection={"column"}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", width:"100%"}}>
            <Text fontSize="4xl" fontWeight="bold">Welcome to Job Portal</Text>
            <Box mr={10}>

                <Flex flexDirection={"row"} alignItems={"center"}>
                <Icon as={MdPeople} size={'3xl'}></Icon>
                <Text ml={3} fontSize="lg" >5,000 Peers placed</Text>
                </Flex>
            </Box>
            </Box>
            <JobGrid></JobGrid>
        </Flex>
    )
}

export default Header