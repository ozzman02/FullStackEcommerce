import { Grid2, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

export default function AddressForm() {
    
    const { register, formState: { errors } } = useFormContext();

    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <form>
                <Grid2 container spacing={3}>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            required
                            id="firstName"
                            {...register("firstName")}
                            label="First name"
                            fullWidth
                            helperText="Enter First Name"
                            autoComplete="given-name"
                            variant="standard"
                            error={!!errors.firstName}
                        >
                        </TextField>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            required
                            id="lastName"
                            {...register("lastName")}
                            label="Last name"
                            fullWidth
                            helperText="Enter First Name"
                            autoComplete="family-name"
                            variant="standard"
                            error={!!errors.lastName}
                        >
                        </TextField>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            required
                            id="address1"
                            {...register("address1")}
                            label="Address line 1"
                            fullWidth
                            helperText="Enter Address Line 1"
                            autoComplete="shipping address-line1"
                            variant="standard"
                            error={!!errors.address1}
                        >
                        </TextField>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            required
                            id="address2"
                            {...register("address2")}
                            label="Address line 2"
                            fullWidth
                            helperText="Enter Address Line 2"
                            autoComplete="shipping address-line2"
                            variant="standard"
                            error={!!errors.address2}
                        >
                        </TextField>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            required
                            id="city"
                            {...register("city")}
                            label="City"
                            fullWidth
                            helperText="Enter City"
                            autoComplete="shipping address-level2"
                            variant="standard"
                            error={!!errors.city}
                        >
                        </TextField>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            required
                            id="state"
                            {...register("state")}
                            label="State/Province/Region"
                            fullWidth
                            helperText="Enter State"
                            variant="standard"
                            error={!!errors.state}
                        >
                        </TextField>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            required
                            id="zip"
                            {...register("zip")}
                            label="Zip / Postal code"
                            fullWidth
                            helperText="Enter Zip"
                            autoComplete="shipping postal-code"
                            variant="standard"
                            error={!!errors.zip}
                        >
                        </TextField>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                            required
                            id="country"
                            {...register("country")}
                            label="Country"
                            fullWidth
                            helperText="Enter Country"
                            autoComplete="shipping country"
                            variant="standard"
                            error={!!errors.country}
                        >
                        </TextField>
                    </Grid2>
                </Grid2>
            </form>
        </Fragment>
    );

}