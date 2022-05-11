import { useRecoilState, useSetRecoilState } from "recoil";
import { productPriceState, productSideDishState } from "../";

export const useProductSideDish = () => {
  const setPriceState = useSetRecoilState(productPriceState);
  const [sideDishState, setSideDishState] =
    useRecoilState(productSideDishState);
  const { availableSideDish, selectedSideDish } = sideDishState;

  const addSideDish = (itemName: string) => {
    const newSelectedIndex = availableSideDish.findIndex(
      ({ name }) => name === itemName
    );
    const newSelectedPrice = availableSideDish[newSelectedIndex].price;
    const newAvailableSideDish = [
      ...availableSideDish.slice(0, newSelectedIndex),
      ...availableSideDish.slice(newSelectedIndex + 1),
    ];

    setPriceState((oldPrice) => oldPrice + newSelectedPrice);
    setSideDishState({
      selectedSideDish: [
        ...selectedSideDish,
        availableSideDish[newSelectedIndex],
      ],
      availableSideDish: newAvailableSideDish,
    });
  };

  const removeSideDish = (itemName: string) => {
    const newSelectedIndex = selectedSideDish.findIndex(
      ({ name }) => name === itemName
    );
    const newSelectedPrice = selectedSideDish[newSelectedIndex].price;
    const newSelectedSideDish = [
      ...selectedSideDish.slice(0, newSelectedIndex),
      ...selectedSideDish.slice(newSelectedIndex + 1),
    ];

    setPriceState((oldPrice) => oldPrice - newSelectedPrice);
    setSideDishState({
      availableSideDish: [
        ...availableSideDish,
        selectedSideDish[newSelectedIndex],
      ],
      selectedSideDish: newSelectedSideDish,
    });
  };

  return {
    addSideDish,
    removeSideDish,
  };
};
