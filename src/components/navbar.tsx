import { Navbar, ThemeSwitch } from "nextra-theme-blog";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";

export default async function CustomNavbar() {
  return (
    <nav className="w-11/12 md:w-4/5 mx-auto pt-4">
      <Navbar pageMap={await getPageMap()}>
        <Search />
        <ThemeSwitch />
      </Navbar>
    </nav>
  );
}
