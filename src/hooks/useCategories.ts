import {useEffect, useState} from 'react';
import cafeApi from '../api/cafeApi';
import {CategoriesResponse, Categoria} from '../interfaces/categories';

export const useCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Categoria[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const resp = await cafeApi.get<CategoriesResponse>('/categorias');
    setCategories(resp.data.categorias);
    setLoading(false);
  };

  return {
    loading,
    categories,
  };
};
