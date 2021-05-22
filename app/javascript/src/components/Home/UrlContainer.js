import React from "react";
import UrlItem from "./UrlItem";
export default function UrlContainer({ urls }) {
  return (
    <ul class="shadow rounded">
      <li class="flex items-center justify-between bg-purple-600 mb-px p-4 text-white text-lg rounded-t">
        <p class="w-2/5 flex justify-center">Original</p>
        <p class="w-2/5 flex justify-center">Short Url</p>
      </li>
      {urls.map((item, index) => {
        return (
          <li class="bg-white mb-px" key={index}>
            <UrlItem
              originalUrl={item.originalUrl}
              shortCode={item.shortCode}
              clicks={item.clicks}
            />
          </li>
        );
      })}
    </ul>
  );
}
