import React from 'react';
import { StoryData, StoryType } from '../types';
import { LOGO_SVG, THEME_PRESETS, LOGO_PRESETS } from '../constants';

interface Props {
  data: StoryData;
  isCapturing?: boolean;
}

const StoryCanvas: React.FC<Props> = ({ data }) => {

  // Get label text based on type
  const getLabelText = () => {
    switch (data.type) {
      case StoryType.BREAKING: return 'خبر عاجل';
      case StoryType.MARKET: return 'أسواق';
      case StoryType.ANALYSIS: return 'تحليل';
      default: return 'تقرير';
    }
  };

  // Get current theme from presets, fallback to default
  const theme = THEME_PRESETS[data.theme as keyof typeof THEME_PRESETS] || THEME_PRESETS.default;

  return (
    <div
      id="story-capture"
      className="poster-root"
    >
      {/* Inject Custom CSS */}
      <style dangerouslySetInnerHTML={{ __html: data.customCss || '' }} />

      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={data.image}
          alt="News Background"
          className="poster-image"
          crossOrigin="anonymous"
        />
        {/* Layer 1: Global Dimmer (20%) to prevent white images from washing out text */}
        <div className="poster-image-overlay-1" />

        {/* Layer 2: Heavy Custom Gradient for Perfect Contrast */}
        <div className="poster-image-overlay-2" />
      </div>

      {/* 2. Top Header Area (Right: App Brand) */}
      <div className="poster-header">
        <div className="poster-brand">
          <span className="poster-brand-text">المستثمر</span>
          <div className="drop-shadow-md" style={{ color: theme.accent }}>{LOGO_SVG("w-6 h-6")}</div>
        </div>
      </div>

      {/* 2b. Top Header Area (Left: Uploaded Logo or Preset Logo) */}
      {(data.logo || data.logoId) && (
        <div className="poster-logo-custom">
          {data.logo ? (
            <img
              src={data.logo}
              alt="Custom Logo"
              className="poster-logo-img"
            />
          ) : (
            data.logoId && (() => {
              const preset = LOGO_PRESETS.find(l => l.id === data.logoId);
              // @ts-ignore
              return preset?.svg ? preset.svg("poster-logo-img-svg") : <img src={preset?.url} alt="Logo" className="poster-logo-img" />;
            })()
          )}
        </div>
      )}

      {/* 3. Main Content */}
      <div className="poster-content">

        <div className="poster-text-group">
          {/* Category Pill */}
          <div className="poster-badge-wrapper">
            <span
              className="poster-badge"
              style={{ backgroundColor: (theme as any).badgeColor || theme.primary }}
            >
              {getLabelText()}
            </span>
          </div>

          {/* Title - Increased Shadow for Pop */}
          <h1 className="poster-headline">
            {data.title}
          </h1>

          {/* Subtitle with Accent Line */}
          <div className="poster-subtitle-group">
            <div
              className="poster-separator"
              style={{
                backgroundColor: theme.accent,
                boxShadow: `0 0 15px ${theme.accent}`
              }}
            ></div>
            <p className="poster-subtitle">
              {data.subtitle}
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="poster-footer">
          <span className="font-mono" style={{ color: theme.accent }}>منصة المستثمر</span>
          <div className="poster-footer-right">
            <span>al-investor.com</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StoryCanvas;