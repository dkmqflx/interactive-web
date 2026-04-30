import type { Metadata } from "next";
import Confetti from "./confetti";

export const metadata: Metadata = {
  title: "Confetti · Interactive Web Showcase",
  description:
    "회전하며 끊임없이 분사되는 컨페티 스트림 — 클릭하면 좌측에서 추가 폭죽이 터집니다.",
};

export default function ConfettiPage() {
  return <Confetti />;
}
