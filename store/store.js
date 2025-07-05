import { bannerApi } from "@/lib/content/bannerApi";
import { commentPostApi } from "@/lib/content/commentPostApi";
import { faqApi } from "@/lib/content/faqApi";
import { menuApi } from "@/lib/content/menuApi";
import { pageApi } from "@/lib/content/pageApi";
import { postApi } from "@/lib/content/postApi";
import { postCategoryApi } from "@/lib/content/postCategoryApi";
import { amazingSaleApi } from "@/lib/market/amazingSaleApi";
import { brandApi } from "@/lib/market/brandApi";
import { categoryAttributeApi } from "@/lib/market/categoryAttributeApi";
import { categoryValueApi } from "@/lib/market/categoryValueApi";
import { commentApi } from "@/lib/market/commentApi";
import { commonDiscountApi } from "@/lib/market/commonDiscountApi";
import { copanApi } from "@/lib/market/copanApi";
import { deliveryApi } from "@/lib/market/deliveryApi";
import { galleryApi } from "@/lib/market/galleryApi";
import { orderApi } from "@/lib/market/orderApi";
import { paymentApi } from "@/lib/market/paymentApi";
import { productApi } from "@/lib/market/productApi";
import { productCategoryApi } from "@/lib/market/productCategoryApi";
import { productColorApi } from "@/lib/market/productColorApi";
import { storeApi } from "@/lib/market/storeApi";
import { EmailApi } from "@/lib/notify/EmailApi";
import { SMSApi } from "@/lib/notify/SMSApi";
import { settingApi } from "@/lib/setting/settingApi";
import { ticketAdminApi } from "@/lib/ticket/ticketAdminApi";
import { ticketApi } from "@/lib/ticket/ticketApi";
import { ticketCategoryApi } from "@/lib/ticket/ticketCategoryApi";
import { ticketPriorityApi } from "@/lib/ticket/ticketPriorityApi";
import { adminUserApi } from "@/lib/user/adminUserApi";
import { customerApi } from "@/lib/user/customerApi";
import { permissionApi } from "@/lib/user/permissionApi";
import { roleApi } from "@/lib/user/roleApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper";
import { UtilStoreReducer } from "./reducers/customer/UtilSlice";
import { UtilReducer } from "./reducers/dashboard/UtilSlice";
import { homeApi } from "@/lib/customer/homeApi";
import { sliderApi } from "@/lib/content/sliderApi";
import { loginRegisterApi } from "@/lib/auth/loginRegisterApi";
import { authApi } from "@/lib/auth/authApi";
import { AuthReducer } from "./reducers/auth/authSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
 
import {getCookie} from 'cookies-next';
 
// import { persistReducer , persistStore } from "redux-persist";
import { profileApi } from "@/lib/customer/profile/profileApi";
import { addressApi } from "@/lib/customer/salesProccess/addressApi";
import { marketProductApi } from "@/lib/customer/market/productApi";
import { ProductCustomerReducer } from "./reducers/customer/ProductSlice";
import { ProductsCustomerReducer } from "./reducers/customer/ProductsSlice";
import { CartReducer } from "./reducers/customer/cartSlice";
import { cartApi } from "@/lib/customer/salesProccess/cartApi";
import { salesPaymentApi } from "@/lib/customer/salesProccess/paymentApi";
import { PaymentReducer } from "./reducers/customer/paymentSlice";
import { profileCompletionApi } from "@/lib/customer/salesProccess/profileCompletionApi";
import { SidebarReducer } from "./reducers/customer/sidebarSlice";
import { productSizeApi } from "@/lib/market/productSizeApi";
 
 

const storage =  window !== "undefined" ? createWebStorage("local") : createNoopStorage();
 
// const persistConfig = {
//   key: 'root',
//  storage 
// }

