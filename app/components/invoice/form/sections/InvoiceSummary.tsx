"use client";

// Components
import {
    Charges,
    FormTextarea,
    SignatureModal,
    Subheading,
} from "@/app/components";

// RHF
import { useFormContext } from "react-hook-form";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";
import { SignatureContextProvider } from "@/contexts/SignatureContext";

const PAYMENT_TERMS_PRESETS = [
    "Due on Receipt",
    "Net 15",
    "Net 30",
    "50% Upfront, 50% upon delivery",
];

const InvoiceSummary = () => {
    const { _t } = useTranslationContext();
    const { setValue } = useFormContext();

    return (
        <section>
            <Subheading>{_t("form.steps.summary.heading")}:</Subheading>
            <div className="flex flex-wrap gap-x-5 gap-y-10">
                <div className="flex flex-col gap-3">
                    <SignatureContextProvider>
                        {/* Signature dialog */}
                        <SignatureModal />
                    </SignatureContextProvider>

                    {/* Additional notes & Payment terms */}
                    <FormTextarea
                        name="details.additionalNotes"
                        label={_t("form.steps.summary.additionalNotes")}
                        placeholder="Your additional notes"
                    />
                    <div>
                        <FormTextarea
                            name="details.paymentTerms"
                            label={_t("form.steps.summary.paymentTerms")}
                            placeholder="Ex: Net 30"
                        />
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {PAYMENT_TERMS_PRESETS.map((term) => (
                                <button
                                    key={term}
                                    type="button"
                                    onClick={() =>
                                        setValue("details.paymentTerms", term)
                                    }
                                    className="text-[11px] font-medium px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final charges */}
                <Charges />
            </div>
        </section>
    );
};

export default InvoiceSummary;
