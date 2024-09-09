import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  AllProducts,
  Cart,
  Home,
  Login,
  ProductItem,
  Protected,
  Signup,
  Wishlist,
} from './components';
import { Provider } from 'react-redux';
import { store } from './app/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Protected authentication>
            <Home />
          </Protected>
        ),
      },
      {
        path: '/all-products',
        element: (
          <Protected authentication>
            <AllProducts />
          </Protected>
        ),
      },
      {
        path: 'all-products/:slug',
        element: (
          <Protected authentication>
            <ProductItem />
          </Protected>
        ),
      },
      {
        path: 'cart',
        element: (
          <Protected authentication>
            <Cart />
          </Protected>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <Protected authentication>
            <Wishlist />
          </Protected>
        ),
      },
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: '/signup',
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: '*',
        element: (
          <div className="bg-white text-3xl text-[#E91B1A] flex items-center justify-center p-5 not-found">
            No Results Found
          </div>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
