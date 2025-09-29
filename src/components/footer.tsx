import { Footer} from 'nextra-theme-blog'

export default function CustomFooter() {
  return (
    <Footer>
      <abbr
        title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
        style={{ cursor: "help" }}
      >
       
      </abbr>{" "}
      {new Date().getFullYear()} © Dipak Rathod. All rights reserved.{" "}
      <a href="/rss.xml" style={{ float: "right" }}>
        RSS
      </a>
    </Footer>
  );
}
