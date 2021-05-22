import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (urls) => {
  const doc = new jsPDF();

  const tableColumn = ["Original Url", "Shortend Url", "Clicks"];
  const tableRows = [];

  urls.forEach((url) => {
    const urlData = [
      url.originalUrl,
      `https://citly-priyam-internship-l0.herokuapp.com/${url.shortCode}`,
      url.clicks,
    ];
    tableRows.push(urlData);
  });

  doc.autoTable(
    tableColumn,
    tableRows,
      {
        startY: 20,
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 70 },
        2: { cellWidth: 20 },
      },
    }
  );

  doc.save(`citlyreport.pdf`);
};

export default generatePDF;
