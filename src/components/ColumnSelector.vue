<template>
  <v-select
    :items="names" :value="namesSelected" multiple @change="onChange"
    hide-details dense outlined :menu-props="{offsetY: true, class: 'ddColsMenu'}"
    class=" myPagerBorder my-0 py-0"
    style="max-width: 13rem"
    >
    <template #prepend-item>
      <v-list-item ripple
        @click="onToggleAll">
        <v-list-item-action>
            <v-icon :color="hasSelected ? 'green ' : ''">{{ icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Select All</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template #item="{ item }">
      <v-list-item ripple @click="onClickItem(item)">
        <v-list-item-action>
            <v-icon :color="isSelected(item) ? 'green' : ''">{{ getCheckboxIcon(item) }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title style="text-transform: capitalize; font-weight: normal">{{ item }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template #selection="{ index }">
      <span v-if="index === 0"
        class="grey--text text-no-wrap"
      >{{ namesSelected.length }} columns selected</span> 
    </template>
  </v-select>
</template>

<script>
    /* eslint-disable no-unused-vars */
    
  export default {
    name: 'ColumnSelector',
    props: ['names', 'namesSelected'],
    computed: {
      allSelected () {
        return this.namesSelected.length === this.names.length
      },
      hasSelected () {
        return this.namesSelected.length > 0
      },      
      icon () {
        if (this.allSelected) return 'mdi-checkbox-marked'
        if (this.hasSelected) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      },      
    },
    methods: {
      getItemIndex(v) {
        return this.namesSelected.indexOf(v);
      },
      isSelected(v) {
        return this.getItemIndex(v) != -1
      },
      onChange: function (e) {
        this.$emit('change', e)
      },
      onToggleAll: function () {
        this.$nextTick(() => {
          let selected = this.allSelected ? [] : this.names.slice();

          this.$emit('change', selected)
        })
      },
      onClickItem(v) {
        console.log(v) 
        let i, selected;

        if ((i = this.getItemIndex(v)) != -1)
        {
          selected = this.namesSelected.slice();
          selected.splice(i, 1);
        }
        else {
          selected = this.namesSelected.slice(); // copy all
          selected.push(v); // add clicked
        }

        this.$emit('change', selected)
      },
      getCheckboxIcon (v) {
        return this.isSelected(v) ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'
      }
    }
  }
</script>

<style>
</style>