"use client"

import { useFormStatus, useFormState } from "react-dom"
import { createTodoAction } from "@/app/actions"
import { Button } from "@/components/ui/button"

const initialState = {
  message: "",
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      Add
    </Button>
  )
}

export function AddForm() {
  const [state, formAction] = useFormState(createTodoAction, initialState)

  return (
    <form action={formAction} className="space-x-3">
      <label htmlFor="todo">Enter Task</label>
      <input type="text" id="todo" name="todo" required />
      <SubmitButton />
      <p>State: {JSON.stringify(state)}</p>
    </form>
  )
}
