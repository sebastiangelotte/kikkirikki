import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

var modal = new tingle.modal({
  footer: false,
  stickyFooter: false,
  closeMethods: ['overlay', 'button', 'escape'],
  closeLabel: "Close",
  cssClass: ['custom-class-1', 'custom-class-2'],
  onOpen: function() {
      console.log('modal open');
  },
  onClose: function() {
      console.log('modal closed');
  },
  beforeClose: function() {
      // here's goes some logic
      // e.g. save content before closing the modal
      return true; // close the modal
    return false; // nothing happens
  }
});


class FetchDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      launches: []
    };
  }

  componentDidMount() {
    axios.get('https://launchlibrary.net/1.2/launch/next/20')
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
          <div className="launch-wrapper" key={launch.id}  onClick={() => openModal(launch.rocket.imageURL)}>
            <ul className="info-list">
              <li className="name">{launch.name}</li>
              <li className="start">{launch.windowstart}</li>
              {getVidUrl(launch.vidURLs)}
            </ul>
            <a href="#" className="modal">
              <img className="image" src={launch.rocket.imageURL} />
            </a>
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


function openModal(url) {
  console.log(url);

  modal.setContent('<img src="' + url + '" />');
  modal.open();
}
