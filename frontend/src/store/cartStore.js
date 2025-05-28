import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (product) => set((state) => {
    const exists = state.cartItems.find((item) => item.id === product.id);
    if (exists) {
      return {
        cartItems: state.cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    } else {
      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }
  }),
}));

export default useCartStore;
