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
6. Để gọi http request, sử dụng `axios`:
```
import axios from 'axios'
```