// utils/exportToPDF.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const ExportToPDF = async (ref, fileName = "Report.pdf") => {
  if (!ref?.current) return;
  ref.current.style.display = "block";
  await new Promise((resolve) => setTimeout(resolve, 500));
  const canvas = await html2canvas(ref.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = imgProps.width;
  const imgHeight = imgProps.height;
  const scaledHeight = (imgHeight * pdfWidth) / imgWidth;
  const yOffset = scaledHeight < pdfHeight ? (pdfHeight - scaledHeight) / 2 : 0;
  pdf.addImage(imgData, "PNG", 0, yOffset, pdfWidth, scaledHeight);
  pdf.save(fileName);
  ref.current.style.display = "none";
};