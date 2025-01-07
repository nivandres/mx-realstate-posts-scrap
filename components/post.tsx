import { Post } from "@/schemas";

export function PostThumbnail({ title }: Post) {
  return (
    <div className="w-full flex border h-[120px] rounded-lg shadow-sm">
      <div></div>
      <div>
        <h2 className="font-bold">{title}</h2>
      </div>
    </div>
  );
}
