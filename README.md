# Página de donaciones — LaCardio

Página estática, mobile-first y preparada para GitHub Pages.

## Archivos

```text
/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── campana.jpg
    └── logo.png
```

Las imágenes proporcionadas se dejaron dentro de `assets/` como `campana.jpg` y `logo.png`.

## 1. Conectar el formulario de "Otro valor" con Formspree

GitHub Pages no ejecuta código de servidor, por lo que el formulario utiliza Formspree.

1. Crea una cuenta en [Formspree](https://formspree.io/).
2. Crea un formulario nuevo.
3. Configura como correo de destino `Ecaudofunda@gmail.com`.
4. Copia el **Form ID** que te entrega Formspree. Tendrá un formato parecido a `xabcdefg`.
5. Abre `index.html`.
6. Busca:

```html
action="https://formspree.io/f/REEMPLAZAR_CON_TU_ID"
```

7. Sustituye `REEMPLAZAR_CON_TU_ID` por tu Form ID. Por ejemplo:

```html
action="https://formspree.io/f/xabcdefg"
```

No pongas contraseñas, tokens privados ni API keys en `index.html`, `style.css` o `script.js`.

### Correo recibido

Los campos enviados están preparados para que el mensaje contenga:

- **Nueva solicitud de donación**
- **Nombre**
- **Celular**
- **Correo**
- **Valor solicitado**

El asunto del formulario está definido como `Nueva solicitud de donación`.

> Importante: el envío real depende de que completes la conexión de Formspree y verifiques el correo de destino. No es seguro ni fiable enviar correo directamente desde JavaScript usando una contraseña de Gmail.

## 2. Probar antes de publicar

Después de colocar el Form ID:

1. Abre la página en un navegador.
2. Prueba los cinco montos fijos y confirma que cada uno abre su checkout de ePayco.
3. Pulsa **Otro valor**.
4. Comprueba que la validación impide enviar campos vacíos, correo inválido y valores menores o iguales a cero.
5. Envía una solicitud de prueba.
6. Confirma que llega a `Ecaudofunda@gmail.com`.
7. Verifica que se muestre el mensaje de éxito.
8. Comprueba también que la página se vea correctamente en celular.

## 3. Crear el repositorio en GitHub

1. Entra a [GitHub](https://github.com/) e inicia sesión.
2. Pulsa **New repository**.
3. Ponle un nombre, por ejemplo `donaciones-lacardio`.
4. Puedes dejarlo como **Public** si quieres usar GitHub Pages de forma sencilla.
5. Crea el repositorio.

## 4. Subir los archivos

Sube:

- `index.html`
- `style.css`
- `script.js`
- `README.md`

Después crea la carpeta `assets` y sube dentro:

- `campana.jpg`
- `logo.png`

La estructura final debe quedar exactamente así:

```text
donaciones-lacardio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── campana.jpg
    └── logo.png
```

## 5. Activar GitHub Pages

En el repositorio:

1. Abre **Settings**.
2. Entra en **Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. En **Branch**, selecciona la rama principal, normalmente `main`.
5. Selecciona la carpeta **/(root)**.
6. Pulsa **Save**.
7. Espera unos minutos mientras GitHub publica el sitio.

La URL normalmente tendrá esta estructura:

```text
https://TU-USUARIO.github.io/donaciones-lacardio/
```

GitHub mostrará la URL exacta en **Settings → Pages**.

## Enlaces de ePayco configurados

Los botones usan exactamente estos checkout:

| Monto | Checkout |
|---|---|
| $200.000 | `https://new-checkout.epayco.co/checkout/6a9f49178086ec20539e15da` |
| $500.000 | `https://new-checkout.epayco.co/checkout/6a9f493296af39c0209d0d66` |
| $1.000.000 | `https://new-checkout.epayco.co/checkout/6a9f494696af39c0209d0edd` |
| $2.000.000 | `https://new-checkout.epayco.co/checkout/6a9f496496af39c0209d10ff` |
| $4.000.000 | `https://new-checkout.epayco.co/checkout/6a9f497d96af39c0209d12f2` |

## Privacidad y seguridad

- No se usa `localStorage`.
- No se guardan credenciales de correo en el navegador.
- El formulario muestra qué información recopila y para qué se utiliza.
- La validación se realiza en el navegador antes del envío.
- Se incluye un campo honeypot para reducir spam.
- Formspree debe encargarse del procesamiento y protección del envío del formulario.
- No se deben añadir API keys privadas al repositorio público.

## Nota sobre las imágenes

`assets/campana.jpg` corresponde a la segunda imagen proporcionada y `assets/logo.png` a la primera. El sitio no altera el contenido visual de la campaña; la imagen se muestra completa, centrada y responsive.
