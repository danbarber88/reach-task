import './Video.css'

interface Props {
    videoUrl: string;
    handleTimeUpdate: Function;
}

function Video(props: Props): JSX.Element {
    return (
        <div className={'video-container'}>
            <video id={'video'} controls onTimeUpdate={() => props.handleTimeUpdate()}>
                <source src={props.videoUrl}/>
            </video>
        </div>
    )
}

export default Video;