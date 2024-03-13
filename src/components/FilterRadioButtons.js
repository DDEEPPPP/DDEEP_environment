import React from 'react';

function FilterRadioButtons({ options, currentValue, onChange, onClick }) {
  return (
    <>
      {options.map((catNum, index) => (
        <div key={catNum.rnum}>
          <input
            type="radio"
            value={catNum.code}
            id={`${catNum.code}_${index}`}
            checked={catNum.code === currentValue}
            onChange={onChange}
            onClick={onClick}
          />
          <label htmlFor={`${catNum.code}_${index}`}>{`#${catNum.name}`}</label>
        </div>
      ))}
    </>
  );
}

export default FilterRadioButtons;
