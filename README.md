# Food Court Mobile App
## Lưu ý
1. Chỉ làm trên thư mục `src` và đừng làm cái gì khác ngoài thư mục này.
2. Sử dụng Vuetify để code giao diện cho dễ, lên mạng có hướng dẫn đầy đủ (phần UI Components trong trang chính của Vuetify).
3. Các view nằm ở `src/views`, thêm một view mới thì tạo một thư mục trong đó, ví dụ `src/views/NewView/index.vue` và vào `src/router/index.js` để thêm router cho view đó.
4. Biến toàn cục lưu ở `src/store/index.js`, tác vụ thay đổi đồng bộ thêm vào `mutables`, tác vụ bất đồng bộ lưu ở `actions`, lên mạng để thêm tham khảo (keyword: Vuex).
5. Để test giao diện, dùng:
```
$ npm run serve
```
6. Để gọi http request đến server `food court`, sử dụng `http` trong `src`:
```
import http from 'path/to/http'

http.get('api/food').then((reponse) => {
    // callback
})
```
7. Về icon thì ta sẽ dùng tag `v-icon`:
```
<v-icon>fas fs-[icon-name]</v-icon>
```
Trong đó `[icon-name]` là tên icon tìm kiến trong "https://fontawesome.com/icons?d=gallery&m=free" (chú ý là tìm icon free thôi nha, pro méo có tiền trả)
Ví dụ như:
```
<v-icon>fas fs-home</v-icon>
```