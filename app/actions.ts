"use server"
import { z } from "zod"
import { createTodo, deleteTodo } from "@/lib/api/todos/mutations"
import { revalidatePath } from "next/cache"
import { action, authAction } from "@/lib/nsa/client"
import { db } from "@/lib/db"
import { todos } from "@/lib/db/schema/todos"

const createTodoSchema = z.object({
  todo: z.string().min(2),
})

export async function createTodoAction(prevState: any, formData: FormData) {
  const rawFormData = {
    todo: formData.get("todo"),
  }

  const validatedData = createTodoSchema.safeParse(rawFormData)

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    }
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const [t] = await db.insert(todos).values(validatedData.data).returning()
    revalidatePath("/")
    return { message: `Added todo: ${JSON.stringify(t)}` }
  } catch (error) {
    if (error instanceof Error) return JSON.stringify(error)
  }
}

export const createTodoSafeAction = action(createTodoSchema, async (inputs) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const [t] = await db.insert(todos).values(inputs).returning()
  revalidatePath("/")
  return { message: `Added todo: ${JSON.stringify(t)}` }
})

export const createTodoAuthSafeAction = authAction(
  createTodoSchema,
  async (inputs, { userId }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const [t] = await db.insert(todos).values(inputs).returning()
    revalidatePath("/")
    return { message: `Added todo: ${JSON.stringify(t)}` }
  }
)

export async function deleteTodoAction(prevState: any, formData: FormData) {
  const rawFormData = {
    id: formData.get("id"),
  }

  const schema = z.object({
    id: z.string().min(1),
  })

  const validatedData = schema.safeParse(rawFormData)

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    }
  }

  try {
    await deleteTodo(validatedData.data.id)
    revalidatePath("/")
    return { message: `Deleted todo: ${validatedData.data.id}` }
  } catch (e) {
    return { message: "Failed to delete todo" }
  }
}
