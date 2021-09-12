import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { mainContentReducer } from "./mainContentReducer";
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { loginReducer } from "./loginReducer";

let reducers = combineReducers({
    mainContent: mainContentReducer,
    login: loginReducer
});

type Reducers = typeof reducers;
export type AppState = ReturnType<Reducers>;

type Properties<T> = T extends {[key: string]: infer U} ? U : never;
export type ActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<Properties<T>>;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppState, unknown, A>;

// export let store = createStore(reducers)
export let store = createStore(reducers, applyMiddleware(thunkMiddleware))