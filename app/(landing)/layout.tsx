import { WpStyles } from "@/components/landing/WpStyles";
import { LandingLanguageProvider } from "@/components/landing/landing-language-provider";

export default function LandingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LandingLanguageProvider>
      <div className="elementor-default elementor-kit-8 elementor-page">
        <WpStyles />
        {children}
      </div>
    </LandingLanguageProvider>
  );
}
