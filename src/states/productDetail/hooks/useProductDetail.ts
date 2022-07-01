import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { ProductDetailType } from "shared/types";
import {
  productOptionsState,
  productPriceState,
  productQuantityState,
  productSideDishState,
  productTypePriceState,
} from "..";

export const useProductDetail = () => {
  const setProductOptionState = useSetRecoilState(productOptionsState);
  const setProductPriceState = useSetRecoilState(productPriceState);
  const setProductSideDishState = useSetRecoilState(productSideDishState);
  const setProductTypePriceState = useSetRecoilState(productTypePriceState);
  const setProductQuantityState = useSetRecoilState(productQuantityState);

  const setProductDetailInitialState = useCallback(
    (item: ProductDetailType) => {
      const { options, price, availableSideDish, selectedSideDish, quantity } =
        item;
      const typePricesArr = options.map(
        ({ variants }) => variants.find(({ selected }) => selected)!.price
      );

      setProductOptionState(options);
      setProductTypePriceState(typePricesArr);
      setProductPriceState(price);
      setProductQuantityState(quantity);
      setProductSideDishState({
        availableSideDish,
        selectedSideDish,
      });
    },
    [
      setProductOptionState,
      setProductTypePriceState,
      setProductQuantityState,
      setProductPriceState,
      setProductSideDishState,
    ]
  );

  const clearProductState = useCallback(() => {
    setProductOptionState([]);
    setProductTypePriceState([]);
    setProductPriceState(0);
    setProductQuantityState(1);
    setProductSideDishState({
      availableSideDish: [],
      selectedSideDish: [],
    });
  }, [
    setProductOptionState,
    setProductTypePriceState,
    setProductPriceState,
    setProductQuantityState,
    setProductSideDishState,
  ]);

  return {
    setInitialState: setProductDetailInitialState,
    clearState: clearProductState,
  };
};
