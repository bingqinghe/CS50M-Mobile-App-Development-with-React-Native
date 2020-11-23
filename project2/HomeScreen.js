import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    }

    render() {
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}> MOVIE BROWSER </Text>
                </View>
                <View style={styles.searchbox}>
                    <Button
                        title='Go To Search'
                        onPress={() => this.props.navigation.navigate('Search')}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#E5E7E9',
            paddingTop: Constants.statusBarHeight,
            justifyContent: 'center',
        },
        title: {
            textAlign: 'center',
            fontSize: 45,
            fontWeight: 'bold',
        },
        searchbox: {
            marginTop: 25,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#AED6F1',
        }
    }
)