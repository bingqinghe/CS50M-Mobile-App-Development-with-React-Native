import React from 'react';
import Constants from 'expo-constants';
import { View, Image, Platform, Scrollview, StyleSheet } from 'react-native';

const movieInfo = movie => ({
    title: movie.Title,
    year: movie.Year,
    rated: movie.Rated,
    released: movie.Released,
    runtime: movie.Runtime,
    genre: movie.Genre,
    director: movie.Director,
    writer: movie.Writer || movie.Writers,
    actors: movie.Actors,
    plot: movie.Plot,
    award: movie.Awards,
    imdbRating: movie.imdbRating,
    imdbID: movie.imdbID,
    type: movie.Type,
});

class showImage extends React.Component {
    render() {
        if(Platform.os == 'ios' && this.props.poster != "N/A" && this.props.poster != '') {
            return (
                <View style={styles.images}>
                    <Image
                        style={{ width: 30, height: 400 }}
                        source={{ uri: this.props.poster }}
                        resizeMode='cover'
                    />
                </View>
            )
        } else {
            return null;
        }
    }
}

export default class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            dataKey: {},
            poster: '',
            error: '',
        }
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { param } = navigation.state;
        return {
            title: param.title,
        };
    }

    componentWillMount() {
        this.getDetail()
    }

    getDetail = async() => {
        let APIKEY = '9ed6b5f7';
        let imdb = this.props.navigation.getParam('imdb', '');
        let url = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdb}`

        try {
            const response = await fetch(`${url}`);
            const result = await response.json();
            const data = await movieInfo(result);

            this.setState({
                data: data,
                dataKey: Object.keys(data),
                poster: result.Poster,
            })
        } catch(err) {
            this.setState({ error: err.message });
        }
    }

    render() {
        const title = this.props.navigation.getParam('title', 'Title').replace(/\w\S*/g, (msg) => msg.charAt(0).toUpperCase() + msg.substr(1).toLowerCase());
        const year = this.props.navigation.getParam('year', 'Year')
        const data = this.state.data;
        const dataKey = this.state.dataKey;
        const manage = (dataKey).map((key, index) => {
            if(data[key] != 'N/A' && data[key] != '') {
                return <Text key={index} style={styles.detail}> {key}: {data[key]} </Text>
            }
        });

        return(
            <Scrollview style={styles.container}>
                <showImage poster={this.state.poster} />
                <View style={styles.data}>
                    { manage } 
                </View>
            </Scrollview>
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
    detail: {
        fontSize: 25,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    images: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },
    data: {
        margin: 5,
        padding: 5,
    }
})