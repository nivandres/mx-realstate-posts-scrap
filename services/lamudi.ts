import { Post } from "@/schemas";
import { JSDOM } from "jsdom";
import { option } from "parseformat";

export const endpoint = "https://www.lamudi.com.mx";

export async function lamudiFetch(path: string = "/", data?: RequestInit) {
  const response = await fetch(`${endpoint}${path}`, {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
    },
    ...data,
  });
  return response.text();
}

export interface LamudiGeo {
  id: string;
  name: string;
  parent_names: string[];
}

export async function getGeo(s: string) {
  const res = await lamudiFetch(`/api/geo?q=${s}`);
  try {
    return JSON.parse(res)?.[0] as LamudiGeo;
  } catch {
    return null;
  }
}

export async function getPost(
  id?: string | null,
  payload: string | null = "desarrollo"
): Promise<Post | null> {
  if (!id) return null;
  const html = await lamudiFetch(`/${payload}/${id}`);
  const document = new JSDOM(html).window.document;
  return {
    id,
    provider: "lamudi",
    url: `${endpoint}/${payload}/${id}`,
    whatsapp: document
      .querySelector("#button-chat-whatsapp-desktop")
      ?.getAttribute("value")
      ?.match(/phone=(\+\d+)/)?.[1],
    description: document
      .getElementById("description-text")
      ?.getAttribute("data-expandeddescription"),
    city: document.querySelector(
      payload === "detalle"
        ? "#view-map__text.view-map__text"
        : "#header-to-map > span"
    )?.textContent,
    price: Number(
      document
        .querySelector(
          payload === "detalle"
            ? ".prices-and-fees__price"
            : ".price-info__value"
        )
        ?.textContent?.replace(/[^\d]/g, "")
    ),
    title: document.querySelector("h1")?.textContent,
    type: document
      .querySelector("ul.bradcrumb-custom")
      ?.innerHTML.includes("Renta")
      ? "rent"
      : "sale",
    images: Array.from(document.querySelectorAll(".swiper-slide > img"))
      .map((img) => {
        return {
          title: img.getAttribute("alt"),
          url: img.getAttribute("src"),
        };
      })
      .filter((i) => i.url),
    area:
      Number(
        document
          .querySelector('[data-test="area-value"]')
          ?.textContent?.match(/\d+/)?.[0]
      ) || undefined,
    features: Array.from(document.querySelectorAll(".facilities__item")).map(
      (e) => e.textContent
    ),
    payload,
  } as Post;
}

export async function getPosts({
  type = "sale",
  page = 1,
  input,
}: Post = {}): Promise<Post[]> {
  if (input) {
    const candidates: LamudiGeo[] = [];
    input.split(" ").forEach(async (s) => {
      const geo = await getGeo(s);
      if (geo) candidates.push(geo);
    });
    if (candidates.length) {
      const opt = option(
        input.toLowerCase(),
        candidates.map((c) => (c.name = c.name.toLowerCase()))
      );
      input = candidates.find((c) => c.name === opt)?.id;
    } else input = undefined;
  }
  const html = await lamudiFetch(
    `/for-${type}?page=${page}${input ? `&geos=${input}` : ""}`
  );
  const document = new JSDOM(html).window.document;
  return (
    await Promise.all(
      document
        .querySelectorAll(".listings__cards > div > a")
        .values()
        .map((e) => e.getAttribute("href")?.split("/"))
        .filter(Boolean)
        .map((l) => getPost(l?.at(-1), l?.at(-2)))
    )
  ).filter(Boolean) as Post[];
}
