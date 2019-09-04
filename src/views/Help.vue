<template>
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
						<div class="col">
							<p class="display-4 text-center">I HAZ A QUESTIOMEN</p>
							<p class="lead mb-0"><i class="fal fa-user-secret"></i> Am I Anonymous when I post?</p>
							<p class="font-chan-normal small">While you didn't have to undergo any KYC process to create your Wallet, the ETH was most likely coming from an exchange that you did KYC on. No normal person will be able to get that KYC, but Lawenforcement and glow-in-the-darks can use this information. Also you are submitting an IP everytime you initiate a transaction to your web3 provider (e.g. Infura). Combined with a clear ledger on the blockchain allow certain people to profile your pseudo-anonymous ETH wallet and maybe find out who you are.</p>

							<p class="lead mb-0"><i class="fal fa-question"></i> Is it even possible to be anon then?</p>
							<p class="small font-chan-normal">There are ways to put a veil on your online tracks. Be mindful tho, that any service you didn't create yourself is a potential risk of being spied on or deliberately leaking data to another party. You should never rely on a single method alone to keep you safe. That being said, here are some ways you can stop people spying on you.</p>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<p class="display-4 text-center">zOMG ANSWER PLS</p>

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
</template>