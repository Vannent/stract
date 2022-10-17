import Link from "next/link";
import React from "react";
import { GithubIcon } from ".";

const Header = () => {
  return (
    <div className="flex w-full h-1/5 justify-between items-center">
      <div className="font-semibold font-title text-3xl text-[#4A6163] cursor-default">
        <span className="">s</span>
        <span className="">t</span>
        <span className="">r</span>
        <span className="">a</span>
        <span className="">c</span>
        <span className="">t</span>
        <span className="">.</span>
      </div>
      <a
        href="https://github.com/Vannent/stract"
        target="blank"
        className="hover:scale-110 ease-in-out duration-100 cursor-pointer"
      >
        <GithubIcon />
      </a>
    </div>
  );
};

export default Header;
