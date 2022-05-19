import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { ProductDetailType } from "shared/types";
import {
  productIdState,
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
  const setProductIdState = useSetRecoilState(productIdState);
  const setProductQuantityState = useSetRecoilState(productQuantityState);

  const setProductDetailInitialState = useCallback(
    (item: ProductDetailType) => {
      const {
        options,
        price,
        availableSideDish,
        selectedSideDish,
        id,
        quantity,
      } = item;
      const typePricesArr = options.map(
        ({ variants }) => variants.find(({ selected }) => selected)!.price
      );

      setProductIdState(id);
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
      setProductIdState,
      setProductOptionState,
      setProductTypePriceState,
      setProductQuantityState,
      setProductPriceState,
      setProductSideDishState,
    ]
  );

  return setProductDetailInitialState;
};
