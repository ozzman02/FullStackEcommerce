/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import { extractImageName, formatPrice } from "../../app/util/Util";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import Spinner from "../../app/layout/Spinner";

export default function ProductDetails() {

    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product | null>();
    
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        id && agent.ProductsApi.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));   
    },[id]);

    if (loading) return <Spinner message="Loading Product..." />

    if (!product) return <NotFound />

    return (
        <Grid2 container spacing={6}>
            <Grid2 size={{ xs: 6}}>
                <img src={"/images/products/" + extractImageName(product)} alt={product.name} style={{width: '100%'}}></img>
            </Grid2>
            <Grid2 size={{ xs: 6}}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography gutterBottom color="secondary" variant="h4">{formatPrice(product.price)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>
        </Grid2>
    );
}