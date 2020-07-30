<template>
  <div class="d-flex align-center">
    <div class="text-no-wrap">Sorting by:</div>

    <v-btn-toggle id="sorter" tile group dense :value="value" @change="$emit('change', $event)" mandatory
      borderless
      >
      <v-btn v-for="name in list" :value="name" :key="name"
        class="my-0"
        style="text-transform: capitalize">{{name}}</v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
  export default {
    name: 'TableSorter',
    props: ['value', 'list']
  }
</script>

<style>
  #sorter .v-btn--active
  {
    background-color: green !important;
    color: white !important;
  }
</style>