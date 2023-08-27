document.addEventListener("DOMContentLoaded", async () => {
    const newTabUrl = "chrome://newtab/";
    const newTab = await chrome.tabs.create({ url: newTabUrl });
})