import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../Sanity";
import { Post } from "../typings";


interface Props {
  posts: [Post];
}



export default function Home({ posts }: Props) {
  const log = () => {
    console.log(posts);
    
  }
  log();
  return (
    <div className="">
      <Head>
        <title>Eventify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* Banner */}
      <div className="flex justify-between items-center bg-amber-300 border-y border-black py-10 lg:py-0 max-w-7xl mx-auto">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif ">
            <span className="underline decoration-black decoration-4">
              Eventify
            </span>{" "}
            <span className="text-5xl">
            is a place to regiter, coordinate, and manage events.
            </span>
          </h1>
          <h2>
            It's easy and free to register your thinking on any event and connect
            with coordinators.
            
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="E.svg"
          alt="logo"
        />
      </div>
      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 max-w-7xl mx-auto">
        {posts.map((post) => (
          
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              <img
                className="rounded-t-lg h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold ">{post.title}</p>
                  <p className="text-xs">
                    {post.description} on <span className="text-xs text-green-500 font-bold">{new Date(post._createdAt).toDateString()}</span> 
                  </p>
                </div>
                <div>
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={urlFor(post.author.image).url()!}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
  _createdAt,
  _id,
  title,
  author-> {
  name,
  image
},
description,
mainImage,
slug
}`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
