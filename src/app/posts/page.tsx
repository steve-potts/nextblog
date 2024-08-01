"use client";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getPosts } from "@/lib/functions";
import Post from "@/components/items/Post";

export default withPageAuthRequired(
  function Page() {
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [fetchedPosts, setFetchedPosts] = useState<PostWIthId[]>([]);
    useEffect(() => {
      async function fetchPosts() {
        console.log('hihi')
        await getPosts().then((posts) => {
          setFetchedPosts(posts);
          setLoadingPosts(false);
        });
      }
      fetchPosts();
    }, []);

    return (
      <section className="w-full flex flex-col items-center">
        <section className="w-[95%] max-w-4xl flex flex-col items-center">
          <h1 className="text-4xl font-bold mt-4 text-indigo-600">Your Posts</h1>
          <div className="w-full flex flex-col gap-8 mt-4 items-center">
            { loadingPosts &&
            <>
              <PostSkeleton/>
              <PostSkeleton/>
              <PostSkeleton/>
            </>
            }
            {
              !loadingPosts && fetchedPosts.length === 0 && (
                <h1 className="text-2xl font-bold text-center text-gray-600">
                  You have no posts yet!
                </h1>
              )
            }
            {
              !loadingPosts && fetchedPosts.length > 0 &&
              fetchedPosts.map((post, index) => (
                <Post post={post}
                  key={post._id}/>
              ))
            }
          </div>
        </section>
      </section>
    );
  })
