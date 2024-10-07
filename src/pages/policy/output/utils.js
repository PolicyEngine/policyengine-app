import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { message } from "antd";
import { COUNTRY_CODES } from "../../../data/countries";

const avgChangeDirection = (change) =>
  change >= 0 ? "would increase" : "would decrease";

const plotLayoutFont = {
  font: { family: "Roboto Serif" },
  // background color transparent
  plot_bgcolor: "rgba(0,0,0,0)",
};

async function downloadPng(filename) {
  const downloadableContent = document.getElementById("downloadable-content");
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
      saveAs(blob, filename + ".png");
    });
  }
}

function downloadCsv(data, filename) {
  if (data !== null) {
    const csvContent = data
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
  }
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  message.info("Link copied to clipboard");
}
function extractCountryId() {
  const path = window.location.pathname;
  const pathParts = path.split("/").filter((item) => item.length > 0);

  // If valid, return the normal country ID
  if (pathParts.length > 0 && COUNTRY_CODES.includes(pathParts[0])) {
    return pathParts[0];
  }
  // If we have an invalid ID (e.g., "undefined" or "garbage"),
  // the router will redirect to "us", so return that as country ID
  else if (pathParts.length > 0) {
    return "us";
  }
  // Otherwise, we're on the standard page; return null and allow
  // router to redirect
  else {
    return null;
  }
}

export {
  avgChangeDirection,
  plotLayoutFont,
  downloadPng,
  downloadCsv,
  copyLink,
  extractCountryId,
};
