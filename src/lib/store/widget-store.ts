import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import initialCategories from "@/data/categories.json";
import { Widget, Category } from "@/types";
import { v4 as uuid } from "uuid";
interface WidgetStoreState {
  categories: Category[];
  actions: {
    setCategories: (categories: Category[]) => void;
    addWidget: (categoryId: string, widget: Omit<Widget, "id">) => void; // Auto-generate ID
    removeWidget: (categoryId: string, widgetId: string) => void;
  };
}

export const useWidgetStore = create<WidgetStoreState>()(
  immer((set) => ({
    categories: initialCategories as Category[],
    actions: {
      setCategories: (categories) =>
        set((state) => {
          state.categories = categories;
        }),
      addWidget: (categoryId, newWidgetData) =>
        set((state) => {
          const category = state.categories.find(
            (cat: Category) => cat.id === categoryId
          );
          if (category) {
            const newWidget: Widget = {
              ...newWidgetData,
              id: uuid(),
            };
            category.widgets.push(newWidget);
          }
        }),
      removeWidget: (categoryId, widgetId) =>
        set((state) => {
          const category = state.categories.find(
            (cat: Category) => cat.id === categoryId
          );
          if (category) {
            category.widgets = category.widgets.filter(
              (w: Widget) => w.id !== widgetId
            );
          }
        }),
    },
  }))
);

export const useWidgetActions = () => useWidgetStore((state) => state.actions);
