<template>
	<div 
    class="mapcard"
    :class="{ 'mapcard_error': isError }"
    @click="toggleClick()"
    @mouseleave="isError = false"
  >
    <div class="mapcard__name-container">
      <p v-if="isError" class="mapcard__name mapcard__name_error">
        Can't ban. <br> Keep 3 maps min
      </p>
      <p v-else class="mapcard__name">
        [ {{ mapName }} ]
      </p>
    </div>
    <div class="mapcard__img-block" :class="{ 'mapcard__img-block_banned': isBanned }">
      <img class="mapcard__img" draggable="false" :src="mapImg">
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import MatchupManager from './../utils/matchupManager'
	const props = defineProps(['mapName', 'mapImg']);

  const isBanned = ref(false);
  const isError = ref(false);

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
        isError.value = true;
      }
    }
    else {
      const index =  MatchupManager.userBannedMaps.findIndex(bannedItem => bannedItem.id === clickedMap.id);
      MatchupManager.userBannedMaps.splice(index, 1);
      MatchupManager.removeMapFromBlacklist(clickedMap)
      isBanned.value = false;
    }
  }
    
</script>