const rootReducer = combineReducers({
   
  util: UtilReducer,
  sidebar:  SidebarReducer ,
  auth: AuthReducer,
  productCustomer: ProductCustomerReducer,
  productsCustomer:  ProductsCustomerReducer,
  cart:CartReducer,
  payment: PaymentReducer,
  utilStore:   UtilStoreReducer,
  [postCategoryApi.reducerPath]: postCategoryApi.reducer,
  [productCategoryApi.reducerPath]: productCategoryApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  [faqApi.reducerPath]: faqApi.reducer,
  [pageApi.reducerPath]: pageApi.reducer,
  [brandApi.reducerPath]: brandApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [commentPostApi.reducerPath]: commentPostApi.reducer,
  [galleryApi.reducerPath]: galleryApi.reducer,
  [productColorApi.reducerPath]: productColorApi.reducer,
  [productSizeApi.reducerPath]: productSizeApi.reducer,

  [categoryAttributeApi.reducerPath]: categoryAttributeApi.reducer,
  [categoryValueApi.reducerPath]: categoryValueApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
  [copanApi.reducerPath]: copanApi.reducer,
  [commonDiscountApi.reducerPath]: commonDiscountApi.reducer,
  [amazingSaleApi.reducerPath]: amazingSaleApi.reducer,
  [deliveryApi.reducerPath]: deliveryApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [ticketApi.reducerPath]: ticketApi.reducer,
  [ticketCategoryApi.reducerPath]: ticketCategoryApi.reducer,
  [ticketPriorityApi.reducerPath]: ticketPriorityApi.reducer,
  [ticketAdminApi.reducerPath]: ticketAdminApi.reducer,
  [settingApi.reducerPath]: settingApi.reducer,
  [EmailApi.reducerPath]: EmailApi.reducer,
  [SMSApi.reducerPath]: SMSApi.reducer,
  [adminUserApi.reducerPath]: adminUserApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [permissionApi.reducerPath]: permissionApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [sliderApi.reducerPath]: sliderApi.reducer,
  [homeApi.reducerPath]: homeApi.reducer,
  [loginRegisterApi.reducerPath]: loginRegisterApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [marketProductApi.reducerPath]:marketProductApi.reducer,
  [cartApi.reducerPath]:cartApi.reducer,
  [salesPaymentApi.reducerPath]:salesPaymentApi.reducer,
  [ profileCompletionApi.reducerPath]:profileCompletionApi.reducer




})
 
// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const makeStore = (context) =>
 const store =  configureStore({
  reducer:rootReducer,
  // reducer:persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        thunk: {
          extraArgument:{
            cookie: getCookie('XSRF-TOKEN')
          },
        },
        serializableCheck: false,
      }
    ).concat(
       
      postCategoryApi.middleware,
      postApi.middleware,
      productCategoryApi.middleware,
      bannerApi.middleware,
      menuApi.middleware,
      faqApi.middleware,
      pageApi.middleware,
      brandApi.middleware,
      productApi.middleware,
      commentApi.middleware,
      commentPostApi.middleware,
      galleryApi.middleware,
      productColorApi.middleware,
      productSizeApi.middleware,
      categoryAttributeApi.middleware,
      categoryValueApi.middleware,
      storeApi.middleware,
      copanApi.middleware,
      commonDiscountApi.middleware,
      amazingSaleApi.middleware,
      deliveryApi.middleware,
      paymentApi.middleware,
      orderApi.middleware,
      ticketApi.middleware,
      ticketCategoryApi.middleware,
      ticketPriorityApi.middleware,
      ticketAdminApi.middleware,
      settingApi.middleware,
      EmailApi.middleware,
      SMSApi.middleware,
      adminUserApi.middleware,
      customerApi.middleware,
      permissionApi.middleware,
      roleApi.middleware,
      sliderApi.middleware,
      homeApi.middleware,
      loginRegisterApi.middleware,
      authApi.middleware,
      profileApi.middleware,
      addressApi.middleware,
       marketProductApi.middleware,
       cartApi.middleware,
       salesPaymentApi.middleware,
       profileCompletionApi.middleware,
    ),
});
 
//  const wrapper = createWrapper(makeStore);
 export default store;