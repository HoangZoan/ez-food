import React from "react";
import ProductVariantOption from "components/ProductDetailCard/ProductVariantOption";
import { useRecoilValue } from "recoil";
import { productOptionsState } from "states/productDetail";

const ProductVariantOptionList = () => {
  const options = useRecoilValue(productOptionsState);

  return (
    <>
      {options.map(({ name: title, variants }) => (
        <ProductVariantOption key={title} title={title} variants={variants} />
      ))}
    </>
  );
};

export default React.memo(ProductVariantOptionList);
