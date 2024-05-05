import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { todos } from "~/server/db/schema";

export const todoRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(todos).values({
        content: input.content,
        done: false,
      });
    }),
  getTodos: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(todos).all();
  }),
  setDone: publicProcedure
    .input(z.object({ id: z.number(), done: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(todos)
        .set({ done: input.done })
        .where(eq(todos.id, input.id))
        .run();
    }),
});
