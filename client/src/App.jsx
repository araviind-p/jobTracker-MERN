import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setAccessToken, setLoading } from './redux/appSlice';
import Spinner from './components/Spinner';

function App() {


  const { accessToken, loading } = useSelector(store => store.appSlice)
  const dispatch = useDispatch()
  useEffect(() => {
    try {
      dispatch(setLoading(true))
      const accessToken = localStorage.getItem("accessToken")
      dispatch(setAccessToken(accessToken))
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false))
    }
  }, [])
  if (loading) {
    // Show loading spinner while checking accessToken
    return (
      <Spinner />
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={accessToken ? <Profile /> : <Home />} />
        <Route path='/register' element={accessToken ? <Profile /> : <Register />} />
        <Route path='/login' element={accessToken ? <Profile /> : <Login />} />
        <Route path='/profile' element={accessToken ? <Profile /> : <Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
