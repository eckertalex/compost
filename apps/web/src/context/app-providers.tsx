import {ChakraProvider, theme} from '@chakra-ui/react'
import {ReactNode} from 'react'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter as Router} from 'react-router-dom'

export function AppProviders({children}: {children: ReactNode}) {
  return (
    <ChakraProvider theme={theme}>
      <HelmetProvider>
        <Router>{children}</Router>
      </HelmetProvider>
    </ChakraProvider>
  )
}
