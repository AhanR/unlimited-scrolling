import { Component, createRef } from "react";

export default class Canvas extends Component {
    
    constructor(props) {
        super(props);
        this.canvasRef = createRef();
    }
    
    componentDidMount () {
        this.value = Math.random(this.props.seed);
        this.updateCanvas();
    }

    updateCanvas () {
        this.ctx = this.canvasRef.current.getContext('2d');
        this.ctx.fillRect(0,this.value*window.innerHeight, 100, 100);
        this.ctx.fillStyle = "#"+parseInt(this.value*1000000);
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