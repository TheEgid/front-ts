import { AnyAction, configureStore, EnhancedStore, Middleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import { fileApi } from "../features/fileInputForm/fileInputFormFileApi";
import { tumblerSlice } from "../features/tumbler/tumblerSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({});
export type RootState = ReturnType<typeof rootReducer>;

// const userPersistConfig = {
//     key: "auth",
//     storage: AsyncStorage,
// };

export const store = configureStore({
    reducer: {
        tumblerReduser: tumblerSlice.reducer,
        [fileApi.reducerPath]: fileApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(fileApi.middleware),
    ],
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
