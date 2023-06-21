import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Button,
} from '@chakra-ui/react';

interface Incidencia {
  id: number;
  jugadorId: number;
  tiempo: number;
  tipo: string;
}

interface Jugador {
  id: number;
  nombre: string;
}

interface Partido {
  id: number;
  nombre: string;
  fecha: string;
  rival: string;
}

interface CargarIncidenciasProps {
  jugadores: Jugador[];
  partido: Partido;
  incidenciasCargadas: Incidencia[];
  handleCargarIncidencias: (incidencia: Incidencia) => void;
}

export default function CargarIncidencias({
  jugadores,
  partido,
  incidenciasCargadas,
  handleCargarIncidencias
}: CargarIncidenciasProps) {
  const [formData, setFormData] = useState({
    jugadorId: '',
    tiempo: '',
    tipo: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const incidencia: Incidencia = {
      id: Date.now(),
      jugadorId: parseInt(formData.jugadorId),
      tiempo: parseInt(formData.tiempo),
      tipo: formData.tipo,
    };

    handleCargarIncidencias(incidencia);

    // Reiniciar el formulario
    setFormData({
      jugadorId: '',
      tiempo: '',
      tipo: '',
    });
  };

  return (
    <Box maxWidth="600px" mx="auto" p={4}>
      <Heading as="h1" mb={4}>
        Cargar Incidencias
      </Heading>
      <Box>
        <Heading as="h3" fontSize="lg">
          Partido: {partido.nombre}
        </Heading>
        <p>Fecha: {partido.fecha}</p>
        <p>Rival: {partido.rival}</p>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Jugador</FormLabel>
          <Select name="jugadorId" value={formData.jugadorId} onChange={handleInputChange}>
            <option value="">Seleccionar...</option>
            {jugadores.map((jugador) => (
              <option key={jugador.id} value={jugador.id}>
                {jugador.nombre}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Tiempo</FormLabel>
          <input
            type="number"
            name="tiempo"
            value={formData.tiempo}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Tipo de Incidencia</FormLabel>
          <Select name="tipo" value={formData.tipo} onChange={handleInputChange}>
            <option value="">Seleccionar...</option>
            <option value="gol">Gol</option>
            <option value="amarilla">Tarjeta Amarilla</option>
            <option value="roja">Tarjeta Roja</option>
            <option value="egreso">Egreso</option>
            <option value="ingreso">Ingreso</option>
            <option value="lesion">Lesión</option>
          </Select>
        </FormControl>
        <Button type="submit">Cargar Incidencia</Button>
      </form>
      <Heading as="h3" fontSize="lg" mt={4}>
        Incidencias Cargadas
      </Heading>
      <ul>
        {incidenciasCargadas.map((incidencia) => (
          <li key={incidencia.id}>
            Jugador: {incidencia.jugadorId}, Tiempo: {incidencia.tiempo}, Tipo: {incidencia.tipo}
          </li>
        ))}
      </ul>
    </Box>
  );
}
