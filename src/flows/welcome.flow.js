import { createFlow, addKeyword} from '@builderbot/bot';

/**
 * Este flujo maneja el mensaje de bienvenida y pregunta al usuario 
 * si desea iniciar la carga de un documento.
 */
const welcomeFlow = createFlow([
    // El bot se activará con palabras comunes de saludo
    addKeyword(['hola', 'buenas', 'iniciar', 'empezar']) 
        .addAnswer(
            '¡Hola! Soy tu asistente para la carga de documentos. 👋',
            null, // No hay media
            async (ctx, { flowDynamic }) => {
                // Puedes usar flowDynamic para enviar el siguiente mensaje inmediatamente
                await flowDynamic('Mi función es ayudarte a asociar un archivo a un año específico.');
            }
        )
        .addAnswer(
            '¿Deseas subir un archivo en este momento?',
            {
                // Configuración para esperar la respuesta del usuario (capture: true)
                capture: true, 
                // Botones para guiar la respuesta
                buttons: [
                    { body: '✅ Sí, quiero subir un archivo' }, 
                    { body: '❌ No, gracias' }
                ],
            },
            async (ctx, { endFlow }) => {
                const answer = ctx.body.toLowerCase();

                // Lógica de validación simple:
                if (answer.includes('sí') || answer.includes('quiero')) {
                    // Si responde SÍ, por ahora solo confirmamos y terminamos.
                    // En el siguiente paso, aquí harías `return gotoFlow(uploadFlow);`
                    return endFlow('¡Excelente! Iniciando proceso de subida de archivo... (El siguiente paso se construirá pronto)');
                }

                if (answer.includes('no') || answer.includes('gracias')) {
                    // Si responde NO, terminamos la conversación.
                    return endFlow('Entendido. Puedes volver a escribirme cuando lo desees.');
                }
                
                // Si la respuesta no coincide con las opciones esperadas, 
                // simplemente terminamos la conversación para evitar bucles.
                // En un flujo más avanzado usarías `fallBack`.
                return endFlow('No te preocupes, cuando estés listo puedes escribir "hola" de nuevo.');
            }
        ),
]);

export default welcomeFlow;