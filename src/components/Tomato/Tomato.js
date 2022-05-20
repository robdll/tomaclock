import './Tomato.css';
import { useState } from 'react';

function Tomato() {
    
    const [settings, setSettings] = useState({session: 25, break: 5});
    const [timer, setTimer] = useState(25);
    
    const editSettings =  (type, val) => {
        const newSettings = { ...settings }
        newSettings[type] +=val;
        if(newSettings[type] > 60) {
            newSettings[type] = 60
        }
        if(newSettings[type] < 1) {
            newSettings[type] = 1
        }
        
        setSettings(newSettings)
    }
    
    return (
        <div className="Tomato">
        <h2 className="title">Session Length</h2>
        <div className="setting-container">
        <span onClick={()=> editSettings('session', -1)}>-</span>
        <div>{settings.session}</div>
        <span onClick={()=> editSettings('session', 1)}>+</span>
        </div>
        <h2 className="title">Break Length</h2>
        <div className="setting-container">
        <span onClick={()=> editSettings('break', -1)}>-</span>
        <div>{settings.break}</div>
        <span onClick={()=> editSettings('break', +1)}>+</span>
        </div>
        <h2 className="title">Session</h2>
        <div className="session-container">
        <div>value</div>
        </div>
        <div className='controls-container'>
        <span>Play</span>
        <div>Pause</div>
        <span>Restart</span>
        </div>
        </div>
        );
    }
    
    export default Tomato;
    