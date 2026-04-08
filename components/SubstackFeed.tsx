"use client";

import { useEffect, useState } from "react";

const SUBSTACK_URL = "https://louisdeneve.substack.com";
const RSS2JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${SUBSTACK_URL}/feed`;

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

type Status = "loading" | "success" | "error";

export default function SubstackFeed() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    fetch(RSS2JSON_API)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setPosts((data.items as SubstackPost[]).slice(0, 5));
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 rounded-xl border border-gray-100 bg-gray-50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="text-sm text-gray-500">
        Unable to load posts right now.{" "}
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 transition-colors"
        >
          Visit my Substack directly →
        </a>
      </p>
    );
  }

  if (posts.length === 0) {
    return <p className="text-sm text-gray-500">No posts available yet.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => {
        const date = new Date(post.pubDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const excerpt =
          post.description.replace(/<[^>]*>/g, "").substring(0, 200).trim() +
          "…";

        return (
          <a
            key={post.link}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
          >
            <p className="text-xs text-gray-400 mb-1">{date}</p>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">{excerpt}</p>
            <span className="inline-block mt-3 text-sm font-medium text-blue-700 group-hover:text-blue-900 transition-colors">
              Read on Substack →
            </span>
          </a>
        );
      })}
    </div>
  );
}
