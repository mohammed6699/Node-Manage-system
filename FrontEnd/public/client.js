const VAPID_PUBLIC_KEY = "BEpug1UEM_IqUQL8B4WW_UH2MlkqT96Fv2QgSboW0XAqyaz8iNTzaCUHd57j_2XleNOY88x3qjiLh4fntUNbXKk"; // استبدلها بالمفتاح العام بتاعك

const url="https://node-manage-system-back.vercel.app/"
// conver puplic key (base64 url safe) to unit8Array
/*
  bas64 = BEpug1UEM_IqUQL8B4WW_UH2MlkqT96Fv2QgSboW0XAqyaz8iNTzaCUHd57j_2XleNOY88x3qjiLh4fntUNbXKk 

  any index has vakue from 0 - 255 becouse unit8 8bit
  Uint8Array(65) =[
  4 // 4 deciaml number , 74, 232, 29, 80, 67, 252, 138,
  144, 64, 191, 7, 133, 150, 253, 65,
  246, 50, 89, 41, 63, 222, 133, 191,
  100, 130, 27, 161, 91, 69, 192, 171,
  38, 179, 248, 136, 212, 243, 104, 37,
  7, 121, 238, 227, 253, 143, 158, 133,
  56, 220, 198, 162, 138, 33, 225, 233,
  213, 13, 177, 114, 167
]
*/
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i)
    outputArray[i] = rawData.charCodeAt(i);

  return outputArray;
}


document.addEventListener("DOMContentLoaded", () => {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Notification permission denied.");
    }
  });
});


// Service Workers و Push Notifications
if ("serviceWorker" in navigator && "PushManager" in window) {
  navigator.serviceWorker.register("./sw.js") // service worker
    .then(async (registration) => {
      console.log("Service Worker registered.");

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      console.log("User is subscribed:", subscription);

      await fetch(url+"api/save-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
      });

      console.log("Subscription sent to server");
    })
    .catch(error => {
      console.error(" Service Worker registration or push subscription failed:", error);
    });
} else {
  console.warn(" Push messaging is not supported");
}