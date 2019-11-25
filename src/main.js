console.log('hello word')

import RecordRTC from 'recordrtc'
class tape {
	
	constructor(videoEl){
		this.videoEl = videoEl;
	}

	//开始录制
	tapeStart(){
		this.rtc = new RecordRTC(this.videoEl,{
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

	//停止录制
	tapeStop(){
		let self = this;
		this.rtc.stopRecording((blob) => {
			let videoBlobFile = self.rtc.getBlob();
		});
	}
}

export default tape