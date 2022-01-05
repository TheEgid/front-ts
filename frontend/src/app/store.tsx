import { AnyAction, configureStore, EnhancedStore, Middleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import { tumblerSlice, IRowsQty } from "../features/tumbler/tumblerSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({});
export type RootState = ReturnType<typeof rootReducer>;

// const userPersistConfig = {
//     key: "auth",
//     storage: AsyncStorage,
// };

export const store: EnhancedStore<{ tumblerReduser: IRowsQty }> = configureStore({
    reducer: {
        tumblerReduser: tumblerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    ],
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
