import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { CartProvider } from './components/context/CartContext';
import { ToastContainer } from './components/common/Toast';
import { ScrollToTop } from './components/common/ScrollToTop';
import SeoHead from './components/common/SeoHead';

import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Checkout from './pages/Checkout';
import TrackOrder from './pages/TrackOrder';
import AdsService from './pages/AdsService';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import AdminDashboard from './pages/admin/Dashboard';
import ProjectsManager from './pages/admin/ProjectsManager';
import PostsManager from './pages/admin/PostsManager';
import ContactsManager from './pages/admin/ContactsManager';
import OrdersManager from './pages/admin/OrdersManager';
import AdminSettings from './pages/admin/AdminSettings';
import AdminHomeSettings from './pages/admin/AdminHomeSettings';

function App() {
  return (
    <CartProvider>
      <SeoHead />
      <BrowserRouter basename="/minhquang28.shop/">
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="cart" element={<Checkout />} />
            <Route path="track-order" element={<TrackOrder />} />
            <Route path="services/ads" element={<AdsService />} /> 
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="contact" element={<Contact />} />
            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Auth Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="posts" element={<PostsManager />} />
              <Route path="contacts" element={<ContactsManager />} />
              <Route path="orders" element={<OrdersManager />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="home-settings" element={<AdminHomeSettings />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
