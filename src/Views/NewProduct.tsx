import { Link, Form, useActionData, type ActionFunctionArgs, redirect } from 'react-router-dom'
import ErrorMessage from '../Components/ErrorMessage';
import { addProduct } from '../Service/ProductService';
import ProductForm from '../Components/ProductForm';

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error = "";
    if (Object.values(data).includes('')) {

        error = "Todos los campos son obligatorios";
    }
    if (error.length) {
        return error
    }
    await addProduct(data);

    return redirect('/')
}

export default function NewProduct() {

    const error = useActionData() as string;

    return (
        <>
            <div className='flex justify-between items-center mb-5'>
                <h2 className='text-4xl font-black text-slate-500'>Registrar Producto</h2>
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
                <ProductForm />

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded-lg hover:bg-indigo-500"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
