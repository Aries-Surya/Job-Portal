import { Box, Text, Flex, Icon } from "@chakra-ui/react"
import { MdPeople } from "react-icons/md"

export function Header() {
    return (
        <Flex w="100vw"h="100%" marginTop="2.4vh" ml='10' justifyContent={'space-between'} alignItems={"center"}>
            <Text fontSize="4xl" fontWeight="bold">Welcome to Job Portal</Text>
            <Box mr={10}>

                <Flex flexDirection={"row"} alignItems={"center"}>
                <Icon as={MdPeople} size={'3xl'}></Icon>
                <Text ml={3} fontSize="lg" >5,000 Peers placed</Text>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Header