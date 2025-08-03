import { gsap } from "gsap"

export const initGSAP = () => {
  // Configuraciones optimizadas para neurociencia cognitiva infantil
  gsap.defaults({
    duration: 0.8,
    ease: "power2.out",
  })

  // Efecto para respuestas correctas (refuerzo positivo)
  gsap.registerEffect({
    name: "correctAnswer",
    effect: (targets: any, config: any) => {
      return gsap
        .timeline()
        .to(targets, {
          backgroundColor: "#4ade80",
          scale: 1.2,
          duration: 0.3,
          ease: "back.out(1.7)",
        })
        .to(targets, {
          scale: 1,
          duration: 0.2,
        })
        .to(targets, {
          backgroundColor: config.originalColor || "#ffffff",
          duration: 0.5,
        })
    },
    defaults: { duration: 1 },
  })

  // Efecto para respuestas incorrectas (feedback suave)
  gsap.registerEffect({
    name: "wrongAnswer",
    effect: (targets: any) => {
      return gsap
        .timeline()
        .to(targets, {
          x: -10,
          duration: 0.1,
        })
        .to(targets, {
          x: 10,
          duration: 0.1,
        })
        .to(targets, {
          x: -5,
          duration: 0.1,
        })
        .to(targets, {
          x: 5,
          duration: 0.1,
        })
        .to(targets, {
          x: 0,
          duration: 0.1,
        })
    },
    defaults: { duration: 0.5 },
  })

  // Efecto de celebración para logros
  gsap.registerEffect({
    name: "celebration",
    effect: (targets: any) => {
      return gsap
        .timeline()
        .to(targets, {
          scale: 1.3,
          rotation: 360,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        })
        .to(targets, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
        })
    },
    defaults: { duration: 1 },
  })

  // Efecto de aparición matemática
  gsap.registerEffect({
    name: "mathPop",
    effect: (targets: any, config: any) => {
      return gsap
        .timeline()
        .from(targets, {
          scale: 0,
          rotation: 180,
          duration: config.duration || 0.5,
          ease: "back.out(1.7)",
        })
        .to(targets, {
          scale: 1.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        })
    },
    defaults: { duration: 0.6 },
  })
}
