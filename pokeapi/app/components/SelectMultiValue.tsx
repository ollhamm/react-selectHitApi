"use client";
import Select, { MultiValue } from "react-select";
import { useEffect, useState } from "react";
import React from "react";

interface Option {
  value: string;
  label: string;
}

const SelectProduct = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setselectedOptions] = useState<MultiValue<Option>>(
    []
  );
  useEffect(() => {
    const fetchOptions = async () => {
      const respone = await fetch("https://pokeapi.co/api/v2/berry/");
      const data = await respone.json();
      const sortedOptions = data.results
        .map((item: any) => ({ value: item.name, label: item.name }))
        .sort((a: Option, b: Option) => a.label.localeCompare(b.label));
      setOptions(sortedOptions);
    };
    fetchOptions();
  }, []);

  const handleChange = (options: MultiValue<Option>) => {
    setselectedOptions(options);
    console.log(`data : ${JSON.stringify(options)}`);
  };

  return (
    <div>
      <Select isMulti options={options} onChange={handleChange} />
      {selectedOptions.length > 0 && (
        <div>
          Selected Options{" "}
          {selectedOptions.map((options) => (
            <li key={options.value}> {options.label} </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectProduct;
