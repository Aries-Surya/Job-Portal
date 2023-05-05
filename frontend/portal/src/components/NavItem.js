import React, { useState } from 'react'

import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    Box,
    Button
} from '@chakra-ui/react'
// import NavHoverBox from '../components/NavHoverBox'
import { getCookie } from '../pages/Home'
import { useNavigate } from 'react-router-dom'

import { useColorMode } from "@chakra-ui/react";
import { MdLight, MdLightMode } from 'react-icons/md';


export default function NavItem({ icon, title, description, active, navSize, onClick }) {
    const history = useNavigate()
    const {toggleColorMode} = useColorMode();
    const [themeTitle, setTitle] = useState(title);
    return (
        <Flex
            mt={6}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Box backgroundColor={active && "#AEC8CA"}
                    p={1}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                    w={navSize == "large" && "100%"}
                >
                    <MenuButton 
                        onClick={function(){
                            console.log(title)
                            if(title == "Logout") onClick(history);
                            if(title.includes("Theme")) {
                                toggleColorMode();
                               
                            }
                        }} as={Button} w="100%" size={'lg'} 
                    >
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{themeTitle}</Text>
                        </Flex>
                    </MenuButton>
                </Box>
            </Menu>
        </Flex>
    )
}