const publicVapidKey =
  "BNlpzkqdHKnsfEGLEUNJb3YnCYGbB6g41KqGfeulnoUJAABfr2SOvsBjgZSZiKwbmkmWOnKEvfQcvp5QwpxOAHo";

// Check to see if service worker is available
if ("serviceWorker" in navigator) {
  send().catch((err) => console.log(err));
}

// We need to register the service worker, push, and send the push notification
async function send() {
  console.log("Registering service worker...");

  const register = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
  });

  console.log("Service Worker is registered.");

  // Register Push
  console.log("Registering our Push...");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  console.log("Push is registered.");

  // Send Push Notification
  console.log("Sending our push...");

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });

  console.log("Push has been sent.");
}
