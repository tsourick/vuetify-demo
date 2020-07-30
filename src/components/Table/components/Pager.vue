<template>
  <div class="d-flex" _style="max-width: 350px"> 
    <div>
      <v-select
        id="ppselect"
        :items="pplist" :value="pp" 
        hide-details dense outlined color="primary"
        class=" myPagerBorder my-0 py-0"
        suffix="Per Page"
        @change="onPPChange"
        :menu-props="{ offsetY: true }" />
    </div>

    <div class="text-no-wrap mx-3">
      <v-btn :disabled="!canGoPrev" @click="onNav(-1)" icon class="mx-2 myPagerBorder" light outlined><v-icon>mdi-chevron-left</v-icon></v-btn>
      {{paginationData.pageStart+1}} - {{paginationData.pageStop}} of {{paginationData.itemsLength}}
      <v-btn :disabled="!canGoNext" @click="onNav(1)" icon class="mx-2 myPagerBorder" light outlined><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Pager',
    props: ['pplist', 'pp', 'canGoPrev', 'canGoNext', 'paginationData'],
    methods: {
      onPPChange (e) {
        this.itemtext = 'qqwe'
        this.$emit('ppchange', e)
      },
      onNav (direction) {
        this.$emit('nav', direction)
      }
    }
  }
</script>

<style>
  .v-select__selections input { display: none}

  .v-select.v-input--dense .v-select__selection--comma {margin: 0; margin-right: 2px}
</style>

