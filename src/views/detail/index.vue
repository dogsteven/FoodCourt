<template>
  <v-card>
    <v-tabs v-model="tab" background-color="#b38867" dark grow>
      <v-tab>Detail</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
          v-for="(item, i) in items"
          :key="i"
          :color="item.color"
          :icon="item.icon"
          fill-dot
        >
          <v-card :color="item.color" dark>
            <v-card-title class="title">{{item.text}}</v-card-title>
            <v-card-text>{{item.subtext}}</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-tabs-items>
  </v-card>
</template>


<script>
export default {
  data: () => ({
    items: [
      {
        color: "red lighten-2",
        icon: "fas fa-clock",
        text: "Nhận",
        subtext: "09.10 AM, 14 June 2020"
      },
      {
        color: "purple darken-1",
        icon: "fas fa-utensils",
        text: "Chuẩn bị",
        subtext: "09.10 AM, 14 June 2020"
      },
      {
        color: "green lighten-1",
        icon: "fas fa-check",
        text: "Hoàn thành",
        subtext: "Sẽ xong trong 30 phút"
      }
    ]
  })
};
</script>