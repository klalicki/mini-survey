"use client";
import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { id: "value1", name: "label1" },
    { id: "value2", name: "label2" },
    { id: "value3", name: "label3" },
  ];
  return (
    <Select
      options={options}
      getOptionLabel={(options) => options["name"]}
      getOptionValue={(options) => options["id"]}
    />
  );
}
