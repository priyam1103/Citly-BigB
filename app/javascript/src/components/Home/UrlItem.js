import React from "react";
import Pin from "./Pin";
export default function UrlItem({
  originalUrl,
  shortCode,
  clicks,
  pinned,
  pinUnpin,
  deleteUrl,
}) {
  return (
    <article className="flex justify-between">
      <aside className="flex">
        <button
          className={`${
            pinned
              ? "text-purple-500 p-4 bg-gray-100 hover:text-purple-400"
              : "text-gray-500 p-4 bg-gray-100 hover:text-purple-400"
          }`}
          onClick={() => pinUnpin(shortCode)}
        >
          <Pin />
        </button>
      </aside>
      <div className="w-4/5 flex justify-between items-center">
        <a
          className="p-4 underline text-blue-800 w-2/5 hover:text-blue-700 break-all"
          href={originalUrl}
          target="_blank"
        >
          {originalUrl}
        </a>
        <a
          className="p-4 underline text-blue-800 w-2/5 text-center hover:text-blue-700 break-all"
          href={`https://citly-priyam-internship-l0.herokuapp.com/${shortCode}`}
          target="_blank"
        >
          {`https://citly-priyam-internship-l0.herokuapp.com/${shortCode}`}
        </a>
      </div>
      <aside className="flex items-center bg-gray-100 ">
        <span title="Clicks" className="text-gray-600 p-4">
          {clicks}
        </span>
        <span
          title="Clicks"
          className="text-red-600 p-4 cursor-pointer"
          onClick={() => deleteUrl(shortCode)}
        >
          &times;
        </span>
      </aside>
    </article>
  );
}
