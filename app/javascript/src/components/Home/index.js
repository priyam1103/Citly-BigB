import React, { useEffect, useState } from "react";
import urlsApi from "apis/urls";
import UrlContainer from "./UrlContainer";
import InputHeader from "./InputHeader";
export default function index() {
  useEffect(() => {
    fetchUrls();
  }, []);
  const [urls, setUrls] = useState([]);

  async function fetchUrls() {
    try {
      const response = await urlsApi.getUrls();
      if (response.status == 200) {
        setUrls(response.data.urls);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
        <InputHeader setUrls={setUrls}/>
        <UrlContainer urls={urls} />
    </div>
  );
}
