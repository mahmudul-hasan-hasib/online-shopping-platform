import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { CartPage } from './pages/CartPage';
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { ProductDetails } from './pages/ProductDetails';
import { ProductListing } from './pages/ProductListing';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'products', Component: ProductListing },
      { path: 'products/:category', Component: ProductListing },
      { path: 'product/:id', Component: ProductDetails },
      { path: 'cart', Component: CartPage },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
  },
]);