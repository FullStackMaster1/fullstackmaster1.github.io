import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initGA } from "./lib/analytics";

initGA();

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              window.dispatchEvent(new CustomEvent("swUpdated", { detail: registration }));
            }
          });
        }
      });

      if (registration.waiting && navigator.serviceWorker.controller) {
        window.dispatchEvent(new CustomEvent("swUpdated", { detail: registration }));
      }

      registration.update();
    } catch (error) {
      console.log("Service worker registration failed:", error);
    }
  });
}
