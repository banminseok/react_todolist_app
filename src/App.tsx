import React from 'react';
import logo from './logo.svg';
import './index.css';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import { darkTheme, lightTheme } from './theme';
import { Outlet } from 'react-router-dom';
import ToggleBtn from './Components/ToggleBtn';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atom';
import ToDoList from './routes/ToDoList';


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;  
  font-size: 100%;
  _font: inherit;  
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Noto Sans KR','Source Sans Pro', sans-serif;
  font-weight: 600;  
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
`
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 30px;
  left: 30px;
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <HelmetProvider >
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyle />
          <BtnContainer>
            <ToggleBtn />
          </BtnContainer>
          <ToDoList />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
