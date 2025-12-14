# GitHub Copilot Instructions for Todo List React Project

## Project Architecture

This is a React 19 + TypeScript + Vite todo list application with Ant Design UI components and Tailwind CSS styling. The project follows a simple component-based architecture with hardcoded mock data.

### Key Stack & Dependencies

- **Build Tool**: Vite with SWC for fast refresh (`npm run dev`)
- **UI Framework**: Ant Design (`antd`) for pre-built components like `Table`, `Tag`
- **Styling**: SCSS
- **State Management**: Redux Toolkit configured but not yet implemented (empty `src/store/`)
- **Type Safety**: Strict TypeScript with project references (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`)

## Development Workflow

```bash
# Start development server (uses port 4000 when specified)
npm run dev
# or with custom port: npx vite --port=4000

# Build for production
npm run build  # Runs TypeScript compilation then Vite build

# Lint code
npm run lint   # ESLint with React hooks and TypeScript rules
```

## Project Structure Patterns

```
src/
├── components/     # Reusable UI components (TaskList.tsx)
├── pages/         # Page-level components (HomePage.tsx)
├── types/         # TypeScript type definitions (task.ts)
├── store/         # Redux store (empty, ready for implementation)
└── assets/        # Static assets
```

## Code Conventions

### Component Patterns

- **Functional Components**: Use arrow functions with explicit typing
  ```tsx
  const TaskList = () => { ... }  // Component pattern used
  const HomePage = () => { ... }  // Page component pattern
  ```

### Ant Design Integration

- Import specific components: `import { Table, Tag } from "antd"`
- Use `TableProps<T>` for typed table columns
- Leverage `rowKey` prop for table data uniqueness
- Color-coded tags for status: `<Tag color="green">Completed</Tag>`

### TypeScript Types

- Interface-based type definitions in `src/types/`
- Example: `Task` interface with `id`, `title`, `content`, `completed` fields
- Use `type` annotations for component props and Ant Design generics

### Styling Approach

- Tailwind for utilities: `className="p-4"`
- Ant Design components handle their own styling
- Empty `App.css` suggests preference for utility-first CSS

## Current State & TODOs

**Mock Data**: TaskList component uses hardcoded `data` array - replace with Redux state or API calls
**Empty Store**: Redux Toolkit is installed but store directory is empty
**Basic Router**: Currently single-page app, may need React Router for multi-page navigation

## Critical Files for AI Context

- [`src/types/task.ts`](src/types/task.ts) - Core data model
- [`src/components/TaskList.tsx`](src/components/TaskList.tsx) - Main UI logic with Ant Design table
- [`package.json`](package.json) - Dependencies and available scripts
- [`vite.config.ts`](vite.config.ts) - Build configuration with Tailwind plugin

When adding features, follow the established patterns: create typed interfaces, use Ant Design components, and prepare for Redux state management integration.
