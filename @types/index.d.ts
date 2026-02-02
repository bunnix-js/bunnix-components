export type BunnixChild = any;
export type BunnixChildren = BunnixChild | BunnixChild[];

export interface BaseProps {
  class?: string;
  [key: string]: unknown;
}

export interface ButtonProps extends BaseProps {
  type?: string;
  variant?: string;
  size?: "sm" | "md" | "lg" | "xl" | string;
  href?: string;
  disabled?: boolean;
  onClick?: (event?: any) => void;
  click?: (event?: any) => void;
}

export interface IconProps extends BaseProps {
  name?: string;
  fill?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string;
}

export interface TextProps extends BaseProps {
  type?: "text" | "paragraph" | "heading1" | "heading2" | "heading3" | "heading4";
  color?: "default"
    | "primary"
    | "primary-dimmed"
    | "secondary"
    | "tertiary"
    | "quaternary"
    | "destructive"
    | "destructive-dimmed"
    | "accent"
    | "accent-dimmed"
    | "white"
    | (string & {});
  design?: "regular" | "mono";
  weight?: "regular" | "semibold" | "bold";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  wrap?: "wrap" | "nowrap";
}

export interface ContainerProps extends BaseProps {
  type?: "main" | "content" | "page" | (string & {});
  direction?: "row" | "column" | (string & {});
}

export interface CardProps extends BaseProps {
  direction?: "horizontal" | "vertical" | string;
  alignment?: "leading" | "middle" | "trailing" | string;
}

export interface HStackProps extends BaseProps {
  alignment?: "leading" | "middle" | "trailing" | (string & {});
  verticalAlignment?: "top" | "center" | "bottom" | (string & {});
  gap?: "xsmall" | "small" | "regular" | "large" | (string & {});
}

export interface VStackProps extends BaseProps {
  alignment?: "leading" | "middle" | "trailing" | (string & {});
  gap?: "xsmall" | "small" | "regular" | "large" | (string & {});
}

export interface BadgeProps extends BaseProps {
  tone?: "base" | "success" | "info" | "warning" | "danger" | "accent" | "dimmed" | string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  variant?: "solid" | "soft" | "outline" | string;
  icon?: string;
  overlap?: boolean;
  shape?: "capsule" | "circle" | string;
}

