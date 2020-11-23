import React from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import Constants from 'expo-constants';

const APIKEY = '9ed6b5f7';

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            APIURL: `http://www.omdbapi.com/?apikey=${APIKEY}&`,
            isFormValid: false,
        }
    }

    handleInput = search => {
        if (search.length > 0) {
            this.setState({ search, isFormValid: true })
        } else {
            this.setState({ search, isFormValid: false})
        }
    }

    handleSubmit = () => {
        let searchstring = this.state.search.trim().replace(/\s/g,'+').toLowerCase();
        let searchURL = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchstring}`;
        this.setState({
            APIURL: searchURL
        }, () => this.props.navigation.navigate('Result', {
            url: this.state.APIURL,
            search: this.state.search,
        }))
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='padding'>
                    <TextInput 
                        style={styles.input}
                        placeholder='Name of movie'
                        value={this.state.search}
                        onChangeText={this.handleInput}
                        autoCapitalize='words'
                        clearButtonMode='always'
                    />
                    <Button title='SEARCH' onPress={this.handleSubmit} disabled={!this.state.isFormValid} />
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E7E9',
        paddingTop: Constants.statusBarHeight,
        justifyContent: 'center',
        alignContent: 'center',
    },
    input: {
        borderColor: '#AED6F1',
        borderWidth: 1,
        marginTop: 20,
        minWidth: 50,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        fontSize: 20,
        textAlign: 'center'
    },
})