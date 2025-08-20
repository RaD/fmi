export const urls = {
  WELCOME: 'welcome',
  MENU: 'menu',
  ORDER: 'order',
  PAYMENT: 'payment',
  PROCESS: 'process',
  READY: 'ready',
  NOT_WORKING: 'not-working',
  YAML_CONSOLE: 'yaml-console',
};

export const enableYamlConsole = false;

export interface MenuItem {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
  ingredients: Ingredient[];
  available: boolean;
}

export interface Ingredient {
  id: string;
  title: string;
  price: number;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedIngredients: Ingredient[];
  totalPrice: number;
}

export interface PaymentMethod {
  id: string;
  title: string;
  icon: string;
  url: string;
}
