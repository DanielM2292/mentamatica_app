
export function formatearTiempo(segundos: number): string {
    const tiempo = Number(segundos);
    if (isNaN(tiempo) || tiempo <= 0) {
        return "0h 0m 0s";
    }
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    return `${horas}h ${minutos}m ${segundosRestantes}s`;
}