import React from 'react';
import Constants from 'expo-constants'
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const movieInfo = movie => ({
    title: movie.Title,
    year: movie.Year,
    type: movie.Type,
    imdb: movie.imdbID
});

const APIPage = async(url) => {
    try {
        const response = await fetch(`${url}`);
        const { Search } = await response.json();
        const results = Search.map(movie => movieInfo(movie));
        return results;
    } catch (err) {
        this.setState({ error: err.message })
        console.log('APIPage Error')
    }
};

const callAPI = async(url) => {
    try {
        const response = await fetch (`${url}`);
        const { fullResult } = await response.json();
        let pageNum = Math.floor(fullResult / 10);
        let searchResults = [];
        let temp = [];

        for (let i = 1; i <= pageNum; i++) {
            const multiPageResult = await APIPage(`${url}&page=${i}`);
            temp = searchResults.concat(multiPageResult);
            searchResults = temp;
        }

        return searchResults;
    } catch(err) {
        this.setState({ error: err.message });
        console.log('callAPI Error');
    }
}

class NoResults extends React.Component {
    render() {
        if (this.props.results.length < 1 && !this.props.loading) {
            return (<Text style={{ color: '#8E44AD', fontSize: 30 }}> NO RESULTS :( </Text>)
        } else {
            return null
        }
    }
}

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            results: [],
            pages: 0,
            loading: true,
        }
    }

    static navigationOptions = {
        title: 'Result'
    }

    getResults = async() => {
        const url = this.props.navigation.getParam('url', 'no-url');
        try {
            const results = await callAPI(url);
            this.setState({ results: results });
        } catch(err) {
            this.setState({ error: err.message })
        }
    }

    Timeout = () => setTimeout(() => {
        this.setState({ loading: false });
    }, 3000)

    componentWillMount() {
        this.getResults;
        this.Timeout();
    }

    onSelectMovie = movie => this.navigation.navigate('Detail', {
        title: movie.title,
        year: movie.year,
        type: movie.type,
        imdb: movie.imdb,
    })

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.searchbox}> Search: {JSON.stringify(this.props.navigation.getParam('search', 'no-search'))} </Text>
                <Text style={styles.error}> {this.state.error} </Text>
                <NoResults results={this.props.results} loading={this.props.loading} />
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.results}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.movieDetail}
                            onPress={() => this.onSelectMovie(item)}
                            key={i}>
                                <Text style={styles.data}> Title: {item.title} </Text>
                                <Text style={styles.data}> Year: {item.year} </Text>
                                <Text style={styles.data}> Type: {item.type} </Text>
                                <Text style={styles.imdb}> IMDb#: {item.imdb} </Text>
                        </TouchableOpacity>
                    )}
                />
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
    },
    error: {
        color: '#CB4335',
    },
    searchbox: {
        padding: 10,
        fontSize: 30,
    },
    data: {
        fontSize: 15,
    },
    movieDetail: {
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#48C9B0'
    }
})