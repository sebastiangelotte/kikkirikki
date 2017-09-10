import React from 'react'

import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

export default class CustomScrollbar extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <Scrollbars
            renderThumbVertical={({ style, ...props }) =>
                <div {...props} style={{ ...style, backgroundColor: "transparent"}}>
                    <TrackVert>
                    </TrackVert>
                </div>
            }
            renderTrackVertical={({style, ...props}) =>
                //<TrackVert>

                    <div {...props} style={{...style}} className="trackV"/>
                //</TrackVert>
            }
            >
            {this.props.children}
        </Scrollbars>
        );
    }
}

const TrackVert = styled.div`
    background-color: yellow;
    width: 100%;
    height: 100%;
    position: relative;
    float: right;
`
