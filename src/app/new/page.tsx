"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Link from "next/link";

export default withPageAuthRequired(
  function Page() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      console.log(e);
    }

    return (
      <section className="w-full flex flex-col items-center">
        <section className="w-[95%] max-w-4xl">
          <form onSubmit={handleSubmit}>
            
          </form>
        </section>
      </section>
    );
  })
