
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface NavItem {
  label: string;
  path: string;
  dropdown?: NavItem[];
}
