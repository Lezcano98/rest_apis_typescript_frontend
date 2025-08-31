import { object, string, number, boolean,type InferOutput, array, pipe, decimal} from "valibot";

export const DraftProductSchema = object({
    name: string(),
    price: number()
});


export const ProductSchema = object({
    id: number(),
    name: string(),
    price: pipe(string(),decimal()),
    availability: boolean()
});

export const ProductsSchema = array(ProductSchema);

export type Product = InferOutput<typeof ProductSchema>