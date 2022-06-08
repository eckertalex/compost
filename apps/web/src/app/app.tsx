import {Suspense} from 'react'
import {Helmet} from 'react-helmet-async'
import {ErrorBoundary} from 'react-error-boundary'
import {Box, Flex, Spinner, useColorModeValue} from '@chakra-ui/react'
import {FullPageErrorFallback} from '../components/full-page-error-fallback/full-page-error-fallback'
import {Sidebar} from './sidebar'
import {AppRoutes} from './app-routes'

export function App() {
  const mainBackgroundColor = useColorModeValue('gray.100', 'gray.800')

  return (
    <Suspense
      fallback={
        <Flex
          as="main"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner label="Loading application..." size="xl" />
        </Flex>
      }
    >
      <Helmet titleTemplate="%s - Compost" defaultTitle="Compost">
        <meta
          name="description"
          content="Compost written in React with Chakra-UI, react-router, and react-query"
        />
      </Helmet>
      <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
        <Flex as="main" background={mainBackgroundColor}>
          <Box height="100vh" padding={2}>
            <Sidebar />
          </Box>
          <Box marginY={4} width="full">
            <AppRoutes />
          </Box>
        </Flex>
      </ErrorBoundary>
    </Suspense>
  )
}
