import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../types/task";

interface TaskState {
  tasks: Task[];
  searchTerm: string;
  filteredTasks: Task[];
}

// Load tasks from localStorage
function loadTasksFromStorage(): Task[] {
  try {
    const tasks = localStorage.getItem("tasks");
    return tasks
      ? JSON.parse(tasks)
      : [
          {
            id: 1,
            title: "Sample Task",
            content: "This is a sample task content.",
            completed: false,
          },
          {
            id: 2,
            title: "Another Task",
            content: "This is another task content.",
            completed: true,
          },
        ];
  } catch {
    return [];
  }
}

// Save tasks to localStorage
function saveTasksToStorage(tasks: Task[]) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const initialState: TaskState = {
  tasks: loadTasksFromStorage(),
  searchTerm: "",
  filteredTasks: [],
};

// Initialize filtered tasks
initialState.filteredTasks = initialState.tasks;

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newTask = {
        ...action.payload,
        id: state.tasks.length
          ? Math.max(...state.tasks.map((task) => task.id)) + 1
          : 1,
      };
      state.tasks.push(newTask);
      saveTasksToStorage(state.tasks);
      taskSlice.caseReducers.filterTasks(state);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        saveTasksToStorage(state.tasks);
        taskSlice.caseReducers.filterTasks(state);
      }
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
      taskSlice.caseReducers.filterTasks(state);
    },

    toggleTaskComplete: (state, action: PayloadAction<number>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].completed = !state.tasks[index].completed;
        saveTasksToStorage(state.tasks);
        taskSlice.caseReducers.filterTasks(state);
      }
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      taskSlice.caseReducers.filterTasks(state);
    },

    filterTasks: (state) => {
      if (!state.searchTerm) {
        state.filteredTasks = state.tasks;
      } else {
        state.filteredTasks = state.tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            task.content.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
  setSearchTerm,
  filterTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
