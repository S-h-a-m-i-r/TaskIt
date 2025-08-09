import type React from "react"

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export interface InvoiceData {
  invoiceNumber: string
  reference: string
  issueDate: string
  dueDate: string
  businessName: string
  businessAddress: string[]
  businessPhone: string
  businessEmail: string
  businessWebsite: string
  clientName: string
  clientAddress: string[]
  items: InvoiceItem[]
  subtotal: number
  total: number
  currency: string
}


export const dummyInvoiceData: InvoiceData = {
  invoiceNumber: "INV-2025-0001",
  reference: "JOB-456789",
  issueDate: "2025-07-01",
  dueDate: "2025-07-15",

  businessName: "Task Away Solutions",
  businessAddress: [
    "789 Developer Lane",
    "Tech Park Phase 3",
    "San Francisco, CA 94107",
  ],
  businessPhone: "+1 (415) 123-4567",
  businessEmail: "contact@codecraft.dev",
  businessWebsite: "www.codecraft.dev",

  clientName: "Acme Enterprises Inc.",
  clientAddress: [
    "456 Client Street",
    "Business Tower, 5th Floor",
    "New York, NY 10001",
  ],

  items: [
    {
      id: "1",
      description: "Full-stack Web Development (React, Node.js)",
      quantity: 40,
      unitPrice: 60,
      amount: 2400,
    },
    {
      id: "2",
      description: "UI/UX Design",
      quantity: 10,
      unitPrice: 50,
      amount: 500,
    },
    {
      id: "3",
      description: "Cloud Infrastructure Setup (AWS)",
      quantity: 5,
      unitPrice: 100,
      amount: 500,
    },
  ],

  subtotal: 3400,
  total: 3400,
  currency: "USD",
}


interface InvoiceTemplateProps {
  data: InvoiceData
}

 const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({data}) => {
    
  return (
    <div className="bg-white w-full max-w-4xl mx-auto text-black!" id="invoice-template">
      {/* Header Section */}
      <div className="bg-slate-600 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.businessName}</h1>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold">Invoice</h2>
            <p className="text-sm opacity-90">Tax Invoice</p>
            <div className="mt-4 text-sm">
              <p>{data.businessPhone}</p>
              <p>{data.businessEmail}</p>
              <p>{data.businessWebsite}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-slate-500 text-black px-6 py-4">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <p className="text-sm font-semibold">INVOICE NO.</p>
            <p className="text-sm font-semibold">REFERENCE</p>
          </div>
          <div>
            <p className="text-sm">{data.invoiceNumber}</p>
            <p className="text-sm">{data.reference}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold">ISSUE DATE</p>
              <p className="text-sm">{data.issueDate}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">DUE DATE</p>
              <p className="text-sm">{data.dueDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* FROM Section */}
          <div>
            <h3 className="font-bold text-sm mb-2">FROM</h3>
            <div className="text-sm text-gray-700">
              <p className="font-semibold">{data.businessName}</p>
              {data.businessAddress.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>

          {/* TO Section */}
          <div>
            <h3 className="font-bold text-sm mb-2">TO</h3>
            <div className="text-sm text-gray-700">
              <p className="font-semibold">{data.clientName}</p>
              {data.clientAddress.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>

          {/* Total Due */}
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-sm text-gray-600 mb-1">Total due</p>
            <p className="text-3xl font-bold">${data.total.toFixed(2)}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 font-bold text-sm">DESCRIPTION</th>
                <th className="text-center py-3 font-bold text-sm">QUANTITY</th>
                <th className="text-center py-3 font-bold text-sm">UNIT PRICE ($)</th>
                <th className="text-right py-3 font-bold text-sm">AMOUNT ($)</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-4 text-sm">{item.description}</td>
                  <td className="py-4 text-sm text-center">
                    {item.quantity} hour{item.quantity !== 1 ? "s" : ""}
                  </td>
                  <td className="py-4 text-sm text-center">{item.unitPrice.toFixed(2)}</td>
                  <td className="py-4 text-sm text-right">{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals and Signature */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="mt-8">
              <p className="text-sm text-gray-600 mb-4">Issued by, signature:</p>
              <div className="w-64 h-16 border-b border-gray-300 flex items-end">
                {/* Signature placeholder - you can add an actual signature image here */}
                <div className="h-12 w-48 bg-gray-100 rounded flex items-center justify-center text-gray-500 text-xs">
                  Signature Area
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <span className="text-sm font-semibold">Subtotal: </span>
              <span className="text-sm">${data.subtotal.toFixed(2)}</span>
            </div>
            <div className="text-xl font-bold">
              <span>Total ({data.currency}): </span>
              <span>${data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceTemplate;