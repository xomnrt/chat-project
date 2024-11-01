import { useState, useEffect, useRef } from 'react'
import FOG from 'vanta/dist/vanta.fog.min'

export const VantaBackground = ({ children }) => {
    // const [vantaEffect, setVantaEffect] = useState(null)
    // const myRef = useRef(null)
    // useEffect(() => {
    //     if (!vantaEffect) {
    //         setVantaEffect(FOG({
    //             el: myRef.current,
    //             mouseControls: true,
    //             touchControls: true,
    //             gyroControls: false,
    //             minHeight: 200.00,
    //             minWidth: 200.00,
    //             highlightColor: 0xf0c099,
    //             midtoneColor: 0x1e8787,
    //             lowlightColor: 0x589679,
    //             baseColor: 0x5cb85c,
    //             blurFactor: 0.6,
    //             speed: 1
    //         }))
    //     }
    //     return () => {
    //         if (vantaEffect) vantaEffect.destroy()
    //     }
    // }, [vantaEffect])

    return <div
        className="d-flex flex-column h-100"
        // ref={myRef}
    >
        {children}
    </div>
}
