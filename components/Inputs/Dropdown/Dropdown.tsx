import { useState } from "react";
import Select from "react-select";
export const Dropdown = ({ options, value }) => {
  const [selected, setSelected] = useState(value);
  const optionsNew = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  console.log(options);
  // wrapping React Select for now, may create my own component later
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="App">
      <Select defaultValue={""} onChange={() => {}} options={optionsNew} />
    </div>
  );
};
