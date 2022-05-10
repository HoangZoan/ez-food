import { ProductDetailStateType } from "shared/types";

export const addSideDish = (
  oldState: ProductDetailStateType,
  itemName: string
) => {
  const { availableSideDish, selectedSideDish } = oldState;
  const newSelectedIndex = availableSideDish.findIndex(
    ({ name }) => name === itemName
  );
  const newAvailableSideDish = [
    ...availableSideDish.slice(0, newSelectedIndex),
    ...availableSideDish.slice(newSelectedIndex + 1),
  ];

  return {
    ...oldState,
    selectedSideDish: [
      ...selectedSideDish,
      availableSideDish[newSelectedIndex],
    ],
    availableSideDish: newAvailableSideDish,
  };
};

export const removeSideDish = (
  oldState: ProductDetailStateType,
  itemName: string
) => {
  const { availableSideDish, selectedSideDish } = oldState;
  const newRemovedIndex = selectedSideDish.findIndex(
    ({ name }) => name === itemName
  );
  const newSelectedSideDish = [
    ...selectedSideDish.slice(0, newRemovedIndex),
    ...selectedSideDish.slice(newRemovedIndex + 1),
  ];

  return {
    ...oldState,
    availableSideDish: [
      ...availableSideDish,
      selectedSideDish[newRemovedIndex],
    ],
    selectedSideDish: newSelectedSideDish,
  };
};
