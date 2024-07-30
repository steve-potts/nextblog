"use client";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Page() {
  const { user, error, isLoading } = useUser();

  return (
    <main className="w-full flex flex-col">
      {
        user ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
              Hi, { user?.nickname || user?.name || 'our wonderful friend!' }
            </h1>
            <h2 className="text-xl max-w-lg text-center text-gray-600">
              Welcome to Bloggify, get started writing your posts!
            </h2>
            <Link
              href="/new"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-all cursor-pointer">
                Get Started
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
              Hello!
            </h1>
            <h2 className="text-xl max-w-lg text-center text-gray-600">
              Welcome to Bloggify, easily create blog posts!
            </h2>
            <a className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-all cursor-pointer" href="/api/auth/login">
              Login to get started</a>
          </div>
        )
      }
    </main>
  )
}
