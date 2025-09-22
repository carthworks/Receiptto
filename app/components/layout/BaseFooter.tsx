"use client";

import { useTranslationContext } from "@/contexts/TranslationContext";

// Variables
import { AUTHOR_GITHUB } from "@/lib/variables";

const BaseFooter = () => {
  const { _t } = useTranslationContext();

  return (
    <footer className="border-t border-gray-200 mt-10 bg-gray-50">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Receipto</h2>
          <p className="mt-2 text-sm text-gray-600">
            {_t("footer.tagline") ?? "A simple and smart invoicing app."}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            {_t("footer.quickLinks") ?? "Quick Links"}
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="/privacy" className="hover:text-gray-900 underline">
                {_t("footer.privacy") ?? "Privacy Policy"}
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-gray-900 underline">
                {_t("footer.terms") ?? "Terms & Conditions"}
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-900 underline">
                {_t("footer.contact") ?? "Contact"}
              </a>
            </li>
          </ul>
        </div>

        {/* Credits / Social */}
        <div className="md:text-right">
          <p className="text-sm">
            {_t("footer.developedBy")}{" "}
            <a
              href={AUTHOR_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-gray-900 underline"
            >
             
              {_t("footer.appname")}{" "} {_t("footer.version")}
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-500">
            © {new Date().getFullYear()} Receipto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BaseFooter;
