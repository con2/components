import { gfmStrikethroughFromMarkdown } from "mdast-util-gfm-strikethrough";
import { gfmStrikethrough } from "micromark-extension-gfm-strikethrough";
import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSanitize from "rehype-sanitize";
import type {} from "remark-parse";
import type { Processor } from "unified";

interface Props {
  input: string;
}

/// `~~struck~~` from GitHub Flavored Markdown, without the rest of GFM (tables,
/// autolinks, task lists, footnotes). A single tilde stays literal, so "~20 €" is not struck.
function remarkStrikethrough(this: Processor) {
  const data = this.data();
  (data.micromarkExtensions ??= []).push(
    gfmStrikethrough({ singleTilde: false }),
  );
  (data.fromMarkdownExtensions ??= []).push(gfmStrikethroughFromMarkdown());
}

export default function Markdown({ input }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkStrikethrough]}
      rehypePlugins={[
        rehypeSanitize,
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
      ]}
    >
      {input}
    </ReactMarkdown>
  );
}
