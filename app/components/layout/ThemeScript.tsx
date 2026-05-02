export const ThemeScript = () => {
  const code = `
    (function() {
      try {
        var theme = localStorage.getItem('felinoChanTheme');
        var root = document.documentElement;
        if (theme === 'dark') {
          root.style.setProperty('--bodyBgTexture', 'none');
          root.style.setProperty('--replyBgTexture', 'none');
          root.style.setProperty('--linkHoverColor', '#a5b4fc');
          root.style.setProperty('--linkColor', '#818cf8');
          root.style.setProperty('--assuntoColor', '#6366f1');
          root.style.setProperty('--replyBgColor', 'rgba(30, 32, 38, 0.8)');
          root.style.setProperty('--hrColor', 'rgba(255, 255, 255, 0.1)');
          root.style.setProperty('--headerBgColor', 'rgba(15, 17, 21, 0.8)');
          root.style.setProperty('--bodyBgColor', '#0f1115');
          root.style.setProperty('--inputBgColor', 'rgba(30, 32, 38, 0.6)');
          root.style.setProperty('--textColor', '#f3f4f6');
          root.style.setProperty('--accentColor', '#6366f1');
          root.style.setProperty('--glassBg', 'rgba(30, 32, 38, 0.5)');
          root.style.setProperty('--glassBorder', 'rgba(255, 255, 255, 0.08)');
          root.style.setProperty('--cardShadow', '0 8px 32px 0 rgba(0, 0, 0, 0.37)');
        } else if (theme === 'default') {
          root.style.setProperty('--linkHoverColor', '#d25400');
          root.style.setProperty('--linkColor', '#dd0000');
          root.style.setProperty('--assuntoColor', '#cc1105');
          root.style.setProperty('--replyBgColor', '#f0e0d6');
          root.style.setProperty('--hrColor', '#d9bfb7');
          root.style.setProperty('--headerBgColor', '#f0e0d6');
          root.style.setProperty('--bodyBgColor', '#ffffee');
          root.style.setProperty('--inputBgColor', '#f0e0d6');
          root.style.setProperty('--textColor', '#800000');
          root.style.setProperty('--accentColor', '#8b5cf6');
          root.style.setProperty('--glassBg', 'rgba(240, 224, 214, 0.7)');
          root.style.setProperty('--glassBorder', 'rgba(217, 191, 183, 0.5)');
          root.style.setProperty('--cardShadow', '0 8px 32px 0 rgba(139, 92, 246, 0.15)');
        } else if (theme === 'brazil') {
          root.style.setProperty('--linkHoverColor', '#facc15');
          root.style.setProperty('--linkColor', '#fbbf24');
          root.style.setProperty('--assuntoColor', '#4ade80');
          root.style.setProperty('--replyBgColor', 'rgba(21, 128, 61, 0.8)');
          root.style.setProperty('--hrColor', 'rgba(250, 204, 21, 0.3)');
          root.style.setProperty('--headerBgColor', 'rgba(22, 101, 52, 0.9)');
          root.style.setProperty('--bodyBgColor', '#14532d');
          root.style.setProperty('--inputBgColor', 'rgba(21, 128, 61, 0.6)');
          root.style.setProperty('--textColor', '#fefce8');
          root.style.setProperty('--accentColor', '#facc15');
          root.style.setProperty('--glassBg', 'rgba(21, 128, 61, 0.6)');
          root.style.setProperty('--glassBorder', 'rgba(250, 204, 21, 0.3)');
          root.style.setProperty('--cardShadow', '0 8px 32px 0 rgba(250, 204, 21, 0.15)');
        } else if (theme === 'cyberpunk') {
          root.style.setProperty('--linkHoverColor', '#00ffff');
          root.style.setProperty('--linkColor', '#ff00ff');
          root.style.setProperty('--assuntoColor', '#00ff00');
          root.style.setProperty('--replyBgColor', 'rgba(20, 20, 20, 0.8)');
          root.style.setProperty('--hrColor', 'rgba(0, 255, 0, 0.3)');
          root.style.setProperty('--headerBgColor', 'rgba(5, 5, 5, 0.8)');
          root.style.setProperty('--bodyBgColor', '#050505');
          root.style.setProperty('--inputBgColor', 'rgba(20, 20, 20, 0.6)');
          root.style.setProperty('--textColor', '#e0e0e0');
          root.style.setProperty('--accentColor', '#00ff00');
          root.style.setProperty('--glassBg', 'rgba(20, 20, 20, 0.7)');
          root.style.setProperty('--glassBorder', 'rgba(0, 255, 0, 0.3)');
          root.style.setProperty('--cardShadow', '0 8px 32px 0 rgba(0, 255, 0, 0.15)');
        } else if (theme === 'vaporwave') {
          root.style.setProperty('--linkHoverColor', '#b967ff');
          root.style.setProperty('--linkColor', '#01cdfe');
          root.style.setProperty('--assuntoColor', '#ff71ce');
          root.style.setProperty('--replyBgColor', 'rgba(43, 33, 58, 0.8)');
          root.style.setProperty('--hrColor', 'rgba(1, 205, 254, 0.3)');
          root.style.setProperty('--headerBgColor', 'rgba(30, 20, 40, 0.8)');
          root.style.setProperty('--bodyBgColor', '#2b213a');
          root.style.setProperty('--inputBgColor', 'rgba(43, 33, 58, 0.6)');
          root.style.setProperty('--textColor', '#fffb96');
          root.style.setProperty('--accentColor', '#ff71ce');
          root.style.setProperty('--glassBg', 'rgba(255, 113, 206, 0.15)');
          root.style.setProperty('--glassBorder', 'rgba(1, 205, 254, 0.3)');
          root.style.setProperty('--cardShadow', '0 8px 32px 0 rgba(255, 113, 206, 0.2)');
        } else if (theme === 'caramelo') {
          root.style.setProperty('--linkHoverColor', '#f59e0b');
          root.style.setProperty('--linkColor', '#b45309');
          root.style.setProperty('--assuntoColor', '#d97706');
          root.style.setProperty('--replyBgColor', 'rgba(253, 230, 138, 0.8)');
          root.style.setProperty('--hrColor', 'rgba(217, 119, 6, 0.2)');
          root.style.setProperty('--headerBgColor', 'rgba(254, 243, 199, 0.9)');
          root.style.setProperty('--bodyBgColor', '#fef3c7');
          root.style.setProperty('--inputBgColor', 'rgba(253, 230, 138, 0.6)');
          root.style.setProperty('--textColor', '#451a03');
          root.style.setProperty('--accentColor', '#d97706');
          root.style.setProperty('--glassBg', 'rgba(253, 230, 138, 0.6)');
          root.style.setProperty('--glassBorder', 'rgba(217, 119, 6, 0.2)');
          root.style.setProperty('--cardShadow', '0 8px 32px 0 rgba(217, 119, 6, 0.15)');
        } else if (theme === 'agostinho') {
          root.style.setProperty('--linkHoverColor', '#10b981');
          root.style.setProperty('--linkColor', '#3b82f6');
          root.style.setProperty('--assuntoColor', '#ef4444');
          root.style.setProperty('--replyBgColor', 'rgba(249, 168, 212, 0.8)');
          root.style.setProperty('--hrColor', 'rgba(239, 68, 68, 0.4)');
          root.style.setProperty('--headerBgColor', 'rgba(253, 224, 71, 0.9)');
          root.style.setProperty('--bodyBgColor', '#fef08a');
          root.style.setProperty('--inputBgColor', 'rgba(249, 168, 212, 0.6)');
          root.style.setProperty('--textColor', '#1e3a8a');
          root.style.setProperty('--accentColor', '#ef4444');
          root.style.setProperty('--glassBg', 'rgba(249, 168, 212, 0.6)');
          root.style.setProperty('--glassBorder', 'rgba(239, 68, 68, 0.4)');
          root.style.setProperty('--cardShadow', '0 8px 32px 0 rgba(16, 185, 129, 0.25)');
        } else if (theme === 'vasco') {
          root.style.setProperty('--linkHoverColor', '#f87171');
          root.style.setProperty('--linkColor', '#ef4444');
          root.style.setProperty('--assuntoColor', '#dc2626');
          root.style.setProperty('--replyBgColor', 'rgba(255, 255, 255, 0.05)');
          root.style.setProperty('--hrColor', 'rgba(255, 255, 255, 0.2)');
          root.style.setProperty('--headerBgColor', 'rgba(15, 15, 15, 0.9)');
          root.style.setProperty('--bodyBgColor', '#171717');
          root.style.setProperty('--inputBgColor', 'rgba(255, 255, 255, 0.1)');
          root.style.setProperty('--textColor', '#ffffff');
          root.style.setProperty('--accentColor', '#dc2626');
          root.style.setProperty('--glassBg', 'rgba(255, 255, 255, 0.08)');
          root.style.setProperty('--glassBorder', 'rgba(255, 255, 255, 0.2)');
          root.style.setProperty('--cardShadow', '0 8px 32px 0 rgba(220, 38, 38, 0.2)');
        } else if (theme === 'usa') {
          root.style.setProperty('--linkHoverColor', '#3b82f6');
          root.style.setProperty('--linkColor', '#1d4ed8');
          root.style.setProperty('--assuntoColor', '#dc2626');
          root.style.setProperty('--replyBgColor', 'rgba(255, 255, 255, 0.8)');
          root.style.setProperty('--hrColor', 'rgba(29, 78, 216, 0.3)');
          root.style.setProperty('--headerBgColor', 'rgba(248, 250, 252, 0.9)');
          root.style.setProperty('--bodyBgColor', '#f8fafc');
          root.style.setProperty('--inputBgColor', 'rgba(255, 255, 255, 0.6)');
          root.style.setProperty('--textColor', '#0f172a');
          root.style.setProperty('--accentColor', '#dc2626');
          root.style.setProperty('--glassBg', 'rgba(255, 255, 255, 0.8)');
          root.style.setProperty('--glassBorder', 'rgba(29, 78, 216, 0.3)');
          root.style.setProperty('--cardShadow', '0 8px 32px 0 rgba(29, 78, 216, 0.2)');
        } else if (theme === 'tigrinho') {
          root.style.setProperty('--linkHoverColor', '#f59e0b');
          root.style.setProperty('--linkColor', '#d97706');
          root.style.setProperty('--assuntoColor', '#fbbf24');
          root.style.setProperty('--replyBgColor', 'rgba(255, 251, 235, 0.2)');
          root.style.setProperty('--hrColor', 'rgba(251, 191, 36, 0.4)');
          root.style.setProperty('--headerBgColor', 'rgba(194, 65, 12, 0.9)');
          root.style.setProperty('--bodyBgColor', '#ea580c');
          root.style.setProperty('--inputBgColor', 'rgba(255, 251, 235, 0.3)');
          root.style.setProperty('--textColor', '#fffbeb');
          root.style.setProperty('--accentColor', '#fbbf24');
          root.style.setProperty('--glassBg', 'rgba(255, 251, 235, 0.15)');
          root.style.setProperty('--glassBorder', 'rgba(251, 191, 36, 0.4)');
          root.style.setProperty('--cardShadow', '0 8px 32px 0 rgba(251, 191, 36, 0.3)');
        } else if (theme === 'urss') {
          root.style.setProperty('--linkHoverColor', '#fcd34d');
          root.style.setProperty('--linkColor', '#f59e0b');
          root.style.setProperty('--assuntoColor', '#fbbf24');
          root.style.setProperty('--replyBgColor', 'rgba(254, 226, 226, 0.15)');
          root.style.setProperty('--hrColor', 'rgba(251, 191, 36, 0.4)');
          root.style.setProperty('--headerBgColor', 'rgba(153, 27, 27, 0.9)');
          root.style.setProperty('--bodyBgColor', '#b91c1c');
          root.style.setProperty('--inputBgColor', 'rgba(254, 226, 226, 0.2)');
          root.style.setProperty('--textColor', '#fef2f2');
          root.style.setProperty('--accentColor', '#fbbf24');
          root.style.setProperty('--glassBg', 'rgba(254, 226, 226, 0.1)');
          root.style.setProperty('--glassBorder', 'rgba(251, 191, 36, 0.4)');
          root.style.setProperty('--cardShadow', '0 8px 32px 0 rgba(251, 191, 36, 0.3)');
        }
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
};
