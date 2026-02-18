// popup.js

const toggle = document.getElementById("toggle");
const labelText = document.getElementById("labelText");

function setLabel(isEnabled) {
  labelText.textContent = isEnabled ? "Enabled" : "Disabled";
}

async function init() {
  const { enabled } = await browser.storage.local.get("enabled");
  const isEnabled = (typeof enabled === "boolean") ? enabled : true;

  toggle.checked = isEnabled;
  setLabel(isEnabled);
}

toggle.addEventListener("change", async () => {
  const isEnabled = toggle.checked;
  await browser.storage.local.set({ enabled: isEnabled });
  setLabel(isEnabled);
});

init();
