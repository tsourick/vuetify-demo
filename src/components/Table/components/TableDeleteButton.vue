<template>
  <v-btn
    id="idcBtnDel"
    @click="$emit('confirmed', $event)" 
    :disabled="! hasRowsSelected"
    class=" myPagerBorder my-0 py-0 mr-2 ml-auto idcBtnDel" 
    :class="{active: hasRowsSelected}"
    outlined borderless
    style="text-transform: capitalize"
    >delete {{selectedRows.length ? `(${selectedRows.length})` : ''}}</v-btn>
</template>

<script>
  export default {
    name: 'TableDeleteButton',
    props: ['selectedRows'],
    computed: {
        hasRowsSelected() { return (this.selectedRows.length > 0)} 
    }
  }
</script>

<style>
  #idcBtnDel.active
  {
    background-color: green;
    color: white !important;
    border: 1px solid green
  }

</style>