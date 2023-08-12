import MicRecorder from 'mic-recorder-to-mp3';
import { Component } from 'react';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

const recorder = new MicRecorder({ bitRate: 128 });

class AudioRecorder extends Component {
    state = {
        isRecording: false,
        blobURL: "",
        isBlocked: false,
    }

    componentDidMount(){
        navigator.getUserMedia({ audio: true },
            () => {
              console.log('Permission Granted');
              this.setState({ isBlocked: false });
            },
            () => {
              console.log('Permission Denied');
              this.setState({ isBlocked: true })
            },
        );
    }

    start = () => {
        if(this.state.isBlocked){
          console.log('Permission Denied');
        } 
        else{
            recorder
            .start()
            .then(() => {
              this.setState({ isRecording: true });
            }).catch((e) => console.error(e));
        }
    };

    convertToBase64 = async(audioFile) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onerror = reject;
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(audioFile);
        })
    }

    stop = () => {
        recorder
            .stop()
            .getMp3()
            .then( async([buffer, blob] ) => {
                const blobURL = URL.createObjectURL(blob)
                const file = new File(buffer, 'post-audio.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                });

                let audio64 = await this.convertToBase64(file);
                
                this.props.setAudio(audio64);
                this.setState({ blobURL, isRecording: false });
            }).catch((e) => console.log(e));
    };



    render(){
        return(
            <div style={{ display: "flex", alignItems: "center" }}>
                {this.state.isRecording ? 
                (<button onClick={this.stop} disabled={!this.state.isRecording} style={{ border: "none", backgroundColor: "transparent", marginRight: ".5rem", marginTop: ".5rem", cursor: "pointer", display: "inline-flex", padding: 2 }}>
                    <GraphicEqIcon />
                </button>) : (<button onClick={this.start} disabled={this.state.isRecording} style={{ border: "none", backgroundColor: "transparent", marginRight: ".5rem", marginTop: ".5rem", cursor: "pointer", display: "inline-flex", padding: 2 }}>
                    <MicRoundedIcon />
                </button>)}
                
                <audio src={this.state.blobURL} controls="controls" style={{ width: "100%", marginTop: ".8rem" }} />
                
            </div>
        )
    }
}
export default AudioRecorder;