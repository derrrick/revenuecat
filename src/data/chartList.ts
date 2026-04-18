export type ChartListItem = {
  label: string;
  slug: string;
  icon: string;
};

export type ChartListGroup = {
  label: string;
  tone: "violet" | "green" | "blue" | "teal" | "orange" | "red";
  items: ChartListItem[];
};

export const CHART_LIST: ChartListGroup[] = [
  {
    label: "Revenue",
    tone: "violet",
    items: [
      { label: "Revenue", slug: "revenue", icon: "currency-usd" },
      { label: "ARR", slug: "arr", icon: "autorenew" },
      { label: "MRR", slug: "mrr", icon: "autorenew" },
      { label: "MRR Movement", slug: "mrr_movement", icon: "autorenew" },
      { label: "Non-subscription Purchases", slug: "non-subscription_purchases", icon: "person" },
    ],
  },
  {
    label: "Subscriptions",
    tone: "green",
    items: [
      { label: "Active Subscriptions", slug: "actives", icon: "calendar" },
      { label: "Active Subscriptions Movement", slug: "actives_movement", icon: "calendar" },
      { label: "New Paid Subscriptions", slug: "actives_new", icon: "person-add" },
      { label: "Subscription Retention", slug: "subscription_retention", icon: "autorenew" },
      { label: "Subscription Status", slug: "subscription_status", icon: "person" },
    ],
  },
  {
    label: "Cohorts and LTV",
    tone: "blue",
    items: [
      { label: "Cohort Explorer", slug: "cohort_explorer", icon: "people" },
      { label: "Realized LTV per Customer", slug: "ltv_per_customer", icon: "person" },
      { label: "Realized LTV per Paying Customer", slug: "ltv_per_paying_customer", icon: "person" },
    ],
  },
  {
    label: "Conversion funnel",
    tone: "teal",
    items: [
      { label: "New Customers", slug: "customers_new", icon: "person-add" },
      { label: "Initial Conversion", slug: "initial_conversion", icon: "person-new" },
      { label: "Trial Conversion", slug: "trial_conversion", icon: "trial" },
      { label: "Conversion to Paying", slug: "conversion_to_paying", icon: "filter" },
    ],
  },
  {
    label: "Trials",
    tone: "orange",
    items: [
      { label: "Active Trials", slug: "trials", icon: "hourglass" },
      { label: "Active Trials Movement", slug: "trials_movement", icon: "hourglass" },
      { label: "New Trials", slug: "trials_new", icon: "timelapse" },
    ],
  },
  {
    label: "Churn and refunds",
    tone: "red",
    items: [
      { label: "Churn", slug: "churn", icon: "heart-broken" },
      { label: "Refund Rate", slug: "refund_rate", icon: "refund" },
      { label: "App Store Refund Requests", slug: "refund_request", icon: "appstore" },
      { label: "Play Store Cancel Reasons", slug: "play_store_cancel_reason", icon: "playstore" },
    ],
  },
];
