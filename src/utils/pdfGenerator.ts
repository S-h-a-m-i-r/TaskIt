
// import type { InvoiceData } from "../components/InvoiceTemplate"

import { InvoiceData } from "../components/generalComponents/InvoiceTemplate"
// import { InvoiceTemplate } from "../components/generalComponents/InvoiceTemplate";
// import ReactDOMServer from "react-dom/server";

export const generatePDF = async (invoiceData: InvoiceData): Promise<void> => {
  try {
    // Dynamic imports to reduce bundle size
    const html2canvas = (await import("html2canvas")).default
    const jsPDF = (await import("jspdf")).default

    // const htmlString = ReactDOMServer.renderToString(
    //     <InvoiceTemplate {invoiceData} />
    //   );
    const htmlString = ''
  
      // Create a temporary container to render the HTML string
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = htmlString;
      document.body.appendChild(tempContainer);
  
      const element = tempContainer.firstChild as HTMLElement;
      if (!element) {
        throw new Error("Invoice template not found");
      }
    if (!element) {
      throw new Error("Invoice template not found")
    }

    // Create canvas from the invoice template
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    const imgData = canvas.toDataURL("image/png")

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    // Add first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Download the PDF
    pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}
