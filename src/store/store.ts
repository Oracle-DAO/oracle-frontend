import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./slices/account-slice";
import bondingReducer from "./slices/bond-slice";
import hyperbondingReducer from "./slices/hyperbond_slice";
import appReducer from "./slices/app-slice";
import pendingTransactionsReducer from "./slices/pending-txns-slice";
import messagesReducer from "./slices/messages-slice";
import wrappingReducer from "./slices/wrap-slice";

const store = configureStore({
    reducer: {
        account: accountReducer,
        bonding: bondingReducer,
        hyperbonding: hyperbondingReducer,
        app: appReducer,
        pendingTransactions: pendingTransactionsReducer,
        messages: messagesReducer,
        wrapping: wrappingReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
