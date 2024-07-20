"use client";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

const SelectProduct = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<Option>>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/berry/");
      const data = await response.json();
      const sortedOptions = data.results
        .map((item: any) => ({ value: item.name, label: item.name }))
        .sort((a: Option, b: Option) => a.label.localeCompare(b.label));
      setOptions(sortedOptions);
    };
    fetchOptions();
  }, []);

  const handleChange = (option: SingleValue<Option>) => {
    setSelectedOption(option);
    console.log(`Selected Option: ${JSON.stringify(option)}`);
  };

  return (
    <div>
      <Select options={options} onChange={handleChange} />
      {selectedOption && <p>Selected Option: {selectedOption.label}</p>}
    </div>
  );
};

export default SelectProduct;
