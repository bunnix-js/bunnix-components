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
  border?: "none" | "primary" | "secondary" | "tertiary" | "transparent";
  bgColor?: "primary" | "primary-dimmed" | "secondary" | "success" | "success-dimmed" | "warning" | "warning-dimmed" | "danger" | string;
  margin?: number | string;
  marginX?: number | string;
  marginY?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  padding?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
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
  padding?: number | string | boolean;
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

export interface TextAreaProps extends LayoutProps {
  value?: string | number | StateLike<any>;
  placeholder?: string;
  label?: string;
  outline?: boolean;
  disabled?: boolean;
  minLines?: number;
  maxLines?: number;
  newlineTrigger?: "enter" | "shift-enter" | "command-enter";
  input?: (event?: any) => void;
}

export type MenuAnchor =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right"
  | "bottomLeft"
  | "bottomRight"
  | "topLeft"
  | "topRight";

export interface MenuItem {
  key: string;
  text?: string;
  icon?: string;
  action?: (() => void) | null;
  divider?: boolean;
}

export interface PickerProps extends LayoutProps {
  value?: string | StateLike<string>;
  items?: MenuItem[] | StateLike<MenuItem[]>;
  label?: string;
  outline?: boolean;
  disabled?: boolean;
  anchor?: MenuAnchor;
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

export interface SliderStep {
  value: number;
  label?: string;
}

export interface SliderProps extends LayoutProps {
  value?: number | StateLike<number>;
  min?: number | StateLike<number>;
  max?: number | StateLike<number>;
  step?: number | StateLike<number>;
  steps?: SliderStep[];
  label?: string;
  outline?: boolean;
  disabled?: boolean;
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
  type?: "regular" | "alternate-rows";
  hideHeaders?: boolean;
  renderCell?: (
    record: Record<string, any>,
    rowIndex: number,
    field: string,
  ) => BunnixChild;
}

export interface DialogAction {
  text?: string;
  variant?: string;
  action?: (() => void) | null;
}

export interface DialogConfirmation extends DialogAction {}

export interface ShowDialogOptions {
  title?: string | BunnixChild;
  contents?: any[] | any;
  padding?: number | string;
  width?: number | string;
  height?: number | string;
  secondary?: DialogAction;
  confirmation?: DialogAction;
}

export interface ProgressBarProps extends LayoutProps {
  value?: number | StateLike<number>;
  color?: "primary" | "primary-dimmed" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "error" | "link" | string;
}

export interface OutlineProps extends LayoutProps {
  /** Always-visible trigger content — accepts any Bunnix node (text, icon, row, etc.) */
  anchor?: BunnixChild;
  /** Collapsible content shown when expanded — accepts any Bunnix node */
  details?: BunnixChild;
  /** Whether to render the chevron toggle icon (default: true) */
  showChevron?: boolean;
  /** Controlled open/closed state — accepts a static boolean (initial value) or StateLike<boolean> for two-way binding */
  open?: boolean | StateLike<boolean>;
}

export interface MenuProps extends LayoutProps {
  items?: MenuItem[] | StateLike<MenuItem[]>;
  trigger?:
    | BunnixChild
    | ((state: { isOpen: boolean; toggle: () => void }) => BunnixChild);
  anchor?: MenuAnchor;
}

/** Sidebar navigation item configuration */
export interface SidebarItem {
  /** Unique identifier for the sidebar item */
  key: string;
  /** Display text for the item */
  text: string;
  /** Optional official Framework7 icon name */
  icon?: string;
  /** If true, renders as a section header instead of a clickable item */
  isHeader?: boolean;
  /** Optional nested child items rendered below this item when expanded */
  children?: SidebarItem[];
  /** Initial expanded state for items that have nested children */
  expanded?: boolean;
}

/** Props for the Sidebar component */
export interface SidebarProps extends LayoutProps {
  /** Array of sidebar items or a state object containing items. Supports dynamic updates via StateLike */
  items?: SidebarItem[] | StateLike<SidebarItem[]>;
  /** Currently selected item key, null for no selection, or a state object. Updates on item click */
  selection?: string | null | StateLike<string | null>;
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
export const TextArea: Component<TextAreaProps>;
export const Select: Component<SelectProps>;
export const CheckBox: Component<CheckBoxProps>;
export const Slider: Component<SliderProps>;

export const Table: Component<TableProps>;
export const Code: Component<BaseProps & { html?: string; language?: string }>;

export const Sidebar: Component<SidebarProps>;
export const Picker: Component<PickerProps>;
export const Menu: Component<MenuProps>;
export const Outline: Component<OutlineProps>;

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
