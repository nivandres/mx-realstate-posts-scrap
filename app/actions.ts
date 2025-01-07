"use server";

import { Post, PostSchema } from "@/schemas";
import { getPosts as get } from "@/services";

export async function getPosts(search: Post): Promise<Post[]> {
  search = PostSchema.parse(search);
  return get(search);
}
