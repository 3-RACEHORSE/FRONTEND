import BackHeader from "@/components/organism/layout/BackHeader";
import { ReactNode } from "react";

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <div>
      <BackHeader title="상세페이지" />
      {children}
    </div>
  );
}
