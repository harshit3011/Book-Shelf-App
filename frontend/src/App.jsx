
import { Box, useColorModeValue } from '@chakra-ui/react'
import Navbar from './components/Navbar.jsx'
import Bookcard from './components/Bookcard.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import Bookshelf from './components/BookShelf.jsx'

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100","gray.900")}>
      
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}></Route>
        <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        <Route path='/signup' element={<SignUpPage></SignUpPage>}></Route>
        <Route path='/home' element={<Bookshelf></Bookshelf>}></Route>
      </Routes>
    </Box>
  )
}

export default App
