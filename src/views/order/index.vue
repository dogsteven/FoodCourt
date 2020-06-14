<template>
  <v-container>
    <v-tabs v-model="tab" grow>
      <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <v-card class="mx-auto">
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="http://images1.baoninhthuan.com.vn/CMSImage/Resources/Uploaded/tbtdaduyet/bo-kho-banh-mi-2014-12-05-18-54.jpg"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">Bò kho bánh mì</v-list-item-title>
              <v-list-item-subtitle>Đây là món bò kho bánh mì!</v-list-item-subtitle>
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