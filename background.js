chrome.tabs.onUpdated.addListener((tabId, changInfo, tab) => {

    if (changInfo && changInfo.status == "completed") {
        try {

            setTimeout(async() => {
                let res = await chrome.tabs.sendMessage(tabId, { data: tab })
            }, 1000)
        }
        catch (err) {
            console.log(err)

        }
    }
})

