import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { ProductDetailType } from "shared/types";
import {
  productOptionsState,
  productPriceState,
  productSideDishState,
  productTypePriceState,
} from "..";

export const useProductDetail = () => {
  const setProductOptionState = useSetRecoilState(productOptionsState);
  const setProductPriceState = useSetRecoilState(productPriceState);
  const setProductSideDishState = useSetRecoilState(productSideDishState);
  const setProductTypePriceState = useSetRecoilState(productTypePriceState);

  const setProductDetailInitialState = useCallback(
    (item: ProductDetailType) => {
      const { options, price, sideDish } = item;
      const defaultTypePrice = options.map(() => 0);

      setProductOptionState(options);
      setProductTypePriceState(defaultTypePrice);
      setProductPriceState(price);
      setProductSideDishState({
        availableSideDish: sideDish,
        selectedSideDish: [],
      });
    },
    [
      setProductOptionState,
      setProductTypePriceState,
      setProductPriceState,
      setProductSideDishState,
    ]
  );

  return setProductDetailInitialState;
};
