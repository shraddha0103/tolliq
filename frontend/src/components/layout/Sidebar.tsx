"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Receipt,
  BarChart3,
} from "lucide-react";

export default function Sidebar() {

  return (

    <div className="w-72 min-h-screen bg-linear-to-b from-blue-950 via-indigo-950 to-purple-950 text-white px-6 py-8 shadow-2xl">

      {/* Logo */}

      <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-5 mb-10 shadow-xl">

        <h1 className="text-3xl font-extrabold text-center tracking-wide">

          TollIQ

        </h1>

        <p className="text-center text-gray-300 text-sm mt-2">

          Smart Toll Management

        </p>

      </div>



      {/* Menu */}

      <div className="space-y-4">

        <Link
          href="/"
          className="flex items-center gap-4 bg-white/10 hover:bg-cyan-500 transition px-5 py-4 rounded-2xl"
        >

          <LayoutDashboard size={24} />

          <span className="text-lg font-medium">

            Dashboard

          </span>

        </Link>



        <Link
          href="/tollbooths"
          className="flex items-center gap-4 bg-white/10 hover:bg-cyan-500 transition px-5 py-4 rounded-2xl"
        >

          <Receipt size={24} />

          <span className="text-lg font-medium">

            Toll Booths

          </span>

        </Link>



        <Link
          href="/reports"
          className="flex items-center gap-4 bg-white/10 hover:bg-cyan-500 transition px-5 py-4 rounded-2xl"
        >

          <BarChart3 size={24} />

          <span className="text-lg font-medium">

            Reports

          </span>

        </Link>

      </div>

    </div>

  );

}