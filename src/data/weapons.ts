
export interface Weapon {
  id: string;
  name: string;
  type: 'AR' | 'SMG' | 'Sniper' | 'DMR' | 'Shotgun' | 'LMG' | 'Pistol' | 'Melee' | 'Throwable';
  damage: number;
  fireRate: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  recoil: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  range: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  description: string;
}

const weapons: Weapon[] = [
  // Assault Rifles
  {
    id: 'ar-m416',
    name: 'M416',
    type: 'AR',
    damage: 41,
    fireRate: 'High',
    recoil: 'Low',
    range: 'Medium',
    description: 'Best all-rounder with excellent recoil control and attachment slots'
  },
  {
    id: 'ar-akm',
    name: 'AKM',
    type: 'AR',
    damage: 49,
    fireRate: 'Medium',
    recoil: 'High',
    range: 'Medium',
    description: 'High damage but difficult recoil pattern'
  },
  {
    id: 'ar-beryl',
    name: 'Beryl M762',
    type: 'AR',
    damage: 46,
    fireRate: 'High',
    recoil: 'Very High',
    range: 'Medium',
    description: 'Highest DPS assault rifle with challenging recoil'
  },
  {
    id: 'ar-g36c',
    name: 'G36C',
    type: 'AR',
    damage: 41,
    fireRate: 'High',
    recoil: 'Low',
    range: 'Medium',
    description: 'Vikendi exclusive AR with balanced performance'
  },
  {
    id: 'ar-groza',
    name: 'Groza',
    type: 'AR',
    damage: 49,
    fireRate: 'Very High',
    recoil: 'Medium',
    range: 'Medium',
    description: 'Airdrop-only weapon with exceptional close-range performance'
  },
  {
    id: 'ar-aug',
    name: 'AUG A3',
    type: 'AR',
    damage: 41,
    fireRate: 'High',
    recoil: 'Very Low',
    range: 'High',
    description: 'Airdrop-only weapon with minimal recoil and excellent accuracy'
  },
  {
    id: 'ar-scar',
    name: 'SCAR-L',
    type: 'AR',
    damage: 41,
    fireRate: 'Medium',
    recoil: 'Low',
    range: 'Medium',
    description: 'Reliable assault rifle with easy recoil pattern'
  },
  {
    id: 'ar-qbz',
    name: 'QBZ95',
    type: 'AR',
    damage: 41,
    fireRate: 'Medium',
    recoil: 'Low',
    range: 'Medium',
    description: 'Sanhok exclusive AR with high accuracy'
  },

  // SMGs
  {
    id: 'smg-ump45',
    name: 'UMP45',
    type: 'SMG',
    damage: 39,
    fireRate: 'Medium',
    recoil: 'Very Low',
    range: 'Low',
    description: 'Versatile SMG effective at close to medium range'
  },
  {
    id: 'smg-vector',
    name: 'Vector',
    type: 'SMG',
    damage: 31,
    fireRate: 'Very High',
    recoil: 'Low',
    range: 'Very Low',
    description: 'Highest rate of fire weapon with extended mag dependency'
  },
  {
    id: 'smg-uzi',
    name: 'Micro UZI',
    type: 'SMG',
    damage: 26,
    fireRate: 'Very High',
    recoil: 'Medium',
    range: 'Very Low',
    description: 'Close-range specialist with extreme fire rate'
  },
  {
    id: 'smg-mp5k',
    name: 'MP5K',
    type: 'SMG',
    damage: 33,
    fireRate: 'High',
    recoil: 'Very Low',
    range: 'Low',
    description: 'Vikendi exclusive SMG with excellent stability'
  },
  {
    id: 'smg-thompson',
    name: 'Tommy Gun',
    type: 'SMG',
    damage: 40,
    fireRate: 'Medium',
    recoil: 'Medium',
    range: 'Low',
    description: 'High damage SMG with limited attachment options'
  },
  {
    id: 'smg-pp19',
    name: 'PP-19 Bizon',
    type: 'SMG',
    damage: 35,
    fireRate: 'Medium',
    recoil: 'Very Low',
    range: 'Low',
    description: 'Large magazine capacity with decent overall performance'
  },

  // Sniper Rifles
  {
    id: 'sniper-awm',
    name: 'AWM',
    type: 'Sniper',
    damage: 120,
    fireRate: 'Very Low',
    recoil: 'High',
    range: 'Very High',
    description: 'Airdrop-only weapon that can one-shot level 3 helmets'
  },
  {
    id: 'sniper-kar98k',
    name: 'Kar98k',
    type: 'Sniper',
    damage: 75,
    fireRate: 'Very Low',
    recoil: 'Medium',
    range: 'Very High',
    description: 'Standard bolt-action sniper with high damage'
  },
  {
    id: 'sniper-m24',
    name: 'M24',
    type: 'Sniper',
    damage: 79,
    fireRate: 'Very Low',
    recoil: 'Medium',
    range: 'Very High',
    description: 'Bolt-action sniper with higher damage than Kar98k'
  },
  {
    id: 'sniper-win94',
    name: 'Win94',
    type: 'Sniper',
    damage: 66,
    fireRate: 'Low',
    recoil: 'Medium',
    range: 'High',
    description: 'Lever-action rifle with built-in 2.7x scope'
  },
  {
    id: 'sniper-mosin',
    name: 'Mosin Nagant',
    type: 'Sniper',
    damage: 79,
    fireRate: 'Very Low',
    recoil: 'Medium',
    range: 'Very High',
    description: 'Alternative to the M24 with nearly identical stats'
  },

  // DMRs
  {
    id: 'dmr-sks',
    name: 'SKS',
    type: 'DMR',
    damage: 53,
    fireRate: 'Medium',
    recoil: 'High',
    range: 'High',
    description: 'Semi-automatic DMR with full attachment support'
  },
  {
    id: 'dmr-slr',
    name: 'SLR',
    type: 'DMR',
    damage: 58,
    fireRate: 'Medium',
    recoil: 'High',
    range: 'High',
    description: 'High damage DMR with more recoil than SKS'
  },
  {
    id: 'dmr-mini14',
    name: 'Mini-14',
    type: 'DMR',
    damage: 46,
    fireRate: 'High',
    recoil: 'Low',
    range: 'High',
    description: 'Fast-firing DMR with easy recoil control'
  },
  {
    id: 'dmr-qbu',
    name: 'QBU',
    type: 'DMR',
    damage: 48,
    fireRate: 'Medium',
    recoil: 'Low',
    range: 'High',
    description: 'Sanhok exclusive DMR with bipod for prone shooting'
  },
  {
    id: 'dmr-mk12',
    name: 'Mk12',
    type: 'DMR',
    damage: 44,
    fireRate: 'High',
    recoil: 'Low',
    range: 'High',
    description: 'Modern DMR with good attachment compatibility'
  },
  {
    id: 'dmr-vss',
    name: 'VSS',
    type: 'DMR',
    damage: 41,
    fireRate: 'High',
    recoil: 'Low',
    range: 'Medium',
    description: 'Integral suppressor and scope with subsonic ammo'
  },

  // Shotguns
  {
    id: 'shotgun-s12k',
    name: 'S12K',
    type: 'Shotgun',
    damage: 198,
    fireRate: 'Medium',
    recoil: 'High',
    range: 'Very Low',
    description: 'Semi-automatic shotgun with magazine loading'
  },
  {
    id: 'shotgun-s686',
    name: 'S686',
    type: 'Shotgun',
    damage: 216,
    fireRate: 'Low',
    recoil: 'Medium',
    range: 'Very Low',
    description: 'Double-barrel shotgun with high burst damage'
  },
  {
    id: 'shotgun-s1897',
    name: 'S1897',
    type: 'Shotgun',
    damage: 216,
    fireRate: 'Low',
    recoil: 'Medium',
    range: 'Very Low',
    description: 'Pump-action shotgun with reliable performance'
  },
  {
    id: 'shotgun-dbs',
    name: 'DBS',
    type: 'Shotgun',
    damage: 216,
    fireRate: 'Medium',
    recoil: 'High',
    range: 'Low',
    description: 'Airdrop double-barrel shotgun with drum magazine'
  },

  // LMGs
  {
    id: 'lmg-m249',
    name: 'M249',
    type: 'LMG',
    damage: 45,
    fireRate: 'Very High',
    recoil: 'High',
    range: 'Medium',
    description: 'High capacity LMG with excellent suppressive fire'
  },
  {
    id: 'lmg-dp28',
    name: 'DP-28',
    type: 'LMG',
    damage: 51,
    fireRate: 'Medium',
    recoil: 'Medium',
    range: 'Medium',
    description: 'Erangel exclusive LMG with high damage per shot'
  },
  {
    id: 'lmg-mg3',
    name: 'MG3',
    type: 'LMG',
    damage: 40,
    fireRate: 'Very High',
    recoil: 'High',
    range: 'Medium',
    description: 'Airdrop LMG with adjustable fire rate'
  },

  // Pistols
  {
    id: 'pistol-p92',
    name: 'P92',
    type: 'Pistol',
    damage: 35,
    fireRate: 'Medium',
    recoil: 'Low',
    range: 'Very Low',
    description: 'Standard semi-automatic pistol'
  },
  {
    id: 'pistol-p1911',
    name: 'P1911',
    type: 'Pistol',
    damage: 41,
    fireRate: 'Medium',
    recoil: 'Medium',
    range: 'Very Low',
    description: 'Higher damage pistol with lower capacity'
  },
  {
    id: 'pistol-r45',
    name: 'R45',
    type: 'Pistol',
    damage: 55,
    fireRate: 'Low',
    recoil: 'High',
    range: 'Low',
    description: 'Miramar exclusive revolver with high damage'
  },
  {
    id: 'pistol-r1895',
    name: 'R1895',
    type: 'Pistol',
    damage: 55,
    fireRate: 'Very Low',
    recoil: 'High',
    range: 'Low',
    description: 'Classic revolver with high damage and slow reload'
  },
  {
    id: 'pistol-scorpion',
    name: 'Scorpion',
    type: 'Pistol',
    damage: 22,
    fireRate: 'Very High',
    recoil: 'Medium',
    range: 'Very Low',
    description: 'Machine pistol with high fire rate'
  },
  {
    id: 'pistol-deagle',
    name: 'Deagle',
    type: 'Pistol',
    damage: 62,
    fireRate: 'Low',
    recoil: 'Very High',
    range: 'Low',
    description: 'Highest damage pistol with substantial recoil'
  },

  // Melee
  {
    id: 'melee-pan',
    name: 'Pan',
    type: 'Melee',
    damage: 80,
    fireRate: 'Low',
    recoil: 'Low',
    range: 'Very Low',
    description: 'Blocks shots when carried on back, highest melee damage'
  },
  {
    id: 'melee-machete',
    name: 'Machete',
    type: 'Melee',
    damage: 60,
    fireRate: 'Low',
    recoil: 'Low',
    range: 'Very Low',
    description: 'Long reach melee weapon'
  },
  {
    id: 'melee-crowbar',
    name: 'Crowbar',
    type: 'Melee',
    damage: 60,
    fireRate: 'Low',
    recoil: 'Low',
    range: 'Very Low',
    description: 'Classic melee weapon'
  },
  {
    id: 'melee-sickle',
    name: 'Sickle',
    type: 'Melee',
    damage: 60,
    fireRate: 'Low',
    recoil: 'Low',
    range: 'Very Low',
    description: 'Curved blade with moderate damage'
  },

  // Throwables
  {
    id: 'throwable-frag',
    name: 'Frag Grenade',
    type: 'Throwable',
    damage: 100,
    fireRate: 'Very Low',
    recoil: 'None',
    range: 'Medium',
    description: 'High damage explosive with shrapnel effect'
  },
  {
    id: 'throwable-smoke',
    name: 'Smoke Grenade',
    type: 'Throwable',
    damage: 0,
    fireRate: 'Very Low',
    recoil: 'None',
    range: 'Medium',
    description: 'Creates smoke screen for cover'
  },
  {
    id: 'throwable-molotov',
    name: 'Molotov Cocktail',
    type: 'Throwable',
    damage: 60,
    fireRate: 'Very Low',
    recoil: 'None',
    range: 'Medium',
    description: 'Creates fire zone that damages players'
  },
  {
    id: 'throwable-stun',
    name: 'Stun Grenade',
    type: 'Throwable',
    damage: 0,
    fireRate: 'Very Low',
    recoil: 'None',
    range: 'Medium',
    description: 'Temporarily blinds and deafens enemies'
  },
  {
    id: 'throwable-sticky',
    name: 'Sticky Bomb',
    type: 'Throwable',
    damage: 90,
    fireRate: 'Very Low',
    recoil: 'None',
    range: 'Low',
    description: 'Sticks to surfaces before exploding'
  }
];

export default weapons;

// Helper functions to get weapons by type
export const getWeaponsByType = (type: Weapon['type']) => {
  return weapons.filter(weapon => weapon.type === type);
};

export const getAllWeaponTypes = (): Weapon['type'][] => {
  return ['AR', 'SMG', 'Sniper', 'DMR', 'Shotgun', 'LMG', 'Pistol', 'Melee', 'Throwable'];
};
