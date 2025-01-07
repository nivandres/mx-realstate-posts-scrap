import { PostSchema } from "@/schemas";
import SearchPage from "./search";
import PostsSearchPage from "./posts";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const search = PostSchema.safeParse(await searchParams);
  if (search.error) return <SearchPage />;
  return (
    <Suspense fallback={<SearchPage fallback search={search.data} />}>
      <PostsSearchPage search={search.data} />;
    </Suspense>
  );
}
