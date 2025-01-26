/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Container, Button, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { SiStarship } from 'react-icons/si'

const IPUrl = 'https://nekos.life/api/v2/img/waifu'

export default function Test() {
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const GetWaifu = e => {
    e.preventDefault()
    axios
      .get(IPUrl)
      .then(response => {
        setPost(response.data)
      })
      .catch(error => {
        setError(error)
      })
  }

  useEffect(() => {
    axios
      .get(IPUrl)
      .then(response => {
        setPost(response.data)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  if (error) return `Error: ${error.message}`
  if (!post) return null

  console.log(post)

  return (
    <Container align="center">
      <Heading as="h1" marginBottom="20px">
        Your Waifu
      </Heading>
      <Image src={post.url} align="center" width="200px" height="200px"></Image>

      <Container>
        <Button
          marginTop="20px"
          marginBottom="20px"
          colorScheme="teal"
          onClick={GetWaifu}
          leftIcon={<SiStarship />}
        >
          Get Your Waifu
        </Button>
      </Container>
    </Container>
  )
}
