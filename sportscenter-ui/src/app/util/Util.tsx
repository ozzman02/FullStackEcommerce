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