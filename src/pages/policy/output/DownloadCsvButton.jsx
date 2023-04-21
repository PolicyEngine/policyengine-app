import React from 'react';

const DownloadCsvButton = ({ content, filename, className, style }) => {
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

  const downloadButtonStyle = {
    display: "inline-block",
    backgroundColor: "#F2F2F2",
    color: "black",
    textAlign: "right",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "16px, 0",
    float: "left",
    ...style,
  };

  return (
    <a
      href="#"
      onClick={downloadCSV}
      className={className}
      style={downloadButtonStyle}
    >
      Download CSV
    </a>
  );
};

export default DownloadCsvButton;

