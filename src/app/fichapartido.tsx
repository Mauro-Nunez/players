"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import Select from 'react-select';


interface Jugador {
  id: number;
  nombre: string;
  numero: number;
}

interface FichaPartidoProps {
  jugadores: Jugador[];
  handleFormSubmit: (PartidoFormData: FormData) => void;
}

export default function FichaPartido({ jugadores , handleFormSubmit}: FichaPartidoProps) {
  const [PartidoFormData, setFormData] = useState({
    nombreFicha: '',
    fechaPartido: '',
    rival: '',
    jugadoresSeleccionados: Array<Jugador>(18)
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleJugadorChange = (selectedOption: any, index: number) => {
    const selectedJugadorId = selectedOption.value;

    setFormData((prevFormData) => {
      const jugadoresSeleccionados = [...prevFormData.jugadoresSeleccionados];
      jugadoresSeleccionados[index] = selectedJugadorId.toString();

      return {
        ...prevFormData,
        jugadoresSeleccionados,
      };
    });
  };

  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Llamar a la función handleFormSubmit del componente CargarPartido
    handleFormSubmit(PartidoFormData);
  };

  const options = jugadores.map((jugador) => ({
    value: jugador.id,
    label: `${jugador.nombre} - #${jugador.numero}`,
  }));

  return (
    <Box maxWidth="600px" mx="auto" p={4}>
      <Heading as="h1" mb={4}>
        Cargar Partido
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Nombre de la Ficha</FormLabel>
          <input
            type="text"
            name="nombreFicha"
            value={PartidoFormData.nombreFicha}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Fecha del Partido</FormLabel>
          <input
            type="date"
            name="fechaPartido"
            value={PartidoFormData.fechaPartido}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Rival</FormLabel>
          <input
            type="text"
            name="rival"
            value={PartidoFormData.rival}
            onChange={handleInputChange}
          />
        </FormControl>
        <Heading as="h3" fontSize="lg" mb={2}>
          Jugadores
        </Heading>
        {Array.from({ length: 18 }, (_, index) => (
          <FormControl mb={4} key={index}>
            <FormLabel>Jugador {index + 1}</FormLabel>
            <Select
              options={options}
              value={options.find(
                (option) =>
                  option.value.toString() === PartidoFormData.jugadoresSeleccionados[index]
              )}
              onChange={(selectedOption) => handleJugadorChange(selectedOption, index)}
            />
          </FormControl>
        ))}
        <Button type="submit">Cargar</Button>
      </form>
    </Box>
  );
}
