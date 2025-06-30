import { useState, useCallback } from "react";

function useIncrement(initialValue: number = 0, step: number = 1) {
  const [value, setValue] = useState(initialValue);

  const increment = useCallback(() => {
    setValue((prev) => prev + step);
  }, [step]);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return { value, increment, reset };
}

export default useIncrement;
