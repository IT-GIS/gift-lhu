import { getSettings } from "@/lib/db/queries/settings";
import LoginClient from "./login-client";

export default async function LoginPage() {
  const settings = await getSettings(["logo_login", "logo_login_scale"]);

  return (
    <LoginClient 
      initialLogoSrc={settings.logo_login}
      initialLogoScale={parseInt(settings.logo_login_scale || "80", 10)}
    />
  );
}
