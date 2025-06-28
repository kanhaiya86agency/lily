import {useEffect, useRef} from 'react';
import {fetchProducts} from '../../Redux/Product/ProductSlice';
import {useAppDispatch} from './hooks';

export const useProductFetcher = (query, selectedTab, location) => {
  console.log('🚀 ~ useProductFetcher ~ location:', location);
  console.log('🚀 ~ useProductFetcher ~ selectedTab:', selectedTab);
  console.log('🚀 ~ useProductFetcher ~ query:', query);
  const dispatch = useAppDispatch();
  const fetchedInitialLocation = useRef(false);
  const debounceTimeout = useRef(null);

  // Fetch on location change (only once unless location changes)
  useEffect(() => {
    if (!location?.coords || fetchedInitialLocation.current) {
      return;
    }

    fetchedInitialLocation.current = true;

    const {latitude, longitude} = location.coords;

    dispatch(
      fetchProducts({
        latitude,
        longitude,
        page: 1,
        limit: 10,
        type: selectedTab,
      }),
    );
  }, [location?.coords, selectedTab, dispatch]);

  // Debounced fetch on query or selectedTab change
  useEffect(() => {
    if (!location?.coords) {
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const {latitude, longitude} = location.coords;

      dispatch(
        fetchProducts({
          latitude,
          longitude,
          search: query.trim() ?? undefined,
          type: selectedTab,
        }),
      );
    }, 400);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query, selectedTab, location?.coords, dispatch]);
};
