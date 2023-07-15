const btnsubmiter      = document.getElementById('btn-submiter'),
      mapElement       = document.getElementById('map'),
      champion1Element = document.getElementById('champion1'),
      champion2Element = document.getElementById('champion2');

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
    this.chosenSetup = [];
    this.chosenSetup.push(this.mapList[this.getRngNum(this.mapList.length)],
                          this.championsList[this.getRngNum(this.championsList.length)],
                          this.championsList[this.getRngNum(this.championsList.length)]);

    mapElement.innerHTML = this.chosenSetup[0];
    champion1Element.innerHTML = this.chosenSetup[1];
    champion2Element.innerHTML = this.chosenSetup[2];
  }
}