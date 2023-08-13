import React from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const DownloadCsvButton = ({
  content,
  filename,
  className,
  style,
  preparingForScreenshot,
}) => {
  const downloadCSV = () => {
    const csvContent = content
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const tempLink = document.createElement("a");
    tempLink.href = url;
    tempLink.setAttribute("download", filename);
    tempLink.style.display = "none";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    URL.revokeObjectURL(url);
  };
  const handleDownloadImage = async () => {
    setTimeout(async () => {
      const downloadableContent = document.getElementById(
        "downloadable-content",
      );
      if (downloadableContent) {
        const paddedDiv = document.createElement("div");
        paddedDiv.style.padding = "20px";
        paddedDiv.style.backgroundColor = "white";
        paddedDiv.style.display = "inline-block";
        paddedDiv.style.boxSizing = "content-box"; // Add this line
        paddedDiv.appendChild(downloadableContent.cloneNode(true));

        document.body.appendChild(paddedDiv);

        const canvas = await html2canvas(paddedDiv);

        document.body.removeChild(paddedDiv);
        canvas.toBlob((blob) => {
          const pngFileName = filename.replace(".csv", "");
          saveAs(blob, `${pngFileName}.png`);
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
    margin: "16px 0",
    float: "left",
    ...style,
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={downloadCSV}>
        Download CSV
      </Menu.Item>
      <Menu.Item key="2" onClick={handleDownloadImage}>
        Download PNG
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["hover"]}>
      <a
        className={className}
        style={downloadButtonStyle}
        onClick={(e) => e.preventDefault()}
      >
        Download <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default DownloadCsvButton;
