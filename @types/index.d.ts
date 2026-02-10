export type BunnixChild = any;
export type BunnixChildren = BunnixChild | BunnixChild[];

export interface BaseProps {
  class?: string;
  style?: Record<string, unknown>;
  [key: string]: unknown;
}

export type StateLike<T = any> = {
  get: () => T;
  set?: (value: T) => void;
  subscribe: (...args: any[]) => any;
  map?: (fn: (value: T) => any) => any;
};

export interface LayoutProps extends BaseProps {
  gap?: number | string;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  fillWidth?: boolean;
  fillHeight?: boolean;
  marginX?: number | string;
  marginY?: number | string;
}

export interface GridColumn {
  size?: "auto" | number | string;
}

export interface GridProps extends LayoutProps {
  layout?: "fixed" | "flex" | string;
  columns?: GridColumn[];
  gridGap?: number | string;
}

export interface HeadingProps extends LayoutProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  color?: string;
  weight?: string | number;
}

export interface TextProps extends LayoutProps {
  color?: string;
  weight?: string | number;
  textSize?: string;
  wrap?: "wrap" | "nowrap";
}

export interface MediaProps extends LayoutProps {
  src?: string;
  svg?: string;
}

export interface IconProps extends LayoutProps {
  name?: string;
  color?: string;
}

export interface ButtonProps extends LayoutProps {
  type?: string;
  variant?: "primary" | "secondary" | "tertiary" | "danger" | string;
  disabled?: boolean | StateLike<boolean>;
  outline?: boolean;
  padding?: boolean;
  click?: (event?: any) => void;
}

export interface LinkButtonProps extends LayoutProps {
  type?: string;
  variant?: "primary" | "secondary" | "tertiary" | "danger" | string;
  disabled?: boolean | StateLike<boolean>;
  outline?: boolean;
  click?: (event?: any) => void;
}

export interface TextInputProps extends LayoutProps {
  value?: string | number | Date | StateLike<any>;
  placeholder?: string;
  type?: string;
  label?: string;
  outline?: boolean;
  disabled?: boolean;
  input?: (event?: any) => void;
}

export interface SelectOption {
  key?: string;
  content?: any;
}

export interface SelectProps extends LayoutProps {
  value?: string | StateLike<string>;
  options?: SelectOption[];
  label?: string;
  outline?: boolean;
  disabled?: boolean;
  input?: (event?: any) => void;
}

export interface CheckBoxProps extends LayoutProps {
  checked?: boolean | StateLike<boolean>;
  value?: boolean | StateLike<boolean>;
  label?: string;
  outline?: boolean;
  disabled?: boolean;
  change?: (event?: any) => void;
  input?: (event?: any) => void;
}

export interface TableHeader {
  content?: any;
  key?: string;
  size?: number | string;
}

export interface TableProps extends LayoutProps {
  headers?: TableHeader[];
  rows?: Array<Record<string, any>>;
}

export interface DialogConfirmation {
  text?: string;
  variant?: string;
  action?: (() => void) | null;
}

export interface ShowDialogOptions {
  title?: string;
  contents?: any[] | any;
  confirmation?: DialogConfirmation;
}

export interface ProgressBarProps extends LayoutProps {
  value?: number | StateLike<number>;
  color?: "primary" | "primary-dimmed" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "error" | "link" | string;
}

export type Component<P = BaseProps> = (props?: P, ...children: BunnixChildren[]) => any;

export const Column: Component<LayoutProps>;
export const Row: Component<LayoutProps>;
export const Spacer: Component<LayoutProps & { type?: "horizontal" | "vertical" | string }>;
export const Grid: Component<GridProps>;

export const Heading: Component<HeadingProps>;
export const Text: Component<TextProps>;

export const Media: Component<MediaProps>;
export const Icon: Component<IconProps>;
export const Spinner: Component<LayoutProps>;
export const Avatar: Component<LayoutProps & { src?: string; letter?: string }>;

export const Button: Component<ButtonProps>;
export const LinkButton: Component<LinkButtonProps>;

export const TextInput: Component<TextInputProps>;
export const Select: Component<SelectProps>;
export const CheckBox: Component<CheckBoxProps>;

export const Table: Component<TableProps>;
export const Code: Component<BaseProps & { html?: string; language?: string }>;

export const Sidebar: Component<BaseProps>;
export const Menu: Component<BaseProps>;

export function useDialog(): {
  Dialog: Component<BaseProps>;
  showDialog: (options?: ShowDialogOptions) => void;
};

export const ProgressBar: Component<ProgressBarProps>;

declare module "@bunnix/components/styles.css" {
  const content: string;
  export default content;
}

declare module "@bunnix/components/styles" {
  const content: string;
  export default content;
}
