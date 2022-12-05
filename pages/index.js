
import { Box, Flex, Text,Image, Button,Grid, Heading } from '@chakra-ui/react'
import {GrMapLocation ,GrLanguage} from 'react-icons/gr';
import {FcLikePlaceholder} from "react-icons/fc";
import {BiGitRepoForked} from "react-icons/bi"


export default function Home({git,project}) {
  console.log(git)
  console.log(project)
  return (
    <Box width="100%"  display="flex" gap="8px"  >
      <Flex textAlign="center" border="0px" alignItems="center" width="40%" justifyContent="center" px="5" align="center" shadow="2xl">
         <Box>
           <Image border="1px" marginLeft="40%" display="flex" alignItems="center" justifyContent="center" borderRadius="50%" src={git.avatar_url} width="100" height="100" alt="adityaBr11" />
           <Text fontSize="2xl">{git.name}</Text>
           <Text color="gray.500" fontSize="sm" >@{git.login}</Text>
          <Text>{git.bio}</Text>
          <Flex px="20" gap="14px">
             <Button px="8" colorScheme="green" borderRadius="20px">Resume</Button>
             <Button px="8" colorScheme="blue" borderRadius="20px">follow</Button>
          </Flex>
          <Grid templateColumns='repeat(3, 1fr)' gap={2} padding="5px">
            <Button p="5">TYPESCRIPT</Button> <Button padding="5px">NODE.JS</Button> <Button padding="5px">MONGODB</Button>
            <Button p="5">REACTNATIVE</Button>
            <Button p="5">TAILWIND</Button>
            <Button p="5">CHAKRA-UI</Button>
            <Button p="5">CSS</Button>
            <Button p="5">GIT</Button>
            <Button p="5">REACT.JS</Button>
          </Grid>
          <Flex gap="2" align="center"> <GrMapLocation/> <Text>{git.location}</Text></Flex>
         </Box>
      </Flex>
      <Box w="60%" border="0px">
      <Heading textAlign="center" color="gray" >Projects</Heading>
        <Box>
        <Grid templateColumns="repeat(2,1fr)" gap="20px">
          {project.items.map((item)=>(
            <Box key={item.id} mt="20px" style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                <a href={item.svn_url}>
                    <Box ml="10px" p="2">
                        <Text>{item.name}</Text>
                        <Text color="gray.600" fontSize="sm">{item.full_name}</Text>
                        <Text>Score:{item.score}</Text>
                        <Flex direction="row" justifyContent="space-between">
                        <Box><Text gap="3px" alignItems="center" display="flex" > <span><FcLikePlaceholder/></span> {item.watchers}</Text>
                        <Text Text gap="3px" alignItems="center" display="flex"><BiGitRepoForked/> {item.forks}</Text></Box>
                         <Box><Text gap="3px" alignItems="center" display="flex" > <GrLanguage/> {item.language}</Text></Box>
                        </Flex>
                        
                    </Box>
                </a>
            </Box>
          ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export async function getStaticProps(){
  const res= await fetch("https://api.github.com/users/Navneetcode1")
  const re= await fetch("https://api.github.com/search/repositories?q=user:Navneetcode1+fork:true&sort=updated&per_page=10&type=Repositories")
  let data= await res.json()
  let dat= await re.json()
  return {
    props:{
      git:data,
      project:dat
    }
  }
}