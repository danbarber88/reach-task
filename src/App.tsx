import React, {useEffect, useState} from 'react';
import Video from "./Video";
import FrameBar from "./FrameBar";
import FrameData from "./FrameData";

export interface Frame {
    avgR: number;
    avgG: number;
    avgB: number;
    histDiff: number;
}

export interface VideoData {
    RoI: number[];
    frame_data: { [key: number]: Frame };
}

interface ResponseData {
    videoData: VideoData,
    videoFile: string;
}

function App(): JSX.Element {
    const [data, setData] = useState<VideoData>()
    const [videoFile, setVideoFile] = useState<string>('')
    const [totalFrames, setTotalFrames] = useState(-Infinity);
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        (async () => {
            const data = await fetch(`/api/getData`);
            const toJson: ResponseData = await data.json();

            setData(toJson.videoData);
            setTotalFrames(Object.keys(toJson.videoData.frame_data).length);
            setVideoFile(toJson.videoFile);
        })();
    }, []);

    const handleTimeUpdate = () => {
        const video = document.querySelector('video');

        if (video) {
            const videoFps = totalFrames / video.duration;
            const frameNumber = Math.round(video.currentTime * videoFps)

            setCurrentFrame(frameNumber);
        }
    }

    return (
        <div className="App">
            {videoFile.length > 0 && <Video videoUrl={videoFile} handleTimeUpdate={handleTimeUpdate}/>}
            {data && <>
                <FrameBar data={data} currentFrame={currentFrame}/>
                <FrameData currentFrame={currentFrame}
                           currentFrameData={data.frame_data[currentFrame]}
                           roi={data.RoI}
                />
            </>}
        </div>
    )
}

export default App;
