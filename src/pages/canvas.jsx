import { Component, createRef, useContext } from "react";

export default class Canvas extends Component {
    
    constructor(props) {
        super(props);
        this.canvasRef = createRef();
        this.width = parseInt(this.props.width);
        this.height = parseInt(this.props.height);
        
        // point is the draw size for each point in the animation
        this.point = 5;
        
        // the rate helps control the speed of the reaction
        // distortion tells us how much to distort the shapes
        this.rate = 0.1;
        this.distortion = Math.random(this.props.seed) * 20;

        // t : theta (angle for rotation)
        // r : radius of rotation
        this.r = Math.floor(10*Math.random(this.props.seed));
        this.dr = Math.random(this.props.seed) + 0.1;

        this.t = 0;
        this.dt = Math.PI/24;

        
        this.color = "#"+Math.floor( Math.random(this.props.seed) * 1e6 );

        // console.log("new canvas distortion : ", this.distortion);
    }
    
    componentDidMount () {
        // console.log("initial view created");
        this.ctx = this.canvasRef.current.getContext('2d');
    }

    componentDidUpdate () {
        // console.log("updating view");
        this.play();
    }

    draw = (x,y) => {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.rect(x + this.width/2,y + this.height/2, this.point, this.point)
        this.ctx.fill();
    }

    write = (text) => {
        this.ctx.font = "20px Monospace";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(text, this.width/2 - 5*text.length , this.height/2 + 10);
    }
    
    play = () => {
        // console.log("a canvas is running");

        if(this.r > this.height*0.35) {
            this.write("animation complete");
            return;
        };

        //check if the slide is visible
        if(this.props.inView != this.props.slide) {
            return;
        }

        this.t += this.rate*this.dt;
        this.r += this.rate*this.dr;

        this.draw(this.r*Math.sin(this.t) + 20*Math.cos(this.r) , this.r*Math.cos(this.t) + 20*Math.sin(this.r));
        
        this.animationId = requestAnimationFrame(this.play);
    }

    pause = () => {
        // console.log("canvas paused");
        cancelAnimationFrame(this.animationId);
    }

    componentWillUnmount() {
        this.pause();
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                className={this.props.className}
                width={this.props.width}
                height={this.props.height}
            />
        );
    }
}