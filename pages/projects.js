import NextLink from 'next/link'
import Image from 'next/image'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button,
  chakra
} from '@chakra-ui/react'

const Spinning = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const UnderDev = () => {
  return (
    <Container align="center">
      <Spinning
        src="https://www.gravatar.com/avatar/e1949921bd20237e8332481afe6b1554"
        borderRadius="full"
        width="120px"
        height="120px"
      />
      <Heading as="h1">Under development</Heading>
      <Text>The page currently under developement.</Text>
      <Divider my={6} />
      <Box my={6} align="center">
        <NextLink href="/" passHref>
          <Button colorScheme="teal">Return to home</Button>
        </NextLink>
      </Box>
    </Container>
  )
}

export default UnderDev
