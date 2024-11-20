const SUCCESS = "success";
const FAILURE = "failure";

document.getElementById("copyCookie").addEventListener("click", async () => {
  const cookieName = "SESSION";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url) {
    updateStatus("Не знайдено активну сторінку.", FAILURE);
    return;
  }

  const url = new URL(tab.url).origin;

  chrome.cookies.get({ name: cookieName, url }, (cookie) => {
    if (cookie) {
      navigator.clipboard.writeText(cookie.value)
        .then(() => updateStatus(`Скопійовано в буфер обміну!`, SUCCESS))
        .catch(() => updateStatus("Не вдалося скопіювати cookie.", FAILURE));
    } else {
      updateStatus(`Cookie "${cookieName}" не знайдено.`, FAILURE);
    }
  });
});

function updateStatus(message, type) {
  const statusElement = document.getElementById("status");
  statusElement.textContent = message;
  statusElement.classList.add(type);
  setTimeout(() => statusElement.textContent = "", 3000);
}
