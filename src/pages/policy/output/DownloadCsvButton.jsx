import React from 'react';
import html2canvas from 'html2canvas';  
import { saveAs } from 'file-saver';

const DownloadCsvButton = ({ content, filename, preparingForScreenshot, style }) => {
  const downloadCSV = (event) => {
    event.preventDefault();

    const csvContent =
      content.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', filename);
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    URL.revokeObjectURL(url);
  };

  const handleDownloadImage = async () => {
    setTimeout(async () => {
      const downloadableContent = document.getElementById('downloadable-content');
      if (downloadableContent) {
        const canvas = await html2canvas(downloadableContent);
        canvas.toBlob((blob) => {
          saveAs(blob, 'chart.png');
        });
      }
    }, 500);
  };

  if (preparingForScreenshot) {
    return null;
  }

  const downloadButtonStyle = {
    display: "inline-block",
    backgroundColor: "#F2F2F2",
    color: "black",
    textAlign: "right",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "-65px 0 18px 0",
    float: "left",
    ...style,
  };

  return (
    <div style={downloadButtonStyle}>
      <a href="#" onClick={downloadCSV}>
        Download CSV
      </a>
      {" | "}
      <a href="#" onClick={handleDownloadImage}>
        Download PNG
      </a>
    </div>
  );
};

export default DownloadCsvButton;
