import React, {FC, useEffect, useState} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import cafeApi from '../../api/cafeApi';
import {Producto, ProductsResponse} from '../../interfaces/products';
import {ProductsContext} from './';

export interface ProductsState {
  products: Producto[];
}

interface Props {
  children: React.ReactNode;
}

export const ProductsProvider: FC<Props> = ({children}) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
    setProducts([...resp.data.productos]);
  };

  const addProduct = async (
    categoryId: string,
    productName: string,
  ): Promise<Producto> => {
    const resp = await cafeApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts([...products, resp.data]);

    return resp.data;
  };

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    const resp = await cafeApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts(
      products.map(product =>
        product._id === productId ? resp.data : product,
      ),
    );
  };

  const deleteProduct = async (id: string) => {
    console.log('deleteProduct', id);
  };

  const loadProductById = async (id: string) => {
    const resp = await cafeApi.get<Producto>(`/productos/${id}`);
    return resp.data;
  };

  // TODO: cambiar ANY
  const uploadImage = async (data: ImagePickerResponse, productId: string) => {
    const fileToUpload = {
      uri: data.assets![0].uri,
      type: data.assets![0].type,
      name: data.assets![0].fileName,
    };

    const formData = new FormData();
    formData.append('archivo', fileToUpload);

    try {
      const resp = await cafeApi.put(
        `/uploads/productos/${productId}`,
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      console.log(JSON.stringify(resp.data, null, 2));
    } catch (error: any) {
      console.log(JSON.stringify(error.response, null, 2));
    }
  };
  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
        loadProductById,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
