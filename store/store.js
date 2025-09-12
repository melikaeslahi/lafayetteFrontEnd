import { baseApi } from "@/services/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import { UtilReducer } from "./reducers/dashboard/UtilSlice";
import { SidebarReducer } from "./reducers/customer/sidebarSlice";
import { AuthReducer } from "./reducers/auth/authSlice";
import { ProductCustomerReducer } from "./reducers/customer/ProductSlice";
import { ProductsCustomerReducer } from "./reducers/customer/ProductsSlice";
import { CartReducer } from "./reducers/customer/cartSlice";
import { PaymentReducer } from "./reducers/customer/paymentSlice";
import { UtilStoreReducer } from "./reducers/customer/UtilSlice";

export const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      util:  UtilReducer,
      sidebar: SidebarReducer ,
      auth:  AuthReducer,
      productCustomer:  ProductCustomerReducer,
      productsCustomer:   ProductsCustomerReducer,
      cart: CartReducer,
      payment:  PaymentReducer,
      utilStore: UtilStoreReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

export default store;