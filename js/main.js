// Este simulador se encarga de recrear la administración de  alumnos, profesores y cursos

// Como usuario de este servicio puedes crear perfiles alumnos y profesores. También puedes asignar a profesores y alumnos a un curso.
// Puedes modificar las propiedades de alumnos y profesores, a excepción del rol (es permanente una vez se crea)

// Inicialización de variables globales
const alumnos = []
const profesores = []
const cursos = ['Lenguaje', 'Historia', 'Matemática', 'Ciencias']

// Alumnos y profesores de prueba para no desplegar valores vacíos
const alumnoPrueba = {
    nombre: 'Alumno Prueba',
    edad: 30,
    rol: 'Alumno',
    curso: cursos[0],
    id: 1
}

const profesorPrueba = {
    nombre: 'Profesor Prueba',
    edad: 50,
    rol: 'Profesor',
    curso: cursos[0],
    id: 2
}

alumnos.push(alumnoPrueba)
profesores.push(profesorPrueba)

// Funciones de creación y asignación
function crearPersona() {

    alert('A continuación ingrese los datos del alumno o profesor a crear')

    let nombre = prompt('Ingrese nombre')
    while (!soloLetras(nombre)) {
        nombre = prompt('Ingrese un nombre válido (solo letras)')
    }

    let edad = prompt('Ingrese edad')
    while (!esNumeroEnteroPositivo(edad)) {
        edad = prompt('Ingrese una edad válida (Número entero >= 0)')
    }

    let rol = prompt('Ingrese una opción (número) para el rol. \n1 - Alumno\n2 - Profesor')
    let rolString

    while (!esNumeroEnteroPositivo(rol) || rol < 1 || rol > 2) {
        rol = prompt('Ingrese un número válido para el rol. \n1 - Alumno\n2 - Profesor')
    }

    if (rol == 1) {
        rolString = 'Alumno'
    } else {
        rolString = 'Profesor'
    }

    // Sección añadir curso ahora o más tarde
    let asignarCurso = prompt('¿Quieres asignar curso ahora? Ingresa una opción:\n1 - Sí\n2 - No')
    while (!esNumeroEnteroPositivo(asignarCurso) || asignarCurso < 1 || asignarCurso > 2) {
        asignarCurso = prompt('Ingrese un número válido:\n1 - Sí\n2 - No')
    }

    let cursoIndex
    if (asignarCurso == 1) {

        let mensaje = 'Seleccione un curso:'
        cursos.forEach((opcion, index) => {
            mensaje += `\n${index + 1} - ${opcion} `
        })

        cursoIndex = Number(prompt(mensaje) - 1)

        while (!esNumeroEnteroPositivo(cursoIndex) || cursoIndex >= cursos.length) {
            alert('Ha seleccionado una opción inválida')
            cursoIndex = Number(prompt(mensaje) - 1)
        }

    } else if (asignarCurso == 2) {
        alert('Puedes asignar curso con la opción "Modificar perfil de alumno/profesor" del menú principal.')
    } else {
        alert('Opción inválida, podrás asignar un curso con la opción "Modificar perfil de alumno/profesor" del menú principal.')
    }

    asignarPersona(nombre, Number(edad), rolString, cursos[cursoIndex])
    console.log(`¡${rolString} ${nombre} creado con éxito!`)

}

function asignarPersona(nombre, edad, rol, curso) {

    const persona = {
        nombre: nombre,
        edad: edad,
        rol: rol,
        curso: curso,
        id: (alumnos.length + profesores.length + 1)
    }

    if (persona.rol === 'Alumno') {
        alumnos.push(persona)
        console.log(alumnos)
    } else {
        profesores.push(persona)
        console.log(profesores)
    }

}

function buscarPorId() {

    let rolNumber = Number(prompt('Seleccione un rol (ingrese número)\n1 - Alumno\n2 - Profesor'))

    while (rolNumber != 1 && rolNumber != 2) {
        rolNumber = Number(prompt('Ingrese un número válido\n1 - Alumno\n2 - Profesor'))
    }

    const lista = rolNumber === 1 ? alumnos : profesores;
    const tipo = rolNumber === 1 ? 'Alumno' : 'Profesor';

    let id = Number(prompt('Ingrese una ID (número)'))

    while (!esNumeroEnteroPositivo(id) || id === 0) {
        id = Number(prompt('Ingrese un número válido'))
    }

    const persona = lista.find(p => p.id === id)

    if (!persona) {
        console.log(`El ${tipo} con ID ${id} no se ha encontrado.\nIngrese una ID correctamente asociada con el rol`)
    }

    const index = lista.findIndex(p => p.id === id)

    return {
        persona: persona,
        index: index,
        lista: lista
    }
}

