import React, {Component} from 'react';
import './Metronome.css';
import click1 from './click1.wav'
import click2 from './click2.wav'


class Metronome extends Component {
    constructor(props) {
        super(props)

        this.click1 = new Audio(click1)
        this.state ={
            playing: false,
            bpm:100,
            count:0,
            beatsPerMeasure: 4
        }
    }
    handleBpmChange = (event) => {
        const bpm = event.target.value;
        if(this.state.playing) {
            this.timer = setInterval(this.playclick,(60/this.state.bpm*1000)
                
            , this.count);
        }else {
        this.setState({bpm})
        }
    }
    playclick = () => {
        const { count, beatsPerMeasure }= this.state

        if (count % beatsPerMeasure === 0) {
            this.click1.play()
        } else {
            this.click2.play()
        }
        this.setState(state => ({
            count: (state.count+1) % state.beatsPerMeasure
        }))
        }
    }

    startStop = () => {
        if(this.state.playing){
            clearInterval(this.timer)
            this.setState({
                //stop logic
                playing: false
            })  
        } else {
            //start logic
            this.timer = setInterval(
                this.playClick,(60/this.state.bpm)*1000
            )
            this.setState( {
                count: 0,
                playing: true
            }, 
            this.playClick
            )
        }
       // this.click1.play()
    }
    render() {
        const {playing, bpm} = this.state
        return (
        <div className='metronome'>
            <div className="bpm-slider">
            <div>{bpm} BPM </div>
            <input type='range' min ='35' max='250' value={bpm} onChange={this.handleBpmChange}/>
            </div>
            <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'} </button>
        </div>
        )
    }

}

export default Metronome