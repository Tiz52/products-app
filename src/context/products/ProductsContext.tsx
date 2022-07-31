import {createContext} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import {Producto} from '../../interfaces/products';

interface ContextProps {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: ImagePickerResponse, id: string) => Promise<void>; // TODO: cambiar ANY
}

export const ProductsContext = createContext({} as ContextProps);
