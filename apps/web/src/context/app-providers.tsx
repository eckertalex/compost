import {ChakraProvider, theme} from '@chakra-ui/react'
import {ReactNode} from 'react'
import {HelmetProvider} from 'react-helmet-async'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClientProvider} from './query-client'

export function AppProviders({children}: {children: ReactNode}) {
  return (
    <ChakraProvider theme={theme}>
      <HelmetProvider>
        <QueryClientProvider>
          <Router>{children}</Router>
        </QueryClientProvider>
      </HelmetProvider>
    </ChakraProvider>
  )
}
