import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getTodos } from "@/lib/api/todos/queries";

import { randomUUID } from "crypto";


export const todos = sqliteTable('todos', {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  todo: text("todo").notNull()
});


// Schema for todos - used to validate API requests
export const insertTodoSchema = createInsertSchema(todos);

export const insertTodoParams = createSelectSchema(todos, {}).omit({ 
  id: true
});

export const updateTodoSchema = createSelectSchema(todos);

export const updateTodoParams = createSelectSchema(todos,{})

export const todoIdSchema = updateTodoSchema.pick({ id: true });

// Types for todos - used to type API request params and within Components
export type Todo = z.infer<typeof updateTodoSchema>;
export type NewTodo = z.infer<typeof insertTodoSchema>;
export type NewTodoParams = z.infer<typeof insertTodoParams>;
export type UpdateTodoParams = z.infer<typeof updateTodoParams>;
export type TodoId = z.infer<typeof todoIdSchema>["id"];
    
// this type infers the return from getTodos() - meaning it will include any joins
export type CompleteTodo = Awaited<ReturnType<typeof getTodos>>["todos"][number];

