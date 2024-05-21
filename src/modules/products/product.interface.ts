export type Variant = {
  type: string;
  value: string;
};

export type Inventory = {
  quantity: number;
  inStock: boolean;
};

export type Student = {
  name: string;
  description: string;
  price: string;
  category: string;
  tags: string[];
  variant: Variant[];
  inventory: Inventory;
};
