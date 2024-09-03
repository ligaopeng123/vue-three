<template>
  <div ref="container"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { destroyThree } from '@/utils/destoryThree'

const container = ref(null)

let scene, camera, renderer, controls, animationId

// 渲染循环
const animate = () => {
  animationId = requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

const init = () => {
  // 场景和相机
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  // 使用 BufferGeometry 创建自定义 BOX
  const vertices = new Float32Array([
    -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5,
    0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5
  ])

  const indices = new Uint16Array([
    0, 1, 2, 2, 3, 0, 4, 5, 6, 6, 7, 4, 0, 1, 5, 5, 4, 0, 2, 3, 7, 7, 6, 2, 0, 3, 7, 7, 4, 0, 1, 2,
    6, 6, 5, 1
  ])

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  geometry.setIndex(new THREE.BufferAttribute(indices, 1))

  const material = new THREE.MeshStandardMaterial({ color: 0x0077ff })
  const box = new THREE.Mesh(geometry, material)

  // 创建边框
  const edges = new THREE.EdgesGeometry(geometry)
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
  const wireframe = new THREE.LineSegments(edges, lineMaterial)
  box.add(wireframe)

  scene.add(box)

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0x404040) // 环境光
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(1, 1, 1).normalize()
  scene.add(directionalLight)

  // 控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableRotate = true // 启用旋转
  controls.enableZoom = true // 启用缩放
  controls.enablePan = true // 启用平移
  controls.target.set(0, 0, 0) // 目标为模型中心
  controls.update()

  animate()

  // 窗口调整时更新渲染器
  window.addEventListener('resize', () => {
    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  })
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  destroyThree(scene, renderer, animationId)
})
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
