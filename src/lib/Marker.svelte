<script lang="ts">
    import { PUBLIC_MAPBOX_KEY } from '$env/static/public'
    import { onMount, onDestroy } from "svelte";
    import mapboxgl from "mapbox-gl";
	import { browser } from "$app/environment";

    let markerContainer: HTMLElement;

    const marker = new mapboxgl.Marker({
        lng: mapData.lng,
        lat: mapData.lat,
    });

    const map = getContext(mapboxgl.context.mapKey).getMap();
    marker.addto(map);

    onDestroy(() => {
        if (browser) marker.remove();
    });
</script>

<link href='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css' rel='stylesheet' />

<style>
    .marker {
        background-image: url('https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png');
        background-size: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }
</style>

<div class="marker-wrap">
    <div class="marker" bind:this={markerContainer} />
</div>
