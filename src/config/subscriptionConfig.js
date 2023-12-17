export const subscriptionConfig = {
  subscriptionStatuses: [
    "active",
    "canceled",
    "past_due",
    "unpaid",
    "incomplete",
  ],
  subscriptions: [
    {
      title: "Business",
      shortDescription: "Best for small Business",
      price: 59.99,
    },
    {
      title: "Startup",
      shortDescription: "Best for Startup",
      price: 100.99,
    },
    {
      title: "Enterprise",
      shortDescription: "Best for large Enteprise Business",
      price: 239.99,
    },
  ],
};

export const subscriptionOptions = subscriptionConfig.subscriptions.map(
  (subscription) => String(subscription.title).toLowerCase(),
);
