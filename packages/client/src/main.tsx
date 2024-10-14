import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          position: 'bottom-right',
          isClosable: true,
          variant: 'left-accent',
          duration: 3000,
        },
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </StrictMode>
)
