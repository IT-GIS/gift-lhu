import { requireSession, clearSession } from "@/lib/auth/session";
import { roleLabels } from "@/lib/auth/rbac";
import { AppShellClient } from "./app-shell-client";
import { getSettings } from "@/lib/db/queries/settings";

/**
 * Server action to clear the user session and execute logout.
 */
async function logoutAction() {
  "use server";
  await clearSession();
}

/**
 * AppShell Server Component
 * Serves as the server-side wrapper for the main layout shell.
 * It is responsible for fetching the secure user session and passing it 
 * to the client-side `AppShellClient` layout container.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - Child components to render inside the shell.
 */
export async function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();
  const settings = await getSettings(["logo_dashboard", "logo_dashboard_scale"]);

  return (
    <AppShellClient 
      userFullName={session.fullName}
      userRole={session.role}
      userRoleLabel={roleLabels[session.role as keyof typeof roleLabels]}
      logoutAction={logoutAction}
      initialLogoSrc={settings.logo_dashboard}
      initialLogoScale={parseInt(settings.logo_dashboard_scale || "80", 10)}
    >
      {children}
    </AppShellClient>
  );
}
