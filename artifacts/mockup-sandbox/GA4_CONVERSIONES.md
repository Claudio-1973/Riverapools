# Eventos de conversiones GA4

El sitio usa la propiedad GA4 `G-M3FJ6JNQ4V`. Los eventos se envían únicamente
con contexto de negocio no identificable. Nunca se mandan a GA4 nombres,
teléfonos, correos electrónicos, comentarios, asuntos ni el número telefónico
al que se hace clic.

## Eventos

| Evento | Cuándo se envía | Parámetros seguros |
| --- | --- | --- |
| `phone_click` | Cuando una persona hace clic en un enlace `tel:` | `phone_location`, `page_path` |
| `generate_lead` | Después de que Web3Forms confirma un envío exitoso de cotización | `form_location`, `city` cuando existe, `service` cuando existe, `page_path` |
| `google_review_click` | Cuando se abre o se intenta abrir el formulario público de reseña de Google | `review_source`, `rating`, `page_path` |
| `private_feedback_submitted` | Después de que Web3Forms confirma un comentario privado exitoso | `rating`, `page_path` |

`page_path` permite comparar la página y la ciudad de origen sin guardar datos
introducidos por el visitante. `rating` es únicamente el número de estrellas
seleccionado (1 a 5); nunca se envía el contenido de la reseña o del comentario.

## Marcar conversiones en GA4

1. Abre **Administrador → Visualización de datos → Eventos** en la propiedad GA4.
2. Espera a que cada evento aparezca al menos una vez en **Eventos existentes**
   (puedes usar DebugView para una prueba).
3. Marca como evento clave, según el objetivo del negocio:
   - `generate_lead` para solicitudes de cotización.
   - `phone_click` para intención de llamada.
   - `google_review_click` para clics hacia Google Reviews.
4. Deja `private_feedback_submitted` como evento de seguimiento operativo, o
   márcalo como evento clave si también quieres medir esos contactos.

Los eventos personalizados no aparecen retroactivamente: deben configurarse
antes de analizar nuevos datos como conversiones.