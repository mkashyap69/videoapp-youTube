import React from 'react';
import SearchBar from './SearchBar'
import VideoList from './VideoList'
import youtube from '../apis/youtube'
import VideoDetail from './VideoDetail'

const KEY = "AIzaSyCn4hdrgiI6JLdnSjQNciabuGeAv9vseYY";


class App extends React.Component {

    state = { videos: [], selectedVideo: null };


    componentDidMount(){
        this.onTermSubmit("aftermorning");
    }


    onTermSubmit = async (term) => {
        const res = await youtube.get('/search', {
            params: {
                q: term,
                part: "snippet",
                type: "video",
                maxResults: 8,
                key: KEY
            }

        })
        this.setState({ videos: res.data.items,
        selectedVideo:res.data.items[0] });

    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });
    }

    render() {
        return (<div className="ui container" style={{ marginTop: "20px" }}>
            <SearchBar onFormSubmit={this.onTermSubmit} />
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                    <VideoDetail video={this.state.selectedVideo} />
                    </div>
                    <div className="five wide column">
                    <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                    </div>
                    
                </div>
            </div>

        </div>);
    };

}

export default App;