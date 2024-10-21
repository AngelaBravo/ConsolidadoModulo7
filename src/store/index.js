import { createStore } from 'vuex'
import data from '@/db/data'

export default createStore({
  state: {
    cursos: data.cursos,
  },
  getters: { // se usan para devolver dates en derivados del state. Ejemplo sumatorias, diviciones, nombre completo, etc
    totalAlumnosPermitidos: (state) => {
      return state.cursos.reduce((total, curso) => total + curso.cupos, 0)
    },
    totalAlumnosInscritos: (state) => {
      return state.cursos.reduce((total, curso) => total + curso.inscritos, 0)
    },
    totalCuposRestantes: (state) => {
      return state.cursos.reduce((total, curso) => total + (curso.cupos - curso.inscritos), 0)
    },
    totalCursosTerminados: (state) => {
      return state.cursos.filter(curso => curso.completado).length
    },
    totalCursosActivos: (state) => {
      return state.cursos.filter(curso => !curso.completado).length
    },
    totalCursos: (state) => {
      return state.cursos.length
    },
    // cursosFormateados: (state) => {
    //   return state.cursos.map(curso => {
    //     return {...curso, costo: new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(curso.costo)}
    //   })

    // }
  },

  mutations: {
    // Mutación para eliminar un curso por su índice
    DELETE_CURSO(state, index) {
      state.cursos.splice(index, 1) // el 1 representa la cantidad de elementos del arreglo que voy a modificar ( o en este caso eliminar)
    },
    // Mutation para editar un curso
    UPDATE_CURSO(state, { index, cursoActualizado }) {
      state.cursos.splice(index, 1, cursoActualizado)
    },
    // Mutacion para agregar un curso
    ADD_CURSO(state, nuevoCurso) {
      state.cursos.push(nuevoCurso);
    }
  },

  actions: {
    // Accion para eliminar un curso invocando la mutacion
    deleteCurso({ commit, state }, item) {
      // console.log(item)
      const index = state.cursos.findIndex(curso => curso.id === item.id)
      if (index !== -1) {
        commit('DELETE_CURSO', index)
      }
    },
    //action para editar, actualizar un curso
    updateCurso({ commit, state }, item) {
      console.log('Dentro del action "updateCurso" del store! 😋', item)
      // tomar objeto item (que representa un curso)
      // y antes de guardarlo con el método commit()
      // transformarlo para que los tipos de datos correspondan
      // al modelo del objeto, porque desde el formulario todos
      // llegan como Strings y eso está malo.
      // let terminado = true;
      
      if (item.completado != false) {
      //   terminado = false
      // } else {
        item.inscritos = 0
      }
      const cursoActualizado = {
        id: Number(item.id),
        img: String(item.img),
        nombre: String(item.nombre),
        costo: Number(item.costo),
        duracion: String(item.duracion),
        cupos: Number(item.cupos),
        inscritos: Number(item.inscritos),
        completado: Boolean(item.completado),
        fecha_registro: String(item.fecha_registro),
        descripcion: String(item.descripcion),
      }
      console.log('al recibir los datos del formulario todos los datos son de tipo string, por lo que es necesario transformar cada dato a su tipo correcto, ej cupos del curso a number, terminado a boleano. el objeto sgte son los datos del formulario normalizado de esa forma', cursoActualizado)
      const index = state.cursos.findIndex(curso => curso.id === item.id)
      if (index !== -1) {
        commit('UPDATE_CURSO', { index, cursoActualizado })
      }
    },
    // Accion para crear un  nuevo curso
    // al crear el curso, a diferencia de la edición, no viene un id porque el
    // formulario no tiene ese espacio para crearlo. Por lo tanto acá, acá en 
    // el store debe crearse la lógica para asignarle uno que mantenga el orden
    // de los cursos actuales.
    createCurso({ commit, state }, item) {
      // Lógica para asignar un nuevo ID
      const nuevoId = Math.max(...state.cursos.map(curso => curso.id)) + 1;
      const nuevoCompletado = false;
      const fechaActual = new Date();
      const nuevaFecha_registro = fechaActual.toLocaleDateString();
      const cursoNormalizado = {
        id: nuevoId,  // Aquí asignamos el nuevo ID generado
        img: String(item.img),
        nombre: String(item.nombre),
        costo: Number(item.costo),
        duracion: String(item.duracion),
        cupos: Number(item.cupos),
        inscritos: Number(item.inscritos),
        completado: nuevoCompletado,
        fecha_registro: nuevaFecha_registro,
        descripcion: String(item.descripcion),
      };
      commit('ADD_CURSO', cursoNormalizado);
    }
  },
  modules: {
  }
})
