import React from 'react';
import { StyleSheet, Picker } from 'react-native';

export default class TimerPicker extends React.Component {
	setuptime(number) {
		if (number < 10) {
			return '0' + number.toString();
		} else {
			return number.toString();
		}
	}

	render() {
		return (
			<Picker 
				style={styles.picker}
				selectedValue={this.props.currentValue}
				onValueChange={(value, index) => this.props.onValueChange(value, index)}>

				{ Array(this.props.maxValue + 1).fill(null).map((item, index) => {
					return (
						<Picker.Item label={this.setuptime(index)} value={index} key={index} />);
				})}
			</Picker>
		);	
	}
}

const styles = StyleSheet.create({
	picker: {
		width: 100,
	}
})