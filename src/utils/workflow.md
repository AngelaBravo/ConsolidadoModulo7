<link rel="stylesheet" href="./css_markdown.css"/>

# 1.- Vue create nombredelarchivo
# 2.- crear carpeta utils en src
Esto es para poner ahí los pdf con las instrucciones de lo que se necesita, y poder visualizarlo en el mismo VSCode cuando se requiera. ( tb se puede crear un archivo md con el nombre flujo de trabajao (workflow) donde se detalla los pasos que se siguieron para hacer el proyecto, es un detalle general, porque el especifico se hace en el readme)
# 3.- Instalar axios y Vuetify
-npm i axios vuetify 
# 4.- instalar font para iconos entretenidos
 npm install @mdi/font
# 5.- modificar main.js
 Ingresar:
 - import vuetify from './plugins/vuetify'  => bajo el último import existente
 - Modificar última línea para que quede así:
createApp(App).use(store).use(router).use(vuetify).mount('#app')
# 6.- crear carpeta pluging
- En el directorio src crear una carperta: Plugins
- Dentro de plugins crear un archivo: vuetify.js
- Aquí se agrega la confoguracion de Vuetify para no modificar mucho el archivo main.js
- En el archivo vuetify.js se agrega lo sgte:
```js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
export default createVuetify({
components,
directives,
icons: {
defaultSet: 'mdi'
}
})
```
# 7.- modificar router/index.js
 Hay que crear las rutas que se necesiten para el proyecto si no existen ( primero se crea la ruta y luego en donde esta el import, se posiciona el mouse en la ruta en si y se apreta control ( o alt no recuerdo) + click y ahí se crea el archivo solito)

# 8.- para usar vuetify
En el archivo App.vue, debajo del template debo rodear todo entre, esto es para que funcione todo lo de vuetify y los iconos de design correctamente:
```html
<v-app>
    <v-container>
    aquí dentro va todo el contenido
    </v-container>
</v-app>
```
# 9.-  Problemas con navbar y el espacio que no se respeta
cuando pongo navbar en alguna vista completa, en app.vue el `<router-view/>` debe ir rodeado de v-main
Y debería quedar algo así:
```html
<template>
  <v-app>
    <v-container>
      <Navbar/>
      <v-main><router-view/></v-main>
    </v-container>
  </v-app>
</template>
```

# 10.- errores de eslint
Cuando el archivo da errores de eslint en la terminal sale la frase que se debe usar, hay que ver con qué tipo de comentario hay que escribirla ( HTML `<!-- -->` o js `/* */`) 
Las frases son:
Use // eslint-disable-next-line to ignore the next line.
Use /* eslint-disable */ to ignore all warnings in a file.

# 11.- data
Cuando tengo los datos de los cuales quiero obtener la informacion debo en la carpeta SRC, hacer una nueva carpeta que se llama db y ahí un archivo con nombre: data.js y ahí poner los datos ( puede ser un objeto o arreglos)
luego se importa ese archivo a store/index.js y se agrega en el state
```js
  import data from '@/db/data'

  export default createStore({
  state: {
    cursos:data.cursos,
  },
  ```
donde la propiedad cursos (cursos:) es un nombre que yo invento, en este caso es el mismo nombre que del arreglo, pero puede ser distinto y data.cursos es el arreglo que está dentro del archivo data.js y el arreglo se llama cursos.
```js
   "cursos": [
        {
            "id": 1,
            "nombre": "JavaScript Avanzado",
        },
]
```
Luego en el componente donde se usarán los datos del data el import y agregar algo al computed:
```js
   import { mapState } from 'vuex'
   computed: {
    ...mapState(['nombre de la propiedad que está en el store/index/ en el state']) // Mapea el estado 'cursos' al componente
  }
  ```
# 12 .- getters
en store/index.js en la propiedad getters se deben hacer los calculos que se necesiten obtener de la base de datos
este es un ejemplo:
```js
getters: { 
    totalAlumnosPermitidos: (state) => {
      return state.cursos.reduce((total, curso) => total + curso.cupos, 0)
    },
}
```

# 13.- como obtener los iconos
los iconos se sacan de esta pagina: https://pictogrammers.com/library/mdi/
y se envuelven en edl atributo v-icon y al nombre del icono hay que ponerle antes mdi-:
```html
<v-icon>mdi-account-multiple</v-icon>  // o 
<v-icon icon="mdi-account-multiple"></v-icon>
```
con cualquiera de esas formas aparece el icono
