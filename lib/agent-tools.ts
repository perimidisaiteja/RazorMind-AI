export type RevenueMetrics = { revenue: number; orders: number; conversion: number; aov: number };

export function analyzeRevenue(): RevenueMetrics {
  return { revenue: 482300, orders: 412, conversion: 5.8, aov: 1171 };
}

export function findOpportunity() {
  const metrics = analyzeRevenue();
  return {
    title: 'Gaming Bundle Upsell',
    confidence: 91,
    estimatedMonthlyRevenue: 42600,
    reason: `Customers with a mechanical keyboard frequently buy a gaming mouse. A bundle can increase AOV from ₹${metrics.aov.toLocaleString('en-IN')}.`,
    action: 'create_offer',
  };
}

export function createOffer() {
  return {
    offerId: 'offer_gaming_bundle',
    title: 'Mechanical Keyboard + Gaming Mouse',
    originalPrice: 2776,
    bundlePrice: 2499,
    discountPercent: 10,
    status: 'active',
  };
}

export function measureResult(paymentAmount = 249900) {
  return {
    paymentAmount,
    incrementalRevenue: paymentAmount / 100,
    experiment: 'Gaming Bundle Upsell',
    status: 'measured',
    insight: 'Bundle purchase confirmed. Revenue experiment produced a measurable conversion event.',
  };
}
