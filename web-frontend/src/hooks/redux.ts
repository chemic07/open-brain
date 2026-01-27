import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

/* Typed Dispatch */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/* Typed Selector */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
