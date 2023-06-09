-- CreateTable
CREATE TABLE "Partido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "rival" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Jugador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "nacimiento" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Incidencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "partidoId" INTEGER NOT NULL,
    "jugadorId" INTEGER NOT NULL,
    "tiempo" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    CONSTRAINT "Incidencia_partidoId_fkey" FOREIGN KEY ("partidoId") REFERENCES "Partido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Incidencia_jugadorId_fkey" FOREIGN KEY ("jugadorId") REFERENCES "Jugador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_JugadorToPartido" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_JugadorToPartido_A_fkey" FOREIGN KEY ("A") REFERENCES "Jugador" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_JugadorToPartido_B_fkey" FOREIGN KEY ("B") REFERENCES "Partido" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Jugador_dni_key" ON "Jugador"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "_JugadorToPartido_AB_unique" ON "_JugadorToPartido"("A", "B");

-- CreateIndex
CREATE INDEX "_JugadorToPartido_B_index" ON "_JugadorToPartido"("B");
