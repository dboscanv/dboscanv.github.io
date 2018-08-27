---
layout: post
title: Webpack
description: Como usar webpack
img: webpack.jpg
tags: [JavaScript, Webpack]
---
[Webpack](https://webpack.js.org/) es una herramienta de empaquetado de modulos que nos facilita la vida. Básicamente, con un simple comando nos crea un `main.js` optimizado donde tiene incluido nuestros archivos JavaScript. 

## Por que usar Webpack?

Desde la versión 4, ejecutando `npx webpack` buscará el archivo principal de tu aplicación en `src/index.js` y generará el archivo `main.js` sin necesidad de tocar nada más, sin embargo, en el 99% de los casos vas a necesitar configurar el procesamiento de archivos que hace Webpack.

## Creando el archivo de configuracioón

Webpack procesa tu aplicación e internamente crea un gráfico de dependencia (dependency graph) por cada modulo y genera uno o más *bundles*. Con el archivo `webpack.config.js` podemos configurar avanzadamente este proceso. Dicho archivo consiste en un objeto javascript que tiene estas cuatro propidades básicas:

* **Entry**: Punto de entrada donde webpack inicia a procesar la aplicación. En otras palabras, es el archivo que usa webpack internamente para empezar a construir el *dependency graph*. Con esto podemos intuir que si hay un modulo que no es importado ni en el archivo principal ni en las dependencias de este, entonces ese modulo no estará incluido en los bundles. Por defecto el valor de esta propiedad es `./src/index.js`. 

* **Output**: Acá le decimos a webpack donde emitirá el(los) bundle(s) generado(s). El valor por defecto es `dist/main.js`.

* **Loaders**: Webpack por defecto solo entiende archivos JavaScript, con la propiedad *loaders* le indicamos como procesar otro tipo de archivos y nos permitirá importarlos en nuestra aplicación. Por ejemplo, para poder importar un `.css` en un archivo `.js` (es decir, `import ./file.css`) debemos de tener configurado un loader que procese los archivos css. 

* **Plugins**: En esta propiedad declaramos los plugins que vamos a necesitar en el proceso de *bundling*. Un ejemplo sería el plugin que crea automáticamente el archivo index.html inyectando automaticamente los *bundles* generados.

## Creando el archivo de configuración

Para esta demostración creé un proyecto con la siguiente estructura:

```
.
+-- src/
|   +-- index.js
+-- webpack.config.js
+-- package.json
```

Para instalar Webpack, solo tenemos que ejecutar (teniendo node.js instalado) `npm install webpack webpack-cli --save-dev` en la raíz de nuestro proyecto. Ahora en el archivo `webpack.config.js` vamos a colocar lo siguiente:

```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

Este es un archivo de configuración bastante básico, en la propiedad `entry` le decimos cual es el archivo donde empezará el proceso y en la propiedad output le indicamos el nombre del archivo final y el path donde queremos que lo genere. Pero esta configuración no basta ni para una prueba de concepto, necesitamos agregar cosas como la posiblidad de que Webpack procese archivos .css, .xml, imagenes, entre otros.

## Instalando loaders

Para el procesamiento de archivos .css e imagenes, tenemos que instalar los *loaders* necesarios, para eso ejecutamos `npm install style-loader css-loader file-loader --save-dev`. Una vez instalados, tenemos que decirle a Webpack que además de los archivos javascript, también busque otro tipo de archivos, para eso agregamos lo siguiente:

```javascript
 module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: ['file-loader']
            }
        ]
    }
```

Acá creamos dos reglas, una para archivos `.css` y otra para las imagenes, con una expresión regular indicamos los tipos de archivo en la key `test`, y en `use` los loaders necesarios. Con esto ya Webpack sabe que todos los archivos que terminen en `.css` van a ser procesados mediante esos loaders. Para probar lo que llevamos, vamos a crear un archivo `style.css` donde definiremos la clase `test-class` y también colocaré una imagen. Finalmente en el archivo `index.js` escribiremos lo siguiente:

```javascript
import './style.css';
import Image from './image.jpeg';

