import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextProvider } from './components/customContexts';
import Top from './pages/top';
import Login from './pages/login';
import Register from './pages/register';
import ResetPassword from './pages/resetPassword';
import ResetPasswordConfirm from './pages/resetPasswordConfirm';
import NotFound from './pages/notFound';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {
  const defaultTheme = createTheme();
  return(
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline/>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path='/' element={<Top/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/password/reset' element={<ResetPassword/>}/>
            <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </ContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;