export interface SharePayload {
  title: string;
  text: string;
  url: string;
  combined: string;
}

export function buildSharePayload(level: number): SharePayload {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("utm_source", "share");
  url.searchParams.set("utm_medium", "continue");
  url.searchParams.set("utm_campaign", "fail_continue");
  url.searchParams.set("lv", String(level));

  const text = `I’m on Level ${level} in Spot Odd One — find the emoji that doesn’t belong!`;
  const href = url.toString();
  return {
    title: "Spot Odd One",
    text,
    url: href,
    combined: `${text}\n${href}`,
  };
}

export async function tryNativeShare(
  payload: SharePayload,
): Promise<"shared" | "cancelled" | "unavailable"> {
  if (!navigator.share) return "unavailable";
  try {
    await navigator.share({
      title: payload.title,
      text: payload.text,
      url: payload.url,
    });
    return "shared";
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return "cancelled";
    }
    return "unavailable";
  }
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
