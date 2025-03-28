var mmx = {
    util: {
        dateFormats: { shortestDate: 'M/d', shortDateTimeWs: 'MM/dd h:mm:ss tt', defaultDateTimeWs: 'MM/dd/yy h:mm:ss tt', defaultDateTime: 'MM/dd/yy h:mm tt', shortDateTime: 'MM/dd h:mm tt', defaultDate: 'MM/dd/yyyy', defaultTime: 'h:mm tt', defaultTimeWs: 'h:mm:ss tt', sql: 'yyyy-MM-dd HH:mm:ss' },
        formatDate: function (dt, format) {
            dt = typeof dt == 'number' || typeof dt == 'string' ? new Date(dt) : dt;
            format = format || mmx.util.dateFormats.defaultDateTime;
            let add0 = function (t) { return t < 10 ? `0${t}` : `${t}`; };
            let fromMilTime = function (h) {
                if (h == 0) return 12; if (h > 12) { return h - 12; } else { return h; }
            }
            let values_hashtable = {
                'yyyy': dt.getFullYear(),
                'yy': dt.getFullYear(),
                'MM': add0(dt.getMonth() + 1),
                'M': dt.getMonth() + 1,
                'dd': add0(dt.getDate()),
                'd': dt.getDate(),
                'hh': add0(fromMilTime(dt.getHours())),
                'h': fromMilTime(dt.getHours()),
                'HH': add0(dt.getHours()),
                'H': dt.getHours(),
                'mm': add0(dt.getMinutes()),
                'm': dt.getMinutes(),
                'ss': add0(dt.getSeconds()),
                's': dt.getSeconds(),
                'tt': dt.getHours() > 11 ? "PM" : "AM"
            }
            for (let key in values_hashtable) { format = format.replace(key, values_hashtable[key]); }
            return format;
        }
    },
    currentChainId: "0x0",
    mode: "",
    getOrdinalPositionalSuffix: function (val) {
        let x = val % 100;
        let y = x % 10;
        if (y == 1 && x != 11) {
            return "st";
        }
        if (y == 2 && x != 12) {
            return "nd";
        }
        if (y == 3 && x != 13) {
            return "rd";
        }
        return "th";
    },
    uuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
    },
    chainName: function (id) {
        if (!id) {
            id = window.ethereum.chainId;
            mmx.currentChainId = window.ethereum.chainId;
        }
        if (id == "0x0") { return "Disconnected"; }
        if (id == "0x1") { return "mainnet"; }
        if (id == "0xaa36a7") { return "Sepolia (test)"; }
        if (id == "0x89") { return "polygon"; }
        if (id == "0x38") { return "BNB Smart Chain"; }
        if (id == "0x2105") { return "base"; }
        if (id == "0x13882") { return "Polygon (amoy/test)"; }
        if (id == "0x14a34") { return "base-sepolia"; }
        return id;
    },
    chainHandle: function (id) {
        if (!id) {
            id = window.ethereum.chainId;
            mmx.currentChainId = window.ethereum.chainId;
        }
        if (id == "0x0") { return "unk"; }
        if (id == "0x1") { return "mainnet"; }
        if (id == "0xaa36a7") { return "sepolia"; }
        if (id == "0x38") { return "bnb"; }
        if (id == "0x89") { return "polygon"; }
        if (id == "0x2105") { return "base"; }
        if (id == "0x13882") { return "pol-amoy"; }
        if (id == "0x14a34") { return "base-sepolia"; }
        return id;
    },
    ensureUserId: function (userPropName) {
        if (window.localStorage) {
            let userId = window.localStorage.getItem(userPropName);
            if (!userId) {
                userId = mmx.uuid();
                window.localStorage.setItem(userPropName, userId);
            }
            return userId;
        }
        alert('This application relies on localStorage for context.');
    },
    maskedAddress: function (addr) {
        if (addr) {
            let len = addr.length;
            let stubLeft = addr.substring(0, 7);
            let stubRight = addr.substring(len - 5);
            return `${stubLeft}....${stubRight}`;
        }
        return addr;
    },
    chains: {
        Ethereum: "0x1", Polygon: "0x89", PolygonAmoy: "0x13882", Base: "0x2105", BaseSepolia: "0x14a34", Sepolia: "0xaa36a7", ShapeSepolia: ""
    },
    testChains: {
        BaseSepolia: "0x14a34", Sepolia: "0xaa36a7", PolygonAmoy: "0x13882"
    },
    isTestChain: function (ch) {
        let res = false;

        let testChainList = [mmx.testChains.BaseSepolia, mmx.testChains.PolygonAmoy, mmx.testChains.Sepolia];
        res = testChainList.indexOf(ch) > -1;
        return res;
    },
    getContractRef: function (ca, abi, callback) {
        //console.log({ getContract: { ca, abi } })
        let provider = new ethers.BrowserProvider(window.ethereum);
        provider.getSigner().then(signer => {
            let contract = new ethers.Contract(ca, abi, signer);
            callback(contract);
        });
    },
    subscribeToChainEvents: function (acctChanged, chainChanged) {
        window.ethereum.on("accountsChanged",acctChanged);
        window.ethereum.on("chainChanged",chainChanged);
    },
    loadABI: function (path, callback) {
        try {
            $.ajax({
                url: path, contentType: "application/json",
                success: function (res) {
                    if (callback) { callback(res); }
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
}
