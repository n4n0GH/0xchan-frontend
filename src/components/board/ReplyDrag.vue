<template>
	<vue-draggable-resizable :min-width="width" :h="height" @dragging="onDrag" :parent="true" style="z-index:99999" drag-handle=".card-header" :x="posx" :y="posy">
		<div class="card card-chan" style="width:300px; position:fixed;">
			<div class="card-header bg-chan border-bottom-0 pl-2 py-1" style="cursor:move;">
				<div class="row small">
					<div class="col pl-3 pr-0 py-1">
						<p class="mb-0 font-chan-red">
							Quick Reply
						</p>
					</div>
					<div class="col-auto pr-1">
						<p class="mb-0 font-chan-red">
							<button style="line-height: 1rem;" class="mt-1 p-0 px-1 btn btn-outline-chan-red text-mono" @click="close()">&times;</button>
						</p>
					</div>
				</div>
			</div>
			<div class="card-body bg-chan-light p-0 text-overflow">
				<div class="input-group">
					<input type="text" class="form-control small p-0 rounded-0 border-left-0 border-chan-red" placeholder="Name (optional)" v-model="postContent.name">
					<input type="text" class="form-control small p-0 rounded-0 border-right-0 border-chan-red" placeholder="Options (optional)" v-model="postContent.options">
				</div>
				<textarea name="comment" class="form-control p-0 rounded-0 border-top-0 border-left-0 border-right-0 border-chan-red" id="quickReply" rows="4" placeholder="Comment" v-model="postContent.text"></textarea>
				<input type="file">
			</div>
			<div class="card-footer bg-chan-light border-top-0 p-0 input-group" v-if="getPayment == 'none'">
				<button class="form-control btn btn-outline-chan rounded-0 border-left-0 border-bottom-0"><i class="fab fa-creative-commons-zero"></i> Post with ZCH</button>
				<button class="form-control btn btn-outline-chan rounded-0 border-left-0 border-bottom-0 border-right-0 px-auto"><i class="fab fa-ethereum"></i> Post with ETH</button>
			</div>
			<div class="card-footer bg-chan-light border-top-0 p-0 input-group" v-else>
				<button class="form-control btn btn-outline-chan rounded-0 border-left-0 border-bottom-0 border-right-0 px-auto" v-if="getPayment == 'zch'" @click="emitPost()"><i class="fab fa-creative-commons-zero"></i> Post</button>
				<button class="form-control btn btn-outline-chan rounded-0 border-left-0 border-bottom-0 border-right-0 px-auto" v-if="getPayment == 'eth'"><i class="fab fa-ethereum"></i> Post</button>
			</div>
		</div>
	</vue-draggable-resizable>
</template>

<script>
	import VueDraggableResizable from 'vue-draggable-resizable'
	import {eBus} from '../EventBus.js'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		data(){
			return{
				width: 10,
				height: 10,
				x: 0,
				y: 0,
				postContent: {
					name: '',
					options: '',
					text: '',
					file: null,
					replyTo: []
				}
			}
		},
		components: {
			VueDraggableResizable
		},
		props: {
			posx: {
				default: 0
			},
			posy: {
				default: 0
			},
			replyContent: {
				default: ''
			}
		},
		methods: {
			onDrag(x, y) {
				this.x = x
				this.y = y
			},
			close(){
				eBus.$emit('closeReply')
			},
			emitPost(){
				console.log(this.postContent)
				eBus.$emit('writePost', this.postContent)
			}
		},
		computed: {
			...mapGetters([
				'getPayment'
			])
		},
		mounted(){
			this.x = this.posx
			this.y = this.posy
			this.postContent.text = ">>"+this.replyContent+"\n"
			this.postContent.replyTo.push(this.replyContent)
			eBus.$on('addReply', p => {
				this.postContent.replyTo.push(p)
				this.postContent.text += ">>"+p+"\n"
			})
		}
	}
</script>