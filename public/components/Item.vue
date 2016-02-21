<style>
.item {
  position: relative;
  background: #fff;
  margin-bottom: 1px;
  padding: 20px;
}
.item strong {
  position: absolute;
  top: 0;
  right: 10px;
  text-align: center;
  color: #CDEBFF;
  font-size: 40px;
}
.info {
  overflow: hidden;
}
.info h3 {
  width: 88%;
  margin-top: 0;
  margin-bottom: 6px;
  overflow: hidden;
}
.info h3 a {
  white-space: nowrap;
  color: #006699;
  transition: all 3s linear;
}
.roll-display a:hover {
  position: relative;
  z-index: 1;
  display: block;
  transform: translate(-100%, 0)
}

.user-avatar {
  float: left;
  margin-right: 20px;
}
.user-avatar img {
  border-radius: 50%;
}
.user-name {
  color: #1D5982;
  vertical-align: 20%;
}
.item-transition {
  transition: all .6s cubic-bezier(0.25, 0.1, 0, 1.56);
}

.item-enter {
  transform: scale(0);
}
</style>

<template>
  <li class="item" v-el="abc">
    <strong>{{item.rankingId}}</strong>
    <div class="user-avatar"><img v-bind:src="item.userIconUrl" alt="{{item.userNickname}}"></div>
    <div class="info">
        <h3 v-bind:class="{'roll-display': isOverflow}">
          <a href="{{item.watchUrl}}">{{item.title}}</a>
        </h3>
      <a class="user-name" href="{{item.userUrl}}">{{item.userNickname}}</a>
    </div>
  </li>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    isOverflow() {
      var bytesLength = this.item.title.length;
      var bytesMatch = this.item.title.match(/[^\x00-\xff]/g);
      bytesLength += bytesMatch ? bytesMatch.length : 0;
      return bytesLength >= 46;
    }
  }
};
</script>
