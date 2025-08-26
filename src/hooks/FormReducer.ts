import { useCallback, useReducer } from "react";

type FormAction<T> = {
  field: keyof T;
  value: any;
};

const formReducer = <T>(state: T, action: FormAction<T>): T => ({
  ...state,
  [action.field]: action.value,
});

export const useFormReducer = <T>() => {
  const [form, dispatch] = useReducer(formReducer, {
    type: 0,
    category: "",
    description: "",
    amount: 0,
    date: new Date(),
  } as T);

  const onValueChanged = useCallback(
    <K extends keyof T>(key: K) => {
      return (newValue?: T[K]) => {
        dispatch({ field: key, value: newValue });
      };
    },
    [dispatch]
  );

  return { form, onValueChanged };
};
