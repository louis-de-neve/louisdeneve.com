import { publications, researchProjects } from "@/lib/academic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic | Louis de Neve",
  description:
    "Research, publications, and academic work by Louis de Neve in machine learning and climate science.",
};

const typeLabel: Record<string, string> = {
  journal: "Journal",
  conference: "Conference",
  preprint: "Preprint",
};

const typeBadge: Record<string, string> = {
  journal: "bg-blue-50 text-blue-700",
  conference: "bg-green-50 text-green-700",
  preprint: "bg-amber-50 text-amber-700",
};

export default function AcademicPage() {
  const byYear = publications.reduce<Record<number, typeof publications>>(
    (acc, pub) => {
      (acc[pub.year] ??= []).push(pub);
      return acc;
    },
    {}
  );
  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Academic</h1>
        <p className="text-gray-600 max-w-2xl leading-relaxed">
          I am a PhD researcher at the intersection of machine learning and
          climate science. My work focuses on developing interpretable,
          data-efficient models for weather prediction and climate analysis,
          with a secondary interest in causal inference applied to geophysical
          systems.
        </p>
      </div>

      {/* Research interests */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Research Projects
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {researchProjects.map((project, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-semibold text-gray-900 leading-snug">
                  {project.title}
                </h3>
                <span
                  className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                    project.status === "active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {project.status === "active" ? "Active" : "Completed"}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Publications
        </h2>
        {years.map((year) => (
          <div key={year} className="mb-10">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
              {year}
            </h3>
            <div className="flex flex-col gap-4">
              {byYear[year].map((pub, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      className={`shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                        typeBadge[pub.type]
                      }`}
                    >
                      {typeLabel[pub.type]}
                    </span>
                    <h3 className="font-semibold text-gray-900 leading-snug">
                      {pub.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    {pub.authors}
                  </p>
                  <p className="text-sm text-gray-500 mb-3 italic">
                    {pub.venue}, {pub.year}
                    {pub.doi && (
                      <span className="not-italic ml-2 text-gray-400">
                        · DOI: {pub.doi}
                      </span>
                    )}
                  </p>
                  {pub.abstract && (
                    <details className="group">
                      <summary className="text-sm text-blue-700 cursor-pointer hover:text-blue-900 transition-colors list-none flex items-center gap-1">
                        <span className="group-open:hidden">▸ Abstract</span>
                        <span className="hidden group-open:inline">▾ Abstract</span>
                      </summary>
                      <p className="mt-3 text-sm text-gray-600 leading-relaxed border-l-2 border-gray-100 pl-4">
                        {pub.abstract}
                      </p>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Contact / CV */}
      <section className="mt-16 pt-12 border-t border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          For research enquiries, collaboration proposals, or general contact,
          please email{" "}
          <a
            href="mailto:louis@louisdeneve.com"
            className="text-blue-700 hover:text-blue-900 transition-colors"
          >
            louis@louisdeneve.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
