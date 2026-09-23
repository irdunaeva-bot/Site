export type Language = 'uk' | 'en';

export interface ProductVersion {
  version: string;
  date: string;
  isLatest?: boolean;
  title: {
    uk: string;
    en: string;
  };
  description: {
    uk: string;
    en: string;
  };
  changes: {
    uk: string[];
    en: string[];
  };
  githubReleaseUrl: string;
  demoUrl: string;
  commitHash: string;
}

export interface ProductFeature {
  title: {
    uk: string;
    en: string;
  };
  desc: {
    uk: string;
    en: string;
  };
}

export interface Product {
  id: string;
  slug: string;
  name: {
    uk: string;
    en: string;
  };
  tagline: {
    uk: string;
    en: string;
  };
  shortDescription: {
    uk: string;
    en: string;
  };
  fullDescription: {
    uk: string;
    en: string;
  };
  category: {
    uk: string;
    en: string;
  };
  engineArchitecture: string;
  githubUrl: string;
  demoUrl: string;
  versions: ProductVersion[];
  currentVersion: string;
  badges: string[];
  features: ProductFeature[];
  techStack: string[];
  hourlyPriceUah: number;
  monthlyPriceUah: number;
  mockPreviewType: 'documind' | 'visioncraft' | 'datasynth';
}

export type PlanType = 'hourly' | 'monthly' | 'bundle_hourly' | 'bundle_monthly';

export interface ActiveLicense {
  orderReference: string;
  productId: string;
  productName: string;
  planType: PlanType;
  duration: number;
  expiresAt: number;
  licenseKey: string;
  customerEmail: string;
  customerName: string;
  createdAt: number;
  amount: number;
}

export interface WayForPayCheckoutData {
  productId: string;
  productName: string;
  planType: PlanType;
  duration: number;
  amount: number;
  currency: string;
}

export interface CompanyRequisites {
  legalNameUk: string;
  legalNameEn: string;
  edrpou: string;
  addressUk: string;
  addressEn: string;
  email: string;
  phone: string;
  supportHoursUk: string;
  supportHoursEn: string;
  iban: string;
  bankUk: string;
  bankEn: string;
}
