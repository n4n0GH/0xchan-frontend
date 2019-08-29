# 0xchan
0xchan is a decentralized and immutable message board system on the Ethereum blockchain where users can post messages and media files. Storage of those messages is handled via IPFS and a smart contract is used to store a ledger of all messages.

A proof of stake style mechanism ensures quality content and protects the system against spam, while also incentivising users to stake their Ether.

The immutable and decentralized nature of the system allows for free speech and gives way to create truly censorship resistant and self sustaining platforms.

## Local Setup
If you want to run this interface on your own machine and maybe tweak some code, here's how to:

```
git clone https://github.com/n4n0GH/0xchan-mainnet
cd 0xchan-mainnet
npm install
npm run serve
```
Afterwards use any browser you want (although a connected Ethereum wallet is needed for interaction) and visit the address given by the CLI (usually localhost:8080)

The interface is made with VueJS, so you should also check out their documentation as well if you want to change things in this codebase.

## TODO
- [ ] Create 'reply' input
- [ ] Add "force anonymous" setting -> will render all names as "Anonymous"
- [ ] Re-Scrape content deep to get full threads and be able to simulate the JSON parsing properly in it's entirety before Sergey eats all the big macs
- [ ] Create pagination for board view
- [ ] Create catalog view for each board
- [ ] Cache IPFS returns to minimize load times and prevent double-fetching
- [ ] Sort Boardlist by single, double and tripple chars, then by alphabet for each
- [ ] Have 'reply' input open up on clicking either the (you) button or the post number (imitate functionality of 4chan)
- [ ] Make 'reply' a z-index 9999999 floating and draggable element
- [ ] Create vote page and subpages
- [ ] DEVELOPERS DEVELOPERS DEVELOPERS
- [ ] Add reverse image lookup
- [ ] Make vue-router wait for all content to be loaded before switching views
	-> might require to create single components for all content
- [ ] Include "ANN" function in smart contract (ANNs stored on IPFS, Qm~ stored on chain)
- [ ] Add parser for certain user inputs (like [code] blocks)
- [ ] Add parser to detect >>number in a user post and turn that into a link to the post
- [ ] Create limited cache in vuex to store images/text temporarily and prevent double downloads
- [ ] Create modal functionality
- [ ] Add reporting function
- [ ] Introduce web3
- [ ] Deploy smart contract (testnet)
- [ ] Sanitize user input data
- [ ] Release interface on Github
- [ ] Bug testing smart contract (testnet)
- [ ] Deploy smart contract (mainnet)
- [ ] Har(j)berger Tax minigame for the banner component (credit to Troopy)
- [ ] Write documentation
- [ ] Integrate Walletconnect to enable shitposting on the PC, but paying with your phone
	-> autodetect whether or not metamask is installed and present Walletconnect login as alternative automatically
- [ ] Host interface on IPFS

## DONE
- [x] Create 'new thread' input
- [x] Create 'custom' css input -> store in vuex, place with vue-head (see App.vue)
- [x] Change CSS based on NSFW on (Yotsuba B) or off (Yotsuba)
- [x] Add possibility for future themes to be added to the interface, selectable in the settings menu
- [x] Add user setting to disable the loading of images (default: false)
- [x] Create link around images to open them
- [x] Include Fontawesome locally
- [x] Found spot to place settings and new board buttons
- [x] Banners now random
- [x] Make sure boardlist in navbar overflows properly
- [x] I hate browsers and their fucking ooh look at me I'm so special I interpret things differently!
- [x] Fixed issue were newest posts produced links that you could not use "return" button from
- [x] Boardlist sorts automatically by alphabet
- [x] Make newest posts on index link to their thread and board
- [x] Report button float right pls
- [x] Include punchline in Board.vue
- [x] Make single thread view work with arbitrary data
- [x] Streamlined bool operations in vuex states
- [x] Add card-footer to Post.vue to display (you) button and links to posts replying to this post
- [x] Lazyload images to reduce requests fired
- [x] Reduce space taken up by hidden threads
- [x] Make board view work with arbitrary data
- [x] Hide threads function
- [x] Scrape 4chan for demo content
- [x] Create components and views
- [x] Use JSON to generate a boardlist
- [x] Use JSON to populate a board view
- [x] Scroll behaviour on vue-router native-like
- [x] Decide what exactly to store on-chain and what to outsource to IPFS
- [x] Come up with optimal structure for JSON files on IPFS
- [x] Make 'npm run serve' auto open the default browser
- [x] Hide threads and use vuex to store
- [x] Use vuex-persistedstate to remember all the things