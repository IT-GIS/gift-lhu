import { getSettings } from "@/lib/db/queries/settings";
import { PageHeader } from "@/components/shared/page-header";
import { SettingsForm } from "./settings-form";

const SETTING_KEYS = [
  "company_name",
  "company_address",
  "company_email",
  "company_phone",
  "lhu_number_format",
  "verification_base_url",
  "document_footer",
  "logo_login",
  "logo_login_scale",
  "logo_dashboard",
  "logo_dashboard_scale",
  "logo_web",
  "logo_web_scale",
];

export default async function SettingsPage() {
  const settings = await getSettings(SETTING_KEYS);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Global settings untuk branding perusahaan, format nomor LHU, domain verifikasi, footer dokumen, dan aturan revoke."
      />
      <SettingsForm defaultValues={settings} />
    </div>
  );
}
