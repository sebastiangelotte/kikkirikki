import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { media } from './utils/style-utils';


import Filter from './components/Filter'
import Item from './components/Item'

const background = 'bg.jpg'
const logo = 'logo.svg'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get('https://launchlibrary.net/1.2/launch/next/20')
      .then(res => {
        const data = res.data.launches
        this.setState({ data })
      })
  }

  render() {
    return (
      <Root>
        <Controls>
          <Title>{this.props.headerText}</Title>
          <Filter data={this.state.data} />
          <Masthead></Masthead>
        </Controls>
        <Wrapper>
          {this.state.data.map(item =>
            <Item key={item.id} data={item} />
          )}
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
  overflow: scroll;
  height: 100%;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: rgba(255,255,255,0.2);
  }
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
  background-image: url('${logo}');
  background-size: fit;
  background-repeat: no-repeat;
  position: absolute;
  bottom: 10px;
  fill: #FFF;
  left: 10px;
  color: #FFF;
  font-family: consolas;
  font-size: 13px;
  height: 200px;
  width: 200px;
  ${media.medium`
    display: none;
  `}
`

export default App
