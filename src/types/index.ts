export interface Widget {
  id: string;
  name: string;
  text: string;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
} 