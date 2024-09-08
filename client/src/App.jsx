import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setAccessToken, setLoading } from './redux/appSlice';
import Spinner from './components/Spinner';

function App() {
  const { accessToken, loading } = useSelector((store) => store.appSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        dispatch(setLoading(true)); // Start loading

        const token = localStorage.getItem('accessToken');
        if (token) {
          dispatch(setAccessToken(token)); // Set token in Redux state
        } else {
          // No token found, navigate to login or home
          console.log('No access token found, redirecting to Home');
          navigate('/login');
        }
      } catch (err) {
        console.error('Error fetching accessToken:', err);
      } finally {
        dispatch(setLoading(false)); // Stop loading
      }
    };

    checkAccessToken();
  }, [dispatch, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path="/" element={!accessToken ? <Home /> : <Profile />} />
      <Route path="/register" element={accessToken ? <Profile /> : <Register />} />
      <Route path="/login" element={accessToken ? <Profile /> : <Login />} />
      <Route path="/profile" element={accessToken ? <Profile /> : <Home />} />
    </Routes>
  );
}

export default App;
