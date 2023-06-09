import {  PrismaClient } from "@prisma/client";
import FichaPartido from "./fichapartido";


export const prisma = new PrismaClient();



export default function CargarPartido() {
  const JugadoresFicha = async()=>{
    const jugadores = await prisma.jugador.findMany();
    return jugadores;
  }

  return(
    <FichaPartido jugadores={jugadores}></FichaPartido>
  );

}