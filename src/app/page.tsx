"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Category, Widget } from "@/types";
import initialCategoriesData from "@/data/categories.json";
import initialAllWidgetsData from "@/data/all_widgets.json";
import {
  PlusCircle,
  Trash2,
  Edit,
  Search,
  Sun,
  Moon,
  Github,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { v4 as uuid } from "uuid";

export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allWidgets, setAllWidgets] = useState<Widget[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");

  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [newCategoryNameInput, setNewCategoryNameInput] = useState("");

  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetCategoryId, setSheetCategoryId] = useState<string>("");
  const [manageWidgetsOpen, setManageWidgetsOpen] = useState(false);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const storedCategories = window.localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(initialCategoriesData);
    }
    const storedAllWidgets = window.localStorage.getItem("allWidgets");
    if (storedAllWidgets) {
      setAllWidgets(JSON.parse(storedAllWidgets));
    } else {
      setAllWidgets(initialAllWidgetsData);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    window.localStorage.setItem("allWidgets", JSON.stringify(allWidgets));
  }, [allWidgets]);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.widgets.some((widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const matchedWidgets = categories.flatMap((cat) =>
    cat.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Placeholder functions - to be implemented
  const handleCreateWidget = () => {
    setCreateDialogOpen(true);
  };

  const handleAddCategory = () => {
    setAddCategoryDialogOpen(true);
  };

  const handleRemoveCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  const handleRemoveWidget = (widgetId: string) => {
    setAllWidgets((prev) => prev.filter((w) => w.id !== widgetId));
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        widgets: cat.widgets.filter((w) => w.id !== widgetId),
      }))
    );
  };

  const handleEditWidget = (widget: Widget) => {
    setEditingWidget(widget);
    setNewWidgetName(widget.name);
    setNewWidgetText(widget.text || "");
    setCreateDialogOpen(true);
  };

  const handleAddWidgetToCategory = (categoryId: string) => {
    setSheetCategoryId(categoryId);
    setSheetOpen(true);
  };

  const handleToggleWidgetInCategory = (
    categoryId: string,
    widgetId: string,
    checked: boolean
  ) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        if (checked) {
          const widgetToAdd = allWidgets.find((w) => w.id === widgetId);
          if (widgetToAdd && !cat.widgets.some((w) => w.id === widgetId)) {
            return { ...cat, widgets: [...cat.widgets, widgetToAdd] };
          }
        } else {
          return {
            ...cat,
            widgets: cat.widgets.filter((w) => w.id !== widgetId),
          };
        }
        return cat;
      })
    );
  };

  const handleCreateWidgetSubmit = () => {
    if (editingWidget) {
      setAllWidgets((prev) =>
        prev.map((w) =>
          w.id === editingWidget.id
            ? { ...w, name: newWidgetName, text: newWidgetText }
            : w
        )
      );
      setEditingWidget(null);
    } else {
      const newWidget: Widget = {
        id: uuid(),
        name: newWidgetName,
        text: newWidgetText,
      };
      setAllWidgets((prev) => [...prev, newWidget]);
    }
    setNewWidgetName("");
    setNewWidgetText("");
    setCreateDialogOpen(false);
  };

  const handleAddCategorySubmit = () => {
    if (newCategoryNameInput.trim()) {
      const newCategory: Category = {
        id: uuid(),
        name: newCategoryNameInput.trim(),
        widgets: [],
      };
      setCategories((prev) => [...prev, newCategory]);
      setNewCategoryNameInput("");
      setAddCategoryDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 font-sans">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your widgets and categories.
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              window.open(
                "https://github.com/PriyabrataMo/accuknox-dashboard",
                "_blank",
                "noopener,noreferrer"
              )
            }
            aria-label="Toggle theme"
          >
            <Github className="h-4 w-4" />
          </Button>
          {mounted && (
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div className="relative flex-grow w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search widgets or categories..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button variant="outline" onClick={handleCreateWidget}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Widget
          </Button>

          <Button variant="outline" onClick={() => setManageWidgetsOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Manage Widgets
          </Button>

          <Button variant="outline" onClick={handleAddCategory}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </div>
      </div>

      <Separator className="my-8" />

      {searchTerm ? (
        matchedWidgets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {matchedWidgets.map((widget) => (
              <Card key={widget.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{widget.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{widget.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-10">
            <p className="text-xl">
              No widgets found for &quot;{searchTerm}&quot;.
            </p>
          </div>
        )
      ) : (
        <>
          {filteredCategories.length === 0 && (
            <div className="text-center text-muted-foreground py-10">
              <p className="text-xl">
                No categories yet. Click &quot;Add Category&quot; to get
                started.
              </p>
            </div>
          )}
          <div className="space-y-10">
            {filteredCategories.map((category) => (
              <section
                key={category.id}
                aria-labelledby={`category-title-${category.id}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2
                    id={`category-title-${category.id}`}
                    className="text-2xl font-semibold tracking-tight"
                  >
                    {category.name}
                  </h2>
                  <div className="flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Remove ${category.name} category`}
                        >
                          <Trash2 className="h-5 w-5 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Category</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the category &quot;
                            {category.name}&quot; and all its widgets? This
                            action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => handleRemoveCategory(category.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                {category.widgets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.widgets.map((widget) => (
                      <Card key={widget.id} className="flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {widget.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground">
                            {widget.text}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      variant="outline"
                      className="flex flex-col items-center justify-center h-full min-h-[150px] border-dashed hover:border-primary transition-all"
                      onClick={() => handleAddWidgetToCategory(category.id)}
                    >
                      <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Add Widget
                      </span>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <Button
                      variant="outline"
                      className="flex flex-col items-center justify-center h-full min-h-[150px] border-dashed hover:border-primary transition-all"
                      onClick={() => handleAddWidgetToCategory(category.id)}
                    >
                      <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Add Widget
                      </span>
                    </Button>
                  </div>
                )}
                <Separator className="mt-10" />
              </section>
            ))}
          </div>
        </>
      )}

      {/* Create Widget Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingWidget ? "Edit Widget" : "Create New Widget"}
            </DialogTitle>
            <DialogDescription>Enter widget details below.</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateWidgetSubmit();
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="widget-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="widget-name"
                  value={newWidgetName}
                  onChange={(e) => setNewWidgetName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="widget-text" className="text-right">
                  Text
                </Label>
                <Input
                  id="widget-text"
                  value={newWidgetText}
                  onChange={(e) => setNewWidgetText(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog
        open={addCategoryDialogOpen}
        onOpenChange={setAddCategoryDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Enter new category name.</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCategorySubmit();
            }}
          >
            <div className="grid grid-cols-4 items-center gap-4 py-4">
              <Label htmlFor="category-name" className="text-right">
                Name
              </Label>
              <Input
                id="category-name"
                value={newCategoryNameInput}
                onChange={(e) => setNewCategoryNameInput(e.target.value)}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Widget Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Manage Widgets</SheetTitle>
            <SheetDescription>Select widgets for categories.</SheetDescription>
          </SheetHeader>
          <Tabs
            value={sheetCategoryId}
            onValueChange={(value) => setSheetCategoryId(value)}
          >
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <div className="space-y-2 py-4">
                  {allWidgets.map((widget) => (
                    <div
                      key={widget.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`checkbox-${cat.id}-${widget.id}`}
                        checked={cat.widgets.some((w) => w.id === widget.id)}
                        onCheckedChange={(checked) =>
                          handleToggleWidgetInCategory(
                            cat.id,
                            widget.id,
                            checked === true
                          )
                        }
                      />
                      <Label htmlFor={`checkbox-${cat.id}-${widget.id}`}>
                        {widget.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <SheetFooter>
            <Button onClick={() => setSheetOpen(false)}>Close</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Global Manage Widgets Sheet */}
      <Sheet open={manageWidgetsOpen} onOpenChange={setManageWidgetsOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Manage Widgets</SheetTitle>
            <SheetDescription>Edit, delete or add widgets.</SheetDescription>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <Button
              onClick={() => {
                setEditingWidget(null);
                setNewWidgetName("");
                setNewWidgetText("");
                setCreateDialogOpen(true);
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Widget
            </Button>
            {allWidgets.map((widget) => (
              <div
                key={widget.id}
                className="flex justify-between items-center p-2 border rounded"
              >
                <div>
                  <p className="font-medium">{widget.name}</p>
                  <p className="text-sm text-muted-foreground">{widget.text}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditWidget(widget)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Widget</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete the widget &quot;
                          {widget.name}&quot;? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => handleRemoveWidget(widget.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
          <SheetFooter>
            <Button onClick={() => setManageWidgetsOpen(false)}>Close</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
