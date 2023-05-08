import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Center, CircularProgress, CircularProgressLabel, Flex } from '@chakra-ui/react'
import Sidebar from "../components/SideBar";
import { Main } from "../components/MainDocument";
import JobGrid from "../components/Grid";
function getCookie(name) {
    console.log(document.cookie)
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    console.log(parts, "Adfdf")
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function Home () {
    const cookie = localStorage.getItem('job_cookie');
    const history = useNavigate();
    const [userData, setUserData] = useState();
    const [isLoading, setLoading] = useState(true);
    if (!cookie)
        history("/")

    async function handleLogout(){
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
        if(data.isLoggedOut){
            localStorage.removeItem('job_cookie');
            history('/');
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/api/getDetails", {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: {
                'Content-Type': "application/json",
                'X-CSRFToken': getCookie('csrftoken')
            }
        }).then(res => res.json()).then(data => {
            setUserData(data);
            setLoading(false);
        })
    }, []);
    if (isLoading)
        return (
           <Flex
              justifyContent="center"
              alignItems="center"
              w="100vw"
              h="100vh"
           >
                <CircularProgress isIndeterminate value={30} size='120px' />
           </Flex>
        )
    else
        return (
            <>

                <Flex flexDirection="row">
                    <Sidebar username={userData.name} email={userData.email} lastLogin={new Date(userData.last_login).toDateString()}/>
                    <Main ></Main>
                </Flex>
    
            </>
        )
}

export {
    getCookie
}