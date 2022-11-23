
import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
<>
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route element={<PrivateRoute/>}>
      <Route path="/" element={<h1>Products</h1>} />
      <Route path="/add" element={<h1>ADD Product</h1>} />
      <Route path="/update" element={<h1>Update Product</h1>} />
      <Route path="/logout" element={<h1>logout</h1>} />
      <Route path="/profile" element={<h1>Profile</h1>} />
      </Route>
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
    </BrowserRouter>
    <Footer/>
</>
    
  );
}

export default App;
