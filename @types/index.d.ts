export type BunnixChild = any;
export type BunnixChildren = BunnixChild | BunnixChild[];

export interface BaseProps {
  class?: string;
  [key: string]: unknown;
}

export interface ButtonProps extends BaseProps {
  type?: string;
  variant?: string;
  size?: string;
  href?: string;
  disabled?: boolean;
  onClick?: (event?: any) => void;
  click?: (event?: any) => void;
}

export interface IconProps extends BaseProps {
  name?: string;
  fill?: string;
  size?: string;
}

export interface TextProps extends BaseProps {
  type?: "text" | "paragraph" | "heading1" | "heading2" | "heading3" | "heading4" | string;
  color?: string;
  design?: "regular" | "mono" | string;
}

export interface ContainerProps extends BaseProps {
  type?: "main" | "content" | "page" | string;
  direction?: "horizontal" | "vertical" | string;
}

export interface StackProps extends BaseProps {
  alignment?: "leading" | "middle" | "trailing" | string;
  gap?: "small" | "regular" | "large" | string;
}

export interface BadgeProps extends BaseProps {
  tone?: "base" | "success" | "info" | "warning" | "danger" | "accent" | "dimmed" | string;
  size?: "xs" | "sm" | "md" | string;
  variant?: "solid" | "soft" | "outline" | string;
  icon?: string;
  overlap?: boolean;
  shape?: "capsule" | "circle" | string;
}

export interface InputFieldProps extends BaseProps {
  type?: string;
  variant?: "regular" | "rounded" | string;
  value?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  suggestions?: string[];
  onInput?: (event?: any) => void;
  onChange?: (event?: any) => void;
  onFocus?: (event?: any) => void;
  onBlur?: (event?: any) => void;
  onKeyDown?: (event?: any) => void;
  input?: (event?: any) => void;
  change?: (event?: any) => void;
  focus?: (event?: any) => void;
  blur?: (event?: any) => void;
  keydown?: (event?: any) => void;
}

export interface SearchBoxItem {
  title?: string;
  snippet?: string;
  icon?: string;
  [key: string]: unknown;
}

export interface SearchBoxProps extends BaseProps {
  data?: SearchBoxItem[];
  value?: string | any;
  placeholder?: string;
  onInput?: (event?: any) => void;
  input?: (event?: any) => void;
  size?: "lg" | "xl" | string;
  variant?: "regular" | "rounded" | string;
  onSelect?: (item?: SearchBoxItem) => void;
  select?: (item?: SearchBoxItem) => void;
}

export interface SidebarItem {
  id?: string;
  label?: string;
  icon?: string;
  href?: string | null;
  badge?: string | number | { value?: string | number; tone?: string; variant?: string; size?: string };
  children?: SidebarItem[];
  isExpanded?: boolean;
  isHeader?: boolean;
  isSeparator?: boolean;
  [key: string]: unknown;
}

export interface SidebarProps extends BaseProps {
  items?: SidebarItem[];
  selection?: string;
  onSelect?: (id?: string) => void;
  onItemSelect?: (id?: string) => void;
  searchable?: boolean;
  searchProps?: Record<string, unknown>;
}

export interface NavigationBarProps extends BaseProps {
  title?: string | (() => BunnixChildren);
  leading?: BunnixChildren | (() => BunnixChildren);
  trailing?: BunnixChildren | (() => BunnixChildren);
  searchable?: boolean;
  searchData?: SearchBoxItem[];
  searchValue?: string | any;
  onSearchInput?: (event?: any) => void;
  onSearchSelect?: (item?: SearchBoxItem) => void;
  searchProps?: Record<string, unknown>;
}

export interface DialogConfirmation {
  text?: string;
  action?: () => void;
  variant?: string;
  disabled?: boolean;
  extra?: { text?: string; action?: () => void };
}

export interface ShowDialogOptions {
  title?: string;
  message?: string;
  confirmation?: DialogConfirmation;
  content?: (args: { setConfirmDisabled: (disabled: boolean) => void }) => BunnixChildren;
}

export interface ToastOptions {
  message?: string;
  duration?: number;
  anchor?: "topRight" | "topLeft" | "bottomRight" | "bottomLeft" | string;
  size?: "regular" | "lg" | "xl" | string;
  icon?: string;
}

export type Component<P = BaseProps> = (props?: P, children?: BunnixChildren) => any;

export const AccordionGroup: Component<BaseProps>;
export const Badge: Component<BadgeProps>;
export const Button: Component<ButtonProps>;
export const Checkbox: Component<BaseProps>;
export const ComboBox: Component<BaseProps>;
export const Container: Component<ContainerProps>;
export const DatePicker: Component<BaseProps>;
export const Dialog: Component<BaseProps>;
export const DropdownMenu: Component<BaseProps>;
export const Grid: Component<BaseProps>;
export const HStack: Component<StackProps>;
export const Icon: Component<IconProps>;
export const InputField: Component<InputFieldProps>;
export const NavigationBar: Component<NavigationBarProps>;
export const PageHeader: Component<BaseProps>;
export const PageSection: Component<BaseProps>;
export const PopoverMenu: Component<BaseProps>;
export const RadioCheckbox: Component<BaseProps>;
export const SearchBox: Component<SearchBoxProps>;
export const Sidebar: Component<SidebarProps>;
export const Table: Component<BaseProps>;
export const Text: Component<TextProps>;
export const TimePicker: Component<BaseProps>;
export const ToastNotification: Component<BaseProps>;
export const ToggleSwitch: Component<BaseProps>;
export const VStack: Component<StackProps>;

export const dialogState: any;
export function showDialog(options?: ShowDialogOptions): void;
export function hideDialog(): void;

export const toastState: any;
export function showToast(options?: ToastOptions): void;
export function hideToast(): void;

declare module "@bunnix/components/styles.css" {
  const content: string;
  export default content;
}

declare module "@bunnix/components/styles" {
  const content: string;
  export default content;
}
