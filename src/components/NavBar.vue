<template>
    <v-app-bar :elevation="14">
        <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>Cursos AlfaWeb</v-app-bar-title>
        <template v-slot:append>
            <router-link to="/"><v-btn icon="mdi-home-account"></v-btn></router-link> 
            <router-link to="/admin"><v-btn icon="mdi-wrench"></v-btn></router-link>
        </template>
    </v-app-bar>
</template>

<script>
export default {
    name: 'NavBar',
    // props: {},
    data: function () {
        return {}
    },
    // computed: {},
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
.v-app-bar.v-toolbar{
  background-color: purple;
  color: white;
}

.v-btn--variant-text{
    color: white;
}

</style>