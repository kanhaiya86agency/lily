import apiClient from '../../utils/apiClient';
import {Product} from './ProductType';

export const getProducts = async ({
  latitude,
  longitude,
  page,
  limit,
  type,
  search,
}: {
  latitude: number;
  longitude: number;
  page?: number;
  limit?: number;
  type?: string;
  search?: string;
}) => {
  console.log(
    '🚀 ~ latitude:>>>>>>>>>>>>>>>>>>>',
    latitude,
    longitude,
    page,
    limit,
    type,
    search,
  );

  const response = await apiClient.get('/service-providers/all-list', {
    params: {
      latitude,
      longitude,
      page,
      limit,
      type,
      search,
    },
  });
  return response.data.data;
};

export const getProductsById = async ({id}: {id: string}) => {
  const response = await apiClient.get(`/service-providers/${id}`);
  return response.data.data;
};

export const getOwnServices = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get('/service-providers');
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};
