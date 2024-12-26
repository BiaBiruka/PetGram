import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

// Páginas
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Hooks
import { useAuth } from './hooks/useAuth';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import Photo from './pages/Photo/Photo';

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route
              path='/'
              element={auth ? <Home /> : <Navigate to='/login' />}
            />
            <Route
              path='/login'
              element={!auth ? <Login /> : <Navigate to='/' />}
            />
            <Route
              path='/register'
              element={!auth ? <Register /> : <Navigate to='/' />}
            />
            <Route
              path='/profile'
              element={auth ? <EditProfile /> : <Navigate to='/login' />}
            />
            <Route
              path='/users/:id'
              element={auth ? <Profile /> : <Navigate to='/login' />}
            />
            <Route
              path='/photos/:id'
              element={auth ? <Photo /> : <Navigate to='/login' />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
