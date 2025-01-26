import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Akio's homepage" />
        <meta name="author" content="Yoru Akio" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <meta name="twitter:title" content="Yoru Akio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yoruakio" />
        <meta name="twitter:creator" content="@yoruakio" />
        <meta name="twitter:image" content="https://akio-dev.ml/card.png" />
        <meta property="og:site_name" content="Yoru Akio" />
        <meta name="og:title" content="Yoru Akio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://akio-dev.ml/card.png" />
        <title>YoruAkio - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
