import { useEffect, useState } from "react"
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";
import agent from "../../app/api/agent";
import Spinner from "../../app/layout/Spinner";

export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.ApiStore.list()
            .then((products) => setProducts(products.content))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [])

    if (!products) return <h3>Unable to load products</h3>

    if (loading) return <Spinner message="Loading Products..." />

    return (
        <>
           <ProductList products={products} />
        </>
    );

}