const matcher = '';

function createICalEvent() {
    
}

function createICal() {
    const comp = new ICAL.Component(['vcalendar', [], []]);
    comp.updatePropertyWithValue('prodid', '-//OPENCT-CHROME PLUGIN');

    return comp.toString();
}

// download ical file to local
function downloadICal(icalStr) {
    var url = 'data:text/calendar;base64,' + btoa(icalStr);
    chrome.downloads.download({
        url: url,
        filename: 'openct-classes.ics'
    });
}

// return classes
function processTable(table) {

}

function processTables(tables) {
    parser = new DOMParser();

    tables.forEach((t) => {
        const doc = parser.parseFromString(t, "text/xml");
        processTable(doc.firstChild);
    });

    createICal();
    downloadICal(createICal());
}

chrome.browserAction.onClicked.addListener(function (tab) {
    if (tab) {
        chrome.tabs.sendMessage(tab.id, {}, {}, function (response) {
            console.log(response);
            processTables(response.tables);
        });
    }
});