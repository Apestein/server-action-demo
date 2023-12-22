import TodoList from "@/components/todos/TodoList";
import { getTodos } from "@/lib/api/todos/queries";


export const revalidate = 0;

export default async function Todos() {
  const { todos } = await getTodos();
  

  return (
    <main className="max-w-3xl mx-auto p-4 rounded-lg bg-card">
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Todos</h1>
        </div>
        <TodoList todos={todos}  />
      </div>
    </main>
  );
}
