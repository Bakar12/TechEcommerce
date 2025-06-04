import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminAddProductPage from './adminPages/AdminAddProductPage';
import AdminDashboardPage from './adminPages/AdminDashboardPage';
import CustomerDashboardPage from './customerPages/CustomerDashboardPage';
import AdminProductListPage from './adminPages/AdminProductListPage';
import AdminProductEditPage from './adminPages/AdminProductEditPage';
import AdminContentPage from './adminPages/AdminContentPage';
import Navbar from './components/Navbar';
import AdminUserListPage from './adminPages/AdminUserListPage';
import Footer from './components/Footer';
import CustomerAppointmentsPage from './customerPages/CustomerAppointmentsPage';
import AdminUserAppointmentsPage from './adminPages/AdminUserAppointmentsPage';




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/add-product" element={<AdminAddProductPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />
        <Route path="/customer/appointments" element={<CustomerAppointmentsPage />} /> {/* <-- Add this */}
        <Route path="/admin/products" element={<AdminProductListPage />} />
        <Route path="/admin/product/:id/edit" element={<AdminProductEditPage />} />
        <Route path="/admin/content" element={<AdminContentPage />} />
        <Route path="/admin/users" element={<AdminUserListPage />} />
        <Route path="/admin/user/:id/appointments" element={<AdminUserAppointmentsPage />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
