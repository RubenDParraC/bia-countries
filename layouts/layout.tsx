// types
import Header from "../components/header/header";
import type { LayoutProps } from "./types";

// sections

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Header />
      <main className="w-full max-w-[1440px] mt-20">{children}</main>
    </div>
  );
}

export default Layout;
