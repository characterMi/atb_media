import { Download } from "@mui/icons-material";
import { useEffect, useState } from "react";

const DownloadAppButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

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
        const handleBIP = (e) => {
            e.preventDefault();

            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handleBIP);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBIP);
        };
    }, []);

    return (
        <button
            className="category-btn"
            onClick={handleDownload}
            style={{
                color: "#fff",
                marginBlock: "1rem"
            }}
        >
            <span style={{ color: "red" }}><Download /></span>
            <span>Download app</span>
        </button>
    );
};

export default DownloadAppButton;
