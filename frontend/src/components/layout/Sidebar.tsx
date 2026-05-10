import Link from "next/link";

export default function Sidebar() {

  return (
    <aside className="w-64 min-h-screen bg-blue-900 text-white p-5">

      <h1 className="text-3xl font-bold mb-10">
        TollIQ
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          href="/"
          className="hover:bg-blue-700 hover:translate-x-2 p-3 rounded-lg transition"
        >
          Dashboard
        </Link>

        <Link
          href="/tollbooths"
          className="hover:bg-blue-700 hover:translate-x-2 p-3 rounded-lg transition"
        >
          Toll Booths
        </Link>

        <Link
          href="/reports"
          className="hover:bg-blue-700 hover:translate-x-2 p-3 rounded-lg transition"
        >
          Reports
        </Link>

      </nav>

    </aside>
  );
}