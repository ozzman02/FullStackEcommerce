import axios from "axios";
import { Basket, BasketItem, BasketTotals } from "../models/basket";
import { Dispatch } from "redux";
import { Product } from "../models/product";
import { setBasket } from "../../features/basket/basketSlice";
import { createId } from "@paralleldrive/cuid2";

class BasketService {

    apiUrl = "http://localhost:8081/api/baskets";

    async getBasketFromApi(): Promise<Basket> {
        try {
            const response = await axios.get<Basket>(`${this.apiUrl}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to retrieve the basket." + error);
        }
    };

    async getBasket(): Promise<Basket> {
        try {
            const basket = localStorage.getItem('basket');
            if (basket) {
                return JSON.parse(basket) as Basket;
            } else {
                throw new Error("Basket not found in local storage");
            }
        } catch (error) {
            throw new Error("Failed to retrieve the basket: " + error);
        }
    };

    async addItemToBasket(item: Product, quantity: number = 1, dispatch: Dispatch): Promise<{
        basket: Basket;
        totals: BasketTotals;
    }> {
        try {
            let basket = this.getCurrentBasket();
            if (!basket) {
                basket = await this.createBasket();
            }
            const itemToAdd = this.mapProductToBasket(item);
            basket.items = this.upsertItems(basket.items, itemToAdd, quantity);
            this.setBasket(basket, dispatch);
            const totals = this.calculateTotals(basket);
            return {
                basket,
                totals
            }
        } catch (error) {
            throw new Error("Failed to add an item to the basket: " + error);
        }
    };

    async remove(itemId: number, dispatch: Dispatch): Promise<void> {
        const basket = this.getCurrentBasket();
        if (basket) {
            const itemIndex = basket.items.findIndex((p) => p.id === itemId);
            if (itemIndex !== -1){
                basket.items.splice(itemIndex, 1);
                this.setBasket(basket, dispatch);
            }
            //check if basket is empty after removing the item
            if (basket.items.length === 0){
                //clear the the basket from the local storage
                localStorage.removeItem('basket_id');
                localStorage.removeItem('basket');
            }
        }
    };

    async setBasket(basket: Basket, dispatch: Dispatch): Promise<void> {
        try {
            await axios.post<Basket>(this.apiUrl, basket);
            localStorage.setItem('basket', JSON.stringify(basket));
            dispatch(setBasket(basket));
        } catch (error) {
            throw new Error("Failed to update basket: " + error);
        }
    };

    async deleteBasket(basketId: string): Promise<void> {
        try {
            await axios.delete(`${this.apiUrl}/${basketId}`);
        } catch(error) {
            throw new Error("Failed to delete the basket: " + error);
        }
    };

    async incrementItemQuantity(itemId: number, quantity: number = 1, dispatch: Dispatch): Promise<void> {
        const basket = this.getCurrentBasket();
        if (basket) {
            const item = basket.items.find((p) => p.id === itemId);
            if (item) {
                item.quantity += quantity;
                if (item.quantity < 1) {
                    item.quantity = 1;
                }
                this.setBasket(basket, dispatch);
            }
        }
    };

    async decrementItemQuantity(itemId: number, quantity: number = 1, dispatch: Dispatch): Promise<void> {
        const basket = this.getCurrentBasket();
        if (basket) {
            const item = basket.items.find((p) => p.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= quantity;
                this.setBasket(basket, dispatch);
            }
        }
    };

    private getCurrentBasket(): Basket | null {
        const basket = localStorage.getItem('basket');
        return basket ? JSON.parse(basket) as Basket : null;
    };

    private async createBasket(): Promise<Basket> {
        try {
            const newBasket: Basket = {
                id: createId(),
                items: []
            };
            localStorage.setItem('basket_id', newBasket.id);
            return newBasket;
        } catch (error) {
            throw new Error("Failed to create basket: " + error);
        }
    };

    private mapProductToBasket(item: Product): BasketItem {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            quantity: 0,
            pictureUrl: item.pictureUrl,
            brand: item.brand,
            type: item.type
        };
    };

    private upsertItems(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
        const existingItem = items.find(x => x.id == itemToAdd.id);
        if (existingItem) {
            existingItem.quantity += quantity; 
        } else {
            itemToAdd.quantity = quantity;
            items.push(itemToAdd);
        }
        return items;
    };

    private calculateTotals(basket: Basket): BasketTotals {
        const shipping = 0;
        const subTotal = basket.items.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);
        const total = shipping + subTotal;
        return {
            shipping,
            subTotal,
            total
        };
    };
}

export default new BasketService();