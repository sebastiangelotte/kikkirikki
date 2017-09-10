import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

export default class CustomScrollbar extends React.Component {

	render() {
		return (
				<Scrollbars	{...this.props} />
		)
	}
}
