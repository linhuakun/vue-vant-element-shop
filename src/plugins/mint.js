import Vue from 'vue'
import { Button } from 'vant';
import { Uploader } from 'vant';
import { Popup } from 'vant';
import {Field } from 'vant'
import { SwipeCell} from 'vant';
import { Cell, CellGroup } from 'vant';
import { Card } from 'vant';
import { Tag, AddressEdit,} from 'vant';
import { Sku } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Toast } from 'vant';




import 'vant/lib/index.css';
import '@vant/touch-emulator';

Vue.use(Sku);
Vue.use(SwipeCell);
Vue.use(Button)
Vue.use(Uploader);
Vue.use(Popup);
Vue.use(Field );
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Card);
Vue.use(Tag)
Vue.use(AddressEdit);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Toast);