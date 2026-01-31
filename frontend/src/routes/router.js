import { createBrowserRouter } from 'react-router'


import HomeLayout from '../layout/Home/HomeLayout';

import Root from '../pages/Root';
import Product from '../pages/Product';
import MainProduct from '../components/products/MainProduct';
import ProductDetailMain from '../components/ProductDetails/ProductDetailMain';
import Login from '../pages/Login';;
import Register from '../pages/Register';

const router = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        children: [
            {
                Component: Root,
                index: true
            },
            {
                Component: Product,
                path: 'products',
                children: [
                    {
                        Component: MainProduct,
                        index: true
                    },
                    {
                        path: ':id',
                        Component: ProductDetailMain
                    }
                ]
            },
            {
                path: 'login',
                Component:  Login,
            },
            {
                path: 'register',
                Component: Register
            }
        ],
    }
]);

export default router;