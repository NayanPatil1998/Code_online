import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { GlobalContext } from "../contexts/Globalcontext";
import { useState } from "react";
import { ConfigProvider } from "react-avatar";

function MyApp({ Component, pageProps }: AppProps) {
  const [name, setName] = useState("")
  return (

    <GlobalContext.Provider value={{name, setName}}>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            theme: {
              primary: "#4aee88",
              // secondary: "black",
            },
          },
        }}
      />
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}

export default MyApp;
