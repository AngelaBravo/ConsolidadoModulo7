<template>
    <!-- ESTA LINEA ES IGUAL A LA SIGUIENTE COMENTADA SOLO QUE USA EL GETTER QUE TIENE EL COSTO FORMATEADO EN VEZ DEL DATO PURO -->
    <!-- <v-data-table :headers="headers" :items="cursosFormateados" :sort-by="[{ key: 'nombre', order: 'asc' }]"
        :items-per-page="cursosFormateados.length"> -->
    <v-data-table :headers="headers" :items="cursos" :sort-by="[{ key: 'nombre', order: 'asc' }]"
        :items-per-page="cursos.length">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>DETALLE DE CURSOS</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                        <v-btn class="mb-2" color="primary" dark v-bind="props">
                            Agregar Curso
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <!-- Mostrar el mensaje de error si existe -->
                                    <v-alert v-if="error" type="error" dismissible>
                                        {{ error }}
                                    </v-alert>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model="editedItem.img" label="URL de la imagen"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model.number="editedItem.cupos"
                                            label="Cupos del curso"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model.number="editedItem.inscritos"
                                            label="Inscritos en el curso"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model="editedItem.duracion"
                                            label="Duracion del curso"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6" v-if="editedIndex > -1">
                                        <v-text-field v-model="editedItem.fecha_registro"
                                            label="Fecha de registro"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model.number="editedItem.costo"
                                            label="Costo del curso"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6" v-if="editedIndex > -1">
                                        <v-checkbox v-model="editedItem.completado" label="Terminado" />
                                    </v-col>
                                    <v-col cols="12" md="4" sm="6">
                                        <v-text-field v-model="editedItem.descripcion"
                                            label="Descripcion del curso"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                Cancelar
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="save">
                                Aceptar
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="550px">
                    <v-card>
                        <v-card-title class="text-h5">¿Estas seguro que quieres borrar este curso?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Si</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <!--  eslint-disable-next-line -->
        <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
         <!-- eslint-disable-next-line --> 
        <template v-slot:item.costo="{ value }">
            <v-chip :color="getColor(value)">
                {{ value }}
            </v-chip>
        </template>
        <!--  eslint-disable-next-line -->
        <template v-slot:item.fecha_registro="{ value }">
            <v-chip :color="getColor(value)">
                {{ value }}
            </v-chip>
        </template>
        <!--  eslint-disable-next-line -->
        <template v-slot:item.completado="{ value }">
            <v-chip :color="getColor2(value)">
                {{ value ? 'Sí' : 'No' }}
            </v-chip>
        </template>
    </v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        error: '',  // Variable para manejar los errores
        headers: [
            {
                title: 'Curso',
                align: 'start',
                sortable: false,
                key: 'nombre',
            },
            { title: 'Cupos', key: 'cupos' },
            { title: 'Inscritos', key: 'inscritos' },
            { title: 'Duracion', key: 'duracion' },
            { title: 'Costo', key: 'costo' },
            { title: 'Terminado', key: 'completado' },
            { title: 'Fecha', key: 'fecha_registro' },
            { title: 'Actions', key: 'actions', sortable: false },
        ],

        editedIndex: -1,
        editedItem: {
            nombre: '',
            cupos: 0,
            inscritos: 0,
            duracion: '',
            costo: 0,
            completado: 0,
            fecha_registro: '',
        },
        defaultItem: {
            nombre: '',
            cupos: 0,
            inscritos: 0,
            duracion: '',
            costo: 0,
            completado: 0,
            fecha_registro: '',
        },
    }),

    computed: {
        ...mapState(['cursos']),
    //    ...mapGetters(['cursosFormateados']),

        formTitle() {
            return this.editedIndex === -1 ? 'Nuevo Curso' : 'Editar Curso'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() { },

    methods: {
        ...mapActions(['deleteCurso']),
        ...mapActions(['updateCurso']),
        ...mapActions(['createCurso']),

        getColor(costo, fecha_registro) {
            if (costo > 0) return 'green';
            if (fecha_registro != 0) return 'green'
        },

        getColor2(completado) {
            if (completado === true) return 'red'
            else return 'grey'
        },

        editItem(item) {
            // const itemInterno = this.cursos.findIndex(curso => curso.id === item.id)
            this.editedIndex = this.cursos.indexOf(item)
            // this.editedIndex = this.cursos.indexOf(itemInterno)
            console.log(this.editedIndex)
            this.editedItem = Object.assign({}, item)
            // this.editedItem = Object.assign({}, itemInterno)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.cursos.indexOf(item) // Guardamos el índice
            this.editedItem = Object.assign({}, item)    // Guardamos una copia del curso
            this.dialogDelete = true                     // Mostramos el modal
        },

        deleteItemConfirm() {
            // aquí usamos la accion para eliminar el curso desde el store
            // this.deleteCurso(this.editesItem)
            this.deleteCurso(this.editedItem)
            this.dialogDelete = false                   // cerramos el modal
        },

        close() {
            this.dialog = false
            this.error = '';
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            // Validación: La cantidad de inscritos no debe ser mayor que la de cupos

            if (this.editedItem.inscritos > this.editedItem.cupos) {
                this.error = 'La cantidad de inscritos no puede ser mayor que los cupos disponibles.';
                return;  // No se sigue con la creación o actualización
            }
            if (this.editedIndex > -1) {
                // aca se usa el action para editar el curso
                this.updateCurso(this.editedItem) // Llama la accion para editar el curso
                // this.cursos.forEach(curso => Object.values(curso).forEach(propiedad => console.log(propiedad, typeof propiedad)))
            } else {
                // aca se usa el action para crear (agregar) un curso
                // Si es -1, se trata de un nuevo curso
                this.createCurso(this.editedItem);  // Llama a la acción para crear el curso
            }
            this.close();
        },
    },
}
</script>
<style>
.v-data-table-footer {
    display: none !important;
}
</style>