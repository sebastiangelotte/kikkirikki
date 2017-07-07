import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const placeholder = 'placeholder_800.png'
const background = 'bg2.jpg'


const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-image: url('${ background }');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`

const Title = styled.h1`
  color: #FF0069;
  margin: 0;
  padding: 40px 20px 20px 20px;
  text-transform: uppercase;
  font-size: 33px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: .02em;
`

const Item = styled.div`
  height: 300px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  background-image: url('${ placeholder }');
  background-image: url('${ props => props.background}');
  margin: 15px;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  &:hover {

  }
`

const Text = styled.div`
  color: #FFF;
  padding: 5px 0 0 0;
  transition: opacity 100ms ease-in-out;
  ${ props => props.large && 'font-size: 1.6em;'}
  ${ props => props.small && 'font-size: 0.9em;'}


  ${Item}:hover & {
    opacity: 1;
  }
  ${props => props.showOnHover && `
    opacity: 0;
    padding: 20px 0 0 0;
    max-width: 300px;
    max-height: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
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
