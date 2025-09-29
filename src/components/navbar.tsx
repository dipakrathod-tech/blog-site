import { Navbar, ThemeSwitch } from "nextra-theme-blog";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";

export default async function CustomNavbar() {
  return (
    <nav>
      <Navbar pageMap={await getPageMap()}>
        <Search />
        <ThemeSwitch />
      </Navbar>
    </nav>
  );
}
