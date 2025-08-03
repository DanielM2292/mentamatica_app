import React from "react";
import { useEffect, useState } from "react";
import { useStars } from "@/context/StarsContext";

type StatsCardProps = {
    icon: React.ReactNode;
    title: string;
    gradient: string;
    user?: string;
    suffix?: string
};

const StatsCard = ({ icon, title, gradient, user, suffix }: StatsCardProps) => {
    const [fetchedValue, setFetchedValue] = useState<string | number>("-");
    const { getSum } = useStars();
    const estrellasTotales = getSum();

    useEffect(() => {
        if (!user) return
        const fetchData = async () => {
            console.log("envio el dato", user)
            try {
                const response = await fetch(`/api/metricas`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuario_id: user })
                });
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const data = await response.json();
                console.log("respuesta desde el back POST", data)

                switch (title) {
                    case "Estrellas":
                        setFetchedValue(getSum());
                        break;
                    case "Racha":
                        setFetchedValue(data.racha || 0);
                        break;
                    case "Tiempo":
                        setFetchedValue(data.tiempo_total || "0h 0m 0s");
                        break;
                    case "Nivel":
                        setFetchedValue(data.nivel);
                        break;
                    default:
                        setFetchedValue("-");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setFetchedValue(
                    title === "Tiempo" ? "0h 0m 0s" :
                        title === "Racha" ? 0 :
                            title === "Nivel" ? 0 :
                                "-"
                );
            }
        };
        fetchData();
    }, [user, title, getSum]);

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 gsap-stats-card">
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                    {React.cloneElement(icon as React.ReactElement, {
                        className: "w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-white",
                    })}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{title}</p>
                    <p className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-800 truncat">
                        {title === "Estrellas" ? estrellasTotales : fetchedValue}
                        {suffix && !isNaN(Number(fetchedValue)) ? suffix : ""}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StatsCard;
