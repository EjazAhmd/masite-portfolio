
import { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ColorProvider } from '../pages/colorcontex'; // Import ColorProvider

export default function myApp({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
       <ColorProvider>
      <Component {...pageProps} />
      </ColorProvider>
    </SessionProvider>
  )
}


