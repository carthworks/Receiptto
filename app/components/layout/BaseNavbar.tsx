import { useMemo } from "react";

// Next
import Link from "next/link";
import Image from "next/image";

// Assets
import Logo from "@/public/assets/img/invoify-logo.svg";

// ShadCn
import { Card } from "@/components/ui/card";

// Components
import { DevDebug, LanguageSelector, ThemeSwitcher } from "@/app/components";
import { Icon } from "@radix-ui/react-select";

const BaseNavbar = () => {
  const devEnv = useMemo(() => process.env.NODE_ENV === "development", []);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <nav className="lg:container mx-auto">
        <Card className="flex flex-wrap justify-between items-center px-6 py-3 gap-4">
          
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group">
           
            {/* <Image
              src={Logo}
              alt="Receipto Logo"
              width={36}
              height={36}
              priority
              className="transition-transform group-hover:scale-105"
            /> */}
            <span className="font-bold text-xl text-primary group-hover:text-primary/90">
              Receipto
            </span>
          </Link>

          {/* Tagline */}
          <span className="hidden sm:inline text-muted-foreground text-sm">
            Smart & Simple Invoicing
          </span>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Uncomment if you need multi-language */}
            {/* <LanguageSelector /> */}
            <ThemeSwitcher />
            {/* {devEnv && <DevDebug />} */}
          </div>
        </Card>
      </nav>
    </header>
  );
};

export default BaseNavbar;
