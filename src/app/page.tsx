import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>Home Page</h1>
      <Link href="/api/auth/login">Login</Link>
    </main>
  )
}
