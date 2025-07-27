import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getAllTaskService, viewTaskService } from "../services/taskService"; 

const useTaskStore = create(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        messages: [],
        isAuthenticated: false, 
        loading: false,

        getTaskList: async () => {
          set({ loading: true });
          try {
            const res = await getAllTaskService(); 
            const { tasks } = res;
            set({ tasks });
            return res;
          } catch (error) {
            console.error("Failed to fetch task list:", error);
            throw error;
          } finally {
            set({ loading: false });
          }
        },
        viewTask: async (id) => {
            set({ loading: true });
            try {
              const res = await viewTaskService(id); // ✅ Corrected function name
              const { task, messages } = res.data;
              set({ task, messages });
              return res;
            } catch (error) {
              console.error("Failed to fetch task list:", error);
              throw error;
            } finally {
              set({ loading: false });
            }
          },
      }),
      
      {
        name: "task-storage",
        partialize: (state) => ({
          tasks: state.tasks,
        }),
      }
    ),
    { name: "TaskStore" }
  )
);

export default useTaskStore;
