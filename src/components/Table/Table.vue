<template>
  <div>
    <div class="d-flex align-center">
        <Sorter :value="firstField" :list="headerNamesAvail" @change="onFirstFieldChanged" />

        <v-btn
          id="idcBtnDel"
         @click="onDeleteAllClick($event)" 
         :disabled="! hasRowsSelected"
         class=" myPagerBorder my-0 py-0 mr-2 ml-auto idcBtnDel" 
         :class="{active: hasRowsSelected}"
         outlined borderless
         style="text-transform: capitalize"
         >delete {{selectedRows.length ? `(${selectedRows.length})` : ''}}</v-btn>

        <Pager :pplist="pplist" :pp="itemsPerPage" @ppchange="itemsPerPage = $event"
        :canGoPrev="canGoPrev" :canGoNext="canGoNext" :paginationData="paginationData"
        @nav="onNav" />

        <ColumnSelector :names="headerNames" :namesSelected="headerNamesSelected"
          @change="onHeadersChanged"/>
    </div>


    <v-data-table
      id="theTable"
      ref="myTable"
      :headers="tableHeaders" :items="tableItems" :items-per-page="t_itemsPerPage" :page="t_page"
      @update:items-per-page="itemsPerPage=$event"
      :footer-propsOFF="{itemsPerPageOptions: [1,2,3,5,10,-1]}"
      hide-default-footer
      @pagination="onPagination"
      :sort-by.sync="sortField"
      show-select
      v-model="selectedRows"
      @click:row="onRowClick"
      >

      <template #item.name="props">
        {{props.value}} (ID:{{props.item.id}})
      </template>

      <template #item.actions="{ item }">

        <v-btn
          @click.stop="onDeleteClick($event, item)"
            text small class="text-lowercase"
          >
          <v-icon>
            mdi-trash-can-outline
          </v-icon>
          delete
        </v-btn>

      </template>

      <template #item.data-table-select="all">
        <v-icon :color="all.isSelected ? 'green' : ''">
          {{ all.isSelected ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'}}
        </v-icon>
      </template>

      <template #header.data-table-select="all">
        <v-icon :color="all.props.value || all.props.indeterminate ? 'green' : ''"
          @click="all.on.input(! all.props.value)">
          {{ all.props.indeterminate ? 'mdi-minus-box': (all.props.value ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline') }}
        </v-icon>
      </template>

    </v-data-table>

    
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
            <v-btn @click="onPopoverCancel()"
              small class="mr-5 text-capitalize"
              style="border-color: #bbb"
              outlined
            >Cancel</v-btn>

            <v-btn @click="onPopoverDelete()"
              small color="success text-capitalize"
              
              elevation=0
            >Confirm</v-btn>
          </div>
        </v-card-text>
      </v-card>

    </v-menu>

  </div>
</template>

<script>
  import Utils from '@/utils'; // direct JS import

  
  let headerNames = 'id,name,pos';
  (function initHeaderNames() {
    headerNames = headerNames.split(',')
  })();
  const makeTableHeaders = function (names) {
    let hs = [];

    (names || headerNames).forEach((name, i) => {
      hs.push({text: Utils.ucfirst(name), value: name, sortable: i == 0})
    });
    
    hs.push({text : '', value: 'actions', sortable: false })

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

  
  import ColumnSelector from './components/TableColumnSelector';
  import Pager          from './components/TablePager';
  import Sorter         from './components/TableSorter';

  export default {
    name: 'Table',

    components:{
      ColumnSelector,
      Pager,
      Sorter
    },

    data: () => ({
      tableHeaders: makeTableHeaders(),
      tableItems: genTableItems(),
      itemsPerPage : 3,
      page: 1,
      paginationData: {},
      canGoNext: true,
      canGoPrev: true,
      headerNames,
      headerNamesSelected: headerNames,
      headerNamesAvail: headerNames,
      sortField: headerNames[0],
      firstField: headerNames[0],
      console,
      selectedRows: [],

      popoverAttach: undefined,
      popoverShow: false,
      popoverX: 0,
      popoverY: 0,


      pplist: [1,3,5,10,15, {text: 'All', value: -1}]
    }),
    computed: {
      t_itemsPerPage () { return this.itemsPerPage},
      t_page () { return this.page},
      hasRowsSelected() { return (this.selectedRows.length > 0)} 
    },

    methods: {
      onNav (direction) {
        // console.log(this.$refs.myTable)
        this.page = this.page + direction
      },
      onPagination (data){
        this.paginationData = data;
        this.canGoPrev = data.page > 1;
        this.canGoNext = data.page < data.pageCount;
      },

      onHeadersChanged (selected) {
        // console.log(`onHeadersChanged (${selected}) `);

        this.headerNamesSelected = selected; // bulk values
        this.headerNamesAvail = this.headerNames.filter((v) => { return selected.indexOf(v) !== -1 }); // values in original order
        this.firstField = this.headerNamesAvail[0];

        // console.log(`this.firstField (${this.firstField}) `);

        this.tableHeaders = makeTableHeaders(this.headerNamesAvail)
      },
      onFirstFieldChanged (first){
        this.firstField= first
        // console.log(`onFirstFieldChanged (${first})`);
        if (! first) return;  // skip undefined value on unselect

        // Re-order
        let names = this.headerNamesAvail.filter((v) => { return v != first});
        names.unshift(first);

        this.tableHeaders = makeTableHeaders(names)
      },

      deleteItem (where, what) {
        let index;
        if ((index = where.indexOf(what)) !== -1) where.splice(index, 1)
      },
      deleteRows (rows){
        rows.forEach((row) => {
          this.deleteItem(this.tableItems, row);   // from table
          this.deleteItem(this.selectedRows, row); // from selection
        })

        // console.log('selected rows after delete:', this.selectedRows);

        return true
      },
      onDeleteAllClick() {
        if (this.deleteRows(this.selectedRows)) this.selectedRows = [];
      },
      onDeleteClick (evt, item){
        // if (this.deleteItems(this.selectedRows)) this.selectedRows = [];
        // console.log(item);
        // console.log(evt);

        // this.popoverShow = false
        // this.popoverAttach = undefined

        let tgt = evt.target.closest('button');
        // console.log(tgt);

        this.$nextTick(() => {
          // this.popoverAttach = evt.target.closest('button')
          var rect = tgt.getBoundingClientRect();
          // console.log(rect);
          this.popoverX = rect.left;
          this.popoverY = rect.top + rect.height;
          
          this.popoverItem = item;

          this.popoverShow = true;
        })
      },
      onRowClick (item, row){
        row.select(!row.isSelected);
      },

      popoverClose() {
        this.popoverShow = false;
        this.popoverItem = null;
      },
      onPopoverCancel (){
        // console.log('cancel');
        this.popoverClose()
      },
      onPopoverDelete (){
        // console.log('delete');
        if (this.popoverItem) this.deleteRows([this.popoverItem])
        this.popoverClose()
      }

    },
    
    mounted () {
      // this.customText = rotate()
      window.mytable = this.$refs.myTable
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

  #theTable > .v-data-table__wrapper > table > tbody > tr
  > td:last-child button {
      opacity: 0;
  }
  
  #theTable > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper)
  > td:last-child button {
      opacity: 1;
  }

  #theTable > .v-data-table__wrapper > table > tbody > tr.v-data-table__selected
  {
    background-color: transparent;
  }
  #theTable > .v-data-table__wrapper > table > tbody > tr:nth-of-type(even)
  {
    background-color: rgba(0, 0, 0, .03);
  }
  #theTable > .v-data-table__wrapper > table > tbody > tr:hover
  {
    background-color: rgba(237, 248, 239);
    cursor: pointer;
  }
  #theTable > .v-data-table__wrapper > table > tbody > tr:hover
  > td:nth-child(2)
  {
    font-weight: bold;
  }


  #theTable > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row)
  {
    border: none;
  }

  #theTable .v-data-table-header th.sortable.active
  {
    color: green;
  }

  #theTable > .v-data-table__wrapper > table > thead > tr > th
  {
    color: #333;
  }
</style>
