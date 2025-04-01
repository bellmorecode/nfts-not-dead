var nnd = {
	version: "1.0.0.0",
	game: {
		most_recent_token: null,
		tutorial: {
			screens : {
				splashScreen: {
					content: {
						type: "markup", 
						value: `<div class="tut-screens"><h3 class="text-drippy">NFTS NOT DEAD: 'Not my NFTs' game</h3></div>`
					},
					description: `<p>Can you spot the imposter?</p>`,
					buttons: ["start-tutorial"]
				},
				introScreen: {
					content: {
						type: "markup", 
						value: `<div class="tut-screens"><h3 class="text-drippy">How to play: 'Not my NFTs' game</h3></div>`
					},
					description: `<p>Find the copycat NFT... </p>`,
					buttons: ["continue-tutorial"]
				},
				warningScreen: {
					content: {
						type: "markup", 
						value: `<div class="tut-screens"><h3 class="text-drippy">Warning</h3></div>`
					},
					description: `<p>Be Careful... </p>`,
					buttons: ["start-game"]
				}
			},
			__loadScreen: function (screen) {
				$(".game-stage .art").html(screen.content.value);
				$(".game-stage .desc").html(screen.description);
				$(".game-stage .buttons button").hide();
				$(screen.buttons).each(function (a, b) {
					$(`[data-action="${b}"]`).show();		
				})
			},
			showWarning: function () {
				nnd.game.tutorial.__loadScreen(nnd.game.tutorial.screens.warningScreen);	
			}, 
			prepTutorial: function () {
				nnd.game.tutorial.__loadScreen(nnd.game.tutorial.screens.splashScreen);	
			}, 
			start: function () {
				nnd.game.tutorial.__loadScreen(nnd.game.tutorial.screens.introScreen);	
			}
		},
		getNextToken: function (callback) {
			$.ajax({ 
				url: `https://metamakerx.com/notdead/nextToken/${nnd.walletReady.wallet}`,
				type: "POST", 
				success: function (data) {
					callback(data);
				}
			})
		},
		submitTokenResponse: function (id, option, callback) {
			$.ajax({ 
				url: `https://metamakerx.com/notdead/submitResponse/${nnd.walletReady.wallet}`,
				data: JSON.stringify({ id, option }), 
				processData: false, contentType: false,
				type: "POST", 
				success: function (data) {
					callback(data);
				}
			})
		},
		approve: function () {
			$("[data-action='option-approve']").prop("disabled", true);
			$("[data-action='option-reject']").prop("disabled", true);
			nnd.game.submitTokenResponse(nnd.game.most_recent_token.id, "approve", response => {

			});
		}, 
		reject: function () {
			$("[data-action='option-approve']").prop("disabled", true);
			$("[data-action='option-reject']").prop("disabled", true);
			nnd.game.submitTokenResponse(nnd.game.most_recent_token.id, "reject", response => {

			});
		},
		resetGame: function () {
			nnd.game.tutorial.prepTutorial();
		},
		startGame: function () {
			nnd.game.getNextToken(resp => {

				console.log(resp);
				nnd.game.most_recent_token = resp.token;

				$(".game-stage .art").html(`<img src="${resp.token.imageUrl}" class="gameTokenImage" />`);
				$(".game-stage .desc").html(`<div>${resp.token.name}</div><div><a target="_blank" href="${resp.token.marketPlaceLink}">${resp.token.collectionName}</a></div>`);

				$(".game-stage .buttons button").hide();
				$("[data-action='option-approve']").prop("disabled", false);
				$("[data-action='option-reject']").prop("disabled", false);
				$("[data-action='option-approve']").show();
				$("[data-action='option-reject']").show();
			})
		},
		hideGame: function () {
			$(".game-stage .art").html("<h2 class='text-drippy'>Connect to Play</h2>");
				$(".game-stage .desc").html("");
			$(".game-stage .buttons button").hide();
		}
	},
	ux: {
		attachEvents: function () {
			$("#gameConnectButton").on("click", nnd.walletReady.connect);
			$("#gameDisconnectButton").on("click", nnd.walletReady.disconnect);
		}
	},
	walletReady: {
		walletctxId: "wallet.nnd.v1",
		wallet: "0x0",
		chainId: "", chainName: "",
		save: function () {
			localStorage.setItem(nnd.walletReady.walletctxId, nnd.walletReady.wallet);
		},
		load: function () {
			let w = localStorage.getItem(nnd.walletReady.walletctxId);
			if (w) {
				nnd.walletReady.wallet = w;
			}
			if (nnd.walletReady.wallet == "0x0") {
				$("#gameDisconnectButton").hide();
				$("#gameConnectButton").show();
			} else {
				$("#gameConnectButton").hide();
				$("#gameDisconnectButton").show();
			} 		
		},
		pageInit: function () {
			console.log('pageInit');
			nnd.walletReady.load();
			nnd.walletReady.checkForConnectedWallets(function (accounts ) {
				console.log({ accounts })
				nnd.walletReady.updateWalletDetails();
				if (accounts.length > 0) {
					nnd.game.resetGame();
				}
			})
		},
		updateWalletDetails: function () {
			nnd.walletReady.chainId = window.ethereum.chainId
			if (nnd.walletReady.chainId == "0x2105") {
				$(".switchToBasePanel").hide();
			} else {
				$(".switchToBasePanel").show();
			}
			$(".walletDetails").html(`<span title="${nnd.walletReady.wallet}">${mmx.maskedAddress(nnd.walletReady.wallet)}</span>`);
		},
		checkForConnectedWallets: function (callback) {
			if (window.ethereum) {
				nnd.walletReady.chainId = window.ethereum.chainId;
				window.ethereum.request({ method: "eth_accounts" }).then ( callback );
			}
		},
		requestWalletAccess: function (callback) {
			if (window.ethereum) {
				window.ethereum.request({ method: "eth_requestAccounts" }).then ( callback );
			}
		},
		requestChainSwitch: function (newChain, callback) {
			if (window.ethereum) {
					window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{ chainId: newChain }], // chainId must be in hexadecimal numbers
					  }).then(callback);

			}
		},
		switchToBase: function () {
			nnd.walletReady.requestChainSwitch("0x2105", function () {
				nnd.walletReady.updateWalletDetails();
			});
		},
		connect: function () {
			console.log('connect');
			nnd.walletReady.requestWalletAccess(data => {

				console.log(data)
				if (data.length == 0)
				{
					nnd.walletReady.wallet = "0x0";
					$("#gameDisconnectButton").hide();
					$("#gameConnectButton").show();
					nnd.walletReady.updateWalletDetails();
					nnd.game.resetGame();
				} 
				else 
				{
					nnd.walletReady.wallet = data[0];
					$("#gameConnectButton").hide();
					$("#gameDisconnectButton").show();
					nnd.walletReady.save();
					nnd.walletReady.updateWalletDetails();
					nnd.game.resetGame();
				}

			});
		}, 
		disconnect: function () {
			console.log('disconnect')
			nnd.walletReady.wallet = "0x0";
			$("#gameDisconnectButton").hide();
			$("#gameConnectButton").show();
			nnd.game.hideGame();
			nnd.walletReady.save();
			nnd.walletReady.updateWalletDetails();
		}, 
		onAccountChanged: function (accounts) {
			console.log({accountChanged: accounts});
			nnd.walletReady.wallet = accounts[0];
			nnd.walletReady.updateWalletDetails();
		}, 
		onChainChanged: function (chainId) {
			console.log({chainChanged: chainId });
			nnd.walletReady.chainId = window.ethereum.chainId
			nnd.walletReady.updateWalletDetails();
		}
	},
	events: {
		onDocumentReady: function () {
			nnd.ux.attachEvents();
			nnd.walletReady.pageInit();
			mmx.subscribeToChainEvents(nnd.walletReady.onAccountChanged, nnd.walletReady.onChainChanged);
		}
	}
};
$(document).ready(function (andthen) {
	nnd.game.hideGame();
	nnd.events.onDocumentReady();
	andthen()
});