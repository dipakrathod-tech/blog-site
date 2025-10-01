import { useMDXComponents as getThemeComponents } from "nextra-theme-blog";
import { Fragment } from "react";
import AuthorHeader from "./components/ui/AuthorHeader";
import GoBack from "./components/ui/GoBack";

// Get the default MDX components from the theme
export function useMDXComponents(components) {
  const themeComponents = getThemeComponents(components);

  return {
    ...themeComponents,
    // Override the wrapper to show only title, AuthorHeader, and content
    wrapper({ children, metadata }) {
      return (
        <Fragment>
          {/* Title with back button on the right */}
          <div className="flex items-center justify-between mt-12 !mb-0">
            <h1 className="!mb-0 !mt-0">{metadata.title}</h1>
            <GoBack />
          </div>

          {/* Display author info with date */}
          <AuthorHeader className="mb-8 mt-4" date={metadata.date} />

          {/* Display the main content */}
          {children}
        </Fragment>
      );
    },
    ...components,
  };
}
