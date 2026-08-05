import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function ViewContainer({ children }: Props) {
  return <main className="container mt-4 mb-4">{children}</main>;
}
