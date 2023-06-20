import { prisma } from "./db"
import FichaPartido from "./fichapartido";
import { useState, ChangeEvent, FormEvent } from "react";

//export const prisma = new PrismaClient();

interface Jugador {
  id: number;
  nombre: string;
  numero: number;
}

export default async function CargarPartido() {

  
  const jugadores = await prisma.jugador.findMany();


  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    rival: "",
    jugadores: [] as Jugador[],
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const partido = await prisma.partido.create({
        data: {
          nombre: formData.nombre,
          fecha: new Date(formData.fecha),
          rival: formData.rival,
          jugadores: {
            connect: formData.jugadores.map((jugador) => ({ id: jugador.id })),
          },
        },
      });

      console.log("Partido creado:", partido);

      // Limpiar el formulario
      setFormData({
        nombre: "",
        fecha: "",
        rival: "",
        jugadores: [],
      });
    } catch (error) {
      console.error("Error al crear el partido:", error);
    }
  };

  

  return(
    <FichaPartido jugadores={jugadores} handleFormSubmit={handleFormSubmit} ></FichaPartido>
  );

}