import { useRecoilState } from "recoil";
import { productOptionsState, productTypePriceState } from "..";
import _ from "lodash";

export const useProductOptions = () => {
  const [optionsState, setOptionsState] = useRecoilState(productOptionsState);
  const [productTypePrice, setProductTypePrice] = useRecoilState(
    productTypePriceState
  );
  const newOptions = _.cloneDeep(optionsState);
  const newProductTypePrice = [...productTypePrice];

  const handleOptionChange = (title: string, type: string, price: number) => {
    const selectedTypeIndex = newOptions.findIndex(
      ({ name }) => name === title
    );
    const seletectedVariants = newOptions[selectedTypeIndex].variants;
    const selectedVariantIndex = seletectedVariants.findIndex(
      ({ type: variantType }) => variantType === type
    );

    const newSelectedVariants = seletectedVariants.map((variant, i) => {
      let selected = i === selectedVariantIndex;

      return {
        ...variant,
        selected,
      };
    });

    newOptions[selectedTypeIndex].variants = newSelectedVariants;
    newProductTypePrice[selectedTypeIndex] = price;

    setProductTypePrice(newProductTypePrice);
    setOptionsState(newOptions);
  };

  return handleOptionChange;
};
