# 基于video标签中视频的截图和视频录制

## 兼容问题

|功能|谷歌|火狐|IE|Eage|Safari|
|:-:|:-:|:-:|:-:|:-:|:-:|
|截图|true|1.5|true|12|true|
|录制|62|15|false|false|false|

## 安装

```bash
npm install video-tape.js
```

```js
import Tape from 'video-tape.js'
```

## 示范

```js
improt Tape from 'video-tape.js'

//截图
imgge(){
	let videoEl = document.getElementById('videoElement');
	let tape = new Tape(videoEl);
	tape.screenshot((imageFile,imageUrl) => {
		//在这里对图片处理或这拿到URl进行渲染
	},'file')
}

//录制
video(){
	let videoEl = document.getElementById('videoElement');
	let tape = new Tape(videoEl);

	//开始
	tape.tapeStart();

	setTimeout(() => {
		//结束
		this.tape.tapeStop((videoFile,videoUrl) => {
			//在这里播放录制的视频或者对视频文件处理	
		})
	},3000)
}
```

## Api

```js
import Tape from 'video-tape.js'

let videoEl = document.getElementById('videoElement');

//创建Tape对象时，必须传入一个video对象
let tape = new Tape(videoEl);

//截图方法
tape.screenshot((base64) => {},'base64')

//录制开始
tape.tapeStart()

//录制暂停
tape.tapePause()

//录制继续
tape.tapeResume()

//录制结束
tape.tapeStop((videoFile,fileUrl) => {},fileName)
```

|方法名|参数|参数类型|描述|
|:-:|:-:|:-:|:-:|
|screenshot|callback,[type],[fileName]|fcuntion,string,string|`type`可选`base64`和`file`，如果不传则默认`base64`，并且`callback`只会返回一个参数，内容为截图的base64。如果`type`值为`file`，则`fileName`参数可传文件名，默认值为：`截图.png`，并且`callback`有两个参数，第一个参数为图片文件，第二个参数为可用于`<img>`标签展示的URL。|
|tapeStart|无|无|无|
|tapePause|无|无|无|
|tapeResume|无|无|无|
|tapeStop|callback,[fileName]|function,string|`callback`第一个参数为`mp4`格式的视频文件，第二个参数为可以在`<video>`中直接播放的URL。`fileName`为文件名，默认为：`录制.mp4`|
