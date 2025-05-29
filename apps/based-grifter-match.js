var bgmatch = {
	version: "1.0.0",
	game: {
		skip_intro: false,
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
				nnd.game.reportMessageResponse(nnd.game.most_recent_token.id, "approve", response);
			});
		}, 
		reject: function () {
			$("[data-action='option-approve']").prop("disabled", true);
			$("[data-action='option-reject']").prop("disabled", true);
			nnd.game.submitTokenResponse(nnd.game.most_recent_token.id, "reject", response => {
				nnd.game.reportMessageResponse(nnd.game.most_recent_token.id, "reject", response);
			});
		},
		reportMessageResponse: function (tokenId, optionValue, response) {
			console.log({ tokenId, optionValue, response });
			$(".game-stage .buttons button").hide();
			$(".result-overlay .fa").hide();
			if (response.result) {
				$("[data-action='continue-game']").show();
				$(".result-overlay .pass").show();
			} else {
				$("[data-action='restart-game']").show();
				$("[data-action='pay-to-play']").show();
				$(".result-overlay .fail").show();
			}
			nnd.ux.loadStats();
		},
		nextToken: function () {
			nnd.game.getNextToken(resp => {

				$(".result-overlay .fa").hide();
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
		restart: function () {
			nnd.game.getNextToken(resp => {
				$(".result-overlay .fa").hide();
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
		payToPlay: function () {
			$(".result-overlay .fa").hide();
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
		resetGame: function () {
			if (nnd.game.skip_intro) {
				// do something else. 
			} else {
				nnd.game.tutorial.prepTutorial();
			}
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
			$(".game-stage .art").html(`<div class="tut-screens"><h2 class='mt-4 pt-4 text-drippy'>Connect to Play</h2></div>`);
				$(".game-stage .desc").html("");
			$(".game-stage .buttons button").hide();
		}
	},
	walletReady: {
		accounts: [],
		walletctxId: "wallet.bgmatch.v1",
		wallet: "0x0",
		chainId: "", chainName: "",
		save: function () {
			localStorage.setItem(bgmatch.walletReady.walletctxId, bgmatch.walletReady.wallet);
		},
		load: function () {
			let w = localStorage.getItem(bgmatch.walletReady.walletctxId);
			if (w) {
				bgmatch.walletReady.wallet = w;
			}
			if (bgmatch.walletReady.wallet == "0x0") {
				$("#gameDisconnectButton").hide();
				$("#gameConnectButton").show();
			} else {
				$("#gameConnectButton").hide();
				$("#gameDisconnectButton").show();
			} 		
		},
		pageInit: function () {
			///console.log('pageInit');
			$(".result-overlay .fa").hide();
			bgmatch.walletReady.load();
			bgmatch.walletReady.checkForConnectedWallets(function (accounts ) {
				bgmatch.walletReady.accounts = accounts;
				//console.log(accounts);
				// setup current status
				if (bgmatch.walletReady.accounts.length == 0) {
					bgmatch.walletReady.wallet = "0x0";
					$("#gameDisconnectButton").hide();
					$("#gameConnectButton").show();
				} else {

				}

				bgmatch.ux.loadStats();

				bgmatch.walletReady.updateWalletDetails();
				if (bgmatch.walletReady.wallet != "0x0") {
					bgmatch.game.resetGame();
				}
			})
		},
		updateWalletDetails: function () {
			bgmatch.walletReady.chainId = window.ethereum.chainId
			if (bgmatch.walletReady.chainId == "0x2105") {
				$(".switchToBasePanel").hide();
			} else {
				$(".switchToBasePanel").show();
			}
			$(".walletDetails").html(`<span title="${bgmatch.walletReady.wallet}">${mmx.maskedAddress(bgmatch.walletReady.wallet)}</span>`);
		},
		checkForConnectedWallets: function (callback) {
			if (window.ethereum) {
				bgmatch.walletReady.chainId = window.ethereum.chainId;
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
			bgmatch.walletReady.requestChainSwitch("0x2105", function () {
				bgmatch.walletReady.updateWalletDetails();
			});
		},
		connect: function () {
			console.log('connect');
			bgmatch.walletReady.requestWalletAccess(data => {

				console.log(data)
				if (data.length == 0)
				{
					bgmatch.walletReady.wallet = "0x0";
					$("#gameDisconnectButton").hide();
					$("#gameConnectButton").show();
					bgmatch.walletReady.updateWalletDetails();
					bgmatch.game.resetGame();
				} 
				else 
				{
					bgmatch.walletReady.wallet = data[0];
					$("#gameConnectButton").hide();
					$("#gameDisconnectButton").show();
					bgmatch.walletReady.save();
					bgmatch.walletReady.updateWalletDetails();
					bgmatch.game.resetGame();
				}

			});
		}, 
		disconnect: function () {
			console.log('disconnect')
			bgmatch.walletReady.wallet = "0x0";
			$("#gameDisconnectButton").hide();
			$("#gameConnectButton").show();
			bgmatch.game.hideGame();
			bgmatch.walletReady.save();
			bgmatch.walletReady.updateWalletDetails();
		}, 
		onAccountChanged: function (accounts) {
			console.log({accountChanged: accounts});
			bgmatch.walletReady.wallet = accounts[0];
			bgmatch.walletReady.updateWalletDetails();
		}, 
		onChainChanged: function (chainId) {
			console.log({chainChanged: chainId });
			bgmatch.walletReady.chainId = window.ethereum.chainId
			bgmatch.walletReady.updateWalletDetails();
		}
	},
	ux: {
		attachEvents: function () { 
			$("#gameConnectButton").on("click", nnd.walletReady.connect);
			$("#gameDisconnectButton").on("click", nnd.walletReady.disconnect);
		}, 
		loadStats: function () {			
			$.ajax({
				url: `https://metamakerx.com/notdead/stats/${nnd.walletReady.wallet}`, type: "POST", 
				success: function (data) {
					
					if (nnd.walletReady.wallet == "0x0") {
						$(".scorecard .value").text("0");
						$(".streak .value").text("0");
					} else {
						$(".scorecard .value").text(data.stats.xp.toLocaleString());
						$(".streak .value").text(data.stats.best);
					}

					
					$(".appVersion .value").text(nnd.version);
				}
			})
		}
	},
	onPageLoaded: function (ev) {
		bgmatch.game.hideGame();
		bgmatch.ux.attachEvents();
		bgmatch.walletReady.pageInit();
		mmx.subscribeToChainEvents(bgmatch.walletReady.onAccountChanged, bgmatch.walletReady.onChainChanged);
	}
};