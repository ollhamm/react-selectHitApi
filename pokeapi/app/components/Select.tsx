"use client";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

const selectProduct = () => {
  const [datas, setDatas] = useState();
  const [selectOption, setSelectOption] = useState<SingleValue<Option>>();
  const GetApi = async () => {
    const barang = await fetch("https://pokeapi.co/api/v2/berry/");
    const value = await barang.json();
    const result = value.results
      .map((data: any) => {
        return {
          value: data.name,
          label: data.name,
        };
      })
      .sort((a: Option, b: Option) => a.label.localeCompare(b.label));
    setDatas(result);
  };

  useEffect(() => {
    GetApi();
  }, []);

  const handleChange = (option: SingleValue<Option>) => {
    setSelectOption(option);
    if (option) {
      console.log(`data : ${JSON.stringify(option)}`);
    }
  };

  return (
    <div>
      <Select options={datas} onChange={handleChange} />
      {selectOption && (
        <div>
          <p> Selected Options : {selectOption.label}</p>
        </div>
      )}
    </div>
  );
};
export default selectProduct;
