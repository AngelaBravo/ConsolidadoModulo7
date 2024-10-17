<template>
  <!-- <Navbar/> -->
  <p>Esto es HomeView 1</p>
  <CursesCard/>

</template>

<script>
import CursesCard from '@/components/CursesCard.vue';
// import Navbar from '@/components/Navbar.vue';

export default {
  name: 'HomeView',
  components: {
    // Navbar,
    CursesCard,
  }
}
</script>
