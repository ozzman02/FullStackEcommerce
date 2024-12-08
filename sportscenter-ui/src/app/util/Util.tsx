import { Basket } from "../models/basket";
import { Product } from "../models/product";

export const extractImageName = (item: Product): string | null => {
    if (item && item.pictureUrl) {
        const parts = item.pictureUrl.split('/');
        if (parts.length > 0) {
            return parts[parts.length - 1];
        }
    }
    return null;
};

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-In', {
        style:'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(price);
};

export function getBasketFromLocalStorage(): Basket | null {
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
        try {
            const parsedBasket: Basket = JSON.parse(storedBasket);
            return parsedBasket;
        } catch (error) {
            console.log('Error parsing basket from local storage: ', error);
            return null;
        }
    }
    return null;
}