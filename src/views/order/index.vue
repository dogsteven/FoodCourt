<template>
  <v-card>
    <v-tabs
      v-model="tab"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
      >
        <v-card
          max-width="344"
          class="mx-auto"
        >
        <v-list-item>
          <v-list-item-avatar color="grey"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
            <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
          height="194"
        ></v-img>

    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Read
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Bookmark
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-card>
</template>


<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          { tab: 'Tracking Order'},
          { tab: 'Done Order'},
        ],
      }
    },
  }
</script>