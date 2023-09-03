const butInstall = document.getElementById("buttonInstall");
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  butInstall.style.visibility = "visible";
  deferredPrompt = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  if (deferredPrompt !== undefined && deferredPrompt !== null) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      deferredPrompt = null;
      butInstall.visibility = "hidden";
    }
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("YEEESSSSS!!!!!!!!!!!!!!!!!", "appinstalled", event);
  deferredPrompt = null;
  butInstall.style.visibility = "hidden";
});

butInstall.style.visibility =
  deferredPrompt !== undefined && deferredPrompt !== null
    ? "visible"
    : "hidden";
