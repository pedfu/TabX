document.addEventListener("DOMContentLoaded", async () => {
    console.log('teste')
    const newTabUrl = "chrome://newtab/";
    const newTab = await chrome.tabs.create({ url: newTabUrl });
})