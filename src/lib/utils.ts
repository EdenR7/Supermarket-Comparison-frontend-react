import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function claculateAvgPrice(prices: { price: number }[]) {
  const total = prices.reduce((acc, price) => acc + Number(price.price), 0);
  return (total / prices.length).toFixed(2);
}
