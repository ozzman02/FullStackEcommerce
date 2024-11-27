import { useEffect, useState } from "react"
import { Product } from "../../app/models/product"
import ProductList from "./ProductList";

export default function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:8081/api/products')
          .then(response => response.json())
          .then(data => setProducts(data.content));
    }, []);

    /*
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:8081/api/products');
                    if (!response.ok) {
                        throw new Error('Failed to fetch the data');
                    }
                    const data = await response.json();
                    setProducts(data.content);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };
            fetchData();
        }, []);
    */

    return (
        <>
           <ProductList products={products} />
        </>
    );

}