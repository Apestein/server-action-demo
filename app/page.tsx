import { AddForm } from "@/app/add-form"
import { DeleteForm } from "@/app/delete-form"
import { getTodos } from "@/lib/api/todos/queries"

export default async function Home() {
  const { todos } = await getTodos()

  return (
    <main className="container text-center p-12">
      <AddForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="bg-card mb-3">
            {todo.todo}
            <DeleteForm id={todo.id} todo={todo.todo} />
          </li>
        ))}
      </ul>
    </main>
  )
}
