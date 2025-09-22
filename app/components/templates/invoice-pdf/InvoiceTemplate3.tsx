import React from "react";

// Components
import { InvoiceLayout } from "@/app/components";

// Helpers
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

// Variables
import { DATE_OPTIONS } from "@/lib/variables";

// Types
import { InvoiceType } from "@/types";

const InvoiceTemplate3 = (data: InvoiceType) => {
  const { sender, receiver, details } = data;

  const fmt = (val: number | string | undefined) =>
    val === undefined || val === null ? "-" : `${formatNumberWithCommas(Number(val))} ${details.currency}`;

  return (
    <InvoiceLayout data={data}>
      {/* Header */}
      <header className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Receipto</h1>
          <p className="text-sm text-gray-600 mt-1">{sender.name}</p>
          {details.invoiceLogo && (
            <img
              src={details.invoiceLogo}
              alt={`Logo of ${sender.name}`}
              width={120}
              height={48}
              className="mt-2 object-contain"
            />
          )}
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600">Invoice</p>
          <p className="text-lg font-medium text-gray-900">#{details.invoiceNumber}</p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="block">Invoice date:</span>
            <span className="block">
              {new Date(details.invoiceDate).toLocaleDateString("en-US", DATE_OPTIONS)}
            </span>
            <span className="block mt-1">Due date:</span>
            <span className="block">
              {new Date(details.dueDate).toLocaleDateString("en-US", DATE_OPTIONS)}
            </span>
          </p>
        </div>
      </header>

      {/* Sender / Receiver */}
      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">From</h3>
          <address className="not-italic text-sm text-gray-700 mt-1">
            <div>{sender.name}</div>
            <div>{sender.address}</div>
            <div>
              {sender.city} {sender.zipCode}
            </div>
            <div>{sender.country}</div>
            {sender.email && <div className="mt-1 text-sm text-gray-700">{sender.email}</div>}
            {sender.phone && <div className="text-sm text-gray-700">{sender.phone}</div>}
          </address>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">Bill to</h3>
          <address className="not-italic text-sm text-gray-700 mt-1">
            <div className="font-medium text-gray-900">{receiver.name}</div>
            <div>{receiver.address}</div>
            <div>
              {receiver.city}, {receiver.zipCode}
            </div>
            <div>{receiver.country}</div>
          </address>
        </div>
      </section>

      {/* Items */}
      <section className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto border-collapse">
            <thead>
              <tr className="text-left">
                <th className="pb-2 border-b border-gray-200 w-1/2">Item</th>
                <th className="pb-2 border-b border-gray-200 w-1/6">Qty</th>
                <th className="pb-2 border-b border-gray-200 w-1/6">Rate</th>
                <th className="pb-2 border-b border-gray-200 w-1/6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {details.items.map((item, idx) => (
                <tr key={idx} className="align-top">
                  <td className="py-3 pr-4 border-b border-gray-100">
                    <div className="font-medium text-gray-800">{item.name}</div>
                    {item.description && (
                      <div className="text-xs text-gray-600 mt-1 whitespace-pre-line">{item.description}</div>
                    )}
                  </td>
                  <td className="py-3 border-b border-gray-100">{item.quantity}</td>
                  <td className="py-3 border-b border-gray-100">
                    {formatNumberWithCommas(Number(item.unitPrice))} {details.currency}
                  </td>
                  <td className="py-3 border-b border-gray-100 text-right font-medium text-gray-900">
                    {formatNumberWithCommas(Number(item.total))} {details.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Totals */}
      <section className="mt-6 flex justify-end">
        <div className="w-full max-w-sm">
          <dl className="text-sm space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-700">Subtotal</dt>
              <dd className="font-medium text-gray-900">{fmt(Number(details.subTotal))}</dd>
            </div>

            {details.discountDetails?.amount != undefined && details.discountDetails.amount > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-700">Discount</dt>
                <dd className="text-gray-900">
                  {details.discountDetails.amountType === "amount"
                    ? `- ${formatNumberWithCommas(details.discountDetails.amount)} ${details.currency}`
                    : `- ${details.discountDetails.amount}%`}
                </dd>
              </div>
            )}

            {details.taxDetails?.amount != undefined && details.taxDetails.amount > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-700">Tax</dt>
                <dd className="text-gray-900">
                  {details.taxDetails.amountType === "amount"
                    ? `+ ${formatNumberWithCommas(details.taxDetails.amount)} ${details.currency}`
                    : `+ ${details.taxDetails.amount}%`}
                </dd>
              </div>
            )}

            {details.shippingDetails?.cost != undefined && details.shippingDetails.cost > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-700">Shipping</dt>
                <dd className="text-gray-900">
                  {details.shippingDetails.costType === "amount"
                    ? `+ ${formatNumberWithCommas(details.shippingDetails.cost)} ${details.currency}`
                    : `+ ${details.shippingDetails.cost}%`}
                </dd>
              </div>
            )}

            <div className="flex justify-between border-t border-gray-200 pt-3">
              <dt className="text-gray-800 font-semibold">Total</dt>
              <dd className="text-gray-900 font-semibold text-lg">
                {formatNumberWithCommas(Number(details.totalAmount))} {details.currency}
              </dd>
            </div>

            {details.totalAmountInWords && (
              <div className="pt-2 text-xs text-gray-600">
                <em>{details.totalAmountInWords} {details.currency}</em>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* Notes / Payment */}
      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          {details.additionalNotes && (
            <>
              <h4 className="text-sm font-semibold text-gray-800">Notes</h4>
              <p className="text-sm text-gray-700 mt-1">{details.additionalNotes}</p>
            </>
          )}

          {details.paymentTerms && (
            <>
              <h4 className="text-sm font-semibold text-gray-800 mt-3">Payment terms</h4>
              <p className="text-sm text-gray-700 mt-1">{details.paymentTerms}</p>
            </>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-800">Payment information</h4>
          <div className="text-sm text-gray-700 mt-1">
            {details.paymentInformation?.bankName && <div>Bank: {details.paymentInformation.bankName}</div>}
            {details.paymentInformation?.accountName && <div>Account name: {details.paymentInformation.accountName}</div>}
            {details.paymentInformation?.accountNumber && <div>Account no: {details.paymentInformation.accountNumber}</div>}
            {details.paymentInformation?.ifsc && <div>IFSC: {details.paymentInformation.ifsc}</div>}
          </div>
        </div>
      </section>

      {/* Contact + Signature */}
      <footer className="mt-6">
        <div className="text-sm text-gray-600">
          <p>If you have any questions concerning this invoice, contact:</p>
          <div className="mt-1">
            {sender.email && <div className="text-gray-800">{sender.email}</div>}
            {sender.phone && <div className="text-gray-800">{sender.phone}</div>}
          </div>
        </div>

        {details?.signature?.data ? (
          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-800">Signature</p>
            {isDataUrl(details.signature.data) ? (
              <img
                src={details.signature.data}
                alt={`Signature of ${sender.name}`}
                width={140}
                height={60}
                className="mt-2 object-contain"
              />
            ) : (
              <p
                style={{
                  fontSize: 28,
                  fontFamily: `${details.signature.fontFamily || "cursive"}`,
                  marginTop: 8,
                }}
              >
                {details.signature.data}
              </p>
            )}
          </div>
        ) : null}
      </footer>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate3;
