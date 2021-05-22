import React from "react";

export default function UrlItem({ originalUrl, shortCode, clicks }) {
  return (
    <article class="flex justify-between">
      <aside class="flex">
        <button
          class="text-purple-500 p-4 bg-gray-100 hover:text-purple-400"
        ></button>
      </aside>
      <div class="w-4/5 flex justify-between items-center">
        <a
          class="p-4 underline text-blue-800 hover:text-blue-700 break-all"
          href={originalUrl}
          target="_blank"
        >
          {originalUrl}
        </a>
        <a
          class="p-4 underline text-blue-800 hover:text-blue-700 break-all"
          href={`http://localhost:3000/urls/${shortCode}`}
          target="_blank"
        >
          {`http://localhost:3000/urls/${shortCode}`}
        </a>
      </div>
      <aside class="flex items-center bg-gray-100">
        <span title="Clicks" class="text-gray-600 p-4">
          {clicks}
        </span>
      </aside>
    </article>
  );
}
