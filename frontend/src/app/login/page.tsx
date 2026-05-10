"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      Cookies.set("auth", "true");

      router.push("/");

    } else {

      alert("Invalid credentials");

    }
  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 px-4 overflow-hidden relative">

      {/* Background Glow */}

      <div className="absolute w-[400px] h-[400px] bg-cyan-400 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[350px] h-[350px] bg-pink-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />



      {/* Login Card */}

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md">

        {/* Logo */}

        <div className="flex justify-center mb-6">

          <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-lg">

            <span className="text-4xl font-black text-blue-700">
              T
            </span>

          </div>

        </div>



        {/* Heading */}

        <h1 className="text-4xl font-extrabold text-center text-white mb-2 tracking-wide">
          TollIQ
        </h1>

        <p className="text-center text-gray-200 mb-10 text-sm">
          Smart Toll Management System
        </p>



        {/* Form */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Username */}

          <div>

            <label className="block text-sm text-gray-200 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />

          </div>



          {/* Password */}

          <div>

            <label className="block text-sm text-gray-200 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full p-4 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />

          </div>



          {/* Login Button */}

          <button
            type="submit"
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 rounded-xl transition duration-300 shadow-lg hover:scale-[1.02]"
          >
            Login
          </button>

        </form>



        {/* Footer */}

        <p className="text-center text-gray-300 text-xs mt-8">
          Secure access for TollIQ administrators
        </p>

      </div>

    </div>

  );

}