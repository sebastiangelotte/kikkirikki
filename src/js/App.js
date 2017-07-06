import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const placeholder = 'placeholder_800.png'
const background = 'bg.jpg'


const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: 'Raleway', sans-serif;
  background-image: url('${ background }');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-attachment: fixed;
`

const Wrapper = styled.div`
  width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: #FF0069;
`

const Item = styled.div`
  height: 300px;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  background-image: url('${ placeholder }');
  background-image: url('${ props => props.background}');
  margin: 15px 0;
  padding: 20px;

  &:hover {

  }
`

const Text = styled.div`
  color: #FFF;
  padding: 10px 0;
  transition: opacity 100ms ease-in-out;
  ${ props => props.large && 'font-size: 1.6em;'}
  ${ props => props.small && 'font-size: 0.9em;'}


  ${Item}:hover & {
    opacity: 1;
  }
  ${props => props.showOnHover && `
    opacity: 0;
    width: 50%;
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
    top: 0;
    right: 0;
    padding: 10px;
    font-size: 1em;

    &:hover {
      opacity: 0.8;
    }
  `}
`

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      launches: []
    }
  }

  componentDidMount() {
    axios.get('https://launchlibrary.net/1.2/launch/next/20')
      .then(res => {
        const launches = res.data.launches
        console.log(launches)
        this.setState({ launches })
      })
  }

  render() {
    return (
      <Root>
        <Wrapper>
          <Title>{this.props.headerText}</Title>
          {this.state.launches.map(launch =>
            <Item key={launch.id} background={launch.rocket.imageURL}>
              {getVidUrl(launch.vidURLs)}
              <Text large>{launch.name}</Text>
              <Text small>{launch.windowstart}</Text>
              <Text showOnHover>{launch.missions[0].description}</Text>
            </Item>
          )}
        </Wrapper>
      </Root>
    )
  }
}

function getVidUrl(url_arr){
    if(url_arr.length !== 0){
        return <Link stream href={url_arr[0]} target="_blank">Live stream</Link>
    }
    return
}

export default App
