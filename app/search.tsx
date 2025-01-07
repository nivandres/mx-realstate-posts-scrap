"use client";

import { useState } from "react";
import { PostThumbnail } from "@/components/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Post } from "@/schemas";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Props {
  search?: Partial<Post>;
  posts?: Post[];
  fallback?: boolean;
}

export default function SearchPage({
  posts = [],
  search = {},
  fallback = false,
}: Props) {
  const { input } = search;
  const [open, setOpen] = useState(true);
  const router = useRouter();
  async function handleSearch(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault?.();
    const postSearch = {
      input: (document.getElementById("input") as HTMLInputElement).value,
    };
    router.push(
      `?${new URLSearchParams(
        postSearch as object as Record<string, string>
      ).toString()}`
    );
  }
  return (
    <div className="mt-12 max-w-screen-lg w-full mx-auto px-4">
      <header>
        <form className="relative group" onSubmit={handleSearch}>
          <Input
            id="input"
            placeholder="Buscar posts"
            defaultValue={input}
            disabled={fallback}
          />
          <button
            type="submit"
            title="Clic para buscar"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400"
          >
            <Search />
          </button>
        </form>
      </header>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="mt-6 sm:mt-8 w-full flex flex-col sm:flex-row gap-6 sm:gap-14">
          <CollapsibleTrigger className="sm:hidden text-zinc-400">
            {open ? "Ocultar filtros" : "Mostrar filtros"}
          </CollapsibleTrigger>
          <CollapsibleContent asChild>
            <aside className="sm:w-[30%] w-full">
              <div className="bg-white shadow-sm border rounded-md p-4">
                <span className="flex items-center gap-3 text-gray-700 mb-4">
                  <SlidersHorizontal className="size-4" />
                  Filtros
                </span>
              </div>
              <Button
                onClick={handleSearch}
                className="mt-4 w-full font-semibold"
                size="lg"
                variant="outline"
              >
                Aplicar filtros
              </Button>
            </aside>
          </CollapsibleContent>

          <main className="grow">
            <span className="text-sm">
              {posts.length} posts encontrados.{" "}
              <button className="text-blue-500" onClick={handleSearch}>
                ¿Buscar de nuevo?
              </button>
            </span>
            <ul className="flex gap-4 my-4 w-full flex-col">
              {posts.map((post) => (
                <li key={post.id} className="w-full">
                  <PostThumbnail {...post} />
                </li>
              ))}
            </ul>
          </main>
        </div>
      </Collapsible>
    </div>
  );
}
