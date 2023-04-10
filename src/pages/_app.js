import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/work-sans'
import theme from '@/styles/theme'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
        <Component {...pageProps} />
    </ChakraProvider>
  )
}
