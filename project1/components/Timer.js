import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { TimerPicker } from './index';
import { vibrate } from './../utils';

export default class Timer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			startminute: 25,
			startsecond: 0,
			isPaused: true,
			inWork: true,
			initial: {
				work: {
					minute: 25,
					second: 0, 
				},
				break: {
					minute: 5,
					second: 0,
				},
			},
		}

		this.tick = this.tick.bind(this);
	}

	getInitialValue() {
		if(this.state.inWork) {
			return this.state.initial.work;
		}
		return this.state.initial.break;
	}

	timerChange(value, type) {
		if(!this.state.isPaused) {
			return;
		}
		let newState = {};
		newState['start' + type] = value;
		this.setState(newState);
	}

	decreaseTime(type) {
		if(this.state['start' + type] == 0) {
			return;
		}
		this.setState(prevState => {
			let newState = {};
			newState['start' + type] = --prevState['start' + type];
			return newState;
		});
	}

	tick() {
		const min = this.state.startminute;
		const sec = this.state.startsecond;
		if(min == 0 && sec == 0) {
			this.isDone();
		} else if (sec == 0) {
			this.setState({ startsecond: 59 });
			this.decreaseTime('minute');
		} else {
			this.decreaseTime('second');
		}
	}

	isDone() {
		this.setState(prevState => {return { inWork: !prevState.inWork }});
		this.resetTimer();
		vibrate();
	}

	resetTimer() {
		let newState = {};
		if(!this.state.isPaused) {
			newState['isPaused'] = true;
			clearInterval(this.intervalID);
		}
		newState['startminute'] = this.getInitialValue().minute;
		newState['startsecond'] = this.getInitialValue().second;
		this.setState(newState);
	}

	handleStart() {
		if(this.state.isPaused) {
			this.intervalID = setInterval(this.tick, 1000);
		} else {
			clearInterval(this.intervalID);
		}
		this.setState({ isPaused: !this.state.isPaused });
	}

	handleSet() {
		let initial = this.state.initial;
		if(this.state.inWork) {
			initial.work.minute = this.state.startminute;
			initial.work.second = this.state.startsecond;
		} else {
			initial.break.minute = this.state.startminute;
			initial.break.second = this.state.startsecond;
		}
		this.setState({ initial: initial });
	}

	handleReset() {
		this.resetTimer()
	}

	render() {
		return (
			<View>
				<Text style={styles.titleStyle}> Pomodoro Timer </Text>
				<Text style={styles.workStyle}>
					it's time for...
					<Text style={styles.modeStyle}> {this.state.inWork ? 'WORK :( ' : 'RELAX :)'} </Text>
				</Text>
				
				<View style={styles.flexRow}>
					<TimerPicker
						maxValue={99}
						currentValue={this.state.startminute}
						onValueChange={(value) => {this.timerChange(value, 'minute')}} />

					<Text style={styles.fontSize}> : </Text>

					<TimerPicker
						maxValue={59}
						currentValue={this.state.startsecond}
						onValueChange={(value) => {this.timerChange(value, 'second')}} />
				</View>

				<View>
					<TouchableOpacity 
						style={[styles.buttonStyle, {borderColor: '#FF0000'}]}
						onPress={() => this.handleStart()} >
						<Text style={[styles.buttonFonts, {color: '#FF0000'}]}> 
							{this.state.isPaused ? 'Start' : 'Pause'}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.buttonStyle, {borderColor: '#0066FF'}]}
						onPress={() => this.handleSet()} >
						<Text style={[styles.buttonFonts, {color: '#0066FF'}]}> Customer </Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.buttonStyle, {borderColor: '#009900'}]}
						onPress={() => this.handleSet()} >
						<Text style={[styles.buttonFonts, {color: '#009900'}]}> Reset </Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	flexRow: {
		display: 'flex',
		flexDirection: 'row',
    	alignItems: 'center',
    	justifyContent: 'center',
	},
	workStyle: {
		alignItems: 'center',
		fontSize: 15,
		padding: 20,
	},
	modeStyle: {
		fontSize: 30,
		justifyContent: 'center',
	},
	titleStyle: {
		fontSize: 50,
		color: '#0066FF',
		marginTop: 2,
	},
	buttonStyle: {
    	marginTop: 20,
    	paddingTop: 10,
    	paddingBottom: 10,
		borderRadius:  10,
		borderWidth: 0.5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonFonts: {
		textAlign: 'center',
		fontSize: 20,
	}
})