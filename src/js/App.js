import React from 'react'
import axios from 'axios'
import styled from 'styled-components'


const Wrapper = styled.div`
  width: 100%;
  font-family: 'Raleway', sans-serif;
`

const Title = styled.h1`
  color: #FF0069;
`

const Item = styled.div`
  max-width: 800px;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  background-image: url('placeholder_800.png');
  background-image: url('${ props => props.background}');
  margin: 15px 0;
  padding: 20px;
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`

const Text = styled.div`
  color: #FFF;
  padding: 10px 0;
  ${ props => props.large && 'font-size: 1.6em;'}
  ${ props => props.small && 'font-size: 0.9em;'}
`

const Link = styled.a`
  color: #FFF;
  font-size: 1.3em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
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
        this.setState({ launches })
      })
  }

  render() {
    return (
      <Wrapper>
        <Title>{this.props.headerText}</Title>
        {this.state.launches.map(launch =>
          <Item key={launch.id} background={launch.rocket.imageURL}>
            <Text large>{launch.name}</Text>
            <Text small>{launch.windowstart}</Text>
            {getVidUrl(launch.vidURLs)}
          </Item>
        )}
      </Wrapper>
    )
  }
}

function getVidUrl(url_arr){
    if(url_arr.length !== 0){
        return <Link href={url_arr[0]} target="_blank">Live stream</Link>
    }
    return
}

export default App
