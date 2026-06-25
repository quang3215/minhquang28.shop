import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface SeoSettings {
  siteName?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
  trackingHeader?: string;
  trackingBody?: string;
}

const SeoHead = () => {
  const [settings, setSettings] = useState<SeoSettings | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data() as SeoSettings);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!settings) return;

    // A helper to inject raw HTML string (including <script> tags) into a DOM node
    const injectScripts = (htmlString: string, targetNode: HTMLElement, dataAttribute: string) => {
      if (!htmlString) return;
      
      // Remove previously injected scripts by this component
      const existingElements = targetNode.querySelectorAll(`[${dataAttribute}]`);
      existingElements.forEach(el => el.remove());

      try {
        const fragment = document.createRange().createContextualFragment(htmlString);
        // Tag every top-level child so we can remove it later if settings change
        Array.from(fragment.childNodes).forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            (node as HTMLElement).setAttribute(dataAttribute, 'true');
          }
        });
        targetNode.appendChild(fragment);
      } catch (error) {
        console.error("Error injecting scripts:", error);
      }
    };

    if (settings.trackingHeader) {
      injectScripts(settings.trackingHeader, document.head, 'data-tracking-header');
    }
    
    if (settings.trackingBody) {
      injectScripts(settings.trackingBody, document.body, 'data-tracking-body');
    }

  }, [settings?.trackingHeader, settings?.trackingBody]);

  if (!settings) return null;

  const defaultTitle = 'Web Agency - Premium Templates & Services';
  const title = settings.metaTitle || settings.siteName || defaultTitle;
  const description = settings.metaDescription || 'Premium Web Templates & Performance Marketing Services';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {settings.metaKeywords && <meta name="keywords" content={settings.metaKeywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {settings.ogImage && <meta property="og:image" content={settings.ogImage} />}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {settings.ogImage && <meta property="twitter:image" content={settings.ogImage} />}
    </Helmet>
  );
};

export default SeoHead;
