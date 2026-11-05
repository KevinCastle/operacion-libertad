# Cuenta regresiva para la libertad

Página estática para bromear de forma amistosa sobre el último día laboral de un amigo en Lima. El usuario pidió contador, memes y una celebración al vencer; proporcionó la referencia temporal después de la propuesta visual y funcional.

## Fecha

El 5 de noviembre de 2026 a las 16:49 en America/Santiago faltaban 2 días, 3 horas y 41 minutos. El destino es 2026-11-07T23:30:00Z, equivalente a 18:30 en America/Lima y 20:30 en America/Santiago. Mostrar la fecha explícita. Calcular siempre desde el reloj actual, incluso tras suspender la pestaña. Nunca mostrar números negativos.

## Experiencia

Una sola página en español: marca OPERACIÓN LIBERTAD, título grande, cuenta regresiva en cuatro unidades, tarjeta de meme que rota y botón para cambiarla. Estética de papel crema, tinta oscura, naranja y verde lima, tipografía expresiva y detalles de oficina. El usuario confirmó el nombre Adrián y pidió memes de The Office: incorporar imágenes de la serie guardadas localmente y registrar fuentes en docs/asset-sources.md. Permitir detener GIFs; usar una imagen estática con movimiento reducido.

Al vencer, mostrar ¡ERES LIBRE!, confeti y mensajes de despedida, incluso al abrir la página horas o días después. Por petición posterior del usuario se retira el modo de prueba y sus controles. Sonido opcional iniciado únicamente mediante interacción. Compartir con API nativa y alternativas de copiar enlace o copia manual. No añadir datos privados al enlace.

La barra de progreso comienza el 22 de octubre de 2026 a las 16:49 de Santiago (2026-10-22T19:49:00Z), dos semanas antes de la referencia inicial. Esta fecha se separa de la referencia del contador para conservar la duración y el vencimiento originales. La etiqueta SVG FUERA DE OFICINA debe mantener texto y padding dentro del fondo negro y del viewBox, incluida su rotación.

## Arquitectura y aceptación

HTML, CSS y módulos JavaScript sin dependencias de producción ni solicitudes a recursos remotos en ejecución. El módulo de tiempo es independiente de la UI. Servir mediante HTTP. Adaptar a 375 px y escritorio sin desbordamiento. Botones semánticos, foco visible, controles de teclado, estado anunciado sin leer cada segundo, respeto por prefers-reduced-motion. Si se abre después del vencimiento, la celebración aparece directamente.

La verificación incluye pruebas de cálculo y límite temporal, inspección real en navegador y comprobación de los controles. La entrega inicial quedó local y sin commits según la instrucción original. En el siguiente turno, el usuario autorizó los commits de publicación y pidió subir la página a su GitHub personal. Destino: KevinCastle/operacion-libertad; hosting: GitHub Pages desde gh-pages. Esta excepción corresponde a la publicación actual; no modifica la regla general para futuros cambios.
