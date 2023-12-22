import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type TodoId, todoIdSchema, todos } from "@/lib/db/schema/todos";

export const getTodos = async () => {
  const t = await db.select().from(todos);
  return { todos: t };
};

export const getTodoById = async (id: TodoId) => {
  const { id: todoId } = todoIdSchema.parse({ id });
  const [t] = await db.select().from(todos).where(eq(todos.id, todoId));
  return { todo: t };
};

