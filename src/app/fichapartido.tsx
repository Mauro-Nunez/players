"use client"
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
} from '@chakra-ui/react';

interface Jugador {
  id: number;
  nombre: string;
  numero: number;
}

interface FichaPartidoProps {
  jugadores: Jugador[];
}

interface PartidoFormData {
  nombre: string;
  fecha: string;
  rival: string;
  jugadores: Jugador[];
}

export default function FichaPartido(props: FichaPartidoProps) {
  const [formData, setFormData] = useState<PartidoFormData>({
    nombre: '',
    fecha: '',
    rival: '',
    jugadores: [],
  });



  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleJugadorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedJugadorId = parseInt(e.target.value);
    const selectedJugador = formData.jugadores.find(
      (jugador) => jugador.id === selectedJugadorId
    );
    const isAlreadySelected = formData.jugadores.some(
      (jugador) => jugador.id === selectedJugadorId
    );

    if (selectedJugador && !isAlreadySelected) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        jugadores: [...prevFormData.jugadores, selectedJugador],
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Lógica de envío de datos

    setFormData({
      nombre: '',
      fecha: '',
      rival: '',
      jugadores: [],
    });
  };

  return (
    <Box maxWidth="600px" mx="auto" p={4}>
      <Heading as="h1" mb={4}>
        Cargar Partido
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Nombre del Partido</FormLabel>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Fecha</FormLabel>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Rival</FormLabel>
          <input
            type="text"
            name="rival"
            value={formData.rival}
            onChange={handleInputChange}
          />
        </FormControl>
        <Heading as="h3" fontSize="lg" mb={2}>
          Jugadores
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Seleccionar Jugador</FormLabel>
          <Select onChange={handleJugadorChange}>
            <option value="">Seleccionar...</option>
            {formData.jugadores.map((jugador) => (
              <MenuItem
                key={jugador.id}
                value={jugador.id}
                isDisabled={formData.jugadores.some(
                  (selectedJugador) => selectedJugador.id === jugador.id
                )}
              >
                {jugador.nombre} - #{jugador.numero}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formData.jugadores.map((jugador) => (
          <Box key={jugador.id} mb={2}>
            {jugador.nombre} - #{jugador.numero}
          </Box>
        ))}
        <Button type="submit">Cargar</Button>
      </form>
    </Box>
  );
}