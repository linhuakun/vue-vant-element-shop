<template>
  <div class="Detail-Tip">
    <div class="Tip-top">温馨提醒</div>
    <div class="Tip-alert">
      <p>本网站仅用于学习,不做任何商业用途</p>
      <p>为了您和家人的健康，适度饮酒、不要酒后驾车，小酌怡情，大酌伤身</p>
      <p>bigbar欢迎你使用本网站进行学习</p>
    </div>
    <div class="Tip-center">
      　　中国酒文化渊源流长，众多文人墨客、江湖侠客为酒痴迷，酒是情感寄托，亦是兄弟情义，千言万语都融在酒里，杯盏觥筹间畅意人生。
    </div>
    <div class="Tip-footer">
      <div class="title">酒香文化</div>
      <ul>
        <li>"鲁酒薄而邯郸围"的故事，说的是楚宣王会见诸候，鲁国恭公后到并且酒礼很淡薄，楚宣王甚怒。恭公说，我是周公之后，勋在王室，给你送酒已经是有失礼节和身份的事了，你还指责酒薄，不要太过份了。然后不辞而归。宣王于是发兵与齐国攻鲁国。齐国的梁惠王一直想进攻赵国，但却畏惧楚国会帮助赵国，这次楚国有求，便不必再担心楚国来找麻烦了，于是赵国的邯郸因为鲁国的酒薄不明不白地做了牺牲品。</li>
        <br>
        <li>东周春秋时代，越王勾践被吴王夫差战败后，为了实现"十年生聚，十年教训"的复国大略，下令鼓励人民生育，并用酒作为生育的奖品:生丈夫，二壶酒，一犬; 生女子，二壶酒，一豚"。越王勾践率兵伐吴，出师前， 越中父老献美酒于勾践，勾践将酒倒在河的上流，与将士一起迎流共饮，士卒士气大振，绍兴现在还有" 投醪河"。类似的历史故事如酒谱所载，战国时，秦穆公讨伐晋国，来到河边，秦穆公打算犒劳将士，以鼓舞将士，但酒醪却仅有一钟，有人说，即使只有一粒米，投入河中酿酒，(也可使大家分享)，于是秦穆公将这一钟酒倒入河中，三军饮后都醉了。</li>
        <br>
        <li>秦末，刘邦与项羽各自攻打秦王朝的部队，刘邦先破咸阳(秦始皇的都城) ，但刘邦兵力不及项羽，项羽大怒，派当阳君击关，项羽入咸阳后，到达戏西，而刘邦则在霸上驻军。刘邦的左司马曹无伤派人在项羽面前说刘邦打算在关中称王，项羽听后更加愤怒，下令次日一早让兵士饱餐一顿，击败刘邦的军队。</li>
        <br>
        <li>史记·高祖本纪记载:秦始皇末期，刘邦（汉高祖）做亭长时，往郦山押送劳工，但在路上，劳工大多在路上死亡，到了丰西泽中，将劳工放走，结果只有十来个壮士愿意跟随刘邦。夜中，刘邦喝醉了酒，令一人前行，前行者回报道，前面有一条大蛇阻挡在路上。请求让我们回来。刘邦正在酒意朦胧之中，似乎什么也不怕，说:是壮师的跟我来，怕什么!由是勇往直前，刘邦挥剑将挡路的大白蛇斩为两段，路开通了，走了数里路，刘邦困了，倒头就睡着了。谁成想到，有一老妇人出现在蛇被杀死的地方，一直哭，于是有人问哭的原因，老妇人说，有人将我儿子杀死了，有人又问，何以见得你儿子被杀?老妇人说，我的儿子，就是化成为蛇的白帝子， 因挡在路上被赤帝子所斩。后来有人将此事告诉刘邦，刘邦听后暗自高兴，颇为自负。</li>
      </ul>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailParamInfo",
    props: {
		  paramInfo: {
		    type: Object
      }
    }
	}
</script>

<style scoped>
.Detail-Tip .Tip-top{
  height: 24px;
    line-height: 24px;
    background: url('../../../assets/img/detail/text-bg.png') 0 0 repeat-x;
    padding: 0 10px;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
}

.Detail-Tip .Tip-alert p{
  text-align: center;
  font-size: 13px;
  line-height: 18px;
  color: #fc5a5a;
  margin-bottom: 10px;
}
.Detail-Tip  .Tip-center{
      color: #848484;
      font-size: 12px;
}

.Detail-Tip .Tip-footer .title{
  color: #444;
    padding: 10px 0 5px;
    font-weight: bold;
}
.Detail-Tip .Tip-footer ul li{
      color: #848484;
      font-size: 11px;
}
</style>
