import React from 'react'
import styled from 'styled-components'
import { media } from '../utils/styleUtils';

import Date from './Date'

import placeholder from '../../assets/placeholder_800.png'

export default class Item extends React.Component {

	render() {
		return (
			<Wrapper key={this.props.data.id} background={this.props.data.rocket.imageURL}>
				{getVidUrl(this.props.data.vidURLs)}
				<Date date={this.props.data.windowstart}/>
				<Text large>{this.props.data.name}</Text>
				<Text small>{this.props.data.windowstart}</Text>
			</Wrapper>
		)
	}
}


function getVidUrl(url_arr){
		if(url_arr.length !== 0){
				return <Link stream href={url_arr[0]} target="_blank">Live stream</Link>
		}
		return
}

// CSS
const Wrapper = styled.div`
	height: 220px;
	position: relative;
	border: 10px solid #FFF;
	border-radius: 2px;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: top center;
	background-image: url('${ placeholder }');
	background-image: url('${ props => props.background}');
	margin: 15px 15px 15px 150px;
	padding: 30px 40px;
	display: flex;
	flex-direction: column;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);

	&:hover {
		box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	}
	${media.small`
		margin-left: 15px;
	`}
`

const Text = styled.div`
	color: #FFF;
	padding: 5px 0 0 0;
	transition: opacity 0.3s cubic-bezier(.25,.8,.25,1);
	overflow: hidden;
	${ props => props.large && `
			font-size: 1.6em;
			height: 35px;
	`}
	${ props => props.small && 'font-size: 0.9em;'}


	${Wrapper}:hover & {
		opacity: 1;
	}
	${props => props.showOnHover && `
		opacity: 0;
		padding: 30px 0 0 0;
		max-width: 300px;
		max-height: 115px;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 1.2em;
	`}
`

const Link = styled.a`
	color: #FFF;
	font-size: 1.3em;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	cursor: pointer;
	${props => props.stream && `
		position: absolute;
		opacity: 0.5;
		top: 0;
		right: 0;
		padding: 10px;
		font-size: 0.8em;

		&:hover {
			opacity: 0.8;
		}
	`}
`
