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