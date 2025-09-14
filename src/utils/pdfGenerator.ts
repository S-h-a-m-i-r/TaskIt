
// import type { InvoiceData } from "../components/InvoiceTemplate"

import API from "../services/api"
// import { InvoiceTemplate } from "../components/generalComponents/InvoiceTemplate";
// import ReactDOMServer from "react-dom/server";

export const generatePDF = async (invoiceNumber: string): Promise<void> => {
  try {
    const response = await API.get(`/invoices/${invoiceNumber}/pdf`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice_${invoiceNumber}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}
