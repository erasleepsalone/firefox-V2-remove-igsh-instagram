// background.js

const DEFAULT_ENABLED = true;
let enabled = DEFAULT_ENABLED;

function stripIgsh(urlString) {
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return null;
  }

  if (!url.searchParams.has("igsh")) return null;

  // Remove ALL occurrences
  url.searchParams.delete("igsh");

  return url.toString();
}

async function loadState() {
  const { enabled: stored } = await browser.storage.local.get("enabled");
  enabled = (typeof stored === "boolean") ? stored : DEFAULT_ENABLED;
}

browser.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.enabled && typeof changes.enabled.newValue === "boolean") {
    enabled = changes.enabled.newValue;
  }
});

browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (!enabled) return;

    const newUrl = stripIgsh(details.url);
    if (newUrl && newUrl !== details.url) {
      return { redirectUrl: newUrl };
    }
  },
  {
    urls: [
      "*://instagram.com/*",
      "*://*.instagram.com/*",
      "*://l.instagram.com/*"
    ],
    types: ["main_frame", "sub_frame"]
  },
  ["blocking"]
);

// Initialize state at startup
loadState();
