
import { type Todo, type CompleteTodo } from "@/lib/db/schema/todos";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Todo>) => void;

export const useOptimisticTodos = (
  todos: CompleteTodo[],
  
) => {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (
      currentState: CompleteTodo[],
      action: OptimisticAction<Todo>,
    ): CompleteTodo[] => {
      const { data } = action;

      // potential issue - loop over relations [COME BACK TO THIS]
      

      const optimisticTodo = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticTodo]
            : [...currentState, optimisticTodo];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticTodo } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticTodo, optimisticTodos };
};
