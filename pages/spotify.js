import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button,
  chakra,
  Input,
  Highlight,
  Checkbox,
  Code
} from '@chakra-ui/react'
import React from 'react'
import axios from 'axios'

const Spotify = () => {
  const [inputs, setInputs] = React.useState({
    clientId: '',
    clientSecret: '',
    scope: ''
  })

  const [scopes, setScopes] = React.useState({
    'ugc-image-upload': true,
    'user-read-recently-played': true,
    'user-top-read': true,
    'user-read-playback-position': true,
    'user-read-playback-state': true,
    'user-modify-playback-state': true,
    'user-read-currently-playing': true,
    'app-remote-control': true,
    'playlist-modify-public': true,
    'playlist-modify-private': true,
    'playlist-read-private': true,
    'playlist-read-collaborative': true,
    'user-follow-modify': true,
    'user-follow-read': true,
    'user-library-modify': true,
    'user-library-read': true,
    'user-read-email': true,
    'user-read-private': true
  })

  const [outputs, setOutputs] = React.useState({
    filled: false,
    accessToken: 'Refresh Token',
    refreshToken: 'Refresh Token',
    data: {}
  })

  React.useEffect(() => {
    function getHashParams() {
      var hashParams = {}
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1)
      while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2])
      }
      return hashParams
    }

    const callApi = async params => {
      let data = {}
      try {
        const response = await axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/me',
          headers: {
            Authorization: 'Bearer ' + params.access_token
          },
          json: true
        })
        data = response.data
      } catch (err) {
        console.log(err)
      }

      setOutputs({
        ...outputs,
        filled: true,
        accessToken: params.access_token,
        refreshToken: params.refresh_token,
        data
      })
    }

    const params = getHashParams()

    if (params.access_token && params.refresh_token) {
      callApi(params)
    }
  }, [])

  React.useEffect(() => {
    setInputs({
      ...inputs,
      scope: Object.keys(scopes)
        .filter(scope => scopes[scope])
        .join(' ')
    })
  }, [scopes])

  const handleChange = event => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }

  const queryString =
    'https://akio-dev.ml' +
    '/login?clientId=' +
    inputs.clientId +
    '&clientSecret=' +
    inputs.clientSecret +
    '&scope=' +
    inputs.scope +
    '&hostname=' +
    'https://akio-dev.ml'

  return (
    <Container align="center">
      <Heading as="h1">⚠️ Warning ⚠️</Heading>
      
      <Divider my={6} marginBottom="25px"/>
      
      <Container>

        <Highlight query='ClientID' styles={{ px: '1', py: '1', rounded: "5px", bg: '#d6bcfa' }}>
          Insert your ClientID
        </Highlight>

        <Input
          placeholder="ClientID"
          type="text"
          name="clientId"
          value={inputs.clientId}
          onChange={handleChange}
          marginBottom="25px"
          marginTop="10px"
        />

        <Highlight query='ClientSecret' styles={{ px: '1', py: '1', rounded: "5px", bg: "#d6bcfa" }}>
          Insert your ClientSecret
        </Highlight>

        <Input
          placeholder="ClientSecret"
          type="text"
          name="clientSecret"
          value={inputs.clientSecret}
          onChange={handleChange}
          marginBottom="5px"
          marginTop="10px"
        />

        <a style={{color: 'black'}} href={queryString}><button >Submit</button></a>

        <Button
          href={queryString}
          colorScheme="purple"
          marginTop="25px"
        >
          Submit
        </Button>

        
        {outputs.filled && 
        <Container>
          <Divider my={6} />

          <Heading as="h1">Results</Heading>
          <Container>
            <Text
              marginTop="15px"
            >Access token: </Text>
            <Code colorScheme="teal">{outputs.accessToken}</Code>
            
            <Text
              marginTop="10px"
              >Refresh token: </Text>
            <Code colorScheme="teal">{outputs.refreshToken}</Code>
            
            <Text
              marginTop="10px"
              >Example API call </Text>
            <Code colorScheme="red">{JSON.stringify(outputs.data)}</Code>

          </Container>
        </Container>}
        <Divider my={6} />

        <Code colorScheme="red">Note: All scopes options are enabled</Code>
      </Container>
    </Container>
  )
}

export default Spotify
