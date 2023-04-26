import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/src/server/api/trpc";

const databaseUrl = process.env.DATABASE_URL || "";
const virtualHost = process.env.VIRTUAL_HOST || "";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      console.log(`database url: ${databaseUrl}`)
      console.log(`Virtual Host: ${virtualHost}`)
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
