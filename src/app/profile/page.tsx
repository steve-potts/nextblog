"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Link from "next/link";

export default withPageAuthRequired(
  function Page() {
    return (
      <main>
        <p>User Page</p>
        <div>
          <Link href="/">Go to Home</Link>
        </div>
      </main>
    );
  })
