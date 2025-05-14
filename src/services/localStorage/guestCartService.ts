import { CartItemI, UserMainCartI } from "@/types/cart/cart.types";
import { ProductWithPricesI } from "@/types/products/product.types";
import { customAlphabet } from "nanoid";

const GUEST_CART_KEY = "guest-cart";

// Helper to generate unique IDs for cart items
function generateId(): number {
  const genId = customAlphabet("1234567890", 16);
  console.log(genId());
  return Number(genId()) || -1;
}

// Initialize cart if it doesn't exist
const initGuestCart = (): UserMainCartI => {
  const existingCart = localStorage.getItem(GUEST_CART_KEY);
  if (existingCart) {
    return JSON.parse(existingCart);
  }

  const newCart: UserMainCartI = {
    id: generateId(),
    cartItems: [],
    type: "main",
  };

  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(newCart));
  return newCart;
};

// Update cart in localStorage and return the updated cart
const updateCart = (cart: UserMainCartI): UserMainCartI => {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
  return { ...cart };
};

export const guestCartService = {
  getUserMainCart: (): UserMainCartI => {
    return initGuestCart();
  },

  addProductToCart: (product: ProductWithPricesI, quantity = 1): CartItemI => {
    const cart = initGuestCart();

    // Check if product already exists in cart
    const existingItemIndex = cart.cartItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      throw new Error("Product already exists in cart");
    }

    // Create new cart item
    if (!product) {
      throw new Error("Product details required for guest cart");
    }

    const newCartItem: CartItemI = {
      id: generateId(),
      product,
      quantity,
    };

    cart.cartItems.push(newCartItem);
    updateCart(cart);

    return newCartItem;
  },

  deleteCartItem: (cartItemId: number): void => {
    const cart = initGuestCart();
    cart.cartItems = cart.cartItems.filter((item) => item.id !== cartItemId);
    updateCart(cart);
    return;
  },

  changeCartItemQty: (cartItemId: number, newQty: number): void => {
    const cart = initGuestCart();
    cart.cartItems = cart.cartItems.map((item) =>
      item.id === cartItemId ? { ...item, quantity: newQty } : item
    );
    updateCart(cart);
    return;
  },

  clearCart: (): void => {
    const cart = initGuestCart();
    cart.cartItems = [];
    updateCart(cart);
    return;
  },
};
