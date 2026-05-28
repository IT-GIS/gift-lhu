const LOCALHOST_URL_PATTERN = /^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/.*)?$/i;

function normalizeBaseUrl(value?: string | null) {
  return value?.trim().replace(/\/+$/, "") || "";
}

function isLocalhostUrl(value: string) {
  return LOCALHOST_URL_PATTERN.test(value);
}

export function getPublicAppUrl(settingBaseUrl?: string | null) {
  const settingUrl = normalizeBaseUrl(settingBaseUrl);
  const envUrl = normalizeBaseUrl(process.env.APP_URL);

  if (
    process.env.NODE_ENV === "production" &&
    settingUrl &&
    envUrl &&
    isLocalhostUrl(settingUrl) &&
    !isLocalhostUrl(envUrl)
  ) {
    return envUrl;
  }

  return settingUrl || envUrl || "http://localhost:3000";
}
