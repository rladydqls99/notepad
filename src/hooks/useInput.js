import { useState } from "react";

function useInput(initialValue) {
  const [inputState, setInputState] = useState(initialValue);

  const onChange = (e) => {
    const { value } = e.target;
    setInputState(value);
  };

  return [inputState, onChange];
}

export default useInput;
