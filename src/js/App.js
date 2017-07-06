import React, Component from 'react'
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
  max-width: 600px;
  height: 300px;
  border: 1px solid #000;
  background: {this.state.launches.rocket.imageURL};
  margin: 0 auto;
`

const Text = styled.div`
  color: #FFF;
`

const Link = styled.a`
  color: #FFF;
  font-size: 1.3em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
`

class App extends Component {
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
          <Item key={launch.id}>
            <Text name>{launch.name}</Text>
            <Text start>{launch.windowstart}</Text>
            {getVidUrl(launch.vidURLs)}
          </Item>
        )}
      </Wrapper>
    )
  }
}

function getVidUrl(url_arr){
    if(url_arr.length !== 0){
        return <Link href={url_arr[0]}>Live stream</Link>
    }
    return
}
