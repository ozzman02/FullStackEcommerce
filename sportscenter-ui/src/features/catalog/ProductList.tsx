import Grid from '@mui/material/Grid2';
import { Product } from "../../app/models/product";
import ProductCard from './ProductCard';

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    return (
        <Grid container spacing={4}>
            {
                products.map((product) => (
                    <Grid key={product.id} size={{ xs: 3}}>
                        <ProductCard product={product}/>
                    </Grid>
                ))
            }
        </Grid>
    );
}