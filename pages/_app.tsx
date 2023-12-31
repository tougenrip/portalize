
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react"
import NextNProgress from 'nextjs-progressbar';
import { mode } from "@chakra-ui/theme-tools";
import Providers from '@/components/Providers';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

export default function App({ Component, pageProps: {session , ...pageProps}, }: AppProps) {


  
  return (
    
    
    <Providers>
      <SessionProvider session={pageProps.session}>
        <NextNProgress color="#773fff"/>
        <QueryClientProvider client={queryClient}>

        {/* <ChakraProvider theme={theme}>
          
          </ChakraProvider> */}
          <Component {...pageProps} />
          </QueryClientProvider>
        </SessionProvider>
        </Providers>
      
    
  )
}
