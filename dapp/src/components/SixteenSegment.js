import React from "react";

const CODES = {};
CODES.A = 0b1111001111000000;
CODES.B = 0b1111110011010010;
CODES.C = 0b1100111100000000;
CODES.D = 0b1111110000010010;
CODES.E = 0b1100111110000000;
CODES.F = 0b1100001110000000;
CODES.G = 0b1101111101000000;
CODES.H = 0b0011001111000000;
CODES.I = 0b1100110000010010;
CODES.J = 0b0011111000000000;
CODES.K = 0b0000001110001100;
CODES.L = 0b0000111100000000;
CODES.M = 0b0011001100101000;
CODES.N = 0b0011001100100100;
CODES.O = 0b1111111100000000;
CODES.P = 0b1110001111000000;
CODES.Q = 0b1111111100000100;
CODES.R = 0b1110001111000100;
CODES.S = 0b1101110111000000;
CODES.T = 0b1100000000010010;
CODES.U = 0b0011111100000000;
CODES.V = 0b0000001100001001;
CODES.W = 0b0011001100000101;
CODES.X = 0b0000000000101101;
CODES.Y = 0b0000000000101010;
CODES.Z = 0b1100110000001001;
CODES.SPACE = 0b0000000000000000;


/**
 * A singular sixteen segment character.
 * @param {code, letter, width, height, stroke, onColor, offColor} props 
 *        Props must include: code or letter, width, height, stroke, onColor, offColor
 * @returns 
 */
