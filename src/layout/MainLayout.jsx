import React, { ReactNode } from "react";
import Header from "../components/Header";


const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Header />
      <main className="container mx-auto px-4 pt-16 pb-8">{children}</main>
    </div>
  );
};

export default MainLayout;
