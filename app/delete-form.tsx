"use client"

import { useFormState, useFormStatus } from "react-dom"
import { deleteTodoAction } from "@/app/actions"

const initialState = {
  message: "",
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  )
}

export function DeleteForm({ id, todo }: { id: string; todo: string }) {
  const [state, formAction] = useFormState(deleteTodoAction, initialState)

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="todo" value={todo} />
      <DeleteButton />
    </form>
  )
}
