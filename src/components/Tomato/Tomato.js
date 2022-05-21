import './Tomato.css';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faArrowsRotate, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
const alarm = require('./../../resources/alarm.wav');

function Tomato() {
	const audRef = useRef(null);

	const [settings, setSettings] = useState({session: 25, break: 5});
	const [timer, setTimer] = useState({
		minutes: '25', 
		seconds: '00', 
		active: false, 
		isBreak: false
	});
	

	useEffect(() => {
		let timerInterval;
		if(timer.active) {
			timerInterval = setInterval(() => {
				let seconds = parseInt(timer.seconds);
				let minutes = parseInt(timer.minutes);
				if(seconds === 0 && minutes === 0) {
				 	setTimer( {
				 		minutes: settings.isBreak ? settings.session : settings.break, 
				 		seconds: '00', 
				 		active: true, 
				 		isBreak: !settings.isBreak
				 	})
					playAudio()
				} else if(seconds === 0) {
					const newTimer = {
						...timer,
						minutes: timer.minutes-1,
						seconds: '59',
					}
				 	setTimer( newTimer)
				} else {
					seconds = seconds - 1;
					setTimer( {
						...timer,
						seconds: seconds < 10 ? '0'+seconds : seconds+''
					})
				}
			}, 1000);
		} else {
			clearInterval(timerInterval);
		}

		return function cleanup() {
			clearInterval(timerInterval);
		};
	}, [timer, settings]);

	const playAudio = () => {
		console.log('here', audRef)
		audRef.current.play();
	}

	  
	const toggleTimer = (value) => {
		setTimer({ ...timer, active: value})
	}

	const refreshTimer = () => {
		setTimer({ 
			minutes: settings.session,
			seconds: '00', 
			active: false,
			isBreak: false
		})
	}

	const editSettings =  (type, val) => {
		if(timer.active) return
		const newSettings = { ...settings }
		newSettings[type] +=val;
		if(newSettings[type] > 60) {
			newSettings[type] = 60
		}
		if(newSettings[type] < 1) {
			newSettings[type] = 1
		}
		setSettings(newSettings)
		if(type === 'session' && !timer.isBreak) {
			setTimer({
				...timer,
				minutes: newSettings[type],
				seconds: '00'
			})
		}
		
	}

	return (
		<div className="Tomato">
			
			<h2 className="title">{settings.isBreak ? 'Break' : 'Session'}</h2>
			<div className="session-container">
				<div className='session-value'>{timer.minutes}:{timer.seconds}</div>
				<div className='controls-container'>
					<span className='icon-container'>
						<FontAwesomeIcon onClick={()=>{ toggleTimer(true)}} icon={faPlay} />
					</span>
					<span className='icon-container'>
						<FontAwesomeIcon onClick={()=>{ toggleTimer(false)}} icon={faPause} />
					</span>
					<span className='icon-container'>
						<FontAwesomeIcon onClick={()=>{ refreshTimer()}} icon={faArrowsRotate} />
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
			<audio controls src={alarm} ref={audRef} hidden />
			</div>
		);
	}
	
	export default Tomato;
	