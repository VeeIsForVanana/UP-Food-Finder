<script lang="ts">
    import { PUBLIC_MAPBOX_KEY } from '$env/static/public'
    import { onMount, onDestroy } from "svelte";
    import mapboxgl from "mapbox-gl";
	import { browser } from "$app/environment";

    let map: mapboxgl.Map;
    let mapContainer: HTMLElement;
    let lng: number, lat: number, zoom: number;

    lng = -71.224518;
    lat = 42.213995;
    zoom = 9;

    function updateData() {
        zoom = map.getZoom();
        lng = map.getCenter().lng;
        lat = map.getCenter().lat;
    }

    onMount(() => {
        const initialState = { lng: lng, lat: lat, zoom: zoom };
        mapboxgl.accessToken = PUBLIC_MAPBOX_KEY

        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v12', 
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
        });

        map.on('move', () => {
            updateData();
        })
    });

    onDestroy(() => {
        if (browser) map.remove();
    });
</script>

<link href='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css' rel='stylesheet' />

<style>
    .map {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>

<div class="map-wrap">
    <div class="map" bind:this={mapContainer} />
</div>