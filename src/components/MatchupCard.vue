<template>
	<div>
		<div class="card mt-1">
			<div class="card__overlay">
				<p class="card__map-name">{{mapName}}</p>
				<div class="card__champions-block row">
					<img 
						class="card__champion col-4 col-md-4 col-lg-4"
						draggable="false"
						:src="redChampImg"
						@click="$emit('reroll-red-champ')"
					>
					<span class="card__vs col-4 col-sm-4">vs</span>
					<img
						class="card__champion col-4 col-md-4 col-lg-4"
						draggable="false"
						:src="blueChampImg"
						@click="$emit('reroll-blue-champ')"
					>
				</div>
			</div>
			<img class="card__map-img col-12" draggable="false" :src="mapImg">
		</div>
		<div class="btnbox">
			<button
				class="btnbox__btn col-6"
				@click="$emit('reroll-red-champ')"
			>
				Reroll red champion
			</button>
			<button
				class="btnbox__btn col-6"
				@click="$emit('reroll-blue-champ')"
			>
				Reroll blue champion
			</button>
		</div>
	</div>
</template>
<script setup>
	defineProps(['mapName', 'mapImg', 'redChampImg', 'blueChampImg']);
	defineEmits(['reroll-red-champ', 'reroll-blue-champ']); 
</script>