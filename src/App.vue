<template>
  <v-app>
    <AppBar />

    <v-content>
      <v-container fluid>
        <v-row>
          <v-col>
            <MyTable/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import MyTable  from './components/Table/MyTable';
import AppBar   from './components/AppBar';

export default {
  name: 'App',

  components: {
    MyTable,
    AppBar
  }
};
</script>

<style>
  .myPagerBorder {
  border-radius: 0;
  }

  .v-text-field--outlined.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot
  {
    min-height: 36px;
    height: 36px;
  }

  .v-btn {
    font-weight: normal;
  }
</style>
