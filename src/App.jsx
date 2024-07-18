import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


// Import Pages
import Home from './Pages/Home'
import NavbarComponent from './Components/Header'
import BLogs from './Pages/BLogs';
import CreateBlog from './Pages/CreateBlog';
import MyBlogs from './Pages/MyBlogs';
import Register from './Registration/Register';
import Login from './Registration/Login';

// Import Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Import Files Of Api
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from './Redux/Reducers/user';
import UpdateBlog from './Pages/UpdateBlog';
import Profile from './Pages/Profile';
import ChangePassword from './Pages/ChangePassword';


function App() {

  const UserLogin = useSelector((state) => state.user.isLogin)
  const user = useSelector((state) => state.user.data)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserData())
  }, [])

  return (
    <>
      <Router>
        <NavbarComponent />
        <ToastContainer />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          {UserLogin && user.message.isAdmin && <Route path='/blogs' element={<BLogs />} />}
          {UserLogin &&
            <>
              <Route path='/my-blogs' element={<MyBlogs />} />
              <Route path='/create-blog' element={<CreateBlog />} />
              <Route path='/blogDetails/:id' element={<UpdateBlog />} />
            </>
          }

          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/password' element={<ChangePassword />} />
        </Routes>
      </Router>
    </>
  )
}

export default App