let title = document.createElement('h1');
title.innerHTML = "Hello Webpack!";
title.classList.add('test-class');
document.body.appendChild(title);

let img = document.createElement('img');
img.src = Image;
document.body.appendChild(img);
```

En el código arriba, estamos importando archivos que no son javascript (y Webpack los reconocerá perfectamente gracias a los loaders), creamos una etiqueta h1 con la clase del archivo CSS y también colocamos la imagen que importamos. Ahora si hacemos `npx webpack` debería Webpack de hacer su trabajo y crear en la carpeta `dist` los archivos optimizados. 

Para verlo en el navegador podemos crear un archivo html y hacer referencia al script generado con la etiqueta `script`. Hasta acá la configuración que llevamos es buena si solo tuvieramos que ejecutar `npx webpack` una vez, pero si estamos en desarrollo **tener que ejecutar ese comando para ver que cada cambio que hagamos no es muy productivo**. 

Otro problema que tendríamos es que Webpack por defecto no limpia la carpeta `dist` y si por ejemplo en algún momento del desarrollo usamos una imagen y luego de varias compilaciones la quitamos, la imagen se mantendrá en la carpeta, **por lo tanto es una buena practica borrar la carpeta luego de cada compilación**, para resolver esos problemas, Webpack nos ofrece un servidor de desarrollo y los ya mencionados *plugins*.

## Usando plugins y un servidor de desarollo

El servidor de desarrollo que nos ofrece Webpack es muy fácil de usar, esta basado en Node.js y Express. Para instalarlo debemos ejecutar `npm install webpack-dev-server --save-dev` e indicarle que carpeta va a ejecutar, para eso añadimos al `webpack.config.js` lo siguiente:

```javascript 
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    }
```

Para empezar a usarla, debemos ejecutar `npx webpack-dev-server` y en el navegador en la URL http://localhost:8080/ podemos ver lo que vamos haciendo y compilará con cada cambio que hagamos. Generalmente, en la parte de `scripts` del `package.json` se coloca esta instrucción y la del build,por ejemplo:

```javascript
scripts: {
    build: 'webpack',
    start: 'webpack-dev-server --open'
}
```

De manera que al ejecutar `npm run start` iniciará el servidor y ejecutando `npm run build` creará los archivos optimizados.

Para finalizar utilizaremos un par de plugins, ejecutamos `npm install clean-webpack-plugin html-webpack-plugin --save-dev`. Con estos, Webpack en cada build va a limpiar la carpeta `/dist` y también generará automaticamente el archivo `index.html`.

TODO: PLUGINS ..!



Ejemplo de webpack:

Crear un proyecto, npm init, instalar webpack, webpack-cli and webpack-dev-server
Crear carpeta de src y dist, dentro de source crear el main.js, ejecutar npx webpack (probar sin main.js deberia dar error de webpack), ya que desde Webpack 4, con solo eso webpack va a funcionar (ahondar un poco en esto).


Agregar script de build en el package.json

COMO MANEJAR ESTILOS:

npm install --save-dev style-loader css-loader
Modificar el webpack.config.js y agregar los loaders de CSS

MANEJAR IMAGENES:
npm install --save-dev file-loader
Modificar el webpack.config y agregar los loaders file-loader for images

Manerjar fuentes, data (json,xml), etc..

OUTPUT MANAGEMENT: Explicar
https://webpack.js.org/guides/output-management/
Generando un index.html, limpiando la carpeta folder

WEB-SERVER:
npm install --save-dev webpack-dev-server
Add  devServer: {
        contentBase: './dist'
    }, to the webpack.config
Add +     "start": "webpack-dev-server --open",
to package.json

Activar HMR:
plugin de hmr, OPTION DE HOT en el dev server y voalaaa