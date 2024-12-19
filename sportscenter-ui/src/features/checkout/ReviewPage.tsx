import { Fragment } from "react/jsx-runtime";
import { useAppSelector } from "../../app/store/configureStore";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { extractImageName, formatPrice } from "../../app/util/Util";
import BasketSummary from "../basket/BasketSummary";

export default function ReviewPage() {

    const { basket } = useAppSelector(state => state.basket);

    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>Order summary</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Image</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket?.items.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    {product.pictureUrl && (
                                        <img src={"/images/products/" + extractImageName(product)} alt="Product" width="50" height="50" />
                                    )}
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{formatPrice(product.price)}</TableCell>
                            </TableRow>
                        ))}            
                    </TableBody>
                </Table>
            </TableContainer>
            <BasketSummary />
        </Fragment>
    );
}