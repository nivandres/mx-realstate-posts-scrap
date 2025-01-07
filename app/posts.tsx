import { getPosts } from "./actions";
import SearchPage from "./search";
import { Post } from "@/schemas";

interface Props {
  search: Post;
}

export default async function PostsSearchPage({ search }: Props) {
  let posts = await getPosts(search);
  posts = [...new Map(posts.map((p) => [p.id, p])).values()];
  return <SearchPage posts={posts} search={search} />;
}
