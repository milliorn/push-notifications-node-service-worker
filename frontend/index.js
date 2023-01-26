const publicVapidKey = process.env.PUBLIC_KEY;

// Check to see if service worker is available
if ("serviceWorker" in navigator) {
  send().catch((err) => console.log(err));
}

// We need to register the service worker, push, and send the push notification
async function send() {
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/.sw.js", {
    scope: "/",
  });
  console.log("Service worker is registered.");

  // Now we need to register the push
  console.log("Registering push...");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });

  console.log("Push registered.");

  // Now we send our push notification
  console.log("Send push notification...");

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });

  console.log("Push notification sent.");
}
