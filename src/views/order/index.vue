<template>
  <v-container>
    <v-tabs v-model="tab" grow>
      <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card class="my-3">
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
              <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-card class="my-3">
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
              <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      tab: null,
      items: [{ tab: "Tracking Order" }, { tab: "Done Order" }]
    };
  }
  
};
</script>