function modificarPersona() {

    const resultado = buscarPorId()

    if (!resultado) {
        console.log('Persona no encontrada')
        return
    }

    const { persona, index, lista } = resultado

    // Seleccionar que valor modificar

    let banderaMod = true

    const mensajeModificar = 'Ingrese el número correspondiente al atributo que desee modificar'
    const mensajeOpciones = '1 - Nombre\n2 - Edad\n3 - Curso\n4 - Salir'

    while (banderaMod) {

        let opcion = Number(prompt(`${mensajeModificar}
            \n${mensajeOpciones}`
        ))

        switch (opcion) {
            case 1:
                console.log('Modificando nombre')
                let nuevoNombre = prompt('Ingrese nuevo nombre')

                while (!soloLetras(nuevoNombre)) {
                    nuevoNombre = prompt('Ingrese un nombre válido (solo letras, tildes y espacios)')
                }
                lista[index].nombre = nuevoNombre
                console.table(persona)
                break
            case 2:
                console.log('Modificando edad')
                let nuevaEdad = prompt('Ingrese una nueva edad')
                while (!esNumeroEnteroPositivo(nuevaEdad)) {
                    nuevaEdad = prompt('Ingrese una edad válida (número mayor o igual a 0)')
                }
                lista[index].edad = nuevaEdad
                console.table(persona)
                break
            case 3:
                console.log('Modificando curso')

                let mensaje = 'Seleccione un curso:'
                cursos.forEach((opcion, index) => {
                    mensaje += `\n${index + 1} - ${opcion} `
                })

                cursoIndex = Number(prompt(mensaje) - 1)

                while (!esNumeroEnteroPositivo(cursoIndex) || cursoIndex >= cursos.length) {
                    alert('Ha seleccionado una opción inválida')
                    cursoIndex = Number(prompt(mensaje) - 1)
                }
                lista[index].curso = cursos[cursoIndex]
                console.table(persona)
                break
            case 4:
                console.log('Volviendo al menú principal')
                alert('Volviendo al menú principal')
                banderaMod = false
                break
            default:
                console.log('Opción Default funcionando')
                // opcion = Number(prompt(`Ingrese un número válido'\n${mensajeOpciones}`))
                alert(`Ingrese un número válido \n${mensajeOpciones}`)
                break
        }
    }
}

// Funciones para mostrar información

function listarPersonas(listaPersonas) {

    if (listaPersonas.length === 0) {
        console.log('No existen personas registradas en esta categoría.')
    } else { console.table(listaPersonas) }

}

function listarCursos(lista) {
    console.log("Nombre del curso:");
    lista.forEach(curso => console.log(`- ${curso}`));
}

// Funciones de verificación
function soloLetras(cadena) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/.test(cadena.trim());
}

function esNumeroEnteroPositivo(valor) {
    const numero = Number(valor);
    return !isNaN(numero) && numero >= 0 && Number.isInteger(numero);
}

// Función principal

let bandera = true

function principal() {

    let personaId
    let opcion
    const mensajePrincipal = 'Bienvenido al gestionador de alumnos y profesores'
    const opcionesPrincipal = '1 - Listar alumnos\n2 - Listar profesores\n3 - Listar cursos\n4 - Crear perfil de alumno/profesor\n5 - Modificar perfil de alumno/profesor \n6 - Buscar por ID y Rol\n7 - Salir'

    while (bandera) {

        opcion = Number(prompt(`${mensajePrincipal}
            \nElija una opción:
            \n${opcionesPrincipal}`
        ))

        switch (opcion) {
            case 1:
                listarPersonas(alumnos)
                break
            case 2:
                listarPersonas(profesores)
                break
            case 3:
                listarCursos(cursos)
                break
            case 4:
                crearPersona()
                break
            case 5:
                modificarPersona()
                break
            case 6:
                personaId = buscarPorId()
                if (personaId) {
                    console.table(personaId)
                }
                break
            case 7:
                alert('¡Hasta pronto!')
                bandera = false
                break
        }
    }
}

// Correr programa
principal()