import { ReactNode } from 'react';
import FooterSection from "@/components/footer";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <FooterSection/>
    </>
  );
}
