import React from 'react';
import cssMapping from './css_mapping.json';

export function WpStyles() {
  const links = Object.values(cssMapping);
  
  return (
    <>
      {links.map((link) => (
        <link key={link} rel="stylesheet" href={link} />
      ))}
      <style suppressHydrationWarning>{`
        /* Overrides for Next.js */
        html, body { margin: 0; padding: 0; overflow-x: hidden; }
        .elementor-1184 .elementor-element.elementor-element-3a538e800,
        .elementor-1184 .elementor-element.elementor-element-3a538e800:not(.elementor-motion-effects-element-type-background) {
          background-image: url("/landing/hero-lab.png") !important;
        }
        .elementor-1184 .elementor-element.elementor-element-28c7b67e,
        .elementor-1184 .elementor-element.elementor-element-28c7b67e:not(.elementor-motion-effects-element-type-background) {
          background-image: url("/landing/facility-bg.png") !important;
        }
        .elementor-1185 .elementor-element.elementor-element-8030a81,
        .elementor-1185 .elementor-element.elementor-element-8030a81:not(.elementor-motion-effects-element-type-background),
        .elementor-1156 .elementor-element.elementor-element-8030a81,
        .elementor-1156 .elementor-element.elementor-element-8030a81:not(.elementor-motion-effects-element-type-background) {
          background-image: url("/landing/subpage-cover.jpg") !important;
        }
        .elementor-1186 .elementor-element.elementor-element-0580e27,
        .elementor-1186 .elementor-element.elementor-element-0580e27:not(.elementor-motion-effects-element-type-background),
        .elementor-1189 .elementor-element.elementor-element-4e53d5c,
        .elementor-1189 .elementor-element.elementor-element-4e53d5c:not(.elementor-motion-effects-element-type-background) {
          background-image: url("/landing/subpage-cover.jpg") !important;
        }
        .elementor-1185 .elementor-element.elementor-element-10b14b6,
        .elementor-1185 .elementor-element.elementor-element-10b14b6:not(.elementor-motion-effects-element-type-background) {
          background-image: url("/landing/blueprint.jpg") !important;
        }
        .elementor-1189 .elementor-element.elementor-element-cf5e46f,
        .elementor-1189 .elementor-element.elementor-element-cf5e46f:not(.elementor-motion-effects-element-type-background),
        .elementor-1184 .elementor-element.elementor-element-cf5e46f,
        .elementor-1184 .elementor-element.elementor-element-cf5e46f:not(.elementor-motion-effects-element-type-background) {
          background-image: url("/landing/facility-bg.png") !important;
        }
        .elementor-166 {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #fff;
        }
        .elementor-166 .e-con-inner,
        .elementor-222 .e-con-inner,
        .gift-wp-section > .e-con-inner,
        .elementor-section > .elementor-container {
          width: min(1200px, calc(100% - 40px));
          margin: 0 auto;
        }
        .elementor-166 .elementor-element-bdb4fea > .e-con-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 89px;
        }
        .elementor-166 .wpr-logo-image img {
          display: block;
          width: 140px !important;
          max-width: 140px !important;
          height: auto !important;
          object-fit: contain;
        }
        .elementor-166 .wpr-logo,
        .elementor-166 .wpr-logo-image {
          display: block;
          width: 140px !important;
          max-width: 140px !important;
          overflow: hidden;
        }
        .elementor-166 .wpr-nav-menu {
          display: flex;
          align-items: center;
          gap: 28px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .elementor-166 .wpr-menu-item {
          text-decoration: none;
        }
        .gift-wp-mobile-menu {
          display: none;
          position: relative;
        }
        .gift-wp-mobile-menu summary {
          display: grid;
          gap: 4px;
          width: 44px;
          height: 44px;
          place-content: center;
          cursor: pointer;
          list-style: none;
        }
        .gift-wp-mobile-menu summary::-webkit-details-marker {
          display: none;
        }
        .gift-wp-mobile-menu summary span {
          display: block;
          width: 24px;
          height: 2px;
          background: #0081ff;
        }
        .gift-wp-mobile-menu div {
          position: absolute;
          right: 0;
          top: 100%;
          display: grid;
          width: 220px;
          gap: 1px;
          padding: 10px;
          background: #fff;
          border: 1px solid #e8e8e8;
          box-shadow: 0 18px 40px rgba(0, 0, 0, .12);
        }
        .gift-wp-mobile-menu a {
          padding: 10px 12px;
          color: #333;
          text-decoration: none;
          font-family: Poppins, sans-serif;
          font-weight: 500;
        }
        .gift-wp-hero {
          position: relative;
          overflow: hidden;
        }
        .gift-wp-hero .elementor-background-overlay,
        .gift-wp-vision .elementor-background-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .gift-wp-hero .elementor-container {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
        }
        .gift-wp-hero .elementor-widget-wrap {
          max-width: 760px;
        }
        .gift-wp-hero .wpr-advanced-text {
          display: grid;
          gap: 4px;
        }
        .gift-wp-hero .wpr-advanced-text-preffix {
          display: block;
          line-height: 1.05 !important;
        }
        .gift-wp-hero .wpr-anim-text {
          position: relative;
          display: block;
          min-height: 1.35em;
          overflow: hidden;
          margin-top: 8px;
        }
        .gift-wp-hero .wpr-anim-text b {
          position: absolute;
          inset: 0 auto auto 0;
          display: block;
          width: 100%;
          max-width: 100%;
          opacity: 0;
          color: #5bd0ea;
          animation: giftHeroPhrase 12s infinite;
          white-space: normal;
        }
        .gift-wp-hero .wpr-anim-text b:nth-child(1) { animation-delay: 0s; color: #fff; }
        .gift-wp-hero .wpr-anim-text b:nth-child(2) { animation-delay: 3s; }
        .gift-wp-hero .wpr-anim-text b:nth-child(3) { animation-delay: 6s; }
        .gift-wp-hero .wpr-anim-text b:nth-child(4) { animation-delay: 9s; }
        @keyframes giftHeroPhrase {
          0%, 20% { opacity: 1; transform: translateY(0); }
          25%, 100% { opacity: 0; transform: translateY(-18px); }
        }
        .gift-wp-two-column {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 56px;
          align-items: center;
        }
        .gift-wp-two-column > .elementor-column,
        .gift-wp-two-column > .e-con,
        .gift-wp-two-column > .elementor-element {
          width: 100% !important;
          min-width: 0;
        }
        .gift-wp-two-column .elementor-widget-wrap {
          display: flex;
          width: 100%;
          min-height: 100%;
          flex-direction: column;
          justify-content: center;
        }
        .gift-wp-two-column .elementor-widget,
        .gift-wp-two-column .elementor-widget-container {
          width: 100%;
        }
        .gift-wp-section {
          padding: 100px 0;
        }
        .gift-wp-section img,
        .gift-wp-about img,
        .gift-wp-facilities img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }
        .gift-wp-about .elementor-widget-image img,
        .gift-wp-facilities .elementor-widget-image img,
        .elementor-1185 .elementor-widget-image img {
          min-height: 430px;
          max-height: 540px;
          object-fit: cover;
        }
        .gift-wp-about .elementor-element-5530ede6,
        .gift-wp-facilities .elementor-element-c360283 {
          width: 100%;
        }
        .gift-wp-vision,
        .gift-wp-contact-band,
        .gift-wp-client-strip {
          position: relative;
          overflow: hidden;
        }
        .gift-wp-vision > .elementor-container,
        .gift-wp-contact-band > .e-con-inner,
        .gift-wp-client-strip > .e-con-inner {
          position: relative;
          z-index: 1;
        }
        .gift-wp-card-list {
          display: grid;
          gap: 18px;
          margin-top: 28px;
        }
        .gift-wp-card {
          display: flex;
          gap: 16px;
          padding: 18px;
          border: 1px solid #e8e8e8;
          background: #fff;
          border-radius: 6px;
        }
        .gift-wp-card svg {
          width: 22px;
          min-width: 22px;
          fill: #2f9bb9;
        }
        .gift-wp-card h3 {
          margin: 0 0 6px;
          font: 600 18px Poppins, sans-serif;
          color: #222;
        }
        .gift-wp-card p {
          margin: 0;
          font: 500 14px/1.7 Raleway, sans-serif;
          color: #555;
        }
        .gift-wp-services {
          padding: 100px 0;
        }
        .gift-wp-services .elementor-widget-wrap {
          width: 100%;
        }
        .gift-wp-service-grid,
        .gift-wp-blog-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
          margin-top: 48px;
        }
        .wpr-promo-box {
          position: relative;
          min-height: 335px;
          overflow: hidden;
          background: #1c2544;
        }
        .wpr-promo-box-bg-image,
        .wpr-promo-box-bg-overlay {
          position: absolute;
          inset: 0;
        }
        .wpr-promo-box-bg-image {
          background-position: center;
          background-size: cover;
          transition: transform .4s;
        }
        .wpr-promo-box-bg-overlay {
          background: rgba(0, 0, 0, .42);
        }
        .wpr-promo-box:hover .wpr-promo-box-bg-image {
          transform: scale(1.05);
        }
        .gift-wp-lucide {
          width: 1em;
          height: 1em;
          stroke: currentColor;
        }
        .gift-wp-subhero {
          min-height: 351px;
          display: flex;
          align-items: center;
          background-position: center;
          background-size: cover;
          position: relative;
        }
        .gift-wp-subhero:before,
        .gift-wp-client-strip:before,
        .gift-wp-contact-band:before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(53, 70, 97, .48);
          pointer-events: none;
        }
        .gift-wp-subhero > .e-con-inner {
          position: relative;
          z-index: 1;
        }
        .gift-wp-policy {
          padding: 90px 0;
          background: #fff;
        }
        .gift-wp-policy-tabs {
          max-width: 1080px;
          margin: 0 auto;
        }
        .gift-wp-policy-tabs > input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }
        .gift-wp-policy-tab-nav {
          display: flex;
          justify-content: center;
          gap: 36px;
          margin-bottom: 54px;
          text-align: center;
          text-transform: uppercase;
          font: 600 14px Poppins, sans-serif;
          letter-spacing: .02em;
        }
        .gift-wp-policy-tab-nav label {
          position: relative;
          cursor: pointer;
          color: #555;
          padding-bottom: 14px;
        }
        .gift-wp-policy-tab-nav label:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 2px;
          background: #222;
          transform: scaleX(0);
          transition: transform .25s;
        }
        #policy-impartiality:checked ~ .gift-wp-policy-tab-nav label[for="policy-impartiality"],
        #policy-antisouap:checked ~ .gift-wp-policy-tab-nav label[for="policy-antisouap"] {
          color: #222;
        }
        #policy-impartiality:checked ~ .gift-wp-policy-tab-nav label[for="policy-impartiality"]:after,
        #policy-antisouap:checked ~ .gift-wp-policy-tab-nav label[for="policy-antisouap"]:after {
          transform: scaleX(1);
        }
        .gift-wp-policy-panel {
          display: none;
          padding: 32px;
          background: #fff;
        }
        #policy-impartiality:checked ~ .gift-wp-policy-impartiality,
        #policy-antisouap:checked ~ .gift-wp-policy-antisouap {
          display: block;
        }
        .gift-wp-policy span,
        .gift-wp-blog-meta,
        .gift-wp-category-row span {
          color: #2f9bb9;
          font: 600 14px Poppins, sans-serif;
          text-transform: uppercase;
        }
        .gift-wp-policy h2 {
          margin: 10px 0 18px;
          color: #222;
          font: 600 30px Poppins, sans-serif;
        }
        .gift-wp-policy p {
          color: #555;
          font: 500 14px/1.85 Raleway, sans-serif;
          text-align: justify;
        }
        .gift-wp-client-strip {
          padding: 100px 0;
          background: #1c2544;
        }
        .gift-wp-client-strip .elementor-heading-title {
          color: #b8c0dd !important;
        }
        .elementor-1185 .elementor-element.elementor-element-974875d {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 50px;
          align-items: center;
          margin-top: 40px;
        }
        .elementor-1185 .elementor-element.elementor-element-974875d img {
          max-height: 90px;
          max-width: 100%;
          object-fit: contain;
          margin: 0 auto;
        }
        .gift-wp-contact-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
          margin-top: 34px;
        }
        .gift-wp-contact-band {
          padding: 100px 0;
          background-color: #2a3150;
          background-position: center;
          background-size: cover;
        }
        .gift-wp-contact-list,
        .gift-wp-footer-contact {
          list-style: none;
          padding: 0;
          margin: 20px 0 0;
          display: grid;
          gap: 14px;
        }
        .gift-wp-contact-list li,
        .gift-wp-footer-contact li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          color: #ececec;
          font: 500 14px/1.7 Montserrat, sans-serif;
        }
        .gift-wp-form {
          display: grid;
          gap: 20px;
        }
        .gift-wp-form label {
          display: grid;
          gap: 6px;
          color: #fff;
          font: 400 14px Poppins, sans-serif;
        }
        .gift-wp-form .wpr-form-field {
          width: 100%;
          border: 1px solid #dbdbdb;
          border-radius: 4px;
          padding: 10px;
          font: 13px Poppins, sans-serif;
        }
        .gift-wp-form .wpr-button {
          width: 150px;
          background: #2f9bb9;
          color: #333;
          border: 0;
          border-radius: 4px;
          padding: 12px 18px;
          cursor: pointer;
        }
        .gift-wp-map iframe {
          display: block;
          width: 100%;
          height: 340px;
          border: 0;
        }
        .gift-wp-footer-grid {
          display: grid !important;
          grid-template-columns: 1.2fr 1fr 1fr;
          gap: 40px;
        }
        .elementor-222 .wpr-logo-image img {
          max-width: 420px;
          width: 100%;
          height: auto;
        }
        .elementor-222 a {
          text-decoration: none;
        }
        .gift-wp-blog-index,
        .gift-wp-blog-detail {
          padding: 100px 0;
        }
        .gift-wp-category-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-top: 24px;
        }
        .gift-wp-category-row span {
          border: 1px solid #dbe8ee;
          border-radius: 999px;
          padding: 8px 14px;
          background: #fff;
        }
        .gift-wp-blog-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .gift-wp-blog-card {
          overflow: hidden;
          border: 1px solid #e8e8e8;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 12px 34px rgba(0, 0, 0, .06);
        }
        .gift-wp-blog-card img {
          width: 100%;
          height: 225px;
          object-fit: cover;
        }
        .gift-wp-blog-card div {
          padding: 24px;
        }
        .gift-wp-blog-card h2,
        .gift-wp-blog-detail h1 {
          margin: 10px 0 14px;
          font: 600 24px/1.3 Poppins, sans-serif;
          color: #222;
        }
        .gift-wp-blog-card h2 a {
          color: inherit;
          text-decoration: none;
        }
        .gift-wp-blog-card p,
        .gift-wp-blog-detail article p {
          color: #555;
          font: 500 14px/1.8 Raleway, sans-serif;
        }
        .gift-wp-read-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #2f9bb9;
          text-decoration: none;
          font: 600 14px Poppins, sans-serif;
        }
        .gift-wp-blog-detail .e-con-inner {
          max-width: 860px;
        }
        .gift-wp-blog-detail h1 {
          font-size: 44px;
        }
        .gift-wp-blog-detail img {
          width: 100%;
          border-radius: 8px;
          margin: 28px 0;
        }
        @media (max-width: 1024px) {
          .elementor-166 .wpr-nav-menu-container {
            display: none;
          }
          .gift-wp-mobile-menu {
            display: block;
          }
          .gift-wp-two-column,
          .gift-wp-footer-grid {
            grid-template-columns: 1fr;
          }
          .gift-wp-service-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .gift-wp-blog-grid,
          .gift-wp-contact-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 767px) {
          .elementor-166 .elementor-element-bdb4fea > .e-con-inner {
            min-height: 76px;
          }
          .elementor-166 .wpr-logo,
          .elementor-166 .wpr-logo-image,
          .elementor-166 .wpr-logo-image img {
            width: 104px !important;
            max-width: 104px !important;
          }
          .gift-wp-service-grid,
          .elementor-1185 .elementor-element.elementor-element-974875d {
            grid-template-columns: 1fr;
          }
          .gift-wp-hero .wpr-advanced-text-preffix,
          .gift-wp-hero .wpr-anim-text b {
            font-size: 29px !important;
            line-height: 1.14 !important;
            white-space: normal !important;
            overflow-wrap: anywhere;
            word-break: break-word !important;
            max-width: calc(100vw - 40px) !important;
          }
          .gift-wp-hero .elementor-heading-title {
            font-size: 31px !important;
            line-height: 1.18 !important;
            white-space: normal !important;
            overflow-wrap: anywhere;
          }
          .elementor-1184 .elementor-element.elementor-element-3a538e800,
          .gift-wp-hero {
            margin-top: 0 !important;
            padding-top: 20px !important;
          }
          .gift-wp-hero .elementor-container,
          .gift-wp-hero .elementor-widget-wrap {
            width: calc(100vw - 40px) !important;
            max-width: calc(100vw - 40px) !important;
            min-width: 0;
          }
          .gift-wp-hero .elementor-element {
            width: 100% !important;
            max-width: calc(100vw - 40px) !important;
            min-width: 0 !important;
          }
          .gift-wp-hero .elementor-column,
          .gift-wp-hero .elementor-widget,
          .gift-wp-hero .elementor-widget-container,
          .gift-wp-hero p {
            width: 100% !important;
            max-width: calc(100vw - 70px) !important;
            min-width: 0;
            white-space: normal !important;
            overflow-wrap: anywhere;
          }
          .gift-wp-hero .elementor-element-5412a0f7,
          .gift-wp-hero .elementor-element-5412a0f7 .elementor-widget-container {
            max-width: calc(100vw - 70px) !important;
          }
          .gift-wp-hero .wpr-anim-text b {
            font-size: 27px !important;
          }
          .gift-wp-hero .wpr-anim-text {
            min-height: 2.4em;
          }
          .gift-wp-policy-tab-nav {
            display: grid;
            gap: 18px;
            margin-bottom: 28px;
          }
          .gift-wp-section,
          .gift-wp-services,
          .gift-wp-contact-band,
          .gift-wp-blog-index,
          .gift-wp-blog-detail {
            padding: 64px 0;
          }
          .gift-wp-blog-detail h1 {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  );
}
