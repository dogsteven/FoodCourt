<template>
  <v-container align="center">
    <v-row justify="space-around">
        <v-card
    class="mx-auto"
    max-width="1200"
  > 

    <v-card-text>
      <h2 class="title mb-2">Chọn loại món ăn </h2>

      <v-chip-group
        v-model="amenities"
        column
        multiple
      >
        <v-chip v-for="tag in tags" :key=tag filter outlined>{{tag}}</v-chip>
      </v-chip-group>
    </v-card-text> 
  </v-card> 
      <v-container>
        <v-list :dense="dense" :three-line="threeLine" :nav="nav" :avatar="avatar" :rounded="rounded">
        <v-card>
          <v-card-actions class="justify-center">
            <v-header flat color="orange">TODAY MENU</v-header>
          </v-card-actions>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(item, key) in $store.state.foods" 
              :key="key" 
              :inactive="inactive"
              :to="'/item-detail/' + key">
              <v-col>
                <v-row>
                  <v-col>
                  <v-avatar>
                  <v-img :src="item.picture" ></v-img>
                  </v-avatar>
                  </v-col>
                  <v-list-item-content>
                    <v-title v-html="item.name"></v-title>
                    <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-col class="text-right">
                    <v-header v-html="item.price" ></v-header>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="text-right">
                  <v-btn v-on:click= "addToCart" flat color="orange">Add to cart</v-btn>
              </v-col>
            </v-list-item>
          </v-list-item-group>
        </v-card> 
        </v-list>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data: () => ({
    item: 5,
    items: [
        {
          categories: ["món chính", "món ăn sáng"],
          description: "Đây là món bò kho bánh mì!",
          name: "Bò kho bánh mì",
          picture:
            "http://images1.baoninhthuan.com.vn/CMSImage/Resources/Uploaded/tbtdaduyet/bo-kho-banh-mi-2014-12-05-18-54.jpg",
          price: "20000 VND",
          quantity: 0,
          vendorID: 0
        },
        {
          categories: ["món chính", "món ăn sáng"],
          description: "Đây là món hủ tiếu gia truyền",
          name: "Hủ tiếu",
          picture:
            "https://media.cooky.vn/recipe/g4/36783/s800x500/cooky-recipe-cover-r36783.jpg",
          price: "22000 VND",
          quantity: 0,
          vendorID: 0
        },
        {
          categories: ["món ăn nhanh"],
          description: "Món Hambergur đắt cắt cổ!",
          name: "Hamburger",
          picture:
            "https://www.simplyhappyfoodie.com/wp-content/uploads/2018/04/instant-pot-hamburgers-3.jpg",
          price: "200000 VND",
          quantity: 0,
          vendorID: 0
        },
        {
          categories: ["món ăn nhanh"],
          description: "Món mì trộn công thức đặc biệt thơm ngon béo ngậy!",
          name: "Mì trộn",
          picture:
            "https://vncooking.com/files/cuisine/2019/01/25/mi-tron-muoi-ot-cay-nong-erc6.jpg",
          price: "15000 VND",
          quantity: 0,
          vendorID: 0
        },
        {
          categories: ["món ăn nhanh"],
          description: "Bánh giò truyền thống!",
          name: "Bánh giò",
          picture:
            "https://beptruong.edu.vn/wp-content/uploads/2016/01/mon-banh-gio.jpg",
          price: "11000 VND",
          quantity: 0,
          vendorID: 0
        },
        {
          categories: ["món tráng miệng", "món chính"],
          description: "Đây là bánh trung thu trứng muối!",
          name: "Bánh trung thu",
          picture:
            "https://cdn.eva.vn/upload/3-2019/images/2019-08-14/moi-lam-banh-trung-thu-hien-dai-2-nam-da-dep-the-nay-8x-con-mo-duoc-lop-day-hoc-39020892_869523606574753_4848377822114217984_n-1565755347-875-width960height720.jpg",
          price: "60000 VND",
          quantity: 0,
          vendorID: 0
        },
        {
          categories: ["món chính", "món ăn sáng"],
          description: "Cơm gà xối mỡ giòn rụm bên ngoài, mềm mại bên trong!",
          name: "Cơm gà xối mỡ",
          picture:
            "https://cdn.huongnghiepaau.com/wp-content/uploads/2018/07/com-ga-xoi-mo.jpg",
          price: "25000 VND",
          quantity: 0,
          vendorID: 0
        },
        {
          categories: ["món chính", "món ăn sáng"],
          description: "Phở bò gia truyền Hoàng Gia!",
          name: "Phở bò",
          picture:
            "https://media.cooky.vn/recipe/g1/4573/s480x480/recipe4573-prepare-step3-636422898648914257.jpg",
          price: "22000 VND",
          quantity: 0,
          vendorID: 0
        },
        {
          categories: ["món chính", "món ăn sáng"],
          description: "Món cà ri bò thơm ngậy",
          name: "Cà ri bò",
          picture:
            "https://media.cooky.vn/recipe/g3/25296/s480x480/recipe25296-prepare-step5-636486908431470841.jpg",
          price: "25000 VND",
          quantity: 0,
          vendorID: 0
        },
        {
          categories: ["món chính", "món ăn sáng"],
          description: "Cơm tấm sài gòn đậm hương vị đường phố Việt Nam!",
          name: "Cơm tấm",
          picture:
            "http://image.vinanet.vn/zoom/640/Uploaded/huonglan/2019_06_26/26061_EQTV.jpg",
          price: "25000 VND",
          quantity: 0,
          vendorID: 0
        },
        {
          categories: ["món chính"],
          description: "Mì quảng công thức Quảng Nôm!",
          name: "Mì quảng",
          picture:
            "https://khomay3a.com/userfiles/image/mon-ngon-moi-ngay/cach-nau-nuoc-leo-mi-quang-001.jpg",
          price: "20000 VND",
          quantity: 0,
          vendorID: 0
        }
      
    ],
    dense: true,
    threeLine: true,
    nav: true,
    avatar: true,
    rounded: true,
    breakfast: false,
    lunch: false,
    dinner: false,
    drink: false,
    tags : ["Món chính", "Món tráng miệng", "Món ăn sáng", "Món ăn nhanh", "Đồ uống"],
    counter : 0
  }),
  methods: {
    addToCart: function () {
      this.counter += 1
    }
    // https://aqueous-harbor-47765.herokuapp.com/api/test/database/Food
  }
};
</script>