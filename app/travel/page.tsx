import Link from "next/link";
import { travelPosts } from "@/lib/travel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel | Louis de Neve",
  description: "Travel photography and stories from around the world.",
};

export default function TravelPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Travel</h1>
        <p className="text-gray-600 max-w-xl">
          Photography and writing from travels across six continents. I try to
          document places with care — landscape, light, and the small details
          that tell a story.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {travelPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/travel/${post.slug}`}
            className="group block rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all"
          >
            {/* Cover gradient */}
            <div
              className={`h-56 bg-gradient-to-br ${post.coverColor} flex items-end p-5`}
            >
              <span className="text-sm font-medium text-white/90 bg-black/25 px-3 py-1 rounded-full">
                {post.location}
              </span>
            </div>
            <div className="p-6">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                {post.date}
              </p>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-3 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <span className="inline-block mt-4 text-sm font-medium text-blue-700 group-hover:text-blue-900 transition-colors">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
