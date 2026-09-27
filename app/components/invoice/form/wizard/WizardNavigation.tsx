"use client";

// React Wizard
import { useWizard } from "react-use-wizard";

// Components
import { BaseButton } from "@/app/components";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";
import { useInvoiceContext } from "@/contexts/InvoiceContext";

// Icons
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";

const WizardNavigation = () => {
    const { isFirstStep, isLastStep, previousStep, nextStep } =
        useWizard();

    const { invoicePdfLoading } = useInvoiceContext();
    const { _t } = useTranslationContext();

    return (
        <div className="flex justify-between items-center gap-5 pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
            <div>
                {!isFirstStep && (
                    <BaseButton
                        type="button"
                        variant="outline"
                        tooltipLabel="Go back to the previous step"
                        onClick={previousStep}
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        {_t("form.wizard.back")}
                    </BaseButton>
                )}
            </div>

            <div>
                {isLastStep ? (
                    <BaseButton
                        type="submit"
                        tooltipLabel="Generate your invoice"
                        loading={invoicePdfLoading}
                        loadingText="Generating your invoice"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 shadow-sm"
                    >
                        <Eye className="w-4 h-4 mr-1.5" />
                        {_t("actions.generatePdf")}
                    </BaseButton>
                ) : (
                    <BaseButton
                        type="button"
                        tooltipLabel="Go to the next step"
                        onClick={nextStep}
                    >
                        {_t("form.wizard.next")}
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </BaseButton>
                )}
            </div>
        </div>
    );
};

export default WizardNavigation;
