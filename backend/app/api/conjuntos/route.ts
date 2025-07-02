import { primerModuloQueries } from "@/db/queries/queries-modulo1";
import { usuarioQueries } from "@/db/queries/queries-usuarios";
import { convertirEstrellas, obtenerActividad } from "@/db/utils/queries";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const actividad_id = await obtenerActividad(data.actividad)

        const resultado = {
            usuario_id: data.usuario_id,
            actividad_id: actividad_id,
            estrellas: data.estrellas,
            intentos: data.intentos,
            errores: data.errores,
            tiempo_total: data.tiempo
        }

        await primerModuloQueries.registarActividad(resultado)

        const monedas = await convertirEstrellas(data.estrellas)
        await usuarioQueries.agregarMonedas(resultado.usuario_id, monedas)

        return NextResponse.json({ success: true }, {
            headers: { "Access-Control-Allow-Origin": "*" }
        })
    } catch (error) {
        console.log("Error guardando datos:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}