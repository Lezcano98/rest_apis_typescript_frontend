import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layouts/Layout'
import Products, { loader as productsloader, action as updateAvailabilityAction} from './Views/Products';
import NewProduct, { action as newProductAction } from './Views/NewProduct';
import EditProduct, { loader as editProductLoader, action as editProductAction } from './Views/EditProduct';
import { action as deleteProductAction } from './Components/ProductDetails';

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsloader,
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'productos/:id/editar',// ROA pattern - Resurce-oriented desing
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:id/eliminar',
                action:deleteProductAction

            }
        ]

    }
]);