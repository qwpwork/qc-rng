const immutableChampionsList = ['Anarki', 'Athena', 'B.J. Blazkowicz', 'Clutch', 'Death Knight',
                                'Doom Slayer', 'Eisen', 'Galena', 'Keel', 'Nyx', 'Ranger',
                                'Scalebearer', 'Slash', 'Sorlag', 'Strogg & Peeker', 'Visor'];

const immutableMapList = ['Awoken', 'Blood Covenant', 'Blood Run', 'Corrupted Keep', 'Crucible',
                          'Deep Embrace', 'Insomnia', 'Molten Falls', 'Ruins of Sarnath',
                          'Vale of Pnath', 'Vestibule of Exile'];

const btnsubmiter      = document.getElementById('btn-submiter'),
      mapElement       = document.getElementsByClassName('card__maptitle'),
      championsElement = document.getElementsByClassName('card__champion');

window.addEventListener('load', function(){
  rngMapAndChampions.setupInit();
});      

window.addEventListener('keyup', function(event) {
  const isKeyInListeningList = (event.code === 'Space') || (event.code === 'Enter') ||
                                                           (event.code === 'R'); 
  if (isKeyInListeningList) {
    rngMapAndChampions.setupInit();
  }
})

btnsubmiter.addEventListener('click', function(){
  rngMapAndChampions.setupInit();
});

const rngMapAndChampions = {
  currentRngNum: 0,
  championsList: [...immutableChampionsList],
  mapList:       [...immutableMapList],

  getRngNum(rngNumLimit) {
    //int rng num with limit. js syntax sucks
    return Math.floor(Math.random() * rngNumLimit);
  },

  setupInit() {
    for (let i = 0; i < mapElement.length; i++) {
      this.currentRngNum = this.getRngNum(this.mapList.length);
      mapElement[i].innerHTML = this.mapList[this.currentRngNum];
      this.mapList.splice(this.currentRngNum, 1);
    }

    for (let i = 0; i < championsElement.length; i += 2) {
      this.currentRngNum = this.getRngNum(this.championsList.length);
      championsElement[i].innerHTML = this.championsList[this.currentRngNum];
      this.championsList.splice(this.currentRngNum, 1);

      this.currentRngNum = this.getRngNum(this.championsList.length);
      championsElement[i + 1].innerHTML = this.championsList[this.currentRngNum];
      this.championsList.splice(this.currentRngNum, 1);
    }
    this.resetUsedElements();
  },
  
    resetUsedElements() {
    this.championsList = [...immutableChampionsList];
    this.mapList = [...immutableMapList];
  }
}