/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ReviewPage from "./ReviewPage";
import { ValidationRules } from "./validationRules";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/basket";
import { setBasket } from "../basket/basketSlice";
import { toast } from "react-toastify";
import { Paper, Typography, Stepper, Step, StepLabel, Box, Button } from "@mui/material";

const steps = ["Shipping Address", "Review your Order", "Payment Details"];

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />
        case 1:
            return <ReviewPage />
        case 2: 
            return <PaymentForm />
        default:
            throw new Error("Unknown Step");
    }
}

export default function CheckoutPage() {

    const [activeStep, setActiveStep] = useState(0);

    const [orderNumber, setOrderNumber] = useState(0);

    const [loading, setLoading] = useState(false);

    const currentValidationRule = ValidationRules[activeStep];

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(currentValidationRule)
    });

    const calculateSubTotal = (basket: Basket) => {
        return basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    }; 
    
    const dispatch = useAppDispatch();

    const handleNext = async () => {

        const isValid = await methods.trigger();

        if (isValid) {
            //console.log(methods.getValues());
            const data: FieldValues = methods.getValues();
            if (activeStep == steps.length - 1) {
                // If it's the last step then submit the order
                const basket = await agent.BasketApi.get();
                if (basket) {
                    const subTotal = calculateSubTotal(basket);
                    const deliveryFee = 200;
                    try {
                        // Build order dto and send to backend
                        setLoading(true);
                        const orderDto = {
                            basketId: basket.id,
                            shippingAddress: {
                                name: data.firstName + " " + data.lastName,
                                address1: data.address1,
                                address2: data.address2,
                                city: data.city,
                                state: data.state,
                                zipCode: data.zip,
                                country: data.country
                            },
                            subTotal: subTotal,
                            deliveryFee: deliveryFee
                        };
                        console.log(orderDto);
                        // Call the api to create order
                        const orderId = await agent.OrdersApi.create(orderDto);
                        setOrderNumber(orderId);
                        setActiveStep(activeStep + 1);
                        // Clear the basket
                        agent.BasketApi.deleteBasket(basket.id);
                        dispatch(setBasket(null));
                        // Clear the basket from the local storage
                        localStorage.removeItem('basket_id');
                        localStorage.removeItem('basket')
                    } catch (error) {
                        console.error('Error while submitting the order occurred: ', error);
                        toast.error('Error while submitting the order occurred');
                    } finally {
                        setLoading(false);
                    }
                } else {
                    toast.error('Basket not found in local storage');
                }
            } else {
                // Move to the next step
                setActiveStep(activeStep + 1);

            }
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }

    return (
        <FormProvider {...methods}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography component="h1" variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Fragment>
                    {activeStep === steps.length ? (
                        <Fragment>
                            <Typography variant="h5" gutterBottom>Thank you for your order.</Typography>
                            <Typography variant="subtitle1">
                                Your order number is #{orderNumber}. We have emailed your order confirmation, and will send you an update when your order has shipped.
                            </Typography>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>Back</Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                                </Button>
                            </Box>
                        </Fragment>
                    )}
                </Fragment>
            </Paper>
      </FormProvider>
    );
}