function SixteenSegment(props) {
    let code = props.code ? parseInt(props.code, 2) : CODES[props.letter];
    console.log(code);
    if (props.letter == " ") {
        code = CODES.SPACE;
    }

    return (
        <svg width={props.width} height={props.height}>

            <line id='a1' x1={props.stroke / 2} y1={props.stroke / 2} x2={props.width / 2 - props.stroke / 2} y2={props.stroke / 2} stroke={code >> 15 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='a2' x1={props.width / 2 + props.stroke / 2} y1={props.stroke / 2} x2={props.width - props.stroke / 2} y2={props.stroke / 2} stroke={(code >> 14) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='b' x1={props.width - props.stroke} y1={props.stroke * 2} x2={props.width - props.stroke} y2={props.height / 2 - props.stroke * 1.5} stroke={(code >> 13) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='c' x1={props.width - props.stroke} y1={props.height / 2 + props.stroke * 1.5} x2={props.width - props.stroke} y2={props.height - props.stroke * 2} stroke={(code >> 12) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='d1' x1={props.stroke / 2} y1={props.height - props.stroke / 2} x2={props.width / 2 - props.stroke / 2} y2={props.height - props.stroke / 2} stroke={(code >> 11) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='d2' x1={props.width / 2 + props.stroke / 2} y1={props.height - props.stroke / 2} x2={props.width - props.stroke / 2} y2={props.height - props.stroke / 2} stroke={(code >> 10) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='e' x1={props.stroke} y1={props.height / 2 + props.stroke * 1.5} x2={props.stroke} y2={props.height - props.stroke * 2} stroke={(code >> 9) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='f' x1={props.stroke} y1={props.stroke * 2} x2={props.stroke} y2={props.height / 2 - props.stroke * 1.5} stroke={(code >> 8) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='g1' x1={props.stroke / 2} y1={props.height / 2} x2={props.width / 2 - props.stroke / 2} y2={props.height / 2} stroke={(code >> 7) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='g2' x1={props.width / 2 + props.stroke / 2} y1={props.height / 2} x2={props.width - props.stroke / 2} y2={props.height / 2} stroke={(code >> 6) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='h' x1={props.stroke * 2.5} y1={props.stroke * 2} x2={props.width / 2 - props.stroke * 1.5} y2={props.height / 2 - props.stroke * 1.5} stroke={(code >> 5) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='i' x1={props.width / 2} y1={props.stroke * 2} x2={props.width / 2} y2={props.height / 2 - props.stroke * 1.5} stroke={(code >> 4) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='j' x1={props.width - props.stroke * 2.5} y1={props.stroke * 2} x2={props.width / 2 + props.stroke * 1.5} y2={props.height / 2 - props.stroke * 1.5} stroke={(code >> 3) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='k' x1={props.width - props.stroke * 2.5} y1={props.height - props.stroke * 2} x2={props.width / 2 + props.stroke * 1.5} y2={props.height / 2 + props.stroke * 1.5} stroke={(code >> 2) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='l' x1={props.width / 2} y1={props.height / 2 + props.stroke * 1.5} x2={props.width / 2} y2={props.height - props.stroke * 2} stroke={(code >> 1) % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />
            <line id='m' x1={props.stroke * 2.5} y1={props.height - props.stroke * 2} x2={props.width / 2 - props.stroke * 1.5} y2={props.height / 2 + props.stroke * 1.5} stroke={code % 2 ? props.onColor : props.offColor} stroke-width={props.stroke} />

        </svg>
    )
}

/**
 * A set of sixteen segment characters
 * @param {word, code, width, height, stroke, onColor, offColor, digits, rotating} props
 *        Props must include code or word, stroke, onColor, offColor, digits
 */
class SixteenSegmentDisplay extends React.Component {
    constructor(props) {
        super();
        this.state = {
            word: props.word,
            code: props.code,
            width: props.width,
            height: props.height,
            stroke: props.height * window.innerWidth / 300000,
            onColor: props.onColor,
            offColor: props.offColor,
            digits: 16,
            rotating: true,
        };
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this));

        if (this.state.word && this.state.word.length < this.state.digits) {
            this.setState({ word: this.state.word + " ".repeat(this.state.digits - this.state.word.length) });
        }
        if (this.state.code && this.state.code.length < this.state.digits * 16) {
            this.setState({ code: ("0").repeat((16 - (this.state.code.length % 16))%16) + this.state.code + "0".repeat(this.state.digits * 16 - this.state.code.length - (16 - (this.state.code.length % 16))) });
        }

        if (this.state.rotating && this.state.word) {
            setInterval(() => {
                this.setState({ word: (this.state.word).substring(1) + (this.state.word).charAt(0) });
            }, 200)
        }
    }

    handleResize() {
        if (!this.props.width || !this.props.height) {
            this.setState({ width: window.innerWidth * 3 / 4, height: window.innerHeight / 6, stroke: window.innerHeight * window.innerWidth / 300000 });
        }
    }

    renderSixteenSegments() {
        let sixteenSegmentList = [];
        let i = 0;

        console.log(this.state.code);
        if (this.state.code) {
            for (; i < this.state.digits; i++) {
                sixteenSegmentList.push(
                    <>
                        <SixteenSegment
                            width={(this.state.width - this.state.stroke * 2 * (this.state.digits - 1)) / this.state.digits}
                            height={this.state.height}
                            stroke={this.state.stroke}
                            onColor={this.state.onColor}
                            offColor={this.state.offColor}
                            code={(this.state.code).substring(16 * (i), 16 * (i + 1))} />
                        <div style={{ width: this.state.stroke * 2 }}></div>
                    </>
                )
            }
        } else if (this.state.word) {
            for (; i < this.state.digits; i++) {
                sixteenSegmentList.push(
                    <>
                        <SixteenSegment
                            width={(this.state.width - this.state.stroke * 2 * (this.state.digits - 1)) / this.state.digits}
                            height={this.state.height}
                            stroke={this.state.stroke}
                            onColor={this.state.onColor}
                            offColor={this.state.offColor}
                            letter={(this.state.word).charAt(i)} />
                        <div style={{ width: this.state.stroke * 2 }}></div>
                    </>
                )
            }
        }
        return sixteenSegmentList;
    }

    render() {
        return (
            <div  style={{ textAlign: "center", height: 100, width: this.props.width }}>
                <header style={{
                    backgroundColor: this.props.backgroundColor,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'calc(10px + 2vmin)',
                    color: 'white', height: this.props.height, width: this.props.width
                }}>
                    {this.renderSixteenSegments()}
                </header>
            </div >
        );
    }
}

export default SixteenSegmentDisplay;