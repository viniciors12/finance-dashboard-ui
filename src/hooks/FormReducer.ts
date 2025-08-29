import { useCallback, useReducer, useRef } from "react";

type FormAction<T> = {
  field: keyof T;
  value: any;
};

const formReducer = <T>(state: T, action: FormAction<T>): T => ({
  ...state,
  [action.field]: action.value,
});

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
  const [form, dispatch] = useReducer(formReducer<T>, initialState);
  const initialRef = useRef<T>(initialState);

  const onValueChanged = useCallback(
    <K extends keyof T>(key: K) => {
      return (newValue?: T[K]) => {
        dispatch({ field: key, value: newValue });
      };
    },
    [dispatch]
  );
  const hasChanged = !shallowEqual(form, initialRef.current);

  return { form, onValueChanged, hasChanged };
};
