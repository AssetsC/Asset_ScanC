import React, { Component } from 'react';
import { BrowserQRCodeReader} from '@zxing/library';
import swal from 'sweetalert2';

class App extends Component {
  constructor(props){
    super(props);
    this.cameraScanner = this.cameraScanner.bind(this);
    
    this.cameraScanner();
  }

  cameraScanner(){
      const codeReader = new BrowserQRCodeReader();
      codeReader.getVideoInputDevices().then(videoInputDevices => {

      const firstDeviceId = videoInputDevices[0].deviceId;
      
      codeReader.decodeFromInputVideoDevice(firstDeviceId, 'video')
      .then(result => {
            let res = result.text;

            if(/material\/description/.test(res)){
              swal({
                type: 'success',
                title: 'ทำการสแกนเรียบร้อย',
                text: "กรุณากดปุ่ม ตกลง เพื่อเข้าหน้าอุปกรณ์",
                confirmButtonText: "ตกลง"
              }).then(data=>{
                  if(data.value)
                    window.location.href = res;
              });
            }else
                alert(result.text);
        
      }).catch(err => console.error(err));
    }).catch(err => console.error(err));
  } 

  render() {
    return (
      <div>
          <h1 style={style.center}>Asset Scanner</h1>
          <div style={style.camera}> 
              <video id="video" style={{"margin":"auto","borderRadius":"30px","padding" : "15px","boxShadow":"0px 0px 3px grey"}}></video>
          </div>    
      </div>
    );
  }
}

const style = {
    "center" : {
      "textAlign":"center"
    },
    "camera" : {
      "display":"flex",
      "width" : "100%"
    }
}

export default App;
