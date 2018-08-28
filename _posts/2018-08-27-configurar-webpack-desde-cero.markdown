---
layout: post
title: Cómo configurar webpack desde cero
description: Webpack es una herramienta de empaquetado de modulos. Para usarlo podemos ejecutar un simple comando o crear un archivo donde configuramos de manera más avanzada el proceso.  
img: webpack.png
tags: [JavaScript, webpack]
---
[webpack](https://webpack.js.org/) es una herramienta de empaquetado de modulos que nos facilita la vida. Básicamente, con un simple comando nos crea un `main.js` optimizado donde tiene incluido nuestros archivos JavaScript. 

Con webpack podemos automatizar tareas como el minificado y ofuscación del código, podemos importar estilos, imagenes, archivos xml como si fueran modulos (para webpack todos son modulos), podemos tener facilmente un servidor de desarrollo, entre otros beneficios.

webpack esta muy presente en el desarrollo web actual. De hecho si utilizamos herramientas de frameworks tales como [angular-cli](https://github.com/angular/angular-cli) o [create-react-app](https://github.com/facebook/create-react-app/blob/next/packages/react-scripts/package.json) en el fondo estamos usando webpack. El objetivo de estas herramientas es que los desarrolladores no hagamos ese trabajo de configuración y nos preocupemos solo por el código, sin embargo, es probable que en algún momento necesitemos tener una configuración más avanzada, y para cuando llegue ese momento es mejor estar preparados.

## Conceptos básicos

webpack procesa tu aplicación e internamente crea un gráfico de dependencia (dependency graph) por cada modulo y genera uno o más *bundles*. Con el archivo `webpack.config.js` podemos configurar este proceso. Dicho archivo consiste en un objeto javascript que tiene estas cuatro propiedades básicas:

* **Entry**: Punto de entrada donde webpack inicia a procesar la aplicación. En otras palabras, es el archivo que usa webpack internamente para empezar a construir el *dependency graph*. Con esto podemos intuir que si hay un modulo que no es importado ni en el archivo principal ni en las dependencias de este, entonces ese modulo no estará incluido en los bundles. Por defecto el valor de esta propiedad es `./src/index.js`. 

* **Output**: Acá le decimos a webpack donde emitirá el(los) bundle(s) generado(s). El valor por defecto es `dist/main.js`.

* **Loaders**: webpack por defecto solo entiende archivos JavaScript, con la propiedad *loaders* le indicamos como procesar otro tipo de archivos y nos permitirá importarlos en nuestra aplicación. Por ejemplo, para poder importar un `.css` en un archivo `.js` (es decir, `import ./file.css`) debemos de tener configurado un loader que procese los archivos css. 

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

Para instalar webpack, solo tenemos que ejecutar (teniendo node.js instalado) `npm install webpack webpack-cli --save-dev` en la raíz de nuestro proyecto. Desde la versión 4, con tan solo instalar y ejecutar `npx webpack` será suficiente para generar un *bundle*, no obstante, en el 99% de los casos vamos a necesitar una configuración más avanzada. Además, no es muy comun ejecutar webpack de esa manera, en general se crea un npm script `build` en el `package.json`. Así que en principio nuestro `package.json` queda así:

```javascript
{
  "name": "webpack-example",
  "version": "1.0.0",
  "description": "Webpack example",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
  },
  "author": "Diego Boscan (diegoboscan.com)",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.16.5",
    "webpack-cli": "^3.1.0",
  }
}
```

Ahora en el archivo `webpack.config.js` vamos a colocar lo siguiente:

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

Este es un archivo de configuración bastante básico, en la propiedad `entry` le decimos cual es el archivo donde empezará el proceso y en la propiedad `output` le indicamos el nombre del archivo final y el path donde queremos que lo genere. Pero esta configuración no basta ni para una prueba de concepto, necesitamos agregar cosas como la posiblidad de que webpack procese archivos .css, .xml, imagenes, entre otros.

## Instalando loaders

Para el procesamiento de estilos e imagenes, tenemos que instalar los *loaders* necesarios, para eso ejecutamos `npm install style-loader css-loader file-loader --save-dev`. Una vez instalados, tenemos que decirle a webpack que además de los archivos javascript, también busque otro tipo de archivos, para eso agregamos lo siguiente en nuestro archivo `webpack.config.js`:

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

Acá creamos dos reglas, una para archivos `.css` y otra para las imagenes, con una expresión regular indicamos los tipos de archivo en la key `test`, y en `use` los loaders necesarios. Con esto ya webpack sabe que todos los archivos que terminen en `.css` van a ser procesados mediante esos loaders. Para probar lo que llevamos, vamos a crear un archivo `style.css` donde definiremos la clase `test-class` y también colocaré una imagen. Finalmente en el archivo `index.js` escribiremos lo siguiente:

```javascript
import './style.css';
import Image from './image.jpeg';

let title = document.createElement('h1');
title.innerHTML = "Hello webpack!";
title.classList.add('test-class');
document.body.appendChild(title);

let img = document.createElement('img');
img.src = Image;
document.body.appendChild(img);
```

En el código arriba, estamos importando archivos que no son javascript (y webpack los reconocerá perfectamente gracias a los loaders), creamos una etiqueta h1 con la clase del archivo CSS y también colocamos la imagen que importamos. Ahora si ejecutamos `npm run build` debería webpack de hacer su trabajo y crear en la carpeta `dist` los archivos optimizados. 

Para verlo en el navegador tenemos que crear un archivo html y hacer referencia al script generado con la etiqueta `script`. Hasta acá la configuración que llevamos es buena, pero si estamos en desarrollo **tener que ejecutar ese comando para ver cada cambio que hagamos no es muy productivo**.

Otro problema que tendríamos es que webpack por defecto no limpia la carpeta `dist` y si por ejemplo en algún momento del desarrollo usamos una imagen y luego de varias compilaciones la quitamos, la imagen se mantendrá en la carpeta, **por lo tanto es una buena practica borrar la carpeta luego de cada compilación**, para resolver esos problemas, webpack nos ofrece un servidor de desarrollo y los ya mencionados *plugins*.

## Usando plugins y un servidor de desarollo

El servidor de desarrollo que nos ofrece webpack es muy fácil de usar, esta basado en Node.js y Express. Para instalarlo debemos ejecutar `npm install webpack-dev-server --save-dev` e indicarle que carpeta va a ejecutar, para eso añadimos al `webpack.config.js` lo siguiente:

```javascript 
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    }
```

Para empezar a usarla, debemos ejecutar `npx webpack-dev-server` y en el navegador en la URL http://localhost:8080/ podemos ver lo que vamos haciendo y compilará con cada cambio que hagamos. Es una buena practica crear un npm script para levantar el servidor de desarrollo, por ejemplo podemos crear el npm script `start` que además de iniciar el servidor de desarrollo, abra el navegador automáticamente. Nuestra sección de scripts en el `package.json` quedaría así:

```javascript
scripts: {
    "build": "webpack",
    "start": "webpack-dev-server --open"
}
```

Para finalizar utilizaremos un par de plugins bastante utiles, ejecutamos `npm install clean-webpack-plugin html-webpack-plugin --save-dev`. Luego de la instalación, añadiremos nuestros plugins al `webpack.config.js`, debemos importarlos y crear una instancia en la propiedad `plugins`,quedando así nuestro archivo:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Webpack Example'
        }),
    ],
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
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
};
```

Dependiendo el plugin que utilicemos vamos a tener la opción de configurarlos, por ejemplo el plugin `CleanWebpackPlugin` recibe un array con el nombre de la carpeta. Gracias a estos plugins, cada vez que webpack compile va a limpiar la carpeta `/dist` y también generará automaticamente el archivo `index.html` con los *bundles* importados.

## Conclusión

El ejemplo que acabamos de realizar es apenas una parte de todo lo que podemos hacer con Webpack. Podemos sacarle todavía más provecho a esta herramienta, podemos por ejemplo separar nuestro código para tener varios *bundles*, optimizar nuestra aplicación usando *lazy loading*, etc. Además, existen una buena cantidad de plugins y loaders para customizar aún más nuestro archivo de configuración.

Puedes encontrar el código del ejemplo en [mi repositorio en GitHub](https://github.com/dboscanv/webpack-example).