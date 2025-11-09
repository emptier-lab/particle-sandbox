# Particle Sandbox

An advanced interactive particle physics sandbox built with HTML5 Canvas and JavaScript. Create, manipulate, and experiment with thousands of particles in real-time with advanced physics simulation, building tools, and ragdoll physics.

## Features

### Spawn Modes
- **Click & Drag**: Spawn particles by clicking and dragging
- **Auto Spawn**: Automatically generates particles
- **Explosion**: Radial burst pattern
- **Fountain**: Upward particle stream
- **Spiral**: Spiral formation
- **Rain**: Falling particles

### Particle Shapes
- Circle
- Square
- Triangle
- Star
- Line

### Physics
- Gravity control
- Friction adjustment
- Wind forces (X and Y axis)
- Particle interactions
- Collision detection with bounce
- Mouse force interaction

### Field Forces
- **Magnetic Field**: Attracts particles to center
- **Vortex**: Creates swirling motion
- **Noise**: Random perturbation
- **Flocking**: Boid-like swarm behavior

### Visual Effects
- Particle trails with configurable length and opacity
- Connection lines between nearby particles
- Size variation
- Particle aging (size and color over lifetime)
- Blend modes (Normal, Screen, Multiply, Overlay, Lighten, Darken)
- Velocity visualization

### Color Modes
- Single color
- Random colors
- Gradient (HSL)
- Rainbow
- Age-based colors
- Velocity-based colors
- Custom color picker

### VHS / Retro Effects
- VHS Mode with scanlines
- Chromatic aberration
- Film grain
- VHS tracking
- Static noise
- Color bleed
- CRT curvature
- VHS glitch effects
- Pixelation (1-bit, 2-bit, 4-bit, 8-bit, 16-bit)

### Environments
- **Void**: Dark space with energy particles
- **Earth**: Sunrise atmosphere with static clouds
- **Space**: Nebulas, planets, and asteroids
- **Moon**: Cratered lunar surface
- **Mars**: Red planet with craters
- **White Room**: Minimalist white grid space
- **Green Room**: Pulsing green patterns

### Gravitational Waves
- Multiple black holes with accretion disks
- Gravitational wave visualization
- Adjustable black hole strength and event horizon size
- Particle interaction with black holes

### Building Toolbox
- **Block Types**: Square, Rectangle, Circle, Triangle, Hexagon, Star
- **Conveyor Belts**: Move blocks and ragdolls in any direction
- **Grid Snapping**: Precise block placement
- **Block Physics**: Enable gravity and collisions for blocks
- **Breakable Blocks**: Blocks with health that can be destroyed
- **Block Colors**: Customizable block appearance

### Ragdoll Physics
- **Full Body Physics**: 10-part ragdoll with head, torso, arms, and legs
- **Realistic Joints**: Connected body parts with physics constraints
- **Grab & Throw**: Click and drag ragdolls to interact
- **Collision Detection**: Full collision with blocks, particles, and other ragdolls
- **Conveyor Interaction**: Ragdolls respond to conveyor belt forces
- **Pixelated Style**: Minimalist blocky appearance

### Weather Effects
- **Tornado**: Spinning vortex that pulls particles
- **Tsunami**: Horizontal wave forces
- **Volcano**: Upward eruption forces
- **Thunder**: Lightning strikes with screen shake
- **Rain**: Falling rain particles
- **Snow**: Gentle snow particles
- **Hurricane**: Large rotating storm
- **Earthquake**: Screen shake effect

### Advanced Features
- Emitter system (Mouse, Center, Random positions)
- Save/Load configurations (JSON)
- Export images (PNG)
- Performance controls (max particles: 100-50,000)
- Real-time FPS counter
- Dev mode for advanced debugging

### Presets
- Fireworks: Explosive particle effects
- Galaxy: Spiral galaxy formation
- Plasma: Colorful plasma effects
- Vortex: Swirling vortex pattern
- Flocking: Swarm behavior simulation
- Magnetic: Magnetic field effects
- Chaos: High-energy chaotic system
- Nebula: Cosmic cloud effects
- Stars: Starfield simulation
- Smoke: Wispy smoke particles
- Bubbles: Floating bubble effects
- Sparkles: Sparkling particles
- Aurora: Northern lights effect
- Energy: Electric energy fields

## Usage

1. Open `index.html` in a modern web browser
2. Use the control panel on the left to adjust settings
3. Click and drag to spawn particles
4. Right-click to repel particles
5. Middle-click to attract particles
6. Enable Building Mode to place blocks and conveyors
7. Spawn ragdolls and interact with them by clicking and dragging
8. Try different presets for quick setups
9. Save your favorite configurations

## Controls

- **Left Click**: Spawn particles / Place blocks (in building mode) / Grab ragdolls
- **Drag**: Create particle trails / Drag ragdolls
- **Right Click**: Repel particles
- **Middle Click**: Attract particles

## Project Structure

```
particle/
├── index.html          # Main HTML file
├── css/
│   └── styles.css     # All CSS styles
└── js/
    └── main.js        # All JavaScript code
```

## Browser Compatibility

Works in all modern browsers that support HTML5 Canvas:
- Chrome
- Firefox
- Safari
- Edge

## Performance

The sandbox is optimized to handle thousands of particles while maintaining smooth frame rates. Adjust the "Max Particles" setting to balance visual complexity with performance on your system.

**Note**: This application is computationally intensive and may not run well on low-end PCs. High particle counts, weather effects, and VHS filters can cause significant performance issues.

## License

Free to use.

## Credits

Created by empty? / emptyforce