export interface InputFieldProps extends BaseProps {
  type?: string;
  variant?: "regular" | "rounded" | string;
  size?: "md" | "lg" | "xl" | string;
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

export interface CodeBlockProps extends BaseProps {
  html?: string;
  language?: string;
  overflowX?: "auto" | "scroll" | "hidden" | string;
  wrap?: boolean;
}

export interface ComboBoxOption {
  value: string;
  label?: string;
}

export interface ComboBoxProps extends BaseProps {
  options?: Array<string | ComboBoxOption>;
  selection?: any;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  onChange?: (event?: any) => void;
  change?: (event?: any) => void;
}

export interface CheckboxProps extends BaseProps {
  labelText?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  onCheck?: (checked: boolean) => void;
  check?: (checked: boolean) => void;
  onChange?: (event?: any) => void;
}

export interface RadioCheckboxProps extends BaseProps {
  labelText?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  onCheck?: (checked: boolean) => void;
  check?: (checked: boolean) => void;
  onChange?: (event?: any) => void;
}

export interface ToggleSwitchProps extends BaseProps {
  labelText?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  onChange?: (event?: any) => void;
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
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  variant?: "regular" | "rounded" | string;
  onSelect?: (item?: SearchBoxItem) => void;
  select?: (item?: SearchBoxItem) => void;
}

export interface SidebarItem {
  id?: string;
  label?: string;
  /**
   * Icon name. Accepts either a full icon class (e.g. "icon-person")
   * or a bare name (e.g. "person"), which will be prefixed with "icon-".
   */
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
  selection?: string | any;
  /** @deprecated Use onItemSelect instead. */
  onSelect?: (id?: string) => void;
  onItemSelect?: (id?: string) => void;
  searchable?: boolean;
  searchProps?: Record<string, unknown>;
  leading?: BunnixChildren | (() => BunnixChildren);
  trailing?: BunnixChildren | (() => BunnixChildren);
}

export interface NavigationBarProps extends BaseProps {
  title?: string | any;
  leading?: BunnixChildren | (() => BunnixChildren);
  trailing?: BunnixChildren | (() => BunnixChildren);
  searchable?: boolean;
  searchData?: SearchBoxItem[];
  searchValue?: string | any;
  onSearchInput?: (event?: any) => void;
  onSearchSelect?: (item?: SearchBoxItem) => void;
  searchProps?: Record<string, unknown>;
}

export interface DatePickerProps extends BaseProps {
  id?: string;
  placeholder?: string;
  range?: boolean;
  variant?: "regular" | "rounded" | string;
  size?: "xs" | "md" | "lg" | "xl" | string;
}

export interface TimePickerProps extends BaseProps {
  id?: string;
  placeholder?: string;
  variant?: "regular" | "rounded" | string;
  size?: "xs" | "md" | "lg" | "xl" | string;
}

export interface DropdownMenuItem {
  title?: string;
  icon?: string;
  destructive?: boolean;
  isSeparator?: boolean;
  selected?: boolean;
  click?: () => void;
  [key: string]: unknown;
}

export interface DropdownMenuProps extends BaseProps {
  items?: DropdownMenuItem[];
  id?: string;
  align?: "left" | "right" | string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  onSelect?: (item?: DropdownMenuItem) => void;
}

export interface PopoverMenuProps extends BaseProps {
  trigger?: BunnixChildren | (() => BunnixChildren);
  menuItems?: DropdownMenuItem[];
  id?: string;
  align?: "left" | "right" | string;
  size?: "sm" | "md" | "lg" | "xl" | string;
  onSelect?: (item?: DropdownMenuItem) => void;
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
  size?: "xs" | "md" | "lg" | "xl" | string;
  icon?: string;
}

export interface PageHeaderProps extends BaseProps {
  title?: string;
  description?: string;
  trailing?: BunnixChildren | (() => BunnixChildren);
}

export interface PageSectionProps extends BaseProps {
  title?: string;
  stickyOffset?: string | number;
  gap?: "small" | "regular" | "large" | string;
  trailing?: BunnixChildren | (() => BunnixChildren);
}

export interface TableColumn {
  field: string;
  label: string;
  size?: "auto" | number | string;
}

export interface TableSortableConfig {
  field: string;
  sortType?: "string" | "number" | "date";
  sorted?: boolean;
  direction?: "asc" | "desc";
}

export interface TableSearchableConfig {
  field: string;
  searchText?: string | any;
}

export interface TableProps extends BaseProps {
  columns?: Array<TableColumn>;
  data?: Array<any> | any;
  key?: string;
  renderCell?: (columnIndex: number, field: string, row: any, column?: TableColumn) => any;
  cell?: (columnIndex: number, field: string, row: any, column?: TableColumn) => any;
  searchable?: TableSearchableConfig;
  sortable?: Array<TableSortableConfig>;
  selection?: (keys: Array<string>) => void;
  sort?: (field?: string) => ((a: any, b: any) => number) | null;
  variant?: "regular" | "background" | "bordered" | string;
  interactive?: boolean;
  hideHeaders?: boolean;
}

export type Component<P = BaseProps> = (props?: P, children?: BunnixChildren) => any;

export const AccordionGroup: Component<BaseProps>;
export const Badge: Component<BadgeProps>;
export const Button: Component<ButtonProps>;
export const Card: Component<CardProps>;
export const Checkbox: Component<CheckboxProps>;
export const CodeBlock: Component<CodeBlockProps>;
export const ComboBox: Component<ComboBoxProps>;
export const Container: Component<ContainerProps>;
export const DatePicker: Component<DatePickerProps>;
export const Dialog: Component<BaseProps>;
export const DropdownMenu: Component<DropdownMenuProps>;
export const Grid: Component<BaseProps>;
export const HStack: Component<HStackProps>;
export const Icon: Component<IconProps>;
export const InputField: Component<InputFieldProps>;
export const NavigationBar: Component<NavigationBarProps>;
export const PageHeader: Component<PageHeaderProps>;
export const PageSection: Component<PageSectionProps>;
export const PopoverMenu: Component<PopoverMenuProps>;
export const RadioCheckbox: Component<RadioCheckboxProps>;
export const SearchBox: Component<SearchBoxProps>;
export const Sidebar: Component<SidebarProps>;
export const Table: Component<TableProps>;
export const Text: Component<TextProps>;
export const TimePicker: Component<TimePickerProps>;
export const ToastNotification: Component<BaseProps>;
export const ToggleSwitch: Component<ToggleSwitchProps>;
export const VStack: Component<VStackProps>;

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
