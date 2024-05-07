<script lang="ts">
	import MapComponent from "$lib/MapComponent.svelte";

    type MapDataType = {lng: number, lat: number, zoom: number}

    export let isExternalMapData = false;
    export let mapData: MapDataType = {lng: 0, lat: 0, zoom: 0};
    export let debugMode = true;

    let updateMap: (lng: number, lat: number) => void;
    
    function update_map_display() {
        updateMap(mapData.lng, mapData.lat);
    }

</script>

<input  class="input"
        name="store_x"
        type="number"
        step="0.000001"
        bind:value={mapData.lng}
        on:change={update_map_display}
        required
        hidden
        />

<input  class="input"
        name="store_y"
        type="number"
        step="0.000001"
        bind:value={mapData.lat}
        on:change={update_map_display}
        required
        hidden
        />

<div class="my-5">
    {#if isExternalMapData}
        <MapComponent
            initialLng={mapData.lng}
            initialLat={mapData.lat}
            bind:mapData={mapData}
            bind:updateMap={updateMap}
        />
    {:else}
        <MapComponent 
            bind:mapData={mapData}
            bind:updateMap={updateMap}
        />
    {/if}
    {#if debugMode}
        <p>LNG: {mapData.lng} | LAT: {mapData.lat} | ZOOM: {mapData.zoom.toFixed(2)}</p>
    {/if}
</div>