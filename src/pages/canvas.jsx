import { Component, createRef } from "react";

export default class Canvas extends Component {
    
    constructor(props) {
        super(props);
        this.canvasRef = createRef();
    }
    
    componentDidMount () {
        this.updateCanvas();
    }

    updateCanvas () {
        const ctx = this.canvasRef.current.getContext('2d');
        ctx.fillRect(0,0, 100, 100);
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                className={this.props.className}
                width={parseFloat(this.props.width)*window.innerWidth}
                height={parseFloat(this.props.height)*window.innerHeight}
            />
        );
    }
}