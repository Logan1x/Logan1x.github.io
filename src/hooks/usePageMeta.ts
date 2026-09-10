import { useEffect } from "react";

type PageMeta = {
  title: string;
  description: string;
  url: string;
  keywords?: string;
  robots?: string;
};

function setNamedMeta(attr: "name" | "property", key: string, value: string) {
  let node = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  node.setAttribute("content", value);
}

function setCanonical(url: string) {
  let node = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!node) {
    node = document.createElement("link");
    node.rel = "canonical";
    document.head.appendChild(node);
  }
  node.href = url;
}

export function usePageMeta({
  title,
  description,
  url,
  keywords,
  robots,
}: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    setNamedMeta("name", "title", title);
    setNamedMeta("name", "description", description);
    if (keywords) setNamedMeta("name", "keywords", keywords);
    if (robots) setNamedMeta("name", "robots", robots);
    setNamedMeta("property", "og:site_name", "Khushal Sharma");
    setNamedMeta("property", "og:title", title);
    setNamedMeta("property", "og:description", description);
    setNamedMeta("property", "og:url", url);
    setNamedMeta("property", "twitter:title", title);
    setNamedMeta("property", "twitter:description", description);
    setNamedMeta("property", "twitter:url", url);
    setNamedMeta("name", "twitter:title", title);
    setNamedMeta("name", "twitter:description", description);
    setNamedMeta("name", "twitter:url", url);
    setCanonical(url);

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, url, keywords, robots]);
}
