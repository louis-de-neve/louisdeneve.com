import Link from "next/link";
import { travelPosts } from "@/lib/travel";
import { publications } from "@/lib/academic";
import SubstackFeed from "@/components/SubstackFeed";

export default function Home() {
  const recentTravel = travelPosts.slice(0, 2);
  const recentPubs = publications.slice(0, 2);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-20">
        <div className="flex flex-col sm:flex-row items-start gap-8">
          <div className="shrink-0 w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold select-none">
            L
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Louis de Neve
            </h1>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed max-w-2xl">
              PhD researcher in machine learning and climate science. I study
              how deep learning can improve our understanding and prediction of
              the atmosphere. Outside the lab, I travel with a camera.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/academic"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors"
              >
                Research &amp; Publications
              </Link>
              <Link
                href="/travel"
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors"
              >
                Travel Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-100 mb-20" />

      {/* Recent travel */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Recent Travel</h2>
          <Link
            href="/travel"
            className="text-sm text-blue-700 hover:text-blue-900 font-medium transition-colors"
          >
            All posts →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {recentTravel.map((post) => (
            <Link
              key={post.slug}
              href={`/travel/${post.slug}`}
              className="group block rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all"
            >
              <div
                className={`h-44 bg-gradient-to-br ${post.coverColor} flex items-end p-4`}
              >
                <span className="text-xs font-medium text-white/80 bg-black/20 px-2 py-1 rounded-full">
                  {post.location}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-1">{post.date}</p>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent publications */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Recent Publications</h2>
          <Link
            href="/academic"
            className="text-sm text-blue-700 hover:text-blue-900 font-medium transition-colors"
          >
            All publications →
          </Link>
        </div>
        <div className="flex flex-col gap-5">
          {recentPubs.map((pub, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    pub.type === "journal"
                      ? "bg-blue-50 text-blue-700"
                      : pub.type === "conference"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {pub.type === "journal"
                    ? "Journal"
                    : pub.type === "conference"
                    ? "Conference"
                    : "Preprint"}
                </span>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {pub.authors} · {pub.venue} · {pub.year}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-100 my-20" />

      {/* Substack feed */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Latest from Substack
          </h2>
          <a
            href="https://louisdeneve.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-700 hover:text-blue-900 font-medium transition-colors"
          >
            Subscribe →
          </a>
        </div>
        <SubstackFeed />
      </section>
    </div>
  );
}
