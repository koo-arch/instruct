import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextProvider } from './components/customContexts';
import ResponsiveDrawer from './components/responsiveDrawer';
import Top from './pages/top';
import Login from './pages/login';
import Register from './pages/register';
import ResetPassword from './pages/resetPassword';
import ResetPasswordConfirm from './pages/resetPasswordConfirm';
import CountUsers from './pages/countUsers';
import NotFound from './pages/notFound';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Roboto',
        '"Noto Sans JP"',
        '"Helvetica"',
        'Arial',
        'sans-serif',
      ].join(','),
      button: {
        fontWeight: 'bold', // ボタンのテキストのフォントウェイトを太くする
      },
    },
  });
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <ContextProvider>
          <ResponsiveDrawer>
            <Routes>
              <Route path='/' element={<Top/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/password/reset' element={<ResetPassword/>}/>
              <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />


              <Route path="/records/countusers" element={<CountUsers/>}/>
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </ResponsiveDrawer>
        </ContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;