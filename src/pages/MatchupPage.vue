<template>
  <div class="container">
    <div class="block ">
      <p class="block__header mt-4">Matchups</p>
      <div class="row mt-4 justify-content-center justify-content-lg-start">
        <div
          class="col-12 col-md-6 col-lg-4"
          v-for="(map, index) in currentMaps"
          :key="map.id"
        >
          <MatchupCard
            class="mx-auto mx-lg-0"
            :mapName="map.name"
            :mapImg="map.img"
            :redChampImg="currentChampions[index * 2]?.img"
            :blueChampImg="currentChampions[index * 2 + 1]?.img"
            @reroll-red-champ="handleChampionReroll(index, 'red')"
            @reroll-blue-champ="handleChampionReroll(index, 'blue')"
          />
        </div>
        <div class="generate-btnbox-grid mt-4">
          <button class="col-12 mb-3 generate-btnbox-grid__btn" @click="copyToClipboard()">
            copy result string
          </button>
          <button class="col-12 generate-btnbox-grid__btn" @click="generateMatchup()">
            generate new bo3
          </button>
        </div>
      </div>
      
    </div>
    <div class="block">
      <p class="block__header mt-4">Maps ban</p>
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="map in MatchupManager.IMMUTABLE_MAPS_LIST" :key="map.id">
          <MapCard
            
            :mapName="map.name"
            :mapImg="map.img"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { onMounted, ref } from 'vue';
  import MatchupCard from "../components/MatchupCard.vue"
  import MapCard from "../components/MapCard.vue";

  import MatchupManager from "./../utils/matchupManager.js";

  const currentMaps = ref([]);
  const currentChampions = ref([]);

  const handleChampionReroll = (index, team) => {
    const updatedChampions = MatchupManager.rerollChampion(index, team);
    currentChampions.value = [...updatedChampions];
  };

  const generateMatchup = () => {
    MatchupManager.generateMatchup();
    currentMaps.value = [...MatchupManager.currentMaps];
    currentChampions.value = [...MatchupManager.currentChampions];
  }

  const copyToClipboard = async () => {
    const chatString = "[Red / Blue]. " + MatchupManager.getMatchupChatString();
    try {
      await navigator.clipboard.writeText(chatString);
    } catch (err) {
      console.error("Не удалось скопировать: ", err);
    }
  };

	onMounted(() => {
		MatchupManager.generateMatchup();
    currentMaps.value = MatchupManager.currentMaps;
    currentChampions.value = MatchupManager.currentChampions;
	})
</script>
<style lang="scss">
  @import url(./../styles/MatchupPage.scss);
</style>