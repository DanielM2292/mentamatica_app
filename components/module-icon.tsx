"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const ModuleIcon = {
  Conjuntos: () => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (ref.current) {
        gsap.to(ref.current.querySelectorAll(".circle"), {
          rotation: 360,
          duration: 8,
          repeat: -1,
          ease: "none",
          stagger: 0.5,
        })
      }
    }, [])

    return (
      <div ref={ref} className="relative w-16 h-16">
        <div className="circle absolute w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold left-0 top-2">
          A
        </div>
        <div className="circle absolute w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-white font-bold right-0 top-2">
          B
        </div>
        <div className="absolute w-6 h-6 bg-purple-400 rounded-full top-0 left-1/2 transform -translate-x-1/2 opacity-80"></div>
      </div>
    )
  },

  Numeracion: () => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (ref.current) {
        gsap.to(ref.current.querySelectorAll(".number"), {
          y: -5,
          duration: 1,
          repeat: -1,
          yoyo: true,
          stagger: 0.2,
          ease: "sine.inOut",
        })
      }
    }, [])

    return (
      <div ref={ref} className="grid grid-cols-2 gap-1 w-16 h-16">
        {[0, 2, 4, 6].map((num) => (
          <div
            key={num}
            className="number w-7 h-7 bg-blue-500 rounded text-white font-bold flex items-center justify-center text-sm"
          >
            {num}
          </div>
        ))}
      </div>
    )
  },

  Suma: () => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (ref.current) {
        gsap.to(ref.current, {
          rotation: 10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    }, [])

    return (
      <div ref={ref} className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center relative">
        <div className="text-white text-3xl font-bold">+</div>
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"></div>
      </div>
    )
  },

  Resta: () => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (ref.current) {
        gsap.to(ref.current, {
          rotation: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    }, [])

    return (
      <div ref={ref} className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center relative">
        <div className="text-white text-3xl font-bold">−</div>
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"></div>
      </div>
    )
  },

  Multiplicacion: () => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (ref.current) {
        gsap.to(ref.current, {
          scale: 1.1,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    }, [])

    return (
      <div ref={ref} className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center relative">
        <div className="text-white text-3xl font-bold">×</div>
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"></div>
      </div>
    )
  },

  Division: () => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (ref.current) {
        gsap.to(ref.current.querySelector(".symbol"), {
          rotation: 180,
          duration: 3,
          repeat: -1,
          ease: "power2.inOut",
        })
      }
    }, [])

    return (
      <div ref={ref} className="w-16 h-16 bg-cyan-500 rounded-xl flex items-center justify-center relative">
        <div className="symbol text-white text-3xl font-bold">÷</div>
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"></div>
      </div>
    )
  },

  Geometria: () => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (ref.current) {
        gsap.to(ref.current.querySelectorAll(".shape"), {
          rotation: 360,
          duration: 4,
          repeat: -1,
          ease: "none",
          stagger: 0.3,
        })
      }
    }, [])

    return (
      <div ref={ref} className="w-16 h-16 relative">
        <div className="shape absolute w-6 h-6 bg-red-500 rounded-full top-0 left-0"></div>
        <div
          className="shape absolute w-6 h-6 bg-blue-500 top-0 right-0"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        ></div>
        <div className="shape absolute w-6 h-6 bg-green-500 bottom-0 left-0"></div>
        <div className="shape absolute w-6 h-6 bg-yellow-500 rounded-full bottom-0 right-0"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-purple-600">
          👦👧
        </div>
      </div>
    )
  },
}

export default ModuleIcon