self.addEventListener("push", (event) => {
  try {
    if (!event.data) {
      console.error("No data received in push event.");
      return;
    }

    const data = event.data.json();

    console.log("📨 Push received with data:", data);

    // Validation 
    if (!data.title || !data.body) {
      console.error("Missing title or body in push payload.");
      return;
    }

    const options = {
      body: data.body,
      // icon: data.icon || "/icon.png",      
      image: data.image || undefined,       
      vibrate: data.vibrate || [100, 50, 100],  
      requireInteraction: false,             
      actions: data.actions || [          
        {
          action: "confirm",
          title: "Confirm",
          // icon: "/check.png"
        },
        {
          action: "cancel",
          title: "Cancel",
          // icon: "/cancel.png"
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (err) {
    console.error("Error handling push event:", err);
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // اغلق الإشعار بعد التفاعل

  const action = event.action;

  if (action === "confirm") {
    console.log("User clicked Confirm");
    // clients.openWindow('https://example.com/confirm');
  } else if (action === "cancel") {
    console.log("User clicked Cancel");
    // 
  } else {
    console.log("Notification clicked");
    // event.waitUntil(clients.openWindow('/'));
  }
});