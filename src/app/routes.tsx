import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { Layout } from './Layout';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
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

      {
        Component: ProtectedRoute,
        children: [
          { path: 'cart', Component: CartPage },
          { path: 'checkout', Component: CheckoutPage },
          { path: 'order-success', Component: OrderSuccessPage },
        ],
      },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
  },
]);