/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import { extractImageName, formatPrice } from "../../app/util/Util";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import Spinner from "../../app/layout/Spinner";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails() {

    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<Product | null>();
    
    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(0);
    
    const [submitting, setSubmitting] = useState(false);
    
    const { basket } = useAppSelector(state => state.basket);

    const item = basket?.items.find(i => i.id === product?.id);
    
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (item) setQuantity(item.quantity);
        id && agent.ProductsApi.details(parseInt(id))       
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id, item]);

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const updateQuantity = async () => {
        try {
            setSubmitting(true);
            const newItem = {
                ...product!,
                quantity: quantity
            };
            if (item) {
                const quantityDifference = quantity - item.quantity;
                if (quantityDifference > 0) {
                    // Increment the quantity of an existing item in the basket
                    await agent.BasketApi.incrementItemQuantity(item.id, quantityDifference, dispatch);
                } else if (quantityDifference < 0) {
                    // Decrement the quantity of an existing item in the basket
                    await agent.BasketApi.decrementItemQuantity(item.id, Math.abs(quantityDifference), dispatch);
                }
            } else {
                // Add a new item to the basket
                await agent.BasketApi.addItem(newItem, dispatch);
            }
            setSubmitting(false);
        } catch (error) {
            console.error("Failed to update quantity:", error);
            // Handle error
            setSubmitting(false);
        }
    };

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
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 6 }}>
                        <TextField
                            onChange={inputChange} 
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 6}}>
                        <LoadingButton
                            sx={{ height: '55px' }}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                            loading={submitting}
                            onClick={updateQuantity}
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    );
}