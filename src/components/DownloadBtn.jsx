import Download from "@mui/icons-material/Download";
import { useEffect, useState } from "react";

const DownloadAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  const handleDownload = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
    } else {
      alert(
        `To install the app look for "Add to Homescreen" or install in your browser's menu.`
      );
    }
  };

  useEffect(() => {
    const onAppInstalled = () => setIsAppInstalled(true);

    const handleBIP = (e) => {
      e.preventDefault();

      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBIP);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBIP);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  return (
    <button
      className="category-btn"
      onClick={handleDownload}
      style={{
        color: "#fff",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ color: "red" }}>
        <Download />
      </span>
      <span>Download app</span>
    </button>
  );
};

export default DownloadAppButton;
