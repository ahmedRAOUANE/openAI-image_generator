import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setUser } from './store/userSlice';
import { auth } from './firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

// components
import GuestLayout from './layout/GuestLayout'
import UserLayout from './layout/UserLayout';
import Login from './components/Login';
import Signup from './components/Signup';
import FullScreenLoader from './components/FullScreenLoader';
import { setIsLoading } from './store/loaderSlice';

function App() {
  const user = useSelector(state => state.userSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser({ id: user.uid, email: user.email }))
        navigate("/openAI-image_generator/")
      } else {
        dispatch(setUser(null))
      }
      dispatch(setIsLoading(false))
    })
  }, [dispatch, navigate])

  return (
    <div>
      <FullScreenLoader solid />
      <Routes>
        {user ? (
          <Route path="/openAI-image_generator" element={<UserLayout />} />
        ) : (
            <Route path='/openAI-image_generator' element={<GuestLayout />} >
            <Route path="/openAI-image_generator/login" element={<Login />} />
            <Route path="/openAI-image_generator/signup" element={<Signup />} />
          </Route>
        )}
      </Routes>
    </div>
  )
}

export default App
