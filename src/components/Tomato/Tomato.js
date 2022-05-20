import './Tomato.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faArrowsRotate, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

function Tomato() {
	
	const [settings, setSettings] = useState({session: 25, break: 5});
	const [timer, setTimer] = useState({minutes: '25', seconds: '00'});
	
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
			
			<h2 className="title">Session</h2>
			<div className="session-container">
				<div className='session-value'>{timer.minutes}:{timer.seconds}</div>
				<div className='controls-container'>
					<span className='icon-container'>
						<FontAwesomeIcon icon={faPlay} />
					</span>
					<span className='icon-container'>
						<FontAwesomeIcon icon={faPause} />
					</span>
					<span className='icon-container'>
						<FontAwesomeIcon icon={faArrowsRotate} />
					</span>
				</div>
			</div>

			<h2 className="title">Session Length</h2>
			<div className="setting-container">
				<span className='icon-container' onClick={()=> editSettings('session', -1)}>
					<FontAwesomeIcon icon={faArrowDown} />
				</span>
				<div className="setting-value">{settings.session}</div>
				<span className='icon-container' onClick={()=> editSettings('session', 1)}>
					<FontAwesomeIcon icon={faArrowUp} />
				</span>
			</div>
			
			<h2 className="title">Break Length</h2>
			<div className="setting-container">
				<span className='icon-container' onClick={()=> editSettings('break', -1)}>
					<FontAwesomeIcon icon={faArrowDown} />
				</span>
				<div className="setting-value">{settings.break}</div>
				<span className='icon-container' onClick={()=> editSettings('break', +1)}>
					<FontAwesomeIcon icon={faArrowUp} />
				</span>
			</div>
			
		</div>
		);
	}
	
	export default Tomato;
	