<template>
    <div>
        <h1>Resumen</h1>

        <div class="totales uno"> <v-icon>mdi-account-multiple</v-icon> Total de alumnos permitidos:
            <strong>{{ totalAlumnosPermitidos }}</strong> alumnos
        </div>
        <div class="totales dos"><v-icon>mdi-account-check</v-icon> Cantidad total de alumnos inscritos: <strong>{{
            totalAlumnosInscritos }}</strong> alumnos</div>
        <div class="totales tres"><v-icon>mdi-account-plus</v-icon>Cantidad total de cupos restantes: <strong>{{
            totalCuposRestantes }}</strong> alumnos</div>
        <div class="totales cuatro"><v-icon>mdi-circle-off-outline</v-icon>Cantidad total de cursos terminados:
            <strong>{{ totalCursosTerminados }}</strong>cursos
        </div>
        <div class="totales cinco"><v-icon>mdi-bell-ring</v-icon>Cantidad total de cursos activos: <strong>{{
            totalCursosActivos }}</strong> cursos</div>
        <div class="totales seis"><v-icon>mdi-bell-ring</v-icon>Cantidad total de cursos: <strong>{{ totalCursos
                }}</strong> cursos</div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'SumaTorias',
    // props: {},
    data: function () {
        return {}
    },
    computed: {
        ...mapGetters([
            'totalAlumnosPermitidos',
            'totalAlumnosInscritos',
            'totalCuposRestantes',
            'totalCursosTerminados',
            'totalCursosActivos',
            'totalCursos'
        ])
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

<style scoped>
.totales {
    border: 1px solid purple;
    border-radius: 3%;
    margin: 10px;
    padding-left: 20px;
    color: purple;
}

.dos {
    border: 1px solid rgb(75, 211, 221);
    color: rgb(75, 211, 221);
}

.tres {
    border: 1px solid crimson;
    color: crimson;
}

.cuatro {
    border: 1px solid rgb(245, 42, 211);
    color: rgb(245, 42, 211);
}

.cinco {
    border: 1px solid rgb(27, 99, 12);
    color: rgb(27, 99, 12);
}

.seis {
    border: 1px solid rgb(172, 115, 50);
    color: rgb(172, 115, 50);
}
</style>
