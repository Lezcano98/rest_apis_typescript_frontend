import { Link, Form, useActionData, type ActionFunctionArgs, redirect, type LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import ErrorMessage from '../Components/ErrorMessage';
import { getProductById, updateProduct } from '../Service/ProductService';
import type { Product } from '../Types';
import ProductForm from '../Components/ProductForm';

export async function loader({ params }: LoaderFunctionArgs) {

    if (params.id !== undefined) {
        const productById = await getProductById(+params.id);
        if (!productById) {
            throw new Response('', { status: 404, statusText: 'Producto no encontrado' })
        }
        else {
            return productById
        }
    }

}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = "";
    if (Object.values(data).includes('')) {

        error = "Todos los campos son obligatorios";
    }
    if (error.length) {
        return error
    }
    if (params.id !== undefined) {
        await updateProduct(data, +params.id)
        return redirect('/')
    }

}

const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]

export default function EditProduct() {

    const error = useActionData() as string;
    const product = useLoaderData() as Product;

    return (
        <>
            <div className='flex justify-between items-center mb-5'>
                <h2 className='text-4xl font-black text-slate-500'>Editar Producto</h2>
                <Link
                    to='/'
                    className='bg-indigo-600 text-white p-3 text-sm rounded-md font-bold hover:bg-indigo-500'
                >
                    Volver Productos
                </Link>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form
                className="mt-10"
                method='POST'
            >

                <ProductForm
                    product={product}
                />

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded-lg hover:bg-indigo-500"
                    value="Actualizar Producto"
                />
            </Form>
        </>
    )
}
