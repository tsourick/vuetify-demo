<template>
  <v-menu
    :close-on-content-click="true"
    :close-on-click="true"
    absolute
    z-index="9999999"
    :position-x="x"
    :position-y="y"
    ref="popover"
    v-model="innerValue"
    
    class="px-2 bg-white"
    >
      <v-card>
        <v-card-text class="text-center">
          <div class="mb-2 text-subtitle-2">Are you sure you want to <b>delete the item</b>?</div>
          <div>
            <v-btn
              small class="mr-5 text-capitalize"
              style="border-color: #bbb"
              outlined
            >Cancel</v-btn>

            <v-btn @click="$emit('confirmed')"
              small color="success text-capitalize"
              
              elevation=0
            >Confirm</v-btn>
          </div>
        </v-card-text>
      </v-card>

    </v-menu>
</template>

<script>
export default {
  name: 'TablePopover',
  
  props: ['value', 'x', 'y'],
  computed: {
    innerValue: // v-model support
    {
      get () { return this.value },
      set (v) { this.$emit('input', v) }
    }
  }
}
</script>