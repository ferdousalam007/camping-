import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  toast } from "sonner";
export type CartItem = {
    id: string;
    quantity: number;
}
type wishListItem = {
    id: string;
    quantity: number;
}
type CartState = {
    items: CartItem[];
    wishList: wishListItem[];
    modalMessage: string | null;
}

const initialState: CartState = {
    items: [],
    wishList: [],
    modalMessage: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<string>) {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ id: action.payload, quantity: 1 });
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        increaseQuantity(state, action: PayloadAction<string>) {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity(state, action: PayloadAction<string>) {
            const item = state.items.find((item) => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        addToWishList(state, action: PayloadAction<string>) {
            const item = state.wishList.find((item) => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            } else {
                state.wishList.push({ id: action.payload, quantity: 1 });
            }
        },
        removeFromWishList(state, action: PayloadAction<string>) {
            state.wishList = state.wishList.filter((item) => item.id !== action.payload);
            toast.success("Item removed from wishlist!", { duration: 2000 });
            
        },
        increaseWishListQuantity(state, action: PayloadAction<string>) {
            const item = state.wishList.find((item) => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseWishListQuantity(state, action: PayloadAction<string>) {
            const item = state.wishList.find((item) => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        transferToCart(state, action: PayloadAction<string>) {
            const itemIndex = state.wishList.findIndex(item => item.id === action.payload);

            if (itemIndex > -1) {
                const item = state.wishList[itemIndex];
                const cartItem = state.items.find(cartItem => cartItem.id === item.id);

                if (cartItem) {
                    state.modalMessage = 'This product is already in your cart.want to keep this then click close button';
                } else {
                    state.wishList.splice(itemIndex, 1); // Remove from wishlist
                    state.items.push(item); // Add to cart
                    toast.success("Item added to cart!", { duration: 2000 });
                }
            }
        },
        closeModal(state) {
            state.modalMessage = null;
        },
        clearCart(state) {
            state.items = [];
        }
       

    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, addToWishList, removeFromWishList, increaseWishListQuantity, decreaseWishListQuantity, transferToCart, closeModal, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
