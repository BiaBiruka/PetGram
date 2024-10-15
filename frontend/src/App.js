import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

// Páginas
import Home from './pages/Home';
import Login from './pages/Auth';
import Register from './pages/Auth/Register';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Hooks
import { useAuth } from './hooks/useAuth';

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
            <Route path='/register' element={!auth ? <Register /> : <Navigate to='/' />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
