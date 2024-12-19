import { Checkbox, FormControlLabel, Grid2, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

export default function PaymentForm() {
    
    const { register, formState: { errors }} = useFormContext();

    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>Payment Form</Typography>
            <Grid2 container spacing={3}>    
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        id="cardName"
                        {...register("cardName")}
                        label="Name on card"
                        helperText="Enter Name on Card"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                         error={!!errors.cardName}
                    >
                    </TextField>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        id="cardNumber"
                        {...register("cardNumber")}
                        label="Card number"
                        helperText="Enter Card Number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                        error={!!errors.cardNumber}
                    >
                    </TextField>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        id="expDate"
                        {...register("expDate")}
                        label="Expiry date"
                        helperText="Enter Expiry Date"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        error={!!errors.expDate}
                    >
                    </TextField>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                        id="cvv"
                        {...register("cvv")}
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                        error={!!errors.cvv}
                    >
                    </TextField>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="Remember credit card details for next time"
                    />
                </Grid2>    
            </Grid2>    
        </Fragment>
    );
}