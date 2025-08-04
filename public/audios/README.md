# Audios Cognitivos - Guía de Implementación

## Archivos de Audio Requeridos

Para que el sistema de audios cognitivos funcione correctamente, necesitas crear los siguientes archivos MP3 y colocarlos en esta carpeta:

### Lista de Archivos Requeridos:

1. **welcome-motivation.mp3** - "¡Hola pequeño genio!"
2. **focus-breathing.mp3** - "Respiración para el súper cerebro"
3. **success-celebration.mp3** - "¡Eres un campeón!"
4. **calm-transition.mp3** - "Jardín de conocimiento"
5. **problem-solving-boost.mp3** - "Detective matemático"
6. **error-recovery.mp3** - "Los errores son maestros"
7. **pre-game-energy.mp3** - "¡Hora de jugar!"
8. **concentration-boost.mp3** - "Súper concentración"
9. **math-confidence.mp3** - "Matemáticas divertidas"
10. **end-session-positive.mp3** - "¡Sesión fantástica!"

## Herramientas Recomendadas para Crear los Audios:

### 1. ElevenLabs (Recomendado)
- **URL**: https://elevenlabs.io
- **Voces recomendadas**: 
  - "Maria" (México) - Cálida y maternal
  - "Sofia" (Argentina) - Energética y juvenil

### 2. Alternativas Gratuitas:
- **Google Cloud TTS**: Voz es-MX-Standard-A
- **Microsoft Azure**: es-MX-JennyNeural
- **Amazon Polly**: Voz Mia (México)

### 3. Herramientas de Edición:
- **Audacity** (Gratuito)
- **Adobe Audition** (Profesional)
- **GarageBand** (Mac)

## Scripts Completos:

Los scripts detallados para cada audio están disponibles en `/lib/cognitive-scripts.ts`

## Especificaciones Técnicas:

- **Sample Rate**: 44.1 kHz
- **Bit Depth**: 16-bit
- **Formato**: MP3 (128-192 kbps)
- **Duración**: 20-60 segundos por audio
- **Volumen**: Normalizado a -3dB

## Estado Actual:

⚠️ **Los archivos de audio aún no están creados**. El sistema está configurado y funcionará correctamente una vez que agregues los archivos MP3 con los nombres exactos listados arriba.

## Próximos Pasos:

1. Crear los audios usando las herramientas recomendadas
2. Usar los scripts proporcionados en `cognitive-scripts.ts`
3. Guardar los archivos con los nombres exactos en esta carpeta
4. ¡El sistema funcionará automáticamente!

## Beneficios Neurocientíficos:

- Mejora la neuroplasticidad
- Reduce el estrés y mejora la concentración
- Activa sistemas de recompensa para motivación intrínseca
- Facilita la consolidación de memoria a largo plazo