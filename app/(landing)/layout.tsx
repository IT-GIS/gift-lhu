import { WpStyles } from "@/components/landing/WpStyles";

export default function LandingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="elementor-default elementor-kit-8 elementor-page">
      <WpStyles />
      {children}
    </div>
  );
}
