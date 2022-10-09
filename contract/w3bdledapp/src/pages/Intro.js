import SixteenSegmentDisplay from '../components/SixteenSegment';
import { Link, useNavigate } from "react-router-dom";


function Intro(props) {
    const navigate = useNavigate();
    document.addEventListener('keydown', handleKeydown);

    function handleKeydown(keyEvent) {
        document.removeEventListener('keydown', navigate("/play"));
    }

    return (
        <Link to={"/play"}>
        <div className="App">
                <SixteenSegmentDisplay
                    word={" WELCOME TO CRYPTDLE "}
                    rotating={true}
                    backgroundColor={'black'}
                    onColor={"white"}
                    offColor={"rgba(20,20,20,1)"} className="App"/>
        </div >
        </Link>
    );
}
export default Intro;