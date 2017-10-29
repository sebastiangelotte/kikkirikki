import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { media } from './utils/styleUtils';
import Filter from './components/Filter'
import Item from './components/Item'
import CustomScrollbar from './components/CustomScrollbar'

import AppDispatcher from './utils/AppDispatcher'
import Actions from './utils/Actions'
import Store from './utils/Store'

const background = require('../assets/bg.jpg')


class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: []
		}
	}

	componentDidMount() {
		/*axios.get('https://launchlibrary.net/1.2/launch/next/20')
			.then(res => {
				const data = res.data.launches
				this.setState({ data })
			})*/
	}

	getData = () => {
		console.log("App.getData")
		Actions.getData()
	}

	render() {
		return (
			<Root>
				<Controls>
					<Title>{this.props.headerText}</Title>
					<Filter data={this.state.data} />
					<button type="button" onClick={this.getData}>
						<span>Get data!</span>
					</button>
					<Masthead>Rymdklubben.</Masthead>
				</Controls>
				<Wrapper>
					<CustomScrollbar>
						{this.state.data.map(item =>
							<Item key={item.id} data={item} />
						)}
					</CustomScrollbar>
				</Wrapper>
			</Root>
		)
	}
}


//CSS
const Root = styled.div`
	width: 100%;
	height: 100vh;
	padding: 0;
	margin: 0;
	font-family: 'Roboto', sans-serif;
	background-image: url('${ background }');
	background-size: cover;
	background-repeat: no-repeat;
	background-attachment: fixed;
	overflow: hidden;
	display: flex;
	flex-direction: row;

	${media.medium`
		flex-direction: column;
	`}
`

const Wrapper = styled.div`
	width: 70%;
	max-width: 800px;
	//overflow: initial;
	height: 100%;



	${media.medium`
		width: 100%;
		max-width: none;
	`}
`

const Controls = styled.div`
	width: 30%;
	min-width: 390px;
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);

	${media.medium`
		margin-left: 135px;
	`}
	${media.small`
		margin-left: 0px;
	`}
`

const Title = styled.h1`
	color: #FF0069;
	text-transform: uppercase;
	padding-left: 20px;
	font-size: 33px;
	font-weight: 600;
	letter-spacing: .02em;
`

const Masthead = styled.div`
	position: absolute;
	bottom: 10px;
	left: 10px;
	color: #FFF;
	font-family: consolas;
	font-size: 13px;
	${media.medium`
		display: none;
	`}
`

export default App
