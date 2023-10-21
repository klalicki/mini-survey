import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-xl">
          <h1 className="text-5xl">
            Welcome to <span className="brand">mini-survey!</span>
          </h1>
          <p className="text-3xl">
            This project is a work in progress. At this point the editor view is
            fully functional with 3 section types and a functioning backend.
          </p>
          <button
            className="text-3xl p-4 border-red-500 border-solid border-2"
            onClick={() => {
              router.push("/survey/new");
            }}
          >
            New
          </button>
        </div>
      </main>
    </>
  );
}
