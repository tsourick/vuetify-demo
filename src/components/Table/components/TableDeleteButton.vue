<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        id="idcBtnDel"
        v-bind="attrs"
        v-on="on"
        :disabled="! hasRowsSelected"
        class=" myPagerBorder my-0 py-0 mr-2 ml-auto idcBtnDel" 
        :class="{active: hasRowsSelected}"
        outlined borderless
        style="text-transform: capitalize"
        >delete {{selectedRows.length ? `(${selectedRows.length})` : ''}}</v-btn>

    </template>

     <v-card>
        <v-card-text class="text-center pt-2">
          <div class="mb-2 text-subtitle-2">Are you sure you want to <b>delete selected items</b>?</div>
          <div>
            <v-btn @click="onCancel"
              small class="mr-5 text-capitalize"
              style="border-color: #bbb"
              outlined
            >Cancel</v-btn>

            <v-btn @click="onConfirm"
              small color="success text-capitalize"
              
              elevation=0
            >Confirm</v-btn>
          </div>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'TableDeleteButton',
    data: () => ({
      dialog: false
    }),
    props: ['selectedRows'],
    computed: {
        hasRowsSelected() { return (this.selectedRows.length > 0)} 
    },
    methods: {
      onCancel () {
        this.dialog = false;
      },
      onConfirm (e) {
        this.dialog = false;
        this.$emit('confirmed', e)
      }
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