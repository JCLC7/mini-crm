// En tu componente Vue (e.g., Contacto.vue)
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick} from 'vue' // Añade onBeforeUnmount
import axios from 'axios'

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

const nombreCompleto = ref('')
const correo = ref('')
const telefono = ref('')
const mensaje = ref('')
const terminos = ref(false)

const enviando = ref(false)
const exito = ref(false)
const error = ref('')

const captchaWidgetId = ref<number | null>(null)

// Define la función para renderizar el reCAPTCHA
// La hacemos accesible globalmente para que el script de reCAPTCHA la llame
// después de cargar.
const renderRecaptcha = () => {
  const container = document.getElementById('captcha-container');
  if (container && (window as any).grecaptcha) {
    captchaWidgetId.value = (window as any).grecaptcha.render(container, {
      sitekey: siteKey,
      // Puedes añadir callbacks para manejar eventos del captcha aquí si los necesitas
      // callback: (token: string) => { /* Tu lógica para el token */ },
      // 'expired-callback': () => { /* Cuando el token expira */ }
    });
    console.log('reCAPTCHA renderizado con ID:', captchaWidgetId.value);
  } else {
    console.warn('Contenedor de captcha no encontrado o grecaptcha no disponible.');
  }
};

onMounted(async () => {
  (window as any).onloadCallback = renderRecaptcha

  await nextTick() // Espera que se monte el template
  if ((window as any).grecaptcha && (window as any).grecaptcha.render && captchaWidgetId.value === null) {
    renderRecaptcha()
  }
})

onBeforeUnmount(() => {
  // Limpia el onloadCallback global si este componente es el único que lo define
  if ((window as any).onloadCallback === renderRecaptcha) {
    delete (window as any).onloadCallback;
  }
  // Opcional: resetear el widget reCAPTCHA al desmontar el componente
  if (captchaWidgetId.value !== null && (window as any).grecaptcha) {
      (window as any).grecaptcha.reset(captchaWidgetId.value);
  }
});

// ... (el resto de tu lógica de enviarFormulario es correcta) ...
const enviarFormulario = async () => {
  error.value = ''
  exito.value = false

  // Validaciones de campos...

  enviando.value = true

  const grecaptcha = (window as any).grecaptcha
  const token = captchaWidgetId.value !== null ? grecaptcha.getResponse(captchaWidgetId.value) : ''

  if (!token) {
    error.value = 'Por favor completa el captcha.'
    enviando.value = false
    return
  }

  try {
    const respuesta = await axios.post('https://api.jclc.xyz/api/contacto', {
      nombreCompleto: nombreCompleto.value,
      correo: correo.value,
      telefono: telefono.value,
      mensaje: mensaje.value,
      recaptchaToken: token,
    })

    if (respuesta.status === 201) {
      exito.value = true
      nombreCompleto.value = ''
      correo.value = ''
      telefono.value = ''
      mensaje.value = ''
      terminos.value = false
      if (captchaWidgetId.value !== null) {
        grecaptcha.reset(captchaWidgetId.value)
      }
    }
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Error al enviar el formulario'
    if (captchaWidgetId.value !== null) {
      grecaptcha.reset(captchaWidgetId.value)
    }
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <div class="min-h-[90vh] flex items-center justify-center">
    <div class="relative p-10 bg-white rounded-2xl shadow-lg max-w-lg w-full">
      <div class="absolute inset-0 -z-10 transform rotate-6 bg-blue-500 rounded-2xl"></div>

      <h2 class="text-xl font-semibold text-gray-800">
        <span class="text-blue-600 font-bold">¿Necesitas ayudaaaaaaaaaaaaaa?</span> Por favor completa el
        formulario.
      </h2>

      <form class="mt-5 space-y-4" @submit.prevent="enviarFormulario">
        <div>
          <label class="block font-medium text-gray-700">Nombre completo*</label>
          <input
            v-model="nombreCompleto"
            type="text"
            placeholder="Tu nombre"
            class="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label class="block font-medium text-gray-700">Correo*</label>
          <input
            v-model="correo"
            type="email"
            placeholder="Tu correo"
            class="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label class="block font-medium text-gray-700">Teléfono*</label>
          <input
            v-model="telefono"
            type="tel"
            placeholder="Tu número"
            class="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label class="block font-medium text-gray-700">Mensaje*</label>
          <textarea
            v-model="mensaje"
            placeholder="Escribe tu mensaje"
            rows="4"
            class="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            required
          ></textarea>
        </div>

        <div>
          <label class="flex items-center cursor-pointer">
            <input
              v-model="terminos"
              type="checkbox"
              class="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span class="ml-2 text-gray-700">Acepto los términos y condiciones*</span>
          </label>
        </div>

        <!-- Contenedor del captcha con ID -->
        <div id="captcha-container" class="mt-4"></div>

        <button
          type="submit"
          :disabled="enviando"
          class="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          {{ enviando ? 'Enviando...' : 'Enviar mensaje' }}
        </button>

        <!-- Mensajes -->
        <p v-if="exito" class="text-blue-600 font-medium mt-2">¡Formulario enviado con éxito!</p>
        <p v-if="error" class="text-red-600 font-medium mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
