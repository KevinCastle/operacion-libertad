# Operación Libertad

Una cuenta regresiva de despedida laboral para Adrián con memes de The Office, celebración y sonido opcional. Página estática en español, sin dependencias ni solicitudes a recursos externos en ejecución. Las fuentes de imágenes están en `docs/asset-sources.md`.

## Abrir localmente

Desde este directorio:

```sh
npm run dev
```

Abrir http://127.0.0.1:4173. Requiere Python 3 para el servidor. Los módulos necesitan HTTP; abrir index.html directamente como archivo no es compatible.

## Fecha

El contador termina el **sábado 7 de noviembre de 2026 a las 18:30 en Lima**, equivalente a **20:30 en Santiago** y **23:30 UTC**. Se obtuvo sumando 2 días, 3 horas y 41 minutos al 5 de noviembre, 16:49 de Santiago.

El instante está definido en `libertad/dist/countdown.mjs`. No depende de la zona horaria del navegador. Usa el reloj del dispositivo; conviene tener la hora automática activada.

## Comprobar

```sh
npm test
node --check libertad/dist/app.mjs
```

Se comprueba la referencia original, equivalencia de zonas horarias, el último segundo parcial, vencimiento exacto, apertura tardía y reanudación después de suspender la pestaña. La celebración de prueba no cambia el contador real.

## Publicación en GitHub Pages

El usuario autorizó los commits necesarios para subir esta entrega a su GitHub personal y publicarla. El repositorio de destino es `KevinCastle/operacion-libertad`.

El contenido completo para alojar está en `libertad/dist/`. La rama `main` conserva el código, pruebas y documentación; `gh-pages` contiene únicamente el sitio estático y es la fuente de GitHub Pages. No requiere backend ni build. `.nojekyll` evita procesar los archivos como un sitio Jekyll.

Para publicar cambios después de revisar y crear un commit en `main`:

```sh
npm test
git push origin main
git subtree push --prefix libertad/dist origin gh-pages
```

No crear commits automáticamente para trabajos futuros: la autorización de esta sesión corresponde a esta publicación. Las capturas locales se excluyen mediante `.gitignore`.

El enlace local funciona únicamente en este equipo. El enlace público se obtiene en la configuración de Pages del repositorio.
