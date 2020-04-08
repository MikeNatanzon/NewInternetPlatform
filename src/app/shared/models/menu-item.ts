/**
 * User menu item model
 */
export interface MenuItem {
  id: string;
  label: string;
  function: (...args: any) => void;
  link: string;
}
