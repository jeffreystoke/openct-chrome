function getTables() {
    const tables = [];
    tables.push(...document.getElementsByTagName('table'));

    const frameList = window.frames;
    for (var i = 0; i < frameList.length; i++) {
        try {
            tables.push(...frameList[i].document.getElementsByTagName('table'));
        } catch (err) {}
    }

    const strTables = [];
    tables.forEach((t) => {
        strTables.push(t.outerHTML);
    });

    return strTables;
}

chrome.runtime.onMessage.addListener(function (req, sender, sendResp) {
    sendResp({tables: getTables()});
})