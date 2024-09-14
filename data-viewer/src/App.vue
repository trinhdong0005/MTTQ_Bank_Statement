<template>
  <DataTable/>
</template>

<script>
import DataTable from './components/DataTable.vue'

export default {
  name: 'App',
  components: {
    DataTable
  },
  created () {
      document.title = "Danh sách ủng hộ MTTQ!";
  }
}
</script>

<style>
</style>
