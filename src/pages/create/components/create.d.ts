export interface TextInputProps extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  as: 'input' | 'textarea';
  title: string;
  error?: FieldErrors<z.infer<unknown>>;
  height?: number;
  maxLength: number | undefined;
  placeholder: string;
  registerName: 'recipeTitle' | 'recipeDesc';
  register: UseFormRegister<FormValues>;
}

export interface FieldsetInputProps {
  title: string;
  id: 'ingredients' | 'seasoning';
  required?: boolean;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  getValues: UseFormGetValues<FormValues>;
}

export interface SelectorProps {
  title: string;
  id: 'difficult' | 'category';
  optionList: string[];
  register: UseFormRegister<FormValues>;
}

export interface FileInputProps {
  id: string;
  register: UseFormRegister<FormValues>;
}

export type FieldError = {
  type: string;
  message?: string;
};

export type FormValues = z.infer<typeof schema>;
