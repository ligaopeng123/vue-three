import * as THREE from 'three'
export const destroyThree = (scene: THREE.Scene, renderer: THREE.WebGLRenderer, animationID: number) => {
  try {
    scene.traverse((child: any) => {
      if (child.material) {
        child.material.dispose()
      }
      if (child.geometry) {
        child.geometry.dispose()
      }
      child = null
    })
    scene.clear()
    renderer.dispose()
    renderer.forceContextLoss()
    //@ts-ignore
    renderer = null
    // 去除animationFrame
    cancelAnimationFrame(animationID)
    // let gl = renderer.domElement.getContext("webgl");
    // gl && gl.getExtension("WEBGL_lose_context").loseContext();
  } catch (e) {
    console.log(e)
  }
}
