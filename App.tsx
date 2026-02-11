
import React, { useState, useRef } from 'react';
import { StoryData, StoryType } from './types';
import Sidebar from './components/Sidebar';
import StoryCanvas from './components/StoryCanvas';
import { ICONS } from './constants';
import { generateStoryContent, generateStoryImage } from './services/gemini';
import * as htmlToImage from 'html-to-image';

const INITIAL_STORY: StoryData = {
  title: "صدمة في أسواق النفط العالمية",
  subtitle: "توقعات بارتفاع حاد في الأسعار عقب تقليص الإنتاج المفاجئ وتصاعد التوترات الجيوسياسية",
  type: StoryType.BREAKING,
  image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&q=80&w=1000",
  tickerText: "المستثمر: متابعة حية لأسواق الطاقة والعملات...",
  indicatorLabel: "برنت",
  indicatorValue: "94.50$",
  indicatorTrend: 'up',
  showTimestamp: true,
  customCss: "",
  theme: 'default',
  logo: ""
};

const App: React.FC = () => {
  const [story, setStory] = useState<StoryData>(INITIAL_STORY);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerateAI = async () => {
    const prompt = window.prompt("ما هو الحدث الاقتصادي الذي تريد صياغته؟", "تراجع التضخم في الولايات المتحدة");
    if (!prompt) return;

    setIsGenerating(true);
    try {
      const generated = await generateStoryContent(prompt);
      setStory(prev => ({
        ...prev,
        ...generated as StoryData
      }));
    } catch (error) {
      alert("عذراً، حدث خطأ في النظام الذكي.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    try {
      const imageUrl = await generateStoryImage(story.title);
      setStory(prev => ({ ...prev, image: imageUrl }));
    } catch (error) {
      alert("فشل توليد الصورة، جرب مرة أخرى.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleDownload = async () => {
    const node = document.getElementById('story-capture');
    if (!node) return;

    setIsDownloading(true);
    try {
      // Small delay to ensure any pending renders are complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1,
        pixelRatio: 2, // High resolution
      });
      
      const link = document.createElement('a');
      link.download = `investor-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download failed', error);
      alert("فشل تحميل الصورة. يرجى المحاولة من متصفح آخر.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        data={story} 
        onChange={setStory}
        onGenerateAI={handleGenerateAI}
        onGenerateImage={handleGenerateImage}
        isGenerating={isGenerating}
        isGeneratingImage={isGeneratingImage}
      />

      <main className="main-content">
        <div className="content-wrapper">
          
          <div className="header-section">
            <h2>استوديو التصميم</h2>
            <p>نظام التصميم الذكي - الهوية الجديدة</p>
          </div>

          <div className="canvas-container">
            <StoryCanvas data={story} />
            
            {/* Status Overlays */}
            {(isGenerating || isGeneratingImage || isDownloading) && (
              <div className="status-overlay">
                <div className="loading-spinner"></div>
                <span className="loading-text">
                  {isDownloading ? 'جاري تصدير الصورة...' : 'جاري المعالجة الذكية...'}
                </span>
              </div>
            )}
          </div>

          <div className="actions-container">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="btn-download"
            >
              {isDownloading ? <div className="btn-download-spinner" /> : ICONS.Download}
              <span>تحميل التصميم (PNG)</span>
            </button>
            
            <button 
              onClick={() => {
                const text = `${story.title}\n${story.subtitle}\n#المستثمر #أخبار_اقتصادية`;
                navigator.clipboard.writeText(text);
                alert("تم نسخ النص البرمجي للخبر");
              }}
              className="btn-share"
            >
              {ICONS.Share}
              <span>نسخ النص</span>
            </button>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="background-decor">
           <div className="blob-1"></div>
           <div className="blob-2"></div>
        </div>
      </main>
    </div>
  );
};

export default App;