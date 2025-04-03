
export interface Weapon {
  id: string;
  name: string;
  type: string;
  damage: number;
  fireRate: number;
  recoil: string;
  range: "Very Low" | "Low" | "Medium" | "High" | "Very High" | "Very Long" | "Long" | "None";
  description: string;
}

const weapons: Weapon[] = [
  // Assault Rifles
  {
    id: "akm",
    name: "AKM",
    type: "Assault Rifle",
    damage: 49,
    fireRate: 0.1,
    recoil: "High",
    range: "Medium",
    description: "Powerful 7.62mm assault rifle with high damage and recoil."
  },
  {
    id: "m416",
    name: "M416",
    type: "Assault Rifle",
    damage: 43,
    fireRate: 0.086,
    recoil: "Medium",
    range: "Medium",
    description: "Versatile 5.56mm assault rifle with good stability and customization options."
  },
  {
    id: "scar_l",
    name: "SCAR-L",
    type: "Assault Rifle",
    damage: 43,
    fireRate: 0.096,
    recoil: "Medium",
    range: "Medium",
    description: "Accurate 5.56mm assault rifle with manageable recoil."
  },
  {
    id: "aug",
    name: "AUG",
    type: "Assault Rifle",
    damage: 43,
    fireRate: 0.086,
    recoil: "Low",
    range: "Medium",
    description: "Accurate 5.56mm assault rifle with low recoil, found in air drops."
  },
  {
    id: "groza",
    name: "Groza",
    type: "Assault Rifle",
    damage: 49,
    fireRate: 0.08,
    recoil: "High",
    range: "Medium",
    description: "High-damage 7.62mm assault rifle with a high fire rate, found in air drops."
  },
  {
    id: "beryl_m762",
    name: "Beryl M762",
    type: "Assault Rifle",
    damage: 47,
    fireRate: 0.086,
    recoil: "High",
    range: "Medium",
    description: "7.62mm assault rifle with high damage and a high rate of fire, but difficult to control."
  },
  {
    id: "mk47_mutant",
    name: "Mk47 Mutant",
    type: "Assault Rifle",
    damage: 49,
    fireRate: 0.1,
    recoil: "High",
    range: "Long",
    description: "7.62mm assault rifle that fires in two-round bursts or single shots, offering high damage at the cost of versatility."
  },

  // Sniper Rifles
  {
    id: "awm",
    name: "AWM",
    type: "Sniper Rifle",
    damage: 105,
    fireRate: 1.85,
    recoil: "High",
    range: "Very Long",
    description: "Extremely powerful sniper rifle that uses .300 Magnum ammo, found in air drops."
  },
  {
    id: "m24",
    name: "M24",
    type: "Sniper Rifle",
    damage: 79,
    fireRate: 2.0,
    recoil: "High",
    range: "Very Long",
    description: "Bolt-action sniper rifle that uses 7.62mm ammo."
  },
  {
    id: "kar98k",
    name: "Kar98k",
    type: "Sniper Rifle",
    damage: 75,
    fireRate: 4.0,
    recoil: "High",
    range: "Very Long",
    description: "Bolt-action sniper rifle that uses 7.62mm ammo."
  },
  {
    id: "sks",
    name: "SKS",
    type: "Sniper Rifle",
    damage: 55,
    fireRate: 0.09,
    recoil: "Medium",
    range: "Long",
    description: "Semi-automatic sniper rifle that uses 7.62mm ammo."
  },
  {
    id: "mini_14",
    name: "Mini 14",
    type: "Sniper Rifle",
    damage: 49,
    fireRate: 0.1,
    recoil: "Low",
    range: "Long",
    description: "Lightweight semi-automatic sniper rifle that uses 5.56mm ammo."
  },
  {
    id: "vss",
    name: "VSS",
    type: "Sniper Rifle",
    damage: 41,
    fireRate: 0.086,
    recoil: "Medium",
    range: "Medium",
    description: "Integrally suppressed sniper rifle that uses 9mm ammo."
  },
  {
    id: "slr",
    name: "SLR",
    type: "Sniper Rifle",
    damage: 58,
    fireRate: 0.1,
    recoil: "High",
    range: "Long",
    description: "Designated marksman rifle that uses 7.62mm ammo."
  },
    {
    id: "mk14",
    name: "Mk14",
    type: "Sniper Rifle",
    damage: 61,
    fireRate: 0.09,
    recoil: "High",
    range: "Long",
    description: "Designated marksman rifle that uses 7.62mm ammo, found in air drops."
  },

  // Submachine Guns
  {
    id: "ump45",
    name: "UMP45",
    type: "Submachine Gun",
    damage: 41,
    fireRate: 0.092,
    recoil: "Low",
    range: "Low",
    description: "Versatile submachine gun that uses .45 ACP ammo."
  },
  {
    id: "vector",
    name: "Vector",
    type: "Submachine Gun",
    damage: 31,
    fireRate: 0.055,
    recoil: "Low",
    range: "Low",
    description: "High-rate-of-fire submachine gun that uses .45 ACP ammo."
  },
  {
    id: "uzi",
    name: "Uzi",
    type: "Submachine Gun",
    damage: 26,
    fireRate: 0.048,
    recoil: "Medium",
    range: "Low",
    description: "Fully automatic submachine gun that uses 9mm ammo."
  },
  {
    id: "pp_19_bizon",
    name: "PP-19 Bizon",
    type: "Submachine Gun",
    damage: 35,
    fireRate: 0.076,
    recoil: "Low",
    range: "Low",
    description: "Submachine gun with a large magazine that uses 9mm ammo."
  },
  {
    id: "mp5k",
    name: "MP5K",
    type: "Submachine Gun",
    damage: 33,
    fireRate: 0.075,
    recoil: "Low",
    range: "Low",
    description: "Submachine gun that uses 9mm ammo."
  },
  {
    id: "p90",
    name: "P90",
    type: "Submachine Gun",
    damage: 30,
    fireRate: 0.07,
    recoil: "Low",
    range: "Low",
    description: "Submachine gun that uses 5.7mm ammo, found in air drops."
  },

  // Light Machine Guns
  {
    id: "m249",
    name: "M249",
    type: "Light Machine Gun",
    damage: 45,
    fireRate: 0.075,
    recoil: "High",
    range: "Medium",
    description: "Light machine gun with a large magazine that uses 5.56mm ammo, found in air drops."
  },
  {
    id: "dp_28",
    name: "DP-28",
    type: "Light Machine Gun",
    damage: 51,
    fireRate: 0.109,
    recoil: "Medium",
    range: "Medium",
    description: "Light machine gun that uses 7.62mm ammo."
  },

  // Shotguns
  {
    id: "s12k",
    name: "S12K",
    type: "Shotgun",
    damage: 24,
    fireRate: 0.25,
    recoil: "High",
    range: "Low",
    description: "Semi-automatic shotgun that uses 12 gauge ammo."
  },
  {
    id: "s686",
    name: "S686",
    type: "Shotgun",
    damage: 26,
    fireRate: 0.2,
    recoil: "High",
    range: "Low",
    description: "Double-barreled shotgun that uses 12 gauge ammo."
  },
  {
    id: "s1897",
    name: "S1897",
    type: "Shotgun",
    damage: 25,
    fireRate: 0.4,
    recoil: "High",
    range: "Low",
    description: "Pump-action shotgun that uses 12 gauge ammo."
  },
  {
    id: "sawed_off",
    name: "Sawed-off",
    type: "Shotgun",
    damage: 22,
    fireRate: 0.22,
    recoil: "High",
    range: "Very Low",
    description: "Short double-barreled shotgun that uses 12 gauge ammo."
  },
  {
    id: "dbs",
    name: "DBS",
    type: "Shotgun",
    damage: 34,
    fireRate: 0.2,
    recoil: "High",
    range: "Low",
    description: "Double-barreled pump-action shotgun that uses 12 gauge ammo, found in air drops."
  },

  // Pistols
  {
    id: "p92",
    name: "P92",
    type: "Pistol",
    damage: 35,
    fireRate: 0.13,
    recoil: "Very Low",
    range: "Low",
    description: "Standard 9mm pistol with 15-round magazine. Low damage but easy to control."
  },
  {
    id: "p1911",
    name: "P1911",
    type: "Pistol",
    damage: 41,
    fireRate: 0.11,
    recoil: "Medium",
    range: "Low",
    description: "Classic .45 ACP pistol with high damage and moderate recoil."
  },
  {
    id: "r1895",
    name: "R1895",
    type: "Pistol",
    damage: 55,
    fireRate: 0.4,
    recoil: "High",
    range: "Low",
    description: "Revolver that uses 7.62mm ammo. High damage but slow rate of fire."
  },
  {
    id: "desert_eagle",
    name: "Desert Eagle",
    type: "Pistol",
    damage: 62,
    fireRate: 0.2,
    recoil: "Very High",
    range: "Low",
    description: "High-damage pistol that uses .45 ACP ammo. Difficult to control."
  },
  {
    id: "glock_18c",
    name: "Glock 18C",
    type: "Pistol",
    damage: 19,
    fireRate: 0.06,
    recoil: "High",
    range: "Low",
    description: "Fully automatic pistol that uses 9mm ammo. Very high rate of fire but difficult to control."
  },

  // Melee
  {
    id: "crowbar",
    name: "Crowbar",
    type: "Melee",
    damage: 60,
    fireRate: 0.7,
    recoil: "Very Low",
    range: "Very Low",
    description: "A versatile tool that can be used as a melee weapon."
  },
  {
    id: "machete",
    name: "Machete",
    type: "Melee",
    damage: 65,
    fireRate: 0.6,
    recoil: "Very Low",
    range: "Very Low",
    description: "A large knife that can be used as a melee weapon."
  },
  {
    id: "sickle",
    name: "Sickle",
    type: "Melee",
    damage: 55,
    fireRate: 0.8,
    recoil: "Very Low",
    range: "Very Low",
    description: "A curved blade that can be used as a melee weapon."
  },
  {
    id: "pan",
    name: "Pan",
    type: "Melee",
    damage: 80,
    fireRate: 0.5,
    recoil: "Very Low",
    range: "Very Low",
    description: "Cast iron pan that can be used for both attack and defense. Can block bullets when equipped on the back."
  },

  // Throwables
  {
    id: "frag_grenade",
    name: "Frag Grenade",
    type: "Throwable",
    damage: 100,
    fireRate: 0,
    recoil: "Very Low",
    range: "Medium",
    description: "High-damage explosive with 5-second fuse. Lethal within close range."
  },
  {
    id: "smoke_grenade",
    name: "Smoke Grenade",
    type: "Throwable",
    damage: 0,
    fireRate: 0,
    recoil: "Very Low",
    range: "Medium",
    description: "Creates a cloud of smoke to obscure vision. Useful for cover and distractions."
  },
  {
    id: "stun_grenade",
    name: "Stun Grenade",
    type: "Throwable",
    damage: 0,
    fireRate: 0,
    recoil: "Very Low",
    range: "Medium",
    description: "Temporarily blinds and deafens enemies. Effective for clearing rooms."
  },
  {
    id: "molotov_cocktail",
    name: "Molotov Cocktail",
    type: "Throwable",
    damage: 75,
    fireRate: 0,
    recoil: "Very Low",
    range: "Medium",
    description: "Incendiary device that creates a fire area. Useful for area denial."
  },

  // Miscellaneous
  {
    id: "gas_can",
    name: "Gas Can",
    type: "Miscellaneous",
    damage: 0,
    fireRate: 0,
    recoil: "Very Low",
    range: "None",
    description: "Used to refuel vehicles. Can be shot to create an explosion."
  }
];

export const getWeaponsByType = (type: string): Weapon[] => {
  return weapons.filter(weapon => weapon.type === type);
};

export const getAllWeaponTypes = (): string[] => {
  return [...new Set(weapons.map(weapon => weapon.type))];
};

export default weapons;
