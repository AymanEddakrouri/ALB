import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
  children?: React.ReactNode;
  lang: "ar" | "en";
  toggleLang: () => void;
};

export default function Layout({ children, lang, toggleLang }: LayoutProps): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar lang={lang} toggleLang={toggleLang} />

      <main className="flex-1">
        {children}
      </main>

      <Footer lang={lang} />

    </div>
  );
}