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
        .elementor-1185 .elementor-element.elementor-element-8030a81:not(.elementor-motion-effects-element-type-background) {
          background-image: url("/landing/subpage-cover-profile.jpg") !important;
        }
        .elementor-1156 .elementor-element.elementor-element-8030a81,
        .elementor-1156 .elementor-element.elementor-element-8030a81:not(.elementor-motion-effects-element-type-background) {
          background-image: url("/landing/subpage-cover-blog.jpg") !important;
        }
        .elementor-1189 .elementor-element.elementor-element-4e53d5c,
        .elementor-1189 .elementor-element.elementor-element-4e53d5c:not(.elementor-motion-effects-element-type-background) {
          background-image: url("/landing/subpage-cover.jpg") !important;
        }
        .elementor-1186 .elementor-element.elementor-element-0580e27,
        .elementor-1186 .elementor-element.elementor-element-0580e27:not(.elementor-motion-effects-element-type-background) {
          background-image: url("/landing/supage-cover-service.jpg") !important;
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
        .elementor-1160 .elementor-element.elementor-element-4e53d5c,
        .elementor-1160 .elementor-element.elementor-element-4e53d5c:not(.elementor-motion-effects-element-type-background) {
          background-image: url("/landing/subpage-cover.jpg") !important;
        }
        .gift-appeal-section {
          background: #fff;
        }
        .gift-appeal-section .e-con-inner {
          width: min(1100px, calc(100% - 40px));
          margin: 0 auto;
        }
        .gift-appeal-card {
          border: 1px solid rgba(15, 23, 42, .08);
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 20px 60px rgba(10, 37, 64, .08);
          padding: 32px;
        }
        @media (max-width: 640px) {
          .gift-appeal-card {
            padding: 20px;
          }
        }
        .gift-appeal-header {
          display: grid;
          justify-items: center;
          gap: 12px;
          margin-bottom: 48px;
          text-align: center;
        }
        .gift-appeal-title {
          margin: 0;
          color: #0a2540;
          font: 700 34px/1.2 Poppins, sans-serif;
        }
        .gift-appeal-flow-wrap {
          border-radius: 28px;
          background: linear-gradient(165deg, #0a2540, #0f3a5c);
          padding: 32px;
        }
        .gift-appeal-flow {
          display: grid;
          gap: 4px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .gift-appeal-flow-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          padding: 20px 22px;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 10px 28px rgba(0, 0, 0, .18);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .gift-appeal-flow-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, .26);
        }
        .gift-appeal-flow-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4px 0;
          color: rgba(255, 255, 255, .85);
        }
        .gift-appeal-flow-arrow-line {
          width: 2px;
          height: 20px;
          background: rgba(255, 255, 255, .4);
        }
        .gift-appeal-flow-arrow svg {
          width: 28px;
          height: 28px;
          margin-top: -2px;
        }
        .gift-appeal-flow-icon-inner {
          flex: 0 0 auto;
          display: inline-flex;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(47, 155, 185, .12);
          color: #2f9bb9;
        }
        .gift-appeal-flow-icon-inner svg {
          width: 18px;
          height: 18px;
          stroke-width: 2;
        }
        .gift-appeal-flow-content {
          display: grid;
          justify-items: center;
          text-align: center;
          gap: 4px;
        }
        .gift-appeal-flow-title {
          margin: 0;
          color: #0a2540;
          font: 700 22px/1.3 Poppins, sans-serif;
        }
        .gift-appeal-cta-card {
          width: fit-content;
          max-width: 100%;
          margin: 24px auto 0;
          padding: 18px 28px;
        }
        @media (max-width: 640px) {
          .gift-appeal-cta-card {
            padding: 14px 18px;
          }
        }
        .gift-appeal-cta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
        .gift-appeal-cta-btn {
          margin-block-end: 0 !important;
        }
        .gift-appeal-cta-btn .wpr-button-wrap {
          display: inline-flex;
          width: auto;
        }
        .gift-appeal-cta-btn .wpr-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: auto;
          padding: 14px 30px;
          border-radius: 999px;
          background: linear-gradient(135deg, #2f9bb9, #0f6d91);
          box-shadow: 0 10px 24px rgba(47, 155, 185, .32);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .gift-appeal-cta-btn .wpr-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(47, 155, 185, .4);
        }
        .gift-appeal-cta-btn .wpr-button-content {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .gift-appeal-cta-btn .wpr-button-text {
          width: auto;
          color: #fff;
          font: 600 15px Poppins, sans-serif;
        }
        .gift-appeal-cta-btn .wpr-button-icon svg {
          width: 16px;
          height: 16px;
          color: #fff;
        }
        .gift-appeal-cta-social {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .gift-appeal-cta-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          color: #fff;
          box-shadow: 0 10px 22px rgba(10, 37, 64, .18);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .gift-appeal-cta-icon:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 28px rgba(10, 37, 64, .26);
        }
        .gift-appeal-cta-icon svg {
          width: 22px;
          height: 22px;
        }
        .gift-appeal-cta-icon-wa {
          background: #25d366;
        }
        .gift-appeal-cta-icon-mail {
          background: linear-gradient(135deg, #2f9bb9, #0f6d91);
        }
        .gift-floating-nav a,
        .gift-floating-nav button {
          -webkit-tap-highlight-color: transparent;
        }
        .gift-floating-nav nav button,
        .gift-floating-nav nav a {
          border: none !important;
        }
        .gift-floating-nav nav button:focus,
        .gift-floating-nav nav button:focus-visible,
        .gift-floating-nav nav a:focus,
        .gift-floating-nav nav a:focus-visible {
          outline: none;
          box-shadow: none;
        }
        .gift-floating-nav nav a:hover,
        .gift-floating-nav nav button:hover,
        .gift-floating-nav nav a:focus-visible,
        .gift-floating-nav nav button:focus-visible {
          background-color: rgba(40, 157, 185, 0.1) !important;
          color: #289db9 !important;
        }
        .gift-wp-mobile-menu {
          position: relative;
        }
        .gift-wp-mobile-menu summary {
          display: grid;
          gap: 4px;
          width: 48px;
          height: 48px;
          border-radius: 9999px;
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
          height: 2.5px;
          background: #1e293b;
          border-radius: 1px;
        }
        .gift-wp-mobile-menu div {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          display: grid;
          width: 220px;
          gap: 2px;
          padding: 10px;
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 16px;
          box-shadow: 0 18px 40px rgba(15, 23, 42, .14);
        }
        .gift-wp-mobile-menu a {
          padding: 12px 14px;
          border-radius: 10px;
          color: #334155;
          text-decoration: none;
          font-family: Poppins, sans-serif;
          font-weight: 500;
          transition: background .15s, color .15s;
        }
        .gift-wp-mobile-menu a:hover {
          background: rgba(15, 23, 42, 0.06);
          color: #0f172a;
        }
        .gift-mobile-parent {
          display: block; padding: 12px 14px; color: #94a3b8;
          font-family: Poppins, sans-serif; font-weight: 600;
          font-size: 12px; text-transform: uppercase; letter-spacing: .05em;
        }
        .gift-mobile-child { padding-left: 24px !important; font-size: 14px !important; }
        .gift-lang-flag-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          padding: 9px;
          border: none;
          border-radius: 9999px;
          background: transparent;
          cursor: pointer;
          transition: background .2s;
        }
        .gift-lang-flag-btn:hover {
          background: rgba(15, 23, 42, .06);
        }
        .gift-lang-flag-btn:focus,
        .gift-lang-flag-btn:focus-visible {
          outline: none;
          background: rgba(15, 23, 42, .06);
        }
        .gift-lang-flag-icon {
          display: block;
          width: 30px;
          height: 19px;
          border-radius: 2px;
        }
        .gift-wp-hero {
          position: relative;
          overflow: hidden;
        }
        .elementor-1184 .gift-wp-hero {
          margin-top: -89px;
        }
        .elementor-1184 .gift-wp-hero .elementor-container {
          padding-top: 89px;
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
          max-width: 1120px;
        }
        .gift-wp-hero .elementor-element-dc58416 .elementor-heading-title {
          white-space: nowrap;
        }
        .gift-wp-hero .wpr-advanced-text {
          display: grid;
          gap: 4px;
        }
        .gift-wp-hero .wpr-advanced-text-preffix {
          display: inline-block;
          color: #fff;
          font: 700 65px/1.05 Poppins, sans-serif;
          letter-spacing: .2px;
          line-height: 1.05 !important;
          white-space: nowrap;
        }
        .gift-wp-hero .wpr-anim-text {
          position: relative;
          display: block;
          min-height: 1.35em;
          overflow: hidden;
          margin-top: 8px;
          width: min(1120px, calc(100vw - 80px));
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
          line-height: 1.22 !important;
          white-space: nowrap;
        }
        .gift-wp-hero .wpr-anim-text b:nth-child(1) { animation-delay: 0s; color: #fff; }
        .gift-wp-hero .wpr-anim-text b:nth-child(2) { animation-delay: 3s; }
        .gift-wp-hero .wpr-anim-text b:nth-child(3) { animation-delay: 6s; }
        .gift-wp-hero .wpr-anim-text b:nth-child(4) { animation-delay: 9s; }
        @keyframes giftHeroPhrase {
          0%, 20% { opacity: 1; transform: translateY(0); }
          25%, 100% { opacity: 0; transform: translateY(-18px); }
        }
        .elementor-1184 .elementor-widget-wpr-button {
          line-height: 1;
        }
        .elementor-1184 .elementor-widget-wpr-button .wpr-button-wrap {
          display: inline-flex;
          width: auto !important;
          max-width: none !important;
        }
        .elementor-1184 .elementor-widget-wpr-button .wpr-button {
          display: inline-flex;
          width: auto !important;
          min-height: 34px;
          align-items: center;
          justify-content: center;
          padding: 7px 13px !important;
          border-radius: 4px;
          white-space: nowrap;
        }
        .elementor-1184 .elementor-widget-wpr-button .wpr-button-content {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          line-height: 1;
        }
        .elementor-1184 .elementor-widget-wpr-button .wpr-button-text {
          display: inline-flex;
          align-items: center;
          font-size: 13px !important;
          line-height: 1 !important;
        }
        .elementor-1184 .elementor-widget-wpr-button .wpr-button-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 0 !important;
        }
        .elementor-1184 .elementor-widget-wpr-button .wpr-button-icon svg {
          width: 15px !important;
          height: 15px !important;
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
          margin-block-start: 0 !important;
          margin-block-end: 0 !important;
        }
        .gift-wp-service-points {
          display: grid;
          gap: 12px;
          margin: 20px 0 0;
          padding: 0;
          list-style: none;
        }
        .gift-wp-service-points li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #555;
          font: 500 14px/1.75 Raleway, sans-serif;
        }
        .gift-wp-service-points li svg {
          flex: 0 0 18px;
          width: 18px;
          height: 18px;
          margin-top: 2px;
          fill: #2f9bb9;
        }
        .gift-wp-service-cta {
          margin-top: 28px;
        }
        .gift-wp-service-cta .wpr-button-wrap {
          display: inline-flex;
          width: auto;
        }
        .gift-wp-service-cta .wpr-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: auto;
          padding: 14px 30px;
          border-radius: 999px;
          background: linear-gradient(135deg, #2f9bb9, #0f6d91);
          box-shadow: 0 10px 24px rgba(47, 155, 185, .32);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .gift-wp-service-cta .wpr-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(47, 155, 185, .4);
        }
        .gift-wp-service-cta .wpr-button-content {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .gift-wp-service-cta .wpr-button-text {
          width: auto;
          color: #fff;
          font: 600 15px Poppins, sans-serif;
        }
        .gift-wp-service-cta .wpr-button-icon svg {
          width: 16px;
          height: 16px;
          color: #fff;
        }
        .gift-scroll-fade {
          width: 100%;
          min-width: 0;
        }
        .gift-wp-section img,
        .gift-wp-about img,
        .gift-wp-facilities img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }
        .elementor-1186 .elementor-element-3edfafc img {
          border-radius: 20px;
          border: 1px solid rgba(48, 164, 197, 0.25);
          box-shadow: 0 20px 50px rgba(48, 164, 197, 0.18);
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
        .gift-wp-vision .elementor-element-3a05b207 p {
          font-size: 16px;
        }
        .gift-wp-vision .elementor-element-46533381 .wpr-feature-list-title {
          font-size: 21px;
        }
        .gift-wp-vision .elementor-element-46533381 .wpr-feature-list-description {
          font-size: 16px;
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
        .wpr-promo-box-image {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .wpr-promo-box-bg-image {
          background-position: center;
          background-size: cover;
          transition: transform .4s;
        }
        .gift-wp-services .wpr-promo-box-bg-overlay {
          background: linear-gradient(180deg, rgba(10, 15, 28, .2) 0%, rgba(10, 15, 28, .76) 48%, rgba(10, 15, 28, .94) 100%) !important;
          opacity: 1 !important;
        }
        .wpr-promo-box-content {
          position: relative;
          z-index: 1;
          display: flex;
          min-height: 335px;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 30px;
          box-sizing: border-box;
          color: #fff;
          text-shadow: 0 2px 14px rgba(0, 0, 0, .5);
        }
        .wpr-promo-box-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          color: #fff;
          font-size: 28px;
          text-shadow: 0 2px 12px rgba(0, 0, 0, .45);
        }
        .wpr-promo-box-title {
          margin: 0;
          color: #fff !important;
          font: 600 23px/1.25 Poppins, sans-serif;
        }
        .wpr-promo-box-description {
          margin: 11px 0 16px;
          color: #f8fbff !important;
          font: 500 13px/1.7 "Open Sans", sans-serif;
        }
        .wpr-promo-box-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 39px;
          padding: 8px 17px;
          border: 2px solid rgba(255, 255, 255, .9);
          border-radius: 4px;
          color: #fff !important;
          text-decoration: none;
          font: 700 13px Poppins, sans-serif;
          transition: background .2s, border-color .2s;
        }
        .wpr-promo-box-btn:hover {
          background: #2f9bb9;
          border-color: #2f9bb9;
        }
        .wpr-promo-box-btn-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .wpr-promo-box:hover .wpr-promo-box-bg-image {
          transform: scale(1.05);
        }
        .gift-wp-lucide {
          width: 1em;
          height: 1em;
          stroke: currentColor;
        }
        .gift-wp-facilities {
          margin: 0 !important;
          padding: 100px 20px !important;
          background: #fff;
        }
        .gift-wp-facilities .gift-wp-two-column {
          align-items: center;
          gap: 54px;
        }
        .gift-wp-facilities .elementor-widget-wrap {
          justify-content: center;
        }
        .gift-wp-facilities .elementor-element-5a5959f2 {
          margin-bottom: 16px;
        }
        .gift-wp-facilities .elementor-element-5a5959f2 .elementor-heading-title {
          max-width: none;
          color: #333;
          font: 700 28px/1.25 Poppins, sans-serif;
        }
        .gift-wp-facilities .elementor-element-563e6ef p {
          margin: 0;
          color: #555;
          font: 500 17px/1.8 Raleway, sans-serif;
        }
        .gift-wp-facilities .elementor-element-563e6ef strong {
          color: #333;
          font-weight: 700;
        }
        .gift-wp-facility-illustration img {
          min-height: 0 !important;
          max-height: none !important;
          object-fit: contain !important;
          box-shadow: none;
        }
        .gift-wp-facilities .wpr-feature-list {
          display: grid;
          gap: 24px;
          margin: 30px 0 0;
          padding: 0;
          list-style: none;
        }
        .gift-wp-facilities .wpr-feature-list-item {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          margin: 0;
        }
        .gift-wp-facilities .wpr-feature-list-icon-wrap {
          position: relative;
          flex: 0 0 50px;
          width: 50px;
          min-height: 50px;
        }
        .gift-wp-facilities .wpr-feature-list-line {
          position: absolute;
          top: 50px;
          bottom: -24px;
          left: 24px;
          width: 1px;
          background: #dbe7ef;
        }
        .gift-wp-facilities .wpr-feature-list-item:last-child .wpr-feature-list-line {
          display: none;
        }
        .gift-wp-facilities .wpr-feature-list-icon-inner-wrap {
          position: relative;
          z-index: 1;
          display: inline-flex;
          width: 50px;
          height: 50px;
          align-items: center;
          justify-content: center;
          border: 1px solid #cce8f0;
          border-radius: 4px;
          background: #fff;
          color: #2f9bb9;
        }
        .gift-wp-facilities .wpr-feature-list-icon-inner-wrap svg {
          width: 23px;
          height: 23px;
          stroke-width: 1.9;
        }
        .gift-wp-facilities .wpr-feature-list-title {
          margin: 0 0 7px;
          color: #333;
          font: 600 19px/1.35 Poppins, sans-serif;
        }
        .gift-wp-facilities .wpr-feature-list-description {
          margin: 0;
          color: #777;
          font: 500 16px/1.75 Raleway, sans-serif;
        }
        .elementor-1185 .gift-wp-profile-intro {
          padding: 100px 0;
          background: #fff;
        }
        .elementor-1185 .gift-wp-profile-intro .elementor-element-7d19e0 {
          margin-bottom: 18px;
        }
        .elementor-1185 .gift-wp-profile-intro .elementor-element-7d19e0 .elementor-heading-title {
          color: #282828;
          font: 700 20px/1.25 Poppins, sans-serif;
          text-transform: uppercase;
        }
        .elementor-1185 .elementor-element-1b719f4 .elementor-heading-title {
          color: #333;
          font: 500 45px/1.15 Poppins, sans-serif;
        }
        .elementor-1185 .elementor-element-84e7306 p {
          margin: 18px 0 0;
          color: #555;
          font: 500 14px/1.85 Raleway, sans-serif;
        }
        .elementor-1185 .elementor-element-84e7306 strong {
          color: #333;
          font-weight: 700;
        }
        .elementor-1185 .elementor-widget-image img {
          border-radius: 10px;
          box-shadow: none;
        }
        .elementor-1185 .gift-wp-profile-vision {
          padding: 100px 0;
          background: #f1f1f1;
        }
        .elementor-1185 .gift-wp-profile-vision .elementor-element-3b33a34 .elementor-heading-title {
          color: #000;
          font: 500 50px/1.2 Poppins, sans-serif;
        }
        .elementor-1185 .gift-wp-profile-vision .elementor-element-76264e8 p {
          margin: 12px 0 0;
          color: #777;
          font: 500 20px/1.75 Montserrat, sans-serif;
        }
        .elementor-1185 .gift-wp-profile-mission {
          position: relative;
          padding: 100px 0;
          overflow: hidden;
          background-image: url("/landing/blueprint.jpg");
          background-position: center;
          background-size: cover;
        }
        .elementor-1185 .gift-wp-profile-mission:before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, .72);
          pointer-events: none;
        }
        .elementor-1185 .gift-wp-profile-mission > .e-con-inner {
          position: relative;
          z-index: 1;
        }
        .elementor-1185 .elementor-element-35525b7 .elementor-heading-title {
          color: #000;
          font: 500 45px/1.2 Poppins, sans-serif;
        }
        .elementor-1185 .elementor-element-f9309dd .wpr-feature-list {
          display: grid;
          gap: 35px;
          margin: 28px 0 0;
          padding: 0;
          list-style: none;
        }
        .elementor-1185 .elementor-element-f9309dd .wpr-feature-list-item {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .elementor-1185 .elementor-element-f9309dd .wpr-feature-list-icon-wrap {
          position: relative;
          flex: 0 0 30px;
          width: 30px;
          height: 30px;
        }
        .elementor-1185 .elementor-element-f9309dd .wpr-feature-list-line {
          position: absolute;
          top: 30px;
          bottom: -35px;
          left: 14px;
          width: 2px;
          background: #404040;
        }
        .elementor-1185 .elementor-element-f9309dd .wpr-feature-list-item:last-child .wpr-feature-list-line {
          display: none;
        }
        .elementor-1185 .elementor-element-f9309dd .wpr-feature-list-icon-inner-wrap {
          position: relative;
          z-index: 1;
          display: inline-flex;
          width: 30px;
          height: 30px;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          background: #2f9bb9;
          color: #fff;
        }
        .elementor-1185 .elementor-element-f9309dd .wpr-feature-list-icon-inner-wrap svg {
          width: 14px;
          height: 14px;
          fill: #fff;
        }
        .elementor-1185 .elementor-element-f9309dd .wpr-feature-list-title {
          margin: 0;
          color: #000;
          font: 600 21px/1.35 Poppins, sans-serif;
        }
        .elementor-1185 .elementor-element-f9309dd .wpr-feature-list-description {
          margin: 6px 0 0;
          color: #555;
          font: 500 16px/1.65 Raleway, sans-serif;
        }
        .elementor-1186 .gift-wp-services {
          padding: 0;
          margin: 92px 0 112px;
        }
        .elementor-1186 .gift-wp-services > .elementor-container {
          width: min(1020px, calc(100% - 40px));
        }
        .elementor-1186 .gift-wp-services .elementor-widget-wrap {
          display: block;
        }
        .elementor-1186 .elementor-element-5c74249 {
          margin-bottom: 28px;
          text-align: center;
        }
        .elementor-1186 .elementor-element-5c74249 .elementor-heading-title {
          color: #222;
          font: 600 42px/1.2 Poppins, sans-serif;
        }
        .elementor-1186 .gift-wp-service-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px 27px;
          margin-top: 0;
        }
        .elementor-1186 .gift-wp-service-card-anim {
          animation: giftServiceSlideInUp .85s ease both;
        }
        .elementor-1186 .elementor-element-2c75ba7,
        .elementor-1186 .elementor-element-ef76db8 {
          animation-delay: .1s;
        }
        @keyframes giftServiceSlideInUp {
          from { opacity: 0; transform: translate3d(0, 48px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .elementor-1186 .wpr-promo-box {
          isolation: isolate;
          aspect-ratio: 497 / 314;
          min-height: 0;
          border-radius: 0;
          overflow: hidden;
          background: #161c3b;
        }
        .elementor-1186 .wpr-promo-box-image {
          z-index: 0;
        }
        .elementor-1186 .wpr-promo-box-bg-image {
          z-index: 0;
        }
        .elementor-1186 .elementor-element-2c75ba7 .wpr-promo-box-bg-image {
          background-position: center 46%;
        }
        .elementor-1186 .wpr-promo-box-bg-overlay {
          z-index: 1;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .02) 38%, rgba(0, 0, 0, .38) 74%, rgba(0, 0, 0, .68) 100%) !important;
          opacity: 1 !important;
          transition: background-color .4s ease;
        }
        .elementor-1186 .wpr-border-anim-oscar:before,
        .elementor-1186 .wpr-border-anim-oscar:after {
          content: "";
          position: absolute;
          inset: 15px;
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transform: scale(1.12);
          transition: opacity .4s ease, transform .4s ease;
        }
        .elementor-1186 .wpr-border-anim-oscar:before {
          border-top: 1px solid rgba(126, 126, 126, .93);
          border-bottom: 1px solid rgba(126, 126, 126, .93);
        }
        .elementor-1186 .wpr-border-anim-oscar:after {
          border-right: 1px solid rgba(126, 126, 126, .93);
          border-left: 1px solid rgba(126, 126, 126, .93);
        }
        .elementor-1186 .wpr-promo-box:hover .wpr-promo-box-bg-overlay {
          background-color: rgba(24, 24, 24, .10) !important;
        }
        .elementor-1186 .wpr-promo-box:hover .wpr-border-anim-oscar:before,
        .elementor-1186 .wpr-promo-box:hover .wpr-border-anim-oscar:after {
          opacity: 1;
          transform: scale(1);
        }
        .elementor-1186 .wpr-promo-box-content {
          position: absolute;
          inset: 0;
          z-index: 4;
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          height: 100% !important;
          min-height: 0 !important;
          padding: 0 28px 38px !important;
          justify-content: flex-end;
          text-shadow: 0 2px 18px rgba(0, 0, 0, .72);
        }
        .elementor-1186 .wpr-promo-box-title,
        .elementor-1186 .wpr-promo-box-title span {
          display: block;
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          color: #fff !important;
          font: 500 24px/1.15 Poppins, sans-serif;
        }
        .elementor-1186 .wpr-promo-box-description {
          display: block;
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          margin: 12px 0 0;
          color: #fff !important;
          font: 600 13px/1.45 "Open Sans", sans-serif;
        }
        .elementor-1186 .wpr-promo-box-description p {
          margin: 0;
          color: inherit !important;
        }
        .elementor-1186 .wpr-promo-box-btn,
        .elementor-1186 .wpr-promo-box-btn span,
        .elementor-1186 .wpr-promo-box-btn svg {
          border-radius: 2px;
          color: #fff !important;
          font-weight: 600;
        }
        .elementor-1186 .wpr-promo-box-btn {
          opacity: 1 !important;
          visibility: visible !important;
          transform: none !important;
          min-height: 44px;
          margin-top: 30px !important;
          padding: 11px 22px !important;
          background: rgba(0, 0, 0, .10);
          gap: 10px;
          line-height: 1 !important;
        }
        .elementor-1186 .wpr-promo-box-btn-text {
          line-height: 1 !important;
        }
        .gift-wp-quote {
          position: relative;
          min-height: 55vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 100px 0 0;
          overflow: hidden;
          background: #161c3b;
        }
        .gift-wp-quote:before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(0, 46, 91, .61), rgba(0, 46, 91, .61)),
            url("/landing/blog-konstruksi.png") center / cover no-repeat;
          opacity: .95;
          pointer-events: none;
        }
        .gift-wp-quote > .e-con-inner {
          position: relative;
          z-index: 1;
          width: min(1100px, calc(100% - 40px));
          margin: 0 auto;
        }
        .gift-wp-quote .elementor-element-0091782 {
          text-align: center;
          animation: giftQuoteZoomIn .85s ease both;
        }
        .gift-wp-quote .elementor-heading-title {
          color: #fff !important;
          font: italic 500 53px/1.22 Poppins, sans-serif;
        }
        @keyframes giftQuoteZoomIn {
          from { opacity: 0; transform: scale(.88); }
          to { opacity: 1; transform: scale(1); }
        }
        .gift-wp-home-services {
          padding: 34px 0 92px;
          background: #fff;
        }
        .gift-wp-home-services .e-con-inner {
          width: min(1200px, calc(100% - 40px));
          margin: 0 auto;
        }
        .gift-wp-home-services .elementor-element-36ab58f {
          margin-bottom: 24px;
          text-align: center;
        }
        .gift-wp-home-services .elementor-element-36ab58f .elementor-heading-title {
          color: #333;
          font: 600 32px/1.25 Poppins, sans-serif;
        }
        .gift-wp-home-service-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }
        .gift-wp-home-service-card {
          display: flex;
          flex-direction: row;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 6px 28px rgba(10, 37, 64, .07);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .gift-wp-home-service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(10, 37, 64, .13);
        }
        .gift-wp-home-service-card-media {
          flex: 0 0 42%;
          overflow: hidden;
        }
        .gift-wp-home-service-card-media img {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 220px;
          object-fit: cover;
          transition: transform .4s ease;
        }
        .gift-wp-home-service-card:hover .gift-wp-home-service-card-media img {
          transform: scale(1.06);
        }
        .gift-wp-home-service-card-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          padding: 28px 32px;
        }
        .gift-wp-home-service-card-body h3 {
          margin: 0;
          color: #333;
          font: 600 22px/1.3 Poppins, sans-serif;
        }
        .gift-wp-home-service-card-body p {
          margin: 0;
          color: #607184;
          font: 500 14px/1.75 Raleway, sans-serif;
        }
        .gift-wp-subhero {
          margin-top: -89px;
          min-height: calc(351px + 89px);
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
          padding-top: 89px;
        }
        .gift-wp-subhero .elementor-heading-title {
          color: #fff !important;
        }
        .gift-wp-policy {
          padding: 100px 0;
          background:
            linear-gradient(135deg, rgba(0, 112, 243, .05), transparent 42%),
            linear-gradient(180deg, #fbfdff 0%, #f3f8fc 100%);
        }
        .gift-wp-policy-tabs {
          position: relative;
          max-width: 1120px;
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .82);
          border-radius: 8px;
          background: rgba(255, 255, 255, .68);
          box-shadow: 0 22px 70px rgba(10, 37, 64, .10);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .gift-wp-policy-tabs:before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(0, 112, 243, .08), transparent 46%),
            linear-gradient(225deg, rgba(0, 223, 216, .12), transparent 38%);
          pointer-events: none;
        }
        .gift-wp-policy-tabs > input {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }
        .gift-wp-policy-tab-nav {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 12px;
          padding: 12px;
          margin: 0;
          text-align: center;
          text-transform: uppercase;
          background: rgba(255, 255, 255, .58);
          border-bottom: 1px solid rgba(255, 255, 255, .74);
          font: 800 13px/1.25 Poppins, sans-serif;
        }
        .gift-wp-policy-tab-nav label {
          display: inline-flex;
          flex: 1 1 0;
          min-height: 56px;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 18px;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          color: #64748b;
          transition: background .25s ease, color .25s ease, box-shadow .25s ease;
        }
        .gift-wp-policy-tab-nav label:hover {
          background: rgba(0, 112, 243, .06);
          color: #0a2540;
        }
        .gift-wp-policy-tab-nav svg {
          flex: 0 0 auto;
          width: 21px;
          height: 21px;
        }
        #policy-impartiality:checked ~ .gift-wp-policy-tab-nav label[for="policy-impartiality"],
        #policy-antisouap:checked ~ .gift-wp-policy-tab-nav label[for="policy-antisouap"] {
          color: #fff;
          background: linear-gradient(135deg, #0a2540, #0070f3);
          box-shadow: 0 16px 34px -18px rgba(0, 88, 188, .75);
        }
        .gift-wp-policy-panel {
          display: none;
          position: relative;
          z-index: 1;
          padding: 48px;
        }
        #policy-impartiality:checked ~ .gift-wp-policy-impartiality,
        #policy-antisouap:checked ~ .gift-wp-policy-antisouap {
          display: block;
        }
        .gift-wp-policy-content {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          align-items: center;
          max-width: 920px;
          margin: 0 auto;
        }
        .gift-wp-policy-copy-column {
          min-width: 0;
        }
        .gift-wp-policy-kicker,
        .gift-wp-blog-meta,
        .gift-wp-category-row span {
          color: #2f9bb9;
          font: 800 13px/1.2 Poppins, sans-serif;
          text-transform: uppercase;
        }
        .gift-wp-policy h2 {
          margin: 12px 0 22px;
          color: #0a2540;
          font: 700 34px/1.2 Poppins, sans-serif;
        }
        .gift-wp-policy p {
          margin: 0 0 18px;
          color: #1e293b;
          font: 500 15px/1.85 Raleway, sans-serif;
          text-align: justify;
        }
        .gift-wp-policy-signature {
          display: grid;
          gap: 6px;
          margin-top: 24px;
          padding-left: 18px;
          border-left: 4px solid #00dfd8;
          color: #0a2540;
          font-family: Poppins, sans-serif;
        }
        .gift-wp-policy-signature strong {
          font-size: 13px;
          text-transform: uppercase;
        }
        .gift-wp-policy-signature span {
          font-size: 18px;
          font-weight: 700;
        }
        .gift-wp-policy-contact-list {
          display: grid;
          gap: 0;
          margin: 26px 0 22px;
          padding: 0;
          list-style: none;
        }
        .gift-wp-policy-contact-list li {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 14px;
          padding: 12px 0;
          border-top: 1px solid rgba(113, 119, 134, .18);
          color: #1e293b;
          font: 500 14px/1.65 Raleway, sans-serif;
        }
        .gift-wp-policy-contact-list strong {
          color: #0a2540;
          font: 800 12px/1.5 Poppins, sans-serif;
          text-transform: uppercase;
        }
        .gift-wp-client-strip {
          padding: 100px 0;
          background: #1e2a45 url("/landing/subpage-cover.jpg") center / cover no-repeat;
        }
        .gift-wp-client-strip:before {
          background: rgba(30, 42, 69, .67);
        }
        .gift-wp-client-strip .elementor-heading-title {
          color: #b8c0dd !important;
          font: 500 23px/1.25 Poppins, sans-serif;
          text-transform: uppercase;
        }
        .gift-wp-client-strip .elementor-element-b891f8c {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          text-align: center;
        }
        .gift-wp-client-strip .elementor-element-b891f8c:before,
        .gift-wp-client-strip .elementor-element-b891f8c:after {
          content: "";
          display: block;
          width: min(320px, 26vw);
          height: 1px;
          background: #626c8d;
        }
        .gift-wp-client-marquee {
          margin-top: 40px;
          overflow: hidden;
        }
        .gift-wp-client-track {
          display: flex;
          align-items: center;
          gap: 64px;
          width: max-content;
          animation: gift-client-marquee 26s linear infinite;
        }
        .gift-wp-client-marquee:hover .gift-wp-client-track {
          animation-play-state: paused;
        }
        .gift-wp-client-track img {
          max-height: 90px;
          width: auto;
          flex-shrink: 0;
          object-fit: contain;
        }
        @keyframes gift-client-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .gift-wp-contact-grid {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 30px;
          margin-top: 34px;
        }
        .elementor-1189 .elementor-element-91d42b5 {
          position: relative;
          padding: 104px 0 112px;
          overflow: hidden;
          background:
            linear-gradient(180deg, #f8fbfd 0%, #fff 54%),
            radial-gradient(circle at 12% 20%, rgba(47, 155, 185, .11), transparent 34%);
          text-align: center;
        }
        .elementor-1189 .elementor-element-91d42b5:before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(16, 24, 40, .05) 1px, transparent 1px),
            linear-gradient(180deg, rgba(16, 24, 40, .045) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, .45), transparent 70%);
          pointer-events: none;
        }
        .elementor-1189 .elementor-element-91d42b5 > .e-con-inner {
          position: relative;
          z-index: 1;
        }
        .gift-wp-contact-intro {
          max-width: 760px;
          margin: 0 auto;
        }
        .gift-wp-contact-kicker,
        .gift-wp-contact-band-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 28px;
          padding: 5px 12px;
          border: 1px solid rgba(47, 155, 185, .24);
          border-radius: 999px;
          background: rgba(47, 155, 185, .08);
          color: #2f9bb9;
          font: 700 12px/1 Poppins, sans-serif;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        .elementor-1189 .elementor-element-d5fce67 .elementor-heading-title {
          margin-top: 16px;
          color: #12243a;
          font: 700 52px/1.12 Poppins, sans-serif;
        }
        .elementor-1189 .elementor-element-806c177 p {
          max-width: 680px;
          margin: 16px auto 0;
          color: #607184;
          font: 500 15px/1.75 Montserrat, sans-serif;
        }
        .elementor-1189 .gift-wp-contact-grid {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          max-width: 1100px;
          width: 100%;
          gap: 22px;
          align-items: stretch;
          justify-items: stretch;
          margin: 54px auto 0;
          overflow: visible;
          border: none;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }
        .elementor-1189 .gift-wp-contact-grid > .gift-scroll-fade {
          display: flex;
        }
        .elementor-1189 .gift-wp-contact-grid .elementor-widget-icon-box {
          width: 100%;
          min-width: 0;
          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        .elementor-1189 .elementor-widget-icon-box .elementor-widget-container {
          height: 100%;
          padding: 0 !important;
          border: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        .elementor-1189 .elementor-icon-box-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 100%;
          min-height: auto;
          padding: 32px 30px;
          border: 1px solid rgba(47, 155, 185, .14);
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 6px 28px rgba(13, 45, 77, .06), 0 1px 4px rgba(47, 155, 185, .06);
          text-align: left;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .elementor-1189 .gift-wp-contact-grid .elementor-widget-icon-box:last-child .elementor-icon-box-wrapper {
          border-right: 1px solid rgba(47, 155, 185, .14);
        }
        .elementor-1189 .elementor-icon-box-wrapper:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(13, 45, 77, .10), 0 4px 16px rgba(47, 155, 185, .12);
          border-color: rgba(47, 155, 185, .35);
        }
        a.elementor-icon-box-wrapper {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }
        .elementor-1189 .elementor-icon-box-content {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 5px;
          justify-content: center;
          align-items: flex-start;
        }
        .elementor-1189 .elementor-icon-box-icon {
          display: flex;
          flex-shrink: 0;
          height: auto;
          align-items: center;
          justify-content: center;
          margin-bottom: 0 !important;
          margin-right: 28px !important;
        }
        .elementor-1189 .elementor-icon {
          display: inline-flex;
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: linear-gradient(135deg, #2f9bb9, #0f6d91) !important;
          color: #fff;
          box-shadow: 0 8px 22px rgba(47, 155, 185, .32);
        }
        .elementor-1189 .elementor-icon svg {
          width: 26px;
          height: 26px;
          stroke-width: 2.2;
        }
        .elementor-1189 .elementor-icon svg,
        .elementor-1189 .elementor-icon svg * {
          stroke: currentColor !important;
        }
        .elementor-1189 .elementor-icon-box-title {
          margin: 0;
          color: #2f9bb9;
          font: 700 11px/1.2 Poppins, sans-serif;
          letter-spacing: .10em;
          text-transform: uppercase;
        }
        .elementor-1189 .elementor-icon-box-description {
          max-width: 100%;
          margin: 0;
          color: #12243a;
          font: 600 15px/1.55 Montserrat, sans-serif;
          text-align: left;
          overflow-wrap: anywhere;
        }
        .elementor-1189 .elementor-element-66ecdbf .elementor-icon-box-description {
          white-space: normal;
        }
        .elementor-1189 .elementor-icon-box-description a {
          color: #2f9bb9;
          text-decoration: none;
          transition: color .2s ease;
        }
        .elementor-1189 .elementor-icon-box-description a:hover {
          color: #1f6f85;
          text-decoration: underline;
        }
        .gift-wp-contact-band {
          position: relative;
          padding: 112px 0;
          overflow: hidden;
          background-color: #132238;
          background-position: center;
          background-size: cover;
        }
        .gift-wp-contact-band:after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(8, 20, 36, .86) 0%, rgba(8, 20, 36, .72) 44%, rgba(8, 20, 36, .52) 100%);
          pointer-events: none;
        }
        .gift-wp-contact-band > .e-con-inner {
          position: relative;
          z-index: 1;
        }
        .gift-wp-contact-band .gift-wp-two-column {
          gap: 64px;
          align-items: stretch;
        }
        .gift-wp-contact-band .elementor-element-5771a84 {
          display: flex;
          min-height: 100%;
          flex-direction: column;
          justify-content: center;
          padding: 36px 0;
        }
        .gift-wp-contact-band-kicker {
          width: max-content;
          border-color: rgba(255, 255, 255, .16);
          background: rgba(255, 255, 255, .08);
          color: #82d6ed;
        }
        .gift-wp-contact-band .elementor-element-5b9f1ae {
          margin: 18px 0 18px;
        }
        .gift-wp-contact-band .elementor-element-5b9f1ae .elementor-heading-title {
          color: #fff;
          font: 700 50px/1.12 Poppins, sans-serif;
        }
        .gift-wp-contact-band-copy {
          max-width: 540px;
          margin: 0 0 30px;
          color: rgba(255, 255, 255, .78);
          font: 500 15px/1.8 Montserrat, sans-serif;
        }
        .gift-wp-contact-band .elementor-element-2fa7ae0 {
          margin-bottom: 20px !important;
        }
        .gift-wp-contact-band .elementor-element-2fa7ae0 .elementor-heading-title {
          color: #fff;
          font: 700 22px/1.3 Poppins, sans-serif;
        }
        .gift-wp-contact-band .elementor-element-8725434 > .elementor-widget-container {
          margin-top: 0 !important;
        }
        .gift-wp-contact-band .elementor-element-8725434 .elementor-divider {
          padding: 0;
        }
        .gift-wp-contact-band .elementor-element-8725434 .elementor-divider-separator {
          display: block;
          width: 100%;
          max-width: 470px;
          height: 1px;
          background: rgba(255, 255, 255, .42);
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
        .gift-wp-contact-list li {
          max-width: 560px;
          color: rgba(255, 255, 255, .92);
          font-size: 15px;
        }
        .gift-wp-contact-list svg {
          flex: 0 0 auto;
          margin-top: 3px;
          color: #82d6ed;
        }
        .gift-wp-contact-list li a,
        .gift-wp-footer-contact li a,
        .gift-wp-office-info-list li a {
          color: inherit;
          text-decoration: none;
          transition: color .2s ease;
        }
        .gift-wp-contact-list li a:hover,
        .gift-wp-footer-contact li a:hover,
        .gift-wp-office-info-list li a:hover {
          color: #82d6ed;
        }
        .gift-wp-footer-contact li {
          align-items: center;
        }
        .gift-wp-contact-phone-lines {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .gift-wp-contact-credentials {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 30px;
        }
        .gift-wp-contact-credentials span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 36px;
          padding: 8px 12px;
          border: 1px solid rgba(255, 255, 255, .16);
          border-radius: 999px;
          background: rgba(255, 255, 255, .08);
          color: rgba(255, 255, 255, .86);
          font: 600 12px/1.2 Montserrat, sans-serif;
        }
        .gift-wp-form {
          display: grid;
          gap: 18px;
          padding: 32px;
          border: 1px solid rgba(255, 255, 255, .58);
          border-radius: 8px;
          background: rgba(255, 255, 255, .94);
          box-shadow: 0 28px 70px rgba(0, 0, 0, .22);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .gift-wp-form-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding-bottom: 6px;
          color: #12243a;
        }
        .gift-wp-form-header > svg {
          flex: 0 0 auto;
          color: #2f9bb9;
        }
        .gift-wp-form-header strong,
        .gift-wp-form-header span {
          display: block;
        }
        .gift-wp-form-header strong {
          font: 700 22px/1.25 Poppins, sans-serif;
        }
        .gift-wp-form-header span {
          margin-top: 4px;
          color: #667789;
          font: 500 13px/1.5 Montserrat, sans-serif;
        }
        .gift-wp-form-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }
        .gift-wp-form label {
          display: grid;
          gap: 6px;
          color: #12243a;
          font: 700 13px/1.3 Poppins, sans-serif;
        }
        .gift-wp-form .wpr-form-field {
          width: 100%;
          border: 1px solid #d7e2ea;
          border-radius: 4px;
          padding: 12px 13px;
          background: #f8fbfd;
          color: #12243a;
          font: 500 13px/1.4 Poppins, sans-serif;
          box-sizing: border-box;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .gift-wp-form textarea.wpr-form-field {
          min-height: 154px;
          resize: vertical;
        }
        .gift-wp-form .wpr-form-field:focus {
          outline: none;
          border-color: #2f9bb9;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(47, 155, 185, .14);
        }
        .gift-wp-form .wpr-button {
          display: inline-flex;
          width: 100%;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          background: #12324a;
          color: #fff;
          border: 0;
          border-radius: 4px;
          padding: 12px 18px;
          cursor: pointer;
          font: 700 14px Poppins, sans-serif;
          transition: background .2s ease, transform .2s ease;
        }
        .gift-wp-form .wpr-button:hover {
          background: #2f9bb9;
          transform: translateY(-1px);
        }
        .gift-wp-form .wpr-button:disabled {
          opacity: .7;
          cursor: not-allowed;
          transform: none;
        }
        .gift-wp-form-feedback {
          margin: 0;
          padding: 12px 14px;
          border-radius: 4px;
          font: 600 13px/1.5 Montserrat, sans-serif;
        }
        .gift-wp-form-feedback-success {
          background: rgba(47, 155, 185, .12);
          color: #12324a;
          border: 1px solid rgba(47, 155, 185, .35);
        }
        .gift-wp-form-feedback-error {
          background: rgba(220, 38, 38, .08);
          color: #b91c1c;
          border: 1px solid rgba(220, 38, 38, .25);
        }
        .gift-wp-map {
          padding: 0;
          background: #fff;
        }
        .gift-wp-map iframe {
          display: block;
          width: 100%;
          height: 480px;
          border: 0;
        }
        /* ===== FOOTER ===== */
        .elementor-222 {
          background: #0f1729 !important;
          width: 100% !important;
          display: block !important;
          color: #fff;
        }
        .gift-footer-wrap {
          width: min(1200px, calc(100% - 80px));
          margin: 0 auto;
          padding: 60px 0 32px;
          box-sizing: border-box;
        }
        .gift-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1.5fr;
          gap: 48px;
          align-items: start;
          padding-bottom: 40px;
        }
        .gift-footer-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }
        .gift-footer-col > .gift-scroll-fade {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .gift-footer-heading {
          font: 700 12px/1 Poppins, sans-serif;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        .gift-footer-desc {
          color: rgba(255, 255, 255, 0.7);
          font-size: 15px;
          line-height: 1.65;
          margin: 0;
        }
        .gift-footer-social {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }
        .gift-footer-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, .16);
          background: rgba(255, 255, 255, .06);
          color: rgba(255, 255, 255, .75);
          transition: color .2s ease, background .2s ease, transform .2s ease;
        }
        .gift-footer-social-link:hover {
          color: #82d6ed;
          background: rgba(130, 214, 237, .14);
          transform: translateY(-2px);
        }
        .gift-footer-social-link svg {
          width: 18px;
          height: 18px;
        }
        .elementor-222 .wpr-logo-image img {
          max-width: 240px;
          width: 100%;
          height: auto;
        }
        .elementor-222 a {
          text-decoration: none;
          color: rgba(255, 255, 255, 0.75);
        }
        .elementor-222 a:hover {
          color: #fff;
        }
        .elementor-222 a.elementor-icon-list-text {
          transition: color .2s ease;
        }
        .elementor-222 a.elementor-icon-list-text:hover {
          color: #82d6ed;
        }
        .gift-footer-grid > .gift-footer-col:last-child .gift-wp-footer-contact {
          gap: 8px;
        }
        .gift-footer-divider {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          margin: 0 0 20px;
        }
        .gift-footer-copy {
          text-align: center;
          color: rgba(255, 255, 255, 0.45);
          font-size: 14px;
          margin: 0;
        }
        .gift-wp-footer-contact li {
          font-size: 15px;
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
        .gift-wp-category-row span,
        .gift-wp-category-row a {
          border: 1px solid #dbe8ee;
          border-radius: 999px;
          padding: 8px 14px;
          background: #fff;
          color: #555;
          text-decoration: none;
          font: inherit;
          transition: background .18s, border-color .18s, color .18s;
        }
        .gift-wp-category-row a:hover {
          border-color: #2f9bb9;
          color: #2f9bb9;
        }
        .gift-wp-category-row a.gift-category-active {
          background: #2f9bb9;
          border-color: #2f9bb9;
          color: #fff;
        }
        .gift-blog-empty {
          text-align: center;
          padding: 60px 0;
          color: #607184;
          font: 500 16px/1.6 Raleway, sans-serif;
        }
        .gift-wp-blog-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .gift-wp-blog-page .gift-wp-blog-grid {
          grid-template-columns: 1fr;
          max-width: 1040px;
          gap: 30px;
          margin: 48px auto 0;
        }
        .gift-wp-blog-card {
          overflow: hidden;
          border: 1px solid #e8e8e8;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 12px 34px rgba(0, 0, 0, .06);
        }
        .gift-wp-blog-page .gift-wp-blog-card {
          display: grid;
          grid-template-columns: minmax(280px, 40%) minmax(0, 1fr);
          align-items: stretch;
          border-radius: 0;
          box-shadow: none;
        }
        .gift-wp-blog-card img {
          width: 100%;
          height: 225px;
          object-fit: cover;
        }
        .gift-wp-blog-page .gift-wp-blog-card img {
          height: 100%;
          min-height: 260px;
        }
        .gift-wp-blog-card div {
          padding: 24px;
        }
        .gift-wp-blog-page .gift-wp-blog-card div {
          display: flex;
          min-height: 260px;
          flex-direction: column;
          justify-content: center;
          padding: 30px 34px;
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
        .gift-wp-blog-detail article h2 {
          margin: 34px 0 14px;
          color: #222;
          font: 600 26px/1.3 Poppins, sans-serif;
        }
        .gift-wp-blog-detail article h3 {
          margin: 28px 0 10px;
          color: #222;
          font: 600 21px/1.35 Poppins, sans-serif;
        }
        .gift-wp-blog-detail article ul,
        .gift-wp-blog-detail article ol {
          display: grid;
          gap: 8px;
          margin: 0 0 20px 22px;
          padding: 0;
          color: #555;
          font: 500 14px/1.8 Raleway, sans-serif;
        }
        .gift-wp-blog-detail article li {
          padding-left: 4px;
        }
        .gift-wp-blog-detail article hr {
          margin: 32px 0;
          border: 0;
          border-top: 1px solid #e8e8e8;
        }
        .gift-wp-blog-page .gift-wp-blog-card p:not(.gift-wp-blog-meta) {
          margin: 0 0 22px;
        }
        .gift-wp-read-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
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
        /* ===== BLOG REDESIGN ===== */
        .gift-blog-index {
          padding: 80px 0 120px;
          background: #f4f8fb;
        }
        .gift-blog-wrap {
          width: min(1200px, calc(100% - 40px));
          margin: 0 auto;
        }
        .gift-blog-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .gift-blog-title {
          margin: 16px 0 28px;
          color: #334155;
          font: 700 44px/1.2 Poppins, sans-serif;
        }
        .gift-blog-tag {
          display: inline-flex;
          align-items: center;
          min-height: 24px;
          padding: 3px 11px;
          border-radius: 999px;
          background: rgba(47, 155, 185, .12);
          color: #2f9bb9;
          font: 700 10px/1 Poppins, sans-serif;
          text-transform: uppercase;
          letter-spacing: .07em;
        }
        .gift-blog-featured {
          display: grid;
          grid-template-columns: 55% 1fr;
          margin-bottom: 72px;
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 20px 60px rgba(10, 37, 64, .09);
          text-decoration: none;
          color: inherit;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .gift-blog-featured:hover {
          transform: translateY(-5px);
          box-shadow: 0 32px 76px rgba(10, 37, 64, .14);
        }
        .gift-blog-featured-img {
          overflow: hidden;
        }
        .gift-blog-featured-img img {
          width: 100%;
          height: 100%;
          min-height: 380px;
          object-fit: cover;
          transition: transform .5s ease;
        }
        .gift-blog-featured:hover .gift-blog-featured-img img {
          transform: scale(1.04);
        }
        .gift-blog-featured-body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
          padding: 52px 56px;
        }
        .gift-blog-featured-body h2 {
          margin: 0;
          color: #0a2540;
          font: 700 28px/1.3 Poppins, sans-serif;
        }
        .gift-blog-featured-body p {
          margin: 0;
          color: #607184;
          font: 500 15px/1.85 Raleway, sans-serif;
          flex: 1;
        }
        .gift-blog-featured-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 4px;
        }
        .gift-blog-more-title {
          margin: 0 0 28px;
          color: #0a2540;
          font: 600 22px/1.3 Poppins, sans-serif;
          padding-bottom: 16px;
          border-bottom: 2px solid #e0eaf2;
        }
        .gift-blog-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
        }
        .gift-blog-card {
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 6px 28px rgba(10, 37, 64, .07);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .gift-blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(10, 37, 64, .13);
        }
        .gift-blog-card-img {
          display: block;
          overflow: hidden;
          flex-shrink: 0;
        }
        .gift-blog-card-img img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform .4s ease;
        }
        .gift-blog-card:hover .gift-blog-card-img img {
          transform: scale(1.06);
        }
        .gift-blog-card-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 10px;
          padding: 22px 24px 24px;
        }
        .gift-blog-card-body h2 {
          margin: 0;
          font: 600 17px/1.4 Poppins, sans-serif;
          color: #0a2540;
        }
        .gift-blog-card-body h2 a {
          color: inherit;
          text-decoration: none;
          transition: color .2s;
        }
        .gift-blog-card-body h2 a:hover {
          color: #2f9bb9;
        }
        .gift-blog-card-body p {
          margin: 0;
          flex: 1;
          color: #607184;
          font: 500 13px/1.8 Raleway, sans-serif;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gift-blog-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 14px;
          border-top: 1px solid #e8f0f5;
        }
        /* BLOG DETAIL */
        .gift-blog-detail-hero {
          position: relative;
          height: 520px;
          overflow: hidden;
          background: #0a2540;
        }
        .gift-blog-detail-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: .55;
        }
        .gift-blog-detail-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 37, 64, .88) 0%, rgba(10, 37, 64, .3) 52%, transparent 100%);
        }
        .gift-blog-detail-hero-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 52px min(80px, 5vw) 52px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: min(1000px, calc(100% - 40px));
          margin: 0 auto;
        }
        .gift-blog-detail-hero-content h1 {
          margin: 0;
          color: #fff;
          font: 700 46px/1.2 Poppins, sans-serif;
        }
        .gift-blog-detail-hero-content .gift-wp-blog-meta {
          color: rgba(255,255,255,.72);
        }
        .gift-blog-detail {
          padding: 89px 0 110px;
          background: #f4f8fb;
        }
        .gift-blog-detail-wrap {
          width: min(820px, calc(100% - 40px));
          margin: 0 auto;
        }
        .gift-blog-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 36px;
          color: #2f9bb9;
          text-decoration: none;
          font: 600 13px Poppins, sans-serif;
          transition: color .2s, gap .2s;
        }
        .gift-blog-back:hover {
          color: #0a2540;
          gap: 10px;
        }
        .gift-blog-article {
          background: #fff;
          border-radius: 16px;
          padding: 60px 68px;
          box-shadow: 0 8px 40px rgba(10, 37, 64, .07);
        }
        .gift-blog-article-header {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 32px;
          padding-bottom: 28px;
          border-bottom: 1px solid #e0eaf2;
        }
        .gift-blog-article-header h1 {
          margin: 0;
          color: #0a2540;
          font: 700 38px/1.25 Poppins, sans-serif;
        }
        .gift-blog-article-cover {
          width: 100%;
          height: auto;
          border-radius: 10px;
          margin-bottom: 36px;
        }
        .gift-blog-article h2 {
          margin: 40px 0 16px;
          padding-top: 10px;
          color: #0a2540;
          font: 700 26px/1.3 Poppins, sans-serif;
          border-top: 2px solid #e0eaf2;
        }
        .gift-blog-article h2:first-child {
          margin-top: 0;
          padding-top: 0;
          border-top: 0;
        }
        .gift-blog-article h3 {
          margin: 28px 0 12px;
          color: #0a2540;
          font: 600 20px/1.35 Poppins, sans-serif;
        }
        .gift-blog-article p {
          margin: 0 0 18px;
          color: #3d4f61;
          font: 400 16px/1.95 Raleway, sans-serif;
        }
        .gift-blog-article ul,
        .gift-blog-article ol {
          margin: 0 0 22px;
          padding-left: 24px;
          color: #3d4f61;
          font: 400 16px/1.9 Raleway, sans-serif;
        }
        .gift-blog-article li {
          margin-bottom: 8px;
        }
        .gift-blog-article hr {
          margin: 40px 0;
          border: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #d0dde8, transparent);
        }
        .gift-blog-detail-nav {
          margin-top: 36px;
        }
        /* ===== OFFICE LOCATION SECTION ===== */
        .gift-wp-office-location {
          padding: 100px 0 0;
          background: #fff;
        }
        .gift-wp-office-wrap {
          width: min(1100px, calc(100% - 40px));
          margin: 0 auto;
        }
        .gift-wp-office-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 52px;
        }
        .gift-wp-office-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 6px;
          background: rgba(47, 155, 185, .1);
          color: #2f9bb9;
          font: 800 12px/1 Poppins, sans-serif;
          letter-spacing: .08em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .gift-wp-office-badge .gift-wp-lucide { width: 14px; height: 14px; stroke-width: 2; }
        .gift-wp-office-heading {
          margin: 0;
          color: #0a2540;
          font: 700 48px/1.1 Poppins, sans-serif;
        }
        .gift-wp-office-desc {
          margin: 0;
          color: #607184;
          font: 500 16px/1.75 Montserrat, sans-serif;
        }
        .gift-wp-office-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          min-height: 560px;
          background: url("/landing/contact-card.png") center / cover no-repeat;
          background-color: #1c2a3a;
          display: flex;
          align-items: flex-end;
        }
        .gift-wp-office-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top,
            rgba(5, 18, 38, .92) 0%,
            rgba(5, 18, 38, .60) 50%,
            rgba(5, 18, 38, .22) 100%);
          pointer-events: none;
        }
        .gift-wp-office-card-content {
          position: relative;
          z-index: 1;
          padding: 44px 48px;
        }
        .gift-wp-office-pill {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 999px;
          background: rgba(255, 255, 255, .18);
          border: 1px solid rgba(255, 255, 255, .35);
          color: #fff;
          font: 700 11px/1.2 Poppins, sans-serif;
          letter-spacing: .12em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          margin-bottom: 12px;
        }
        .gift-wp-office-city {
          margin: 0 0 22px;
          color: #fff;
          font: 700 64px/1.05 Poppins, sans-serif;
        }
        .gift-wp-office-info-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 11px;
        }
        .gift-wp-office-info-list li {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          color: rgba(255, 255, 255, .9);
          font: 500 14px/1.65 Montserrat, sans-serif;
        }
        .gift-wp-office-info-list .gift-wp-lucide {
          flex: 0 0 18px;
          width: 18px;
          height: 18px;
          margin-top: 2px;
          color: #82d6ed;
          stroke-width: 2;
        }
        @media (max-width: 1024px) {
          .gift-wp-office-header { grid-template-columns: 1fr; gap: 16px; }
          .gift-wp-office-heading { font-size: 38px; }
          .gift-wp-two-column {
            grid-template-columns: 1fr;
          }
          .gift-footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .gift-wp-facilities .gift-wp-two-column {
            gap: 36px;
          }
          .gift-wp-home-service-grid {
            grid-template-columns: 1fr;
          }
          .gift-wp-home-service-card-media img {
            min-height: 260px;
          }
          .gift-wp-service-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .elementor-1186 .elementor-element-5c74249 {
            text-align: start;
          }
          .elementor-1186 .elementor-element-5c74249 .elementor-heading-title {
            font-size: 33px;
          }
          .gift-wp-quote .elementor-heading-title {
            font-size: 40px;
          }
          .gift-wp-blog-grid {
            grid-template-columns: 1fr;
          }
          .elementor-1189 .gift-wp-contact-grid {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            max-width: 100%;
            gap: 18px;
          }
          .elementor-1189 .gift-wp-contact-band .gift-wp-two-column {
            grid-template-columns: minmax(0, .9fr) minmax(360px, 1.1fr);
          }
          .gift-wp-blog-page .gift-wp-blog-card {
            grid-template-columns: 1fr;
          }
          .gift-wp-blog-page .gift-wp-blog-card img {
            min-height: 240px;
          }
          .gift-blog-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .gift-blog-featured {
            grid-template-columns: 1fr;
          }
          .gift-blog-featured-img img {
            min-height: 300px;
          }
          .gift-blog-title {
            font-size: 36px;
          }
          .gift-blog-detail-hero {
            height: 420px;
          }
          .gift-blog-detail-hero-content h1 {
            font-size: 36px;
          }
          .gift-blog-article {
            padding: 44px 48px;
          }
          .elementor-1189 .elementor-element-91d42b5 {
            padding: 84px 0 92px;
          }
          .elementor-1189 .gift-wp-contact-grid {
            max-width: 100%;
          }
          .elementor-1189 .elementor-element-66ecdbf .elementor-icon-box-description {
            white-space: normal;
          }
          .gift-wp-contact-band .gift-wp-two-column {
            gap: 28px;
          }
          .gift-wp-contact-band .elementor-element-5771a84 {
            padding: 0;
          }
        }
        @media (max-width: 767px) {
          .gift-wp-office-location { padding: 64px 0 0; }
          .gift-wp-office-heading { font-size: 30px; }
          .gift-wp-office-city { font-size: 44px; }
          .gift-wp-office-card { min-height: 380px; }
          .gift-wp-office-card-content { padding: 28px 24px; }
          .gift-wp-service-grid {
            grid-template-columns: 1fr !important;
          }
          .elementor-1186 .gift-wp-services {
            margin: 100px 0 50px;
          }
          .elementor-1186 .elementor-element-5c74249 {
            text-align: start;
          }
          .elementor-1186 .elementor-element-5c74249 .elementor-heading-title {
            font-size: 30px;
          }
          .elementor-1186 .wpr-promo-box-title {
            font-size: 18px;
          }
          .elementor-1186 .wpr-promo-box-description {
            line-height: 1.4;
          }
          .gift-wp-quote {
            min-height: 420px;
            margin: 50px 0 0;
          }
          .gift-wp-quote .elementor-heading-title {
            font-size: 30px;
            line-height: 1.1;
          }
          .gift-wp-contact-intro {
            text-align: left;
          }
          .elementor-1189 .elementor-element-d5fce67 .elementor-heading-title {
            font-size: 36px;
          }
          .elementor-1189 .elementor-element-806c177 p {
            font-size: 14px;
          }
          .elementor-1189 .gift-wp-contact-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            max-width: none;
            margin-top: 28px;
            gap: 14px;
          }
          .elementor-1189 .elementor-icon-box-wrapper {
            padding: 20px 22px;
            align-items: center;
          }
          .elementor-1189 .elementor-icon-box-icon {
            margin-right: 20px !important;
          }
          .elementor-1189 .elementor-icon {
            width: 46px;
            height: 42px;
          }
          .elementor-1189 .elementor-icon svg {
            width: 20px;
            height: 20px;
          }
          .elementor-1189 .elementor-icon-box-title {
            font-size: 10px;
          }
          .elementor-1189 .elementor-icon-box-description {
            font-size: 13px;
            line-height: 1.45;
            overflow-wrap: anywhere;
          }
          .elementor-1189 .elementor-element-66ecdbf .elementor-icon-box-description {
            white-space: normal;
          }
          .elementor-1189 .gift-wp-contact-band .gift-wp-two-column {
            grid-template-columns: 1fr;
          }
          .gift-wp-contact-band .elementor-element-5b9f1ae .elementor-heading-title {
            font-size: 36px;
          }
          .gift-wp-form {
            padding: 24px 20px;
          }
          .gift-wp-form-row {
            grid-template-columns: 1fr;
          }
          .gift-wp-contact-credentials {
            display: grid;
          }
          .gift-wp-client-strip .elementor-element-b891f8c {
            gap: 16px;
          }
          .gift-wp-client-strip .elementor-element-b891f8c:before,
          .gift-wp-client-strip .elementor-element-b891f8c:after {
            width: 18vw;
          }
          .gift-wp-facilities {
            padding: 64px 20px !important;
          }
          .gift-wp-home-services {
            padding: 22px 0 64px;
          }
          .gift-wp-home-service-card {
            flex-direction: column;
          }
          .gift-wp-home-service-card-media img {
            min-height: 200px;
          }
          .gift-wp-home-service-card-body {
            padding: 20px 20px 24px;
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
            flex-direction: column;
            gap: 18px;
          }
          .gift-wp-policy-panel {
            padding: 32px 24px;
          }
          .gift-wp-policy-content {
            grid-template-columns: 1fr;
          }
          .gift-wp-policy-contact-list li {
            grid-template-columns: 1fr;
            gap: 4px;
          }
          .gift-wp-policy h2 {
            font-size: 30px;
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
          .gift-blog-grid {
            grid-template-columns: 1fr;
          }
          .gift-blog-featured-body {
            padding: 32px 28px;
          }
          .gift-blog-featured-body h2 {
            font-size: 22px;
          }
          .gift-blog-title {
            font-size: 28px;
          }
          .gift-blog-detail-hero {
            height: 360px;
          }
          .gift-blog-detail-hero-content {
            padding: 32px 20px;
          }
          .gift-blog-detail-hero-content h1 {
            font-size: 26px;
          }
          .gift-blog-article {
            padding: 32px 24px;
          }
          .gift-blog-article h2 {
            font-size: 22px;
          }
          .gift-blog-article p,
          .gift-blog-article ul,
          .gift-blog-article ol {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
}
