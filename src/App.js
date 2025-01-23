import './App.css';
import { Home } from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Cambia Switch por Routes
import { Login } from './components/Login/Login';
import { Register } from './components/Login/Register';
import { Search } from './components/Search/Search';
import { Restaurant } from './components/Restaurant/Restaurant';
import { CreateRestaurant } from './components/Restaurant/CreateRestaurant';
import { CreateMenu } from './components/Restaurant/CreateMenu';
import { AdminMain } from './components/Admin/AdminMain';
import { ReviewCheck } from './components/Admin/ReviewCheck';
import { Users } from './components/Admin/Users';
import { Restaurants } from './components/Admin/Restaurants';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/createRestaurant" element={<CreateRestaurant />} />
        <Route path="/createMenu" element={<CreateMenu />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/admin/reviews" element={<ReviewCheck />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/restaurants" element={<Restaurants />} />
      </Routes>
    </Router>
  );
}

export default App;
