import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

const initialState: CartState = {
    items: [],
    wishList: [],
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
        transferToCart: (state, action: PayloadAction<string>) => {
            const itemIndex = state.wishList.findIndex(item => item.id === action.payload);
            if (itemIndex > -1) {
                state.wishList.splice(itemIndex, 1); // Remove from wishlist
                state.items.push(state.wishList[itemIndex]); // Add to cart
                state.wishList.splice(itemIndex, 0, state.items[state.items.length - 1]); // Move the transferred item back to the end of wishlist
            }
        },

    },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, addToWishList, removeFromWishList, increaseWishListQuantity, decreaseWishListQuantity, transferToCart } = cartSlice.actions;
export default cartSlice.reducer;
