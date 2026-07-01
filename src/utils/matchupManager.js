const MatchupManager = {
  IMMUTABLE_MAPS_LIST: [
    { id: 0, name: 'Awoken', img: './maps-preview/awoken.webp' },
    { id: 1, name: 'DM6', img: './maps-preview/dm6.webp' },
    { id: 2, name: 'ZTN', img: './maps-preview/ztn.webp' },
    { id: 3, name: 'Corrupted', img: './maps-preview/ck.webp' },
    { id: 4, name: 'Crucible', img: './maps-preview/crucible.webp' },
    { id: 5, name: 'Deep Embrace', img: './maps-preview/de.webp' },
    { id: 6, name: 'Insomnia', img: './maps-preview/insomnia.webp' },
    { id: 7, name: 'Molten', img: './maps-preview/molten.webp' },
    { id: 8, name: 'Ruins', img: './maps-preview/ruins.webp' },
    { id: 9, name: 'Vale', img: './maps-preview/vale.webp' },
    { id: 10, name: 'Exile', img: './maps-preview/exile.webp' },
    { id: 11, name: 'Koth', img: './maps-preview/koth.webp' }
  ],
  IMMUTABLE_CHAMPIONS_LIST: [
    { id: 0, name: 'Anarki', img: './char-portraits/anarki.svg' },
    { id: 1, name: 'Athena', img: './char-portraits/athena.svg' },
    { id: 2, name: 'B.J. Blazkowicz', img: './char-portraits/bj.svg' },
    { id: 3, name: 'Clutch', img: './char-portraits/clutch.svg' },
    { id: 4, name: 'Death Knight', img: './char-portraits/dk.svg' },
    { id: 5, name: 'Doom Slayer', img: './char-portraits/doom.svg' },
    { id: 6, name: 'Eisen', img: './char-portraits/eisen.svg' },
    { id: 7, name: 'Galena', img: './char-portraits/galena.svg' },
    { id: 8, name: 'Keel', img: './char-portraits/keel.svg' },
    { id: 9, name: 'Nyx', img: './char-portraits/nyx.svg' },
    { id: 10, name: 'Ranger', img: './char-portraits/ranger.svg' },
    { id: 11, name: 'Scalebearer', img: './char-portraits/scale.svg' },
    { id: 12, name: 'Slash', img: './char-portraits/slash.svg' },
    { id: 13, name: 'Sorlag', img: './char-portraits/sorlag.svg' },
    { id: 14, name: 'Strogg & Peeker', img: './char-portraits/strogg.svg' },
    { id: 15, name: 'Visor', img: './char-portraits/visor.svg' }
  ],
  userBannedMaps: [],

  mapsList: [],
  mapsBlacklist: [],
  championsList: [],
  championsBlacklist: [],

  currentMaps: [],
  currentChampions: [],

  generateMatchup() {
    this.mapsBlacklist = [...this.userBannedMaps];
    this.championsBlacklist = [];
    this.currentMaps = [];
    this.currentChampions = [];
    this.resetLists();

    for (let i = 0; i < 3; i++) {
      this.currentMaps.push(this.getRandomMap());
      for (let j = 0; j < 2; j++) {
        this.currentChampions.push(this.getRandomChampion());
      }
    }
  },

  getMatchupChatString() {
    const games = this.currentMaps.map((map, index) => {
      const redChamp = this.currentChampions[index * 2]?.name || '???';
      const blueChamp = this.currentChampions[index * 2 + 1]?.name || '???';
      return `[${map.name}]: ${redChamp}/${blueChamp}`;
    });
    return games.join(', ');
  },

  getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  },

  getRandomMap() {
    const item = this.getRandomElement(this.mapsList);
    this.addMapToBlacklist(item);
    return item;
  },
  
  getRandomChampion() {
    const item = this.getRandomElement(this.championsList);
    this.addChampionToBlacklist(item);
    return item;
  },

  rerollChampion(gameIndex, team) {
    const targetIndex = team === 'red' ? gameIndex * 2 : gameIndex * 2 + 1;
    const oldChampion = this.currentChampions[targetIndex];

    const newChampion = this.getRandomChampion();
    if (!newChampion) {
      console.warn("Доступные чемпионы закончились!");
      return this.currentChampions;
    }

    if (oldChampion) {
      this.removeChampionFromBlacklist(oldChampion);
    }

    this.currentChampions[targetIndex] = newChampion;
    return this.currentChampions;
  },

  resetLists() {
    this.updateMapList();
    this.updateChampionsList();
  },

  updateMapList() {
    this.mapsList = [...this.IMMUTABLE_MAPS_LIST];
    //remove banned or picked maps from list of available maps
    this.mapsList = this.mapsList.filter( mapItem => !this.mapsBlacklist.some(bannedItem => bannedItem.id === mapItem.id));
  },

  addMapToBlacklist(item) {
    this.mapsBlacklist.push(item);
    this.updateMapList();
  },

  removeMapFromBlacklist(item) {
    const index = this.mapsBlacklist.findIndex(bannedItem => bannedItem.id === item.id);
    this.mapsBlacklist.splice(index, 1);
    this.updateMapList();
  },

  updateChampionsList() {
    this.championsList = [...this.IMMUTABLE_CHAMPIONS_LIST];
    //remove banned or picked champions from list of available champions
    this.championsList = this.championsList.filter( championItem => !this.championsBlacklist.some(bannedItem => bannedItem.id === championItem.id));
  },

  addChampionToBlacklist(item) {
    this.championsBlacklist.push(item);
    this.updateChampionsList();
  },

  removeChampionFromBlacklist(item) {
    const index = this.championsBlacklist.findIndex(bannedItem => bannedItem.id === item.id);
    this.championsBlacklist.splice(index, 1);
    this.updateChampionsList();
  },

}
export default MatchupManager;
