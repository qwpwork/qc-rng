<template>
	<div class="mapcard" @click="toggleClick()">
    <p class="mapcard__name">[ {{ mapName }} ]</p>
    <div class="mapcard__img-block" :class="{ 'mapcard__img-block_banned': isBanned }">
      <img class="mapcard__img" draggable="false" :src="mapImg">
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import MatchupManager from './../utils/matchupManager'
	const props = defineProps(['mapName', 'mapImg']);

  const isBanned = ref(false)

  const foundMap = () => {
    return MatchupManager.IMMUTABLE_MAPS_LIST.find(map => map.name === props.mapName);
  }

  const toggleClick = () => {
    
    const clickedMap = foundMap();

    if (isBanned.value == false) {
      if (MatchupManager.userBannedMaps.length < 9) {
        MatchupManager.userBannedMaps.push(clickedMap)
        MatchupManager.addMapToBlacklist(clickedMap)
        
        isBanned.value = true;
      }
      else {
        alert ("Бан невозможен, в противном случае карт будет недостаточно для бо3")
      }
    }
    else {
      const index =  MatchupManager.userBannedMaps.findIndex(bannedItem => bannedItem.id === clickedMap.id);
      MatchupManager.userBannedMaps.splice(index, 1);
      MatchupManager.removeMapFromBlacklist(clickedMap)
      isBanned.value = false;
    }
    console.log(MatchupManager.mapsBlacklist)
  }
    
</script>
<style lang="scss">
  .mapcard{
    width: 356px;
    position: relative;
    margin-right: 28px;
    margin-bottom: 28px;
    text-align: center;
    user-select: none;
    &:hover {
      cursor: pointer;
      .mapcard__img-block:not(.mapcard__img-block_banned) {
        .mapcard__img {
          filter: brightness(80%);
        }
      }
    }
    
    &__img {
      width: 352px;
      display: block;
      transition: 0.2s ease-in-out;
      filter:brightness(40%);
      &-block{
        width: inherit;
        border: 2px solid #ffffff;
        transition: 0.2s ease-in-out;
        &_banned{
          border: 2px solid #b12027;
          & > img {
            filter: brightness(20%);
          }
        }
      }
      
    }
    &__name {
      position: absolute;
      left: 50%;
      top: 50%;
      line-height: 1;
      font-size: 24px;
      user-select: none;
      transform: translateX(-50%) translateY(-50%);
      margin: auto;
      z-index: 1;
      width: inherit;
    }
  }
</style>