import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import './style.css';

const bankOne = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    },
];

const bankTwo = [
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Chord-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Chord-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Chord-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Shaker',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
        keyCode: 90,
        keyTrigger: 'Z',
        id: 'Punchy-Kick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Side-Stick',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Snare',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
];

const App = () => {

    const [currentPadBank, setCurrentPadBank] = useState(bankOne);
    const [display, setDisplay] = useState('');
    const [drumPads, setDrumPads] = useState([]);
    const [slider, setSlider] = useState(50);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const dqsaDrumPads = document.querySelectorAll('.drum-pad');
        setDrumPads(dqsaDrumPads);
    }, [checked]);

    const match = event => ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'].some((item) => event.key.toLowerCase() === item);

    const onDown = event => {
        if (match(event)) {
            let btn;

            for(let i = 0, len = drumPads.length; i < len; i++){
                if(drumPads[i].getAttribute("data-btn").toLowerCase() === event.key){
                    btn = drumPads[i];
                    break
                }
            }

            updates(btn);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", onDown);
        return () => {
            window.removeEventListener("keydown", onDown);
        }
    });

    const addActiveClass = (domEl) => {
        domEl.classList.toggle('active')
    };

    const clickHandler = (event) => {
        let btn;

        for(let i = 0, len = drumPads.length; i < len; i++){
            if(drumPads[i].getAttribute("id") === event.target.id){
                btn = drumPads[i];
                break
            }
        }

        updates(btn);
    };

    const updates = (btn) => {
        const sound = btn.firstChild;
        sound.currentTime = 0;
        sound.volume = slider / 100;
        sound.play();

        addActiveClass(btn);
        setTimeout(() => addActiveClass(btn), 100);
        setDisplay(btn.getAttribute("id").replace(/-/g, ' '))
    };

    const sliderHandler = (event) => {
        setSlider(event.target.value);
    };

    const checkHandler = (event) => {
        if (event.target.checked === true){
            setCurrentPadBank(bankTwo);
            setChecked(true)
        } else {
            setCurrentPadBank(bankOne);
            setChecked(false)
        }
    };

    return (
        <div id="drum-machine">
            <div id="drum-pads">
                {
                    currentPadBank.map((item) => (
                        <button
                            key={item.id}
                            className="drum-pad button"
                            id={item.id}
                            data-btn={item.keyTrigger}
                            onClick={clickHandler}
                        >
                            <audio src={item.url}/>
                            {item.keyTrigger}
                        </button>
                    ))
                }
            </div>

            <div id="controls">
                <div id="display">
                    {display}
                </div>

                <div className="slidecontainer">
                    <input type="range" min="1" max="100" value={slider} className="slider" id="myRange" onChange={sliderHandler}/>
                </div>

                <label className="switch">
                    <input type="checkbox" onChange={checkHandler}/>
                    <span className="check"></span>
                </label>
            </div>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);