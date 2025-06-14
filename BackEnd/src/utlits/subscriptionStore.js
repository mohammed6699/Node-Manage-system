let subscriptionStore = null;

function setSubscription(subscription) {
  subscriptionStore = subscription;
}

function getSubscription() {
  return subscriptionStore;
}

export { setSubscription, getSubscription };