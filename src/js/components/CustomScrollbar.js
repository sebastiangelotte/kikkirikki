import React from 'react'

import { Scrollbars } from 'react-custom-scrollbars';

export default class CustomScrollbar extends React.Component {
	constructor(props, context) {
		super(props, context)
	}

	render() {
		return (
			<Scrollbars
				renderThumbVertical={({style, ...props }) =>
					<div {...props} style={{ ...style}, cssThumb}>
					</div>
				}

				renderTrackVertical={({style, ...props}) =>
					<div {...props} style={cssTrack}>
					</div>
				}
			>
			{this.props.children}
		</Scrollbars>
		)
	}
}

const cssThumb = {
	backgroundColor: "white",
	borderRadius: "3px"
}

const cssTrack = {
	backgroundColor: "transparent",
	position: "static",
	height: "100vh",
	width: "0.55vw",
	float: "right"
}
