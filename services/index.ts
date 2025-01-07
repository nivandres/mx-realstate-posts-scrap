import { Post } from "@/schemas";
import { getPosts as lamudiGetPosts, getPost as lamudiGetPost } from "./lamudi";

export async function getPost(id: string) {
  const lamudi = await lamudiGetPost(id);
  return lamudi;
}

export async function getPosts(search: Post): Promise<Post[]> {
  const lamudi = await lamudiGetPosts(search);
  return [...lamudi];
}
