import { getSettings } from "@/lib/db/queries/settings";
import LoginClient from "./login-client";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  let settings: Record<string, string> = {};

  try {
    settings = await getSettings(["logo_login", "logo_login_scale"]);
  } catch (error) {
    console.error("Gagal memuat branding login dari database:", error);
  }

  return (
    <LoginClient 
      initialLogoSrc={settings.logo_login}
      initialLogoScale={parseInt(settings.logo_login_scale || "80", 10)}
    />
  );
}
