const LOCALHOST_URL_PATTERN = /^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/.*)?$/i;

function normalizeBaseUrl(value?: string | null) {
  return value?.trim().replace(/\/+$/, "") || "";
}

function isLocalhostUrl(value: string) {
  return LOCALHOST_URL_PATTERN.test(value);
}

export function getRequestAppUrl(headersList: Pick<Headers, "get">) {
  const forwardedHost = headersList.get("x-forwarded-host");
  const host = forwardedHost || headersList.get("host");
  if (!host) return "";

  const forwardedProto = headersList.get("x-forwarded-proto");
  const protocol = forwardedProto || (isLocalhostUrl(`http://${host}`) ? "http" : "https");
  return normalizeBaseUrl(`${protocol}://${host}`);
}

export function getPublicAppUrl(
  settingBaseUrl?: string | null,
  requestBaseUrl?: string | null
) {
  const settingUrl = normalizeBaseUrl(settingBaseUrl);
  const envUrl = normalizeBaseUrl(process.env.APP_URL);
  const requestUrl = normalizeBaseUrl(requestBaseUrl);

  if (process.env.NODE_ENV === "production" && settingUrl && isLocalhostUrl(settingUrl)) {
    return envUrl || requestUrl || settingUrl;
  }

  return settingUrl || envUrl || requestUrl || "http://localhost:3000";
}
