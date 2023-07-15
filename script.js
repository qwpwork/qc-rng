const btnsubmiter      = document.getElementById('btn-submiter'),
      mapElement       = document.getElementsByClassName('card__maptitle'),
      championsElement = document.getElementsByClassName('card__champion');
      // champion2Element = document.getElementById('champion2');

window.addEventListener('load', function(){
  rngMapAndChampions.setupInit();
});      

btnsubmiter.addEventListener('click', function(){
  rngMapAndChampions.setupInit();
});

const rngMapAndChampions = {

  //awaits [string: Map, string: Champion1, string: Champion2]
  chosenSetup: [],
  
  championsList: ['Anarki', 'Athena', 'B.J. Blazkowicz', 'Clutch', 'Death Knight',
                  'Doom Slayer', 'Eisen', 'Galena', 'Keel', 'Nyx', 'Ranger', 'Scalebearer',
                  'Slash', 'Sorlag', 'Strogg & Peeker', 'Visor'],

  mapList:       ['Awoken', 'Blood Covenant', 'Blood Run', 'Corrupted Keep', 'Crucible',
                  'Deep Embrace', 'Insomnia', 'Molten Falls', 'Ruins of Sarnath', 'Vale of Pnath',
                  'Vestibule of Exile'],

  getRngNum(rngNumLimit) {
    //int rng num with limit. js syntax sucks
    return Math.floor(Math.random() * rngNumLimit);
  },

  setupInit() {
    for (let i = 0; i < mapElement.length; i++) {
      mapElement[i].innerHTML = this.mapList[this.getRngNum(this.mapList.length)];
    }
    for (let i = 0; i < championsElement.length; i += 2) {
      championsElement[i].innerHTML = this.championsList[this.getRngNum(this.championsList.length)];
      championsElement[i + 1].innerHTML = this.championsList[this.getRngNum(this.championsList.length)];
    }
    
  }
}