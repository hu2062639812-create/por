import React, { useEffect, useRef, useState } from 'react';
import { X, Play, RefreshCw, Trophy } from 'lucide-react';

interface GameDemoProps {
  onClose: () => void;
}

// Game Types
type GameState = 'MENU' | 'CHARACTER_SELECT' | 'LEVEL_SELECT' | 'PLAYING' | 'GAME_OVER' | 'VICTORY';
type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
type CharacterType = 'NINJA' | 'KNIGHT' | 'MAGE';
type LevelType = 'GRASS' | 'SNOW' | 'DESERT';

interface Entity {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}

interface Player extends Entity {
  vx: number;
  vy: number;
  isGrounded: boolean;
  jumpsLeft: number;
  maxJumps: number;
  isAttacking: boolean;
  attackCooldown: number;
  health: number;
  score: number;
  facingRight: boolean;
}

interface Enemy extends Entity {
  vx: number;
  patrolStart: number;
  patrolEnd: number;
  isDead: boolean;
}

const GameDemo: React.FC<GameDemoProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [character, setCharacter] = useState<CharacterType>('NINJA');
  const [level, setLevel] = useState<LevelType>('GRASS');
  const [score, setScore] = useState(0);

  // Game Constants
  const GRAVITY = 0.6;
  const FRICTION = 0.8;
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;

  // Level Configurations
  const LEVEL_CONFIG = {
    GRASS: { bg: '#87CEEB', ground: '#4ade80', platform: '#22c55e', friction: 0.8 },
    SNOW: { bg: '#e2e8f0', ground: '#f8fafc', platform: '#cbd5e1', friction: 0.96 }, // Slippery
    DESERT: { bg: '#fef3c7', ground: '#fcd34d', platform: '#fbbf24', friction: 0.8 },
  };

  // Character Configurations
  const CHAR_CONFIG = {
    NINJA: { color: '#3b82f6', speed: 7, jump: -12, maxJumps: 2, name: '忍者 (速度+)' },
    KNIGHT: { color: '#ef4444', speed: 4, jump: -10, maxJumps: 1, name: '骑士 (攻击+)' }, // Wider attack handled in logic
    MAGE: { color: '#a855f7', speed: 5, jump: -11, maxJumps: 1, name: '法师 (漂浮)' }, // Gravity modifier
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- GAME INIT ---
    let frameId: number;
    const currentLevel = LEVEL_CONFIG[level];
    const charStats = CHAR_CONFIG[character];

    let player: Player = {
      x: 50, y: 400, w: 30, h: 30,
      vx: 0, vy: 0,
      color: charStats.color,
      isGrounded: false,
      jumpsLeft: charStats.maxJumps,
      maxJumps: charStats.maxJumps,
      isAttacking: false,
      attackCooldown: 0,
      health: difficulty === 'EASY' ? 3 : difficulty === 'MEDIUM' ? 2 : 1,
      score: 0,
      facingRight: true,
    };

    // Generate Platforms
    const platforms: Entity[] = [
      { x: 0, y: 550, w: 800, h: 50, color: currentLevel.ground }, // Floor
      { x: 200, y: 450, w: 100, h: 20, color: currentLevel.platform },
      { x: 400, y: 350, w: 100, h: 20, color: currentLevel.platform },
      { x: 600, y: 250, w: 100, h: 20, color: currentLevel.platform },
      { x: 250, y: 150, w: 200, h: 20, color: currentLevel.platform },
    ];

    // Generate Enemies
    let enemies: Enemy[] = [
      { x: 420, y: 320, w: 30, h: 30, color: '#dc2626', vx: 2, patrolStart: 400, patrolEnd: 500, isDead: false },
      { x: 620, y: 220, w: 30, h: 30, color: '#dc2626', vx: 2, patrolStart: 600, patrolEnd: 700, isDead: false },
      { x: 300, y: 120, w: 30, h: 30, color: '#dc2626', vx: 2.5, patrolStart: 250, patrolEnd: 450, isDead: false },
    ];

    // Generate Coins
    let coins: Entity[] = [
      { x: 240, y: 420, w: 15, h: 15, color: '#fbbf24' },
      { x: 440, y: 320, w: 15, h: 15, color: '#fbbf24' },
      { x: 640, y: 220, w: 15, h: 15, color: '#fbbf24' },
      { x: 350, y: 110, w: 15, h: 15, color: '#fbbf24' },
    ];

    const keys: { [key: string]: boolean } = {};

    const handleKeyDown = (e: KeyboardEvent) => { keys[e.code] = true; };
    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'KeyZ' || e.code === 'KeyK') player.isAttacking = false; 
        keys[e.code] = false; 
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // --- GAME LOOP ---
    const update = () => {
      // 1. Input Processing
      if (keys['ArrowLeft'] || keys['KeyA']) {
        player.vx = -charStats.speed;
        player.facingRight = false;
      } else if (keys['ArrowRight'] || keys['KeyD']) {
        player.vx = charStats.speed;
        player.facingRight = true;
      } else {
        player.vx *= currentLevel.friction;
      }

      // Jump
      if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && !keys['jumpLocked']) {
        if (player.jumpsLeft > 0) {
           player.vy = charStats.jump;
           player.jumpsLeft--;
           keys['jumpLocked'] = true; // Prevent holding space to fly
        }
      }
      if (!keys['Space'] && !keys['ArrowUp'] && !keys['KeyW']) keys['jumpLocked'] = false;

      // Attack
      if ((keys['KeyZ'] || keys['KeyK']) && player.attackCooldown <= 0) {
        player.isAttacking = true;
        player.attackCooldown = 20; // Frames
      }
      if (player.attackCooldown > 0) player.attackCooldown--;

      // 2. Physics
      let activeGravity = GRAVITY;
      if (character === 'MAGE' && player.vy > 0) activeGravity = 0.3; // Mage float
      player.vy += activeGravity;
      player.x += player.vx;
      player.y += player.vy;

      // 3. Collision Detection (Platforms)
      player.isGrounded = false;
      platforms.forEach(plat => {
        // Simple AABB
        if (player.x < plat.x + plat.w &&
            player.x + player.w > plat.x &&
            player.y < plat.y + plat.h &&
            player.y + player.h > plat.y) {
          
          // Collision resolution (simplified for top-down landing)
          const bottomDiff = (plat.y + plat.h) - player.y;
          const topDiff = (player.y + player.h) - plat.y;
          const leftDiff = (player.x + player.w) - plat.x;
          const rightDiff = (plat.x + plat.w) - player.x;

          const minDiff = Math.min(bottomDiff, topDiff, leftDiff, rightDiff);

          if (minDiff === topDiff && player.vy >= 0) {
            player.y = plat.y - player.h;
            player.vy = 0;
            player.isGrounded = true;
            if (player.jumpsLeft < charStats.maxJumps && !keys['Space']) {
                player.jumpsLeft = charStats.maxJumps; // Reset jumps on ground
            }
          } else if (minDiff === bottomDiff) {
            player.y = plat.y + plat.h;
            player.vy = 0;
          } else if (minDiff === leftDiff) {
            player.x = plat.x - player.w;
          } else if (minDiff === rightDiff) {
             player.x = plat.x + plat.w;
          }
        }
      });

      // Screen Boundaries
      if (player.x < 0) player.x = 0;
      if (player.x + player.w > CANVAS_WIDTH) player.x = CANVAS_WIDTH - player.w;
      if (player.y > CANVAS_HEIGHT) {
        // Fall death
        player.health = 0;
      }

      // 4. Game Logic (Enemies & Coins)
      
      // Enemies
      enemies.forEach(enemy => {
        if (enemy.isDead) return;

        // Patrol logic
        enemy.x += enemy.vx;
        if (enemy.x <= enemy.patrolStart || enemy.x >= enemy.patrolEnd) enemy.vx *= -1;

        // Collision with Player
        if (player.x < enemy.x + enemy.w &&
            player.x + player.w > enemy.x &&
            player.y < enemy.y + enemy.h &&
            player.y + player.h > enemy.y) {
          
          // Attack hit check
          let attackHit = false;
          if (player.isAttacking) {
             const attackRange = character === 'KNIGHT' ? 60 : 40;
             const attackX = player.facingRight ? player.x + player.w : player.x - attackRange;
             // Check if enemy is in attack box
             if (player.facingRight) {
                if (enemy.x < attackX + attackRange && enemy.x + enemy.w > player.x) attackHit = true;
             } else {
                if (enemy.x + enemy.w > attackX && enemy.x < player.x) attackHit = true;
             }
          }

          if (attackHit) {
            enemy.isDead = true;
            player.score += 100;
            // THE UNIQUE MECHANIC: Double Jump on kill
            player.jumpsLeft = 2; 
          } else {
            // Player hit
            player.health--;
            // Knockback
            player.vy = -10;
            player.vx = player.x < enemy.x ? -10 : 10;
            
            if (player.health <= 0) {
                setGameState('GAME_OVER');
                setScore(player.score);
            }
          }
        }
      });

      // Coins
      coins.forEach((coin, index) => {
        if (player.x < coin.x + coin.w &&
            player.x + player.w > coin.x &&
            player.y < coin.y + coin.h &&
            player.y + player.h > coin.y) {
             // Collect
             coins.splice(index, 1);
             player.score += 50;
        }
      });

      // Victory Condition (Collect all coins)
      if (coins.length === 0 && enemies.every(e => e.isDead)) {
        setScore(player.score + 500); // Bonus
        setGameState('VICTORY');
      }

      // Update React Score
      setScore(player.score);
    };

    const draw = () => {
      // Clear
      ctx.fillStyle = currentLevel.bg;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw Platforms
      platforms.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.w, p.h);
        // Border
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(p.x, p.y, p.w, p.h);
      });

      // Draw Enemies
      enemies.forEach(e => {
        if (e.isDead) return;
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.w, e.h);
        // Eyes
        ctx.fillStyle = 'white';
        ctx.fillRect(e.x + 5, e.y + 5, 8, 8);
        ctx.fillRect(e.x + 18, e.y + 5, 8, 8);
        ctx.fillStyle = 'black';
        ctx.fillRect(e.x + 7, e.y + 7, 4, 4);
        ctx.fillRect(e.x + 20, e.y + 7, 4, 4);
      });

      // Draw Coins
      coins.forEach(c => {
        ctx.fillStyle = c.color;
        ctx.beginPath();
        ctx.arc(c.x + c.w/2, c.y + c.h/2, c.w/2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // Draw Player
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.w, player.h);
      
      // Player Face
      ctx.fillStyle = 'white';
      const faceOffset = player.facingRight ? 16 : 4;
      ctx.fillRect(player.x + faceOffset, player.y + 5, 10, 8);

      // Attack Visual
      if (player.isAttacking) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          const range = character === 'KNIGHT' ? 60 : 40;
          if (player.facingRight) {
              ctx.fillRect(player.x + player.w, player.y, range, player.h);
          } else {
              ctx.fillRect(player.x - range, player.y, range, player.h);
          }
      }

      // HUD
      ctx.font = '16px "Press Start 2P"';
      ctx.fillStyle = '#000';
      ctx.fillText(`得分: ${player.score}`, 20, 30);
      ctx.fillText(`生命: ${'❤️'.repeat(player.health)}`, 20, 60);
      ctx.fillText(`跳跃: ${player.jumpsLeft}`, 20, 90);
    };

    const loop = () => {
      update();
      draw();
      if (gameState === 'PLAYING') {
        frameId = requestAnimationFrame(loop);
      }
    };

    loop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(frameId);
    };
  }, [gameState, character, level, difficulty]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center backdrop-blur-sm font-pixel">
      <div className="relative w-full max-w-[850px] bg-slate-800 rounded-xl border-4 border-slate-600 shadow-2xl overflow-hidden flex flex-col">
        {/* Header Bar */}
        <div className="bg-slate-700 p-2 flex justify-between items-center border-b-4 border-slate-600">
           <h2 className="text-white text-xs md:text-sm pl-2">像素传说: 二段跳复仇</h2>
           <button onClick={onClose} className="text-white hover:text-red-500 transition-colors"><X size={24} /></button>
        </div>

        {/* Canvas / UI Container */}
        <div className="relative w-full h-[600px] bg-black">
            {gameState === 'PLAYING' && (
               <canvas ref={canvasRef} width={800} height={600} className="w-full h-full object-contain bg-sky-300" />
            )}

            {/* Main Menu */}
            {gameState === 'MENU' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 bg-slate-900 text-white p-8">
                    <h1 className="text-3xl md:text-5xl text-yellow-400 mb-4 animate-pulse text-center leading-relaxed">像素传说</h1>
                    <div className="space-y-4 w-full max-w-md text-center">
                        <p className="text-xs text-slate-400 mb-8">攻击敌人重置二段跳 | 收集金币</p>
                        
                        <div className="flex flex-col gap-4">
                            <button onClick={() => setGameState('CHARACTER_SELECT')} className="px-6 py-4 bg-primary hover:bg-indigo-600 border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all text-sm">开始游戏</button>
                            <div className="grid grid-cols-3 gap-2">
                                {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map(d => (
                                    <button 
                                        key={d}
                                        onClick={() => setDifficulty(d)} 
                                        className={`py-2 text-xs border-2 ${difficulty === d ? 'border-yellow-400 text-yellow-400' : 'border-slate-600 text-slate-500'}`}
                                    >
                                        {d === 'EASY' ? '简单' : d === 'MEDIUM' ? '普通' : '困难'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Character Select */}
            {gameState === 'CHARACTER_SELECT' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white p-4">
                    <h2 className="text-xl mb-8">选择角色</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {(Object.keys(CHAR_CONFIG) as CharacterType[]).map(key => (
                            <button 
                                key={key}
                                onClick={() => setCharacter(key)}
                                className={`p-6 border-4 flex flex-col items-center gap-4 transition-all ${character === key ? 'border-yellow-400 bg-slate-800 scale-105' : 'border-slate-600 hover:border-slate-400'}`}
                            >
                                <div className="w-16 h-16" style={{ backgroundColor: CHAR_CONFIG[key].color }}></div>
                                <span className="text-xs">{CHAR_CONFIG[key].name}</span>
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setGameState('LEVEL_SELECT')} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white text-xs border-b-4 border-green-800 active:border-b-0">
                        确认选择
                    </button>
                </div>
            )}

             {/* Level Select */}
             {gameState === 'LEVEL_SELECT' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white p-4">
                    <h2 className="text-xl mb-8">选择关卡</h2>
                    <div className="flex gap-4 mb-8">
                        {(Object.keys(LEVEL_CONFIG) as LevelType[]).map(key => (
                            <button 
                                key={key}
                                onClick={() => setLevel(key)}
                                className={`px-4 py-8 w-32 border-4 transition-all text-xs ${level === key ? 'border-yellow-400 bg-slate-800' : 'border-slate-600'}`}
                            >
                                {key === 'GRASS' ? '🌱 草地' : key === 'SNOW' ? '❄️ 雪地' : '🌵 沙漠'}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setGameState('PLAYING')} className="px-8 py-4 bg-primary hover:bg-indigo-600 text-white text-sm border-b-4 border-indigo-800 active:border-b-0 animate-bounce">
                        进入关卡
                    </button>
                </div>
            )}

            {/* Game Over / Victory */}
            {(gameState === 'GAME_OVER' || gameState === 'VICTORY') && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white z-50">
                    {gameState === 'VICTORY' ? (
                        <Trophy size={64} className="text-yellow-400 mb-4" />
                    ) : (
                        <div className="text-6xl mb-4">💀</div>
                    )}
                    <h2 className={`text-2xl mb-2 ${gameState === 'VICTORY' ? 'text-yellow-400' : 'text-red-500'}`}>
                        {gameState === 'VICTORY' ? '关卡完成!' : '游戏结束'}
                    </h2>
                    <p className="text-sm text-slate-300 mb-8">最终得分: {score}</p>
                    <button onClick={() => setGameState('MENU')} className="px-6 py-3 bg-white text-black hover:bg-slate-200 flex items-center gap-2 text-xs">
                        <RefreshCw size={14} /> 返回菜单
                    </button>
                </div>
            )}
            
            {/* Controls Helper */}
            {gameState === 'PLAYING' && (
                <div className="absolute bottom-2 left-2 text-[10px] text-black/50 bg-white/50 p-2 rounded pointer-events-none">
                    WSAD / 方向键移动<br/>空格跳跃<br/>Z / K 攻击
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GameDemo;