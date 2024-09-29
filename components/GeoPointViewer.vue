<template>
  <div
    class="geo-point-viewer-wrap"
    :class="{
      'is-fullscreen': isFullscreen,
    }"
  >
    <div class="geo-point-viewer">
      <div ref="mapRef" class="map-element" />
      <v-btn
        v-if="isFullscreen"
        class="close-button"
        variant="flat"
        icon="mdi-close"
        @click.stop="isFullscreen = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'

const L = await import('leaflet')
if (import.meta.server) {
  throw createError({ statusCode: 500, statusMessage: 'Not for ssr' })
}
interface GeoJsonPoint {
  type: 'Point'
  coordinates: [number, number]
}
const props = defineProps<{
  geoJson: GeoJsonPoint
}>()

const route = useRoute()
const router = useRouter()

const mapRef = ref<HTMLElement>()
const fullscreenedBody = ref(false)
const isFullscreen = computed({
  get () {
    return route.hash === '#mapFullscreen'
  },
  set (value: boolean) {
    if (value) {
      router.push({
        query: route.query,
        hash: '#mapFullscreen',
      })
    } else {
      router.back()
    }
  }
})

let nrMap = null as ReturnType<typeof L.map>
let nrZoom = null as ReturnType<typeof L.control.zoom>
let nrScale = null as ReturnType<typeof L.control.scale>
let nrMarker = null as ReturnType<typeof L.marker>
let nrResizeObserver = null as ResizeObserver | null
const defaultZoom = 3

const initMap = () => {
  if (!mapRef.value) {
    return
  }
  nrMap = L.map(mapRef.value, {
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    zoomControl: false,
    attributionControl: false,
  })
  nrZoom = L.control.zoom({ position: 'topleft' })
  nrScale = L.control.scale()

  L.tileLayer('https://tile2.maps.2gis.com/tiles?x={x}&y={y}&z={z}', {
    maxZoom: 18,
  }).addTo(nrMap)
  nrMap.on('click', () => {
    if (!isFullscreen.value) {
      isFullscreen.value = true
    }
  })
  initPoint()
  nrResizeObserver = new ResizeObserver(() => {
    if (nrMap) {
      nrMap.invalidateSize()
    }
  })
  nrResizeObserver.observe(mapRef.value)
}

const icon = L.icon({
  iconUrl: '/marker.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [20, 30],
  iconAnchor: [18, 18],
  shadowSize: [0, 0],
  shadowAnchor: [10, 10],
})
const initPoint = () => {
  if (!nrMap || props.geoJson?.type !== 'Point') {
    return false
  }
  if (nrMarker) {
    nrMarker.remove()
  }
  const coordinates = props.geoJson.coordinates
  nrMap.setView([coordinates[1], coordinates[0]], defaultZoom)
  nrMarker = L.marker([coordinates[1], coordinates[0]], { icon }).addTo(nrMap)
  return true
}
const goHome = () => {
  if (nrMap && props.geoJson?.type === 'Point') {
    nrMap.setView([props.geoJson.coordinates[1], props.geoJson.coordinates[0]], defaultZoom)
  }
}

onMounted(() => {
  nextTick(() => initMap())
})
onUnmounted(() => {
  if (nrMap) {
    nrMap.eachLayer((layer) => nrMap?.removeLayer(layer))
    nrMap.off()
    nrMap.remove()
    nrMap = null
  }
  if (nrResizeObserver) {
    nrResizeObserver.disconnect()
  }
})

watch(() => props.geoJson, (value, oldValue) => {
  if (JSON.stringify(value) === JSON.stringify(oldValue)) {
    return
  }
  if (value?.type !== 'Point') {
    if (nrMarker) {
      nrMarker.remove()
      nrMarker = null
    }
    return
  }
  const coordinates = value.coordinates
  if (!nrMarker) {
    nrMarker = L.marker([coordinates[1], coordinates[0]], { icon }).addTo(nrMap)
  } else {
    nrMarker.setLatLng([coordinates[1], coordinates[0]])
  }
  nrMap.setView([coordinates[1], coordinates[0]], defaultZoom)
}, { deep: true })

watch(isFullscreen, (value) => {
  if (value) {
    nrMap.dragging.enable()
    nrMap.touchZoom.enable()
    nrMap.scrollWheelZoom.enable()
    nrMap.doubleClickZoom.enable()
    nrMap.boxZoom.enable()
    nrZoom.addTo(nrMap)
    nrScale.addTo(nrMap)
    if (!document.body.classList.contains('fullscreen')) {
      fullscreenedBody.value = true
      document.body.classList.add('fullscreen')
    }
  } else {
    nrMap.dragging.disable()
    nrMap.touchZoom.disable()
    nrMap.scrollWheelZoom.disable()
    nrMap.doubleClickZoom.disable()
    nrMap.boxZoom.disable()
    nrMap.removeControl(nrZoom)
    nrMap.removeControl(nrScale)
    setTimeout(() => goHome(), 300)
    if (fullscreenedBody.value) {
      fullscreenedBody.value = false
      document.body.classList.remove('fullscreen')
    }
  }
})
</script>

<style lang="scss" scoped>
.geo-point-viewer-wrap {
  height: 200px;
  .geo-point-viewer {
    height: 100%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: 4px;
    .map-element {
      z-index: 1;
      height: 100%;
      width: 100%;
    }
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 3;
    }
  }
  &.is-fullscreen {
    .geo-point-viewer {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      float: none;
      width: 100%;
      height: 100%;
      margin: 0;
      z-index: 10000;
      border: none;
      border-radius: 0;
    }
  }
}
</style>
