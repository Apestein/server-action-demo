"use server";

import { revalidatePath } from "next/cache";
import {
  createTodo,
  deleteTodo,
  updateTodo,
} from "@/lib/api/todos/mutations";
import {
  TodoId,
  NewTodoParams,
  UpdateTodoParams,
  todoIdSchema,
  insertTodoParams,
  updateTodoParams,
} from "@/lib/db/schema/todos";

const handleErrors = (e: unknown) => {
  if (e instanceof Error) return e.message;
  if (e && typeof e === "object" && "error" in e) return e.error as string;
  return "Error";
};

const revalidateTodos = () => revalidatePath("/todos");

export const createTodoAction = async (input: NewTodoParams) => {
  try {
    const payload = insertTodoParams.parse(input);
    await createTodo(payload);
    revalidateTodos();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTodoAction = async (input: UpdateTodoParams) => {
  try {
    const payload = updateTodoParams.parse(input);
    await updateTodo(payload.id, payload);
    revalidateTodos;
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTodoAction = async (input: TodoId) => {
  try {
    const payload = todoIdSchema.parse({ id: input });
    await deleteTodo(payload.id);
    revalidateTodos();
  } catch (e) {
    return handleErrors(e);
  }
};