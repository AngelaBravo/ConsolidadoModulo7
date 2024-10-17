<template>
    <!-- <TablaDCursos/> -->
    <CursesTable />
    <SumaTorias />
</template>

<script>
import CursesTable from '@/components/CursesTable.vue';
import SumaTorias from '@/components/SumaTorias.vue';



export default {
    name: 'AdminView',
    // props: {},
    data: function () {
        return {}
    },
    // computed: {},
    //methods: {}
    // watch: {},
    components: {
        CursesTable,
        SumaTorias,
    },
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped></style>