import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './videoPlayer.js';
import Search from './search.js';
import YOUTUBE_API_KEY from '../config/youtube.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: 'cats',
      currentVideo: {
        kind: '',
        etag: '',
        id: {
          kind: '',
          videoId: ''
        },
        snippet: {
          publishedAt: '',
          channelId: '',
          title: '',
          description: '',
          thumbnails: {
            default: {
              url: '',
              width: 0,
              height: 0
            },
            medium: {
              url: '',
              width: 0,
              height: 0
            },
            high: {
              url: '',
              width: 0,
              height: 0
            }
          },
          channelTitle: '',
          liveBroadcastContent: ''
        }
      },
      videoList: [{
        kind: '',
        etag: '',
        id: {
          kind: '',
          videoId: ''
        },
        snippet: {
          publishedAt: '',
          channelId: '',
          title: '',
          description: '',
          thumbnails: {
            default: {
              url: '',
              width: 0,
              height: 0
            },
            medium: {
              url: '',
              width: 0,
              height: 0
            },
            high: {
              url: '',
              width: 0,
              height: 0
            }
          },
          channelTitle: '',
          liveBroadcastContent: ''
        }
      }]
    };
  }


  handleTitleClick(videoObject) {
    this.setState({
      currentVideo: videoObject
    });
  }

  render() {
    return (<div>
      <nav className="navbar">
        <div className="col-md-6 offset-md-3">
          <Search handleChange={_.debounce(this.search.bind(this), 500)}/>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-7">
          <VideoPlayer video={this.state.currentVideo} />
        </div>
        <div className="col-md-5">
          <VideoList videos={this.state.videoList} handleTitleClick={this.handleTitleClick.bind(this)} />
        </div>
      </div>
    </div>);
  }

  search(str) {
    if (this.state.query !== str) {
      this.state.query = str;
      var options = {
        query: str,
        max: 5,
        key: YOUTUBE_API_KEY
      };
      var callback = function(data) {
        this.setState({
          currentVideo: data[0],
          videoList: data
        });
      };

      this.props.searchYouTube(options, callback.bind(this));
    }
  }

  componentDidMount() {
    var options = {
      query: 'cats',
      max: 5,
      key: YOUTUBE_API_KEY
    };

    var results;
    var callback = function(data) {
      this.setState({
        currentVideo: data[0],
        videoList: data
      });
    };

    this.props.searchYouTube(options, callback.bind(this));
    // App.setState
  }
}


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
