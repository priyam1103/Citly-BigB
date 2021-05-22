import React, { useState } from "react";
import urlsApi from "apis/urls";
export default function InputHeader({ setUrls }) {
  const [url, setUrl] = useState("");
  async function postUrl() {
    try {
      const response = await urlsApi.postUrl({ originalUrl: url });
      if (response.status == 200) {
        setUrls((prevState) => {
          return [...prevState, response.data.url];
        });
        setUrl("");
      }
    } catch (err) {}
  }
  return (
    <section class="flex justify-between w-4/6 p-4 my-4 mx-auto">
      <div class="flex-grow">
        <div className="w-full flex rounded text-sm">
          <div class="w-full">
            <input
              class="bg-white border-2 rounded-l border-purple w-full py-2 px-4 text-black-700 focus:outline-none focus:bg-white focus:border-purple-100"
              id="url-text"
              type="text"
              defaultValue={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a Url to shorten..."
              value={url}
            />
          </div>
          <div>
            <button
              class=" rounded-r bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 cursor-pointer"
              type="submit"
              disabled={url.length > 6 ? false : true}
              onClick={postUrl}
            >
              Shorten!
            </button>
          </div>
        </div>
        <button class="rounded-r bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 cursor-pointer">
          📥 Reports
        </button>
        <a
          download="report.csv"
          href="data:text/csv;charset=utf-8,null"
          class="hidden"
        ></a>
      </div>
    </section>
  );
}
