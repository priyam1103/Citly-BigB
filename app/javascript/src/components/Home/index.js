import React, { useEffect, useState } from "react";
import urlsApi from "apis/urls";
import UrlContainer from "./UrlContainer";
import InputHeader from "./InputHeader";
import Navbar from "./Navbar";
import Toast from "../Toast";
import generatePDF from "../../helper/reportGenerator";
export default function index() {
  useEffect(() => {
    fetchUrls();
  }, []);
  const [urls, setUrls] = useState([]);
  const [toast, setToast] = useState({ state: false, body: null });

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
  async function pinUnpin(shortCode) {
    try {
      const response = await urlsApi.pinUnpinUrl(shortCode);
      if (response.status == 200) {
        fetchUrls();
      }
    } catch (err) {
      console.log(err.response);
    }
  }
  async function downloadPdf() {
    generatePDF(urls);
  }
  async function deleteUrl(shortCode) {
    try {
      const response = await urlsApi.deleteUrl(shortCode);
      if (response.status == 200) {
        fetchUrls();
      }
    } catch (err) {
      console.log(err.response);
    }
  }
  return (
    <div>
      {toast.body && <Toast success={toast.state} body={toast.body}/>}
      <Navbar />
      <div className="bg-gray-100">
        <InputHeader setUrls={setUrls} downloadPdf={downloadPdf} setToast={setToast}/>
        <UrlContainer urls={urls} pinUnpin={pinUnpin} deleteUrl={deleteUrl} />
      </div>
    </div>
  );
}
