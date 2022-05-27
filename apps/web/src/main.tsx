import {StrictMode} from 'react'
import * as ReactDOM from 'react-dom/client'
import {ColorModeScript} from '@chakra-ui/react'
import {App} from './app/app'
import {AppProviders} from './context/app-providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <ColorModeScript />
      <App />
    </AppProviders>
  </StrictMode>
)
