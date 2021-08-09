---
title: ¿Debería usar punto y coma en JavaScript?
date: "2018-08-11T22:40:32.169Z"
description: ¿Es realmente necesario usar punto y coma en JavaScript? La respuesta corta es no, pero hay unas reglas que tenemos que saber.
featuredImage: ../../../src/images/js-1.png
---

Hace unos meses vi por primera vez código JavaScript sin puntos y comas, yo soy una de esas personas que venimos de la "escuela Java", y estamos acostumbrados a colocar punto y coma (semicolon en inglés) casi que automáticamente al finalizar una expresión. 

Sabía que era permitido, pero que era considerado como una mala practica, al igual que declarar variables sin `var` (ahora debemos usar `let` o `const`). Pero como el mundo de la programación es tan cambiante, se me genero la duda de **si es actualmente necesario usar semicolons en JavaScript**.

La respuesta corta es **no**, no es necesario. JavaScript interpreta el código y infiere donde termina el bloque para colocar el punto y coma. Además, actualmente no es considerado una mala práctica. Por lo tanto, es cuestión de gustos, sin embargo, hay unas reglas indicadas en la [especificación ECMA](http://www.ecma-international.org/ecma-262/7.0/) que debemos saber.

## ¿Cómo funciona el *Automatic Semicolon Insertion* de JavaScript?

El intérprete de JavaScript lee el código de izquierda a derecha e inserta el punto y coma (sino esta presente) cuando se cumplan una de estas reglas:

1. Encuentra un potencial error, el punto y coma es insertado antes del carácter si:
    + Hay una salto de linea (line break) en ese punto
    + El carácter inesperado es `}`
2. Al final del programa
3. Encuentra un `++`, `--`,`return`,`continue`,`return` o `throw` y después hay un salto de línea

Estas reglas se aplican siempre y cuando el programa no sea en una línea, en ese caso usar semicolon es obligatorio, `let a=1 let b=2` no está permitido.

## En la práctica

Para que se entiendan las tres reglas, haré unos ejemplos simples:

```javascript
let x = 10
let y = 20
let obj = {a:1,b:2}

console.log(x, y)
```

El intérprete empieza a analizar el código desde la línea 1 de izquierda a derecha, cuando pasa a la siguiente línea y analiza el primer carácter (la `l`) encuentra un posible error: no esta permitido declarar una variable con el valor `10l`, en ese momento aplica la regla 1, que dice que si hay un salto de línea en ese punto se coloca un punto y coma. También lo coloca en la declaración de `obj`, ya que el carácter es `}`.

En el mismo ejemplo se aplica la regla 2, al final del programa, cuando no hay más nada que analizar termina con un punto y coma, de manera que el código es transformado por JavaScript así:

```javascript
let x = 10;
let y = 20;
let obj = {a:1,b:2};

console.log(x, y);
```

Por último, en el caso de la regla 3 es donde hay ser más cuidadosos cuando programamos sin punto y coma. Consideren el siguiente ejemplo:

```javascript
let x = 5

function example() {
    return
    x
}

console.log(example())
```

El ejemplo anterior retornará `undefined` porque al haber una sentencia `return` y un salto de línea, el intérprete coloca el punto y coma, dejandolo así:

```javascript
//..
function example() {
    return;
    x;
}
//..
```

Ahora, veamos un ejemplo donde a simple vista pensamos que funciona, pero en realidad el comportamiento no es el esperado:

```javascript
const a = 5
const b = 10
const c = a + b

[1, 2, 3].forEach((e) => console.log(e))
```

JavaScript lanza el siguiente error: `TypeError: Cannot read property 'forEach' of undefined`, esto es porque en la línea 3 al finalizar la declaración el siguiente carácter es `[`, lo cual es totalmente válido, por lo cual no se inserta un punto y coma, produciéndose el error porque `b[1, 2, 3]` es `undefined`.

## Conclusión

Una vez visto como funciona el *Automatic Semicolon Insertion* de JavaScript, considero que el uso de semicolons debe ser o bien decisión del equipo (por ejemplo, en el core de [Vue](https://github.com/vuejs/vue/blob/dev/src/core/util/lang.js) no utilizan) o del programador. 

Personalmente, soy partidario del uso de semicolons, prefiero colocar explícitamente donde termina la expresión y que no lo haga JavaScript por mi.
