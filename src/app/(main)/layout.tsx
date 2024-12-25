"use client";

import { Footer, Navigation } from "@/components";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navigation />
      <main className="min-h-[calc(100vh-160px)]">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
