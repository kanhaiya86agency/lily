import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './AuthSlice/authslice';
import productReducer from './Product/ProductSlice';
import locationReducer from './Location/locationSlice';
import ratingReducer from './Rating/RatingSlice';
import userReducer from './User/UserSlice';
import imageUploadReducer from './S3Images/uploadImagesSlices';
import notificationReducer from './Notification/notificationSlice';
import placesReducer from './Places/placesSlices';
import serviceProviderReducer from './ServiceProvide/serviceProviderSlice';
import feedbackReducer from './feedback/feedbackSlice';
import categoryReducer from './Category/categorySlice';
import roomsReducer from './Chat/chatRoomSlice';
import VerifyReducer from './OtpAuthSlice/authSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Setup persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['location', 'products'], // persist data here
};

const rootReducer = combineReducers({
  auth: authReducer,
  otpVerify: VerifyReducer,
  products: productReducer,
  location: locationReducer,
  ratings: ratingReducer,
  user: userReducer,
  imageUpload: imageUploadReducer,
  notification: notificationReducer,
  places: placesReducer,
  serviceProvider: serviceProviderReducer,
  feedback: feedbackReducer,
  categories: categoryReducer,
  rooms: roomsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
