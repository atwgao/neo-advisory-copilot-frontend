// src/config/brandingOverride.ts

// Momentum Group branding overrides for Neo-Advisory Copilot Dashboard.
// These values are merged into the defaults from brandingConfig.ts.

const brandingOverride = {
  companyName: 'Momentum Group Limited',
  deploymentName: 'Neo-Advisory Copilot',
  socialLinks: {
    twitter: { enabled: false, url: '' },
    github: { enabled: false, url: '' },
    discord: { enabled: false, url: '' },
  },
  navbar: {
    appName: 'Neo-Advisory Copilot',
    showDocsButton: false,
    menuItems: {
      home: true,
      documents: true,
      collections: true,
      chat: true,
      search: true,
      users: true,
      logs: true,
      analytics: false,
      settings: true,
    },
  },
  logo: {
    src: '/images/momentum-wordmark-white.svg',
    alt: 'Momentum',
  },
  loginLogo: {
    src: '/images/momentum-mark.svg',
    alt: 'Momentum',
  },
  theme: 'light',
  homePage: {
    pythonSdk: false,
    githubCard: false,
    hatchetCard: false,
  },
};

// Export the override object
export default brandingOverride;
