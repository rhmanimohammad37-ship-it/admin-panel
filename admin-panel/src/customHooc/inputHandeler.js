import { useState } from "react";

export default function useInputhandeler(value) {
  const [inputValue, setinputValue] = useState(value);

  const changeValue = (event) => {
    setinputValue(event.target.value);
  };

  return [inputValue, changeValue , setinputValue];
}
