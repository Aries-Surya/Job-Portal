import { Card, CardBody, CardFooter, CardHeader, HStack, Heading, SimpleGrid, Flex, Box, Text, Button, CircularProgress, Avatar } from "@chakra-ui/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { MdCheck } from "react-icons/md";
function getCookie(name) {
    console.log(document.cookie)
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    console.log(parts, "Adfdf")
    if (parts.length === 2) return parts.pop().split(';').shift();
}



export default function JobGrid() {
    const [jobs, setJobs] = useState([]);
    let isFetched = false
    useEffect(() => {
        //fetch the card details
        fetch("http://localhost:8000/api/getJobs", {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: {
                'Content-Type': "application/json",
                'X-CSRFToken': getCookie('csrftoken')
            }
            }).then(res => res.json()).then(data => setJobs(data));
    }, [])
    console.log(jobs)

   const memoizedJobs = useMemo(() => jobs, [jobs]);
   
    return (
        <CardGrid jobs={memoizedJobs}/>
    )
    
}


function CardGrid({jobs}){
    return (
        <SimpleGrid spacing={10} minChildWidth={'300px'}>
            {console.log(jobs)}
        {jobs?.map(job => {
            return (<Card key={job.id}>
                <CardHeader sx={{borderTop: "2px solid green", borderRadius:"inherit"}}>
                    <Flex>
                        {/*Avatar*/}
                        <Box>
                            <Avatar src={job.profile_url}></Avatar>
                        </Box>
                        <Box>
                            <Heading fontSize={'lg'}>{job.job_title}</Heading>
                            <Text fontSize={'sm'}>by {job.provider_name}</Text>
                        </Box>
                    </Flex>
                </CardHeader>
                <CardBody sx={{paddingTop: "10px", paddingBottom: "10px"}}>
                    <Text fontSize={'sm'}>{job.job_description}</Text>
                </CardBody>
                <CardFooter>
                    <Flex w="100%" justifyContent="space-between" alignItems={'center'}>
                        <HStack>
                            <Button leftIcon={MdCheck}>
                                Approve
                            </Button>
                        </HStack>
                        <Text>{job.popularity}</Text>
                    </Flex>
                </CardFooter>
            </Card>)
        })}
    </SimpleGrid>
    )
}