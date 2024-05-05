"use client";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/react";
import { type api as serverApi } from "~/trpc/server";

const TodoList = ({
  todos,
}: {
  todos: Awaited<ReturnType<typeof serverApi.todo.getTodos>>;
}) => {
  const getTodos = api.todo.getTodos.useQuery(undefined, {
    initialData: todos,
  });
  const setDone = api.todo.setDone.useMutation({
    onSettled: () => {
      void getTodos.refetch();
    },
  });

  return (
    <div className="w-full max-w-xs">
      <h2 className="text-2xl font-semibold">Todos</h2>
      <ul className="space-y-2">
        {getTodos?.data?.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between">
            <input
              type="checkbox"
              checked={todo.done ?? false}
              onChange={async () => {
                setDone.mutate({
                  id: todo.id,
                  done: !todo.done,
                });
              }}
            />
            <span>{todo.content}</span>
            {/* <span>{todo.done ? "✅" : "❌"}</span> */}
          </li>
        ))}
      </ul>

      <CreatePost />
    </div>
  );
};

export default TodoList;
