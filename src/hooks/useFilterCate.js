import { useState } from 'react';

export const useFilterCate = (initialValue) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleCate = (event) => {
    setSelectedValue(event.target.value);
  };

  const checkedOutRadio = (event) => {
    const clickedValue = event.target.value;
    setSelectedValue((prev) => (prev === clickedValue ? '' : clickedValue));
  };

  return [selectedValue, handleCate, checkedOutRadio];
};
