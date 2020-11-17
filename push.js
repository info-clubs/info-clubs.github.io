var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BJTWFP1rwTnyE5x7Vz3MWPUsEtXphuWyFItcn6eiTJohNla1Ogb-gF_A3jBeXxKDFjes9VPIsvN_cP6HLMdYOfE",
  privateKey: "RRJXsfbhAO7Ssk6qof8zCGXVL-BbzwspOX4rrcKvNao",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/frwl8fokAD0:APA91bFV1bJdJ_CykbWYOaSsAuYofQKvPOk3Bp7fuDIKQrSiFv4-qkmufbp8iJPMTnNYpXWadYDtJkI1Lg_zcYM3yj5E_qQ24-Y-xacLeNwFbQwnMGjE_V1bnN6xXqvC9pvXxk1vllmT",
  keys: {
    p256dh:
      "BE79+tVvwyFnaSA0tBvmm/9XZZl51/4CBLXCpauI3VV1rt6Pk88FIuHs/ubkdinjuy16LvTXU+KvCwYtZOokx0Q=",
    auth: "6PNP/XLhorV7kJSH0hqz5w==",
  },
};
var payload = "Selamat datang, info Club Bola";

var options = {
  gcmAPIKey: "321265037796",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
