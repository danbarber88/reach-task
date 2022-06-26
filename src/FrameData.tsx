import styled from "styled-components";
import { Frame } from "./App";

interface Props {
    currentFrame: number;
    currentFrameData: Frame;
    roi: number[];
}

interface RGBProps {
    red: number;
    green: number;
    blue: number;
}

const RGB = styled.div.attrs((props: RGBProps) => ({
    style: {
        backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
    }
}))<RGBProps>`
    width: 50px;
    height: 50px;
`

function FrameData(props: Props): JSX.Element {
    return (
        <>
            <div>Frame Number: {props.currentFrame}</div>
            <div>Bounding Box: [{props.roi.join(', ')}]</div>
            <div>Histogram: {props.currentFrameData?.histDiff}</div>
            <RGB
                red={props.currentFrameData?.avgR}
                green={props.currentFrameData?.avgG}
                blue={props.currentFrameData?.avgB}
            />
        </>
    )
}

export default FrameData;