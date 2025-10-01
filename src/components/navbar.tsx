import { ThemeSwitch } from "nextra-theme-blog";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { CustomNavbar as Navbar } from "./CustomNavbar";

export default async function CustomNavbar() {
  return (
    <nav className="px-4 py-4 border-b border-border shadow-sm">
      <Navbar pageMap={await getPageMap()}>
        <Search />
        <ThemeSwitch />
      </Navbar>
    </nav>
  );
}
