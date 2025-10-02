"use client";

import { PageMapItem } from "nextra";
import { normalizePages } from "nextra/normalize-pages";
import {
  FC,
  ReactNode,
  useState,
  useEffect,
  Children,
  isValidElement,
} from "react";
import { CustomNavbarLink } from "./CustomNavbarLink";
import { ExternalLink, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Separator } from "./ui/separator";

type CustomNavbarProps = {
  children?: ReactNode;
  pageMap: PageMapItem[];
};

/**
 * Custom Navbar component with responsive mobile menu
 *
 * Features:
 * - Desktop: Horizontal navigation with search and theme switch
 * - Mobile: Fullscreen dropdown menu with animated hamburger icon
 * - Smooth animations and transitions
 * - Accessible with proper ARIA labels
 *
 * @param children - Search and ThemeSwitch components
 * @param pageMap - Nextra page map for navigation items
 */
export const CustomNavbar: FC<CustomNavbarProps> = ({ children, pageMap }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Normalize the pageMap to get top-level navigation items
  const { topLevelNavbarItems } = normalizePages({
    list: pageMap,
    route: "/",
  });

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menu on navigation
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Separate children into individual components
  const childrenArray = Children.toArray(children);

  return (
    <header
      className="flex items-center justify-between gap-3 w-full relative"
      data-pagefind-ignore="all"
    >
      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden md:flex items-center gap-3 flex-1 justify-end">
        {topLevelNavbarItems.map((nav) => (
          <CustomNavbarLink key={nav.route} href={nav.route}>
            {nav.title}
          </CustomNavbarLink>
        ))}

        <a
          href="https://docs.dipakrathod.me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:opacity-60 transition-opacity text-sm"
        >
          Documentation
          <ExternalLink className="h-3 w-3" />
        </a>
      </nav>

      {/* Right side controls - Always visible */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Desktop: Render children side by side */}
        <div className="hidden md:flex items-center gap-3">
          {childrenArray.map((child, index) => (
            <div key={index}>{child}</div>
          ))}
        </div>

        {/* GitHub Icon - Always visible */}
        <a
          href="https://github.com/dipakrathod-tech"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:opacity-60 transition-opacity"
          aria-label="GitHub Profile"
        >
          <FaGithub className="h-5 w-5" />
        </a>

        {/* Hamburger Menu Button - Mobile only */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 hover:bg-accent rounded-md transition-colors relative z-50"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <div className="w-5 h-4 flex flex-col justify-between relative">
            {/* Top line */}
            <span
              className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${
                isMenuOpen
                  ? "rotate-45 translate-y-[7px]"
                  : "rotate-0 translate-y-0"
              }`}
            />

            {/* Middle line */}
            <span
              className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            />

            {/* Bottom line */}
            <span
              className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out origin-center ${
                isMenuOpen
                  ? "-rotate-45 -translate-y-[7px]"
                  : "rotate-0 translate-y-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Fullscreen Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-[73px] bg-background transition-all duration-300 ease-in-out z-40 ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="h-full overflow-y-auto flex flex-col">
          {/* Utilities Section */}
          <div className="px-6 py-6 border-b bg-muted/30 shrink-0">
            <div className="flex items-center gap-4 justify-center">
              {childrenArray.map((child, index) => (
                <div key={index} className="flex items-center">
                  {child}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col py-2 flex-1" role="navigation">
            {topLevelNavbarItems.map((nav, index) => (
              <div key={nav.route}>
                <div
                  onClick={handleLinkClick}
                  className="flex items-center justify-between px-6 py-5 hover:bg-accent transition-colors group cursor-pointer"
                >
                  <CustomNavbarLink
                    href={nav.route}
                    className="flex-1 no-underline"
                  >
                    <span className="text-lg font-medium">{nav.title}</span>
                  </CustomNavbarLink>
                  <ChevronRight className="h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>

                {index < topLevelNavbarItems.length - 1 && (
                  <Separator className="mx-6" />
                )}
              </div>
            ))}

            {/* Documentation Link */}
            <Separator className="mx-6 my-2" />

            <a
              href="https://docs.dipakrathod.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-6 py-5 hover:bg-accent transition-colors group"
              onClick={handleLinkClick}
            >
              <span className="flex items-center gap-2 text-lg font-medium">
                Documentation
                <ExternalLink className="h-4 w-4" />
              </span>
              <ChevronRight className="h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
