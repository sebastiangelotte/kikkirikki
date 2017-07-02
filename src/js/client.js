import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      launches: []
    };
  }

  componentDidMount() {
    axios.get('https://launchlibrary.net/1.2/launch/next/5')
      .then(res => {
        const launches = res.data.launches;
        console.log(launches);
        this.setState({ launches });
      });

  }

  render() {
    return (
      <div className="app-wrapper">
        <h1 className="header">{this.props.headerText}</h1>
        {this.state.launches.map(launch =>
          <div className="launch-wrapper" key={launch.id}>
            <ul>
              <li className="name">{launch.name}</li>
              <li className="start">{launch.windowstart}</li>
              {getVidUrl(launch.vidURLs)}
            </ul>
            <img className="image" src={launch.rocket.imageURL} />
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <FetchDemo headerText="Upcoming launches" />,
  document.getElementById('app')
);

function getVidUrl(url_arr){
    if(url_arr.length !== 0){
        return <li className="link"><a href={url_arr[0]}>Live stream</a></li>
    }
    return;
}
