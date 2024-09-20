import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

// Páginas
import Home from './pages/Home';
import Login from './pages/Auth';
import Register from './pages/Auth/Register';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
