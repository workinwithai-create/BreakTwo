/* Export license gate. Playback stays free. A key is accepted only if Lemon Squeezy says valid. */
const CHECKOUT_URL = "https://workinwithai.com/#pricing";
const LICENSE_URL = "https://api.lemonsqueezy.com/v1/licenses/validate";

function licensed() {
  return localStorage.getItem("breaktwo-license") === "valid";
}
async function validateLicense(key) {
  const body = new URLSearchParams({ license_key: key });
  const res = await fetch(LICENSE_URL, {
    method: "POST",
    headers: { Accept: "application/json" },
    body
  });
  const data = await res.json().catch(() => ({}));
  const ok = data && data.valid === true;
  if (ok) localStorage.setItem("breaktwo-license", "valid");
  else localStorage.removeItem("breaktwo-license");
  return { ok, error: data.error || (ok ? "" : "License was not accepted") };
}
function gate(button) {
  if (!button || button.dataset.gated) return;
  button.dataset.gated = "1";
  const original = button.onclick;
  button.onclick = (event) => {
    if (!licensed()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const status = document.getElementById("status");
      if (status) status.textContent = "Export needs a Lemon Squeezy key. Family checkout does not deliver one yet.";
      const panel = document.getElementById("license");
      if (panel) panel.hidden = false;
      return;
    }
    if (original) original.call(button, event);
  };
}
function bootLicense() {
  ["wav", "wavTail", "mid"].forEach((id) => gate(document.getElementById(id)));
  const buy = document.getElementById("buy");
  if (buy) buy.addEventListener("click", (event) => {
    event.preventDefault();
    window.open(CHECKOUT_URL, "_blank", "noopener");
  });
  const unlock = document.getElementById("unlock");
  if (unlock) unlock.onclick = async () => {
    const key = (document.getElementById("licenseKey").value || "").trim();
    const status = document.getElementById("status");
    if (status) status.textContent = "Checking license…";
    try {
      const result = await validateLicense(key);
      if (status) status.textContent = result.ok ? "License accepted. Exports unlocked." : (result.error || "License was not accepted");
    } catch (e) {
      if (status) status.textContent = "License check failed. Try again.";
    }
  };
  const arm = document.getElementById("arm");
  const onboard = document.getElementById("onboard");
  if (arm) arm.onclick = () => {
    sessionStorage.setItem("breaktwo-armed", "1");
    if (onboard) onboard.hidden = true;
    const play = document.getElementById("playA");
    if (play) play.click();
  };
  if (onboard && sessionStorage.getItem("breaktwo-armed")) onboard.hidden = true;
}
window.BreakTwoLicense = { validateLicense, licensed };
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootLicense);
else bootLicense();
