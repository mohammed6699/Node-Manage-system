import webpush from "web-push";


// eslint-disable-next-line no-undef
const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
    "mailto:mena.maherqw@gmail.com",
    publicVapidKey,
    privateVapidKey
);
