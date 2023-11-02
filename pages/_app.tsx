
import '@components/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react"
import NextNProgress from 'nextjs-progressbar';
import { mode } from "@chakra-ui/theme-tools";
import Navbar from '@components/components/Navbar';

// const theme = extendTheme({
//   config: {
//     useSystemColorMode: true,
//     initialColorMode: "dark"
//   },
//   styles:{
//     global: (props) => ({
//       body: {
//         bg: mode('#ffffff','#151515')(props),
//       }
//     })
//   }
  
// });

export default function App({ Component, pageProps: {session , ...pageProps}, }: AppProps) {


  
  return (
    
    
      
      <SessionProvider session={pageProps.session}>
        <NextNProgress color="#773fff"/>
        {/* <ChakraProvider theme={theme}>
          
          </ChakraProvider> */}
          <Component {...pageProps} />
        </SessionProvider>
      
    
  )
}
