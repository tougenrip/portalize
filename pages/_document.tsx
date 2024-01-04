import { useSession } from 'next-auth/react';
import { RouteKind } from 'next/dist/server/future/route-kind';
import { Html, Head, Main, NextScript } from 'next/document'
import Router, { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar'
import { useEffect, useState } from 'react'


export default function Document() {
  
  const [windowDimension, setWindowDimension] = useState(null);
  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }
  
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  const isMobile = windowDimension <= 1140;
  const isSmall = windowDimension <= 960;


  return (
    <Html lang="en" className='' style={{scrollBehavior:'smooth'}}>
      <Head>
      {/* <link type='image/x-icon' rel="shortcut icon" href="portalfav.png" /> */}
      <meta name="description" content="Portalize.io is a 3d social media that comes with No-code editor for creating worlds with ease."></meta>
      <meta name="keywords" content="Metaverse, Web3, Gaming"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
      <meta name="apple-mobile-web-app-title" content="Portalize"/>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#fff" />
</Head>
      <body className=' font-sans text-white'>
        
        <NextNProgress color='773fff'/>
          <Main />
         
        
        
        <NextScript />
        
        
        {/* <script src='/oneko/oneko.js' async></script> */}
      </body>
    </Html>
  )
}
