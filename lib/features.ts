export interface FeatureFlags {
  /** Portfolio section is hidden until real projects are ready. */
  portfolio: boolean;
}

export const features: FeatureFlags = {
  portfolio: false,
};
