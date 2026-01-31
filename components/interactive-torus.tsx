"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export function InteractiveTorus() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const isMobileRef = useRef(false)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      isMobileRef.current = mobile
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isClient || !containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    // scene.background = new THREE.Color(0xf0f0f0); // Optional: for debugging

    const camera = new THREE.PerspectiveCamera(
      35,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance" // Ensure GPU uses high perf mode
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(isMobileRef.current ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    containerRef.current.appendChild(renderer.domElement)

    // Environment for glossy reflections (Crucial for black metal)
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

    // Optimized Rounded Shape
    const shape = new THREE.Shape()
    const w = 0.8
    const h = 1.0
    const r = 0.4

    shape.moveTo(-w / 2, -h / 2 + r)
    shape.lineTo(-w / 2, h / 2 - r)
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2 + r, h / 2)
    shape.lineTo(w / 2 - r, h / 2)
    shape.quadraticCurveTo(w / 2, h / 2, w / 2, h / 2 - r)
    shape.lineTo(w / 2, -h / 2 + r)
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2 - r, -h / 2)
    shape.lineTo(-w / 2 + r, -h / 2)
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2, -h / 2 + r)

    const extrudeSettings = {
      steps: 1,
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: isMobileRef.current ? 2 : 4 // Reduced for performance
    }

    const segmentGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    segmentGeometry.center()

    // Premium Obsidian Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      metalness: 1.0,
      roughness: 0.0,    // Perfect mirror
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      ior: 1.5,
      reflectivity: 1.0,
      envMapIntensity: 2.0, // Strong reflections
      side: THREE.DoubleSide
    })

    const count = isMobileRef.current ? 24 : 40 // Reduced count for mobile
    const radius = 2.5
    const mesh = new THREE.InstancedMesh(segmentGeometry, material, count)
    scene.add(mesh)

    const dummy = new THREE.Object3D()

    // Lighting - High Contrast
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 3)
    dirLight.position.set(5, 10, 7)
    scene.add(dirLight)

    const rimLight = new THREE.DirectionalLight(0x4c1d95, 2) // Purple rim
    rimLight.position.set(-5, 0, -5)
    scene.add(rimLight)

    // Animation
    let time = 0
    let animationFrameId: number

    // Smooth dampening for mouse movement
    let currentMouseX = 0
    let currentMouseY = 0

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      time += 0.015

      const mobileMode = isMobileRef.current

      if (mobileMode) {
        // Mobile: Steady "circling" motion
        // Removed X-axis tilt/wobble ("round movements")
        // Just a slow, steady rotation around the Z-axis (like a wheel) and slight Y for depth
        mesh.rotation.z += 0.002
        mesh.rotation.y = 0.5 // Fixed subtle angle for depth
        mesh.rotation.x = 0   // No tilting
      } else {
        // Desktop: Interactive mouse follow
        // 1. Smoothly interpolate current mouse position towards target
        currentMouseX += (mousePosition.current.x - currentMouseX) * 0.05
        currentMouseY += (mousePosition.current.y - currentMouseY) * 0.05

        // 2. Rotate entire ring based on smoothed mouse position
        mesh.rotation.x = currentMouseY * 0.5
        mesh.rotation.y = currentMouseX * 0.5

        // Add subtle constant "breathing" motion only on desktop
        mesh.rotation.z = time * 0.05
      }

      for (let i = 0; i < count; i++) {
        const t = i / count
        const angle = t * Math.PI * 2

        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const z = 0

        dummy.position.set(x, y, z)
        dummy.rotation.set(0, 0, 0)

        // 1. Orient
        dummy.rotation.z = angle

        // 2. Fan
        dummy.rotateY(Math.PI / 2)
        dummy.rotateX(0.7)

        // 3. Ripple
        const wave = Math.sin(time * 3 + angle * 4) * 0.15
        dummy.rotateZ(wave)

        // 4. Interaction - Reactive "Flaring"
        let proximity = 0

        if (!mobileMode) {
          // Calculate distance from this segment to the "mouse influence point" on the ring
          const mouseAngle = Math.atan2(currentMouseY, currentMouseX)
          let dist = Math.abs(angle - mouseAngle)
          if (dist > Math.PI) dist = 2 * Math.PI - dist

          proximity = Math.max(0, 1 - dist) * 1.5 * Math.min(1, Math.sqrt(currentMouseX ** 2 + currentMouseY ** 2) * 2)
        } else {
          // Mobile: consistent subtle wave without mouse interaction
          proximity = Math.sin(time * 2 + angle * 2) * 0.2 + 0.2
        }

        dummy.rotateX(proximity * 0.3)
        dummy.scale.setScalar(1 + proximity * 0.1)

        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      }

      mesh.instanceMatrix.needsUpdate = true
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    // Global mouse tracking for continuous smooth following
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileRef.current) return // Disable mouse tracking on mobile

      // Only track if mouse is over or near the container
      // For simplicity, we track global but could restrict to container bounds
      // The prompt asks for "hover on the element or a bit around of it"
      // We'll normalize based on window but verify target is the canvas or container

      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      // Check if mouse is near the container (e.g. within 100px)
      const buffer = 100
      if (
        e.clientX >= rect.left - buffer &&
        e.clientX <= rect.right + buffer &&
        e.clientY >= rect.top - buffer &&
        e.clientY <= rect.bottom + buffer
      ) {
        mousePosition.current = {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        }
      } else {
        // Return to center if mouse moves away
        mousePosition.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      segmentGeometry.dispose()
      material.dispose()
      pmremGenerator.dispose()
      renderer.dispose()
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [isClient])

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${isMobile ? '' : 'md:min-h-[500px]'}`} // Allow explicit height on mobile, keep desktop default
      style={{ touchAction: 'none' }}
    />
  )
}
