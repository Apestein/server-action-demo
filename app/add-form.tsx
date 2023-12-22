"use client"

import { useFormStatus, useFormState } from "react-dom"
import { createTodoAction, createTodoSafeAction } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { useAction } from "next-safe-action/hook"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

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
      <pre>State: {JSON.stringify(state)}</pre>
    </form>
  )
}

// export function AddForm() {
//   const { execute, reset, result, status } = useAction(createTodoSafeAction)
//   const [todo, setTodo] = useState("")
//   const { toast } = useToast()

//   return (
//     <div className="space-x-3">
//       <label htmlFor="todo">Enter Task</label>
//       <input onChange={(e) => setTodo(e.target.value)} type="text" required />
//       <Button
//         onClick={() => execute({ todo })}
//         // onClick={async () => {
//         //   const res = await createTodoSafeAction({ todo })
//         //   toast({ description: res.data?.message })
//         // }}
//         disabled={status === "executing" ? true : false}
//       >
//         Add
//       </Button>
//       <pre>Result: {JSON.stringify(result)}</pre>
//     </div>
//   )
// }
