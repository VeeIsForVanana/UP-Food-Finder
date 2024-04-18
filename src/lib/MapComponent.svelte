<script lang="ts">
    import { PUBLIC_MAPBOX_KEY } from '$env/static/public'
    import { onMount, onDestroy } from "svelte";
    import mapboxgl from "mapbox-gl";
	import { browser } from "$app/environment";

    export let showSidebar = false;
    export const mapData = {lng: 0, lat: 0, zoom: 0};
    
    let map: mapboxgl.Map;
    let marker: mapboxgl.Marker;
    let mapContainer: HTMLElement;
    
    mapData.lng = 121.063439;
    mapData.lat = 14.654888;
    mapData.zoom = 14.75;

    function updateData() {
        mapData.zoom = map.getZoom();
        mapData.lng = map.getCenter().lng.toFixed(6);
        mapData.lat = map.getCenter().lat.toFixed(6);
    }

    onMount(() => {
        const initialState = mapData;
        mapboxgl.accessToken = PUBLIC_MAPBOX_KEY

        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v12', 
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
        });

        marker = new mapboxgl.Marker().setLngLat([mapData.lng, mapData.lat]).addTo(map);

        map.on('move', () => {
            updateData();
            setMarker();
        })

        function setMarker() {
            marker.setLngLat([mapData.lng, mapData.lat]);
        }
    });

    onDestroy(() => {
        if (browser) map.remove();
    });
</script>

<link href='https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css' rel='stylesheet' />

<style>
    .map {
        position: relative;
        width: 600px;
        height: 300px;
        border: 2px dashed black;
    }
</style>


{#if showSidebar}
    <div class="sidebar">
        Longitude: {mapData.lng.toFixed(4)} | Latitude: {mapData.lat.toFixed(4)} | Zoom: {mapData.zoom.toFixed(2)}
    </div>
{/if}

<div class="map-wrap">
    <div class="map" bind:this={mapContainer} />
</div>
