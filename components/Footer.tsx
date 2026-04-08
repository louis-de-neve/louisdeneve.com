import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-100 bg-white mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {year} Louis de Neve</p>
        <nav className="flex gap-6">
          <Link href="/travel" className="hover:text-gray-800 transition-colors">
            Travel
          </Link>
          <Link href="/academic" className="hover:text-gray-800 transition-colors">
            Academic
          </Link>
          <a
            href="mailto:louis@louisdeneve.com"
            className="hover:text-gray-800 transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
