# Food Court Mobile App

## Setup router

Vào file `src/router/index.js`, thêm vào biến `routes` thông tin:
```
const routes = [
    ...,
    {
        path: '/your_view_path',
        name: 'Your view name',
        component: ViewComponent
    },
    ...
]
```
Để `ViewComponent` được load khi khởi động app, ta thực hiện:
```
import ViewComponent from '../views/ViewDirectory'
```
Để `ViewComponent` được load lazy thì ta thực hiện:
```
```
let ViewComponent = () => import(\*  webpackChunkName: "view_component" *\ '../views/ViewDirectory')