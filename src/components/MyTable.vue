<template>
  <v-container>
    <v-row>
      <v-col>
        <div v-text="customText"></div>
        <v-btn small color="primary" @click="onClick">click me</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-no-wrap">Sorting by: 

        <v-btn-toggle tile group dense v-model="sortField" color="white">
          <v-btn v-for="name in headerNames" :value="name" :key="name"
           color="green" outlined>{{name}}</v-btn>
        </v-btn-toggle>

      </v-col>
      <v-col><v-btn color="success" @click="onDeleteAllClick($event)" :disabled="! (selectedRows.length > 0)">delete</v-btn></v-col>
      <v-col class="text-no-wrap">Per page:</v-col>
      <v-col>

        <!-- <v-combobox class=" myPagerBorder my-0 py-0" style="border: none"
         hide-details dense outlined :items="pagerui.combo.items" v-model="itemsPerPage" color="primary"/> -->
        <v-select
         :items="pagerui.combo.items" v-model="itemsPerPage" 
         hide-details dense outlined color="primary"
         class=" myPagerBorder my-0 py-0" />
         
      </v-col>
      <v-col class="text-no-wrap"> 
        <v-btn :disabled="!canGoPrev" @click="nav(-1)" icon class="mx-2 myPagerBorder" light color="primary" outlined><v-icon>mdi-chevron-left</v-icon></v-btn>
        {{paginationData.pageStart+1}} - {{paginationData.pageStop}} of {{paginationData.itemsLength}}
        <v-btn :disabled="!canGoNext" @click="nav(1)" icon class="mx-2 myPagerBorder" light color="primary" outlined><v-icon>mdi-chevron-right</v-icon></v-btn>
      </v-col>
     </v-row>
     <v-row>
      <v-col>

        <v-select
         :items="headerNames" v-model="headerNamesSelected" multiple
          hide-details dense outlined
          :menu-props="{offsetY: true}"
          item-color="success"
          class=" myPagerBorder my-0 py-0"
          @change="onHeadersChanged">
            <template #prepend-item>
              <v-list-item ripple @click="toggleAll">
                <v-list-item-action>
                   <v-icon :color="headerNamesSelected.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Select All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
            <template #selection="{ index }">
              <span v-if="index === 0"
                class="grey--text"
              >{{ headerNamesSelected.length }} columns selected</span> 
            </template>
        </v-select>

      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table ref="myTable"
          :headers="tableHeaders" :items="tableItems" :items-per-page="t_itemsPerPage" :page="t_page"
          @update:items-per-page="itemsPerPage=$event"
          :footer-propsOFF="{itemsPerPageOptions: [1,2,3,5,10,-1]}"
          hide-default-footer
          @pagination="onPagination"
          :sort-by.sync="sortField"
          show-select
          v-model="selectedRows"
          v-on:cancelclicked="console.log('a')"
         >

          <template #item.name="props">
            {{props.value}} (ID:{{props.item.id}})
          </template>

          <template #item.actions="{ item }">

            <!-- <v-menu
                :close-on-content-click="false"
                :nudge-width="200"
                offset-y
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      v-bind="attrs"
                      v-on="on"
                      text small class="text-lowercase"
                    >
                    <v-icon>
                      mdi-trash-can-outline
                    </v-icon>
                    delete
                  </v-btn>

                </template>            

                Are you sure?
                <v-btn @click="onPopoverCancel()"
                    text-capitalize outlined
                >
                  Cancel</v-btn>
                <v-btn 
                  @click="onPopoverDelete()"
                  text-capitalize color="success"
                >
                  Confirm
                </v-btn>
            </v-menu> -->
            <v-btn
              @click="onDeleteClick($event, item)"
                text small class="text-lowercase"
              >
              <v-icon>
                mdi-trash-can-outline
              </v-icon>
              delete
            </v-btn>

          </template>

        </v-data-table>
      </v-col>
    </v-row>

    
    <v-menu
        :close-on-content-click="false"
        :close-on-click="false"
        absolute
        z-index="9999999"
        :position-x="popoverX"
        :position-y="popoverY"
        ref="popover"
        :value="popoverShow"
        
        class="px-2 bg-white"
        >

    <v-card>
        <v-card-text class="text-center">
          <div class="mb-2 text-subtitle-2">Are you sure you want to <b>delete the item</b>?</div>
          <div>
            <v-btn small @click="onPopoverCancel()" class="mr-5 text-capitalize"
                 outlined
            >
              Cancel</v-btn>
            <v-btn small
              @click="onPopoverDelete()"
              color="success text-capitalize"
            >
              Confirm
            </v-btn>
          </div>
        </v-card-text>
      </v-card>

    </v-menu>

  </v-container>
</template>

