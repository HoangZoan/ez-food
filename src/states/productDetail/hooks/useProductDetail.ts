import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { ProductDetailType } from "shared/types";
import {
  productInfoState,
  productOptionsState,
  productPriceState,
  productSideDishState,
} from "..";

export const useProductDetail = () => {
  const setProductInfoState = useSetRecoilState(productInfoState);
  const setProductOptionState = useSetRecoilState(productOptionsState);
  const setProductPriceState = useSetRecoilState(productPriceState);
  const setProductSideDishState = useSetRecoilState(productSideDishState);

  const setProductDetailInitialState = useCallback(
    (item: ProductDetailType) => {
      const { id, options, price, sideDish, title } = item;
      setProductInfoState({ id, title });
      setProductOptionState(options);
      setProductPriceState(price);
      setProductSideDishState({
        availableSideDish: sideDish,
        selectedSideDish: [],
      });
    },
    [
      setProductInfoState,
      setProductOptionState,
      setProductPriceState,
      setProductSideDishState,
    ]
  );

  return setProductDetailInitialState;
};
