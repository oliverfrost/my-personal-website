export interface FeatureFlags {
  /** Portfolio section is hidden until real projects are ready. */
  portfolio: boolean;
  /** Show the "open for new opportunities" badge on the contact form. */
  openForOpportunities: boolean;
}

export const features: FeatureFlags = {
  portfolio: false,
  openForOpportunities: true,
};
