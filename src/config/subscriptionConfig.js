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
      shortDescription: "Best for small Business Owners.",
    },
    {
      title: "Startup",
      shortDescription: "Best for Startup Owners.",
    },
    {
      title: "Enterprise",
      shortDescription: "Best for large Enteprise Business Owners.",
    },
  ],
};

export const subscriptionOptions = subscriptionConfig.subscriptions.map(
  (subscription) => String(subscription.title).toLowerCase(),
);
