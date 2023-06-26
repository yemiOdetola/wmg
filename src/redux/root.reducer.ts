import { combineReducers } from "redux";
import uiReducer from "./reducers/ui.reducer";
import authReducer from './reducers/auth.reducer';

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>