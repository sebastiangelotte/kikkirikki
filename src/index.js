import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/App'

const favicon = require('./assets/favicon.png');
let link = document.createElement('link');
link.type = 'image/png';
link.rel = 'shortcut icon';
link.href = favicon;


ReactDOM.render(
	<App headerText="Upcoming Launches" />,
	document.getElementById('app')
);
