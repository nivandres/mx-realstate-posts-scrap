import { PostThumbnail } from "@/components/post";
import { getPost } from "./actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);
  return (
    <div>
      <PostThumbnail {...post} />
    </div>
  );
}
