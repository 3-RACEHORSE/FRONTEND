import React from "react";
import IconWithTitle from "@/components/molecules/IconWithTitle";

interface BoardTitleProps {
  title: string;
  src?: string;
  detail?: string;
}

export default function BoardTitle({ title, src, detail }: BoardTitleProps) {
  return (
    <div>
      <IconWithTitle title={title} src={src} detail={detail} />
    </div>
  );
}
