import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { extractImageName, formatPrice } from "../../app/util/util";
import { useState } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import { LoadingButton } from "@mui/lab";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {

    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const { BasketApi: BasketActions } =  agent;
    
    function addItem() {
        setLoading(true);
        BasketActions.addItem(product, dispatch)
            .then(response => {
                console.log('New Basket: ', response.basket);
                dispatch(setBasket(response.basket));
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }

    return (
        <Card>
            <CardHeader 
                avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{sx:{fontWeight:'bold', color: 'primary.main' }}}
            />
            <CardMedia 
                sx={{ height: 140, backgroundSize:'contain'}} 
                image={"/images/products/"+ extractImageName(product)}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    {formatPrice(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    loading={loading}
                    onClick={addItem}
                    size="small"
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    Add to cart
                </LoadingButton>
                <Button component={Link} to={`/store/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    );
}