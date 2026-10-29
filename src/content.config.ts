
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",
  }),

  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    description: z.string().optional(),
    category: z.enum([
      "diary",
      "books",
    ]),
    author: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }).superRefine((data, ctx) => {
    if (data.category === "diary" && !data.date) {
      ctx.addIssue({
        code: "custom",
        path: ["date"],
        message: "日记文章必须填写日期",
      });
    }
  }),
});

export const collections = {
  posts,
};
