import React from 'react';
import { StoryData, StoryType } from '../types';
import { ICONS, LOGO_SVG, THEME_PRESETS } from '../constants';

interface Props {
  data: StoryData;
  onChange: (data: StoryData) => void;
  onGenerateAI: () => void;
  onGenerateImage: () => void;
  isGenerating: boolean;
  isGeneratingImage: boolean;
}

const Sidebar: React.FC<Props> = ({
  data,
  onChange,
  onGenerateAI,
  onGenerateImage,
  isGenerating,
  isGeneratingImage
}) => {
  const updateField = (field: keyof StoryData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateField('logo', event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateField('image', event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="sidebar-container">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-icon-wrapper">
          {LOGO_SVG("w-8 h-8")}
        </div>
        <div>
          <h2 className="sidebar-title">المستثمر</h2>
          <p className="sidebar-subtitle">لوحة التحكم</p>
        </div>
      </div>

      {/* AI Content Assistant */}
      <div className="ai-assistant-card">
        <div className="ai-card-glow"></div>

        <div className="ai-card-header">
          {ICONS.Zap}
          <span>المساعد الذكي</span>
        </div>
        <p className="ai-card-text">اكتب ملخص الخبر وسنقوم بتوليد المحتوى وتحليله فوراً.</p>
        <button
          onClick={onGenerateAI}
          disabled={isGenerating}
          className="btn-ai-generate"
        >
          {isGenerating ? (
            <div className="spinner-sm" />
          ) : ICONS.Refresh}
          <span>توليد المحتوى</span>
        </button>
      </div>

      {/* Media & Image Section */}
      <div className="section-divider">
        <label className="section-label">
          {ICONS.Image} الهوية والوسائط
        </label>

        {/* Story Background */}
        <div className="flex flex-col gap-3">
          {/* Story Background */}
          <div className="image-preview-container">
            {data.image ? (
              <img src={data.image} alt="Preview" className="image-preview" />
            ) : (
              <div className="image-placeholder-icon">{ICONS.Image}</div>
            )}
            {isGeneratingImage && (
              <div className="image-loading-overlay">
                <div className="spinner-lg" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onGenerateImage}
              disabled={isGeneratingImage}
              className={`btn-image-generate ${isGeneratingImage ? 'loading' : ''}`}
            >
              {isGeneratingImage ? null : ICONS.Refresh}
              <span>{isGeneratingImage ? 'جاري...' : 'ذكاء اصطناعي'}</span>
            </button>
            <label className="btn-image-generate">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              {ICONS.Image}
              <span>رفع صورة</span>
            </label>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="flex gap-2">
          <label className="logo-upload-label">
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            {data.logo ? (
              <img src={data.logo} alt="Logo" className="logo-preview" />
            ) : (
              <>
                {ICONS.Layout}
                <span className="logo-placeholder-text">رفع الشعار (يسار)</span>
              </>
            )}
          </label>
          {data.logo && (
            <button
              onClick={() => updateField('logo', '')}
              className="btn-remove-logo"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Manual Controls */}
      <div className="section-divider">

        {/* THEMES */}
        <div className="space-y-3">
          <label className="section-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {ICONS.Palette} الثيم اللوني
          </label>
          <div className="grid grid-cols-6 gap-2">
            {Object.values(THEME_PRESETS).map((theme) => (
              <button
                key={theme.id}
                onClick={() => updateField('theme', theme.id)}
                className={`theme-button ${data.theme === theme.id ? 'active' : ''}`}
                style={{ backgroundColor: theme.primary }}
                title={theme.name}
              >
                <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/10 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-full h-1/2" style={{ backgroundColor: theme.accent }} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="section-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>التصنيف</label>
          <select
            value={data.type}
            onChange={(e) => updateField('type', e.target.value)}
            className="input-base input-select"
          >
            <option value={StoryType.BREAKING}>خبر عاجل</option>
            <option value={StoryType.ANALYSIS}>تحليل عميق</option>
            <option value={StoryType.MARKET}>تحديث السوق</option>
            <option value={StoryType.INFOGRAPHIC}>بيانات إحصائية</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="section-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>النصوص</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="input-base input-text"
            placeholder="العنوان الرئيسي"
          />
          <textarea
            value={data.subtitle}
            onChange={(e) => updateField('subtitle', e.target.value)}
            className="input-base input-textarea"
            placeholder="تفاصيل الخبر..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="section-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>المؤشر</label>
            <input
              type="text"
              value={data.indicatorLabel}
              onChange={(e) => updateField('indicatorLabel', e.target.value)}
              className="input-base input-indicator"
            />
          </div>
          <div className="space-y-2">
            <label className="section-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>القيمة</label>
            <input
              type="text"
              value={data.indicatorValue}
              onChange={(e) => updateField('indicatorValue', e.target.value)}
              className="input-base input-indicator-value"
            />
          </div>
        </div>

        {/* Custom CSS Editor */}
        <div className="section-divider">
          <div className="flex justify-between items-end mb-2 px-1">
            <label className="section-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'monospace' }}>Classes: .poster-root, .poster-headline...</label>
          </div>
          <textarea
            value={data.customCss || ''}
            onChange={(e) => updateField('customCss', e.target.value)}
            className="custom-css-textarea"
            placeholder="...هنا لتخصيص التصميم CSS اكتب كود"
            spellCheck={false}
            dir="ltr"
          />
        </div>

      </div>

      <div className="sidebar-footer">
        {LOGO_SVG("w-6 h-6 text-slate-400")}
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Investor Design System</span>
      </div>
    </div>
  );
};

export default Sidebar;