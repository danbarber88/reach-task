import styled from "styled-components";
import "./FrameBar.css";
import {Frame, VideoData} from "./App"

interface Props {
    data: VideoData;
    currentFrame: number;
}

interface FrameProps {
    width: number;
    red: number;
    green: number;
    blue: number;
    currentFrame: boolean;
}

const ColourSlice = styled.span.attrs((props: FrameProps) => ({
    style: {
        width: `${props.width}px`,
        backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
        border: props.currentFrame && '1px dashed white',
    }
}))<FrameProps>`
    box-sizing: border-box;
`

function FrameBar(props: Props): JSX.Element {
    const frameElementWidth = 700 / Object.values(props.data.frame_data).length;
    const frameData: Frame[] = Object.values(props.data.frame_data);

    return <div id={'frame-bar'}>
        {
            frameData.map((frame, index) => (
                <ColourSlice
                    className={'frame'}
                    key={index}
                    width={frameElementWidth}
                    red={Math.round(frame.avgR)}
                    green={Math.round(frame.avgG)}
                    blue={Math.round(frame.avgB)}
                    currentFrame={index === props.currentFrame}
                />
            ))
        }
    </div>
}

export default FrameBar;