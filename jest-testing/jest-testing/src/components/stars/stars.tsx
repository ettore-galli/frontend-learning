import '../../App.css';

function Star() {
    return "*"
}

interface Props {
    stars?: number
}


const Stars: React.FC<Props> = (props: Props) => {

    return (
        <div className="App">{((Array.from(Array(props.stars || 5))).map(_ => "*")).join("")}</div>
    );
}

export { Stars };
