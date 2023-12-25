import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { message } from "antd";

const avgChangeDirection = (change) =>
  change >= 0 ? "would increase" : "would decrease";

const plotLayoutFont = {
  font: { family: "Roboto, sans-serif" },
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

export {
  avgChangeDirection,
  plotLayoutFont,
  downloadPng,
  downloadCsv,
  copyLink,
};
