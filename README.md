# 📄 Receipto

**Receipto** is a fast, modern, and open-source invoice generator built with **Next.js 15**, **TypeScript**, **React**, **Tailwind CSS**, and **Shadcn UI**.

Create, customize, preview, and export professional invoices in seconds — completely client-side friendly with optional serverless PDF rendering and email delivery.

---

## ✨ Features

- **⚡ Live Interactive Preview**: Real-time rendering as you enter sender, recipient, and invoice details.
- **🎨 Multiple Professional Templates**: Clean, responsive invoice layouts tailored for freelancers and businesses.
- **📥 Universal Export Options**: Download invoices in multiple formats:
  - **PDF** (rendered via headless Chromium / Puppeteer)
  - **JSON** (for backup and re-importing)
  - **CSV**
  - **XLSX** (Excel spreadsheet)
  - **XML**
- **📤 Invoice Import**: Re-import previously exported Receipto JSON files to quickly recreate or modify past invoices.
- **✍️ Digital Signatures**: Add signatures via **Drawing** (canvas), **Typing** (with custom cursive fonts), or **Image Upload**.
- **🌐 Internationalization (i18n)**: Full multi-language support across 14+ locales (English, Spanish, French, German, Italian, Portuguese, Japanese, Arabic, and more) powered by `next-intl`.
- **🌙 Dark & Light Modes**: Seamless theme switching with system preference detection via `next-themes`.
- **💾 Local Persistence**: Invoices and drafts automatically save to browser `localStorage` so you never lose your progress.
- **⏳ Quick Presets**: Single-click due date presets (`Today`, `Net 7`, `Net 14`, `Net 30`) and payment term suggestions.
- **📧 Email Invoices Directly**: Send formatted invoices straight to your client's inbox using Nodemailer.
- **💰 Flexible Charges & Currencies**: Support for global currencies, subtotal discounts (percentage or flat rate), taxes/VAT, shipping, and amount in words.

---

## ⚙️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) validation
- **PDF Generation**: [Puppeteer](https://pptr.dev/) & [@sparticuz/chromium](https://github.com/Sparticuz/chromium)
- **Email**: [Nodemailer](https://nodemailer.com/) & [@react-email/components](https://react.email/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)

---

## 🏁 Getting Started

### Prerequisites

- **Node.js**: `v18.17.0` or later (`v20+` recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/carthworks/Receiptto.git
   cd Receiptto
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # Base URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

   # Optional: Email Service (Gmail or SMTP)
   NODEMAILER_EMAIL=your-email@gmail.com
   NODEMAILER_PW=your-app-specific-password

   # Optional: Google Search Console Verification
   GOOGLE_SC_VERIFICATION=
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port specified in terminal).

---

## 📦 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Next.js development server with hot-reloading |
| `npm run build` | Builds the optimized production application |
| `npm run start` | Runs the built production server |
| `npm run lint` | Checks code formatting and ESLint rules |

---

## 📂 Project Structure

```
Receipto/
├── app/
│   ├── [locale]/             # Localized routes (pages, layout, template)
│   ├── api/                  # API route handlers (generate, export, send)
│   ├── components/           # UI components, form wizard steps, templates
│   └── globals.css           # Global Tailwind and font styles
├── contexts/                 # Context providers (Invoice, Theme, Translation)
├── hooks/                    # Custom React hooks (useToasts, useCurrencies)
├── i18n/                     # Locale configurations and JSON translations
├── lib/                      # Helper utilities, schemas, and fonts
├── services/                 # Server and client services (PDF generation, email)
└── types/                    # TypeScript interfaces and type definitions
```

---

## 🚀 Deployment

Receipto is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub.
2. Import your repository into Vercel.
3. Add any environment variables (e.g. `NODEMAILER_EMAIL`, `NODEMAILER_PW`).
4. Deploy!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
