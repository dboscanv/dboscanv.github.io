---
layout: post
title: Razones para migrar de AngularJs a Angular
description: Es conocido que AngularJS tiene problemas de rendimiento, solamente basta con preguntarse **¿por qué Google decidio reescribirlo desde cero?**. Recientemente, anunciaron que la versión 1.7 tendrá soporte hasta Junio de 2020. 
toc: true
img: angular.png
tags: [JavaScript, Angular, TypeScript, AngularJs]
---
* TOC
{:toc}

La evolución del frontend es impresionante. La web (y JavaScript) cada vez son más potentes. Atrás quedaron los tiempos de jQuery donde el frontend solo consistía en hacer animaciones, AJAX y poco más. A partir de la llegada de frameworks como AngularJs, el frontend cambio para siempre.

Hasta hace unos pocos años, AngularJs era uno de los frameworks más exitosos, por eso hay muchas aplicaciones que en la actualidad lo siguen usando. En la última encuesta del año 2017 de la web (State of Js)[https://2017.stateofjs.com/2017/front-end/results], arroja que de los encuestados **14.300 usaron Angular alguna vez** y de ese grupo, unos **4.707 desarrolladores lo usarían nuevamente**.

Pero era conocido que AngularJS tenía problemas de rendimiento, solamente basta con preguntarse **¿por qué Google decidio reescribirlo desde cero?**. Recientemente, anunciaron que la versión 1.7 será la última, y **tendrá soporte hasta Junio de 2020**. Es decir, que luego de esa fecha, haciendo una analogia es como usar Windows XP de sistema operativo. 

Si tienes aplicaciones en AngularJs y estás dudoso de actualizar a la versión más actualizada de Angular, acá explico porque en mi opinión debes actualizar lo más pronto posible (ya que tarde o temprano tendrás que reescribir el código).

## 1. Código mantenible y reutilizable

En AngularJs, el código se separaba en controladores, directivas, servicios, vistas. No se desarrollaba orientado a componentes, de manera que era muy frecuente repetir código en varios controladores, usar (y saturar) `$rootScope`, usar two-way data binding en casi todo, etc. Todo esto trae problemas de rendimiento y hacen el mantenimiento cada vez más costoso.

Con la llegada de los componentes en Angular, ahora se incita a la reusabilidad, se usa menos two-way data binding en favor de los eventos para evitar bugs, entre otros. Además, **Angular utiliza TypeScript**, que entre muchas ventajas, nos ofrece tipado estatico, y si tu aplicación es grande, el tipado estatico es un plus importante.

![Explicación gráfica de 1-way data binding vs 2-way data binding](https://rubygarage.s3.amazonaws.com/uploads/article_image/file/571/2-way-and-1-way-data-binding.jpg)

## 2. TypeScript

La decisión de usar TypeScript para mi fue un acierto. Programar con **tipado estatico** es genial, es verdad que en proyectos pequeños o medianos no es tan necesario (es cuestión de preferencia) pero cuando hablamos de un proyecto grande las ventajas son notorias. Programar con TypeScript es resumidamente usar JavaScript más los beneficios de tener tipado estatico, interfaces, enums, type assertions, etc.

Supongamos que tenemos una aplicación de un e-commerce (o de ventas simplemente), con TypeScript podemos crear algo así:
```typescript

interface User {
    readonly id: number;
    readonly name: string;
    balance: number;
}

interface Product {
    readonly name: string;
    price: number;
}
```

En el código de arriba, creamos dos interfaces que podemos usar para definir la forma que deben tener los objetos en ciertas situaciones, con esto, TypeScript nos avisa en una etapa temprana de desarrollo si estamos accidentalmente cambiando el nombre de un producto o intentando usar un objeto de tipo `User` que no tiene la propiedad `balance`. Lo podemos ver en el siguiente código:

```typescript
function buyProduct(user: User, product: Product) {
    user.balance -= product.price; 
    return user;
}

let user = {id:1,name:"John"};
let product = {name: "Apple", price:100};

buyProduct(user, product); // ERROR: Property 'balance' is missing in type '{ id: number; name: string; }'.
```

TypeScript nos indicará que estamos intentando pasarle a esa función un objeto que no tiene las propidades obligatorias, de manera que **capturamos un error antes de que ocurra**. Sino hubiesemos usado una *interface*, el código fallaría más adelante, y si hacemos muchas operaciones en conjunto, se hará más dificil encontrar el bug. De la misma manera si intentamos accidentalmente cambiar el nombre de un producto una vez creado, el *type-checker* de TypeScript se encargará de avisarte para que eso no ocurra.

Además, es menos *costoso* el ingreso de nuevos programadores a los proyectos, **ya que el tipado estatico te guía en el desarrollo** y gracias a los tipos puedes mirar el código y observar que es y en que consiste cada función.

## 4. Mejor ecosistema

Muchas librerías en AngularJs logicámente ya no se mantienen, las personas prefieren dar soporte a una versión más actual donde obtengan mejor rendimiento. Los requerimientos también cambian con el tiempo, ahora cada vez se le exige más al frontend, por eso es mucho más probable que **alguien haya tenido un problema actual y desarrolle una libreria para ello usando Angular a que lo haga en AngularJs**.

## 5. Mayores facilidades para el desarrollo

A parte de darnos una buena estructura para crear aplicaciones escalables y mantenibles, Angular y la mayoría de los frameworks actuales tienen herramientas que nos facilitan el desarrollo, como por ejemplo angular-cli (consola de comandos para generar archivos, ejecutar tests, levantar un servidor de desarrollo, etc) o Angular Augury (extensión para Firefox y Google Chrome que nos permite debuggear más fácilmente).

Además de eso, herramientas como Visual Studio Code o WebStorm soportan Angular (y los frameworks modernos) por defecto.

## 6. Encontrar programadores 

Por un lado tenemos que la mayoría de las personas que saben AngularJs prefieren trabajar en otras tecnologías que ofrezcan mejores beneficios, y por otro lado tenemos que los programadores nuevos no van a aprender AngularJs y será cada vez más difícil conseguir gente capacitada. Si ya es complicado conseguir programadores, conseguir que sepan y trabajen con AngularJs será una tarea aún más difícil.

## 7. Se puede migrar progresivamente

Existen varias maneras de migrar aplicaciones AngularJs a la ultima versión estable. **Es posible hacerlo progresivamente** usando herramientas como ngUpgrade, Angular Elements o incluso desarrollando tus propios web components. Por lo tanto, puedes ir migrando a tu tiempo sin necesidad de parar el desarrollo. 

## Conclusión

Definitivamente **es una mala idea seguir desarrollando y manteniendo una aplicación AngularJs** en la actualidad. El costo de una migración depende de muchos factores, pero en la gran mayoría de los casos no será fácil, ya que practicamente es un *rewrite*, sin embargo, si tienes una aplicacion que estará en producción por varios años más, poniendo todo en una balanza creo que son más los beneficios que el tiempo que se invertira en el proceso. 