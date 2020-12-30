import React from "react"
import { createGlobalStyle } from "styled-components";
import { Footer } from './Footer';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Jura&display=swap');
    body {
        font-family: 'Jura', sans-serif;
        color: #fff;
        min-height: 100vh;
        min-width: 100vw;
        width: auto;
        margin:0;
        padding:0;
        background-color: #2E3137;
        
        #bgVideo {
            z-index: -10;
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
            min-width: 100%;
            min-height: 100%;
            object-fit: fill;
        }
    }
`
export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <React.Fragment>
      <GlobalStyle theme="White" />
      <video autoPlay={true} muted={true} loop={true} id="bgVideo">
        <source src="./img/bg-video.mp4" type="video/mp4" />
      </video>
      {children}
      <Footer />
    </React.Fragment>
  )
}