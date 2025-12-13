import { useState, useEffect } from "react";

export function useServiceWorker() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const handleSwUpdate = (event: CustomEvent<ServiceWorkerRegistration>) => {
      setRegistration(event.detail);
      setUpdateAvailable(true);
    };

    window.addEventListener("swUpdated", handleSwUpdate as EventListener);

    return () => {
      window.removeEventListener("swUpdated", handleSwUpdate as EventListener);
    };
  }, []);

  return { registration, updateAvailable };
}
