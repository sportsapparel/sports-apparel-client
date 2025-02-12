export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  subcategories: Subcategory[];
}

export interface HeaderProps {
  categories?: Category[];
}
