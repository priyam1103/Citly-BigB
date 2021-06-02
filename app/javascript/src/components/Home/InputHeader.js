import React, { useState } from "react";
import urlsApi from "apis/urls";
export default function InputHeader({ setUrls, downloadPdf, setToast }) {
  const [url, setUrl] = useState("");

  async function postUrl() {
    try {
      const response = await urlsApi.postUrl({ original_url: url });
      if (response.status == 200) {
        setUrl("");
        setUrls((prevState) => {
          return [response.data.url, ...prevState];
        });
        setToast({ state: true, body: "Shortened URL created successfully" });
        setTimeout(() => {
          setToast({ state: false, body: null });
        }, 3000);
      }
    }
    catch (err) {
      if (err.response.data.already)
        setToast({ state: false, body: err.response.data.errors });
        setTimeout(() => {
        setToast({ state: false, body: null });
      }, 3000);
    }
  }

  return (
    <section className = "flex justify-between p-2 my-4 w-11/12 mx-auto">
      <div className = "flex-grow">
        <div className="w-full flex rounded text-sm">
          <div className = "w-full">
            <input
              className = "bg-white border-2 rounded-l border-purple w-full py-2 px-4 text-black-700 focus:outline-none focus:bg-white focus:border-purple-100"
              id="url-text"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter a Url to shorten..."
            />
          </div>
          <div></div>
        </div>
        <button
          className = " rounded-r m-2 bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 cursor-pointer"
          type="submit"
          disabled={url.length > 6 ? false : true}
          onClick={postUrl}
        >
          Shorten!
        </button>
        <button
          onClick={downloadPdf}
          className = "rounded-r m-2 bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 cursor-pointer"
        >
          📥 Reports
        </button>
        <a
          download="report.csv"
          href="data:text/csv;charset=utf-8,null"
          className = "hidden"
        ></a>
      </div>
    </section>
  );
}
