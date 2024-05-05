import { api } from "~/trpc/server";
import TodoList from "./_components/todo-list";

export default async function Home() {
  const todos = await api.todo.getTodos();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Simple <span className="text-[hsl(280,100%,70%)]">Todo</span> List
        </h1>

        <TodoList todos={todos} />
      </div>
      <footer className="text-center text-sm text-gray-400">
        <a href="https://github.com/YElshabrawy" target="_blank">
          Created By{" "}
          <span className="font-semibold text-[hsl(280,100%,70%)]">
            Youssef Elshabrawy
          </span>
        </a>
      </footer>
    </main>
  );
}
