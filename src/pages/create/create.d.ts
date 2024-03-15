export interface TextInputProps extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  as: 'input' | 'textarea';
  type?: string;
  title: string;
  error?: FieldErrors<z.infer<unknown>>;
  height?: number;
  required?: boolean;
  maxLength: number | undefined;
  placeholder: string;
  registerName: 'recipeTitle' | 'recipeDesc' | 'keywords' | 'time';
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

export interface FileInputProps extends HTMLAttributes<HTMLInputElement> {
  id: string;
  error?: FieldErrors<z.infer<unknown>>;
  register: UseFormRegister<FormValues>;
  data?: FileList | null;
  preview?: string;
  handleInput?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export type FieldError = {
  type: string;
  message?: string;
};

export type FormValues = z.infer<typeof schema>;
