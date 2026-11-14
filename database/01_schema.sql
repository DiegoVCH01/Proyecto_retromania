
-- ==========================================
-- RETROMANÍA - BASE DE DATOS INICIAL
-- PostgreSQL / Supabase
-- ==========================================

-- 1. CATÁLOGO DE TECNOLOGÍA

CREATE TABLE IF NOT EXISTS public.tecnologias (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre TEXT NOT NULL,
    marca TEXT NOT NULL,
    anio INTEGER NOT NULL,
    decada TEXT NOT NULL,
    categoria TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    imagen_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT tecnologia_decada_valida
        CHECK (decada IN ('90s', '2000s')),

    CONSTRAINT tecnologia_anio_valido
        CHECK (
            (decada = '90s' AND anio BETWEEN 1990 AND 1999)
            OR
            (decada = '2000s' AND anio BETWEEN 2000 AND 2009)
        ),

    CONSTRAINT tecnologia_unica
        UNIQUE (nombre, anio)
);


-- 2. ENCUESTAS DE LA COMUNIDAD

CREATE TABLE IF NOT EXISTS public.encuestas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    decada TEXT NOT NULL,
    categoria TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT encuesta_decada_valida
        CHECK (decada IN ('90s', '2000s')),

    CONSTRAINT encuesta_categoria_valida
        CHECK (
            categoria IN (
                'videojuegos',
                'musica',
                'cine',
                'tecnologia'
            )
        )
);


-- 3. RECUERDOS ENVIADOS POR VISITANTES

CREATE TABLE IF NOT EXISTS public.recuerdos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    alias TEXT NOT NULL,
    correo TEXT NOT NULL,
    decada TEXT NOT NULL,
    mensaje TEXT NOT NULL,
    estado TEXT NOT NULL DEFAULT 'pendiente',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT recuerdo_alias_valido
        CHECK (CHAR_LENGTH(TRIM(alias)) BETWEEN 2 AND 50),

    CONSTRAINT recuerdo_correo_valido
        CHECK (
            CHAR_LENGTH(correo) <= 254
            AND correo LIKE '%_@_%._%'
        ),

    CONSTRAINT recuerdo_decada_valida
        CHECK (decada IN ('90s', '2000s')),

    CONSTRAINT recuerdo_mensaje_valido
        CHECK (CHAR_LENGTH(TRIM(mensaje)) BETWEEN 10 AND 800),

    CONSTRAINT recuerdo_estado_valido
        CHECK (estado IN ('pendiente', 'aprobado', 'rechazado'))
);


-- 4. ÍNDICES PARA CONSULTAS

CREATE INDEX IF NOT EXISTS idx_tecnologias_decada
ON public.tecnologias (decada);

CREATE INDEX IF NOT EXISTS idx_recuerdos_estado
ON public.recuerdos (estado, created_at DESC);


-- 5. ACTIVAR ROW LEVEL SECURITY

ALTER TABLE public.tecnologias
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.encuestas
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.recuerdos
ENABLE ROW LEVEL SECURITY;


-- 6. RETIRAR PERMISOS GENERALES

REVOKE ALL ON TABLE public.tecnologias
FROM PUBLIC, anon, authenticated;

REVOKE ALL ON TABLE public.encuestas
FROM PUBLIC, anon, authenticated;

REVOKE ALL ON TABLE public.recuerdos
FROM PUBLIC, anon, authenticated;

GRANT USAGE ON SCHEMA public
TO anon, authenticated;


-- 7. PERMISOS DE TECNOLOGÍA
-- Los visitantes solamente pueden leer.

GRANT SELECT ON public.tecnologias
TO anon, authenticated;

DROP POLICY IF EXISTS "Leer tecnologias"
ON public.tecnologias;

CREATE POLICY "Leer tecnologias"
ON public.tecnologias
FOR SELECT
TO anon, authenticated
USING (true);


-- 8. PERMISOS DE ENCUESTAS
-- Se pueden enviar respuestas, pero no
-- consultar, modificar ni eliminar registros.

GRANT INSERT (decada, categoria)
ON public.encuestas
TO anon, authenticated;

DROP POLICY IF EXISTS "Enviar encuestas"
ON public.encuestas;

CREATE POLICY "Enviar encuestas"
ON public.encuestas
FOR INSERT
TO anon, authenticated
WITH CHECK (true);


-- 9. PERMISOS DE RECUERDOS
-- Los nuevos recuerdos quedan pendientes.
-- El público solo lee los aprobados.
-- El correo electrónico permanece privado.

GRANT INSERT (alias, correo, decada, mensaje)
ON public.recuerdos
TO anon, authenticated;

GRANT SELECT (id, alias, decada, mensaje, created_at)
ON public.recuerdos
TO anon, authenticated;

DROP POLICY IF EXISTS "Enviar recuerdos"
ON public.recuerdos;

CREATE POLICY "Enviar recuerdos"
ON public.recuerdos
FOR INSERT
TO anon, authenticated
WITH CHECK (estado = 'pendiente');

DROP POLICY IF EXISTS "Leer recuerdos aprobados"
ON public.recuerdos;

CREATE POLICY "Leer recuerdos aprobados"
ON public.recuerdos
FOR SELECT
TO anon, authenticated
USING (estado = 'aprobado');


-- 10. REGISTROS INICIALES DE TECNOLOGÍA

INSERT INTO public.tecnologias
(nombre, marca, anio, decada, categoria, descripcion)
VALUES
('PlayStation', 'Sony', 1994, '90s',
 'Consolas',
 'Consola de videojuegos que popularizó los juegos en CD y gráficos 3D.'),

('Nintendo 64', 'Nintendo', 1996, '90s',
 'Consolas',
 'Consola de 64 bits reconocida por sus videojuegos tridimensionales.'),

('Game Boy Pocket', 'Nintendo', 1996, '90s',
 'Portátiles',
 'Versión compacta de la consola portátil Game Boy.'),

('Game Boy Color', 'Nintendo', 1998, '90s',
 'Portátiles',
 'Consola portátil que incorporó una pantalla a color.'),

('Dreamcast', 'Sega', 1998, '90s',
 'Consolas',
 'Consola de Sega con funciones de conexión a internet.'),

('Nokia 3210', 'Nokia', 1999, '90s',
 'Telefonía',
 'Teléfono móvil popular por su resistencia y diseño.'),

('PlayStation 2', 'Sony', 2000, '2000s',
 'Consolas',
 'Consola que también permitía reproducir películas en DVD.'),

('Nokia 3310', 'Nokia', 2000, '2000s',
 'Telefonía',
 'Teléfono conocido por su durabilidad y por el juego Snake.'),

('iPod', 'Apple', 2001, '2000s',
 'Audio',
 'Reproductor portátil que popularizó las bibliotecas musicales digitales.'),

('Game Boy Advance', 'Nintendo', 2001, '2000s',
 'Portátiles',
 'Consola portátil de Nintendo con gráficos mejorados.'),

('PlayStation Portable', 'Sony', 2004, '2000s',
 'Portátiles',
 'Consola portátil conocida como PSP, con funciones multimedia.'),

('Nintendo DS', 'Nintendo', 2004, '2000s',
 'Portátiles',
 'Consola portátil con dos pantallas, una de ellas táctil.')

ON CONFLICT (nombre, anio) DO NOTHING;
