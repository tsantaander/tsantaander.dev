# Collections del Blog Personal

Este directorio contiene las definiciones de las collections de Payload CMS para el blog personal.

## Collections Disponibles

### 1. **Users** (`Users.ts`)
Gestiona los autores del blog con autenticación integrada.

**Campos:**
- `name` (texto, requerido): Nombre del autor
- `email` (texto, requerido): Email para autenticación
- `bio` (textarea): Biografía del autor
- `avatar` (relación con Media): Foto de perfil
- `role` (select): Rol del usuario (admin/author)

### 2. **Media** (`Media.ts`)
Gestiona todas las imágenes del blog con múltiples tamaños optimizados.

**Campos:**
- `alt` (texto, requerido): Texto alternativo para accesibilidad
- `caption` (texto): Descripción de la imagen

**Tamaños generados automáticamente:**
- `thumbnail`: 400x300px
- `card`: 768x512px
- `tablet`: 1024px de ancho
- `desktop`: 1920px de ancho

### 3. **Posts** (`post.ts`)
Gestiona las publicaciones del blog con contenido rico.

**Campos:**
- `title` (texto, requerido): Título de la publicación
- `slug` (texto, requerido, único): URL amigable
- `excerpt` (textarea, requerido): Descripción corta para listados
- `featuredImage` (relación con Media, requerido): Imagen destacada
- `content` (richText, requerido): Contenido completo con soporte para imágenes
- `author` (relación con Users, requerido): Autor de la publicación
- `publishedDate` (fecha, requerido): Fecha y hora de publicación
- `status` (select, requerido): Estado (draft/published)
- `tags` (array): Etiquetas para categorización
- `readingTime` (número): Tiempo estimado de lectura en minutos

**Características:**
- Sistema de borradores y versiones
- Editor de texto enriquecido (Lexical)
- Soporte para imágenes en el contenido
- Sistema de etiquetas flexible

## Uso en la Aplicación

### Obtener todas las publicaciones publicadas:

```typescript
const response = await fetch('http://localhost:3000/api/posts?where[status][equals]=published&sort=-publishedDate')
const data = await response.json()
```

### Obtener una publicación por slug:

```typescript
const response = await fetch('http://localhost:3000/api/posts?where[slug][equals]=mi-post')
const data = await response.json()
const post = data.docs[0]
```

### Obtener publicaciones con autor e imagen:

```typescript
const response = await fetch('http://localhost:3000/api/posts?where[status][equals]=published&depth=2')
const data = await response.json()
```

## Variables de Entorno Requeridas

Asegúrate de tener configuradas estas variables en tu archivo `.env`:

```env
DATABASE_URI=mongodb://localhost:27017/tu-blog
PAYLOAD_SECRET=tu-secret-key-muy-segura
```

## Panel de Administración

Accede al panel de administración en: `http://localhost:3000/admin`

Aquí podrás:
- Crear y gestionar usuarios/autores
- Subir y organizar imágenes
- Crear, editar y publicar posts
- Gestionar borradores
- Ver versiones anteriores de posts
