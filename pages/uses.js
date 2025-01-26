import {
  Link,
  Container,
  Heading,
  Box,
  Button,
  List,
  ListItem,
  SimpleGrid
} from '@chakra-ui/react'
import {
  SiVisualstudiocode,
  SiMicrosoftedge,
  SiPycharm,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiVisualstudio,
  SiPython
} from 'react-icons/si'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import thumbArchcraft from '../public/images/links/archcraft.png'
import thumbWindows11 from '../public/images/links/windows11.jpg'

const Uses = () => (
  <Layout>
    <Container>
      <Box
        flexShrink={0}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
        textAlign="center"
      >
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h1" variant="page-title">
              What i use?
            </Heading>
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h2" variant="section-title">
          Software
        </Heading>
        <List>
          <ListItem>
            <Link href="https://visualstudio.com" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<SiVisualstudio />}
              >
                Visual Studio
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://code.visualstudio.com" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<SiVisualstudiocode />}
              >
                Visual Studio Code
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.jetbrains.com/pycharm/" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<SiPycharm />}
              >
                PyCharm Community
              </Button>
            </Link>
          </ListItem>
          {/* <ListItem>
                        <Link href="https://www.microsoft.com/en-us/edge" target="_blank">
                            <Button
                                variant="ghost"
                                colorScheme="teal"
                                leftIcon={<SiMicrosoftedge />}
                            >
                                Microsoft Edge
                            </Button>
                        </Link>
                    </ListItem> */}
        </List>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Language
        </Heading>
        <List>
          <ListItem>
            <Link href="https://nodejs.org" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<SiNodedotjs />}
              >
                JavaScript ( NodeJS )
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://reactjs.org" target="_blank">
              <Button variant="ghost" colorScheme="teal" leftIcon={<SiReact />}>
                ReactJS
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://nextjs.org" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<SiNextdotjs />}
              >
                NextJS
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://python.org" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<SiPython />}
              >
                Python
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          OS
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} gap={6}>
          <GridItem
            href="https://www.microsoft.com/software-download/windows11"
            title="Windows 11"
            thumbnail={thumbWindows11}
          ></GridItem>
          <GridItem
            href="https://archcraft.io"
            title="ArchcraftOS"
            thumbnail={thumbArchcraft}
          ></GridItem>
        </SimpleGrid>
      </Section>
    </Container>
  </Layout>
)

export default Uses
export { getServerSideProps } from '../components/chakra'
