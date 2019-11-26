import RecordRTC from 'recordrtc';
class Tape {
	
	constructor(videoEl){
		if(!videoEl){
			throw "Tape类缺少参数";
		}
		this.videoEl = videoEl;
	}

	/**
	 * 截图方法
	 * @param {*} callback
	 * @param {*} type
	 * @param {*} fileName
	 * @returns
	 * @memberof Tape
	 */
	screenshot(callback,type='base64',fileName='截图.png'){

		//参数验证
		if(!callback){
			throw "screenshot没有传递第一个参数";
		}else if(!callback instanceof Function){
			let type = typeof callback;
			throw `screenshot第一个参数传值有误，只能传入Function类型`
		}
		if(type !== 'base64' || type !== 'file'){
			throw "screenshot第二个参数传值有误，只能传入'base64'或者'file'"
		}
		if(!fileName instanceof String){
			throw "screenshot第三个参数传值有误，只能传入String类型"
		}

		// 创建一个canvas
		const canvasEl = document.createElement('canvas')
		canvasEl.width = this.videoEl.videoWidth
		canvasEl.height = this.videoEl.videoHeight
		// 截图
		const ctx = canvasEl.getContext('2d')
		ctx.drawImage(this.videoEl, 0, 0)

		// 保存为base64
		if(type === 'base64'){
			const image = canvasEl.toDataURL('image/jpg')
			return callback(image)
		}
		
		//保存为png文件
		if(type === 'file'){
			// 处理兼容问题
			if (!HTMLCanvasElement.prototype.toBlob) {
				Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
					value: function(callback, type, quality) {
						const binStr = atob(this.toDataURL(type, quality).split(',')[1])
						const len = binStr.length
						const arr = new Uint8Array(len)
					
						for (let i = 0; i < len; i++) {
							arr[i] = binStr.charCodeAt(i)
						}
					
						callback(new Blob([arr], { type: type || 'image/png' }))
					}
				})
			}
			
			canvasEl.toBlob((blob) => {
				let pngFile = new File([blob],fileName,{type:'image/png'})
				let imageUrl = URL.createObjectURL(pngFile);
				callback(pngFile,imageUrl);
			})
			
		}

		
	}

	/**
	 *录制开始
	 *
	 * @memberof Tape
	 */
	tapeStart(){
		if(!HTMLVideoElement.prototype.captureStream && !HTMLVideoElement.prototype.mozCaptureStream){
			throw "该浏览器暂不支持录制功能"
		}

		let stream;
		if(!HTMLVideoElement.prototype.captureStream){
			stream = this.videoEl.mozCaptureStream();//兼容火狐
		}else{
			stream = this.videoEl.captureStream();
		}
		
		this.rtc = new RecordRTC(stream,{
			type:'video',
		})
		this.rtc.startRecording();
	}

	/**
	 * 暂停录制
	 *
	 * @memberof Tape
	 */
	tapePause(){
		this.rtc.pauseRecording();
	}

	/**
	 *继续录制
	 *
	 * @memberof Tape
	 */
	tapeResume(){
		this.rtc.resumeRecording();
	}

	/**
	 * 结束录制
	 *
	 * @param {*} callback
	 * @param {string} [fileName='录制.mp4']
	 * @memberof Tape
	 */
	tapeStop(callback,fileName='录制.mp4'){
		if(!callback){
			throw "tapeStop缺少第一个参数"
		}else if(!callback instanceof Function){
			let type = typeof callback;
			throw `tapeStop第一个参数传值有误，只能传入Function类型`
		}
		if(!fileName instanceof String){
			throw "tapeStop第二个参数传值有误，只能传入String类型"
		}
		let self = this;
		this.rtc.stopRecording((blobUrl) => {
			let videoBlobFile = self.rtc.getBlob();
			let vidoeFile = new File([videoBlobFile],fileName,{type:'video/mp4'})
			callback(vidoeFile,blobUrl);
		});
	}
}

export default Tape;
