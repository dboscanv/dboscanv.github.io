---
title: ¿Por qué es importante probar nuestro código?
date: "2021-08-09T22:40:32.169Z"
description: Los tests son la principal y más importante herramienta que tenemos los desarrolladores para el aseguramiento de la calidad del software que escribimos.
featuredImage: ../../../src/images/testing.jpeg
---

Julieta, Santiago y Juan desarrollan una aplicación web administrativa para una importante empresa de su ciudad. Han estado trabajando durante un mes en la mínima versión viable. Es lunes y el deadline es el próximo jueves, donde tienen que tener todo cerrado para iniciar el día siguiente las primeras pruebas con el cliente.

Los desarrolladores se dividieron los diferentes módulos del sistema y todo iba bien, cumpliendo con la velocidad esperada. Los problemas empezaron el martes, cuando empezaron las integraciones y las pruebas: Julieta y Santiago, probando, se dieron cuenta que el módulo de clientes no se comunicaba bien con el módulo de obras. Al mismo tiempo, Juan encontró un par de bugs que arrancó a resolver.

## El típico problema

Cuando Julieta y Santiago arreglaron el problema de integración, se encontraron con que una funcionalidad presente en todas las partes del sistema, que ya habían probado, dejó de funcionar: el cambio que metió Juan para arreglar los bugs que encontró, tocó una función reutilizable y rompió ese caso de uso. 

Cada vez que arreglaban una parte del sistema, se rompía otra parte. Cada vez que metían un cambio, tenían que probar manualmente todas las partes para asegurarse que no estaba nada roto. Así pasaron los días, llegó el jueves y el equipo a pesar de trabajar horas extras, no pudo cumplir con la fecha comprometida. 

¿Te suena esta historia? Pasa todo el tiempo en muchos equipos de desarrollo de software. Todos hemos sido protagonistas de esta historia, en mayor o menor medida. 
Mi objetivo con este post es que sepas que existe una forma de evitar (o al menos, mitigar) esta perdida de tiempo y recursos: creando pruebas automatizadas *(en inglés, automated tests)* o simplemente, *tests*.

## ¿Qué son las pruebas automatizadas?

En pocas palabras, es código que prueba tu código productivo con la finalidad de encontrar *bugs*. Existen varios tipos de tests, y para profundizar en todos tendría que escribir otro post, pero en resumen, los tests que normalmente son responsabilidad de los desarrolladores son: **test unitarios, test de integración y test end-to-end.** 

Una vez que comprendes las ventajas de crear tests, notas la importancia y el gran valor que aportan. Principalmente, **agregando tests los desarrolladores pierden el miedo al cambio**. En proyectos medianos/grandes, debe ser casi obligatorio crear y mantener suites de tests, tanto por la salud mental de las personas que participan, como por la salud misma del proyecto.

## Ventajas de escribir tests

### Son automáticos

Como su nombre lo indica, los tests son automáticos. Listo algunas de las ventajas:

- Un test automatizado **tiene menos probabilidades de ser mal ejecutado que un test manual**. De forma manual, es más probable que la persona que esté probando se olvide de un detalle. Cuando está automatizado, queda plasmado en el código y puede ser ejecutado infinitas veces.
- Esencial para hacer **test de regresión de una manera práctica y eficiente.** Sin la automatización, los desarrolladores tendrían que manualmente ejecutar los casos de prueba cada vez que se introduzcan cambios en el sistema. En un software pequeño no supone mucho problema, pero a medida que incrementa la complejidad y el tamaño del software, el tiempo de testing manual es mayor.
- Pueden ejecutarse frecuentemente con el fin de **detectar lo más pronto posible bugs en el código ante los inminentes cambios**.  Por lo tanto, pueden ser usados como mecanismo de feedback instantáneo.

### Te dan confianza

Creando tests **compruebas que el código que estás metiendo cumpla con los requerimientos y esté libre de bugs**. También te ayuda a asegurarte que esos cambios no están rompiendo en otra parte del sistema. Todo esto, antes de que llegue al usuario final.

Gracias a la confianza que nos dan, el desarrollador pierde el miedo al cambio, puede entregar funcionalidades en menor tiempo, y puede dormir tranquilo sabiendo que su código esta cumpliendo con los casos de uso.

### Permiten que el código sea flexible, mantenible y reutilizable

Los tests permiten que tu código sea **flexible**: puedes agregar más casos de uso, sin miedo a romper los casos actuales.

Hace tu código **mantenible**: puedes agregar funcionalidades, cambiar las ya existentes, mejorar funcionamientos, hacer refactors y corregir bugs sin el miedo a romper la aplicación, sin el miedo a pasar horas arreglando un bug que generaste. Sin el miedo a hacer más daño que bien.

Por último, lo hace más **reutilizable**, ya que un código que quieras reutilizar en otra parte del sistema, con los tests tienes la certeza de que sigue funcionando para lo que originalmente fue diseñado y además te aseguras que el nuevo cambio cumpla con el caso de uso nuevo y este libre de bugs.

### Proveen documentación

Aunque no es documentación *per se*, los tests son una especie de documentación: Plasman los casos que debe cumplir el software y cómo se supone que debe usarse.

### Son rentables

Al estar automatizados, permiten que las pruebas sean ejecutadas con frecuencia, las veces que queramos. Esto minimiza el tiempo de testing manual, y permite que los desarrolladores en lugar de invertir grandes cantidades de tiempo probando, **inviertan su valioso tiempo en agregar nuevas funcionalidades o mejorar las ya existentes.**

## Conclusión

Cómo podemos observar, los tests son una importante herramienta para el aseguramiento y mejora de la calidad del software.

El software esta presente en todas las áreas de nuestra vida. Un bug puede costar desde la perdida de la confianza de los usuarios, hasta perdida de información o incluso perdidas millonarias. Es nuestra responsabilidad como desarrolladores entregar software con calidad, libre de bugs y que tenga un comportamiento esperado.