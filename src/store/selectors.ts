import { TypedUseSelectorHook, useSelector } from "react-redux";
import { IAppState } from "store/store";

export const useAppSelector: TypedUseSelectorHook<IAppState> = useSelector;