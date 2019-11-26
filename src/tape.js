import RecordRTC from 'recordrtc'
class Tape {
	
	constructor(videoEl){
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
	screenshot(callback,type='file',fileName='截图.png'){

		//参数验证
		if(!callback){
			throw "截图方法没有传递回调函数";
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
				let pngFile = new File(blob,fileName,'image/png')
				callback(pngFile);
			})
			
		}

		
	}

	//开始录制
	tapeStart(){
		if(!HTMLVideoElement.prototype.caputureStream){
			throw "该浏览器暂不支持录制功能"
		}
		let stream = this.videoEl.caputureStream();
		this.rtc = new RecordRTC(stream,{
			type:'video'
		})
		this.rtc.startRecording();
	}

	//暂停录制
	tapePause(){
		this.rtc.pauseRecording();
	}

	//继续录制
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
		}
		let self = this;
		this.rtc.stopRecording((blobUrl) => {
			let videoBlobFile = self.rtc.getBlob();
			callback(videoBlobFile,blobUrl);
		});
	}
}

export default Tape;