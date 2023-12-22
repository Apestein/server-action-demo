import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  TodoId, 
  NewTodoParams,
  UpdateTodoParams, 
  updateTodoSchema,
  insertTodoSchema, 
  todos,
  todoIdSchema 
} from "@/lib/db/schema/todos";

export const createTodo = async (todo: NewTodoParams) => {
  const newTodo = insertTodoSchema.parse(todo);
  try {
    const [t] =  await db.insert(todos).values(newTodo).returning();
    return { todo: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTodo = async (id: TodoId, todo: UpdateTodoParams) => {
  const { id: todoId } = todoIdSchema.parse({ id });
  const newTodo = updateTodoSchema.parse(todo);
  try {
    const [t] =  await db
     .update(todos)
     .set(newTodo)
     .where(eq(todos.id, todoId!))
     .returning();
    return { todo: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTodo = async (id: TodoId) => {
  const { id: todoId } = todoIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(todos).where(eq(todos.id, todoId!))
    .returning();
    return { todo: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

