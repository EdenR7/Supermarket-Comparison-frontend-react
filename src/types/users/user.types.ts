import { CartI } from "../cart/cart.types";

export interface LoggedInUserI {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  mainCart: CartI;
}
