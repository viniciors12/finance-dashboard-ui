import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from "@mui/material";
type SelectFieldProps<T, K extends keyof T> = {
  label: string;
  field: K;
  form: T;
  onValueChanged: (key: keyof T, value: T[keyof T]) => void;
  options: { key: string | number; value: string }[];
} & Omit<SelectProps, "value" | "onChange" | "children" | "label">;

export const SelectorField = <T, K extends keyof T>({
  label,
  field,
  form,
  onValueChanged,
  options,
  ...rest
}: SelectFieldProps<T, K>) => {
  return (
    <FormControl fullWidth size="medium">
      <InputLabel id={`${field.toString()}-label`}>{label}</InputLabel>
      <Select
        labelId={`${field.toString()}-label`}
        value={form[field]}
        onChange={(e) => onValueChanged(field, e.target.value as T[keyof T])}
        label={label}
        {...rest}
      >
        {options.map((opt) => (
          <MenuItem key={String(opt.key)} value={opt.key}>
            {opt.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
