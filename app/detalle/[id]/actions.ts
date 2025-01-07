import { getPost as get } from "@/services";

export async function getPost(id: string) {
  return get(id);
}
