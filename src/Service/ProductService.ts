import { safeParse, pipe, string, parse, trim, decimal } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductsSchema, type Product, ProductSchema } from "../Types"
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}


export async function addProduct(data: ProductData) {

    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/productos`;
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price

            });
        }
        else {
            throw new Error("Los datos no son validos");
        }

    } catch (error) {
        console.log(error);
    }

}

export async function getProducts() {

    try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/productos`
        const { data } = await axios.get(url);
        const result = safeParse(ProductsSchema, data.data);
        if (result.success) {
            return result.output
        }
        else {
            throw new Error("No se obtuvieron los datos");
        }

    } catch (error) {

        console.log(error);
    }
}

export async function getProductById(id: Product['id']) {

    try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/productos/${id}`
        const { data } = await axios.get(url);
        const result = safeParse(ProductSchema, data.data);
        console.log(result);
        if (result.success) {
            return result.output
        }
        else {
            throw new Error("No se obtuvieron los datos");
        }

    } catch (error) {

        console.log(error);
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {

    try {
        const NumberSchema = pipe(string(), trim(), decimal());
        const result = safeParse(ProductSchema, {
            id: id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        });
        console.log(result)
        if (result.success) {

            const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/productos/${id}`
            await axios.put(url, result.output)
        }


    } catch (error) {
        console.log(error);
    }

}

export async function deleteProuct(id: Product['id']) {

    try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/productos/${id}`

        await axios.delete(url);

    } catch (error) {
        console.log(error);
    }

}

export async function updateProductAvailability(id: Product['id']) {
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/productos/${id}`

        await axios.patch(url);

    } catch (error) {
        console.log(error);
    }
    
}