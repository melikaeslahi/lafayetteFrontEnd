"use client";
import { Provider } from "react-redux";

import store from "@/store/store";
import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }) {
  // let persistor = persistStore(store)

  return <Provider store={store}>
    {/* <PersistGate   persistor={persistor} > */}
      {children}
    {/* </PersistGate> */}
  </Provider>;
}
