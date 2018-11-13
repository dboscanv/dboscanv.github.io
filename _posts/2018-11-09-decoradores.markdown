---
layout: post
title: Decoradores en TypeScript
description: Los decoradores nos permiten agregar anotaciones y metadatos, además de poder observar, modificar o reemplazar el comportamiento de clases, metodos, propiedades y parámetros
img: decorators.jpeg
tags: [JavaScript, TypeScript]
---

Los decoradores (*decorators* en inglés) son una (https://github.com/tc39/proposal-decorators)[propuesta] para incluir en JavaScript que nos permite **añadir anotaciones y metadatos** a clases, propiedades, métodos, parámetros y accesors. Con TypeScript podemos usarlos activando la propiedad `experimentalDecorators` del `tsconfig.json` de nuestro proyecto.

Es muy importante saber que los decoradores al ser todavía una propuesta experimental es posible que tenga cambios en el futuro. A pesar de esto, la presencia de estos en el desarrollo web actual **está siendo notable**, sobre todo en proyectos que utilizan TypeScript (Angular, [Vue](https://vuejs.org/v2/guide/typescript.html), Nest, Stencil, etc). A través de sencillos ejemplos, intentaré explicar cómo funcionan y cómo crear sus propios decoradores.

## Qué es y cómo funcionan

Un decorador es una función que, dependiendo de que cosa queramos *decorar*, sus argumentos serán diferentes. Usan la forma `@expression` donde `expression` evaluará la función que será llamada. Para entender esto mejor, explicaré los decoradores más frecuentes con su ejemplo:

### Decorador de clase

Es aplicado al constructor de la clase y puede ser usado para **observar, modificar o reemplazar la definición inicial de la clase**. Su único argumento es `target` que vendría siendo la clase decorada, tipado como `Function` o `any`, ejemplo:

```typescript
function classDecorator(target:Function) {
    console.log(target);
}

@classDecorator
class MyClass {
    constructor() { 
        console.log('My class')
    }
}
```

En el ejemplo anterior, simplemente imprimimos por consola la clase que fue decorada. Si queremos hacer algo más avanzado, vamos a necesitar pasar **parámetros a los decoradores**. Para eso podemos escribir un *decorator factory*, que es simplemente una función que retorna otra función que será llamada en tiempo de ejecución por el decorador. En el código debajo, hacemos algo más interesante: Sobreescribimos una propiedad con el valor que pasamos como parámetro al decorador.

```typescript
function changeName(data: string) {
	return function <T extends { new(...args: any[]): {} }>(constructor: T) {
		return class extends constructor {
			name = data;
		}
	}
}


@changeName('Bob')
class Person {
	name: string;
	constructor(name: string) {
		this.name = name;
	}

	sayHi() {
		console.log(`${this.name} says hi!`)
	}

}

new Person('John').sayHi(); // Bob says hi!
```

A pesar de inicializar nuestro objecto con el nombre *John*, el decorador sobrescribe la propiedad, esto es así porque los decoradores son llamados al momento de declarar la clase, no cuando se instancia un objeto.

### Decorador de métodos

Tienen el mismo objetivo que las clases de observar, modificar o reemplazar. La función toma tres parámetros: 
    1. `target`: Metodo decorado, generalmente tipado como `Object`
    2. `propertyKey`: Nombre del metodo, tipado como `string | symbol`
    3. `descriptor`: *Property Descriptor* del objeto (value, writable, enumerable, configurable, más información [acá](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty))

Podemos crear un decorador para loguear caracteristicas, o también modificar y/o extender el comportamiento, en ese caso **tendremos que modificar la propiedad `value`** del `descriptor`, asignandole **una función** (y no una *arrow function*, ya que perderíamos el contexto de `this`).

Consideren el siguiente ejemplo, donde el decorador `log` imprime por consola la clase del metodo, el nombre, property descriptor y también los argumentos cuando el metodo es llamado: 

```typescript
function log(target: Object, propertyKey: string, descriptor: any) {
	console.log('Clase: ', target.constructor.prototype);
	console.log('Método: ', propertyKey);
	console.log('Property Descriptor: ', descriptor);

	descriptor.value = function (...args: any[]) {
		console.log('Argumentos de la funcion', args);
    }
    return descriptor;
}

class ExampleClass {

	@log
	outputSomething(something: string) {
		console.log(something);
	}
}

new ExampleClass().outputSomething('Test');
```

### Decorador de propiedades y parámetros

Son más simples que los anteriores, un decorador de propiedades es una función que debe tomar como parámetros `target`, que es el prototipo de la clase, y `propertyKey`, el nombre de la propiedad. Finalmente los decoradores de parámetros, funcionan igual pero con el parámetro adicional `parameterIndex`, que indica la posición en el array, por ejemplo:

```typescript
function decoratedProperty(target: Object, propertyKey: string) {
    console.log('Clase', target);
    console.log('Nombre de la propiedad', propertyKey);
}

function decoratedParam(target: Object, propertyKey: string, parameterIndex: number) {
    console.log('Nombre del metodo', propertyKey);
    console.log('Clase', target);
    console.log('Posicion del parámetro', parameterIndex);
}


class ExampleClass {
    @decoratedProperty exampleProperty: string = 'Hello World';

    sum(a: number, @decoratedParam b:number): number {
        return a+b
    }
}
```

## Conclusión

Gracias a herramientas como TypeScript podemos hacer uso de features que serán incluidas en el estándar en un futuro. Los decoradores, son simplemente funciones que nos permiten darle un significado especial a clases, métodos, etc añadiendo metadatos y anotaciones u observando o cambiando comportamientos. Son en realidad muy fáciles de entender y nos ayudan a comprender un poco más la *magia* que hacen los frameworks y librerías por detrás.


