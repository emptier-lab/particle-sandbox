        let particles = [];
        let vhsCanvas = null;
        let vhsCtx = null;
        let mouseDown = false;
        let rightMouseDown = false;
        let middleMouseDown = false;
        let mouseX = 0;
        let mouseY = 0;
        let particleSize = 3;
        let gravity = 0.1;
        let friction = 0.99;
        let interactionForce = 0.5;
        let connectionDistance = 100;
        let physicsEnabled = true;
        let connectionsEnabled = true;
        let currentColor = '#4a9eff';
        let mode = 'click';
        let particleCount = 20;
        let autoSpawnTimer = 0;
        let speed = 1.0;
        let lifetime = 100;
        let trailLength = 5;
        let trailOpacity = 0.3;
        let mouseForce = 1.0;
        let backgroundMode = 'dark';
        let currentMap = 'void';
        let lastTime = performance.now();
        let fps = 60;
        let frameCount = 0;
        let fpsTimer = 0;
        let particleShape = 'circle';
        let sizeVariation = 50;
        let windX = 0;
        let windY = 0;
        let collisionsEnabled = false;
        let bounce = 0.8;
        let emitterMode = 'off';
        let emitRate = 5;
        let emitTimer = 0;
        let colorMode = 'single';
        let emitterX = 0;
        let emitterY = 0;
        let magneticField = 0;
        let vortexStrength = 0;
        let noiseAmount = 0;
        let flockingEnabled = false;
        let sizeOverLife = 'off';
        let colorOverLife = 'off';
        let blendMode = 'normal';
        let velocityViz = false;
        let maxParticles = 10000;
        let customColorInput = null;
        let attractors = [];
        let repellers = [];
        let gifFrames = [];
        let gifRecording = false;
        let gifFrameCount = 0;
        let vhsMode = false;
        let scanlinesIntensity = 0;
        let chromaticAberration = 0;
        let filmGrain = 0;
        let vhsTracking = 0;
        let staticNoise = 0;
        let colorBleed = 0;
        let crtCurvature = 0;
        let vhsGlitch = 0;
        let glitchTimer = 0;
        let pixelation = 'off';
        let pixelSize = 4;
        let gravWavesEnabled = false;
        let blackHoleCount = 3;
        let blackHoleStrength = 50;
        let eventHorizonSize = 30;
        let waveIntensity = 5;
        let blackHoles = [];
        let buildingMode = false;
        let selectedBlockType = 'square';
        let blockSize = 30;
        let blockColor = '#4a9eff';
        let snapToGrid = true;
        let gridSize = 20;
        let placedBlocks = [];
        let lastBlockPlaceTime = 0;
        let blockPhysicsEnabled = false;
        let blockMaterial = 'solid';
        let conveyorSpeed = 2.0;
        let conveyorDirection = 'right';
        let conveyors = [];
        let ragdolls = [];
        let devMode = false;
        let tornadoEnabled = false;
        let tornadoStrength = 5.0;
        let tornadoSpeed = 2.0;
        let tornadoSize = 150;
        let tornado = null;
        let tsunamiEnabled = false;
        let tsunamiStrength = 3.0;
        let tsunamiSpeed = 2.0;
        let tsunamiSize = 150;
        let tsunamiWaves = [];
        let volcanoEnabled = false;
        let volcanoIntensity = 5.0;
        let volcanoSpeed = 1.0;
        let volcanoSize = 200;
        let volcano = null;
        let thunderEnabled = false;
        let thunderFreq = 2.0;
        let thunderStrength = 5.0;
        let thunderSize = 100;
        let thunderTimer = 0;
        let lightningStrikes = [];
        let thunderFlash = 0;
        let thunderShake = { x: 0, y: 0 };
        let rainEnabled = false;
        let rainIntensity = 3.0;
        let rainSpeed = 3.0;
        let rainSize = 15;
        let rainDrops = [];
        let snowEnabled = false;
        let snowIntensity = 2.0;
        let snowSpeed = 1.0;
        let snowSize = 3;
        let snowFlakes = [];
        let hurricaneEnabled = false;
        let hurricaneStrength = 6.0;
        let hurricaneSpeed = 0.5;
        let hurricaneSize = 300;
        let hurricane = null;
        let earthquakeEnabled = false;
        let earthquakeIntensity = 3.0;
        let earthquakeSpeed = 1.0;
        let earthquakeRange = 100;
        let earthquakeTimer = 0;
        let earthquakeShake = { x: 0, y: 0 };

        let applicationStarted = false;

        // Initialize canvas
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        vhsCanvas = document.createElement('canvas');
        vhsCtx = vhsCanvas.getContext('2d');

        function startApplication() {
            const startScreen = document.getElementById('startScreen');
            const canvas = document.getElementById('canvas');
            const controls = document.getElementById('controlsPanel');
            
            localStorage.setItem('particleSandbox_warningSeen', 'true');
            
            startScreen.classList.add('hidden');
            canvas.classList.remove('canvas-hidden');
            controls.classList.remove('controls-hidden');
            
            applicationStarted = true;
            
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            vhsCanvas.width = canvas.width;
            vhsCanvas.height = canvas.height;
            
            animate(performance.now());
        }
        
        window.startApplication = startApplication;

        function checkWarningSeen() {
            const warningSeen = localStorage.getItem('particleSandbox_warningSeen');
            if (warningSeen === 'true') {
                const startScreen = document.getElementById('startScreen');
                const canvas = document.getElementById('canvas');
                const controls = document.getElementById('controlsPanel');
                
                startScreen.classList.add('hidden');
                canvas.classList.remove('canvas-hidden');
                controls.classList.remove('controls-hidden');
                
                applicationStarted = true;
                
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                vhsCanvas.width = canvas.width;
                vhsCanvas.height = canvas.height;
                
                animate(performance.now());
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            checkWarningSeen();
        });

        const colors = [
            '#4a9eff', '#ff4a9e', '#4aff9e', '#ffff4a', 
            '#ff4a4a', '#9e4aff', '#ffffff', '#ff9e4a',
            '#00ff88', '#ff0088', '#8800ff', '#ff8800'
        ];
        
        const palette = document.getElementById('colorPalette');
        colors.forEach((color, index) => {
            const btn = document.createElement('div');
            btn.className = 'color-btn' + (index === 0 ? ' active' : '');
            btn.style.background = color;
            btn.onclick = () => {
                currentColor = color;
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
            palette.appendChild(btn);
        });

        function updateStats() {
            document.getElementById('stats').textContent = `${particles.length} particles | ${Math.round(fps)} FPS`;
        }

        function syncInputs(rangeId, inputId, updateFunc) {
            const range = document.getElementById(rangeId);
            const input = document.getElementById(inputId);
            if (range && input) {
                range.oninput = (e) => {
                    input.value = e.target.value;
                    updateFunc(e.target.value);
                };
                input.oninput = (e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val)) {
                        range.value = val;
                        updateFunc(val);
                    }
                };
            }
        }

        syncInputs('size', 'sizeInput', (val) => {
            particleSize = parseInt(val);
            document.getElementById('sizeValue').textContent = particleSize;
        });

        syncInputs('gravity', 'gravityInput', (val) => {
            gravity = parseFloat(val);
            document.getElementById('gravityValue').textContent = gravity.toFixed(2);
        });

        syncInputs('friction', 'frictionInput', (val) => {
            friction = parseFloat(val);
            document.getElementById('frictionValue').textContent = friction.toFixed(2);
        });

        syncInputs('interaction', 'interactionInput', (val) => {
            interactionForce = parseFloat(val);
            document.getElementById('interactionValue').textContent = interactionForce.toFixed(1);
        });

        syncInputs('distance', 'distanceInput', (val) => {
            connectionDistance = parseInt(val);
            document.getElementById('distanceValue').textContent = connectionDistance;
        });

        syncInputs('count', 'countInput', (val) => {
            particleCount = parseInt(val);
            document.getElementById('countValue').textContent = particleCount;
        });

        syncInputs('speed', 'speedInput', (val) => {
            speed = parseFloat(val);
            document.getElementById('speedValue').textContent = speed.toFixed(1);
        });

        syncInputs('lifetime', 'lifetimeInput', (val) => {
            lifetime = parseInt(val);
            document.getElementById('lifetimeValue').textContent = lifetime + '%';
        });

        syncInputs('trail', 'trailInput', (val) => {
            trailLength = parseInt(val);
            document.getElementById('trailValue').textContent = trailLength;
        });

        syncInputs('trailOpacity', 'trailOpacityInput', (val) => {
            trailOpacity = parseFloat(val);
            document.getElementById('trailOpacityValue').textContent = trailOpacity.toFixed(2);
        });

        syncInputs('mouseForce', 'mouseForceInput', (val) => {
            mouseForce = parseFloat(val);
            document.getElementById('mouseForceValue').textContent = mouseForce.toFixed(1);
        });

        document.getElementById('mode').onchange = (e) => {
            mode = e.target.value;
            document.getElementById('modeValue').textContent = e.target.options[e.target.selectedIndex].text;
        };

        document.getElementById('mapSelector').onchange = (e) => {
            currentMap = e.target.value;
            document.getElementById('mapValue').textContent = e.target.options[e.target.selectedIndex].text;
            switchMap(currentMap);
        };

        document.getElementById('shape').onchange = (e) => {
            particleShape = e.target.value;
            document.getElementById('shapeValue').textContent = e.target.options[e.target.selectedIndex].text;
        };

        syncInputs('sizeVar', 'sizeVarInput', (val) => {
            sizeVariation = parseInt(val);
            document.getElementById('sizeVarValue').textContent = sizeVariation + '%';
        });

        syncInputs('windX', 'windXInput', (val) => {
            windX = parseFloat(val);
            document.getElementById('windXValue').textContent = windX.toFixed(1);
        });

        syncInputs('windY', 'windYInput', (val) => {
            windY = parseFloat(val);
            document.getElementById('windYValue').textContent = windY.toFixed(1);
        });

        document.getElementById('collisions').onchange = (e) => {
            collisionsEnabled = e.target.value === 'on';
            document.getElementById('collisionValue').textContent = collisionsEnabled ? 'ON' : 'OFF';
        };

        syncInputs('bounce', 'bounceInput', (val) => {
            bounce = parseFloat(val);
            document.getElementById('bounceValue').textContent = bounce.toFixed(1);
        });

        document.getElementById('emitter').onchange = (e) => {
            emitterMode = e.target.value;
            document.getElementById('emitterValue').textContent = e.target.options[e.target.selectedIndex].text.toUpperCase();
        };

        syncInputs('emitRate', 'emitRateInput', (val) => {
            emitRate = parseInt(val);
            document.getElementById('emitRateValue').textContent = emitRate;
        });

        document.getElementById('colorMode').onchange = (e) => {
            colorMode = e.target.value;
            document.getElementById('colorModeValue').textContent = e.target.options[e.target.selectedIndex].text;
        };

        document.getElementById('customColor').oninput = (e) => {
            currentColor = e.target.value;
            document.querySelectorAll('.color-btn').forEach(b => {
                if (b.style.background === currentColor) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
        };

        syncInputs('magnetic', 'magneticInput', (val) => {
            magneticField = parseFloat(val);
            document.getElementById('magneticValue').textContent = magneticField.toFixed(1);
        });

        syncInputs('vortex', 'vortexInput', (val) => {
            vortexStrength = parseFloat(val);
            document.getElementById('vortexValue').textContent = vortexStrength.toFixed(1);
        });

        syncInputs('noise', 'noiseInput', (val) => {
            noiseAmount = parseFloat(val);
            document.getElementById('noiseValue').textContent = noiseAmount.toFixed(1);
        });

        document.getElementById('flocking').onchange = (e) => {
            flockingEnabled = e.target.value === 'on';
            document.getElementById('flockingValue').textContent = flockingEnabled ? 'ON' : 'OFF';
        };

        document.getElementById('sizeOverLife').onchange = (e) => {
            sizeOverLife = e.target.value;
            document.getElementById('sizeOverLifeValue').textContent = e.target.options[e.target.selectedIndex].text;
        };

        document.getElementById('colorOverLife').onchange = (e) => {
            colorOverLife = e.target.value;
            document.getElementById('colorOverLifeValue').textContent = e.target.options[e.target.selectedIndex].text;
        };

        document.getElementById('blendMode').onchange = (e) => {
            blendMode = e.target.value;
            document.getElementById('blendValue').textContent = e.target.options[e.target.selectedIndex].text;
            ctx.globalCompositeOperation = blendMode;
        };

        document.getElementById('velocityViz').onchange = (e) => {
            velocityViz = e.target.value === 'on';
            document.getElementById('velocityVizValue').textContent = velocityViz ? 'ON' : 'OFF';
        };

        syncInputs('maxParticles', 'maxParticlesInput', (val) => {
            maxParticles = parseInt(val);
            document.getElementById('maxParticlesValue').textContent = maxParticles === Infinity ? 'UNLIMITED' : maxParticles;
        });

        document.getElementById('vhsMode').onchange = (e) => {
            vhsMode = e.target.value === 'on';
            document.getElementById('vhsModeValue').textContent = vhsMode ? 'ON' : 'OFF';
        };

        syncInputs('scanlines', 'scanlinesInput', (val) => {
            scanlinesIntensity = parseInt(val);
            document.getElementById('scanlinesValue').textContent = scanlinesIntensity + '%';
        });

        syncInputs('chromatic', 'chromaticInput', (val) => {
            chromaticAberration = parseFloat(val);
            document.getElementById('chromaticValue').textContent = chromaticAberration.toFixed(1);
        });

        syncInputs('grain', 'grainInput', (val) => {
            filmGrain = parseInt(val);
            document.getElementById('grainValue').textContent = filmGrain + '%';
        });

        syncInputs('tracking', 'trackingInput', (val) => {
            vhsTracking = parseInt(val);
            document.getElementById('trackingValue').textContent = vhsTracking + '%';
        });

        syncInputs('static', 'staticInput', (val) => {
            staticNoise = parseInt(val);
            document.getElementById('staticValue').textContent = staticNoise + '%';
        });

        syncInputs('bleed', 'bleedInput', (val) => {
            colorBleed = parseInt(val);
            document.getElementById('bleedValue').textContent = colorBleed + '%';
        });

        syncInputs('curvature', 'curvatureInput', (val) => {
            crtCurvature = parseInt(val);
            document.getElementById('curvatureValue').textContent = crtCurvature + '%';
        });

        syncInputs('glitch', 'glitchInput', (val) => {
            vhsGlitch = parseInt(val);
            document.getElementById('glitchValue').textContent = vhsGlitch + '%';
        });

        document.getElementById('pixelation').onchange = (e) => {
            pixelation = e.target.value;
            document.getElementById('pixelationValue').textContent = pixelation === 'off' ? 'OFF' : pixelation + '-bit';
        };

        syncInputs('pixelSize', 'pixelSizeInput', (val) => {
            pixelSize = parseInt(val);
            document.getElementById('pixelSizeValue').textContent = pixelSize;
        });

        document.getElementById('gravWavesEnabled').onchange = (e) => {
            gravWavesEnabled = e.target.value === 'on';
            document.getElementById('gravWavesEnabledValue').textContent = gravWavesEnabled ? 'ON' : 'OFF';
            if (gravWavesEnabled && blackHoles.length === 0) {
                initializeBlackHoles();
            } else if (!gravWavesEnabled) {
                blackHoles = [];
            }
        };

        syncInputs('blackHoleCount', 'blackHoleCountInput', (val) => {
            blackHoleCount = parseInt(val);
            document.getElementById('blackHoleCountValue').textContent = blackHoleCount;
            if (gravWavesEnabled) {
                initializeBlackHoles();
            }
        });

        syncInputs('blackHoleStrength', 'blackHoleStrengthInput', (val) => {
            blackHoleStrength = parseFloat(val);
            document.getElementById('blackHoleStrengthValue').textContent = blackHoleStrength.toFixed(1);
        });

        syncInputs('eventHorizonSize', 'eventHorizonSizeInput', (val) => {
            eventHorizonSize = parseInt(val);
            document.getElementById('eventHorizonSizeValue').textContent = eventHorizonSize;
        });

        syncInputs('waveIntensity', 'waveIntensityInput', (val) => {
            waveIntensity = parseFloat(val);
            document.getElementById('waveIntensityValue').textContent = waveIntensity.toFixed(1);
        });

        function initializeBlackHoles() {
            blackHoles = [];
            for (let i = 0; i < blackHoleCount; i++) {
                blackHoles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    rotation: 0
                });
            }
        }

        document.getElementById('buildingMode').onchange = (e) => {
            buildingMode = e.target.value === 'on';
            document.getElementById('buildingModeValue').textContent = buildingMode ? 'ON' : 'OFF';
        };

        document.getElementById('blockType').onchange = (e) => {
            selectedBlockType = e.target.value;
            document.getElementById('selectedBlockValue').textContent = e.target.options[e.target.selectedIndex].text;
        };

        syncInputs('blockSize', 'blockSizeInput', (val) => {
            blockSize = parseInt(val);
            document.getElementById('blockSizeValue').textContent = blockSize;
        });

        document.getElementById('blockColorPicker').oninput = (e) => {
            blockColor = e.target.value;
            document.getElementById('blockColorValue').textContent = blockColor;
        };

        document.getElementById('snapToGrid').onchange = (e) => {
            snapToGrid = e.target.value === 'on';
            document.getElementById('snapToGridValue').textContent = snapToGrid ? 'ON' : 'OFF';
        };

        syncInputs('gridSize', 'gridSizeInput', (val) => {
            gridSize = parseInt(val);
            document.getElementById('gridSizeValue').textContent = gridSize;
        });

        document.getElementById('blockPhysics').onchange = (e) => {
            blockPhysicsEnabled = e.target.value === 'on';
            document.getElementById('blockPhysicsValue').textContent = blockPhysicsEnabled ? 'ON' : 'OFF';
            placedBlocks.forEach(block => {
                if (!block.vx) block.vx = 0;
                if (!block.vy) block.vy = 0;
                if (!block.rotation) block.rotation = 0;
                if (!block.angularVelocity) block.angularVelocity = 0;
            });
        };

        document.getElementById('blockMaterial').onchange = (e) => {
            blockMaterial = e.target.value;
            document.getElementById('blockMaterialValue').textContent = e.target.options[e.target.selectedIndex].text;
        };

        syncInputs('conveyorSpeed', 'conveyorSpeedInput', (val) => {
            conveyorSpeed = parseFloat(val);
            document.getElementById('conveyorSpeedValue').textContent = conveyorSpeed.toFixed(1);
        });

        document.getElementById('conveyorDirection').onchange = function(e) {
            conveyorDirection = e.target.value;
            document.getElementById('conveyorDirectionValue').textContent = e.target.options[e.target.selectedIndex].text;
        };

        let grabbedRagdollPart = null;
        let grabOffsetX = 0;
        let grabOffsetY = 0;
        let lastMouseX = 0;
        let lastMouseY = 0;

        function spawnRagdoll() {
            const ragdoll = {
                parts: [],
                joints: [],
                id: Date.now() + Math.random()
            };
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            const head = {
                x: centerX,
                y: centerY - 45,
                radius: 14,
                vx: 0,
                vy: 0,
                mass: 1.2,
                type: 'head',
                ragdollId: ragdoll.id
            };
            
            const torso = {
                x: centerX,
                y: centerY - 5,
                width: 28,
                height: 42,
                vx: 0,
                vy: 0,
                rotation: 0,
                angularVelocity: 0,
                mass: 2.5,
                type: 'torso',
                ragdollId: ragdoll.id
            };
            
            const leftUpperArm = {
                x: centerX - 22,
                y: centerY - 3,
                width: 7,
                height: 22,
                vx: 0,
                vy: 0,
                rotation: 0.3,
                angularVelocity: 0,
                mass: 0.7,
                type: 'upperArm',
                side: 'left',
                ragdollId: ragdoll.id
            };
            
            const leftLowerArm = {
                x: centerX - 22,
                y: centerY + 20,
                width: 6,
                height: 20,
                vx: 0,
                vy: 0,
                rotation: 0,
                angularVelocity: 0,
                mass: 0.5,
                type: 'lowerArm',
                side: 'left',
                ragdollId: ragdoll.id
            };
            
            const rightUpperArm = {
                x: centerX + 22,
                y: centerY - 3,
                width: 7,
                height: 22,
                vx: 0,
                vy: 0,
                rotation: -0.3,
                angularVelocity: 0,
                mass: 0.7,
                type: 'upperArm',
                side: 'right',
                ragdollId: ragdoll.id
            };
            
            const rightLowerArm = {
                x: centerX + 22,
                y: centerY + 20,
                width: 6,
                height: 20,
                vx: 0,
                vy: 0,
                rotation: 0,
                angularVelocity: 0,
                mass: 0.5,
                type: 'lowerArm',
                side: 'right',
                ragdollId: ragdoll.id
            };
            
            const leftUpperLeg = {
                x: centerX - 9,
                y: centerY + 35,
                width: 9,
                height: 24,
                vx: 0,
                vy: 0,
                rotation: 0,
                angularVelocity: 0,
                mass: 1.0,
                type: 'upperLeg',
                side: 'left',
                ragdollId: ragdoll.id
            };
            
            const leftLowerLeg = {
                x: centerX - 9,
                y: centerY + 60,
                width: 7,
                height: 22,
                vx: 0,
                vy: 0,
                rotation: 0,
                angularVelocity: 0,
                mass: 0.7,
                type: 'lowerLeg',
                side: 'left',
                ragdollId: ragdoll.id
            };
            
            const rightUpperLeg = {
                x: centerX + 9,
                y: centerY + 35,
                width: 9,
                height: 24,
                vx: 0,
                vy: 0,
                rotation: 0,
                angularVelocity: 0,
                mass: 1.0,
                type: 'upperLeg',
                side: 'right',
                ragdollId: ragdoll.id
            };
            
            const rightLowerLeg = {
                x: centerX + 9,
                y: centerY + 60,
                width: 7,
                height: 22,
                vx: 0,
                vy: 0,
                rotation: 0,
                angularVelocity: 0,
                mass: 0.7,
                type: 'lowerLeg',
                side: 'right',
                ragdollId: ragdoll.id
            };
            
            ragdoll.parts = [
                head, torso,
                leftUpperArm, leftLowerArm,
                rightUpperArm, rightLowerArm,
                leftUpperLeg, leftLowerLeg,
                rightUpperLeg, rightLowerLeg
            ];
            
            ragdoll.joints = [
                { part1: head, part2: torso, offset1: { x: 0, y: 14 }, offset2: { x: 0, y: -21 }, maxDist: 2, stiffness: 0.8 },
                { part1: torso, part2: leftUpperArm, offset1: { x: -14, y: -10 }, offset2: { x: 0, y: -11 }, maxDist: 2, stiffness: 0.7 },
                { part1: leftUpperArm, part2: leftLowerArm, offset1: { x: 0, y: 11 }, offset2: { x: 0, y: -10 }, maxDist: 2, stiffness: 0.7 },
                { part1: torso, part2: rightUpperArm, offset1: { x: 14, y: -10 }, offset2: { x: 0, y: -11 }, maxDist: 2, stiffness: 0.7 },
                { part1: rightUpperArm, part2: rightLowerArm, offset1: { x: 0, y: 11 }, offset2: { x: 0, y: -10 }, maxDist: 2, stiffness: 0.7 },
                { part1: torso, part2: leftUpperLeg, offset1: { x: -9, y: 21 }, offset2: { x: 0, y: -12 }, maxDist: 2, stiffness: 0.8 },
                { part1: leftUpperLeg, part2: leftLowerLeg, offset1: { x: 0, y: 12 }, offset2: { x: 0, y: -11 }, maxDist: 2, stiffness: 0.7 },
                { part1: torso, part2: rightUpperLeg, offset1: { x: 9, y: 21 }, offset2: { x: 0, y: -12 }, maxDist: 2, stiffness: 0.8 },
                { part1: rightUpperLeg, part2: rightLowerLeg, offset1: { x: 0, y: 12 }, offset2: { x: 0, y: -11 }, maxDist: 2, stiffness: 0.7 }
            ];
            
            ragdolls.push(ragdoll);
        }

        function getRagdollPartAt(x, y) {
            const hitParts = [];
            
            for (const ragdoll of ragdolls) {
                for (const part of ragdoll.parts) {
                    let hit = false;
                    let area = 0;
                    
                    if (part.type === 'head') {
                        const headWidth = part.radius * 1.6;
                        const headHeight = part.radius * 1.3;
                        const dx = x - part.x;
                        const dy = y - part.y;
                        
                        if (Math.abs(dx) < headWidth / 2 && Math.abs(dy) < headHeight / 2) {
                            hit = true;
                            area = headWidth * headHeight;
                        }
                    } else if (part.width && part.height) {
                        const cos = Math.cos(part.rotation || 0);
                        const sin = Math.sin(part.rotation || 0);
                        const dx = x - part.x;
                        const dy = y - part.y;
                        const localX = dx * cos + dy * sin;
                        const localY = -dx * sin + dy * cos;
                        
                        if (Math.abs(localX) < part.width / 2 && Math.abs(localY) < part.height / 2) {
                            hit = true;
                            area = part.width * part.height;
                        }
                    }
                    
                    if (hit) {
                        hitParts.push({ part, area });
                    }
                }
            }
            
            if (hitParts.length === 0) return null;
            
            hitParts.sort((a, b) => a.area - b.area);
            
            return hitParts[0].part;
        }

        function clearRagdolls() {
            ragdolls = [];
        }

        function clearAllBlocks() {
            placedBlocks = [];
        }

        function removeLastBlock() {
            if (placedBlocks.length > 0) {
                placedBlocks.pop();
            }
        }

        function placeBlock(x, y) {
            const now = Date.now();
            if (now - lastBlockPlaceTime < 50) return;
            lastBlockPlaceTime = now;
            
            let placeX = x;
            let placeY = y;
            
            if (snapToGrid) {
                placeX = Math.round(x / gridSize) * gridSize;
                placeY = Math.round(y / gridSize) * gridSize;
            }
            
            const existingBlock = placedBlocks.find(b => 
                Math.abs(b.x - placeX) < blockSize * 0.5 && 
                Math.abs(b.y - placeY) < blockSize * 0.5
            );
            
            if (!existingBlock) {
                if (selectedBlockType === 'conveyor') {
                    const existingConveyor = conveyors.find(c => 
                        Math.abs(c.x - placeX) < blockSize * 2 && 
                        Math.abs(c.y - placeY) < blockSize * 0.5
                    );
                    if (!existingConveyor) {
                        conveyors.push({
                            x: placeX,
                            y: placeY,
                            width: blockSize * 4,
                            height: blockSize * 0.8,
                            direction: conveyorDirection,
                            speed: conveyorSpeed
                        });
                    }
                } else {
                    const newBlock = {
                        type: selectedBlockType,
                        x: placeX,
                        y: placeY,
                        size: blockSize,
                        color: blockColor,
                        material: blockMaterial,
                        health: blockMaterial === 'breakable' ? 100 : Infinity,
                        vx: 0,
                        vy: 0,
                        rotation: 0,
                        angularVelocity: 0
                    };
                    placedBlocks.push(newBlock);
                }
            }
        }

        function drawBlock(block) {
            let blockColor = block.color;
            let opacity = 1;
            
            if (block.material === 'breakable' && block.health < Infinity) {
                opacity = Math.max(0.3, block.health / 100);
                const healthPercent = block.health / 100;
                if (healthPercent < 0.5) {
                    blockColor = `rgba(255, ${Math.floor(100 * healthPercent)}, 0, ${opacity})`;
                }
            }
            
            ctx.save();
            ctx.translate(block.x, block.y);
            if (block.rotation) {
                ctx.rotate(block.rotation);
            }
            ctx.globalAlpha = opacity;
            ctx.fillStyle = blockColor;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.lineWidth = 2;
            
            switch(block.type) {
                case 'square':
                    ctx.fillRect(-block.size / 2, -block.size / 2, block.size, block.size);
                    ctx.strokeRect(-block.size / 2, -block.size / 2, block.size, block.size);
                    break;
                case 'rectangle':
                    ctx.fillRect(-block.size / 2, -block.size / 3, block.size, block.size * 0.67);
                    ctx.strokeRect(-block.size / 2, -block.size / 3, block.size, block.size * 0.67);
                    break;
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(0, 0, block.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    break;
                case 'triangle':
                    ctx.beginPath();
                    ctx.moveTo(0, -block.size / 2);
                    ctx.lineTo(-block.size / 2, block.size / 2);
                    ctx.lineTo(block.size / 2, block.size / 2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    break;
                case 'hexagon':
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI / 3) * i;
                        const hx = (block.size / 2) * Math.cos(angle);
                        const hy = (block.size / 2) * Math.sin(angle);
                        if (i === 0) ctx.moveTo(hx, hy);
                        else ctx.lineTo(hx, hy);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    break;
                case 'star':
                    ctx.beginPath();
                    const spikes = 5;
                    const outerRadius = block.size / 2;
                    const innerRadius = outerRadius * 0.4;
                    for (let i = 0; i < spikes * 2; i++) {
                        const angle = (Math.PI / spikes) * i;
                        const radius = i % 2 === 0 ? outerRadius : innerRadius;
                        const sx = radius * Math.cos(angle - Math.PI / 2);
                        const sy = radius * Math.sin(angle - Math.PI / 2);
                        if (i === 0) ctx.moveTo(sx, sy);
                        else ctx.lineTo(sx, sy);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    break;
            }
            
            if (block.material === 'breakable' && block.health < 100 && block.health > 0) {
                const crackCount = Math.floor((100 - block.health) / 20);
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
                ctx.lineWidth = 1;
                for (let i = 0; i < crackCount; i++) {
                    ctx.beginPath();
                    ctx.moveTo((Math.random() - 0.5) * block.size * 0.5, (Math.random() - 0.5) * block.size * 0.5);
                    ctx.lineTo((Math.random() - 0.5) * block.size * 0.5, (Math.random() - 0.5) * block.size * 0.5);
                    ctx.stroke();
                }
            }
            
            ctx.restore();
        }

        function drawConveyor(conveyor) {
            ctx.fillStyle = 'rgba(60, 60, 60, 0.8)';
            ctx.fillRect(conveyor.x - conveyor.width / 2, conveyor.y - conveyor.height / 2, conveyor.width, conveyor.height);
            
            ctx.strokeStyle = 'rgba(100, 100, 100, 0.9)';
            ctx.lineWidth = 2;
            ctx.strokeRect(conveyor.x - conveyor.width / 2, conveyor.y - conveyor.height / 2, conveyor.width, conveyor.height);
            
            const time = Date.now() * 0.01;
            const stripeWidth = Math.max(10, conveyor.width * 0.1);
            ctx.fillStyle = 'rgba(80, 80, 80, 0.6)';
            
            let offset = (time * conveyor.speed * 10) % (stripeWidth * 2);
            if (conveyor.direction === 'left' || conveyor.direction === 'up') {
                offset = -offset;
            }
            
            if (conveyor.direction === 'right' || conveyor.direction === 'left') {
                for (let x = conveyor.x - conveyor.width / 2 - stripeWidth + offset; x < conveyor.x + conveyor.width / 2; x += stripeWidth * 2) {
                    ctx.fillRect(x, conveyor.y - conveyor.height / 2, stripeWidth, conveyor.height);
                }
            } else {
                for (let y = conveyor.y - conveyor.height / 2 - stripeWidth + offset; y < conveyor.y + conveyor.height / 2; y += stripeWidth * 2) {
                    ctx.fillRect(conveyor.x - conveyor.width / 2, y, conveyor.width, stripeWidth);
                }
            }
            
            const arrowSize = Math.min(conveyor.width, conveyor.height) * 0.3;
            const cx = conveyor.x;
            const cy = conveyor.y;
            
            ctx.fillStyle = 'rgba(200, 200, 200, 0.9)';
            ctx.beginPath();
            switch(conveyor.direction) {
                case 'right':
                    ctx.moveTo(cx + arrowSize, cy);
                    ctx.lineTo(cx - arrowSize / 2, cy - arrowSize / 2);
                    ctx.lineTo(cx - arrowSize / 2, cy + arrowSize / 2);
                    break;
                case 'left':
                    ctx.moveTo(cx - arrowSize, cy);
                    ctx.lineTo(cx + arrowSize / 2, cy - arrowSize / 2);
                    ctx.lineTo(cx + arrowSize / 2, cy + arrowSize / 2);
                    break;
                case 'up':
                    ctx.moveTo(cx, cy - arrowSize);
                    ctx.lineTo(cx - arrowSize / 2, cy + arrowSize / 2);
                    ctx.lineTo(cx + arrowSize / 2, cy + arrowSize / 2);
                    break;
                case 'down':
                    ctx.moveTo(cx, cy + arrowSize);
                    ctx.lineTo(cx - arrowSize / 2, cy - arrowSize / 2);
                    ctx.lineTo(cx + arrowSize / 2, cy - arrowSize / 2);
                    break;
            }
            ctx.closePath();
            ctx.fill();
        }

        function drawRagdoll(ragdoll) {
            ctx.imageSmoothingEnabled = false;
            
            ragdoll.parts.forEach(part => {
                ctx.save();
                ctx.translate(part.x, part.y);
                if (part.rotation) {
                    ctx.rotate(part.rotation);
                }
                
                const lightGray = '#d0d0d0';
                const darkGray = '#808080';
                const darkerGray = '#606060';
                
                if (part === grabbedRagdollPart) {
                    ctx.globalAlpha = 0.9;
                }
                
                if (part.type === 'head') {
                    const headWidth = part.radius * 1.6;
                    const headHeight = part.radius * 1.3;
                    
                    ctx.fillStyle = lightGray;
                    ctx.fillRect(-headWidth / 2, -headHeight / 2, headWidth, headHeight);
                    ctx.strokeStyle = darkerGray;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(-headWidth / 2, -headHeight / 2, headWidth, headHeight);
                    
                    const eyeSize = 3;
                    ctx.fillStyle = darkerGray;
                    ctx.fillRect(headWidth / 2 - eyeSize - 2, -eyeSize / 2, eyeSize, eyeSize);
                } else if (part.type === 'torso') {
                    ctx.fillStyle = lightGray;
                    ctx.fillRect(-part.width / 2, -part.height / 2, part.width, part.height);
                    
                    ctx.fillStyle = '#c0c0c0';
                    ctx.fillRect(-part.width / 2 + 1, -part.height / 2 + 1, part.width - 2, part.height - 2);
                    
                    ctx.strokeStyle = darkerGray;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(-part.width / 2, -part.height / 2, part.width, part.height);
                } else if (part.type === 'lowerLeg') {
                    ctx.fillStyle = lightGray;
                    ctx.fillRect(-part.width / 2, -part.height / 2, part.width, part.height);
                    ctx.strokeStyle = darkerGray;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(-part.width / 2, -part.height / 2, part.width, part.height);
                    
                    const footWidth = part.width * 1.2;
                    const footHeight = 4;
                    ctx.fillStyle = darkerGray;
                    ctx.fillRect(-footWidth / 2, part.height / 2 - 1, footWidth, footHeight);
                    ctx.fillRect(-footWidth / 2 + footWidth - 2, part.height / 2 - 1, 2, footHeight + 2);
                } else {
                    ctx.fillStyle = lightGray;
                    ctx.fillRect(-part.width / 2, -part.height / 2, part.width, part.height);
                    ctx.strokeStyle = darkerGray;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(-part.width / 2, -part.height / 2, part.width, part.height);
                }
                
                ctx.globalAlpha = 1;
                ctx.restore();
            });
            
            ragdoll.joints.forEach(joint => {
                const p1 = joint.part1;
                const p2 = joint.part2;
                
                let p1X = p1.x, p1Y = p1.y;
                let p2X = p2.x, p2Y = p2.y;
                
                if (p1.type === 'head') {
                    p1X += joint.offset1.x;
                    p1Y += joint.offset1.y;
                } else {
                    const cos1 = Math.cos(p1.rotation || 0);
                    const sin1 = Math.sin(p1.rotation || 0);
                    p1X += joint.offset1.x * cos1 - joint.offset1.y * sin1;
                    p1Y += joint.offset1.x * sin1 + joint.offset1.y * cos1;
                }
                
                if (p2.type === 'head') {
                    p2X += joint.offset2.x;
                    p2Y += joint.offset2.y;
                } else {
                    const cos2 = Math.cos(p2.rotation || 0);
                    const sin2 = Math.sin(p2.rotation || 0);
                    p2X += joint.offset2.x * cos2 - joint.offset2.y * sin2;
                    p2Y += joint.offset2.x * sin2 + joint.offset2.y * cos2;
                }
                
                ctx.strokeStyle = '#808080';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(p1X, p1Y);
                ctx.lineTo(p2X, p2Y);
                ctx.stroke();
            });
            
            ctx.imageSmoothingEnabled = true;
        }

        function drawGrid() {
            if (!snapToGrid || !buildingMode) return;
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        }

        document.getElementById('tornadoEnabled').onchange = (e) => {
            tornadoEnabled = e.target.value === 'on';
            document.getElementById('tornadoEnabledValue').textContent = tornadoEnabled ? 'ON' : 'OFF';
            if (tornadoEnabled && !tornado) {
                tornado = {
                    x: canvas.width / 2,
                    y: canvas.height + 50,
                    rotation: 0,
                    path: [],
                    active: true
                };
            } else if (!tornadoEnabled) {
                tornado = null;
            }
        };

        syncInputs('tornadoStrength', 'tornadoStrengthInput', (val) => {
            tornadoStrength = parseFloat(val);
            document.getElementById('tornadoStrengthValue').textContent = tornadoStrength.toFixed(1);
        });

        syncInputs('tornadoSpeed', 'tornadoSpeedInput', (val) => {
            tornadoSpeed = parseFloat(val);
            document.getElementById('tornadoSpeedValue').textContent = tornadoSpeed.toFixed(1);
        });

        syncInputs('tornadoSize', 'tornadoSizeInput', (val) => {
            tornadoSize = parseInt(val);
            document.getElementById('tornadoSizeValue').textContent = tornadoSize;
        });

        document.getElementById('tsunamiEnabled').onchange = (e) => {
            tsunamiEnabled = e.target.value === 'on';
            document.getElementById('tsunamiEnabledValue').textContent = tsunamiEnabled ? 'ON' : 'OFF';
            if (!tsunamiEnabled) tsunamiWaves = [];
        };

        syncInputs('tsunamiStrength', 'tsunamiStrengthInput', (val) => {
            tsunamiStrength = parseFloat(val);
            document.getElementById('tsunamiStrengthValue').textContent = tsunamiStrength.toFixed(1);
        });

        syncInputs('tsunamiSpeed', 'tsunamiSpeedInput', (val) => {
            tsunamiSpeed = parseFloat(val);
            document.getElementById('tsunamiSpeedValue').textContent = tsunamiSpeed.toFixed(1);
        });

        syncInputs('tsunamiSize', 'tsunamiSizeInput', (val) => {
            tsunamiSize = parseInt(val);
            document.getElementById('tsunamiSizeValue').textContent = tsunamiSize;
        });

        document.getElementById('volcanoEnabled').onchange = (e) => {
            volcanoEnabled = e.target.value === 'on';
            document.getElementById('volcanoEnabledValue').textContent = volcanoEnabled ? 'ON' : 'OFF';
            if (volcanoEnabled && !volcano) {
                volcano = {
                    x: canvas.width / 2,
                    y: canvas.height - 20,
                    eruptionTimer: 0,
                    active: true
                };
            } else if (!volcanoEnabled) {
                volcano = null;
            }
        };

        syncInputs('volcanoIntensity', 'volcanoIntensityInput', (val) => {
            volcanoIntensity = parseFloat(val);
            document.getElementById('volcanoIntensityValue').textContent = volcanoIntensity.toFixed(1);
        });

        syncInputs('volcanoSpeed', 'volcanoSpeedInput', (val) => {
            volcanoSpeed = parseFloat(val);
            document.getElementById('volcanoSpeedValue').textContent = volcanoSpeed.toFixed(1);
        });

        syncInputs('volcanoSize', 'volcanoSizeInput', (val) => {
            volcanoSize = parseInt(val);
            document.getElementById('volcanoSizeValue').textContent = volcanoSize;
        });

        document.getElementById('thunderEnabled').onchange = (e) => {
            thunderEnabled = e.target.value === 'on';
            document.getElementById('thunderEnabledValue').textContent = thunderEnabled ? 'ON' : 'OFF';
            if (!thunderEnabled) lightningStrikes = [];
        };

        syncInputs('thunderFreq', 'thunderFreqInput', (val) => {
            thunderFreq = parseFloat(val);
            document.getElementById('thunderFreqValue').textContent = thunderFreq.toFixed(1);
        });

        syncInputs('thunderStrength', 'thunderStrengthInput', (val) => {
            thunderStrength = parseFloat(val);
            document.getElementById('thunderStrengthValue').textContent = thunderStrength.toFixed(1);
        });

        syncInputs('thunderSize', 'thunderSizeInput', (val) => {
            thunderSize = parseInt(val);
            document.getElementById('thunderSizeValue').textContent = thunderSize;
        });

        document.getElementById('rainEnabled').onchange = (e) => {
            rainEnabled = e.target.value === 'on';
            document.getElementById('rainEnabledValue').textContent = rainEnabled ? 'ON' : 'OFF';
            if (!rainEnabled) rainDrops = [];
        };

        syncInputs('rainIntensity', 'rainIntensityInput', (val) => {
            rainIntensity = parseFloat(val);
            document.getElementById('rainIntensityValue').textContent = rainIntensity.toFixed(1);
        });

        syncInputs('rainSpeed', 'rainSpeedInput', (val) => {
            rainSpeed = parseFloat(val);
            document.getElementById('rainSpeedValue').textContent = rainSpeed.toFixed(1);
        });

        syncInputs('rainSize', 'rainSizeInput', (val) => {
            rainSize = parseInt(val);
            document.getElementById('rainSizeValue').textContent = rainSize;
        });

        document.getElementById('snowEnabled').onchange = (e) => {
            snowEnabled = e.target.value === 'on';
            document.getElementById('snowEnabledValue').textContent = snowEnabled ? 'ON' : 'OFF';
            if (!snowEnabled) snowFlakes = [];
        };

        syncInputs('snowIntensity', 'snowIntensityInput', (val) => {
            snowIntensity = parseFloat(val);
            document.getElementById('snowIntensityValue').textContent = snowIntensity.toFixed(1);
        });

        syncInputs('snowSpeed', 'snowSpeedInput', (val) => {
            snowSpeed = parseFloat(val);
            document.getElementById('snowSpeedValue').textContent = snowSpeed.toFixed(1);
        });

        syncInputs('snowSize', 'snowSizeInput', (val) => {
            snowSize = parseFloat(val);
            document.getElementById('snowSizeValue').textContent = snowSize.toFixed(1);
        });

        document.getElementById('hurricaneEnabled').onchange = (e) => {
            hurricaneEnabled = e.target.value === 'on';
            document.getElementById('hurricaneEnabledValue').textContent = hurricaneEnabled ? 'ON' : 'OFF';
            if (hurricaneEnabled && !hurricane) {
                hurricane = {
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    rotation: 0,
                    active: true
                };
            } else if (!hurricaneEnabled) {
                hurricane = null;
            }
        };

        syncInputs('hurricaneStrength', 'hurricaneStrengthInput', (val) => {
            hurricaneStrength = parseFloat(val);
            document.getElementById('hurricaneStrengthValue').textContent = hurricaneStrength.toFixed(1);
        });

        syncInputs('hurricaneSpeed', 'hurricaneSpeedInput', (val) => {
            hurricaneSpeed = parseFloat(val);
            document.getElementById('hurricaneSpeedValue').textContent = hurricaneSpeed.toFixed(1);
        });

        syncInputs('hurricaneSize', 'hurricaneSizeInput', (val) => {
            hurricaneSize = parseInt(val);
            document.getElementById('hurricaneSizeValue').textContent = hurricaneSize;
        });

        document.getElementById('earthquakeEnabled').onchange = (e) => {
            earthquakeEnabled = e.target.value === 'on';
            document.getElementById('earthquakeEnabledValue').textContent = earthquakeEnabled ? 'ON' : 'OFF';
            earthquakeShake = { x: 0, y: 0 };
        };

        syncInputs('earthquakeIntensity', 'earthquakeIntensityInput', (val) => {
            earthquakeIntensity = parseFloat(val);
            document.getElementById('earthquakeIntensityValue').textContent = earthquakeIntensity.toFixed(1);
        });

        syncInputs('earthquakeSpeed', 'earthquakeSpeedInput', (val) => {
            earthquakeSpeed = parseFloat(val);
            document.getElementById('earthquakeSpeedValue').textContent = earthquakeSpeed.toFixed(1);
        });

        syncInputs('earthquakeRange', 'earthquakeRangeInput', (val) => {
            earthquakeRange = parseInt(val);
            document.getElementById('earthquakeRangeValue').textContent = earthquakeRange;
        });

        function togglePhysics() {
            physicsEnabled = !physicsEnabled;
            document.getElementById('physicsBtn').textContent = `Physics: ${physicsEnabled ? 'ON' : 'OFF'}`;
            document.getElementById('physicsBtn').classList.toggle('active', physicsEnabled);
        }

        function toggleConnections() {
            connectionsEnabled = !connectionsEnabled;
            document.getElementById('connectionsBtn').textContent = `Connections: ${connectionsEnabled ? 'ON' : 'OFF'}`;
            document.getElementById('connectionsBtn').classList.toggle('active', connectionsEnabled);
        }

        function toggleMinimize() {
            const panel = document.getElementById('controlsPanel');
            const btn = document.getElementById('minimizeBtn');
            panel.classList.toggle('minimized');
            btn.textContent = panel.classList.contains('minimized') ? '+' : '−';
        }

        function toggleSection(titleElement) {
            const section = titleElement.parentElement;
            section.classList.toggle('collapsed');
        }

        function setupValueDoubleClick(valueId, sliderId, setter, parser = parseInt, formatter = (v) => v) {
            const valueEl = document.getElementById(valueId);
            valueEl.style.cursor = devMode ? 'pointer' : 'default';
            valueEl.title = devMode ? 'Double-click to set value' : '';
            valueEl.ondblclick = () => {
                if (devMode) {
                    const current = parser(document.getElementById(sliderId).value);
                    const input = prompt(`Enter value:`, current);
                    if (input !== null) {
                        const val = parser(input);
                        if (!isNaN(val)) {
                            document.getElementById(sliderId).value = val;
                            setter(val);
                            valueEl.textContent = formatter(val);
                        }
                    }
                }
            };
        }

        function toggleDevMode() {
            devMode = !devMode;
            const btn = document.getElementById('devModeBtn');
            btn.textContent = `Dev Mode: ${devMode ? 'ON' : 'OFF'}`;
            btn.style.background = devMode ? '#44ff44' : '#ff4444';
            
            const unlimited = 999999999;
            
            if (devMode) {
                maxParticles = Infinity;
                document.getElementById('maxParticles').max = unlimited;
                document.getElementById('maxParticles').value = unlimited;
                document.getElementById('maxParticlesValue').textContent = 'UNLIMITED';
                
                document.getElementById('size').max = unlimited;
                document.getElementById('count').max = unlimited;
                document.getElementById('speed').max = unlimited;
                document.getElementById('lifetime').max = unlimited;
                document.getElementById('trail').max = unlimited;
                document.getElementById('gravity').max = unlimited;
                document.getElementById('friction').max = unlimited;
                document.getElementById('interaction').max = unlimited;
                document.getElementById('mouseForce').max = unlimited;
                document.getElementById('sizeVar').max = unlimited;
                document.getElementById('distance').max = unlimited;
                document.getElementById('trailOpacity').max = unlimited;
                document.getElementById('windX').max = unlimited;
                document.getElementById('windX').min = -unlimited;
                document.getElementById('windY').max = unlimited;
                document.getElementById('windY').min = -unlimited;
                document.getElementById('bounce').max = unlimited;
                document.getElementById('emitRate').max = unlimited;
                document.getElementById('magnetic').max = unlimited;
                document.getElementById('vortex').max = unlimited;
                document.getElementById('noise').max = unlimited;
                document.getElementById('scanlines').max = unlimited;
                document.getElementById('chromatic').max = unlimited;
                document.getElementById('grain').max = unlimited;
                document.getElementById('tracking').max = unlimited;
                document.getElementById('static').max = unlimited;
                document.getElementById('bleed').max = unlimited;
                document.getElementById('curvature').max = unlimited;
                document.getElementById('glitch').max = unlimited;
                
                setupValueDoubleClick('sizeValue', 'size', (v) => { particleSize = v; }, parseInt);
                setupValueDoubleClick('countValue', 'count', (v) => { particleCount = v; }, parseInt);
                setupValueDoubleClick('speedValue', 'speed', (v) => { speed = v; }, parseFloat, (v) => v.toFixed(1));
                setupValueDoubleClick('lifetimeValue', 'lifetime', (v) => { lifetime = v; }, parseInt, (v) => v + '%');
                setupValueDoubleClick('trailValue', 'trail', (v) => { trailLength = v; }, parseInt);
                setupValueDoubleClick('gravityValue', 'gravity', (v) => { gravity = v; }, parseFloat, (v) => v.toFixed(2));
                setupValueDoubleClick('frictionValue', 'friction', (v) => { friction = v; }, parseFloat, (v) => v.toFixed(2));
                setupValueDoubleClick('interactionValue', 'interaction', (v) => { interactionForce = v; }, parseFloat, (v) => v.toFixed(1));
                setupValueDoubleClick('mouseForceValue', 'mouseForce', (v) => { mouseForce = v; }, parseFloat, (v) => v.toFixed(1));
                setupValueDoubleClick('sizeVarValue', 'sizeVar', (v) => { sizeVariation = v; }, parseInt, (v) => v + '%');
                setupValueDoubleClick('distanceValue', 'distance', (v) => { connectionDistance = v; }, parseInt);
                setupValueDoubleClick('trailOpacityValue', 'trailOpacity', (v) => { trailOpacity = v; }, parseFloat, (v) => v.toFixed(2));
                setupValueDoubleClick('windXValue', 'windX', (v) => { windX = v; }, parseFloat, (v) => v.toFixed(1));
                setupValueDoubleClick('windYValue', 'windY', (v) => { windY = v; }, parseFloat, (v) => v.toFixed(1));
                setupValueDoubleClick('bounceValue', 'bounce', (v) => { bounce = v; }, parseFloat, (v) => v.toFixed(1));
                setupValueDoubleClick('emitRateValue', 'emitRate', (v) => { emitRate = v; }, parseInt);
                setupValueDoubleClick('magneticValue', 'magnetic', (v) => { magneticField = v; }, parseFloat, (v) => v.toFixed(1));
                setupValueDoubleClick('vortexValue', 'vortex', (v) => { vortexStrength = v; }, parseFloat, (v) => v.toFixed(1));
                setupValueDoubleClick('noiseValue', 'noise', (v) => { noiseAmount = v; }, parseFloat, (v) => v.toFixed(1));
                setupValueDoubleClick('scanlinesValue', 'scanlines', (v) => { scanlinesIntensity = v; }, parseInt, (v) => v + '%');
                setupValueDoubleClick('chromaticValue', 'chromatic', (v) => { chromaticAberration = v; }, parseFloat, (v) => v.toFixed(1));
                setupValueDoubleClick('grainValue', 'grain', (v) => { filmGrain = v; }, parseInt, (v) => v + '%');
                setupValueDoubleClick('trackingValue', 'tracking', (v) => { vhsTracking = v; }, parseInt, (v) => v + '%');
                setupValueDoubleClick('staticValue', 'static', (v) => { staticNoise = v; }, parseInt, (v) => v + '%');
                setupValueDoubleClick('bleedValue', 'bleed', (v) => { colorBleed = v; }, parseInt, (v) => v + '%');
                setupValueDoubleClick('curvatureValue', 'curvature', (v) => { crtCurvature = v; }, parseInt, (v) => v + '%');
                setupValueDoubleClick('glitchValue', 'glitch', (v) => { vhsGlitch = v; }, parseInt, (v) => v + '%');
            } else {
                maxParticles = 10000;
                document.getElementById('maxParticles').max = 50000;
                document.getElementById('maxParticles').value = 10000;
                document.getElementById('maxParticlesValue').textContent = '10000';
                
                document.getElementById('size').max = 20;
                document.getElementById('count').max = 200;
                document.getElementById('speed').max = 5;
                document.getElementById('lifetime').max = 200;
                document.getElementById('trail').max = 20;
                document.getElementById('gravity').max = 1;
                document.getElementById('friction').max = 1;
                document.getElementById('interaction').max = 3;
                document.getElementById('mouseForce').max = 5;
                document.getElementById('sizeVar').max = 100;
                document.getElementById('distance').max = 300;
                document.getElementById('trailOpacity').max = 1;
                document.getElementById('windX').max = 2;
                document.getElementById('windX').min = -2;
                document.getElementById('windY').max = 2;
                document.getElementById('windY').min = -2;
                document.getElementById('bounce').max = 1;
                document.getElementById('emitRate').max = 50;
                document.getElementById('magnetic').max = 5;
                document.getElementById('vortex').max = 5;
                document.getElementById('noise').max = 2;
                document.getElementById('scanlines').max = 100;
                document.getElementById('chromatic').max = 10;
                document.getElementById('grain').max = 100;
                document.getElementById('tracking').max = 100;
                document.getElementById('static').max = 100;
                document.getElementById('bleed').max = 100;
                document.getElementById('curvature').max = 100;
                document.getElementById('glitch').max = 100;
                
                const valueDisplays = document.querySelectorAll('.value-display');
                valueDisplays.forEach(el => {
                    el.style.cursor = 'default';
                    el.title = '';
                    el.ondblclick = null;
                });
            }
        }

        function updateUIFromVariables() {
            function syncValue(rangeId, inputId, value) {
                const range = document.getElementById(rangeId);
                const input = document.getElementById(inputId);
                if (range) range.value = value;
                if (input) input.value = value;
            }

            syncValue('size', 'sizeInput', particleSize);
            syncValue('gravity', 'gravityInput', gravity);
            syncValue('friction', 'frictionInput', friction);
            syncValue('interaction', 'interactionInput', interactionForce);
            syncValue('distance', 'distanceInput', connectionDistance);
            syncValue('count', 'countInput', particleCount);
            document.getElementById('mode').value = mode;
            syncValue('speed', 'speedInput', speed);
            syncValue('lifetime', 'lifetimeInput', lifetime);
            syncValue('trail', 'trailInput', trailLength);
            syncValue('trailOpacity', 'trailOpacityInput', trailOpacity);
            syncValue('mouseForce', 'mouseForceInput', mouseForce);
            document.getElementById('mapSelector').value = currentMap;
            document.getElementById('shape').value = particleShape;
            syncValue('sizeVar', 'sizeVarInput', sizeVariation);
            syncValue('windX', 'windXInput', windX);
            syncValue('windY', 'windYInput', windY);
            document.getElementById('collisions').value = collisionsEnabled ? 'on' : 'off';
            syncValue('bounce', 'bounceInput', bounce);
            document.getElementById('emitter').value = emitterMode;
            syncValue('emitRate', 'emitRateInput', emitRate);
            document.getElementById('colorMode').value = colorMode;
            syncValue('magnetic', 'magneticInput', magneticField);
            syncValue('vortex', 'vortexInput', vortexStrength);
            syncValue('noise', 'noiseInput', noiseAmount);
            document.getElementById('flocking').value = flockingEnabled ? 'on' : 'off';
            document.getElementById('sizeOverLife').value = sizeOverLife;
            document.getElementById('colorOverLife').value = colorOverLife;
            document.getElementById('blendMode').value = blendMode;
            document.getElementById('velocityViz').value = velocityViz ? 'on' : 'off';
            syncValue('maxParticles', 'maxParticlesInput', maxParticles === Infinity ? 999999999 : maxParticles);
            document.getElementById('vhsMode').value = vhsMode ? 'on' : 'off';
            syncValue('scanlines', 'scanlinesInput', scanlinesIntensity);
            syncValue('chromatic', 'chromaticInput', chromaticAberration);
            syncValue('grain', 'grainInput', filmGrain);
            syncValue('tracking', 'trackingInput', vhsTracking);
            syncValue('static', 'staticInput', staticNoise);
            syncValue('bleed', 'bleedInput', colorBleed);
            syncValue('curvature', 'curvatureInput', crtCurvature);
            syncValue('glitch', 'glitchInput', vhsGlitch);
            
            document.getElementById('sizeValue').textContent = particleSize;
            document.getElementById('gravityValue').textContent = gravity.toFixed(2);
            document.getElementById('frictionValue').textContent = friction.toFixed(2);
            document.getElementById('interactionValue').textContent = interactionForce.toFixed(1);
            document.getElementById('distanceValue').textContent = connectionDistance;
            document.getElementById('countValue').textContent = particleCount;
            document.getElementById('modeValue').textContent = document.getElementById('mode').options[document.getElementById('mode').selectedIndex].text;
            document.getElementById('speedValue').textContent = speed.toFixed(1);
            document.getElementById('lifetimeValue').textContent = lifetime + '%';
            document.getElementById('trailValue').textContent = trailLength;
            document.getElementById('trailOpacityValue').textContent = trailOpacity.toFixed(2);
            document.getElementById('mouseForceValue').textContent = mouseForce.toFixed(1);
            document.getElementById('mapValue').textContent = document.getElementById('mapSelector').options[document.getElementById('mapSelector').selectedIndex].text;
            document.getElementById('shapeValue').textContent = document.getElementById('shape').options[document.getElementById('shape').selectedIndex].text;
            document.getElementById('sizeVarValue').textContent = sizeVariation + '%';
            document.getElementById('windXValue').textContent = windX.toFixed(1);
            document.getElementById('windYValue').textContent = windY.toFixed(1);
            document.getElementById('collisionValue').textContent = collisionsEnabled ? 'ON' : 'OFF';
            document.getElementById('bounceValue').textContent = bounce.toFixed(1);
            document.getElementById('emitterValue').textContent = document.getElementById('emitter').options[document.getElementById('emitter').selectedIndex].text.toUpperCase();
            document.getElementById('emitRateValue').textContent = emitRate;
            document.getElementById('colorModeValue').textContent = document.getElementById('colorMode').options[document.getElementById('colorMode').selectedIndex].text;
            document.getElementById('magneticValue').textContent = magneticField.toFixed(1);
            document.getElementById('vortexValue').textContent = vortexStrength.toFixed(1);
            document.getElementById('noiseValue').textContent = noiseAmount.toFixed(1);
            document.getElementById('flockingValue').textContent = flockingEnabled ? 'ON' : 'OFF';
            document.getElementById('sizeOverLifeValue').textContent = document.getElementById('sizeOverLife').options[document.getElementById('sizeOverLife').selectedIndex].text;
            document.getElementById('colorOverLifeValue').textContent = document.getElementById('colorOverLife').options[document.getElementById('colorOverLife').selectedIndex].text;
            document.getElementById('blendValue').textContent = document.getElementById('blendMode').options[document.getElementById('blendMode').selectedIndex].text;
            document.getElementById('velocityVizValue').textContent = velocityViz ? 'ON' : 'OFF';
            document.getElementById('maxParticlesValue').textContent = maxParticles === Infinity ? 'UNLIMITED' : maxParticles;
            document.getElementById('vhsModeValue').textContent = vhsMode ? 'ON' : 'OFF';
            document.getElementById('scanlinesValue').textContent = scanlinesIntensity + '%';
            document.getElementById('chromaticValue').textContent = chromaticAberration.toFixed(1);
            document.getElementById('grainValue').textContent = filmGrain + '%';
            document.getElementById('trackingValue').textContent = vhsTracking + '%';
            document.getElementById('staticValue').textContent = staticNoise + '%';
            document.getElementById('bleedValue').textContent = colorBleed + '%';
            document.getElementById('curvatureValue').textContent = crtCurvature + '%';
            document.getElementById('glitchValue').textContent = vhsGlitch + '%';
            document.getElementById('buildingMode').value = buildingMode ? 'on' : 'off';
            document.getElementById('buildingModeValue').textContent = buildingMode ? 'ON' : 'OFF';
            document.getElementById('blockType').value = selectedBlockType;
            document.getElementById('selectedBlockValue').textContent = document.getElementById('blockType').options[document.getElementById('blockType').selectedIndex].text;
            syncValue('blockSize', 'blockSizeInput', blockSize);
            document.getElementById('blockSizeValue').textContent = blockSize;
            document.getElementById('blockColorPicker').value = blockColor;
            document.getElementById('blockColorValue').textContent = blockColor;
            document.getElementById('snapToGrid').value = snapToGrid ? 'on' : 'off';
            document.getElementById('snapToGridValue').textContent = snapToGrid ? 'ON' : 'OFF';
            syncValue('gridSize', 'gridSizeInput', gridSize);
            document.getElementById('gridSizeValue').textContent = gridSize;
            document.getElementById('blockPhysics').value = blockPhysicsEnabled ? 'on' : 'off';
            document.getElementById('blockPhysicsValue').textContent = blockPhysicsEnabled ? 'ON' : 'OFF';
            document.getElementById('blockMaterial').value = blockMaterial;
            document.getElementById('blockMaterialValue').textContent = document.getElementById('blockMaterial').options[document.getElementById('blockMaterial').selectedIndex].text;
            syncValue('conveyorSpeed', 'conveyorSpeedInput', conveyorSpeed);
            document.getElementById('conveyorSpeedValue').textContent = conveyorSpeed.toFixed(1);
            document.getElementById('conveyorDirection').value = conveyorDirection;
            document.getElementById('conveyorDirectionValue').textContent = document.getElementById('conveyorDirection').options[document.getElementById('conveyorDirection').selectedIndex].text;
            document.getElementById('pixelation').value = pixelation;
            document.getElementById('pixelationValue').textContent = pixelation === 'off' ? 'OFF' : pixelation + '-bit';
            syncValue('pixelSize', 'pixelSizeInput', pixelSize);
            document.getElementById('pixelSizeValue').textContent = pixelSize;
            document.getElementById('gravWavesEnabled').value = gravWavesEnabled ? 'on' : 'off';
            document.getElementById('gravWavesEnabledValue').textContent = gravWavesEnabled ? 'ON' : 'OFF';
            syncValue('blackHoleCount', 'blackHoleCountInput', blackHoleCount);
            document.getElementById('blackHoleCountValue').textContent = blackHoleCount;
            syncValue('blackHoleStrength', 'blackHoleStrengthInput', blackHoleStrength);
            document.getElementById('blackHoleStrengthValue').textContent = blackHoleStrength.toFixed(1);
            syncValue('eventHorizonSize', 'eventHorizonSizeInput', eventHorizonSize);
            document.getElementById('eventHorizonSizeValue').textContent = eventHorizonSize;
            syncValue('waveIntensity', 'waveIntensityInput', waveIntensity);
            document.getElementById('waveIntensityValue').textContent = waveIntensity.toFixed(1);
            document.getElementById('tornadoEnabled').value = tornadoEnabled ? 'on' : 'off';
            syncValue('tornadoStrength', 'tornadoStrengthInput', tornadoStrength);
            syncValue('tornadoSpeed', 'tornadoSpeedInput', tornadoSpeed);
            syncValue('tornadoSize', 'tornadoSizeInput', tornadoSize);
            document.getElementById('tsunamiEnabled').value = tsunamiEnabled ? 'on' : 'off';
            syncValue('tsunamiStrength', 'tsunamiStrengthInput', tsunamiStrength);
            syncValue('tsunamiSpeed', 'tsunamiSpeedInput', tsunamiSpeed);
            syncValue('tsunamiSize', 'tsunamiSizeInput', tsunamiSize);
            document.getElementById('volcanoEnabled').value = volcanoEnabled ? 'on' : 'off';
            syncValue('volcanoIntensity', 'volcanoIntensityInput', volcanoIntensity);
            syncValue('volcanoSpeed', 'volcanoSpeedInput', volcanoSpeed);
            syncValue('volcanoSize', 'volcanoSizeInput', volcanoSize);
            document.getElementById('thunderEnabled').value = thunderEnabled ? 'on' : 'off';
            syncValue('thunderFreq', 'thunderFreqInput', thunderFreq);
            syncValue('thunderStrength', 'thunderStrengthInput', thunderStrength);
            syncValue('thunderSize', 'thunderSizeInput', thunderSize);
            document.getElementById('rainEnabled').value = rainEnabled ? 'on' : 'off';
            syncValue('rainIntensity', 'rainIntensityInput', rainIntensity);
            syncValue('rainSpeed', 'rainSpeedInput', rainSpeed);
            syncValue('rainSize', 'rainSizeInput', rainSize);
            document.getElementById('snowEnabled').value = snowEnabled ? 'on' : 'off';
            syncValue('snowIntensity', 'snowIntensityInput', snowIntensity);
            syncValue('snowSpeed', 'snowSpeedInput', snowSpeed);
            syncValue('snowSize', 'snowSizeInput', snowSize);
            document.getElementById('hurricaneEnabled').value = hurricaneEnabled ? 'on' : 'off';
            syncValue('hurricaneStrength', 'hurricaneStrengthInput', hurricaneStrength);
            syncValue('hurricaneSpeed', 'hurricaneSpeedInput', hurricaneSpeed);
            syncValue('hurricaneSize', 'hurricaneSizeInput', hurricaneSize);
            document.getElementById('earthquakeEnabled').value = earthquakeEnabled ? 'on' : 'off';
            syncValue('earthquakeIntensity', 'earthquakeIntensityInput', earthquakeIntensity);
            syncValue('earthquakeSpeed', 'earthquakeSpeedInput', earthquakeSpeed);
            syncValue('earthquakeRange', 'earthquakeRangeInput', earthquakeRange);
            
            document.getElementById('tornadoEnabledValue').textContent = tornadoEnabled ? 'ON' : 'OFF';
            document.getElementById('tornadoStrengthValue').textContent = tornadoStrength.toFixed(1);
            document.getElementById('tornadoSpeedValue').textContent = tornadoSpeed.toFixed(1);
            document.getElementById('tornadoSizeValue').textContent = tornadoSize;
            document.getElementById('tsunamiEnabledValue').textContent = tsunamiEnabled ? 'ON' : 'OFF';
            document.getElementById('tsunamiStrengthValue').textContent = tsunamiStrength.toFixed(1);
            document.getElementById('volcanoEnabledValue').textContent = volcanoEnabled ? 'ON' : 'OFF';
            document.getElementById('volcanoIntensityValue').textContent = volcanoIntensity.toFixed(1);
            document.getElementById('thunderEnabledValue').textContent = thunderEnabled ? 'ON' : 'OFF';
            document.getElementById('thunderFreqValue').textContent = thunderFreq.toFixed(1);
            document.getElementById('rainEnabledValue').textContent = rainEnabled ? 'ON' : 'OFF';
            document.getElementById('rainIntensityValue').textContent = rainIntensity.toFixed(1);
            document.getElementById('snowEnabledValue').textContent = snowEnabled ? 'ON' : 'OFF';
            document.getElementById('snowIntensityValue').textContent = snowIntensity.toFixed(1);
            document.getElementById('hurricaneEnabledValue').textContent = hurricaneEnabled ? 'ON' : 'OFF';
            document.getElementById('hurricaneStrengthValue').textContent = hurricaneStrength.toFixed(1);
            document.getElementById('earthquakeEnabledValue').textContent = earthquakeEnabled ? 'ON' : 'OFF';
            document.getElementById('earthquakeIntensityValue').textContent = earthquakeIntensity.toFixed(1);
            
            ctx.globalCompositeOperation = blendMode;
        }

        function resetSettings() {
            particleSize = 3;
            gravity = 0.1;
            friction = 0.99;
            interactionForce = 0.5;
            connectionDistance = 100;
            particleCount = 20;
            mode = 'click';
            speed = 1.0;
            lifetime = 100;
            trailLength = 5;
            trailOpacity = 0.3;
            mouseForce = 1.0;
            backgroundMode = 'dark';
            currentMap = 'void';
            particleShape = 'circle';
            sizeVariation = 50;
            windX = 0;
            windY = 0;
            collisionsEnabled = false;
            bounce = 0.8;
            emitterMode = 'off';
            emitRate = 5;
            colorMode = 'single';
            magneticField = 0;
            vortexStrength = 0;
            noiseAmount = 0;
            flockingEnabled = false;
            sizeOverLife = 'off';
            colorOverLife = 'off';
            blendMode = 'normal';
            velocityViz = false;
            maxParticles = 10000;
            vhsMode = false;
            scanlinesIntensity = 0;
            chromaticAberration = 0;
            filmGrain = 0;
            vhsTracking = 0;
            staticNoise = 0;
            colorBleed = 0;
            crtCurvature = 0;
            vhsGlitch = 0;
            pixelation = 'off';
            pixelSize = 4;
            buildingMode = false;
            selectedBlockType = 'square';
            blockSize = 30;
            blockColor = '#4a9eff';
            snapToGrid = true;
            gridSize = 20;
            placedBlocks = [];
            blockPhysicsEnabled = false;
            blockMaterial = 'solid';
            conveyorSpeed = 2.0;
            conveyorDirection = 'right';
            conveyors = [];
            ragdolls = [];
            gravWavesEnabled = false;
            blackHoleCount = 3;
            blackHoleStrength = 50;
            eventHorizonSize = 30;
            waveIntensity = 5;
            blackHoles = [];
            tornadoEnabled = false;
            tornadoStrength = 5.0;
            tornadoSpeed = 2.0;
            tornadoSize = 150;
            tornado = null;
            tsunamiEnabled = false;
            tsunamiStrength = 3.0;
            tsunamiWaves = [];
            volcanoEnabled = false;
            volcanoIntensity = 5.0;
            volcano = null;
            thunderEnabled = false;
            thunderFreq = 2.0;
            thunderTimer = 0;
            lightningStrikes = [];
            thunderFlash = 0;
            thunderShake = { x: 0, y: 0 };
            rainEnabled = false;
            rainIntensity = 3.0;
            rainDrops = [];
            snowEnabled = false;
            snowIntensity = 2.0;
            snowFlakes = [];
            hurricaneEnabled = false;
            hurricaneStrength = 6.0;
            hurricane = null;
            earthquakeEnabled = false;
            earthquakeIntensity = 3.0;
            earthquakeTimer = 0;
            earthquakeShake = { x: 0, y: 0 };
            
            updateUIFromVariables();
        }

        function loadPreset(name) {
            clearParticles();
            switch(name) {
                case 'fireworks':
                    particleSize = 4;
                    particleCount = 50;
                    mode = 'explosion';
                    speed = 1.5;
                    gravity = 0.15;
                    lifetime = 80;
                    trailLength = 8;
                    colorMode = 'random';
                    interactionForce = 0.3;
                    break;
                case 'galaxy':
                    particleSize = 2;
                    particleCount = 100;
                    mode = 'spiral';
                    speed = 0.8;
                    gravity = 0;
                    friction = 0.995;
                    lifetime = 150;
                    connectionDistance = 150;
                    colorMode = 'gradient';
                    interactionForce = 1.5;
                    break;
                case 'plasma':
                    particleSize = 5;
                    particleCount = 30;
                    mode = 'auto';
                    speed = 1.2;
                    gravity = 0;
                    friction = 0.97;
                    lifetime = 120;
                    connectionDistance = 200;
                    colorMode = 'rainbow';
                    interactionForce = 2.0;
                    break;
                case 'vortex':
                    particleSize = 3;
                    particleCount = 100;
                    mode = 'spiral';
                    speed = 0.8;
                    gravity = 0;
                    friction = 0.99;
                    lifetime = 200;
                    vortexStrength = 3.0;
                    colorMode = 'gradient';
                    interactionForce = 1.0;
                    break;
                case 'flocking':
                    particleSize = 2;
                    particleCount = 150;
                    mode = 'auto';
                    speed = 1.0;
                    gravity = 0;
                    friction = 0.98;
                    lifetime = 150;
                    flockingEnabled = true;
                    colorMode = 'velocity';
                    interactionForce = 0.5;
                    break;
                case 'magnetic':
                    particleSize = 4;
                    particleCount = 80;
                    mode = 'spiral';
                    speed = 0.6;
                    gravity = 0;
                    friction = 0.995;
                    lifetime = 180;
                    magneticField = 4.0;
                    colorMode = 'age';
                    interactionForce = 1.5;
                    break;
                case 'chaos':
                    particleSize = 3;
                    particleCount = 200;
                    mode = 'explosion';
                    speed = 2.0;
                    gravity = 0.2;
                    friction = 0.95;
                    lifetime = 100;
                    noiseAmount = 1.5;
                    collisionsEnabled = true;
                    colorMode = 'random';
                    interactionForce = 2.5;
                    break;
                case 'nebula':
                    particleSize = 4;
                    particleCount = 80;
                    mode = 'spiral';
                    speed = 0.5;
                    gravity = 0;
                    friction = 0.99;
                    lifetime = 200;
                    connectionDistance = 180;
                    colorMode = 'gradient';
                    interactionForce = 1.2;
                    blendMode = 'screen';
                    trailLength = 12;
                    break;
                case 'stars':
                    particleSize = 1;
                    particleCount = 300;
                    mode = 'auto';
                    speed = 0.3;
                    gravity = 0;
                    friction = 1;
                    lifetime = 300;
                    colorMode = 'single';
                    currentColor = '#ffffff';
                    trailLength = 0;
                    sizeOverLife = 'pulse';
                    break;
                case 'smoke':
                    particleSize = 6;
                    particleCount = 40;
                    mode = 'fountain';
                    speed = 0.8;
                    gravity = -0.05;
                    friction = 0.98;
                    lifetime = 150;
                    colorMode = 'single';
                    currentColor = '#666666';
                    trailLength = 15;
                    sizeOverLife = 'grow';
                    colorOverLife = 'fade';
                    windX = 0.2;
                    break;
                case 'bubbles':
                    particleSize = 5;
                    particleCount = 50;
                    mode = 'fountain';
                    speed = 0.6;
                    gravity = -0.08;
                    friction = 0.99;
                    lifetime = 180;
                    colorMode = 'gradient';
                    trailLength = 8;
                    sizeOverLife = 'grow';
                    bounce = 0.9;
                    break;
                case 'sparkles':
                    particleSize = 2;
                    particleCount = 100;
                    mode = 'explosion';
                    speed = 1.2;
                    gravity = 0.1;
                    friction = 0.97;
                    lifetime = 80;
                    colorMode = 'rainbow';
                    trailLength = 5;
                    sizeOverLife = 'shrink';
                    break;
                case 'aurora':
                    particleSize = 3;
                    particleCount = 120;
                    mode = 'spiral';
                    speed = 0.4;
                    gravity = 0;
                    friction = 0.995;
                    lifetime = 250;
                    connectionDistance = 200;
                    colorMode = 'gradient';
                    interactionForce = 0.8;
                    blendMode = 'screen';
                    trailLength = 20;
                    vortexStrength = 2.0;
                    break;
                case 'meteor':
                    particleSize = 4;
                    particleCount = 60;
                    mode = 'explosion';
                    speed = 1.8;
                    gravity = 0.12;
                    friction = 0.96;
                    lifetime = 90;
                    colorMode = 'age';
                    trailLength = 10;
                    sizeOverLife = 'shrink';
                    colorOverLife = 'heat';
                    break;
                case 'energy':
                    particleSize = 3;
                    particleCount = 100;
                    mode = 'spiral';
                    speed = 1.0;
                    gravity = 0;
                    friction = 0.99;
                    lifetime = 150;
                    connectionDistance = 120;
                    colorMode = 'velocity';
                    interactionForce = 2.0;
                    magneticField = 3.0;
                    trailLength = 8;
                    blendMode = 'screen';
                    break;
            }
            
            document.getElementById('size').value = particleSize;
            document.getElementById('count').value = particleCount;
            document.getElementById('mode').value = mode;
            document.getElementById('speed').value = speed;
            document.getElementById('gravity').value = gravity;
            document.getElementById('friction').value = friction;
            document.getElementById('lifetime').value = lifetime;
            document.getElementById('trail').value = trailLength;
            document.getElementById('distance').value = connectionDistance;
            document.getElementById('interaction').value = interactionForce;
            document.getElementById('windX').value = windX;
            document.getElementById('windY').value = windY;
            document.getElementById('colorMode').value = colorMode;
            document.getElementById('magnetic').value = magneticField;
            document.getElementById('vortex').value = vortexStrength;
            document.getElementById('noise').value = noiseAmount;
            document.getElementById('flocking').value = flockingEnabled ? 'on' : 'off';
            document.getElementById('sizeOverLife').value = sizeOverLife;
            document.getElementById('colorOverLife').value = colorOverLife;
            document.getElementById('blendMode').value = blendMode;
            document.getElementById('velocityViz').value = velocityViz ? 'on' : 'off';
            document.getElementById('maxParticles').value = maxParticles;
            document.getElementById('collisions').value = collisionsEnabled ? 'on' : 'off';
            document.getElementById('static').value = staticNoise;
            document.getElementById('glitch').value = vhsGlitch;
            
            document.getElementById('sizeValue').textContent = particleSize;
            document.getElementById('countValue').textContent = particleCount;
            document.getElementById('modeValue').textContent = document.getElementById('mode').options[document.getElementById('mode').selectedIndex].text;
            document.getElementById('speedValue').textContent = speed.toFixed(1);
            document.getElementById('gravityValue').textContent = gravity.toFixed(2);
            document.getElementById('frictionValue').textContent = friction.toFixed(2);
            document.getElementById('lifetimeValue').textContent = lifetime + '%';
            document.getElementById('trailValue').textContent = trailLength;
            document.getElementById('distanceValue').textContent = connectionDistance;
            document.getElementById('interactionValue').textContent = interactionForce.toFixed(1);
            document.getElementById('windXValue').textContent = windX.toFixed(1);
            document.getElementById('windYValue').textContent = windY.toFixed(1);
            document.getElementById('colorModeValue').textContent = document.getElementById('colorMode').options[document.getElementById('colorMode').selectedIndex].text;
            document.getElementById('magneticValue').textContent = magneticField.toFixed(1);
            document.getElementById('vortexValue').textContent = vortexStrength.toFixed(1);
            document.getElementById('noiseValue').textContent = noiseAmount.toFixed(1);
            document.getElementById('flockingValue').textContent = flockingEnabled ? 'ON' : 'OFF';
            document.getElementById('sizeOverLifeValue').textContent = document.getElementById('sizeOverLife').options[document.getElementById('sizeOverLife').selectedIndex].text;
            document.getElementById('colorOverLifeValue').textContent = document.getElementById('colorOverLife').options[document.getElementById('colorOverLife').selectedIndex].text;
            document.getElementById('blendValue').textContent = document.getElementById('blendMode').options[document.getElementById('blendMode').selectedIndex].text;
            document.getElementById('velocityVizValue').textContent = velocityViz ? 'ON' : 'OFF';
            document.getElementById('maxParticlesValue').textContent = maxParticles;
            document.getElementById('collisionValue').textContent = collisionsEnabled ? 'ON' : 'OFF';
            document.getElementById('staticValue').textContent = staticNoise + '%';
            document.getElementById('glitchValue').textContent = vhsGlitch + '%';
            
            if (currentColor) {
                document.getElementById('customColor').value = currentColor;
                document.querySelectorAll('.color-btn').forEach(b => {
                    if (b.style.background === currentColor) {
                        b.classList.add('active');
                    } else {
                        b.classList.remove('active');
                    }
                });
            }
        }

        class Particle {
            constructor(x, y, color, vx = null, vy = null) {
                this.x = x;
                this.y = y;
                this.vx = vx !== null ? vx : (Math.random() - 0.5) * 4;
                this.vy = vy !== null ? vy : (Math.random() - 0.5) * 4;
                const sizeVar = (sizeVariation / 100) * particleSize;
                this.size = particleSize + (Math.random() - 0.5) * sizeVar;
                this.color = color;
                this.maxLife = 1;
                this.life = 1;
                this.decay = (Math.random() * 0.001 + 0.0005) * (100 / lifetime);
                this.mass = this.size;
                this.history = [];
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.1;
                this.shape = particleShape;
                this.initialSize = this.size;
                this.initialColor = color;
                this.age = 0;
                this.maxAge = 1;
            }

            update() {
                if (physicsEnabled) {
                    if (this.isVolcano && this.volcanoGravity !== undefined) {
                        this.vy += this.volcanoGravity;
                    } else {
                        this.vy += gravity;
                    }
                    this.vx += windX;
                    this.vy += windY;
                    this.vx *= friction;
                    this.vy *= friction;
                }

                this.x += this.vx * speed;
                this.y += this.vy * speed;

                if (this.x < 0) {
                    this.x = 0;
                    this.vx *= -bounce;
                }
                if (this.x > canvas.width) {
                    this.x = canvas.width;
                    this.vx *= -bounce;
                }
                if (this.y < 0) {
                    this.y = 0;
                    this.vy *= -bounce;
                }
                if (this.y > canvas.height) {
                    this.y = canvas.height;
                    this.vy *= -bounce;
                }

                if (collisionsEnabled) {
                    this.checkCollisions();
                }

                if (interactionForce > 0) {
                    this.applyInteractions();
                }

                this.applyMouseForce();
                this.applyFieldForces();
                this.applyNoise();
                this.applyTornado();
                this.applyTsunami();
                this.applyVolcano();
                this.applyHurricane();
                this.applyEarthquake();
                this.applyThunderShake();
                
                this.age += 0.01;
                this.updateAging();

                this.rotation += this.rotationSpeed;

                if (trailLength > 0) {
                    this.history.push({ x: this.x, y: this.y, life: this.life });
                    if (this.history.length > trailLength) {
                        this.history.shift();
                    }
                }

                this.life -= this.decay;
            }

            applyInteractions() {
                const maxCheck = devMode ? particles.length : Math.min(particles.length, 50);
                for (let i = 0; i < maxCheck; i++) {
                    const other = particles[Math.floor(Math.random() * particles.length)];
                    if (other === this) continue;
                    
                    const dx = other.x - this.x;
                    const dy = other.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    const maxDist = devMode ? 10000 : 60;
                    if (distance > 0 && distance < maxDist) {
                        const force = (maxDist - distance) / maxDist * interactionForce;
                        const angle = Math.atan2(dy, dx);
                        this.vx += Math.cos(angle) * force * 0.02;
                        this.vy += Math.sin(angle) * force * 0.02;
                    }
                }
            }

            applyMouseForce() {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                const mouseMaxDist = devMode ? 10000 : 150;
                if (distance < mouseMaxDist && distance > 0) {
                    const force = (mouseMaxDist - distance) / mouseMaxDist * mouseForce;
                    const angle = Math.atan2(dy, dx);
                    
                    if (rightMouseDown) {
                        this.vx -= Math.cos(angle) * force * 3;
                        this.vy -= Math.sin(angle) * force * 3;
                    } else if (middleMouseDown) {
                        this.vx += Math.cos(angle) * force * 2;
                        this.vy += Math.sin(angle) * force * 2;
                    }
                }
            }

            checkCollisions() {
                const maxCheck = devMode ? particles.length : Math.min(particles.length, 30);
                for (let i = 0; i < maxCheck; i++) {
                    const other = particles[Math.floor(Math.random() * particles.length)];
                    if (other === this || other.life <= 0) continue;
                    
                    const dx = other.x - this.x;
                    const dy = other.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDist = (this.size + other.size) * 0.8;
                    
                    if (distance < minDist && distance > 0) {
                        const angle = Math.atan2(dy, dx);
                        const overlap = minDist - distance;
                        const moveX = Math.cos(angle) * overlap * 0.5;
                        const moveY = Math.sin(angle) * overlap * 0.5;
                        
                        this.x -= moveX;
                        this.y -= moveY;
                        other.x += moveX;
                        other.y += moveY;
                        
                        const relativeVx = this.vx - other.vx;
                        const relativeVy = this.vy - other.vy;
                        const dotProduct = relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle);
                        
                        if (dotProduct > 0) {
                            const impulse = dotProduct * bounce * 0.5;
                            this.vx -= Math.cos(angle) * impulse;
                            this.vy -= Math.sin(angle) * impulse;
                            other.vx += Math.cos(angle) * impulse;
                            other.vy += Math.sin(angle) * impulse;
                        }
                    }
                }
            }

            applyFieldForces() {
                if (magneticField > 0) {
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    const dx = centerX - this.x;
                    const dy = centerY - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 0) {
                        const force = magneticField / (distance * 0.01 + 1);
                        const angle = Math.atan2(dy, dx);
                        this.vx += Math.cos(angle) * force * 0.01;
                        this.vy += Math.sin(angle) * force * 0.01;
                    }
                }

                if (vortexStrength > 0) {
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    const dx = this.x - centerX;
                    const dy = this.y - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 0) {
                        const force = vortexStrength / (distance * 0.01 + 1);
                        const angle = Math.atan2(dy, dx) + Math.PI / 2;
                        this.vx += Math.cos(angle) * force * 0.01;
                        this.vy += Math.sin(angle) * force * 0.01;
                    }
                }

                if (flockingEnabled) {
                    this.applyFlocking();
                }
            }

            applyFlocking() {
                const neighbors = [];
                const maxCheck = devMode ? particles.length : Math.min(particles.length, 20);
                for (let i = 0; i < maxCheck; i++) {
                    const other = particles[Math.floor(Math.random() * particles.length)];
                    if (other === this) continue;
                    const dx = other.x - this.x;
                    const dy = other.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const flockDist = devMode ? 10000 : 80;
                    if (distance < flockDist && distance > 0) {
                        neighbors.push({ particle: other, distance });
                    }
                }

                if (neighbors.length > 0) {
                    let avgVx = 0, avgVy = 0, avgX = 0, avgY = 0;
                    neighbors.forEach(n => {
                        avgVx += n.particle.vx;
                        avgVy += n.particle.vy;
                        avgX += n.particle.x;
                        avgY += n.particle.y;
                    });
                    avgVx /= neighbors.length;
                    avgVy /= neighbors.length;
                    avgX /= neighbors.length;
                    avgY /= neighbors.length;

                    this.vx += (avgVx - this.vx) * 0.01;
                    this.vy += (avgVy - this.vy) * 0.01;

                    const dx = avgX - this.x;
                    const dy = avgY - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance > 0) {
                        this.vx += (dx / distance) * 0.005;
                        this.vy += (dy / distance) * 0.005;
                    }
                }
            }

            applyNoise() {
                if (noiseAmount > 0) {
                    this.vx += (Math.random() - 0.5) * noiseAmount * 0.1;
                    this.vy += (Math.random() - 0.5) * noiseAmount * 0.1;
                }
            }

            applyTornado() {
                if (!tornado || !tornado.active) return;
                
                const dx = tornado.x - this.x;
                const dy = tornado.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDist = tornadoSize;
                
                if (distance < maxDist && distance > 0) {
                    const pullStrength = (1 - distance / maxDist) * tornadoStrength;
                    const angle = Math.atan2(dy, dx);
                    
                    const pullX = Math.cos(angle) * pullStrength * 0.05;
                    const pullY = Math.sin(angle) * pullStrength * 0.05;
                    
                    this.vx += pullX;
                    this.vy += pullY;
                    
                    const spinAngle = angle + Math.PI / 2;
                    const spinForce = pullStrength * 0.3;
                    this.vx += Math.cos(spinAngle) * spinForce * 0.1;
                    this.vy += Math.sin(spinAngle) * spinForce * 0.1;
                }
            }

            applyTsunami() {
                if (!tsunamiEnabled || tsunamiWaves.length === 0) return;
                
                for (const wave of tsunamiWaves) {
                    const waveY = wave.y;
                    const distance = Math.abs(this.y - waveY);
                    const waveWidth = 100;
                    
                    if (distance < waveWidth) {
                        const force = (1 - distance / waveWidth) * tsunamiStrength;
                        const direction = wave.direction;
                        this.vx += direction * force * 0.1;
                        this.vy += (Math.random() - 0.5) * force * 0.05;
                    }
                }
            }

            applyVolcano() {
                if (!volcano || !volcano.active) return;
                
                const dx = volcano.x - this.x;
                const dy = volcano.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 200;
                
                if (distance < maxDist && distance > 0 && this.y > volcano.y) {
                    const force = (1 - distance / maxDist) * volcanoIntensity;
                    const angle = Math.atan2(dy, dx);
                    
                    this.vx -= Math.cos(angle) * force * 0.08;
                    this.vy -= Math.sin(angle) * force * 0.15;
                }
            }

            applyHurricane() {
                if (!hurricane || !hurricane.active) return;
                
                const dx = this.x - hurricane.x;
                const dy = this.y - hurricane.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 400;
                
                if (distance < maxDist && distance > 0) {
                    const force = (1 - distance / maxDist) * hurricaneStrength;
                    const angle = Math.atan2(dy, dx) + Math.PI / 2;
                    
                    this.vx += Math.cos(angle) * force * 0.05;
                    this.vy += Math.sin(angle) * force * 0.05;
                    
                    const pullAngle = Math.atan2(dy, dx);
                    this.vx += Math.cos(pullAngle) * force * 0.02;
                    this.vy += Math.sin(pullAngle) * force * 0.02;
                }
            }

            applyEarthquake() {
                if (!earthquakeEnabled) return;
                
                this.x += earthquakeShake.x;
                this.y += earthquakeShake.y;
            }

            applyThunderShake() {
                if (!thunderEnabled) return;
                
                this.x += thunderShake.x;
                this.y += thunderShake.y;
            }

            updateAging() {
                const lifeRatio = this.life / this.maxLife;
                
                if (sizeOverLife !== 'off') {
                    if (sizeOverLife === 'shrink') {
                        this.size = this.initialSize * lifeRatio;
                    } else if (sizeOverLife === 'grow') {
                        this.size = this.initialSize * (2 - lifeRatio);
                    } else if (sizeOverLife === 'pulse') {
                        this.size = this.initialSize * (1 + Math.sin(this.age * 10) * 0.3);
                    }
                }

                if (colorOverLife !== 'off') {
                    if (colorOverLife === 'fade') {
                        const alpha = lifeRatio;
                        const rgb = this.hexToRgb(this.initialColor);
                        this.color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
                    } else if (colorOverLife === 'shift') {
                        const hue = (this.age * 50) % 360;
                        this.color = `hsl(${hue}, 70%, 60%)`;
                    } else if (colorOverLife === 'heat') {
                        const heat = lifeRatio;
                        const r = Math.min(255, heat * 255);
                        const g = Math.min(255, (1 - Math.abs(heat - 0.5) * 2) * 255);
                        const b = Math.max(0, (1 - heat) * 255);
                        this.color = `rgb(${r}, ${g}, ${b})`;
                    }
                }
            }

            hexToRgb(hex) {
                const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : { r: 74, g: 158, b: 255 };
            }

            draw() {
                if (trailLength > 0 && this.history.length > 1) {
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = this.size * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let i = 1; i < this.history.length; i++) {
                        const alpha = (this.history[i].life / this.maxLife) * trailOpacity;
                        ctx.globalAlpha = alpha;
                        ctx.lineTo(this.history[i].x, this.history[i].y);
                    }
                    ctx.stroke();
                }

                if (velocityViz) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(this.x + this.vx * 5, this.y + this.vy * 5);
                    ctx.stroke();
                }

                ctx.globalAlpha = this.life;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                
                ctx.fillStyle = this.color;
                ctx.beginPath();
                
                switch(this.shape) {
                    case 'square':
                        ctx.rect(-this.size, -this.size, this.size * 2, this.size * 2);
                        break;
                    case 'triangle':
                        ctx.moveTo(0, -this.size);
                        ctx.lineTo(-this.size, this.size);
                        ctx.lineTo(this.size, this.size);
                        ctx.closePath();
                        break;
                    case 'star':
                        for (let i = 0; i < 5; i++) {
                            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                            const x = Math.cos(angle) * this.size;
                            const y = Math.sin(angle) * this.size;
                            if (i === 0) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                            
                            const innerAngle = angle + Math.PI / 5;
                            const innerX = Math.cos(innerAngle) * this.size * 0.5;
                            const innerY = Math.sin(innerAngle) * this.size * 0.5;
                            ctx.lineTo(innerX, innerY);
                        }
                        ctx.closePath();
                        break;
                    case 'line':
                        ctx.moveTo(-this.size, 0);
                        ctx.lineTo(this.size, 0);
                        ctx.lineWidth = this.size * 0.3;
                        ctx.stroke();
                        ctx.restore();
                        return;
                    default:
                        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                }
                
                ctx.fill();
                
                ctx.globalAlpha = this.life * 0.4;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = this.size * 2;
                if (this.shape !== 'line') {
                    ctx.beginPath();
                    if (this.shape === 'circle') {
                        ctx.arc(0, 0, this.size * 0.6, 0, Math.PI * 2);
                    } else {
                        ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
                    }
                    ctx.fill();
                }
                ctx.shadowBlur = 0;
                
                ctx.restore();
            }
        }

        function getParticleColor() {
            switch(colorMode) {
                case 'random':
                    return colors[Math.floor(Math.random() * colors.length)];
                case 'gradient':
                    const hue = (Date.now() * 0.001 + particles.length * 0.01) % 360;
                    return `hsl(${hue}, 70%, 60%)`;
                case 'rainbow':
                    const index = particles.length % colors.length;
                    return colors[index];
                case 'age':
                    const ageHue = (particles.length * 2) % 360;
                    return `hsl(${ageHue}, 70%, 60%)`;
                case 'velocity':
                    const vel = Math.sqrt(particles[particles.length - 1]?.vx ** 2 + particles[particles.length - 1]?.vy ** 2) || 0;
                    const velHue = (vel * 20) % 360;
                    return `hsl(${velHue}, 70%, 60%)`;
                default:
                    return currentColor;
            }
        }

        function spawnParticles(x, y, count, modeType) {
            for (let i = 0; i < count; i++) {
                let vx, vy;
                
                if (modeType === 'explosion') {
                    const angle = (Math.PI * 2 * i) / count;
                    const speed = Math.random() * 10 + 5;
                    vx = Math.cos(angle) * speed;
                    vy = Math.sin(angle) * speed;
                } else if (modeType === 'fountain') {
                    vx = (Math.random() - 0.5) * 3;
                    vy = -Math.random() * 10 - 5;
                } else if (modeType === 'spiral') {
                    const angle = (Math.PI * 2 * i) / count;
                    const radius = i * 0.5;
                    vx = Math.cos(angle) * radius;
                    vy = Math.sin(angle) * radius;
                } else if (modeType === 'rain') {
                    vx = (Math.random() - 0.5) * 2;
                    vy = Math.random() * 5 + 3;
                } else {
                    vx = (Math.random() - 0.5) * 5;
                    vy = (Math.random() - 0.5) * 5;
                }
                
                const color = getParticleColor();
                particles.push(new Particle(x, y, color, vx, vy));
            }
        }

        function drawConnections() {
            if (!connectionsEnabled || particles.length === 0) return;
            
            const maxConnections = devMode ? particles.length : Math.min(particles.length, 100);
            const checked = new Set();
            
            for (let i = 0; i < maxConnections; i++) {
                const p1 = particles[i];
                const maxJ = devMode ? particles.length : Math.min(particles.length, i + 20);
                for (let j = i + 1; j < maxJ; j++) {
                    const p2 = particles[j];
                    const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
                    if (checked.has(key)) continue;
                    checked.add(key);
                    
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.2 * Math.min(p1.life, p2.life);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
        }

        function getBackgroundColor() {
            if (currentMap === 'space') {
                return 'rgba(5, 5, 15, 0.1)';
            } else if (currentMap === 'moon') {
                return 'rgba(40, 40, 50, 0.15)';
            } else if (currentMap === 'mars') {
                return 'rgba(60, 30, 20, 0.15)';
            } else {
                switch(backgroundMode) {
                    case 'black': return 'rgba(0, 0, 0, 0.2)';
                    case 'gray': return 'rgba(30, 30, 30, 0.15)';
                    default: return 'rgba(10, 10, 10, 0.15)';
                }
            }
        }

        function switchMap(map) {
            window.spaceStars = null;
            window.spaceNebulas = null;
            window.spacePlanets = null;
            window.spaceAsteroids = null;
            window.moonStars = null;
            window.moonRocks = null;
            window.moonCraters = null;
            window.moonSurface = null;
            window.marsDust = null;
            window.marsCraters = null;
            window.earthClouds = null;
            window.earthTerrain = null;
            window.voidParticles = null;
            window.voidEnergy = null;
            window.whiteGrid = null;
            window.whiteCorners = null;
            window.greenPatterns = null;
            window.greenGrid = null;
            
            if (map === 'space') {
                gravity = 0;
                backgroundMode = 'dark';
                currentColor = '#4a9eff';
                document.getElementById('gravity').value = 0;
                document.getElementById('gravityValue').textContent = '0.00';
            } else if (map === 'moon') {
                gravity = 0.16;
                backgroundMode = 'gray';
                currentColor = '#c0c0c0';
                document.getElementById('gravity').value = 0.16;
                document.getElementById('gravityValue').textContent = '0.16';
            } else if (map === 'mars') {
                gravity = 0.38;
                backgroundMode = 'dark';
                currentColor = '#cd5c5c';
                document.getElementById('gravity').value = 0.38;
                document.getElementById('gravityValue').textContent = '0.38';
            } else if (map === 'void') {
                gravity = 0;
                backgroundMode = 'black';
                currentColor = '#ffffff';
                document.getElementById('gravity').value = 0;
                document.getElementById('gravityValue').textContent = '0.00';
            } else if (map === 'white') {
                gravity = 0.1;
                backgroundMode = 'gray';
                currentColor = '#000000';
                document.getElementById('gravity').value = 0.1;
                document.getElementById('gravityValue').textContent = '0.10';
            } else if (map === 'green') {
                gravity = 0.1;
                backgroundMode = 'dark';
                currentColor = '#00ff00';
                document.getElementById('gravity').value = 0.1;
                document.getElementById('gravityValue').textContent = '0.10';
            } else {
                gravity = 0.1;
                backgroundMode = 'dark';
                currentColor = '#4a9eff';
                document.getElementById('gravity').value = 0.1;
                document.getElementById('gravityValue').textContent = '0.10';
            }
            
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            const colorBtns = document.querySelectorAll('.color-btn');
            for (let i = 0; i < colorBtns.length; i++) {
                if (colorBtns[i].style.background === currentColor) {
                    colorBtns[i].classList.add('active');
                    break;
                }
            }
            document.getElementById('customColor').value = currentColor;
        }

        canvas.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                mouseDown = true;
                mouseX = e.clientX;
                mouseY = e.clientY;
                lastMouseX = mouseX;
                lastMouseY = mouseY;
                
                const part = getRagdollPartAt(mouseX, mouseY);
                if (part) {
                    grabbedRagdollPart = part;
                    grabOffsetX = mouseX - part.x;
                    grabOffsetY = mouseY - part.y;
                    part.vx = 0;
                    part.vy = 0;
                    if (part.angularVelocity !== undefined) {
                        part.angularVelocity = 0;
                    }
                } else if (buildingMode) {
                    placeBlock(mouseX, mouseY);
                } else if (mode === 'click' || mode === 'explosion' || mode === 'fountain' || mode === 'spiral' || mode === 'rain') {
                    spawnParticles(mouseX, mouseY, particleCount, mode);
                }
            } else if (e.button === 2) {
                rightMouseDown = true;
                mouseX = e.clientX;
                mouseY = e.clientY;
            } else if (e.button === 1) {
                middleMouseDown = true;
                mouseX = e.clientX;
                mouseY = e.clientY;
            }
        });

        canvas.addEventListener('mousemove', (e) => {
            const newMouseX = e.clientX;
            const newMouseY = e.clientY;
            
            if (grabbedRagdollPart) {
                grabbedRagdollPart.x = newMouseX - grabOffsetX;
                grabbedRagdollPart.y = newMouseY - grabOffsetY;
                grabbedRagdollPart.vx = (newMouseX - lastMouseX) * 0.5;
                grabbedRagdollPart.vy = (newMouseY - lastMouseY) * 0.5;
            }
            
            mouseX = newMouseX;
            mouseY = newMouseY;
            lastMouseX = newMouseX;
            lastMouseY = newMouseY;
            
            if (buildingMode && mouseDown && !grabbedRagdollPart) {
                placeBlock(mouseX, mouseY);
            } else if (mouseDown && mode === 'click' && !grabbedRagdollPart) {
                if (devMode || particles.length < maxParticles) {
                    spawnParticles(mouseX, mouseY, 1, 'click');
                }
            }
        });

        canvas.addEventListener('mouseup', (e) => {
            if (e.button === 0) {
                if (grabbedRagdollPart) {
                    const throwSpeed = 1.2;
                    const dx = mouseX - lastMouseX;
                    const dy = mouseY - lastMouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const speed = Math.min(dist * 0.1, 15);
                    const angle = Math.atan2(dy, dx);
                    
                    grabbedRagdollPart.vx = Math.cos(angle) * speed * throwSpeed;
                    grabbedRagdollPart.vy = Math.sin(angle) * speed * throwSpeed;
                    if (grabbedRagdollPart.angularVelocity !== undefined) {
                        grabbedRagdollPart.angularVelocity = (Math.random() - 0.5) * 0.3;
                    }
                    grabbedRagdollPart = null;
                }
                mouseDown = false;
            }
            if (e.button === 2) rightMouseDown = false;
            if (e.button === 1) middleMouseDown = false;
        });

        canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        function clearParticles() {
            particles = [];
            attractors = [];
            repellers = [];
        }

        function saveConfig() {
            const config = {
                particleSize, gravity, friction, interactionForce, connectionDistance,
                particleCount, mode, speed, lifetime, trailLength, trailOpacity,
                mouseForce, backgroundMode, currentMap, particleShape, sizeVariation, windX, windY,
                collisionsEnabled, bounce, emitterMode, emitRate, colorMode, currentColor,
                magneticField, vortexStrength, noiseAmount, flockingEnabled, sizeOverLife,
                colorOverLife, blendMode, velocityViz, maxParticles, vhsMode, scanlinesIntensity,
                chromaticAberration, filmGrain, vhsTracking, staticNoise, colorBleed, crtCurvature, vhsGlitch,
                tornadoEnabled, tornadoStrength, tornadoSpeed, tornadoSize,
                tsunamiEnabled, tsunamiStrength,
                volcanoEnabled, volcanoIntensity,
                thunderEnabled, thunderFreq,
                rainEnabled, rainIntensity,
                snowEnabled, snowIntensity,
                hurricaneEnabled, hurricaneStrength,
                earthquakeEnabled, earthquakeIntensity
            };
            const json = JSON.stringify(config, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'particle-sandbox-config.json';
            a.click();
            URL.revokeObjectURL(url);
        }

        function loadConfig() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        try {
                            const config = JSON.parse(event.target.result);
                            
                            if (config.particleSize !== undefined) particleSize = config.particleSize;
                            if (config.gravity !== undefined) gravity = config.gravity;
                            if (config.friction !== undefined) friction = config.friction;
                            if (config.interactionForce !== undefined) interactionForce = config.interactionForce;
                            if (config.connectionDistance !== undefined) connectionDistance = config.connectionDistance;
                            if (config.particleCount !== undefined) particleCount = config.particleCount;
                            if (config.mode !== undefined) mode = config.mode;
                            if (config.speed !== undefined) speed = config.speed;
                            if (config.lifetime !== undefined) lifetime = config.lifetime;
                            if (config.trailLength !== undefined) trailLength = config.trailLength;
                            if (config.trailOpacity !== undefined) trailOpacity = config.trailOpacity;
                            if (config.mouseForce !== undefined) mouseForce = config.mouseForce;
                            if (config.backgroundMode !== undefined) backgroundMode = config.backgroundMode;
                            if (config.currentMap !== undefined) {
                                currentMap = config.currentMap;
                                switchMap(currentMap);
                            }
                            if (config.particleShape !== undefined) particleShape = config.particleShape;
                            if (config.sizeVariation !== undefined) sizeVariation = config.sizeVariation;
                            if (config.windX !== undefined) windX = config.windX;
                            if (config.windY !== undefined) windY = config.windY;
                            if (config.collisionsEnabled !== undefined) collisionsEnabled = config.collisionsEnabled;
                            if (config.bounce !== undefined) bounce = config.bounce;
                            if (config.emitterMode !== undefined) emitterMode = config.emitterMode;
                            if (config.emitRate !== undefined) emitRate = config.emitRate;
                            if (config.colorMode !== undefined) colorMode = config.colorMode;
                            if (config.currentColor !== undefined) currentColor = config.currentColor;
                            if (config.magneticField !== undefined) magneticField = config.magneticField;
                            if (config.vortexStrength !== undefined) vortexStrength = config.vortexStrength;
                            if (config.noiseAmount !== undefined) noiseAmount = config.noiseAmount;
                            if (config.flockingEnabled !== undefined) flockingEnabled = config.flockingEnabled;
                            if (config.sizeOverLife !== undefined) sizeOverLife = config.sizeOverLife;
                            if (config.colorOverLife !== undefined) colorOverLife = config.colorOverLife;
                            if (config.blendMode !== undefined) blendMode = config.blendMode;
                            if (config.velocityViz !== undefined) velocityViz = config.velocityViz;
                            if (config.maxParticles !== undefined) maxParticles = config.maxParticles;
                            if (config.vhsMode !== undefined) vhsMode = config.vhsMode;
                            if (config.scanlinesIntensity !== undefined) scanlinesIntensity = config.scanlinesIntensity;
                            if (config.chromaticAberration !== undefined) chromaticAberration = config.chromaticAberration;
                            if (config.filmGrain !== undefined) filmGrain = config.filmGrain;
                            if (config.vhsTracking !== undefined) vhsTracking = config.vhsTracking;
                            if (config.staticNoise !== undefined) staticNoise = config.staticNoise;
                            if (config.colorBleed !== undefined) colorBleed = config.colorBleed;
                            if (config.crtCurvature !== undefined) crtCurvature = config.crtCurvature;
                            if (config.vhsGlitch !== undefined) vhsGlitch = config.vhsGlitch;
                            if (config.tornadoEnabled !== undefined) tornadoEnabled = config.tornadoEnabled;
                            if (config.tornadoStrength !== undefined) tornadoStrength = config.tornadoStrength;
                            if (config.tornadoSpeed !== undefined) tornadoSpeed = config.tornadoSpeed;
                            if (config.tornadoSize !== undefined) tornadoSize = config.tornadoSize;
                            if (config.tsunamiEnabled !== undefined) tsunamiEnabled = config.tsunamiEnabled;
                            if (config.tsunamiStrength !== undefined) tsunamiStrength = config.tsunamiStrength;
                            if (config.volcanoEnabled !== undefined) volcanoEnabled = config.volcanoEnabled;
                            if (config.volcanoIntensity !== undefined) volcanoIntensity = config.volcanoIntensity;
                            if (config.thunderEnabled !== undefined) thunderEnabled = config.thunderEnabled;
                            if (config.thunderFreq !== undefined) thunderFreq = config.thunderFreq;
                            if (config.rainEnabled !== undefined) rainEnabled = config.rainEnabled;
                            if (config.rainIntensity !== undefined) rainIntensity = config.rainIntensity;
                            if (config.snowEnabled !== undefined) snowEnabled = config.snowEnabled;
                            if (config.snowIntensity !== undefined) snowIntensity = config.snowIntensity;
                            if (config.hurricaneEnabled !== undefined) hurricaneEnabled = config.hurricaneEnabled;
                            if (config.hurricaneStrength !== undefined) hurricaneStrength = config.hurricaneStrength;
                            if (config.earthquakeEnabled !== undefined) earthquakeEnabled = config.earthquakeEnabled;
                            if (config.earthquakeIntensity !== undefined) earthquakeIntensity = config.earthquakeIntensity;
                            
                            if (tornadoEnabled && !tornado) {
                                tornado = { x: canvas.width / 2, y: canvas.height + 50, rotation: 0, path: [], active: true };
                            } else if (!tornadoEnabled) {
                                tornado = null;
                            }
                            if (volcanoEnabled && !volcano) {
                                volcano = { x: canvas.width / 2, y: canvas.height - 20, eruptionTimer: 0, active: true };
                            } else if (!volcanoEnabled) {
                                volcano = null;
                            }
                            if (hurricaneEnabled && !hurricane) {
                                hurricane = { x: canvas.width / 2, y: canvas.height / 2, rotation: 0, active: true };
                            } else if (!hurricaneEnabled) {
                                hurricane = null;
                            }
                            
                            updateUIFromVariables();
                            alert('Configuration loaded!');
                        } catch (error) {
                            alert('Error loading configuration: ' + error.message);
                        }
                    };
                    reader.readAsText(file);
                }
            };
            input.click();
        }

        function exportImage() {
            const link = document.createElement('a');
            link.download = 'particle-sandbox-' + Date.now() + '.png';
            link.href = canvas.toDataURL();
            link.click();
        }

        function exportGIF() {
            if (!gifRecording) {
                gifRecording = true;
                gifFrames = [];
                gifFrameCount = 0;
                alert('Recording GIF... Click Export GIF again to stop and download.');
            } else {
                gifRecording = false;
                alert('GIF recording stopped. Processing frames...');
                setTimeout(() => {
                    alert('GIF export feature requires a library. Use Export Image for screenshots.');
                }, 100);
            }
        }

        function applyVHSEffects() {
            if (!vhsMode && scanlinesIntensity === 0 && chromaticAberration === 0 && 
                filmGrain === 0 && vhsTracking === 0 && staticNoise === 0 && 
                colorBleed === 0 && crtCurvature === 0 && vhsGlitch === 0 && pixelation === 'off') {
                return;
            }

            vhsCanvas.width = canvas.width;
            vhsCanvas.height = canvas.height;
            vhsCtx.drawImage(canvas, 0, 0);

            const imageData = vhsCtx.getImageData(0, 0, vhsCanvas.width, vhsCanvas.height);
            const data = imageData.data;
            const width = vhsCanvas.width;
            const height = vhsCanvas.height;

            glitchTimer++;

            if (chromaticAberration > 0) {
                const offset = chromaticAberration * 4;
                const rData = new Uint8ClampedArray(data);
                const gData = new Uint8ClampedArray(data);
                const bData = new Uint8ClampedArray(data);

                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        const idx = (y * width + x) * 4;
                        const rIdx = (y * width + Math.max(0, Math.min(width - 1, x + offset))) * 4;
                        const bIdx = (y * width + Math.max(0, Math.min(width - 1, x - offset))) * 4;

                        rData[idx] = data[rIdx];
                        gData[idx + 1] = data[idx + 1];
                        bData[idx + 2] = data[bIdx + 2];
                    }
                }

                for (let i = 0; i < data.length; i += 4) {
                    data[i] = rData[i];
                    data[i + 1] = gData[i + 1];
                    data[i + 2] = bData[i + 2];
                }
            }

            if (colorBleed > 0) {
                const bleedAmount = colorBleed * 0.03;
                for (let y = 0; y < height; y++) {
                    for (let x = 1; x < width; x++) {
                        const idx = (y * width + x) * 4;
                        const prevIdx = (y * width + (x - 1)) * 4;
                        data[idx] = data[idx] * (1 - bleedAmount) + data[prevIdx] * bleedAmount;
                    }
                }
            }

            if (filmGrain > 0) {
                const grainAmount = filmGrain * 5;
                for (let i = 0; i < data.length; i += 4) {
                    const noise = (Math.random() - 0.5) * grainAmount;
                    data[i] = Math.max(0, Math.min(255, data[i] + noise));
                    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
                    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
                }
            }

            if (staticNoise > 0) {
                const staticAmount = staticNoise * 0.03;
                for (let i = 0; i < data.length; i += 4) {
                    if (Math.random() < staticAmount) {
                        const val = Math.random() * 255;
                        data[i] = val;
                        data[i + 1] = val;
                        data[i + 2] = val;
                    }
                }
            }

            if (vhsGlitch > 0 && Math.random() < vhsGlitch * 0.02) {
                const glitchHeight = Math.random() * 40 + 10;
                const glitchY = Math.random() * (height - glitchHeight);
                const glitchOffset = (Math.random() - 0.5) * 60;
                for (let y = glitchY; y < Math.min(height, glitchY + glitchHeight); y++) {
                    for (let x = 0; x < width; x++) {
                        const srcX = Math.max(0, Math.min(width - 1, x + glitchOffset));
                        const idx = (y * width + x) * 4;
                        const srcIdx = (y * width + srcX) * 4;
                        data[idx] = data[srcIdx];
                        data[idx + 1] = data[srcIdx + 1];
                        data[idx + 2] = data[srcIdx + 2];
                    }
                }
            }

            vhsCtx.putImageData(imageData, 0, 0);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(vhsCanvas, 0, 0);

            if (scanlinesIntensity > 0) {
                ctx.fillStyle = `rgba(0, 0, 0, ${scanlinesIntensity * 0.02})`;
                for (let y = 0; y < height; y += 2) {
                    ctx.fillRect(0, y, width, 1);
                }
            }

            if (vhsTracking > 0) {
                const trackingLines = Math.floor(vhsTracking * 0.2);
                for (let i = 0; i < trackingLines; i++) {
                    const y = (glitchTimer * 0.5 + i * 50) % height;
                    ctx.strokeStyle = `rgba(255, 0, 0, ${vhsTracking * 0.02})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(width, y);
                    ctx.stroke();
                }
            }

            if (crtCurvature > 0) {
                const curvatureAmount = crtCurvature * 0.01;
                const centerX = width / 2;
                const centerY = height / 2;
                
                ctx.save();
                ctx.globalCompositeOperation = 'source-over';
                
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = width;
                tempCanvas.height = height;
                tempCtx.drawImage(vhsCanvas, 0, 0);
                
                ctx.clearRect(0, 0, width, height);
                
                const segments = Math.max(8, Math.min(32, Math.floor(crtCurvature / 3)));
                const segmentWidth = width / segments;
                const segmentHeight = height / segments;
                
                for (let sy = 0; sy < segments; sy++) {
                    for (let sx = 0; sx < segments; sx++) {
                        const x = sx * segmentWidth;
                        const y = sy * segmentHeight;
                        const dx = (x + segmentWidth / 2) - centerX;
                        const dy = (y + segmentHeight / 2) - centerY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
                        const normalizedDist = dist / maxDist;
                        
                        const curve = Math.pow(normalizedDist, 2) * curvatureAmount * 0.1;
                        const offsetX = dx * curve;
                        const offsetY = dy * curve;
                        
                        const srcX = Math.max(0, Math.min(width - segmentWidth, x + offsetX));
                        const srcY = Math.max(0, Math.min(height - segmentHeight, y + offsetY));
                        
                        ctx.drawImage(
                            tempCanvas,
                            srcX, srcY, segmentWidth, segmentHeight,
                            x, y, segmentWidth, segmentHeight
                        );
                    }
                }
                
                ctx.restore();
            }

            if (pixelation !== 'off') {
                const pixelCanvas = document.createElement('canvas');
                const pixelCtx = pixelCanvas.getContext('2d');
                pixelCanvas.width = Math.floor(width / pixelSize);
                pixelCanvas.height = Math.floor(height / pixelSize);
                
                pixelCtx.drawImage(vhsCanvas, 0, 0, pixelCanvas.width, pixelCanvas.height);
                
                const pixelImageData = pixelCtx.getImageData(0, 0, pixelCanvas.width, pixelCanvas.height);
                const pixelData = pixelImageData.data;
                
                const bits = parseInt(pixelation);
                const levels = Math.pow(2, bits);
                const step = 255 / (levels - 1);
                
                for (let i = 0; i < pixelData.length; i += 4) {
                    const r = Math.floor(pixelData[i] / step) * step;
                    const g = Math.floor(pixelData[i + 1] / step) * step;
                    const b = Math.floor(pixelData[i + 2] / step) * step;
                    
                    pixelData[i] = r;
                    pixelData[i + 1] = g;
                    pixelData[i + 2] = b;
                }
                
                pixelCtx.putImageData(pixelImageData, 0, 0);
                
                ctx.clearRect(0, 0, width, height);
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(pixelCanvas, 0, 0, width, height);
                ctx.imageSmoothingEnabled = true;
            }
        }

        function animate(currentTime) {
            if (!applicationStarted) return;
            
            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;
            
            fpsTimer += deltaTime;
            frameCount++;
            if (fpsTimer >= 1000) {
                fps = (frameCount * 1000) / fpsTimer;
                frameCount = 0;
                fpsTimer = 0;
                updateStats();
            }

            ctx.globalCompositeOperation = 'source-over';
            
            if (buildingMode && snapToGrid) {
                drawGrid();
            }
            
            if (currentMap === 'space') {
                const spaceGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                spaceGradient.addColorStop(0, 'rgba(5, 5, 15, 0.4)');
                spaceGradient.addColorStop(0.3, 'rgba(10, 5, 30, 0.3)');
                spaceGradient.addColorStop(0.6, 'rgba(15, 5, 40, 0.35)');
                spaceGradient.addColorStop(1, 'rgba(5, 5, 15, 0.4)');
                ctx.fillStyle = spaceGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                if (!window.spaceNebulas) {
                    window.spaceNebulas = [];
                    for (let i = 0; i < 4; i++) {
                        window.spaceNebulas.push({
                            x: (canvas.width * 0.15) + (i * canvas.width * 0.28),
                            y: canvas.height * (0.15 + i * 0.22),
                            baseRadius: 120 + Math.random() * 80,
                            color: [100 + i * 15, 50 + i * 8, 150 + i * 25]
                        });
                    }
                }
                
                for (const nebula of window.spaceNebulas) {
                    const nebulaRadius = nebula.baseRadius + Math.sin(Date.now() * 0.0005 + nebula.x * 0.01) * 25;
                    const nebulaGradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebulaRadius);
                    nebulaGradient.addColorStop(0, `rgba(${nebula.color[0]}, ${nebula.color[1]}, ${nebula.color[2]}, 0.35)`);
                    nebulaGradient.addColorStop(0.4, `rgba(${nebula.color[0] - 20}, ${nebula.color[1] - 10}, ${nebula.color[2] - 20}, 0.25)`);
                    nebulaGradient.addColorStop(0.7, `rgba(${nebula.color[0] - 40}, ${nebula.color[1] - 20}, ${nebula.color[2] - 40}, 0.15)`);
                    nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    
                    ctx.fillStyle = nebulaGradient;
                    ctx.beginPath();
                    ctx.arc(nebula.x, nebula.y, nebulaRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                if (!window.spacePlanets) {
                    window.spacePlanets = [];
                    for (let i = 0; i < 3; i++) {
                        window.spacePlanets.push({
                            x: canvas.width * (0.1 + i * 0.4),
                            y: canvas.height * (0.25 + i * 0.3),
                            radius: 35 + i * 15,
                            color: [150 + i * 25, 100 + i * 15, 80 + i * 12],
                            rings: i === 1
                        });
                    }
                }
                
                for (const planet of window.spacePlanets) {
                    const planetGradient = ctx.createRadialGradient(planet.x - planet.radius * 0.3, planet.y - planet.radius * 0.3, 0, planet.x, planet.y, planet.radius);
                    planetGradient.addColorStop(0, `rgba(${planet.color[0]}, ${planet.color[1]}, ${planet.color[2]}, 0.45)`);
                    planetGradient.addColorStop(0.5, `rgba(${planet.color[0] - 30}, ${planet.color[1] - 20}, ${planet.color[2] - 15}, 0.35)`);
                    planetGradient.addColorStop(0.8, `rgba(${planet.color[0] - 50}, ${planet.color[1] - 30}, ${planet.color[2] - 30}, 0.25)`);
                    planetGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                    
                    ctx.fillStyle = planetGradient;
                    ctx.beginPath();
                    ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
                    ctx.fill();
                    
                    if (planet.rings) {
                        ctx.strokeStyle = `rgba(${planet.color[0] - 20}, ${planet.color[1] - 15}, ${planet.color[2] - 10}, 0.3)`;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.ellipse(planet.x, planet.y, planet.radius * 1.3, planet.radius * 0.4, 0, 0, Math.PI * 2);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.ellipse(planet.x, planet.y, planet.radius * 1.5, planet.radius * 0.5, 0, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }
                
                if (!window.spaceAsteroids) {
                    window.spaceAsteroids = [];
                    for (let i = 0; i < 25; i++) {
                        window.spaceAsteroids.push({
                            x: Math.random() * canvas.width,
                            y: canvas.height * (0.4 + Math.random() * 0.3),
                            size: 2 + Math.random() * 4,
                            brightness: Math.random() * 0.4 + 0.2,
                            speed: 0.1 + Math.random() * 0.2
                        });
                    }
                }
                
                for (const asteroid of window.spaceAsteroids) {
                    asteroid.x += asteroid.speed;
                    if (asteroid.x > canvas.width + 10) asteroid.x = -10;
                    
                    ctx.fillStyle = `rgba(150, 140, 120, ${asteroid.brightness})`;
                    ctx.beginPath();
                    ctx.arc(asteroid.x, asteroid.y, asteroid.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                if (!window.spaceStars) {
                    window.spaceStars = [];
                    for (let i = 0; i < 250; i++) {
                        window.spaceStars.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            size: Math.random() * 2.5 + 0.3,
                            brightness: Math.random() * 0.7 + 0.3,
                            twinkle: Math.random() * Math.PI * 2,
                            color: Math.random() < 0.12 ? ['rgba(200, 220, 255, ', 'rgba(255, 220, 200, ', 'rgba(220, 255, 220, '][Math.floor(Math.random() * 3)] : 'rgba(255, 255, 255, '
                        });
                    }
                }
                
                for (const star of window.spaceStars) {
                    star.twinkle += 0.03;
                    const twinkleBrightness = star.brightness + Math.sin(star.twinkle) * 0.25;
                    ctx.fillStyle = `${star.color}${Math.max(0.2, Math.min(1, twinkleBrightness))})`;
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (currentMap === 'moon') {
                const moonGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                moonGradient.addColorStop(0, 'rgba(20, 20, 30, 0.3)');
                moonGradient.addColorStop(0.5, 'rgba(40, 40, 50, 0.25)');
                moonGradient.addColorStop(1, 'rgba(50, 50, 60, 0.3)');
                ctx.fillStyle = moonGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                if (!window.moonStars) {
                    window.moonStars = [];
                    for (let i = 0; i < 100; i++) {
                        window.moonStars.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height * 0.65,
                            size: Math.random() * 1.5 + 0.2,
                            brightness: Math.random() * 0.5 + 0.3
                        });
                    }
                }
                
                for (const star of window.moonStars) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                if (!window.moonRocks) {
                    window.moonRocks = [];
                    for (let i = 0; i < 20; i++) {
                        window.moonRocks.push({
                            x: Math.random() * canvas.width,
                            y: canvas.height * (0.65 + Math.random() * 0.35),
                            size: 3 + Math.random() * 6,
                            brightness: Math.random() * 0.3 + 0.2
                        });
                    }
                }
                
                for (const rock of window.moonRocks) {
                    ctx.fillStyle = `rgba(60, 60, 70, ${rock.brightness})`;
                    ctx.beginPath();
                    ctx.arc(rock.x, rock.y, rock.size, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.fillStyle = `rgba(50, 50, 60, ${rock.brightness * 0.7})`;
                    ctx.beginPath();
                    ctx.arc(rock.x - rock.size * 0.3, rock.y - rock.size * 0.3, rock.size * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                if (!window.moonCraters) {
                    window.moonCraters = [];
                    for (let i = 0; i < 20; i++) {
                        window.moonCraters.push({
                            x: Math.random() * canvas.width,
                            y: canvas.height * (0.6 + Math.random() * 0.4),
                            radius: 12 + Math.random() * 30,
                            depth: Math.random() * 0.3 + 0.2
                        });
                    }
                }
                
                for (const crater of window.moonCraters) {
                    const craterGradient = ctx.createRadialGradient(crater.x, crater.y, 0, crater.x, crater.y, crater.radius);
                    craterGradient.addColorStop(0, `rgba(30, 30, 40, ${0.4 + crater.depth})`);
                    craterGradient.addColorStop(0.5, `rgba(45, 45, 55, ${0.3 + crater.depth * 0.4})`);
                    craterGradient.addColorStop(0.7, `rgba(50, 50, 60, ${0.2 + crater.depth * 0.3})`);
                    craterGradient.addColorStop(1, 'rgba(60, 60, 70, 0)');
                    
                    ctx.fillStyle = craterGradient;
                    ctx.beginPath();
                    ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.fillStyle = `rgba(25, 25, 35, ${0.5 + crater.depth})`;
                    ctx.beginPath();
                    ctx.arc(crater.x - crater.radius * 0.3, crater.y - crater.radius * 0.3, crater.radius * 0.4, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.fillStyle = `rgba(35, 35, 45, ${0.3 + crater.depth * 0.3})`;
                    ctx.beginPath();
                    ctx.arc(crater.x + crater.radius * 0.2, crater.y + crater.radius * 0.2, crater.radius * 0.3, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                if (!window.moonSurface) {
                    window.moonSurface = [];
                    for (let i = 0; i < 30; i++) {
                        window.moonSurface.push({
                            x: Math.random() * canvas.width,
                            y: canvas.height * (0.6 + Math.random() * 0.4),
                            size: 1 + Math.random() * 3,
                            brightness: Math.random() * 0.2 + 0.1
                        });
                    }
                }
                
                for (const surface of window.moonSurface) {
                    ctx.fillStyle = `rgba(55, 55, 65, ${surface.brightness})`;
                    ctx.beginPath();
                    ctx.arc(surface.x, surface.y, surface.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (currentMap === 'mars') {
                const marsGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                marsGradient.addColorStop(0, 'rgba(120, 60, 50, 0.2)');
                marsGradient.addColorStop(0.3, 'rgba(140, 70, 60, 0.25)');
                marsGradient.addColorStop(0.6, 'rgba(160, 80, 70, 0.3)');
                marsGradient.addColorStop(1, 'rgba(100, 50, 40, 0.2)');
                ctx.fillStyle = marsGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                if (!window.marsDust) {
                    window.marsDust = [];
                    for (let i = 0; i < 8; i++) {
                        window.marsDust.push({
                            x: (canvas.width * 0.1) + (i * canvas.width * 0.12),
                            y: canvas.height * (0.3 + Math.random() * 0.4),
                            radius: 60 + Math.random() * 50,
                            opacity: 0.08 + Math.random() * 0.08,
                            drift: Math.random() * 0.3
                        });
                    }
                }
                
                for (const dust of window.marsDust) {
                    dust.x += dust.drift;
                    if (dust.x > canvas.width + 100) dust.x = -100;
                    
                    const dustGradient = ctx.createRadialGradient(dust.x, dust.y, 0, dust.x, dust.y, dust.radius);
                    dustGradient.addColorStop(0, `rgba(120, 80, 60, ${dust.opacity})`);
                    dustGradient.addColorStop(0.5, `rgba(100, 60, 50, ${dust.opacity * 0.7})`);
                    dustGradient.addColorStop(1, 'rgba(80, 50, 40, 0)');
                    
                    ctx.fillStyle = dustGradient;
                    ctx.beginPath();
                    ctx.arc(dust.x, dust.y, dust.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                if (!window.marsCraters) {
                    window.marsCraters = [];
                    for (let i = 0; i < 20; i++) {
                        window.marsCraters.push({
                            x: Math.random() * canvas.width,
                            y: canvas.height * (0.6 + Math.random() * 0.4),
                            radius: 12 + Math.random() * 30,
                            depth: Math.random() * 0.3 + 0.2
                        });
                    }
                }
                
                for (const crater of window.marsCraters) {
                    const craterGradient = ctx.createRadialGradient(crater.x, crater.y, 0, crater.x, crater.y, crater.radius);
                    craterGradient.addColorStop(0, `rgba(80, 40, 30, ${0.4 + crater.depth})`);
                    craterGradient.addColorStop(0.5, `rgba(95, 45, 35, ${0.3 + crater.depth * 0.4})`);
                    craterGradient.addColorStop(0.7, `rgba(100, 50, 40, ${0.2 + crater.depth * 0.3})`);
                    craterGradient.addColorStop(1, 'rgba(120, 60, 50, 0)');
                    
                    ctx.fillStyle = craterGradient;
                    ctx.beginPath();
                    ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.fillStyle = `rgba(70, 35, 25, ${0.5 + crater.depth})`;
                    ctx.beginPath();
                    ctx.arc(crater.x - crater.radius * 0.3, crater.y - crater.radius * 0.3, crater.radius * 0.4, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.fillStyle = `rgba(90, 45, 35, ${0.3 + crater.depth * 0.3})`;
                    ctx.beginPath();
                    ctx.arc(crater.x + crater.radius * 0.2, crater.y + crater.radius * 0.2, crater.radius * 0.3, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (currentMap === 'earth') {
                const earthGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                earthGradient.addColorStop(0, 'rgba(255, 165, 0, 0.25)');
                earthGradient.addColorStop(0.2, 'rgba(255, 140, 0, 0.2)');
                earthGradient.addColorStop(0.4, 'rgba(255, 192, 203, 0.18)');
                earthGradient.addColorStop(0.6, 'rgba(255, 218, 185, 0.15)');
                earthGradient.addColorStop(0.8, 'rgba(255, 228, 196, 0.12)');
                earthGradient.addColorStop(1, 'rgba(255, 239, 213, 0.1)');
                ctx.fillStyle = earthGradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                const sunX = canvas.width * 0.15;
                const sunY = canvas.height * 0.2;
                const sunRadius = 50;
                const sunGlowRadius = sunRadius * 2.5;
                
                const sunGlowGradient = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.3, sunX, sunY, sunGlowRadius);
                sunGlowGradient.addColorStop(0, 'rgba(255, 255, 200, 0.4)');
                sunGlowGradient.addColorStop(0.3, 'rgba(255, 220, 150, 0.3)');
                sunGlowGradient.addColorStop(0.6, 'rgba(255, 200, 100, 0.2)');
                sunGlowGradient.addColorStop(1, 'rgba(255, 180, 80, 0)');
                
                ctx.fillStyle = sunGlowGradient;
                ctx.beginPath();
                ctx.arc(sunX, sunY, sunGlowRadius, 0, Math.PI * 2);
                ctx.fill();
                
                const sunGradient = ctx.createRadialGradient(sunX - sunRadius * 0.3, sunY - sunRadius * 0.3, 0, sunX, sunY, sunRadius);
                sunGradient.addColorStop(0, 'rgba(255, 255, 220, 0.9)');
                sunGradient.addColorStop(0.5, 'rgba(255, 240, 180, 0.8)');
                sunGradient.addColorStop(1, 'rgba(255, 200, 100, 0.7)');
                
                ctx.fillStyle = sunGradient;
                ctx.beginPath();
                ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
                ctx.fill();
                
                if (!window.earthClouds) {
                    window.earthClouds = [];
                    for (let i = 0; i < 10; i++) {
                        window.earthClouds.push({
                            x: (canvas.width * 0.08) + (i * canvas.width * 0.1),
                            y: canvas.height * (0.1 + Math.random() * 0.35),
                            size: 50 + Math.random() * 45,
                            layers: 2 + Math.floor(Math.random() * 2)
                        });
                    }
                }
                
                for (const cloud of window.earthClouds) {
                    for (let layer = 0; layer < cloud.layers; layer++) {
                        const layerX = cloud.x + (layer - 0.5) * cloud.size * 0.3;
                        const layerY = cloud.y + (layer - 0.5) * cloud.size * 0.2;
                        const layerSize = cloud.size * (0.7 + layer * 0.3);
                        
                        const cloudGradient = ctx.createRadialGradient(layerX, layerY, 0, layerX, layerY, layerSize);
                        cloudGradient.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
                        cloudGradient.addColorStop(0.4, 'rgba(255, 245, 240, 0.12)');
                        cloudGradient.addColorStop(0.7, 'rgba(255, 230, 220, 0.08)');
                        cloudGradient.addColorStop(1, 'rgba(255, 220, 200, 0)');
                        
                        ctx.fillStyle = cloudGradient;
                        ctx.beginPath();
                        ctx.arc(layerX, layerY, layerSize, 0, Math.PI * 2);
                        ctx.fill();
                        
                        ctx.beginPath();
                        ctx.arc(layerX + layerSize * 0.4, layerY, layerSize * 0.6, 0, Math.PI * 2);
                        ctx.fill();
                        
                        ctx.beginPath();
                        ctx.arc(layerX - layerSize * 0.4, layerY, layerSize * 0.55, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                
                if (!window.earthTerrain) {
                    window.earthTerrain = [];
                    for (let i = 0; i < 16; i++) {
                        window.earthTerrain.push({
                            x: (canvas.width * 0.03) + (i * canvas.width * 0.06),
                            y: canvas.height * (0.7 + Math.random() * 0.25),
                            height: 25 + Math.random() * 45,
                            color: `rgba(${34 + Math.random() * 25}, ${139 + Math.random() * 35}, ${34 + Math.random() * 25}, 0.35)`
                        });
                    }
                }
                
                ctx.fillStyle = 'rgba(34, 139, 34, 0.25)';
                ctx.beginPath();
                ctx.moveTo(0, canvas.height);
                for (const terrain of window.earthTerrain) {
                    ctx.lineTo(terrain.x, terrain.y);
                }
                ctx.lineTo(canvas.width, canvas.height);
                ctx.closePath();
                ctx.fill();
                
                for (const terrain of window.earthTerrain) {
                    if (terrain.height > 30) {
                        ctx.fillStyle = terrain.color;
                        ctx.beginPath();
                        ctx.moveTo(terrain.x - 15, terrain.y);
                        ctx.lineTo(terrain.x, terrain.y - terrain.height * 0.8);
                        ctx.lineTo(terrain.x + 15, terrain.y);
                        ctx.closePath();
                        ctx.fill();
                    }
                }
                
                const horizonGradient = ctx.createLinearGradient(0, canvas.height * 0.65, 0, canvas.height);
                horizonGradient.addColorStop(0, 'rgba(255, 200, 150, 0.15)');
                horizonGradient.addColorStop(1, 'rgba(255, 180, 120, 0)');
                ctx.fillStyle = horizonGradient;
                ctx.fillRect(0, canvas.height * 0.65, canvas.width, canvas.height * 0.35);
            } else if (currentMap === 'void') {
                ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                if (!window.voidParticles) {
                    window.voidParticles = [];
                    for (let i = 0; i < 50; i++) {
                        window.voidParticles.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            size: Math.random() * 1.2 + 0.2,
                            brightness: Math.random() * 0.4 + 0.1,
                            speed: Math.random() * 0.6 + 0.2,
                            trail: []
                        });
                    }
                }
                
                for (const particle of window.voidParticles) {
                    particle.trail.push({ x: particle.x, y: particle.y });
                    if (particle.trail.length > 5) particle.trail.shift();
                    
                    particle.x += (Math.random() - 0.5) * particle.speed;
                    particle.y += (Math.random() - 0.5) * particle.speed;
                    
                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.x > canvas.width) particle.x = 0;
                    if (particle.y < 0) particle.y = canvas.height;
                    if (particle.y > canvas.height) particle.y = 0;
                    
                    for (let i = 0; i < particle.trail.length; i++) {
                        const trailPoint = particle.trail[i];
                        const trailAlpha = (i / particle.trail.length) * particle.brightness * 0.5;
                        ctx.fillStyle = `rgba(255, 255, 255, ${trailAlpha})`;
                        ctx.beginPath();
                        ctx.arc(trailPoint.x, trailPoint.y, particle.size * (i / particle.trail.length), 0, Math.PI * 2);
                        ctx.fill();
                    }
                    
                    ctx.fillStyle = `rgba(255, 255, 255, ${particle.brightness})`;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                if (!window.voidEnergy) {
                    window.voidEnergy = [];
                    for (let i = 0; i < 8; i++) {
                        window.voidEnergy.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            radius: 30 + Math.random() * 40,
                            brightness: Math.random() * 0.15 + 0.05,
                            pulse: Math.random() * Math.PI * 2
                        });
                    }
                }
                
                for (const energy of window.voidEnergy) {
                    energy.pulse += 0.02;
                    const pulseRadius = energy.radius + Math.sin(energy.pulse) * 10;
                    const pulseBrightness = energy.brightness + Math.sin(energy.pulse) * 0.05;
                    
                    const energyGradient = ctx.createRadialGradient(energy.x, energy.y, 0, energy.x, energy.y, pulseRadius);
                    energyGradient.addColorStop(0, `rgba(200, 200, 255, ${pulseBrightness})`);
                    energyGradient.addColorStop(0.5, `rgba(150, 150, 200, ${pulseBrightness * 0.7})`);
                    energyGradient.addColorStop(1, 'rgba(100, 100, 150, 0)');
                    
                    ctx.fillStyle = energyGradient;
                    ctx.beginPath();
                    ctx.arc(energy.x, energy.y, pulseRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (currentMap === 'white') {
                ctx.fillStyle = 'rgba(240, 240, 240, 0.3)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                if (!window.whiteGrid) {
                    window.whiteGrid = {
                        vertical: [],
                        horizontal: []
                    };
                    for (let i = 0; i < 5; i++) {
                        window.whiteGrid.vertical.push((canvas.width * 0.15) + (i * canvas.width * 0.2));
                    }
                    for (let i = 0; i < 4; i++) {
                        window.whiteGrid.horizontal.push((canvas.height * 0.2) + (i * canvas.height * 0.25));
                    }
                }
                
                for (const lineX of window.whiteGrid.vertical) {
                    ctx.strokeStyle = 'rgba(220, 220, 220, 0.35)';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(lineX, 0);
                    ctx.lineTo(lineX, canvas.height);
                    ctx.stroke();
                    
                    ctx.strokeStyle = 'rgba(200, 200, 200, 0.2)';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(lineX - 20, 0);
                    ctx.lineTo(lineX - 20, canvas.height);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(lineX + 20, 0);
                    ctx.lineTo(lineX + 20, canvas.height);
                    ctx.stroke();
                }
                
                for (const lineY of window.whiteGrid.horizontal) {
                    ctx.strokeStyle = 'rgba(220, 220, 220, 0.35)';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(0, lineY);
                    ctx.lineTo(canvas.width, lineY);
                    ctx.stroke();
                    
                    ctx.strokeStyle = 'rgba(200, 200, 200, 0.2)';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(0, lineY - 20);
                    ctx.lineTo(canvas.width, lineY - 20);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(0, lineY + 20);
                    ctx.lineTo(canvas.width, lineY + 20);
                    ctx.stroke();
                }
                
                if (!window.whiteCorners) {
                    window.whiteCorners = [];
                    for (let i = 0; i < 4; i++) {
                        window.whiteCorners.push({
                            x: i % 2 === 0 ? 0 : canvas.width,
                            y: i < 2 ? 0 : canvas.height,
                            size: 80 + Math.random() * 40
                        });
                    }
                }
                
                for (const corner of window.whiteCorners) {
                    const cornerGradient = ctx.createRadialGradient(corner.x, corner.y, 0, corner.x, corner.y, corner.size);
                    cornerGradient.addColorStop(0, 'rgba(250, 250, 250, 0.2)');
                    cornerGradient.addColorStop(0.5, 'rgba(240, 240, 240, 0.1)');
                    cornerGradient.addColorStop(1, 'rgba(230, 230, 230, 0)');
                    ctx.fillStyle = cornerGradient;
                    ctx.beginPath();
                    ctx.arc(corner.x, corner.y, corner.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (currentMap === 'green') {
                ctx.fillStyle = 'rgba(0, 200, 0, 0.3)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                if (!window.greenPatterns) {
                    window.greenPatterns = [];
                    for (let i = 0; i < 8; i++) {
                        window.greenPatterns.push({
                            x: (canvas.width * 0.1) + (i * canvas.width * 0.12),
                            y: canvas.height * (0.15 + Math.random() * 0.7),
                            size: 35 + Math.random() * 35,
                            layers: 2 + Math.floor(Math.random() * 2),
                            pulse: Math.random() * Math.PI * 2
                        });
                    }
                }
                
                for (const pattern of window.greenPatterns) {
                    pattern.pulse += 0.015;
                    const pulseSize = pattern.size + Math.sin(pattern.pulse) * 8;
                    
                    for (let layer = 0; layer < pattern.layers; layer++) {
                        const layerX = pattern.x + (layer - 0.5) * pattern.size * 0.4;
                        const layerY = pattern.y + (layer - 0.5) * pattern.size * 0.3;
                        const layerSize = pulseSize * (0.6 + layer * 0.4);
                        
                        const patternGradient = ctx.createRadialGradient(layerX, layerY, 0, layerX, layerY, layerSize);
                        patternGradient.addColorStop(0, `rgba(0, ${180 - layer * 10}, 0, ${0.25 - layer * 0.05})`);
                        patternGradient.addColorStop(0.4, `rgba(0, ${200 - layer * 10}, 0, ${0.18 - layer * 0.04})`);
                        patternGradient.addColorStop(0.7, `rgba(0, ${220 - layer * 10}, 0, ${0.12 - layer * 0.03})`);
                        patternGradient.addColorStop(1, 'rgba(0, 240, 0, 0)');
                        
                        ctx.fillStyle = patternGradient;
                        ctx.beginPath();
                        ctx.arc(layerX, layerY, layerSize, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                
                if (!window.greenGrid) {
                    window.greenGrid = [];
                    for (let i = 0; i < 6; i++) {
                        window.greenGrid.push({
                            x: (canvas.width * 0.12) + (i * canvas.width * 0.15),
                            y: canvas.height * (0.2 + Math.random() * 0.6),
                            length: 40 + Math.random() * 30,
                            angle: Math.random() * Math.PI * 2
                        });
                    }
                }
                
                for (const grid of window.greenGrid) {
                    ctx.strokeStyle = `rgba(0, ${180 + Math.random() * 40}, 0, 0.2)`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(grid.x, grid.y);
                    ctx.lineTo(grid.x + Math.cos(grid.angle) * grid.length, grid.y + Math.sin(grid.angle) * grid.length);
                    ctx.stroke();
                }
            } else {
                ctx.fillStyle = getBackgroundColor();
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            
            if (blendMode !== 'normal') {
                ctx.globalCompositeOperation = blendMode;
            }

            if (mode === 'auto') {
                autoSpawnTimer++;
                if (autoSpawnTimer > 30) {
                    autoSpawnTimer = 0;
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    spawnParticles(x, y, particleCount, 'click');
                }
            }

            if (mode === 'rain') {
                autoSpawnTimer++;
                if (autoSpawnTimer > 5) {
                    autoSpawnTimer = 0;
                    const x = Math.random() * canvas.width;
                    spawnParticles(x, -10, 1, 'rain');
                }
            }

            if (emitterMode !== 'off') {
                emitTimer++;
                if (emitTimer >= (60 / emitRate)) {
                    emitTimer = 0;
                    let x, y;
                    switch(emitterMode) {
                        case 'mouse':
                            x = mouseX;
                            y = mouseY;
                            break;
                        case 'center':
                            x = canvas.width / 2;
                            y = canvas.height / 2;
                            break;
                        case 'random':
                            x = Math.random() * canvas.width;
                            y = Math.random() * canvas.height;
                            break;
                    }
            if (devMode || particles.length < maxParticles) {
                    spawnParticles(x, y, 1, 'click');
                }
                }
            }

            particles = particles.filter(p => p.life > 0);
            
            if (!devMode && particles.length > maxParticles) {
                particles = particles.slice(-maxParticles);
            }

            if (blockPhysicsEnabled) {
                placedBlocks.forEach((block, index) => {
                    block.vy += gravity * 0.5;
                    block.vx *= friction;
                    block.vy *= friction;
                    block.angularVelocity *= 0.98;
                    
                    block.x += block.vx;
                    block.y += block.vy;
                    block.rotation += block.angularVelocity;
                    
                    if (block.y + block.size / 2 > canvas.height) {
                        block.y = canvas.height - block.size / 2;
                        block.vy *= -0.6;
                        block.vx *= 0.8;
                        if (block.material === 'breakable') {
                            block.health -= 5;
                        }
                    }
                    
                    if (block.x - block.size / 2 < 0) {
                        block.x = block.size / 2;
                        block.vx *= -0.6;
                    }
                    if (block.x + block.size / 2 > canvas.width) {
                        block.x = canvas.width - block.size / 2;
                        block.vx *= -0.6;
                    }
                    
                    for (let i = index + 1; i < placedBlocks.length; i++) {
                        const other = placedBlocks[i];
                        const dx = block.x - other.x;
                        const dy = block.y - other.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const minDist = (block.size + other.size) / 2;
                        
                        if (dist < minDist && dist > 0) {
                            const overlap = minDist - dist;
                            const angle = Math.atan2(dy, dx);
                            const moveX = Math.cos(angle) * overlap * 0.5;
                            const moveY = Math.sin(angle) * overlap * 0.5;
                            
                            block.x += moveX;
                            block.y += moveY;
                            other.x -= moveX;
                            other.y -= moveY;
                            
                            const relativeVx = block.vx - other.vx;
                            const relativeVy = block.vy - other.vy;
                            const separationVx = Math.cos(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                            const separationVy = Math.sin(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                            
                            block.vx -= separationVx * 0.3;
                            block.vy -= separationVy * 0.3;
                            other.vx += separationVx * 0.3;
                            other.vy += separationVy * 0.3;
                            
                            if (block.material === 'breakable') {
                                block.health -= 2;
                            }
                            if (other.material === 'breakable') {
                                other.health -= 2;
                            }
                        }
                    }
                    
                    conveyors.forEach(conveyor => {
                        const distX = Math.abs(block.x - conveyor.x);
                        const distY = Math.abs(block.y - conveyor.y);
                        
                        let isOnConveyor = false;
                        if (conveyor.direction === 'right' || conveyor.direction === 'left') {
                            isOnConveyor = distX < conveyor.width / 2 + block.size / 2 && distY < conveyor.height / 2 + block.size / 2;
                        } else {
                            isOnConveyor = distX < conveyor.width / 2 + block.size / 2 && distY < conveyor.height / 2 + block.size / 2;
                        }
                        
                        if (isOnConveyor) {
                            let pushX = 0, pushY = 0;
                            switch(conveyor.direction) {
                                case 'right':
                                    pushX = conveyor.speed;
                                    break;
                                case 'left':
                                    pushX = -conveyor.speed;
                                    break;
                                case 'up':
                                    pushY = -conveyor.speed;
                                    break;
                                case 'down':
                                    pushY = conveyor.speed;
                                    break;
                            }
                            block.vx += pushX * 0.1;
                            block.vy += pushY * 0.1;
                        }
                    });
                });
                
                placedBlocks = placedBlocks.filter(block => block.health > 0);
            }

            ragdolls.forEach(ragdoll => {
                ragdoll.parts.forEach(part => {
                    if (part !== grabbedRagdollPart) {
                        part.vy += gravity * 0.5;
                        part.vx *= 0.985;
                        part.vy *= 0.985;
                        if (part.angularVelocity !== undefined) {
                            part.angularVelocity *= 0.98;
                            part.rotation += part.angularVelocity;
                        }
                        
                        part.x += part.vx;
                        part.y += part.vy;
                    }
                    
                    ragdoll.parts.forEach(otherPart => {
                        if (part !== otherPart && part !== grabbedRagdollPart && otherPart !== grabbedRagdollPart) {
                            let dist, minDist, dx, dy;
                            
                            if (part.type === 'head' && otherPart.type === 'head') {
                                dx = part.x - otherPart.x;
                                dy = part.y - otherPart.y;
                                dist = Math.sqrt(dx * dx + dy * dy);
                                minDist = part.radius + otherPart.radius;
                                
                                if (dist < minDist && dist > 0) {
                                    const overlap = minDist - dist;
                                    const angle = Math.atan2(dy, dx);
                                    const moveX = Math.cos(angle) * overlap * 0.5;
                                    const moveY = Math.sin(angle) * overlap * 0.5;
                                    
                                    part.x += moveX;
                                    part.y += moveY;
                                    otherPart.x -= moveX;
                                    otherPart.y -= moveY;
                                    
                                    const relativeVx = part.vx - otherPart.vx;
                                    const relativeVy = part.vy - otherPart.vy;
                                    const separationVx = Math.cos(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                                    const separationVy = Math.sin(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                                    
                                    part.vx -= separationVx * 0.3;
                                    part.vy -= separationVy * 0.3;
                                    otherPart.vx += separationVx * 0.3;
                                    otherPart.vy += separationVy * 0.3;
                                }
                            } else if (part.type === 'head' && otherPart.type !== 'head') {
                                const cos = Math.cos(otherPart.rotation || 0);
                                const sin = Math.sin(otherPart.rotation || 0);
                                const halfW = otherPart.width / 2;
                                const halfH = otherPart.height / 2;
                                
                                const closestX = Math.max(otherPart.x - halfW, Math.min(part.x, otherPart.x + halfW));
                                const closestY = Math.max(otherPart.y - halfH, Math.min(part.y, otherPart.y + halfH));
                                
                                const rotX = (closestX - otherPart.x) * cos + (closestY - otherPart.y) * sin;
                                const rotY = -(closestX - otherPart.x) * sin + (closestY - otherPart.y) * cos;
                                
                                if (Math.abs(rotX) < halfW && Math.abs(rotY) < halfH) {
                                    dx = part.x - closestX;
                                    dy = part.y - closestY;
                                    dist = Math.sqrt(dx * dx + dy * dy);
                                    minDist = part.radius;
                                    
                                    if (dist < minDist && dist > 0) {
                                        const overlap = minDist - dist;
                                        const angle = Math.atan2(dy, dx);
                                        const moveX = Math.cos(angle) * overlap * 0.5;
                                        const moveY = Math.sin(angle) * overlap * 0.5;
                                        
                                        part.x += moveX;
                                        part.y += moveY;
                                        otherPart.x -= moveX * 0.5;
                                        otherPart.y -= moveY * 0.5;
                                        
                                        const relativeVx = part.vx - otherPart.vx;
                                        const relativeVy = part.vy - otherPart.vy;
                                        const separationVx = Math.cos(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                                        const separationVy = Math.sin(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                                        
                                        part.vx -= separationVx * 0.3;
                                        part.vy -= separationVy * 0.3;
                                        otherPart.vx += separationVx * 0.2;
                                        otherPart.vy += separationVy * 0.2;
                                    }
                                }
                            } else if (part.type !== 'head' && otherPart.type === 'head') {
                                const cos = Math.cos(part.rotation || 0);
                                const sin = Math.sin(part.rotation || 0);
                                const halfW = part.width / 2;
                                const halfH = part.height / 2;
                                
                                const closestX = Math.max(part.x - halfW, Math.min(otherPart.x, part.x + halfW));
                                const closestY = Math.max(part.y - halfH, Math.min(otherPart.y, part.y + halfH));
                                
                                const rotX = (closestX - part.x) * cos + (closestY - part.y) * sin;
                                const rotY = -(closestX - part.x) * sin + (closestY - part.y) * cos;
                                
                                if (Math.abs(rotX) < halfW && Math.abs(rotY) < halfH) {
                                    dx = closestX - otherPart.x;
                                    dy = closestY - otherPart.y;
                                    dist = Math.sqrt(dx * dx + dy * dy);
                                    minDist = otherPart.radius;
                                    
                                    if (dist < minDist && dist > 0) {
                                        const overlap = minDist - dist;
                                        const angle = Math.atan2(dy, dx);
                                        const moveX = Math.cos(angle) * overlap * 0.5;
                                        const moveY = Math.sin(angle) * overlap * 0.5;
                                        
                                        part.x -= moveX * 0.5;
                                        part.y -= moveY * 0.5;
                                        otherPart.x += moveX;
                                        otherPart.y += moveY;
                                        
                                        const relativeVx = part.vx - otherPart.vx;
                                        const relativeVy = part.vy - otherPart.vy;
                                        const separationVx = Math.cos(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                                        const separationVy = Math.sin(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                                        
                                        part.vx += separationVx * 0.2;
                                        part.vy += separationVy * 0.2;
                                        otherPart.vx -= separationVx * 0.3;
                                        otherPart.vy -= separationVy * 0.3;
                                    }
                                }
                            } else {
                                const cos1 = Math.cos(part.rotation || 0);
                                const sin1 = Math.sin(part.rotation || 0);
                                const cos2 = Math.cos(otherPart.rotation || 0);
                                const sin2 = Math.sin(otherPart.rotation || 0);
                                
                                const halfW1 = part.width / 2;
                                const halfH1 = part.height / 2;
                                const halfW2 = otherPart.width / 2;
                                const halfH2 = otherPart.height / 2;
                                
                                const dx = part.x - otherPart.x;
                                const dy = part.y - otherPart.y;
                                
                                const corners1 = [
                                    { x: -halfW1, y: -halfH1 },
                                    { x: halfW1, y: -halfH1 },
                                    { x: halfW1, y: halfH1 },
                                    { x: -halfW1, y: halfH1 }
                                ].map(c => ({
                                    x: part.x + c.x * cos1 - c.y * sin1,
                                    y: part.y + c.x * sin1 + c.y * cos1
                                }));
                                
                                const corners2 = [
                                    { x: -halfW2, y: -halfH2 },
                                    { x: halfW2, y: -halfH2 },
                                    { x: halfW2, y: halfH2 },
                                    { x: -halfW2, y: halfH2 }
                                ].map(c => ({
                                    x: otherPart.x + c.x * cos2 - c.y * sin2,
                                    y: otherPart.y + c.x * sin2 + c.y * cos2
                                }));
                                
                                let minDist = Infinity;
                                let closest1 = null;
                                let closest2 = null;
                                
                                for (const c1 of corners1) {
                                    for (const c2 of corners2) {
                                        const d = Math.sqrt((c1.x - c2.x) ** 2 + (c1.y - c2.y) ** 2);
                                        if (d < minDist) {
                                            minDist = d;
                                            closest1 = c1;
                                            closest2 = c2;
                                        }
                                    }
                                }
                                
                                if (minDist < 5 && closest1 && closest2) {
                                    const overlap = 5 - minDist;
                                    const angle = Math.atan2(closest1.y - closest2.y, closest1.x - closest2.x);
                                    const moveX = Math.cos(angle) * overlap * 0.5;
                                    const moveY = Math.sin(angle) * overlap * 0.5;
                                    
                                    part.x += moveX;
                                    part.y += moveY;
                                    otherPart.x -= moveX;
                                    otherPart.y -= moveY;
                                    
                                    const relativeVx = part.vx - otherPart.vx;
                                    const relativeVy = part.vy - otherPart.vy;
                                    const separationVx = Math.cos(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                                    const separationVy = Math.sin(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                                    
                                    part.vx -= separationVx * 0.3;
                                    part.vy -= separationVy * 0.3;
                                    otherPart.vx += separationVx * 0.3;
                                    otherPart.vy += separationVy * 0.3;
                                }
                            }
                        }
                    });
                    
                    placedBlocks.forEach(block => {
                        let partHalfW, partHalfH, partCos, partSin, partCenterX, partCenterY;
                        
                        if (part.type === 'head') {
                            partHalfW = part.radius * 1.6 / 2;
                            partHalfH = part.radius * 1.3 / 2;
                            partCos = Math.cos(part.rotation || 0);
                            partSin = Math.sin(part.rotation || 0);
                            partCenterX = part.x;
                            partCenterY = part.y;
                        } else {
                            partHalfW = part.width / 2;
                            partHalfH = part.height / 2;
                            partCos = Math.cos(part.rotation || 0);
                            partSin = Math.sin(part.rotation || 0);
                            partCenterX = part.x;
                            partCenterY = part.y;
                        }
                        
                        const blockHalfSize = block.size / 2;
                        const blockMinX = block.x - blockHalfSize;
                        const blockMaxX = block.x + blockHalfSize;
                        const blockMinY = block.y - blockHalfSize;
                        const blockMaxY = block.y + blockHalfSize;
                        
                        const partCorners = [
                            { x: -partHalfW, y: -partHalfH },
                            { x: partHalfW, y: -partHalfH },
                            { x: partHalfW, y: partHalfH },
                            { x: -partHalfW, y: partHalfH }
                        ].map(c => ({
                            x: partCenterX + c.x * partCos - c.y * partSin,
                            y: partCenterY + c.x * partSin + c.y * partCos
                        }));
                        
                        const partMinX = Math.min(...partCorners.map(c => c.x));
                        const partMaxX = Math.max(...partCorners.map(c => c.x));
                        const partMinY = Math.min(...partCorners.map(c => c.y));
                        const partMaxY = Math.max(...partCorners.map(c => c.y));
                        
                        if (partMaxX < blockMinX || partMinX > blockMaxX || partMaxY < blockMinY || partMinY > blockMaxY) {
                            return;
                        }
                        
                        let overlapX = 0, overlapY = 0;
                        if (partCenterX < block.x) {
                            overlapX = partMaxX - blockMinX;
                        } else {
                            overlapX = blockMaxX - partMinX;
                        }
                        if (partCenterY < block.y) {
                            overlapY = partMaxY - blockMinY;
                        } else {
                            overlapY = blockMaxY - partMinY;
                        }
                        
                        const minOverlap = Math.min(overlapX, overlapY);
                        if (minOverlap > 0) {
                            let pushX = 0, pushY = 0;
                            if (overlapX < overlapY) {
                                pushX = partCenterX < block.x ? -minOverlap : minOverlap;
                            } else {
                                pushY = partCenterY < block.y ? -minOverlap : minOverlap;
                            }
                            
                            part.x += pushX * 0.5;
                            part.y += pushY * 0.5;
                            
                            if (blockPhysicsEnabled) {
                                block.x -= pushX * 0.5;
                                block.y -= pushY * 0.5;
                                
                                const angle = Math.atan2(pushY, pushX);
                                const relativeVx = part.vx - block.vx;
                                const relativeVy = part.vy - block.vy;
                                const separationVx = Math.cos(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                                const separationVy = Math.sin(angle) * (relativeVx * Math.cos(angle) + relativeVy * Math.sin(angle));
                                
                                part.vx -= separationVx * 0.3;
                                part.vy -= separationVy * 0.3;
                                block.vx += separationVx * 0.3;
                                block.vy += separationVy * 0.3;
                                
                                if (block.material === 'breakable') {
                                    block.health -= 1;
                                }
                            } else {
                                const angle = Math.atan2(pushY, pushX);
                                const speed = Math.sqrt(part.vx * part.vx + part.vy * part.vy);
                                const dot = part.vx * Math.cos(angle) + part.vy * Math.sin(angle);
                                if (dot < 0) {
                                    part.vx -= Math.cos(angle) * dot * 1.8;
                                    part.vy -= Math.sin(angle) * dot * 1.8;
                                }
                            }
                        }
                    });
                    
                    if (part.type === 'head') {
                        if (part.y + part.radius > canvas.height) {
                            part.y = canvas.height - part.radius;
                            part.vy *= -0.4;
                            part.vx *= 0.8;
                        }
                        if (part.x - part.radius < 0) {
                            part.x = part.radius;
                            part.vx *= -0.4;
                        }
                        if (part.x + part.radius > canvas.width) {
                            part.x = canvas.width - part.radius;
                            part.vx *= -0.4;
                        }
                    } else {
                        const cos = Math.cos(part.rotation || 0);
                        const sin = Math.sin(part.rotation || 0);
                        const halfW = part.width / 2;
                        const halfH = part.height / 2;
                        
                        const corners = [
                            { x: -halfW, y: -halfH },
                            { x: halfW, y: -halfH },
                            { x: halfW, y: halfH },
                            { x: -halfW, y: halfH }
                        ].map(c => ({
                            x: part.x + c.x * cos - c.y * sin,
                            y: part.y + c.x * sin + c.y * cos
                        }));
                        
                        let minY = Math.min(...corners.map(c => c.y));
                        let maxY = Math.max(...corners.map(c => c.y));
                        let minX = Math.min(...corners.map(c => c.x));
                        let maxX = Math.max(...corners.map(c => c.x));
                        
                        if (maxY > canvas.height) {
                            const overlap = maxY - canvas.height;
                            part.y -= overlap;
                            part.vy *= -0.4;
                            part.vx *= 0.8;
                        }
                        if (minX < 0) {
                            const overlap = -minX;
                            part.x += overlap;
                            part.vx *= -0.4;
                        }
                        if (maxX > canvas.width) {
                            const overlap = maxX - canvas.width;
                            part.x -= overlap;
                            part.vx *= -0.4;
                        }
                    }
                });
                
                for (let iter = 0; iter < 5; iter++) {
                    ragdoll.joints.forEach(joint => {
                        const p1 = joint.part1;
                        const p2 = joint.part2;
                        const maxDist = joint.maxDist || 5;
                        
                        let p1X = p1.x, p1Y = p1.y;
                        let p2X = p2.x, p2Y = p2.y;
                        
                        if (p1.type === 'head') {
                            p1X += joint.offset1.x;
                            p1Y += joint.offset1.y;
                        } else {
                            const cos1 = Math.cos(p1.rotation || 0);
                            const sin1 = Math.sin(p1.rotation || 0);
                            p1X += joint.offset1.x * cos1 - joint.offset1.y * sin1;
                            p1Y += joint.offset1.x * sin1 + joint.offset1.y * cos1;
                        }
                        
                        if (p2.type === 'head') {
                            p2X += joint.offset2.x;
                            p2Y += joint.offset2.y;
                        } else {
                            const cos2 = Math.cos(p2.rotation || 0);
                            const sin2 = Math.sin(p2.rotation || 0);
                            p2X += joint.offset2.x * cos2 - joint.offset2.y * sin2;
                            p2Y += joint.offset2.x * sin2 + joint.offset2.y * cos2;
                        }
                        
                        const dx = p2X - p1X;
                        const dy = p2Y - p1Y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        
                        if (dist > maxDist) {
                            const stiffness = joint.stiffness || 0.5;
                            const angle = Math.atan2(dy, dx);
                            const moveX = Math.cos(angle) * (dist - maxDist) * stiffness;
                            const moveY = Math.sin(angle) * (dist - maxDist) * stiffness;
                            
                            const totalMass = (p1.mass || 1) + (p2.mass || 1);
                            const p1Ratio = (p2.mass || 1) / totalMass;
                            const p2Ratio = (p1.mass || 1) / totalMass;
                            
                            if (p1 !== grabbedRagdollPart) {
                                p1.x += moveX * p1Ratio;
                                p1.y += moveY * p1Ratio;
                            }
                            if (p2 !== grabbedRagdollPart) {
                                p2.x -= moveX * p2Ratio;
                                p2.y -= moveY * p2Ratio;
                            }
                        }
                    });
                }
                
                ragdolls.forEach(ragdoll => {
                    ragdoll.parts.forEach(part => {
                        if (part === grabbedRagdollPart) return;
                        
                        conveyors.forEach(conveyor => {
                            let isOnConveyor = false;
                            
                            if (part.type === 'head') {
                                const headWidth = part.radius * 1.6;
                                const headHeight = part.radius * 1.3;
                                const distX = Math.abs(part.x - conveyor.x);
                                const distY = Math.abs(part.y - conveyor.y);
                                isOnConveyor = distX < conveyor.width / 2 + headWidth / 2 && distY < conveyor.height / 2 + headHeight / 2;
                            } else {
                                const cos = Math.cos(part.rotation || 0);
                                const sin = Math.sin(part.rotation || 0);
                                const halfW = part.width / 2;
                                const halfH = part.height / 2;
                                
                                const corners = [
                                    { x: -halfW, y: -halfH },
                                    { x: halfW, y: -halfH },
                                    { x: halfW, y: halfH },
                                    { x: -halfW, y: halfH }
                                ].map(c => ({
                                    x: part.x + c.x * cos - c.y * sin,
                                    y: part.y + c.x * sin + c.y * cos
                                }));
                                
                                const minX = Math.min(...corners.map(c => c.x));
                                const maxX = Math.max(...corners.map(c => c.x));
                                const minY = Math.min(...corners.map(c => c.y));
                                const maxY = Math.max(...corners.map(c => c.y));
                                
                                const conveyorMinX = conveyor.x - conveyor.width / 2;
                                const conveyorMaxX = conveyor.x + conveyor.width / 2;
                                const conveyorMinY = conveyor.y - conveyor.height / 2;
                                const conveyorMaxY = conveyor.y + conveyor.height / 2;
                                
                                isOnConveyor = !(maxX < conveyorMinX || minX > conveyorMaxX || maxY < conveyorMinY || minY > conveyorMaxY);
                            }
                            
                            if (isOnConveyor) {
                                let pushX = 0, pushY = 0;
                                switch(conveyor.direction) {
                                    case 'right':
                                        pushX = conveyor.speed;
                                        break;
                                    case 'left':
                                        pushX = -conveyor.speed;
                                        break;
                                    case 'up':
                                        pushY = -conveyor.speed;
                                        break;
                                    case 'down':
                                        pushY = conveyor.speed;
                                        break;
                                }
                                part.vx += pushX * 0.15;
                                part.vy += pushY * 0.15;
                            }
                        });
                    });
                });
            });

            if (gravWavesEnabled) {
                blackHoles.forEach(blackHole => {
                    blackHole.x += blackHole.vx;
                    blackHole.y += blackHole.vy;
                    blackHole.rotation += 0.02;
                    
                    if (blackHole.x < 0 || blackHole.x > canvas.width) blackHole.vx *= -1;
                    if (blackHole.y < 0 || blackHole.y > canvas.height) blackHole.vy *= -1;
                    
                    blackHole.x = Math.max(0, Math.min(canvas.width, blackHole.x));
                    blackHole.y = Math.max(0, Math.min(canvas.height, blackHole.y));
                });
                
                particles.forEach(particle => {
                    blackHoles.forEach(blackHole => {
                        const dx = blackHole.x - particle.x;
                        const dy = blackHole.y - particle.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const minDist = 5;
                        
                        if (dist < minDist) {
                            particle.x = blackHole.x + (Math.random() - 0.5) * 10;
                            particle.y = blackHole.y + (Math.random() - 0.5) * 10;
                            particle.vx = (Math.random() - 0.5) * 2;
                            particle.vy = (Math.random() - 0.5) * 2;
                        } else if (dist < eventHorizonSize * 3) {
                            const force = blackHoleStrength / (dist * dist + 1);
                            const angle = Math.atan2(dy, dx);
                            particle.vx += Math.cos(angle) * force * 0.1;
                            particle.vy += Math.sin(angle) * force * 0.1;
                        }
                    });
                });
            }

            particles.forEach(particle => {
                particle.update();
                
                placedBlocks.forEach(block => {
                    const dx = particle.x - block.x;
                    const dy = particle.y - block.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = particle.size + block.size / 2;
                    
                    if (dist < minDist && dist > 0) {
                        const overlap = minDist - dist;
                        const angle = Math.atan2(dy, dx);
                        const pushForce = 0.15;
                        
                        particle.x += Math.cos(angle) * overlap;
                        particle.y += Math.sin(angle) * overlap;
                        particle.vx += Math.cos(angle) * pushForce;
                        particle.vy += Math.sin(angle) * pushForce;
                        
                        if (blockPhysicsEnabled) {
                            block.vx -= Math.cos(angle) * pushForce * 0.1;
                            block.vy -= Math.sin(angle) * pushForce * 0.1;
                            
                            if (block.material === 'breakable') {
                                block.health -= 0.5;
                            }
                        }
                    }
                });
                
                ragdolls.forEach(ragdoll => {
                    ragdoll.parts.forEach(part => {
                        if (part === grabbedRagdollPart) return;
                        
                        let dist, minDist, dx, dy;
                        
                        let partHalfW, partHalfH, partCos, partSin, partCenterX, partCenterY;
                        
                        if (part.type === 'head') {
                            partHalfW = part.radius * 1.6 / 2;
                            partHalfH = part.radius * 1.3 / 2;
                            partCos = Math.cos(part.rotation || 0);
                            partSin = Math.sin(part.rotation || 0);
                            partCenterX = part.x;
                            partCenterY = part.y;
                        } else {
                            partHalfW = part.width / 2;
                            partHalfH = part.height / 2;
                            partCos = Math.cos(part.rotation || 0);
                            partSin = Math.sin(part.rotation || 0);
                            partCenterX = part.x;
                            partCenterY = part.y;
                        }
                        
                        const partCorners = [
                            { x: -partHalfW, y: -partHalfH },
                            { x: partHalfW, y: -partHalfH },
                            { x: partHalfW, y: partHalfH },
                            { x: -partHalfW, y: partHalfH }
                        ].map(c => ({
                            x: partCenterX + c.x * partCos - c.y * partSin,
                            y: partCenterY + c.x * partSin + c.y * partCos
                        }));
                        
                        const partMinX = Math.min(...partCorners.map(c => c.x));
                        const partMaxX = Math.max(...partCorners.map(c => c.x));
                        const partMinY = Math.min(...partCorners.map(c => c.y));
                        const partMaxY = Math.max(...partCorners.map(c => c.y));
                        
                        const closestX = Math.max(partMinX, Math.min(particle.x, partMaxX));
                        const closestY = Math.max(partMinY, Math.min(particle.y, partMaxY));
                        
                        dx = particle.x - closestX;
                        dy = particle.y - closestY;
                        dist = Math.sqrt(dx * dx + dy * dy);
                        minDist = particle.size;
                        
                        if (dist < minDist && dist > 0) {
                            const overlap = minDist - dist;
                            const angle = Math.atan2(dy, dx);
                            const pushForce = 0.2;
                            
                            particle.x += Math.cos(angle) * overlap;
                            particle.y += Math.sin(angle) * overlap;
                            particle.vx += Math.cos(angle) * pushForce;
                            particle.vy += Math.sin(angle) * pushForce;
                            
                            const massRatio = part.mass / (part.mass + 1);
                            part.vx -= Math.cos(angle) * pushForce * (1 - massRatio);
                            part.vy -= Math.sin(angle) * pushForce * (1 - massRatio);
                        }
                    });
                });
            });

            if (connectionsEnabled) {
                drawConnections();
            }

            particles.forEach(particle => {
                particle.draw();
            });

            if (tornado && tornado.active) {
                updateTornado();
                drawTornado();
            }

            if (tsunamiEnabled) {
                updateTsunami();
                drawTsunami();
            }

            if (volcano && volcano.active) {
                updateVolcano();
                drawVolcano();
            }

            if (thunderEnabled) {
                updateThunder();
                drawThunder();
            }

            if (rainEnabled) {
                updateRain();
                drawRain();
            }

            if (snowEnabled) {
                updateSnow();
                drawSnow();
            }

            if (hurricane && hurricane.active) {
                updateHurricane();
                drawHurricane();
            }

            if (earthquakeEnabled) {
                updateEarthquake();
            }

            conveyors.forEach(conveyor => {
                drawConveyor(conveyor);
            });

            placedBlocks.forEach(block => {
                drawBlock(block);
            });

            if (buildingMode) {
                let previewX = mouseX;
                let previewY = mouseY;
                
                if (snapToGrid) {
                    previewX = Math.round(mouseX / gridSize) * gridSize;
                    previewY = Math.round(mouseY / gridSize) * gridSize;
                }
                
                ctx.globalAlpha = 0.5;
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.lineWidth = 2;
                
                if (selectedBlockType === 'conveyor') {
                    const previewWidth = blockSize * 4;
                    const previewHeight = blockSize * 0.8;
                    ctx.fillStyle = 'rgba(60, 60, 60, 0.5)';
                    ctx.fillRect(previewX - previewWidth / 2, previewY - previewHeight / 2, previewWidth, previewHeight);
                    ctx.strokeRect(previewX - previewWidth / 2, previewY - previewHeight / 2, previewWidth, previewHeight);
                    
                    const arrowSize = Math.min(previewWidth, previewHeight) * 0.3;
                    ctx.fillStyle = 'rgba(200, 200, 200, 0.7)';
                    ctx.beginPath();
                    switch(conveyorDirection) {
                        case 'right':
                            ctx.moveTo(previewX + arrowSize, previewY);
                            ctx.lineTo(previewX - arrowSize / 2, previewY - arrowSize / 2);
                            ctx.lineTo(previewX - arrowSize / 2, previewY + arrowSize / 2);
                            break;
                        case 'left':
                            ctx.moveTo(previewX - arrowSize, previewY);
                            ctx.lineTo(previewX + arrowSize / 2, previewY - arrowSize / 2);
                            ctx.lineTo(previewX + arrowSize / 2, previewY + arrowSize / 2);
                            break;
                        case 'up':
                            ctx.moveTo(previewX, previewY - arrowSize);
                            ctx.lineTo(previewX - arrowSize / 2, previewY + arrowSize / 2);
                            ctx.lineTo(previewX + arrowSize / 2, previewY + arrowSize / 2);
                            break;
                        case 'down':
                            ctx.moveTo(previewX, previewY + arrowSize);
                            ctx.lineTo(previewX - arrowSize / 2, previewY - arrowSize / 2);
                            ctx.lineTo(previewX + arrowSize / 2, previewY - arrowSize / 2);
                            break;
                    }
                    ctx.closePath();
                    ctx.fill();
                } else {
                    ctx.fillStyle = blockColor;
                    switch(selectedBlockType) {
                        case 'square':
                            ctx.fillRect(previewX - blockSize / 2, previewY - blockSize / 2, blockSize, blockSize);
                            ctx.strokeRect(previewX - blockSize / 2, previewY - blockSize / 2, blockSize, blockSize);
                            break;
                        case 'rectangle':
                            ctx.fillRect(previewX - blockSize / 2, previewY - blockSize / 3, blockSize, blockSize * 0.67);
                            ctx.strokeRect(previewX - blockSize / 2, previewY - blockSize / 3, blockSize, blockSize * 0.67);
                            break;
                        case 'circle':
                            ctx.beginPath();
                            ctx.arc(previewX, previewY, blockSize / 2, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.stroke();
                            break;
                        case 'triangle':
                            ctx.beginPath();
                            ctx.moveTo(previewX, previewY - blockSize / 2);
                            ctx.lineTo(previewX - blockSize / 2, previewY + blockSize / 2);
                            ctx.lineTo(previewX + blockSize / 2, previewY + blockSize / 2);
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();
                            break;
                        case 'hexagon':
                            ctx.beginPath();
                            for (let i = 0; i < 6; i++) {
                                const angle = (Math.PI / 3) * i;
                                const hx = previewX + (blockSize / 2) * Math.cos(angle);
                                const hy = previewY + (blockSize / 2) * Math.sin(angle);
                                if (i === 0) ctx.moveTo(hx, hy);
                                else ctx.lineTo(hx, hy);
                            }
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();
                            break;
                        case 'star':
                            ctx.beginPath();
                            const spikes = 5;
                            const outerRadius = blockSize / 2;
                            const innerRadius = outerRadius * 0.4;
                            for (let i = 0; i < spikes * 2; i++) {
                                const angle = (Math.PI / spikes) * i;
                                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                                const sx = previewX + radius * Math.cos(angle - Math.PI / 2);
                                const sy = previewY + radius * Math.sin(angle - Math.PI / 2);
                                if (i === 0) ctx.moveTo(sx, sy);
                                else ctx.lineTo(sx, sy);
                            }
                            ctx.closePath();
                            ctx.fill();
                            ctx.stroke();
                            break;
                    }
                    
                    ctx.globalAlpha = 1;
                }
            }

            ragdolls.forEach(ragdoll => {
                drawRagdoll(ragdoll);
            });

            if (gravWavesEnabled) {
                blackHoles.forEach((blackHole, index) => {
                    const time = Date.now() * 0.001;
                    
                    for (let wave = 0; wave < 5; wave++) {
                        const waveRadius = eventHorizonSize + wave * 15 + Math.sin(time * 2 + wave + index) * waveIntensity;
                        const opacity = (1 - wave * 0.15) * (0.3 + Math.sin(time * 3 + wave) * 0.2);
                        
                        ctx.strokeStyle = `rgba(100, 150, 255, ${opacity})`;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.arc(blackHole.x, blackHole.y, waveRadius, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                    
                    const accretionGradient = ctx.createRadialGradient(
                        blackHole.x, blackHole.y, 0,
                        blackHole.x, blackHole.y, eventHorizonSize * 1.5
                    );
                    accretionGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
                    accretionGradient.addColorStop(0.7, 'rgba(50, 0, 100, 0.6)');
                    accretionGradient.addColorStop(1, 'rgba(100, 50, 150, 0)');
                    
                    ctx.fillStyle = accretionGradient;
                    ctx.beginPath();
                    ctx.arc(blackHole.x, blackHole.y, eventHorizonSize * 1.5, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
                    ctx.beginPath();
                    ctx.arc(blackHole.x, blackHole.y, eventHorizonSize, 0, Math.PI * 2);
                    ctx.fill();
                    
                    ctx.strokeStyle = 'rgba(150, 100, 255, 0.8)';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(blackHole.x, blackHole.y, eventHorizonSize, 0, Math.PI * 2);
                    ctx.stroke();
                    
                    const ringGradient = ctx.createRadialGradient(
                        blackHole.x, blackHole.y, eventHorizonSize * 0.8,
                        blackHole.x, blackHole.y, eventHorizonSize * 1.2
                    );
                    ringGradient.addColorStop(0, 'rgba(200, 150, 255, 0)');
                    ringGradient.addColorStop(0.5, 'rgba(150, 100, 255, 0.4)');
                    ringGradient.addColorStop(1, 'rgba(100, 50, 200, 0)');
                    
                    ctx.save();
                    ctx.translate(blackHole.x, blackHole.y);
                    ctx.rotate(blackHole.rotation);
                    ctx.fillStyle = ringGradient;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, eventHorizonSize * 1.2, eventHorizonSize * 0.3, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                });
            }

            ctx.globalAlpha = 1;
            applyVHSEffects();
            requestAnimationFrame(animate);
        }

        function updateTornado() {
            if (!tornado) return;
            
            tornado.rotation += 0.1;
            
            if (tornado.y > -100) {
                tornado.y -= tornadoSpeed;
                
                const pathNoise = Math.sin(tornado.rotation * 0.1) * 2;
                tornado.x += pathNoise;
                
                tornado.path.push({ x: tornado.x, y: tornado.y });
                if (tornado.path.length > 50) {
                    tornado.path.shift();
                }
            } else {
                tornado.x = canvas.width / 2 + (Math.random() - 0.5) * 200;
                tornado.y = canvas.height + 50;
                tornado.path = [];
            }
        }

        function drawTornado() {
            if (!tornado) return;
            
            ctx.save();
            
            const centerX = tornado.x;
            const centerY = tornado.y;
            const radius = tornadoSize;
            
            for (let layer = 0; layer < 3; layer++) {
                const layerRadius = radius * (0.3 + layer * 0.25);
                const layerAlpha = 0.5 - layer * 0.1;
                
                const gradient = ctx.createRadialGradient(centerX, centerY, layerRadius * 0.2, centerX, centerY, layerRadius);
                if (layer === 0) {
                    gradient.addColorStop(0, `rgba(80, 60, 50, ${layerAlpha})`);
                    gradient.addColorStop(0.3, `rgba(100, 80, 70, ${layerAlpha * 0.8})`);
                    gradient.addColorStop(0.6, `rgba(120, 100, 90, ${layerAlpha * 0.5})`);
                    gradient.addColorStop(1, 'rgba(60, 50, 40, 0)');
                } else if (layer === 1) {
                    gradient.addColorStop(0, `rgba(90, 70, 60, ${layerAlpha})`);
                    gradient.addColorStop(0.4, `rgba(110, 90, 80, ${layerAlpha * 0.7})`);
                    gradient.addColorStop(0.8, `rgba(130, 110, 100, ${layerAlpha * 0.4})`);
                    gradient.addColorStop(1, 'rgba(70, 60, 50, 0)');
                } else {
                    gradient.addColorStop(0, `rgba(100, 80, 70, ${layerAlpha})`);
                    gradient.addColorStop(0.5, `rgba(120, 100, 90, ${layerAlpha * 0.6})`);
                    gradient.addColorStop(1, 'rgba(80, 70, 60, 0)');
                }
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, layerRadius, 0, Math.PI * 2);
                ctx.fill();
            }
            
            for (let i = 0; i < 12; i++) {
                const baseAngle = (tornado.rotation * 2 + (i * Math.PI / 6)) % (Math.PI * 2);
                const spiralOffset = i * 0.3;
                const startRadius = radius * 0.15;
                const endRadius = radius * 0.95;
                
                ctx.strokeStyle = `rgba(120, 100, 90, ${0.5 - i * 0.03})`;
                ctx.lineWidth = 2.5;
                ctx.shadowBlur = 3;
                ctx.shadowColor = 'rgba(100, 80, 70, 0.5)';
                
                ctx.beginPath();
                for (let r = startRadius; r < endRadius; r += 2) {
                    const angle = baseAngle + (r / radius) * Math.PI * 2 + spiralOffset;
                    const x = centerX + Math.cos(angle) * r;
                    const y = centerY + Math.sin(angle) * r;
                    if (r === startRadius) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }
            
            const innerGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius * 0.3);
            innerGradient.addColorStop(0, 'rgba(60, 50, 40, 0.9)');
            innerGradient.addColorStop(0.5, 'rgba(80, 70, 60, 0.6)');
            innerGradient.addColorStop(1, 'rgba(100, 90, 80, 0)');
            
            ctx.fillStyle = innerGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 0;
            ctx.restore();
        }

        function updateTsunami() {
            if (!tsunamiEnabled) return;
            
            if (Math.random() < 0.01) {
                tsunamiWaves.push({
                    y: canvas.height - 50,
                    direction: Math.random() < 0.5 ? 1 : -1,
                    speed: tsunamiSpeed + Math.random() * tsunamiSpeed,
                    width: tsunamiSize + Math.random() * (tsunamiSize * 0.5)
                });
            }
            
            for (let i = tsunamiWaves.length - 1; i >= 0; i--) {
                const wave = tsunamiWaves[i];
                wave.y -= wave.speed;
                
                if (wave.y < -100) {
                    tsunamiWaves.splice(i, 1);
                }
            }
        }

        function drawTsunami() {
            ctx.save();
            ctx.globalAlpha = 0.7;
            
            for (const wave of tsunamiWaves) {
                const gradient = ctx.createLinearGradient(0, wave.y, 0, wave.y + wave.width);
                gradient.addColorStop(0, 'rgba(0, 100, 200, 0.6)');
                gradient.addColorStop(0.5, 'rgba(0, 150, 255, 0.4)');
                gradient.addColorStop(1, 'rgba(0, 100, 200, 0)');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(0, wave.y, canvas.width, wave.width);
                
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, wave.y);
                for (let x = 0; x < canvas.width; x += 10) {
                    const y = wave.y + Math.sin(x * 0.05 + Date.now() * 0.01) * 5;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            
            ctx.restore();
        }

        function updateVolcano() {
            if (!volcano || !volcano.active) return;
            
            volcano.eruptionTimer++;
            
            if (volcano.eruptionTimer > 60 / (volcanoIntensity * volcanoSpeed)) {
                volcano.eruptionTimer = 0;
                
                const baseWidth = volcanoSize * 0.4;
                const height = volcanoSize * 0.3;
                const topY = volcano.y - height;
                
                const particleCount = Math.floor(volcanoIntensity * 2);
                for (let i = 0; i < particleCount; i++) {
                    if (devMode || particles.length < maxParticles) {
                        const angle = (-Math.PI / 2) + (Math.random() - 0.5) * 0.6;
                        const speed = volcanoSpeed * (4 + Math.random() * 4);
                        const colors = ['#ff4500', '#ff6347', '#ff8c00', '#ffa500', '#ff6600', '#ff3300', '#ff0000', '#ff5500'];
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        const particle = new Particle(
                            volcano.x + (Math.random() - 0.5) * (volcanoSize * 0.1),
                            topY,
                            color,
                            Math.cos(angle) * speed,
                            Math.sin(angle) * speed
                        );
                        particle.isVolcano = true;
                        particle.volcanoGravity = -0.05;
                        particles.push(particle);
                    }
                }
            }
        }

        function drawVolcano() {
            if (!volcano) return;
            
            ctx.save();
            
            const baseWidth = volcanoSize * 0.4;
            const height = volcanoSize * 0.3;
            const topY = volcano.y - height;
            
            const baseGradient = ctx.createLinearGradient(volcano.x - baseWidth / 2, volcano.y, volcano.x, topY);
            baseGradient.addColorStop(0, 'rgba(80, 50, 40, 0.9)');
            baseGradient.addColorStop(0.5, 'rgba(60, 40, 30, 0.9)');
            baseGradient.addColorStop(1, 'rgba(50, 30, 20, 0.9)');
            
            ctx.fillStyle = baseGradient;
            ctx.beginPath();
            ctx.moveTo(volcano.x - baseWidth / 2, volcano.y);
            ctx.lineTo(volcano.x, topY);
            ctx.lineTo(volcano.x + baseWidth / 2, volcano.y);
            ctx.closePath();
            ctx.fill();
            
            ctx.strokeStyle = 'rgba(40, 25, 15, 0.6)';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            for (let i = 0; i < 3; i++) {
                const offsetX = (Math.random() - 0.5) * baseWidth * 0.3;
                const offsetY = Math.random() * height * 0.5;
                const rockY = volcano.y - offsetY;
                const rockX = volcano.x + offsetX;
                const rockSize = 3 + Math.random() * 4;
                
                ctx.fillStyle = `rgba(${50 + Math.random() * 20}, ${30 + Math.random() * 15}, ${20 + Math.random() * 10}, 0.7)`;
                ctx.beginPath();
                ctx.arc(rockX, rockY, rockSize, 0, Math.PI * 2);
                ctx.fill();
            }
            
            const craterRadius = volcanoSize * 0.08;
            const glowRadius = volcanoSize * 0.12;
            
            if (volcano.eruptionTimer < 15) {
                const glowGradient = ctx.createRadialGradient(volcano.x, topY, craterRadius * 0.3, volcano.x, topY, glowRadius);
                glowGradient.addColorStop(0, `rgba(255, ${150 + volcano.eruptionTimer * 5}, 0, ${0.9 - volcano.eruptionTimer * 0.05})`);
                glowGradient.addColorStop(0.5, `rgba(255, ${100 + volcano.eruptionTimer * 5}, 0, ${0.6 - volcano.eruptionTimer * 0.04})`);
                glowGradient.addColorStop(1, 'rgba(255, 50, 0, 0)');
                
                ctx.fillStyle = glowGradient;
                ctx.beginPath();
                ctx.arc(volcano.x, topY, glowRadius, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = `rgba(255, ${100 + volcano.eruptionTimer * 8}, 0, ${0.95 - volcano.eruptionTimer * 0.06})`;
                ctx.beginPath();
                ctx.arc(volcano.x, topY, craterRadius, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = `rgba(255, 200, 100, ${0.8 - volcano.eruptionTimer * 0.05})`;
                ctx.beginPath();
                ctx.arc(volcano.x, topY, craterRadius * 0.6, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        }

        function updateThunder() {
            if (!thunderEnabled) return;
            
            thunderTimer++;
            const interval = (60 / thunderFreq) * 60;
            
            if (thunderTimer > interval) {
                thunderTimer = 0;
                
                const strike = {
                    x: Math.random() * canvas.width,
                    y: 0,
                    endY: Math.random() * canvas.height * 0.7 + canvas.height * 0.1,
                    branches: [],
                    life: 20,
                    intensity: (thunderStrength / 10) * (0.8 + Math.random() * 0.2)
                };
                
                for (let i = 0; i < 3; i++) {
                    strike.branches.push({
                        x: strike.x + (Math.random() - 0.5) * thunderSize,
                        y: strike.endY * (0.3 + Math.random() * 0.4),
                        endX: strike.x + (Math.random() - 0.5) * (thunderSize * 1.5),
                        endY: strike.endY + (Math.random() - 0.5) * (thunderSize * 0.5)
                    });
                }
                
                lightningStrikes.push(strike);
                
                thunderFlash = 1.0;
                thunderShake.x = (Math.random() - 0.5) * thunderStrength * 3;
                thunderShake.y = (Math.random() - 0.5) * thunderStrength * 3;
                
                for (let i = 0; i < Math.floor(thunderStrength * 4); i++) {
                    if (devMode || particles.length < maxParticles) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = thunderStrength * (1 + Math.random() * 2);
                        const particle = new Particle(
                            strike.x + (Math.random() - 0.5) * (thunderSize * 0.3),
                            strike.endY + (Math.random() - 0.5) * (thunderSize * 0.3),
                            '#ffffaa',
                            Math.cos(angle) * speed,
                            Math.sin(angle) * speed
                        );
                        particle.life = 30;
                        particles.push(particle);
                    }
                }
            }
            
            for (let i = lightningStrikes.length - 1; i >= 0; i--) {
                lightningStrikes[i].life--;
                if (lightningStrikes[i].life <= 0) {
                    lightningStrikes.splice(i, 1);
                }
            }
            
            thunderFlash *= 0.85;
            thunderShake.x *= 0.85;
            thunderShake.y *= 0.85;
        }

        function drawThunder() {
            ctx.save();
            
            for (const strike of lightningStrikes) {
                ctx.strokeStyle = `rgba(255, 255, 200, ${strike.intensity * (strike.life / 20)})`;
                ctx.lineWidth = 3;
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(255, 255, 200, 0.8)';
                
                ctx.beginPath();
                ctx.moveTo(strike.x, strike.y);
                
                let currentY = strike.y;
                let currentX = strike.x;
                const segments = 10;
                const stepY = (strike.endY - strike.y) / segments;
                
                for (let i = 0; i < segments; i++) {
                    currentY += stepY;
                    currentX += (Math.random() - 0.5) * 15;
                    ctx.lineTo(currentX, currentY);
                }
                
                ctx.stroke();
                
                for (const branch of strike.branches) {
                    ctx.beginPath();
                    ctx.moveTo(branch.x, branch.y);
                    ctx.lineTo(branch.endX, branch.endY);
                    ctx.stroke();
                }
            }
            
            if (thunderFlash > 0) {
                ctx.globalCompositeOperation = 'screen';
                ctx.fillStyle = `rgba(255, 255, 255, ${thunderFlash * 0.4})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'source-over';
            }
            
            ctx.restore();
        }

        function updateRain() {
            if (!rainEnabled) return;
            
            const spawnRate = Math.floor(rainIntensity * 2);
            
            for (let i = 0; i < spawnRate; i++) {
                if (Math.random() < 0.3) {
                    rainDrops.push({
                        x: Math.random() * canvas.width,
                        y: -10,
                        speed: rainSpeed + Math.random() * rainSpeed,
                        length: rainSize + Math.random() * (rainSize * 0.5)
                    });
                }
            }
            
            for (let i = rainDrops.length - 1; i >= 0; i--) {
                const drop = rainDrops[i];
                drop.y += drop.speed;
                drop.x += 0.5;
                
                if (drop.y > canvas.height + 20) {
                    rainDrops.splice(i, 1);
                }
            }
        }

        function drawRain() {
            ctx.save();
            ctx.strokeStyle = 'rgba(150, 200, 255, 0.6)';
            ctx.lineWidth = Math.max(1, rainSize * 0.1);
            
            for (const drop of rainDrops) {
                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x - 2, drop.y + drop.length);
                ctx.stroke();
            }
            
            ctx.restore();
        }

        function updateSnow() {
            if (!snowEnabled) return;
            
            const spawnRate = Math.floor(snowIntensity);
            
            for (let i = 0; i < spawnRate; i++) {
                if (Math.random() < 0.2) {
                    snowFlakes.push({
                        x: Math.random() * canvas.width,
                        y: -10,
                        speed: snowSpeed * (0.5 + Math.random() * 0.5),
                        size: snowSize + Math.random() * (snowSize * 0.5),
                        drift: (Math.random() - 0.5) * 0.5
                    });
                }
            }
            
            for (let i = snowFlakes.length - 1; i >= 0; i--) {
                const flake = snowFlakes[i];
                flake.y += flake.speed;
                flake.x += flake.drift + Math.sin(flake.y * 0.01) * 0.3;
                
                if (flake.y > canvas.height + 20) {
                    snowFlakes.splice(i, 1);
                }
            }
        }

        function drawSnow() {
            ctx.save();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            
            for (const flake of snowFlakes) {
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        }

        function updateHurricane() {
            if (!hurricane || !hurricane.active) return;
            
            hurricane.rotation += hurricaneSpeed * 0.04;
            
            const driftX = Math.sin(hurricane.rotation * 0.1) * hurricaneSpeed;
            const driftY = Math.cos(hurricane.rotation * 0.1) * (hurricaneSpeed * 0.6);
            
            hurricane.x += driftX;
            hurricane.y += driftY;
            
            if (hurricane.x < 0) hurricane.x = canvas.width;
            if (hurricane.x > canvas.width) hurricane.x = 0;
            if (hurricane.y < 0) hurricane.y = canvas.height;
            if (hurricane.y > canvas.height) hurricane.y = 0;
        }

        function drawHurricane() {
            if (!hurricane) return;
            
            ctx.save();
            
            const centerX = hurricane.x;
            const centerY = hurricane.y;
            const radius = hurricaneSize;
            
            for (let layer = 0; layer < 4; layer++) {
                const layerRadius = radius * (0.15 + layer * 0.25);
                const layerAlpha = 0.6 - layer * 0.12;
                
                const gradient = ctx.createRadialGradient(centerX, centerY, layerRadius * 0.3, centerX, centerY, layerRadius);
                if (layer === 0) {
                    gradient.addColorStop(0, `rgba(200, 200, 220, ${layerAlpha})`);
                    gradient.addColorStop(0.3, `rgba(180, 180, 200, ${layerAlpha * 0.9})`);
                    gradient.addColorStop(0.6, `rgba(160, 160, 180, ${layerAlpha * 0.7})`);
                    gradient.addColorStop(1, 'rgba(140, 140, 160, 0)');
                } else if (layer === 1) {
                    gradient.addColorStop(0, `rgba(180, 190, 210, ${layerAlpha})`);
                    gradient.addColorStop(0.4, `rgba(160, 170, 190, ${layerAlpha * 0.8})`);
                    gradient.addColorStop(0.8, `rgba(140, 150, 170, ${layerAlpha * 0.6})`);
                    gradient.addColorStop(1, 'rgba(120, 130, 150, 0)');
                } else if (layer === 2) {
                    gradient.addColorStop(0, `rgba(160, 170, 190, ${layerAlpha})`);
                    gradient.addColorStop(0.5, `rgba(140, 150, 170, ${layerAlpha * 0.7})`);
                    gradient.addColorStop(1, 'rgba(120, 130, 150, 0)');
                } else {
                    gradient.addColorStop(0, `rgba(140, 150, 170, ${layerAlpha})`);
                    gradient.addColorStop(0.6, `rgba(120, 130, 150, ${layerAlpha * 0.6})`);
                    gradient.addColorStop(1, 'rgba(100, 110, 130, 0)');
                }
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, layerRadius, 0, Math.PI * 2);
                ctx.fill();
            }
            
            const eyeRadius = radius * 0.15;
            const eyeGradient = ctx.createRadialGradient(centerX, centerY, eyeRadius * 0.3, centerX, centerY, eyeRadius);
            eyeGradient.addColorStop(0, 'rgba(220, 230, 240, 0.8)');
            eyeGradient.addColorStop(0.5, 'rgba(200, 210, 220, 0.6)');
            eyeGradient.addColorStop(1, 'rgba(180, 190, 200, 0)');
            
            ctx.fillStyle = eyeGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, eyeRadius, 0, Math.PI * 2);
            ctx.fill();
            
            for (let band = 0; band < 3; band++) {
                const bandRadius = radius * (0.3 + band * 0.25);
                const bandSpacing = Math.PI / 12;
                
                for (let i = 0; i < 20; i++) {
                    const baseAngle = (hurricane.rotation * 1.5 + (i * bandSpacing)) % (Math.PI * 2);
                    const spiralTurns = 1.5;
                    const startRadius = bandRadius * 0.4;
                    const endRadius = bandRadius;
                    
                    ctx.strokeStyle = `rgba(180, 190, 210, ${0.5 - band * 0.1 - i * 0.015})`;
                    ctx.lineWidth = 3;
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = 'rgba(150, 160, 180, 0.4)';
                    
                    ctx.beginPath();
                    for (let r = startRadius; r < endRadius; r += 3) {
                        const angle = baseAngle + (r / bandRadius) * Math.PI * spiralTurns;
                        const x = centerX + Math.cos(angle) * r;
                        const y = centerY + Math.sin(angle) * r;
                        if (r === startRadius) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    ctx.stroke();
                }
            }
            
            ctx.shadowBlur = 0;
            ctx.restore();
        }

        function updateEarthquake() {
            if (!earthquakeEnabled) return;
            
            earthquakeTimer++;
            
            if (earthquakeTimer > (30 / earthquakeSpeed)) {
                earthquakeTimer = 0;
                earthquakeShake.x = (Math.random() - 0.5) * earthquakeIntensity * 2;
                earthquakeShake.y = (Math.random() - 0.5) * earthquakeIntensity * 2;
            } else {
                earthquakeShake.x *= 0.9;
                earthquakeShake.y *= 0.9;
            }
        }

        window.addEventListener('resize', () => {
            if (!applicationStarted) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            vhsCanvas.width = canvas.width;
            vhsCanvas.height = canvas.height;
            
            window.spaceStars = null;
            window.spaceNebulas = null;
            window.spacePlanets = null;
            window.spaceAsteroids = null;
            window.moonStars = null;
            window.moonRocks = null;
            window.moonCraters = null;
            window.moonSurface = null;
            window.marsDust = null;
            window.marsCraters = null;
            window.earthClouds = null;
            window.earthTerrain = null;
            window.voidParticles = null;
            window.voidEnergy = null;
            window.whiteGrid = null;
            window.whiteCorners = null;
            window.greenPatterns = null;
            window.greenGrid = null;
            
            if (gravWavesEnabled) {
                initializeBlackHoles();
            }
        });
