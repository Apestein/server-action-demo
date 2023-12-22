"use server"
import { z } from "zod"
import { createTodo, deleteTodo } from "@/lib/api/todos/mutations"
import { revalidatePath } from "next/cache"

export async function createTodoAction(prevState: any, formData: FormData) {
  const rawFormData = {
    todo: formData.get("todo"),
  }

  const schema = z.object({
    todo: z.string().min(1),
  })

  const validatedData = schema.safeParse(rawFormData)

  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    }
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await createTodo({ todo: validatedData.data.todo })
    revalidatePath("/")
    return { message: `Added todo: ${validatedData.data.todo}` }
  } catch (error) {
    return { message: "Failed to create todo" }
  }
}

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
