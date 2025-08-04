
export function convertirErrores (errores: any) {
    if (errores === 0) {
        return 3;
    } else if (errores <= 3) {
        return 2;
    } else if (errores <= 5) {
        return 1;
    } else {
        return 0;
    }
}

// si lo hace sin errores 3 estrellas
// si comete tres errores 2 estrellas
// si comete cinco errores 1 estrellas
// si comete mas de 5 errores repetir