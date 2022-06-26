import {Handler} from '@netlify/functions';
import fetch from 'node-fetch'

interface Output {
    cvmdata: string;
    videofiles: string;
}

interface Data {
    output: Output
}

const handler: Handler = async () => {
    const response = await fetch('https://mockapi.lumi.systems/getdevicedata?deviceId=LabEye-dVr');
    const data = await response.json() as Data;

    const videoFile = data.output.videofiles;
    const videoFrameData = await fetch(data.output.cvmdata);
    const videoData = await videoFrameData.json();

    return {
        statusCode: 200,
        body: JSON.stringify({videoFile, videoData})
    };
};

export {handler}