import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://www.bitladssoftware.com/og-image.jpg",
  ogType = "website",
  noindex = false
}: SEOHeadProps) {
  const { language } = useLanguage();
  
  const defaultTitle = language === 'en' 
    ? "Intelligent Workflow Automation Solutions | Business Process Optimization & Integration"
    : "Soluții Inteligente de Automatizare a proceselor de lucru | Optimizarea Proceselor de Afaceri";
    
  const defaultDescription = language === 'en'
    ? "Transform your business with intelligent workflow automation. Save 10+ hours weekly, reduce errors by 95%, and streamline operations with our interactive automation demos."
    : "Transformă-ți afacerea cu automatizarea inteligentă a fluxurilor de lucru. Economisește peste 10 ore săptămânal, reduce erorile cu 95% și eficientizează operațiunile.";
    
  const defaultKeywords = language === 'en'
    ? "workflow automation, business process automation, no-code automation, automation platform, workflow management, business automation, process optimization, API integration"
    : "automatizare flux de lucru, automatizare procese de afaceri, automatizare fără cod, platformă automatizare, management flux de lucru, automatizare afaceri";

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalCanonical = canonical || (typeof window !== 'undefined' ? window.location.href : 'https://www.bitladssoftware.com/');

  React.useEffect(() => {
    // Update document title
    document.title = finalTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', finalDescription);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', finalKeywords);
    }
    
    // Update robots meta
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }
    
    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonical);
    
    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };
    
    updateOGTag('og:title', finalTitle);
    updateOGTag('og:description', finalDescription);
    updateOGTag('og:url', finalCanonical);
    updateOGTag('og:image', ogImage);
    updateOGTag('og:type', ogType);
    updateOGTag('og:locale', language === 'en' ? 'en_US' : 'ro_RO');
    
    // Update Twitter tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[property="twitter:${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('property', `twitter:${name}`);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    };
    
    updateTwitterTag('title', finalTitle);
    updateTwitterTag('description', finalDescription);
    updateTwitterTag('url', finalCanonical);
    updateTwitterTag('image', ogImage);
    
    // Update language attributes
    document.documentElement.setAttribute('lang', language);
    
    // Update alternate language links
    const updateAlternateLink = (hreflang: string, href: string) => {
      let alternateLink = document.querySelector(`link[hreflang="${hreflang}"]`);
      if (!alternateLink) {
        alternateLink = document.createElement('link');
        alternateLink.setAttribute('rel', 'alternate');
        alternateLink.setAttribute('hreflang', hreflang);
        document.head.appendChild(alternateLink);
      }
      alternateLink.setAttribute('href', href);
    };
    
    const baseUrl = finalCanonical.split('?')[0];
    updateAlternateLink('en', baseUrl);
    updateAlternateLink('ro', `${baseUrl}?lang=ro`);
    updateAlternateLink('x-default', baseUrl);
    
  }, [finalTitle, finalDescription, finalKeywords, finalCanonical, ogImage, ogType, noindex, language]);

  return null; // This component only updates the head, doesn't render anything
}