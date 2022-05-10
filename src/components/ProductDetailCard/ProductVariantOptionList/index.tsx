import React from "react";
import ProductVariantOption from "components/ProductDetailCard/ProductVariantOption";
import { useRecoilValue } from "recoil";
import { productDetailState } from "states/productDetail";

const ProductVariantOptionList = () => {
  const { options } = useRecoilValue(productDetailState);

  return (
    <>
      {options.map(({ name: title, variants }) => (
        <ProductVariantOption key={title} title={title} variants={variants} />
      ))}
    </>
  );
};

export default ProductVariantOptionList;
