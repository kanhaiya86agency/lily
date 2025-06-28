import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getOwnServices, getProducts, getProductsById} from './ProdutThunk';
import {Product, ProductState} from './ProductType';

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  allServices: [],
};

export const fetchProducts = createAsyncThunk<
  Product[],
  {
    latitude: number;
    longitude: number;
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
  }
>('products/fetchProducts', async (params, {rejectWithValue}) => {
  try {
    const data = await getProducts(params);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message ?? 'Something went wrong');
  }
});

export const fetchOwnService = createAsyncThunk(
  'feedback/fetchAll',
  async _ => {
    return await getOwnServices();
  },
);

export const fetchProductById = createAsyncThunk<
  Product,
  {id: string},
  {rejectValue: string}
>('products/fetchProductById', async ({id}, {rejectWithValue}) => {
  try {
    const product = await getProductsById({id});
    return product;
  } catch (error: any) {
    return rejectWithValue(error.message ?? 'Failed to fetch product');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch product';
      })

      .addCase(fetchOwnService.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOwnService.fulfilled, (state, action) => {
        state.loading = false;
        state.allServices = action.payload;
      })
      .addCase(fetchOwnService.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to fetch product';
      });
  },
});

export default productSlice.reducer;
