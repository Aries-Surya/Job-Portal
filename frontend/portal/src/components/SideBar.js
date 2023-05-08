import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Box
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiLogOut,

} from 'react-icons/fi'
import { MdDarkMode, MdEditDocument, MdOutlinePeople, MdFeaturedPlayList } from "react-icons/md"
import { IoPawOutline } from 'react-icons/io5'
import NavItem from '../components/NavItem'
import { getCookie } from '../pages/Home'

async function handleLogout(history) {
    const res = await fetch("http://localhost:8000/api/logout", {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
            'Content-Type': "application/json",
            'X-CSRFToken': getCookie('csrftoken')
        }
    });
    const data = await res.json();
    if (data.isLoggedOut) {
        localStorage.removeItem('job_cookie');
        history('/');
    }
}

export default function Sidebar({ username, avatar, createdAt, email, lastLogin }) {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <Flex
                 mt={5}
                 flexDir="row"
                 justifyContent="space-between"
                 alignItems="center"
                >
                    <IconButton
                        background="none"
                        _hover={{ background: 'none' }}
                        icon={<FiMenu />}
                        onClick={() => {
                            if (navSize == "small")
                                changeNavSize("large")
                            else
                                changeNavSize("small")
                        }}
                    />
                    {navSize!="small" ? <Text ml={4} >Job Portal</Text> : <> </>}
                    
                </Flex>
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." />
                <NavItem navSize={navSize} icon={FiUser} title="Account" />
                <NavItem navSize={navSize} icon={MdFeaturedPlayList} title="Jobs" active />
                <NavItem navSize={navSize} icon={MdOutlinePeople} title="Peers" />
                <NavItem navSize={navSize} icon={MdEditDocument} title="Resume" />
                <NavItem navSize={navSize} icon={MdDarkMode} title="Theme" />
                <NavItem navSize={navSize} icon={FiLogOut} title="Logout" onClick={handleLogout} />
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{username}</Heading>
                        <Text color="gray" fontSize={'sm'}>@{email.split("@")[0]}</Text>
                        <Text color="gray" fontSize={'xx-small'}>{lastLogin}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}