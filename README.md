# AccuKnox Dashboard

A dynamic dashboard built with Next.js that allows users to customize their view by adding and removing widgets across different categories.

Live demo: [https://dash.priyabratamondal.com/](https://dash.priyabratamondal.com/)

## Features

- **Dynamic Widget Management**: JSON-based structure for organizing categories and widgets
- **Customizable Categories**: Each category can contain multiple widgets
- **Add/Remove Widgets**: Users can dynamically add or remove widgets from any category
- **Widget Search**: Search functionality to find widgets across all categories
- **Responsive Design**: Works on desktop and mobile devices

## Implementation Details

1. **Dynamic JSON Structure**

   - Dashboard is built using a JSON structure that contains categories and widgets
   - Each category can have multiple widgets
   - This approach allows for flexible and dynamic dashboard configuration

2. **Widget Management**

   - Users can add widgets via the "+Add Widget" functionality
   - Widget creation includes specifying name, content text, and category assignment
   - Widgets can be removed via the cross icon or by unchecking from category lists

3. **Search Functionality**

   - Global search allows users to find widgets across all categories
   - Results update in real-time as users type

4. **State Management**
   - Uses a store management system for handling widget additions/removals
   - State persists during the session

## Technologies Used

- **Frontend Framework**: Next.js with React
- **Styling**: CSS with modern styling approach
- **State Management**: Custom store implementation
- **Fonts**: Geist Sans and Geist Mono for a clean, modern look
- **Theme Support**: Light and dark mode with system preference detection

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd accuknox-dash
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: Reusable UI components
  - `dashboard`: Dashboard-specific components
  - `ui`: Generic UI components
- `src/data`: Data models and mock data
- `src/lib/store`: State management
- `src/types`: TypeScript type definitions

## Usage Guide

1. **Viewing Categories**

   - Dashboard displays all available categories with their widgets
   - Each category is a collapsible section

2. **Adding a Widget**

   - Click "+Add Widget"
   - Enter widget name and content
   - Select the category to add it to
   - Submit to see it appear in the selected category

3. **Removing a Widget**

   - Click the "×" icon on any widget to remove it
   - Alternatively, go to category settings and uncheck widgets

4. **Searching Widgets**
   - Use the search bar to find widgets by name
   - Results update as you type

## Contact

Email - priyabrata8558@gmail.com
