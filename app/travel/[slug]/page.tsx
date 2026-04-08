import { notFound } from "next/navigation";
import Link from "next/link";
import { travelPosts, getTravelPost } from "@/lib/travel";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return travelPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getTravelPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Louis de Neve`,
    description: post.excerpt,
  };
}

export default async function TravelPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getTravelPost(slug);
  if (!post) notFound();

  // Convert simple markdown-style content to JSX
  const paragraphs = post.content
    .trim()
    .split("\n\n")
    .filter(Boolean)
    .map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="text-xl font-semibold text-gray-900 mt-8 mb-3"
          >
            {block.replace(/^## /, "")}
          </h2>
        );
      }
      // Handle inline italic *text*
      const parts = block.split(/(\*[^*]+\*)/g);
      return (
        <p key={i} className="text-gray-700 leading-relaxed mb-4">
          {parts.map((part, j) =>
            part.startsWith("*") && part.endsWith("*") ? (
              <em key={j}>{part.slice(1, -1)}</em>
            ) : (
              part
            )
          )}
        </p>
      );
    });

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/travel"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-10"
      >
        ← Back to Travel
      </Link>

      {/* Cover */}
      <div
        className={`h-64 sm:h-80 rounded-2xl bg-gradient-to-br ${post.coverColor} mb-8 flex items-end p-6`}
      >
        <span className="text-sm font-medium text-white/90 bg-black/25 px-3 py-1 rounded-full">
          {post.location}
        </span>
      </div>

      {/* Header */}
      <p className="text-sm text-gray-400 uppercase tracking-wide mb-2">
        {post.date}
      </p>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {post.title}
      </h1>
      <p className="text-lg text-gray-500 leading-relaxed mb-10 border-b border-gray-100 pb-10">
        {post.excerpt}
      </p>

      {/* Content */}
      <div className="prose">{paragraphs}</div>

      {/* Photo gallery placeholders */}
      {post.images.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            Photos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {post.images.map((img, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl bg-gradient-to-br ${img.color} flex items-end p-3`}
              >
                <span className="text-xs text-white/80 bg-black/20 px-2 py-1 rounded-full line-clamp-1">
                  {img.alt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t border-gray-100">
        <Link
          href="/travel"
          className="text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
        >
          ← All travel posts
        </Link>
      </div>
    </div>
  );
}
