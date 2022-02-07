/** @type {import('next').NextConfig} */

/* 
PLUGINS
*/

// REF: https://flaviocopes.com/nextjs-analyze-app-bundle/
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withSentryConfig } = require('@sentry/nextjs');
const createNextPluginPreval = require('next-plugin-preval/config');

/* 
CONSTANTS
*/

const ALLOWED_IMAGE_ORIGINS = '*.sanity.io';
const ALLOWED_IFRAME_ANCESTORS = 'https://smarthernews-studio.sanity.studio/*';
const ALLOWED_FONT_SOURCES = 'https://fonts.googleapis.com';

/* 
HELPERS
*/
/* eslint-disable unicorn/no-array-reduce */
const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);
/* eslint-enable unicorn/no-array-reduce */

/* 
PLUGIN PREPPING
*/
const withNextPluginPreval = createNextPluginPreval();

const configuredSentryPlugin = (nextjsConfig) =>
  withSentryConfig(nextjsConfig, {
    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
  });

/* 
CONFIGS
*/

const headers = async () => [
  {
    headers: [
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), battery=(), geolocation=(self), interest-cohort=()',
      },
      /* NOTE: may want to create a unique one for pages
      with previews then block all iframes as a general rule.
      https://nextjs.org/docs/api-reference/next.config.js/headers */
      /* {
          key: "Content-Security-Policy",
          value: `default-src 'self'; font-src 'self' '${ALLOWED_FONT_SOURCES}'; img-src 'self' ${ALLOWED_IMAGE_ORIGINS}; script-src 'self'; frame-ancestors ${ALLOWED_IFRAME_ANCESTORS}`,
        }, */
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      // NOTE: not explicitly needed as Vercel injects
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      // NOTE: could be culprit for card download bugs
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
      },
    ],
    source: '/(.*)',
  },
];

const redirects = async () => [
  {
    destination: '/quickreads/:pid',
    permanent: true,
    source: '/quick_reads/:pid',
  },
  {
    destination: '/quickquotes/:pid',
    permanent: true,
    source: '/quick_quotes/:pid',
  },
  {
    destination: '/videoposts/:pid',
    permanent: true,
    source: '/video_posts/:pid',
  },
];

const typescript = {
  // HACK: disable later.
  ignoreBuildErrors: true,
};

const eslint = {
  // HACK: disable later.
  ignoreDuringBuilds: true,
};

const images = {
  domains: ['cdn.sanity.io'],
};

/* 
EXPORTS
*/

const moduleExports = {
  eslint,
  experimental: {
    // REF: https://nextjs.org/docs/advanced-features/output-file-tracing#how-it-works
    outputStandalone: true,
    styledComponents: true,
  },
  headers,
  images,
  reactStrictMode: true,
  redirects,
  typescript,
};

module.exports = configuredSentryPlugin(withNextPluginPreval(withBundleAnalyzer(moduleExports)));
