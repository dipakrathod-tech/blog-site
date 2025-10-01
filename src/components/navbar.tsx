import { ThemeSwitch } from "nextra-theme-blog";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { CustomNavbar as Navbar } from "./CustomNavbar";

export default async function CustomNavbar() {
  return (
    <nav className=" mx-17.5 pt-4">
      <Navbar pageMap={await getPageMap()}>
        <Search />
        <ThemeSwitch />
      </Navbar>
    </nav>
  );
}
