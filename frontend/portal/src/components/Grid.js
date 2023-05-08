import { Card, CardBody, CardFooter, CardHeader, HStack, Heading, SimpleGrid, Flex, Box, Text, Button, CircularProgress, Avatar, Icon } from "@chakra-ui/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { MdCheck, MdLocationPin,MdPeopleAlt } from "react-icons/md";
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
// function getCookie(name) {
//     console.log(document.cookie)
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     console.log(parts, "Adfdf")
//     if (parts.length === 2) return parts.pop().split(';').shift();
// }

async function handleApprove(jobData){
    console.log(jobData, jobData.id, jobData.id.toString())
    const jobId = jobData.id
    const res = await fetch("http://localhost:8000/api/approve", {
            method: "POST",
            credentials: "include",
            mode: "cors",
            headers: {
                'Content-Type': "application/json",
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                jobId
            })
        })
}

function CardGrid({jobs}){
    return (
        <SimpleGrid spacing={10} minChildWidth={'250px'} gridTemplateColumns={"repeat(3, minmax(300px, 1fr))"}>
            {console.log(jobs)}
        {jobs?.map(job => {
            return (<Card key={job.id} sx={{width: "23rem", marginTop: "3rem"}}>
                <CardHeader sx={{borderTop: "2px solid green", borderRadius:"inherit", padding: ".8rem 1rem"}}>
                    <Flex alignItems={"center"} justifyContent={"space-between"}>
                        {/*Avatar*/}
                        <Box sx={{marginRight: ".75rem", display: "flex", alignItems: "center"}}>
                            <Avatar src={job.profile_url} size={'lg'} sx={{objectFit: "contain !important"}} objectFit={"contain"}></Avatar>
                            <Box>
                                <Heading fontSize={'lg'}>{job.job_title}</Heading>
                                <Text fontSize={'sm'}>by {job.provider_name}</Text>
                            </Box>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Icon as={MdPeopleAlt} size={"lg"}></Icon>
                            <Text>{job.popularity}</Text>
                        </Box>

                    </Flex>
                </CardHeader>
                <CardBody sx={{padding: ".8rem 1rem", paddingTop: ".1rem"}}>
                    <Text fontSize={'sm'} textAlign={"justify"}>{job.job_description}</Text>
                </CardBody>
                <CardFooter sx={{padding: ".8rem 1rem"}}>
                    <Flex w="100%" justifyContent="space-between" alignItems={'center'}>
                        <HStack>
                            <Button leftIcon={MdCheck} onClick={()=> handleApprove(job)}>
                                Approve
                            </Button>
                        </HStack>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Icon as={MdLocationPin}></Icon>
                            <Text size={"sm"}>{job.location}</Text>
                        </Box>
                    </Flex>
                </CardFooter>
            </Card>)
        })}
    </SimpleGrid>
    )
}