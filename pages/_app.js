import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyle } from '../src/libs/AlurakutCommons';


const GlobalStyle = createGlobalStyle`
  /*Reset Styles*/  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
  }

  body {
    font-family: sans-serif;
    background-color: #D9E6F6;
  }

  #__next {
    display: flex;
    height: 100vh;
    flex-direction: column;
  }

  img { 
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  ${ AlurakutStyle }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme} >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}