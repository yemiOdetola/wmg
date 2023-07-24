import { combineReducers } from "redux";
import uiReducer from "./reducers/ui.reducer";
import authReducer from './reducers/auth.reducer';
import listingReducer from "./reducers/listing.reducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  listing: listingReducer
});

export type RootState = ReturnType<typeof rootReducer>