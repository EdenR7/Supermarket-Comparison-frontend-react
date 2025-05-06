import { UserMainCartI } from "../cart/cart.types";

export interface LoggedInUserI {
  id: number;
  username: string;
  email: string;
  mainCartId: number;
  mainCart: UserMainCartI;
}
