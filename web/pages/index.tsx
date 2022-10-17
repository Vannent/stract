import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { AgainIcon, BackIcon, PlayIcon } from "../components";
import Header from "../components/Header";
import hero from "../assets/herobanner.png";

const Home: NextPage = () => {
  const CONTENT_ENDPOINT: string = `https://cjh01gmtz3.execute-api.us-west-1.amazonaws.com/prod/generate_content`;
  const HASHTAG_ENDPOINT: string = `https://cjh01gmtz3.execute-api.us-west-1.amazonaws.com/prod/generate_keywords`;

  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [results, setResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const onSubmit = () => {
    if (alert) return;
    if (input.length < 2) return;
    setLoading(true);
    Promise.all([
      fetch(`${CONTENT_ENDPOINT}?prompt=${input}`).then((res) => res.json()),
      fetch(`${HASHTAG_ENDPOINT}?prompt=${input}`).then((res) => res.json()),
    ]).then((res) => {
      onResult(res);
    });
  };

  const redoFunc = () => {
    onSubmit();
  };

  const onResult = (data: any) => {
    setContent(data[0].content);
    setHashtags(data[1].hashtags);
    setResults(true);
    setLoading(false);
  };

  const handleInput = (e: any) => {
    if (input.length >= 32) {
      setAlert(true);
    } else if (input.length < 32) {
      setAlert(false);
    }
    setInput(e.currentTarget.value);
  };

  const Spinner = () => {
    return (
      <div
        role="status"
        className="w-full h-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#F9A66C]"
          viewBox="0 0 100 101"
        >
          <path
            fill="currentColor"
            d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919z"
          ></path>
          <path
            fill="currentFill"
            d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0041.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0144.131 25.769c.902 2.34 3.361 3.802 5.787 3.165z"
          ></path>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };

  const Home = () => {
    return (
      <div className="w-full h-full flex flex-col">
        {loading ? (
          <Spinner />
        ) : (
          <div className="h-full flex flex-col items-center justify-evenly">
            <h3 className="font-body capitalize font-semibold text-3xl text-[#4A6163]">
              Generate content for your brand
            </h3>
            <p className="font-body text-[#4A6163]">
              Tell me what your brand is about, and I will generate content and
              hashtags for your posts.
            </p>

            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="brand"
                className="font-body text-sm text-[#4A6163]/90 font-bold"
              >
                Your brand
              </label>
              <input
                onChange={(e) => handleInput(e)}
                value={input}
                autoFocus={true}
                type="text"
                placeholder="Coffee"
                className="border border-[#fefff9] text-[#4A6163]/80 text-sm rounded h-8 focus:ring-[#F9A66C] shadow focus:shadow-lg focus:shadow-[#F9A66C]/30 p-2.5"
                required
              />
              <div className="w-full flex">
                <span className="font-body font-semibold text-[10px] text-red-500/80 w-4/5">
                  {alert ? "Cannot exceed 32 characters." : null}
                </span>
                <span
                  className={
                    alert
                      ? "font-title text-[10px] text-right self-end text-red-500/80 fond-extrabold w-1/5"
                      : "font-title text-[10px] text-right self-end text-[#4A6163]/80 w-1/5"
                  }
                >
                  {input.length}/32
                </span>
              </div>
            </div>

            <button
              onClick={onSubmit}
              className={
                alert
                  ? "flex h-12 w-40 rounded border-2 border-[#F9A66C] text-[#F9A66C] items-center cursor-not-allowed px-2 gap-5 font-semibold my-2"
                  : "flex h-12 w-40 rounded border-2 border-[#F9A66C] text-[#F9A66C] items-center px-2 gap-5 font-semibold my-2"
              }
            >
              <PlayIcon />
              Preview
            </button>
          </div>
        )}
      </div>
    );
  };

  const Results = () => {
    const title = "font-title text-lg text-[#F9A66C] font-semibold mb-1";
    const body = "font-body text-[#4A6163] mb-2";
    const card = "w-full";

    return (
      <div className="w-full h-full gap-2 flex flex-col">
        {loading ? (
          <Spinner />
        ) : (
          <div className="">
            <div className="flex flex-col items-center justify-evenly mb-4 mt-1">
              <div className={card}>
                <h3 className={title}>Your brand</h3>
                <p className={body}>
                  {input.charAt(0).toUpperCase() + input.slice(1)}
                </p>
              </div>
              <div className={card}>
                <h3 className={title}>Content</h3>
                <p className={body}>{content.replace(/-|1-9/g, "")}</p>
              </div>
              <div className={card}>
                <h3 className={title}>Hashtags</h3>
                <div className="flex gap-1 flex-wrap">
                  {hashtags.map((hashtag) => {
                    return (
                      <span className="bg-[#c58557]/10 py-0.5 px-1.5 rounded font-title font-normal tracking-wide text-[#4A6163]/60">
                        {hashtag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex w-full gap-3">
              <button
                onClick={() => setResults(false)}
                className="flex h-12 w-40 rounded border-2 border-[#4F9C59] text-[#4F9C59] items-center px-2 gap-5 font-semibold self-center my-2"
              >
                <BackIcon />
                Back
              </button>
              <button
                onClick={redoFunc}
                className="flex h-12 w-40 rounded border-2 border-[#F9A66C] text-[#F9A66C] items-center px-3 gap-5 font-semibold self-center my-2"
              >
                <AgainIcon />
                Again
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen w-screen bg-[#ebece7] flex items-center justify-center overflow-scroll">
      <Head>
        <title>Stract</title>
        <meta name="description" content="Generate content for your page." />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      <main className="h-3/5 w-4/5 max-w-[730px] min-h-[400px] max-h-[600px] bg-[#F9FAF4] rounded-3xl flex items-center justify-center p-5">
        <div className="md:w-2/4 md:min-w-[305px] w-full h-full flex items-center justify-between flex-col gap-2 px-5">
          <Header />
          {results ? <Results /> : <Home />}
        </div>
        <div className="hidden md:flex md:w-3/4 h-full rounded-3xl">
          <Image src={hero} />
        </div>
      </main>
    </div>
  );
};

export default Home;
