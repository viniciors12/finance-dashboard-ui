import { useReducer, useRef } from "react";

const reducer = <T>(state: T, action: any): T => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.key]: action.value };
    case "RESET_FORM":
      return action.payload;
    default:
      return state;
  }
};

const shallowEqual = <T>(a: T, b: T): boolean => {
  const keysA = Object.keys(a as object) as (keyof T)[];
  const keysB = Object.keys(b as object) as (keyof T)[];
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => {
    const valA = a[key];
    const valB = b[key];

    if (valA instanceof Date && valB instanceof Date) {
      return valA.getTime() === valB.getTime();
    }

    return valA === valB;
  });
};

export const useFormReducer = <T>(initialState: T) => {
  const [form, dispatch] = useReducer(reducer<T>, initialState);
  const initialRef = useRef<T>(initialState);

  const onValueChanged = (key: keyof T, value: T[keyof T]) => {
    dispatch({ type: "UPDATE_FIELD", key, value });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM", payload: initialState });
  };

  const hasChanged = !shallowEqual(form, initialRef.current);

  return { form, onValueChanged, resetForm, hasChanged };
};
