# Cuenta regresiva para la libertad

## Ajustes solicitados desde comentarios del navegador

- [x] Plan: ampliar etiqueta SVG sin salir del viewBox, separar inicio de progreso de referencia temporal y eliminar ensayo de celebración de HTML/JS/CSS.
- [x] Contador: progreso desde 22 de octubre de 2026, 16:49 Santiago / 14:49 Lima. Fecha final y tiempo restante sin cambios.
- [x] UI: etiqueta negra con padding, texto accesible del progreso actualizado y sin controles de prueba.
- [x] Verificar nueve pruebas, etiqueta a 770 px y celebración automática al abrir después del vencimiento. El cambio de viewport a móvil no se aplicó en esta sesión; no se declara una nueva comprobación a 390 px.
- [ ] Publicar en el mismo GitHub Pages y comprobar archivos publicados.

### Validación de ajustes

- Nueve pruebas aprobadas; dos nuevas pruebas de progreso fallaron con el modelo anterior y pasaron con el inicio del 22 de octubre.
- Inspección real a 770 px: texto de etiqueta dentro del fondo, con aproximadamente 20.7 px de margen horizontal por lado; sin desbordamiento de página. Progreso accesible 87 % y cero elementos de ensayo.
- Dos copias temporales fuera del repositorio simularon reloj posterior al vencimiento (10 de noviembre) y transición desde cinco segundos restantes: en ambas se activó la celebración automáticamente. No se modificó el reloj del equipo ni se añadió un modo de prueba al sitio.
- Revisión independiente sin hallazgos materiales; no quedan referencias a preview ni handlers de botones eliminados.
- Nueva navegación local después de completar cambios: sin errores ni advertencias en consola. Una pestaña de QA creada mientras se editaban los archivos conservó un error transitorio previo a la integración, que no se reprodujo después.
- Referencias a CSS y módulos con v=2 para evitar mezclar HTML nuevo con código en caché de la versión anterior.

- [x] Confirmar fecha: 7 de noviembre de 2026, 18:30 Lima / 20:30 Santiago (23:30 UTC).
- [x] Revisar repositorio: vacío, sin dependencias ni harness de proyecto.
- [x] Definir alcance y plan en docs/superpowers.
- [x] Verificar con pruebas el contador, el vencimiento y las zonas horarias.
- [x] Crear página adaptable con memes rotativos y celebración de prueba.
- [x] Revisar en navegador escritorio y móvil y teclado; revisar por código movimiento reducido.
- [x] Documentar ejecución y límites de publicación. No crear commits.

## Validación

- `npm test`: 7/7 pruebas aprobadas; observado fallo previo al crear el módulo.
- `node --check libertad/dist/app.mjs` y `node --check libertad/dist/countdown.mjs`: aprobados.
- Navegador real a 1440, 390 y 320 px: scrollWidth coincide con el ancho de pantalla. A 390 y 320 px el contador completo termina antes de 800 px de altura.
- Comprobados: imágenes locales cargadas, navegación de memes, pausa de GIFs y su imagen estática correspondiente, ensayo de celebración, vuelta al contador y restauración de foco, sonido opcional activado/desactivado, repetición de confeti, aviso de enlace local y cierre por teclado.
- Sin errores ni advertencias capturados en consola.
- Revisión independiente aprobada tras corregir contraste: naranja/crema 3.085:1 para texto grande, tinta/naranja 4.601:1 para etiquetas pequeñas.
- Movimiento reducido revisado en CSS y JavaScript; no se emuló la preferencia del sistema. Compartir nativo y portapapeles del hosting público no se probaron, pues esta entrega se sirve en localhost.
- La transición real al vencimiento está cubierta por pruebas del modelo y revisión de su integración; en navegador se verificó mediante el modo ensayo, sin cambiar el reloj del sistema.
- Captura: artifacts/operacion-libertad.png. Vista local: http://127.0.0.1:4173/ (servidor de desarrollo retenido para revisión).
- No hay harness de proyecto ni comando harness:audit; no aplica.
- En la entrega local inicial no se crearon commits ni recursos de Sites. Después, el usuario autorizó la publicación con commits en su GitHub personal, reemplazando Sites por GitHub Pages para esta entrega.

## Publicación solicitada en GitHub personal

- [x] Confirmar cuenta personal KevinCastle y comprobar que operacion-libertad no existe.
- [x] Plan: conservar fuente/pruebas en main y publicar libertad/dist mediante gh-pages, sin workflow ni dependencias nuevas. Ignorar capturas locales y añadir .nojekyll.
- [x] Revalidar, crear el commit autorizado y subir a repositorio público KevinCastle/operacion-libertad.
- [x] Activar Pages desde gh-pages y esperar publicación; comprobar los archivos públicos por HTTP. La apertura en Codex se solicitó; el control del navegador no estuvo disponible para una segunda inspección visual.
- [x] Registrar resultado y preparar los enlaces del sitio y repositorio para la entrega.

### Resultado de publicación

- Repositorio público: https://github.com/KevinCastle/operacion-libertad
- Sitio público: https://kevincastle.github.io/operacion-libertad/
- Código inicial: 01ca301. Rama de sitio gh-pages: a544e93.
- GitHub Pages: estado built; fuente gh-pages, ruta /; HTTPS activado.
- Ejecución 42103709299: build y deploy aprobados.
- Verificación: los 12 archivos públicos devuelven HTTP 200 y coinciden por SHA-256 con los archivos locales ya probados. app.mjs se sirve como text/javascript.
- Las siete pruebas del contador y la comprobación de sintaxis pasaron antes de subir.
- La revisión visual local ya estaba aprobada; el navegador automatizado devolvió un error de disponibilidad al intentar revisar la URL pública. No se atribuye una inspección visual remota a esta entrega.
- GitHub personal confirmado; los commits usan su identidad noreply de GitHub en lugar del correo de trabajo.
