<template>
    <h1> Lista de Cursos 1</h1>
    <v-container class="bg-surface-variant">
        <v-row no-gutters>
            <v-col v-for="curso in cursos" :key="curso.id" cols="12" sm="4">
                <v-sheet class="ma-2 pa-2">
                    <v-card class="mx-auto" max-width="300">
                        <v-img color="surface-variant" height="200" :src="curso.img" cover>
                        </v-img>
                        <v-card-text>
                            <div class="font-weight-bold ms-1 mb-5">{{ curso.nombre }}</div>
                            <div class="font-height-bold ms-1 mb-2">Información</div>
                            <v-timeline align="start" density="compact">
                                <v-timeline-item :dot-color="colorM" size="x-small">
                                    <div class="mb-4">
                                        <div class="font-weight-normal">
                                            costo: <strong>{{ curso.costo }}</strong><br>
                                            Duración:{{ curso.duracion }}
                                        </div>
                                    </div>
                                </v-timeline-item>
                                <v-timeline-item :dot-color="colorV" size="x-small">
                                    <div class="mb-4">
                                        <div class="font-weight-normal">
                                            Cupos: <strong>{{ curso.cupos }}</strong><br>
                                            Completado:{{ curso.completado }}
                                        </div>
                                    </div>
                                </v-timeline-item>
                                <v-timeline-item :dot-color="colorM" size="x-small">
                                    <div class="mb-4">
                                        <div class="font-weight-normal">
                                            Fecha de Registro: <br>
                                            {{ curso.fecha_resgistro }}
                                        </div>
                                    </div>
                                </v-timeline-item>
                                <v-timeline-item :dot-color="colorV" size="x-small">
                                    <div class="mb-4">
                                        <div class="font-weight-normal">
                                            Descripcion: <br>
                                            {{ curso.descripcion }}
                                        </div>
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                        </v-card-text>
                    </v-card>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>


</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'component-name',
    // props: {},
    data: function () {
        return {
            colorV: 'green',
            colorM: 'deep-purple-lighten-1',
        }
    },
    computed: {
        ...mapState(['cursos'])
    },
    //methods: {}
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped></style>