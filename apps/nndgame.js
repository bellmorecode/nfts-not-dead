var nnd = {
	version: "1.0.0.0",
	ux: {
		attachEvents: function () {
			$("#gameConnectButton").on("click", nnd.walletReady.connect);
			$("#gameDisconnectButton").on("click", nnd.walletReady.disconnect);
		}
	},
	walletReady: {
		__state: {
			walletctxId: "wallet.nnd.v1",
			wallet: "0x0",
			loadState: function () {
				let w = localStorage.getItem(nnd.walletReady.__state.walletctxId);
				if (w) {
					nnd.walletReady.__state.wallet = w;
				}
			}
		},
		pageInit: function () {
			console.log('pageInit');
			$("#gameDisconnectButton").hide();
			$("#gameConnectButton").show();
		},
		connect: function () {
			console.log('connect');
		}, 
		disconnect: function () {
			console.log('disconnect')
		}
	},
	events: {
		onDocumentReady: function () {
			nnd.ux.attachEvents();
			nnd.walletReady.pageInit();
		}
	}
};
$(document).ready(function (andthen) {
	nnd.events.onDocumentReady();
	andthen()
});