import React from "react";
import UrlItem from "./UrlItem";

export default function UrlContainer({ urls, pinUnpin ,deleteUrl}) {
  return (
    <ul className = "shadow rounded">
      <li className = "flex items-center justify-between bg-purple-600 mb-px p-4 text-white text-lg rounded-t">
        <p className = "w-2/5 flex justify-center">Original</p>
        <p className = "w-2/5 flex justify-center">Short Url</p>
      </li>
      {urls?.map((item, index) => {
        return (
          <li className = "bg-white mb-px" key={index}>
            <UrlItem
              originalUrl={item.originalUrl}
              shortCode={item.shortCode}
              clicks={item.clicks}
              pinned={item.pinned}
              pinUnpin={pinUnpin}
              deleteUrl={deleteUrl}
            />
          </li>
        );
      })}
    </ul>
  );
}