<script>
  const ucfirst = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  let strings = ['string A','string B','string C'];
  strings.cur =  0;

  const rotate = function () {
    if ( strings.cur >= strings.length) strings.cur = 0;
    return strings[strings.cur++];
  }

  let headerNames = 'id,name,pos,actions';
  (function initHeaderNames() {
    headerNames = headerNames.split(',')
  })();
  const getTableHeaders = function (names) {
    let hs = [];

    (names || headerNames).forEach((name) => {
      hs.push({text: ucfirst(name), value: name})
    });

    return hs;
  }

  let tabularData = [
    '1,  A,  0',
    '2,  B,  0',
    '3,  C,  0',
    '4,  D,  0',
    '5,  E,  0',
    '6,  F,  0',
    '7,  G,  0',
    '8,  H,  0',
    '9,  I,  0',
    '10, J,  0',
  ]
  const genTableItems = function () {
    let r = [];
    
    tabularData.forEach((row) => {
        let rowData = row.split(',');
        let o = {};
        headerNames.forEach((col, j) => {
          o[col] = rowData[j]
        })
        r.push(o);
    });
    return r;
  }

  export default {
    name: 'MyTable',

    data: () => ({
      customText: 'initial text',

      tableHeaders: getTableHeaders(),
      tableItems: genTableItems(),
      itemsPerPage : 3,
      page: 1,
      paginationData: {},
      canGoNext: true,
      canGoPrev: true,
      headerNames,
      sortField: headerNames[0],
      console,
      selectedRows: [],

      popoverAttach: undefined,
      popoverShow: false,
      popoverX: 0,
      popoverY: 0,

      headerNamesSelected: headerNames,

      pagerui: {
        combo:{
          items: [{header: 'choose one:'}, 1,3,5,10,15, {text: 'All', value: -1}]
        },
        nav: {

        }
      }
    }),
    watch: {
      sortField: function (v, old) {
        console.log(v, old);        
      }

      /* $props: {
        handler(d) {
          // let d = this.parseData();
          console.log(d);
        },
        deep: true,
        immediate: true,
      } */
    },
    computed: {
      t_itemsPerPage () { return this.itemsPerPage},
      t_page () { return this.page},
      headersSelectedAll () {
        return this.headerNamesSelected.length === this.headerNames.length
      },
      headersSelected () {
        return this.headerNamesSelected.length > 0
      },      
      icon () {
        if (this.headersSelectedAll) return 'mdi-close-box'
        if (this.headersSelected) return 'mdi-plus-box'
        return 'mdi-checkbox-blank-outline'
      },      
    },

    methods: {
      onClick () {
        this.customText = rotate()
      },
      nav (direction) {
        // console.log(this.$refs.myTable)
        this.page = this.page + direction
      },
      onPagination (data){
        this.paginationData = data;
        this.canGoPrev = data.page > 1;
        this.canGoNext = data.page < data.pageCount;
      },
      toggleAll() {
        this.$nextTick(() => {
          if (this.headersSelectedAll) {
            this.headerNamesSelected = []
          } else {
            this.headerNamesSelected = this.headerNames.slice()
          }

          this.onHeadersChanged(this.headerNamesSelected);
        })
      },
      onHeadersChanged (selected) {
        let newa = this.headerNames.filter((v) => { return selected.indexOf(v) !== -1 });
        this.tableHeaders = getTableHeaders(newa)
      },
      deleteItems (items){
        // console.log(items)

        items.forEach((v) => {
          let index;
          if ((index = this.tableItems.indexOf(v)) !== -1) this.tableItems.splice(index, 1)
          console.log(v.name, index);
        })

        return true
      },
      onDeleteAllClick() {
        if (this.deleteItems(this.selectedRows)) this.selectedRows = [];
      },
      onDeleteClick (evt, item){
        // if (this.deleteItems(this.selectedRows)) this.selectedRows = [];
        // console.log(item);
        console.log(evt);

        // this.popoverShow = false
        // this.popoverAttach = undefined

        let tgt = evt.target.closest('button');
        console.log(tgt);

        this.$nextTick(() => {
          // this.popoverAttach = evt.target.closest('button')
          var rect = tgt.getBoundingClientRect();
          console.log(rect);
          this.popoverX = rect.left;
          this.popoverY = rect.top + rect.height;
          
          this.popoverItem = item;

          this.popoverShow = true;
        })
      },
      popoverClose() {
        this.popoverShow = false;
        this.popoverItem = null;
      },
      onPopoverCancel (){
        console.log('cancel');
        this.popoverClose()
      },
      onPopoverDelete (){
        console.log('delete');
        if (this.popoverItem) this.deleteItems([this.popoverItem])
        this.popoverClose()
      }
    },
    
    mounted () {
      // this.customText = rotate()
      window.mytable = this.$refs.myTable
    }
  }
</script>

<style lang="scss" scoped>

#myBtnLeft, .myPagerBorder {
 border-radius: 0;
}
</style>
