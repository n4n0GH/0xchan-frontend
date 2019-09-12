<template>
	<div class="container-fluid">
		<div class="row">
			<div class="pr-0 w-100">
				<div class="card card-chan mb-2">
					<div class="card-header bg-chan p-0 border-0">
						<div class="row">
							<div class="col pl-4 py-1">
								<p class="mb-0 font-chan-red">
									<span class="post-subject font-weight-bold">
										Help
									</span>
								</p>
							</div>
						</div>
					</div>
					<div class="card-body bg-chan-light">
						<div class="row">
							<div class="col-12 col-lg text-justify">
								<p class="display-4 text-center">Using 0xchan</p>

								<p class="lead mb-0"><i class="fal fa-question"></i> What is this?</p>
								<p class="font-chan-normal small">TL;DR 0xchan is a decentralized imageboard where users partake not only in a sortition based moderation system, but are also part of a distributed rewards system. 0xchan can not be shut down, even if the glow-in-darks want it to be. The frontend is open source and can be run locally on anyones computer, the "database" is a smart contract on the Ethereum network and the media storage is hosted via IPFS. Decentralized. Immutable. Censorship resistant.</p>

								<p class="lead mb-0"><i class="fal fa-comments-dollar"></i> I have to pay to interact with 0xchan?</p>
								<p class="font-chan-normal small">Yes. The amount paid for different interactions is being redistributed among the community. 80% of the paid amount will be redistributed to all stake holders, 15% will be used to purchase P3D, 5% will be used as reserve funds to settle expenses. Here's a price list for reference:</p>
								<ul class="list-group mb-3">
									<li class="list-group-item bg-chan d-flex justify-content-between">Posting a new thread or reply <span class="badge bg-chan-light">1 ZCH</span></li>
									<li class="list-group-item bg-chan d-flex justify-content-between">Filing a report <span class="badge bg-chan-light">10 ZCH</span></li>
									<li class="list-group-item bg-chan d-flex justify-content-between">Creating a new board <span class="badge bg-chan-light">100 ZCH</span></li>
								</ul>

								<p class="lead mb-0"><i class="fab fa-ethereum"></i> Can't I use ETH instead?</p>
								<p class="font-chan-normal small">Users can also opt to pay with ETH instead of holding any ZCH. The conversion rate is 1 ZCH = 0.0001 ETH.</p>

								<p class="lead mb-0"><i class="fal fa-lock-alt"></i> Why do I have to "stake" ETH?</p>
								<p class="font-chan-normal small">The stake is used as a collateral and deterrent to enforce a working moderation. Should a user post questionable content and that content gets reported, voted on and found to be not suitable to stay on 0xchan, will the stake of the offending user be liquidated and used to purchase P3D. Users can withdraw their stake at any time if they haven't made any posts in the last 24 hours and there's no open dispute.</p>

								<p class="lead mb-0"><i class="fal fa-treasure-chest"></i> What is P3D?</p>
								<p class="font-chan-normal small">P3D is a dividends generating token that is the base for a bigger ecosystem on the Ethereum network. Token holders are rewarded dividends based on transaction volume on the P3D smart contract. 0xchan will hold P3D tokens, generate dividends and enable users to take part in a small passive income opportunity.</p>

								<p class="lead mb-0"><i class="fal fa-comment-alt-exclamation"></i> What is a tripcode?</p>
								<p class="font-chan-normal small">0xchan permits the use of names on posts. If you absolutely have to identify yourself consistently through the course of a discussion, you can use a tripcode to identify yourself, but also keep others from pretending to be you. Just fill the name field in the post form, followed by a hash or pound-sign and then any 8 character string you want like so: <code>yourname#yourpass</code> which would result in your name reading <code>yourname!2uxUos2Ruo</code>. Tripcodes are optional and free to use. Try it out!</p>
								<div class="input-group">
									<input class="text-center form-control border-right-0 border-chan-red" type="text" placeholder="yourname#yourpass" v-model="inputText">
									<button class="rounded-0 btn btn-outline-chan" @click="toTrip()"><i class="fal fa-arrow-square-right"></i> Convert</button>
									<input type="text" class="text-center form-control border-chan-red border-left-0 bg-chan" placeholder="yourname!yourtrip" :value="outputText" disabled>
								</div>

							</div>

							<div class="col-12 col-lg text-justify">
								<p class="display-4 text-center">Your Privacy</p>

								<p class="lead mb-0"><i class="fal fa-user-secret"></i> Am I Anonymous when I post?</p>
								<p class="font-chan-normal small">While you didn't have to undergo any KYC process to create your Wallet, the ETH was most likely coming from an exchange that you did KYC on. No normal person will be able to get that KYC, but Lawenforcement and glow-in-the-darks can use this information. Also you are submitting an IP everytime you initiate a transaction to your web3 provider (e.g. Infura). Combined with a clear ledger on the blockchain allow certain people to profile your pseudo-anonymous ETH wallet and maybe find out who you are.</p>

								<p class="lead mb-0"><i class="fal fa-question"></i> Is it even possible to be anon then?</p>
								<p class="small font-chan-normal">There are ways to put a veil on your online tracks. Be mindful tho, that any service you didn't create yourself is a potential risk of being spied on or deliberately leaking data to another party. You should never rely on a single method alone to keep you safe. That being said, here are some ways you can stop people spying on you.</p>

								<p class="lead mb-0"><i class="fal fa-layer-group"></i> The Onion Router</p>
								<p class="font-chan-normal small">TOR works by having the user connect to a network of relays and bouncing the request from one node to another until an exit node is reached and the user is served with their requested resource. It is probably the most notorious and known way of accessing le dark webz and getting rid of spies. Using TOR is usually very slow, as the network is operated by regular humans that don't have massive data centers. Recently it has been uncovered that many entry and exit nodes are actually operated by three letter agencies, and apparently many intelligence agencies have sufficient tools to attack the network and still spy on it's users. If that is true or not is another story.</p>
								<p class="font-chan-normal small">Find out more about The Onion Router: <a href="https://www.torproject.org/" target="_blank">TOR Project website</a></p>

								<p class="lead mb-0"><i class="fal fa-network-wired"></i> Virtual Private Network</p>
								<p class="font-chan-normal small">A VPN creates a direct tunneled connection between you and a single end-point which acts as your new DNS to resolve your request. The connection to that end-point is protected with good encryption, however whoever operates the end-point is able to decipher your traffic and log packages. Many VPN providers claim to not log their user's traffic. Oddly enough users of such services get nipped in the bud quite frequently.</p>
								<p class="font-chan-normal small">Find out more about Virtual Private Networks: <a href="https://en.wikipedia.org/wiki/Virtual_private_network" target="_blank">Wikipedia EN</a></p>

								<p class="lead mb-0"><i class="fal fa-random"></i> Ethereum Mixer</p>
								<p class="font-chan-normal small">The goal of a so called Mixer is to hide which Ethereum address belongs to you. It usually works by providing a new address you want the Ether to be sent to, as well as actually sending Ether to the service. You'll receive new Ether from a pool to a new address and your old Ether is sent to the pool for other users. There are many mixers available (i.e. eth-mixer.com, tornado.cash) and we don't recommend specific mixing services. Although tornado.cash does get the benefit for incorporating <a href="https://blog.ethereum.org/2016/12/05/zksnarks-in-a-nutshell/" target="_blank">zkSnarks</a> into it's protocol and using smart contracts to trustlessly operate. Do your due diligence and research before using any kind of mixer.</p>
								<p class="font-chan-normal small">Please note: use a mixer to supply your unlinked wallet with gas for your Ethereum transactions as well!</p>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Tripcode from 'tripcode'

	export default {
		data(){
			return{
				inputText: 'yourname#yourpass',
				tripText: '2uxUos2Ruo',
				nameFag: 'yourname'
			}
		},
		methods: {
			toTrip(){
				this.tripText = Tripcode(this.inputText.split('#')[1].slice(0,8))
				this.nameFag = this.inputText.split('#')[0]
			}
		},
		computed:{
			outputText(){
				return this.nameFag+'!'+this.tripText
			}
		}
	}
</script>