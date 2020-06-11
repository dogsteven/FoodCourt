<template>
<v-container class=" mx-auto">
  <v-list one-line>
    <v-container max-width="400" class="mx-auto">
      <v-list-item v-for="item in items" :key="item.id">
            <v-list-item-avatar size="80">
              <v-img :src="item.img"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-text="item.price"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
            <v-row> 
              <v-btn small class="my-auto"> <v-icon x-small> mdi-minus </v-icon> </v-btn>
              <v-content class="mx-3"> {{item.qty}} </v-content>
              <v-btn small class="my-auto mr-0"> <v-icon x-small> mdi-plus </v-icon> </v-btn>
              <v-btn icon ripple  class="mt-3"><v-icon color="red lighten-1" x-small> mdi-delete </v-icon></v-btn>
            </v-row>
            </v-list-item-action>
      </v-list-item>
      </v-container>
  </v-list>
    <v-bottom-navigation
      absolute
      fixed
      color="white"
      horizontal
    >
      <v-content> Total </v-content>
      <v-btn x-large color="success" dark class="mx-auto"> Checkout </v-btn>
    </v-bottom-navigation>

    <!-- <v-sheet
      id="scroll-area-2"
      class="overflow-y-auto"
    >
    </v-sheet> -->

</v-container>
</template>

<script>
export default {
  data: () => ({
      items: [{
          id: '1',
          img: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Crispy-Fried-Chicken_EXPS_FRBZ19_6445_C01_31_3b-2.jpg',
          price: 20000,
          title: 'Chicken',
          qty: 2
      },
      {
        id: '2',
          img: 'https://cdn.vuetifyjs.com/images/cards/kitchen.png',
          price: 30000,
          title: 'Beef',
          qty: 2
      }]
  })
}
</script>
