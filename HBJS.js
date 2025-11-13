
document.addEventListener('DOMContentLoaded', () => {
    console.log('Homebase website loaded!');

    // --- Add-to-browser button: detect user's browser and open the appropriate extensions/add-ons page ---
    // Behaviour: all elements with the class `add-extension-btn` will open the correct store/page in a new tab.
    function getBrowser() {
        try {
            const ua = navigator.userAgent || '';

            // Prefer newer API when available
            if (navigator.userAgentData && Array.isArray(navigator.userAgentData.brands)) {
                const brands = navigator.userAgentData.brands.map(b => b.brand).join(' ');
                if (/Firefox/i.test(brands)) return 'firefox';
                if (/Chromium|Google Chrome|Microsoft Edge/i.test(brands)) return 'chromium';
            }

            if (/Firefox\//i.test(ua)) return 'firefox';
            if (/Edg\//i.test(ua)) return 'chromium'; // Edge is Chromium-based
            if (/Chrome\//i.test(ua) || /Chromium\//i.test(ua)) return 'chromium';
            if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return 'safari';
        } catch (e) {
            // fallback to unknown
        }
        return 'unknown';
    }

    function openExtensionPageForBrowser() {
        const browser = getBrowser();
        let url = 'https://chrome.google.com/webstore/category/extensions'; // default -> Chrome Web Store

        if (browser === 'firefox') {
            // Mozilla Add-ons (AMO)
            url = 'https://addons.mozilla.org/en-US/firefox/addon/homebase/';
        } else if (browser === 'safari') {
            // Safari extensions are distributed via the App Store / Safari Extensions Gallery
            // Link to Safari extensions overview (App Store) — best effort.
            url = 'https://apps.apple.com/us/story/id1470515171';
        }

        // Open in a new tab safely
        try {
            window.open(url, '_blank', 'noopener,noreferrer');
        } catch (e) {
            // As a fallback change location (will navigate current tab)
            window.location.href = url;
        }
    }

    // Attach handler to any Add-to-browser buttons on the page
    document.querySelectorAll('.add-extension-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openExtensionPageForBrowser();
        });
    });

    // Example of a future interaction: smooth scrolling for anchor links
    // This code finds all links that start with '#' (anchor links)
    // and makes them scroll smoothly instead of jumping.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Stop the default jump
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});