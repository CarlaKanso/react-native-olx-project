export interface User {
  id: string;
  username: string;
  isLoggedIn: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
}

export interface Location {
  id: string;
  name: string;
  nameAr: string;
}

export interface Ad {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  currency: string;
  location: Location;
  category: Category;
  images: string[];
  createdAt: string;
  phone: string;
  isFeatured: boolean;
}

export type RootStackParamList = {
  MainTabs: undefined;
  Login: undefined;
  AdDetails: { ad: Ad };
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};