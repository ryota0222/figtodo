import React, { FC, useMemo } from "react";

interface Props {
  content: string;
  href: string;
}

// 省略文字数
const OMIT_LENGTH = 30;

export const TaskLink: FC<Props> = ({ content, href }) => {
  // hrefのドメインがfigmaで、queryにnode-idがある
  const isFigmaLink = useMemo(() => {
    return href.includes("figma.com") && href.includes("node-id");
  }, [href]);
  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    console.log("click");
    if (isFigmaLink) {
      // URLからnode-idのqueryを取得
      const url = new URL(href);
      // x-xの形式をx:xに変換
      const nodeId = url.searchParams.get("node-id")?.replace("-", ":");
      parent.postMessage(
        { pluginMessage: { type: "navigate-to-node", nodeId } },
        "*"
      );
    } else {
      parent.postMessage({ pluginMessage: { type: "open-url", href } }, "*");
    }
  };
  const displayContent = useMemo(() => {
    // 15文字を超える場合は...を付与
    return content.length > OMIT_LENGTH
      ? `${content.slice(0, OMIT_LENGTH)}...`
      : content;
  }, [content]);
  return (
    <span role="button" className="cursor-pointer link" onClick={handleClick}>
      {displayContent}
    </span>
  );
};
