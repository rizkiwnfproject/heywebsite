import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface TextInputFieldProps {
  control: any;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?:string,
  formDescription?: string;
  disabled?: boolean;
  input?: boolean;
}

const TextInputField = ({
  control,
  label,
  name,
  placeholder,
  type = "text",
  className,
  formDescription,
  disabled = false,
  input = true,
}: TextInputFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {input ? (
              <Input
                disabled={disabled}
                type={type}
                className={className}
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <Textarea
                className={className}
                placeholder={placeholder}
                {...field}
              />
            )}
          </FormControl>
          {formDescription !== null && (
            <FormDescription>{formDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextInputField;
