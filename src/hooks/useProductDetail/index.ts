import { useReducer, Reducer } from "react";
import { OptionsType, SideDistType } from "shared/types";

type GenerateInitialStateFnType = (
  price: number,
  options: OptionsType[],
  sideDish: SideDistType[]
) => StateType;

type UseProductDetailType = (
  price: number,
  options: OptionsType[],
  sideDish: SideDistType[]
) => StateType;

interface StateType {
  options: boolean[][];
  availableSideDish: SideDistType[];
  selectedSideDish: SideDistType[];
  quantity: number;
  totalPrice: number;
}

const generateInitialState: GenerateInitialStateFnType = (
  price,
  options,
  sideDish
) => {
  const initStateOptions =
    options.length > 0
      ? options.map(({ variants }) =>
          variants.map(({ defaultChoice }) => Boolean(defaultChoice))
        )
      : [];

  return {
    options: initStateOptions,
    availableSideDish: sideDish,
    selectedSideDish: [],
    quantity: 1,
    totalPrice: price,
  };
};

const reducerFn = (prevState: StateType, action: any) => {
  return prevState;
};

export const useProductDetail: UseProductDetailType = (
  price,
  options,
  sideDish
) => {
  const [state, dispatch] = useReducer(
    reducerFn,
    generateInitialState(price, options, sideDish)
  );

  const {
    options: stateOption,
    availableSideDish,
    selectedSideDish,
    totalPrice,
    quantity,
  } = state;

  return {
    options: stateOption,
    availableSideDish,
    selectedSideDish,
    totalPrice,
    quantity,
  };
};
