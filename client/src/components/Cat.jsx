import { animated, useSpring } from "@react-spring/web";
import { useRef, useState, useEffect, useCallback } from "react";
import { TypeAnimation } from "react-type-animation";
import React from "react"
export default function Cat({text, imageArray}) {
  //Calculating animation time section 
  const length = text.length;
  const spaceCount = (text.split(" ").length - 1);
  const rate =  15.74 //words per second from type animation of speed 40 calculated through experimentation
  const ratio = 1.23 //Ratio of the timer seconds to real time seconds
  const totalAnimationTime = (length + spaceCount)/rate
  const adjustedTime = totalAnimationTime/ratio

  const [source, setSource] = useState(0);
  const frameId = React.useRef(null);
  const prevTimer = useRef(null)
  const startTimer = useRef(null)
  const result = imageArray[Math.round(source)]
  //Fade in animation
  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 1000,
    },
  });

  
  const animate = useCallback(timer => {
    if(startTimer.current === null) startTimer.current = timer;
    const t = timer - startTimer.current
    if (t <= adjustedTime * 1000) {
      if (prevTimer.current !== null && startTimer.current !== null) {
        const iteration = t - prevTimer.current;
        setSource(
          (prevCount =>
            (prevCount + iteration * 0.0022) % 1)
        )
      }
      prevTimer.current = t;
      frameId.current = requestAnimationFrame(animate);
    }
    else if (t > adjustedTime * 1000) {
        setTimeout(() =>{
          setSource(2)
        }, 150)
    }
  }, [])
  const startAnimation = useCallback(() =>{
    setSource(0)
    cancelAnimationFrame(frameId.current)
    prevTimer.current = null;
    startTimer.current = null;
    frameId.current = requestAnimationFrame(animate)
  },[animate])
  React.useEffect(() => {
    startAnimation();
    return() => cancelAnimationFrame(frameId.current)
  }, [startAnimation])



  return (
    <animated.div
      style={{ ...springs }}
      className="w-full h-[100px] flex flex-col justify-center items-center"
    >
      <img key={result} src={`cats/${result}`} />
      <h1 className="text-black -translate-y-8">^</h1>
      <animated.div className="border-black border-2 text-black rounded-full py-2 px-4 mb-4">
        <TypeAnimation sequence={[100, text]} cursor={false} speed = {40} style={{ fontSize:'0.875em', padding: '10px'}}/>
      </animated.div>
    </animated.div>
  );
}


  