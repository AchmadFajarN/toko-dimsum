import { createBrowserRouter } from 'react-router'
import HomeLayout from '../layout/Home/HomeLayout';
import Root from '../pages/Root';
import Product from '../pages/Product';

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
                path: 'products'
            }
        ]
    }
]);

export default router;