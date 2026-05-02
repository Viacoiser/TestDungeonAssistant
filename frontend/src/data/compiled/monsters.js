/**
 * monsters de D&D 5e
 * Datos compilados desde API
 * Total de items: 100
 */

export const monsters = [
  {
    "index": "aboleth",
    "name": "Aboleth",
    "size": "Large",
    "type": "aberration",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 17
      }
    ],
    "hit_points": 135,
    "hit_dice": "18d10",
    "hit_points_roll": "18d10+36",
    "speed": {
      "walk": "10 ft.",
      "swim": "40 ft."
    },
    "strength": 21,
    "dexterity": 9,
    "constitution": 15,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 18,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-int",
          "name": "Saving Throw: INT",
          "url": "/api/2014/proficiencies/saving-throw-int"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 12,
        "proficiency": {
          "index": "skill-history",
          "name": "Skill: History",
          "url": "/api/2014/proficiencies/skill-history"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 20
    },
    "languages": "Deep Speech, telepathy 120 ft.",
    "challenge_rating": 10,
    "proficiency_bonus": 4,
    "xp": 5900,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The aboleth can breathe air and water.",
        "damage": []
      },
      {
        "name": "Mucous Cloud",
        "desc": "While underwater, the aboleth is surrounded by transformative mucus. A creature that touches the aboleth or that hits it with a melee attack while within 5 ft. of it must make a DC 14 Constitution saving throw. On a failure, the creature is diseased for 1d4 hours. The diseased creature can breathe only underwater.",
        "dc": {
          "dc_type": {
            "index": "con",
            "name": "CON",
            "url": "/api/2014/ability-scores/con"
          },
          "dc_value": 14,
          "success_type": "none"
        },
        "damage": []
      },
      {
        "name": "Probing Telepathy",
        "desc": "If a creature communicates telepathically with the aboleth, the aboleth learns the creature's greatest desires if the aboleth can see the creature.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The aboleth makes three tentacle attacks.",
        "actions": [
          {
            "action_name": "Tentacle",
            "count": "3",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Tentacle",
        "desc": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed.",
        "attack_bonus": 9,
        "dc": {
          "dc_type": {
            "index": "con",
            "name": "CON",
            "url": "/api/2014/ability-scores/con"
          },
          "dc_value": 14,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+5"
          },
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "1d12"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) bludgeoning damage.",
        "attack_bonus": 9,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d6+5"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Enslave",
        "desc": "The aboleth targets one creature it can see within 30 ft. of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically with each other over any distance.\nWhenever the charmed target takes damage, the target can repeat the saving throw. On a success, the effect ends. No more than once every 24 hours, the target can also repeat the saving throw when it is at least 1 mile away from the aboleth.",
        "usage": {
          "type": "per day",
          "times": 3
        },
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 14,
          "success_type": "none"
        },
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The aboleth makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Swipe",
        "desc": "The aboleth makes one tail attack.",
        "damage": []
      },
      {
        "name": "Psychic Drain (Costs 2 Actions)",
        "desc": "One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes.",
        "damage": [
          {
            "damage_type": {
              "index": "psychic",
              "name": "Psychic",
              "url": "/api/2014/damage-types/psychic"
            },
            "damage_dice": "3d6"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/aboleth.png",
    "url": "/api/2014/monsters/aboleth",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "acolyte",
    "name": "Acolyte",
    "desc": "Acolytes are junior members of a clergy, usually answerable to a priest. They perform a variety of functions in a temple and are granted minor spellcasting power by their deities.",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "alignment": "any alignment",
    "armor_class": [
      {
        "type": "dex",
        "value": 10
      }
    ],
    "hit_points": 9,
    "hit_dice": "2d8",
    "hit_points_roll": "2d8",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 10,
    "dexterity": 10,
    "constitution": 10,
    "intelligence": 10,
    "wisdom": 14,
    "charisma": 11,
    "proficiencies": [
      {
        "value": 4,
        "proficiency": {
          "index": "skill-medicine",
          "name": "Skill: Medicine",
          "url": "/api/2014/proficiencies/skill-medicine"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "skill-religion",
          "name": "Skill: Religion",
          "url": "/api/2014/proficiencies/skill-religion"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 12
    },
    "languages": "any one language (usually Common)",
    "challenge_rating": 0.25,
    "proficiency_bonus": 2,
    "xp": 50,
    "special_abilities": [
      {
        "name": "Spellcasting",
        "desc": "The acolyte is a 1st-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). The acolyte has following cleric spells prepared:\n\n- Cantrips (at will): light, sacred flame, thaumaturgy\n- 1st level (3 slots): bless, cure wounds, sanctuary",
        "spellcasting": {
          "level": 1,
          "ability": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc": 12,
          "modifier": 4,
          "components_required": [
            "V",
            "S",
            "M"
          ],
          "school": "cleric",
          "slots": {
            "1": 3
          },
          "spells": [
            {
              "name": "Light",
              "level": 0,
              "url": "/api/2014/spells/light"
            },
            {
              "name": "Sacred Flame",
              "level": 0,
              "url": "/api/2014/spells/sacred-flame"
            },
            {
              "name": "Thaumaturgy",
              "level": 0,
              "url": "/api/2014/spells/thaumaturgy"
            },
            {
              "name": "Bless",
              "level": 1,
              "url": "/api/2014/spells/bless"
            },
            {
              "name": "Cure Wounds",
              "level": 1,
              "url": "/api/2014/spells/cure-wounds"
            },
            {
              "name": "Sanctuary",
              "level": 1,
              "url": "/api/2014/spells/sanctuary"
            }
          ]
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Club",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d4"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/acolyte.png",
    "url": "/api/2014/monsters/acolyte",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "adult-black-dragon",
    "name": "Adult Black Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 19
      }
    ],
    "hit_points": 195,
    "hit_dice": "17d12",
    "hit_points_roll": "17d12+85",
    "speed": {
      "walk": "40 ft.",
      "fly": "80 ft.",
      "swim": "40 ft."
    },
    "strength": 23,
    "dexterity": 14,
    "constitution": 21,
    "intelligence": 14,
    "wisdom": 13,
    "charisma": 17,
    "proficiencies": [
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "acid"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 21
    },
    "languages": "Common, Draconic",
    "challenge_rating": 14,
    "proficiency_bonus": 5,
    "xp": 11500,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The dragon can breathe air and water.",
        "damage": []
      },
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) acid damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+6"
          },
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "1d8"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+6"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 16,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "name": "Acid Breath",
        "desc": "The dragon exhales acid in a 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 18,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "12d8"
          }
        ],
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 19,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+6"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/adult-black-dragon.png",
    "url": "/api/2014/monsters/adult-black-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "adult-blue-dragon",
    "name": "Adult Blue Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 19
      }
    ],
    "hit_points": 225,
    "hit_dice": "18d12",
    "hit_points_roll": "18d12+108",
    "speed": {
      "walk": "40 ft.",
      "burrow": "30 ft.",
      "fly": "80 ft."
    },
    "strength": 25,
    "dexterity": 10,
    "constitution": 23,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 19,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 12,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "lightning"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 22
    },
    "languages": "Common, Draconic",
    "challenge_rating": 16,
    "proficiency_bonus": 5,
    "xp": 15000,
    "special_abilities": [
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) piercing damage plus 5 (1d10) lightning damage.",
        "attack_bonus": 12,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+7"
          },
          {
            "damage_type": {
              "index": "lightning",
              "name": "Lightning",
              "url": "/api/2014/damage-types/lightning"
            },
            "damage_dice": "1d10"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 7) slashing damage.",
        "attack_bonus": 12,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+7"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +12 to hit, reach 15 ft., one target. Hit: 16 (2d8 + 7) bludgeoning damage.",
        "attack_bonus": 12,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+7"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 ft. of the dragon and aware of it must succeed on a DC 17 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 17,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "name": "Lightning Breath",
        "desc": "The dragon exhales lightning in a 90-foot line that is 5 ft. wide. Each creature in that line must make a DC 19 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 19,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "lightning",
              "name": "Lightning",
              "url": "/api/2014/damage-types/lightning"
            },
            "damage_dice": "12d10"
          }
        ],
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 20,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+6"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/adult-blue-dragon.png",
    "url": "/api/2014/monsters/adult-blue-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "adult-brass-dragon",
    "name": "Adult Brass Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "chaotic good",
    "armor_class": [
      {
        "type": "natural",
        "value": 18
      }
    ],
    "hit_points": 172,
    "hit_dice": "15d12",
    "hit_points_roll": "15d12+75",
    "speed": {
      "walk": "40 ft.",
      "burrow": "40 ft.",
      "fly": "80 ft."
    },
    "strength": 23,
    "dexterity": 10,
    "constitution": 21,
    "intelligence": 14,
    "wisdom": 13,
    "charisma": 17,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-history",
          "name": "Skill: History",
          "url": "/api/2014/proficiencies/skill-history"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "skill-persuasion",
          "name": "Skill: Persuasion",
          "url": "/api/2014/proficiencies/skill-persuasion"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "fire"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 21
    },
    "languages": "Common, Draconic",
    "challenge_rating": 13,
    "proficiency_bonus": 5,
    "xp": 10000,
    "special_abilities": [
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+6"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours .",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 16,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 45 (13d6) fire damage on a failed save, or half as much damage on a successful one.\nSleep Breath. The dragon exhales sleep gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Fire Breath",
                "dc": {
                  "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                  },
                  "dc_value": 18,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "fire",
                      "name": "Fire",
                      "url": "/api/2014/damage-types/fire"
                    },
                    "damage_dice": "13d6"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Sleep Breath",
                "dc": {
                  "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                  },
                  "dc_value": 18,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 19,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+6"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/adult-brass-dragon.png",
    "url": "/api/2014/monsters/adult-brass-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "adult-bronze-dragon",
    "name": "Adult Bronze Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "lawful good",
    "armor_class": [
      {
        "type": "natural",
        "value": 19
      }
    ],
    "hit_points": 212,
    "hit_dice": "17d12",
    "hit_points_roll": "17d12+102",
    "speed": {
      "walk": "40 ft.",
      "fly": "80 ft.",
      "swim": "40 ft."
    },
    "strength": 25,
    "dexterity": 10,
    "constitution": 23,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 19,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/2014/proficiencies/skill-insight"
        }
      },
      {
        "value": 12,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "lightning"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 22
    },
    "languages": "Common, Draconic",
    "challenge_rating": 15,
    "proficiency_bonus": 5,
    "xp": 13000,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The dragon can breathe air and water.",
        "damage": []
      },
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) piercing damage.",
        "attack_bonus": 12,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+7"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 7) slashing damage.",
        "attack_bonus": 12,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+7"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +12 to hit, reach 15 ft., one target. Hit: 16 (2d8 + 7) bludgeoning damage.",
        "attack_bonus": 12,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+7"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 17 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 17,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nLightning Breath. The dragon exhales lightning in a 90-foot line that is 5 feet wide. Each creature in that line must make a DC 19 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one.\nRepulsion Breath. The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 19 Strength saving throw. On a failed save, the creature is pushed 60 feet away from the dragon.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Lightning Breath",
                "dc": {
                  "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                  },
                  "dc_value": 19,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "lightning",
                      "name": "Lightning",
                      "url": "/api/2014/damage-types/lightning"
                    },
                    "damage_dice": "12d10"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Repulsion Breath",
                "dc": {
                  "dc_type": {
                    "index": "str",
                    "name": "STR",
                    "url": "/api/2014/ability-scores/str"
                  },
                  "dc_value": 19,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 20,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+7"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/adult-bronze-dragon.png",
    "url": "/api/2014/monsters/adult-bronze-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "adult-copper-dragon",
    "name": "Adult Copper Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "chaotic good",
    "armor_class": [
      {
        "type": "natural",
        "value": 18
      }
    ],
    "hit_points": 184,
    "hit_dice": "16d12",
    "hit_points_roll": "16d12+80",
    "speed": {
      "walk": "40 ft.",
      "climb": "40 ft.",
      "fly": "80 ft."
    },
    "strength": 23,
    "dexterity": 12,
    "constitution": 21,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 17,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "skill-deception",
          "name": "Skill: Deception",
          "url": "/api/2014/proficiencies/skill-deception"
        }
      },
      {
        "value": 12,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "acid"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 22
    },
    "languages": "Common, Draconic",
    "challenge_rating": 14,
    "proficiency_bonus": 5,
    "xp": 11500,
    "special_abilities": [
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+6"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 16,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nAcid Breath. The dragon exhales acid in an 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one.\nSlowing Breath. The dragon exhales gas in a 60-foot cone. Each creature in that area must succeed on a DC 18 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Acid Breath",
                "dc": {
                  "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                  },
                  "dc_value": 18,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "acid",
                      "name": "Acid",
                      "url": "/api/2014/damage-types/acid"
                    },
                    "damage_dice": "12d8"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Slowing Breath",
                "dc": {
                  "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                  },
                  "dc_value": 18,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 19,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "13d6+6"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/adult-copper-dragon.png",
    "url": "/api/2014/monsters/adult-copper-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "adult-gold-dragon",
    "name": "Adult Gold Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "lawful good",
    "armor_class": [
      {
        "type": "natural",
        "value": 19
      }
    ],
    "hit_points": 256,
    "hit_dice": "19d12",
    "hit_points_roll": "19d12+133",
    "speed": {
      "walk": "40 ft.",
      "fly": "80 ft.",
      "swim": "40 ft."
    },
    "strength": 27,
    "dexterity": 14,
    "constitution": 25,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 24,
    "proficiencies": [
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 13,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 13,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/2014/proficiencies/skill-insight"
        }
      },
      {
        "value": 14,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 13,
        "proficiency": {
          "index": "skill-persuasion",
          "name": "Skill: Persuasion",
          "url": "/api/2014/proficiencies/skill-persuasion"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "fire"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 24
    },
    "languages": "Common, Draconic",
    "challenge_rating": 17,
    "proficiency_bonus": 6,
    "xp": 18000,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The dragon can breathe air and water.",
        "damage": []
      },
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+8"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 21,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 66 (12d10) fire damage on a failed save, or half as much damage on a successful one.\nWeakening Breath. The dragon exhales gas in a 60-foot cone. Each creature in that area must succeed on a DC 21 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Fire Breath",
                "dc": {
                  "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                  },
                  "dc_value": 21,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "fire",
                      "name": "Fire",
                      "url": "/api/2014/damage-types/fire"
                    },
                    "damage_dice": "12d10"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Weakening Breath",
                "dc": {
                  "dc_type": {
                    "index": "str",
                    "name": "STR",
                    "url": "/api/2014/ability-scores/str"
                  },
                  "dc_value": 21,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 22,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+8"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/adult-gold-dragon.png",
    "url": "/api/2014/monsters/adult-gold-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "adult-green-dragon",
    "name": "Adult Green Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 19
      }
    ],
    "hit_points": 207,
    "hit_dice": "18d12",
    "hit_points_roll": "18d12+90",
    "speed": {
      "walk": "40 ft.",
      "fly": "80 ft.",
      "swim": "40 ft."
    },
    "strength": 23,
    "dexterity": 12,
    "constitution": 21,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 17,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "skill-deception",
          "name": "Skill: Deception",
          "url": "/api/2014/proficiencies/skill-deception"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/2014/proficiencies/skill-insight"
        }
      },
      {
        "value": 12,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "skill-persuasion",
          "name": "Skill: Persuasion",
          "url": "/api/2014/proficiencies/skill-persuasion"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 22
    },
    "languages": "Common, Draconic",
    "challenge_rating": 15,
    "proficiency_bonus": 5,
    "xp": 13000,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The dragon can breathe air and water.",
        "damage": []
      },
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 7 (2d6) poison damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+6"
          },
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "2d6"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+6"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours .",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 16,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "name": "Poison Breath",
        "desc": "The dragon exhales poisonous gas in a 60-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 56 (16d6) poison damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "con",
            "name": "CON",
            "url": "/api/2014/ability-scores/con"
          },
          "dc_value": 18,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "16d6"
          }
        ],
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 19,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+6"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/adult-green-dragon.png",
    "url": "/api/2014/monsters/adult-green-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "adult-red-dragon",
    "name": "Adult Red Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 19
      }
    ],
    "hit_points": 256,
    "hit_dice": "19d12",
    "hit_points_roll": "19d12+133",
    "speed": {
      "walk": "40 ft.",
      "climb": "40 ft.",
      "fly": "80 ft."
    },
    "strength": 27,
    "dexterity": 10,
    "constitution": 25,
    "intelligence": 16,
    "wisdom": 13,
    "charisma": 21,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 13,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 13,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "fire"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 23
    },
    "languages": "Common, Draconic",
    "challenge_rating": 17,
    "proficiency_bonus": 6,
    "xp": 18000,
    "special_abilities": [
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 7 (2d6) fire damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+8"
          },
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "2d6"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+8"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 ft. of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 19,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "name": "Fire Breath",
        "desc": "The dragon exhales fire in a 60-foot cone. Each creature in that area must make a DC 21 Dexterity saving throw, taking 63 (18d6) fire damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 21,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "18d6"
          }
        ],
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 22,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+8"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/adult-red-dragon.png",
    "url": "/api/2014/monsters/adult-red-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "adult-silver-dragon",
    "name": "Adult Silver Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "lawful good",
    "armor_class": [
      {
        "type": "natural",
        "value": 19
      }
    ],
    "hit_points": 243,
    "hit_dice": "18d12",
    "hit_points_roll": "18d12+126",
    "speed": {
      "walk": "40 ft.",
      "fly": "80 ft."
    },
    "strength": 27,
    "dexterity": 10,
    "constitution": 25,
    "intelligence": 16,
    "wisdom": 13,
    "charisma": 21,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 12,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "skill-arcana",
          "name": "Skill: Arcana",
          "url": "/api/2014/proficiencies/skill-arcana"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "skill-history",
          "name": "Skill: History",
          "url": "/api/2014/proficiencies/skill-history"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "cold"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 21
    },
    "languages": "Common, Draconic",
    "challenge_rating": 16,
    "proficiency_bonus": 5,
    "xp": 15000,
    "special_abilities": [
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage.",
        "attack_bonus": 13,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attack_bonus": 13,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attack_bonus": 13,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+8"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 18 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 18,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nCold Breath. The dragon exhales an icy blast in a 60-foot cone. Each creature in that area must make a DC 20 Constitution saving throw, taking 58 (13d8) cold damage on a failed save, or half as much damage on a successful one.\nParalyzing Breath. The dragon exhales paralyzing gas in a 60-foot cone. Each creature in that area must succeed on a DC 20 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Cold Breath",
                "dc": {
                  "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                  },
                  "dc_value": 20,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "cold",
                      "name": "Cold",
                      "url": "/api/2014/damage-types/cold"
                    },
                    "damage_dice": "13d8"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Paralyzing Breath",
                "dc": {
                  "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                  },
                  "dc_value": 20,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 22,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+8"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/adult-silver-dragon.png",
    "url": "/api/2014/monsters/adult-silver-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "adult-white-dragon",
    "name": "Adult White Dragon",
    "size": "Huge",
    "type": "dragon",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 18
      }
    ],
    "hit_points": 200,
    "hit_dice": "16d12",
    "hit_points_roll": "16d12+96",
    "speed": {
      "walk": "40 ft.",
      "burrow": "30 ft.",
      "fly": "80 ft.",
      "swim": "40 ft."
    },
    "strength": 22,
    "dexterity": 10,
    "constitution": 22,
    "intelligence": 8,
    "wisdom": 12,
    "charisma": 12,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "cold"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 21
    },
    "languages": "Common, Draconic",
    "challenge_rating": 13,
    "proficiency_bonus": 5,
    "xp": 10000,
    "special_abilities": [
      {
        "name": "Ice Walk",
        "desc": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra moment.",
        "damage": []
      },
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) cold damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+6"
          },
          {
            "damage_type": {
              "index": "cold",
              "name": "Cold",
              "url": "/api/2014/damage-types/cold"
            },
            "damage_dice": "1d8"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.",
        "attack_bonus": 11,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+6"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 ft. of the dragon and aware of it must succeed on a DC 14 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 14,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "name": "Cold Breath",
        "desc": "The dragon exhales an icy blast in a 60-foot cone. Each creature in that area must make a DC 19 Constitution saving throw, taking 54 (12d8) cold damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "con",
            "name": "CON",
            "url": "/api/2014/ability-scores/con"
          },
          "dc_value": 19,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "cold",
              "name": "Cold",
              "url": "/api/2014/damage-types/cold"
            },
            "damage_dice": "12d8"
          }
        ],
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 19,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+6"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/adult-white-dragon.png",
    "url": "/api/2014/monsters/adult-white-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "air-elemental",
    "name": "Air Elemental",
    "size": "Large",
    "type": "elemental",
    "alignment": "neutral",
    "armor_class": [
      {
        "type": "dex",
        "value": 15
      }
    ],
    "hit_points": 90,
    "hit_dice": "12d10",
    "hit_points_roll": "12d10+24",
    "speed": {
      "fly": "90 ft.",
      "hover": true
    },
    "strength": 14,
    "dexterity": 20,
    "constitution": 14,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 6,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "lightning",
      "thunder",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damage_immunities": [
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "grappled",
        "name": "Grappled",
        "url": "/api/2014/conditions/grappled"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      },
      {
        "index": "prone",
        "name": "Prone",
        "url": "/api/2014/conditions/prone"
      },
      {
        "index": "restrained",
        "name": "Restrained",
        "url": "/api/2014/conditions/restrained"
      },
      {
        "index": "unconscious",
        "name": "Unconscious",
        "url": "/api/2014/conditions/unconscious"
      }
    ],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 10
    },
    "languages": "Auran",
    "challenge_rating": 5,
    "proficiency_bonus": 3,
    "xp": 1800,
    "special_abilities": [
      {
        "name": "Air Form",
        "desc": "The elemental can enter a hostile creature's space and stop there. It can move through a space as narrow as 1 inch wide without squeezing.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The elemental makes two slam attacks.",
        "actions": [
          {
            "action_name": "Slam",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Slam",
        "desc": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+5"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Whirlwind",
        "desc": "Each creature in the elemental's space must make a DC 13 Strength saving throw. On a failure, a target takes 15 (3d8 + 2) bludgeoning damage and is flung up 20 feet away from the elemental in a random direction and knocked prone. If a thrown target strikes an object, such as a wall or floor, the target takes 3 (1d6) bludgeoning damage for every 10 feet it was thrown. If the target is thrown at another creature, that creature must succeed on a DC 13 Dexterity saving throw or take the same damage and be knocked prone.\nIf the saving throw is successful, the target takes half the bludgeoning damage and isn't flung away or knocked prone.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 4
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/air-elemental.png",
    "url": "/api/2014/monsters/air-elemental",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "ancient-black-dragon",
    "name": "Ancient Black Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 22
      }
    ],
    "hit_points": 367,
    "hit_dice": "21d20",
    "hit_points_roll": "21d20+147",
    "speed": {
      "walk": "40 ft.",
      "fly": "80 ft.",
      "swim": "40 ft."
    },
    "strength": 27,
    "dexterity": 14,
    "constitution": 25,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 19,
    "proficiencies": [
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 14,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 16,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "acid"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 26
    },
    "languages": "Common, Draconic",
    "challenge_rating": 21,
    "proficiency_bonus": 7,
    "xp": 33000,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The dragon can breathe air and water.",
        "damage": []
      },
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack:+ 15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) acid damage.",
        "attack_bonus": 15,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+8"
          },
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "2d8"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attack_bonus": 15,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attack_bonus": 15,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+8"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 19,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "name": "Acid Breath",
        "desc": "The dragon exhales acid in a 90-foot line that is 10 feet wide. Each creature in that line must make a DC 22 Dexterity saving throw, taking 67 (15d8) acid damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 22,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "15d8"
          }
        ],
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 23,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+8"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/ancient-black-dragon.png",
    "url": "/api/2014/monsters/ancient-black-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "ancient-blue-dragon",
    "name": "Ancient Blue Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 22
      }
    ],
    "hit_points": 481,
    "hit_dice": "26d20",
    "hit_points_roll": "26d20+208",
    "speed": {
      "walk": "40 ft.",
      "burrow": "40 ft.",
      "fly": "80 ft."
    },
    "strength": 29,
    "dexterity": 10,
    "constitution": 27,
    "intelligence": 18,
    "wisdom": 17,
    "charisma": 21,
    "proficiencies": [
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 15,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 12,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 17,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "lightning"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 27
    },
    "languages": "Common, Draconic",
    "challenge_rating": 23,
    "proficiency_bonus": 7,
    "xp": 50000,
    "special_abilities": [
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 20 (2d10 + 9) piercing damage plus 11 (2d10) lightning damage.",
        "attack_bonus": 16,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+9"
          },
          {
            "damage_type": {
              "index": "lightning",
              "name": "Lightning",
              "url": "/api/2014/damage-types/lightning"
            },
            "damage_dice": "2d10"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 16 (2d6 + 9) slashing damage.",
        "attack_bonus": 16,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+9"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +16 to hit, reach 20 ft., one target. Hit: 18 (2d8 + 9) bludgeoning damage.",
        "attack_bonus": 16,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+9"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 20 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 20,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "name": "Lightning Breath",
        "desc": "The dragon exhales lightning in a 120-foot line that is 10 feet wide. Each creature in that line must make a DC 23 Dexterity saving throw, taking 88 (16d10) lightning damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 23,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "lightning",
              "name": "Lightning",
              "url": "/api/2014/damage-types/lightning"
            },
            "damage_dice": "16d10"
          }
        ],
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 24 Dexterity saving throw or take 16 (2d6 + 9) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 24,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+9"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/ancient-blue-dragon.png",
    "url": "/api/2014/monsters/ancient-blue-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "ancient-brass-dragon",
    "name": "Ancient Brass Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "chaotic good",
    "armor_class": [
      {
        "type": "natural",
        "value": 20
      }
    ],
    "hit_points": 297,
    "hit_dice": "17d20",
    "hit_points_roll": "17d20+119",
    "speed": {
      "walk": "40 ft.",
      "burrow": "40 ft.",
      "fly": "80 ft."
    },
    "strength": 27,
    "dexterity": 10,
    "constitution": 25,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 19,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 13,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "skill-history",
          "name": "Skill: History",
          "url": "/api/2014/proficiencies/skill-history"
        }
      },
      {
        "value": 14,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "skill-persuasion",
          "name": "Skill: Persuasion",
          "url": "/api/2014/proficiencies/skill-persuasion"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "fire"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 24
    },
    "languages": "Common, Draconic",
    "challenge_rating": 20,
    "proficiency_bonus": 6,
    "xp": 25000,
    "special_abilities": [
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +14 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+8"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 18 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 18,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons:\nFire Breath. The dragon exhales fire in an 90-foot line that is 10 feet wide. Each creature in that line must make a DC 21 Dexterity saving throw, taking 56 (16d6) fire damage on a failed save, or half as much damage on a successful one.\nSleep Breath. The dragon exhales sleep gas in a 90-foot cone. Each creature in that area must succeed on a DC 21 Constitution saving throw or fall unconscious for 10 minutes. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Fire Breath",
                "dc": {
                  "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                  },
                  "dc_value": 21,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "fire",
                      "name": "Fire",
                      "url": "/api/2014/damage-types/fire"
                    },
                    "damage_dice": "16d6"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Sleep Breath",
                "dc": {
                  "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                  },
                  "dc_value": 21,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Change Shape",
        "desc": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).\nIn a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.",
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 22,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+8"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/ancient-brass-dragon.png",
    "url": "/api/2014/monsters/ancient-brass-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "ancient-bronze-dragon",
    "name": "Ancient Bronze Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "lawful good",
    "armor_class": [
      {
        "type": "natural",
        "value": 22
      }
    ],
    "hit_points": 444,
    "hit_dice": "24d20",
    "hit_points_roll": "24d20+192",
    "speed": {
      "walk": "40 ft.",
      "fly": "80 ft.",
      "swim": "40 ft."
    },
    "strength": 29,
    "dexterity": 10,
    "constitution": 27,
    "intelligence": 18,
    "wisdom": 17,
    "charisma": 21,
    "proficiencies": [
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 15,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 12,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/2014/proficiencies/skill-insight"
        }
      },
      {
        "value": 17,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "lightning"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 27
    },
    "languages": "Common, Draconic",
    "challenge_rating": 22,
    "proficiency_bonus": 7,
    "xp": 41000,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The dragon can breathe air and water.",
        "damage": []
      },
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 20 (2d10 + 9) piercing damage.",
        "attack_bonus": 16,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+9"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 16 (2d6 + 9) slashing damage.",
        "attack_bonus": 16,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+9"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +16 to hit, reach 20 ft., one target. Hit: 18 (2d8 + 9) bludgeoning damage.",
        "attack_bonus": 16,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+9"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 20 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 20,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nLightning Breath. The dragon exhales lightning in a 120-foot line that is 10 feet wide. Each creature in that line must make a DC 23 Dexterity saving throw, taking 88 (16d10) lightning damage on a failed save, or half as much damage on a successful one.\nRepulsion Breath. The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 23 Strength saving throw. On a failed save, the creature is pushed 60 feet away from the dragon.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Lightning Breath",
                "dc": {
                  "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                  },
                  "dc_value": 23,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "lightning",
                      "name": "Lightning",
                      "url": "/api/2014/damage-types/lightning"
                    },
                    "damage_dice": "16d10"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Repulsion Breath",
                "dc": {
                  "dc_type": {
                    "index": "str",
                    "name": "STR",
                    "url": "/api/2014/ability-scores/str"
                  },
                  "dc_value": 23,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Change Shape",
        "desc": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).\nIn a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.",
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 24 Dexterity saving throw or take 16 (2d6 + 9) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 24,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+9"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/ancient-bronze-dragon.png",
    "url": "/api/2014/monsters/ancient-bronze-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "ancient-copper-dragon",
    "name": "Ancient Copper Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "chaotic good",
    "armor_class": [
      {
        "type": "natural",
        "value": 21
      }
    ],
    "hit_points": 350,
    "hit_dice": "20d20",
    "hit_points_roll": "20d20+140",
    "speed": {
      "walk": "40 ft.",
      "climb": "40 ft.",
      "fly": "80 ft."
    },
    "strength": 27,
    "dexterity": 12,
    "constitution": 25,
    "intelligence": 20,
    "wisdom": 17,
    "charisma": 19,
    "proficiencies": [
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 14,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "skill-deception",
          "name": "Skill: Deception",
          "url": "/api/2014/proficiencies/skill-deception"
        }
      },
      {
        "value": 17,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "acid"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 27
    },
    "languages": "Common, Draconic",
    "challenge_rating": 21,
    "proficiency_bonus": 7,
    "xp": 33000,
    "special_abilities": [
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage.",
        "attack_bonus": 15,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attack_bonus": 15,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attack_bonus": 15,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+8"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 19,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nAcid Breath. The dragon exhales acid in an 90-foot line that is 10 feet wide. Each creature in that line must make a DC 22 Dexterity saving throw, taking 63 (14d8) acid damage on a failed save, or half as much damage on a successful one.\nSlowing Breath. The dragon exhales gas in a 90-foot cone. Each creature in that area must succeed on a DC 22 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Acid Breath",
                "dc": {
                  "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                  },
                  "dc_value": 22,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "acid",
                      "name": "Acid",
                      "url": "/api/2014/damage-types/acid"
                    },
                    "damage_dice": "14d8"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Slowing Breath",
                "dc": {
                  "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                  },
                  "dc_value": 22,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Change Shape",
        "desc": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).\nIn a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.",
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 23,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+8"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/ancient-copper-dragon.png",
    "url": "/api/2014/monsters/ancient-copper-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "ancient-gold-dragon",
    "name": "Ancient Gold Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "lawful good",
    "armor_class": [
      {
        "type": "natural",
        "value": 22
      }
    ],
    "hit_points": 546,
    "hit_dice": "28d20",
    "hit_points_roll": "28d20+252",
    "speed": {
      "walk": "40 ft.",
      "fly": "80 ft.",
      "swim": "40 ft."
    },
    "strength": 30,
    "dexterity": 14,
    "constitution": 29,
    "intelligence": 18,
    "wisdom": 17,
    "charisma": 28,
    "proficiencies": [
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 16,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 16,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/2014/proficiencies/skill-insight"
        }
      },
      {
        "value": 17,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 16,
        "proficiency": {
          "index": "skill-persuasion",
          "name": "Skill: Persuasion",
          "url": "/api/2014/proficiencies/skill-persuasion"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "fire"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 27
    },
    "languages": "Common, Draconic",
    "challenge_rating": 24,
    "proficiency_bonus": 7,
    "xp": 62000,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The dragon can breathe air and water.",
        "damage": []
      },
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage.",
        "attack_bonus": 17,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+10"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.",
        "attack_bonus": 17,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+10"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.",
        "attack_bonus": 17,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+10"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 24 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 24,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 71 (13d10) fire damage on a failed save, or half as much damage on a successful one.\nWeakening Breath. The dragon exhales gas in a 90-foot cone. Each creature in that area must succeed on a DC 24 Strength saving throw or have disadvantage on Strength-based attack rolls, Strength checks, and Strength saving throws for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Fire Breath",
                "dc": {
                  "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                  },
                  "dc_value": 24,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "fire",
                      "name": "Fire",
                      "url": "/api/2014/damage-types/fire"
                    },
                    "damage_dice": "13d10"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Weakening Breath",
                "dc": {
                  "dc_type": {
                    "index": "str",
                    "name": "STR",
                    "url": "/api/2014/ability-scores/str"
                  },
                  "dc_value": 24,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Change Shape",
        "desc": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).\nIn a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.",
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 25,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+10"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/ancient-gold-dragon.png",
    "url": "/api/2014/monsters/ancient-gold-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "ancient-green-dragon",
    "name": "Ancient Green Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 21
      }
    ],
    "hit_points": 385,
    "hit_dice": "22d20",
    "hit_points_roll": "22d20+154",
    "speed": {
      "walk": "40 ft.",
      "fly": "80 ft.",
      "swim": "40 ft."
    },
    "strength": 27,
    "dexterity": 12,
    "constitution": 25,
    "intelligence": 20,
    "wisdom": 17,
    "charisma": 19,
    "proficiencies": [
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 14,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "skill-deception",
          "name": "Skill: Deception",
          "url": "/api/2014/proficiencies/skill-deception"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/2014/proficiencies/skill-insight"
        }
      },
      {
        "value": 17,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "skill-persuasion",
          "name": "Skill: Persuasion",
          "url": "/api/2014/proficiencies/skill-persuasion"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 27
    },
    "languages": "Common, Draconic",
    "challenge_rating": 22,
    "proficiency_bonus": 7,
    "xp": 41000,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The dragon can breathe air and water.",
        "damage": []
      },
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 10 (3d6) poison damage.",
        "attack_bonus": 15,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+8"
          },
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "3d6"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 22 (4d6 + 8) slashing damage.",
        "attack_bonus": 15,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "4d6+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attack_bonus": 15,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+8"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 19 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 19,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "name": "Poison Breath",
        "desc": "The dragon exhales poisonous gas in a 90-foot cone. Each creature in that area must make a DC 22 Constitution saving throw, taking 77 (22d6) poison damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "con",
            "name": "CON",
            "url": "/api/2014/ability-scores/con"
          },
          "dc_value": 22,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "22d6"
          }
        ],
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 23,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+8"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/ancient-green-dragon.png",
    "url": "/api/2014/monsters/ancient-green-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "ancient-red-dragon",
    "name": "Ancient Red Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 22
      }
    ],
    "hit_points": 546,
    "hit_dice": "28d20",
    "hit_points_roll": "28d20+252",
    "speed": {
      "walk": "40 ft.",
      "climb": "40 ft.",
      "fly": "80 ft."
    },
    "strength": 30,
    "dexterity": 10,
    "constitution": 29,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 23,
    "proficiencies": [
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 16,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 13,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 16,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "fire"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 26
    },
    "languages": "Common, Draconic",
    "challenge_rating": 24,
    "proficiency_bonus": 7,
    "xp": 62000,
    "special_abilities": [
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage plus 14 (4d6) fire damage.",
        "attack_bonus": 17,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d10+10"
          },
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "4d6"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.",
        "attack_bonus": 17,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+10"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.",
        "attack_bonus": 17,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+10"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 21,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "name": "Fire Breath",
        "desc": "The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 91 (26d6) fire damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 24,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "26d6"
          }
        ],
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 25,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+10"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/ancient-red-dragon.png",
    "url": "/api/2014/monsters/ancient-red-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "ancient-silver-dragon",
    "name": "Ancient Silver Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "lawful good",
    "armor_class": [
      {
        "type": "natural",
        "value": 22
      }
    ],
    "hit_points": 487,
    "hit_dice": "25d20",
    "hit_points_roll": "25d20+225",
    "speed": {
      "walk": "40 ft.",
      "fly": "80 ft."
    },
    "strength": 30,
    "dexterity": 10,
    "constitution": 29,
    "intelligence": 18,
    "wisdom": 15,
    "charisma": 23,
    "proficiencies": [
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 16,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 13,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "skill-arcana",
          "name": "Skill: Arcana",
          "url": "/api/2014/proficiencies/skill-arcana"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "skill-history",
          "name": "Skill: History",
          "url": "/api/2014/proficiencies/skill-history"
        }
      },
      {
        "value": 16,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "cold"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 26
    },
    "languages": "Common, Draconic",
    "challenge_rating": 23,
    "proficiency_bonus": 7,
    "xp": 50000,
    "special_abilities": [
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage.",
        "attack_bonus": 17,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+10"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.",
        "attack_bonus": 17,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+10"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.",
        "attack_bonus": 17,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+10"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 21,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nCold Breath. The dragon exhales an icy blast in a 90-foot cone. Each creature in that area must make a DC 24 Constitution saving throw, taking 67 (15d8) cold damage on a failed save, or half as much damage on a successful one.\nParalyzing Breath. The dragon exhales paralyzing gas in a 90-foot cone. Each creature in that area must succeed on a DC 24 Constitution saving throw or be paralyzed for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Cold Breath",
                "dc": {
                  "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                  },
                  "dc_value": 24,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "cold",
                      "name": "Cold",
                      "url": "/api/2014/damage-types/cold"
                    },
                    "damage_dice": "15d8"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Paralyzing Breath",
                "dc": {
                  "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                  },
                  "dc_value": 24,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Change Shape",
        "desc": "The dragon magically polymorphs into a humanoid or beast that has a challenge rating no higher than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the dragon's choice).\nIn a new form, the dragon retains its alignment, hit points, Hit Dice, ability to speak, proficiencies, Legendary Resistance, lair actions, and Intelligence, Wisdom, and Charisma scores, as well as this action. Its statistics and capabilities are otherwise replaced by those of the new form, except any class features or legendary actions of that form.",
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 25,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+10"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/ancient-silver-dragon.png",
    "url": "/api/2014/monsters/ancient-silver-dragon",
    "updated_at": "2026-04-25T18:44:21.125Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "ancient-white-dragon",
    "name": "Ancient White Dragon",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 20
      }
    ],
    "hit_points": 333,
    "hit_dice": "18d20",
    "hit_points_roll": "18d20+144",
    "speed": {
      "walk": "40 ft.",
      "burrow": "40 ft.",
      "fly": "80 ft.",
      "swim": "40 ft."
    },
    "strength": 26,
    "dexterity": 10,
    "constitution": 26,
    "intelligence": 10,
    "wisdom": 13,
    "charisma": 14,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 14,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 13,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "cold"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "darkvision": "120 ft.",
      "passive_perception": 23
    },
    "languages": "Common, Draconic",
    "challenge_rating": 20,
    "proficiency_bonus": 6,
    "xp": 25000,
    "special_abilities": [
      {
        "name": "Ice Walk",
        "desc": "The dragon can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn't cost it extra moment.",
        "damage": []
      },
      {
        "name": "Legendary Resistance",
        "desc": "If the dragon fails a saving throw, it can choose to succeed instead.",
        "usage": {
          "type": "per day",
          "times": 3,
          "rest_types": []
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.",
        "actions": [
          {
            "action_name": "Frightful Presence",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) cold damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d10+8"
          },
          {
            "damage_type": {
              "index": "cold",
              "name": "Cold",
              "url": "/api/2014/damage-types/cold"
            },
            "damage_dice": "2d8"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +14 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+8"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Frightful Presence",
        "desc": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours .",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 16,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "name": "Cold Breath",
        "desc": "The dragon exhales an icy blast in a 90-foot cone. Each creature in that area must make a DC 22 Constitution saving throw, taking 72 (l6d8) cold damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "con",
            "name": "CON",
            "url": "/api/2014/ability-scores/con"
          },
          "dc_value": 22,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "cold",
              "name": "Cold",
              "url": "/api/2014/damage-types/cold"
            },
            "damage_dice": "16d8"
          }
        ],
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Detect",
        "desc": "The dragon makes a Wisdom (Perception) check.",
        "damage": []
      },
      {
        "name": "Tail Attack",
        "desc": "The dragon makes a tail attack.",
        "damage": []
      },
      {
        "name": "Wing Attack (Costs 2 Actions)",
        "desc": "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 22,
          "success_type": "none"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+8"
          }
        ]
      }
    ],
    "image": "/api/images/monsters/ancient-white-dragon.png",
    "url": "/api/2014/monsters/ancient-white-dragon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "androsphinx",
    "name": "Androsphinx",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "lawful neutral",
    "armor_class": [
      {
        "type": "natural",
        "value": 17
      }
    ],
    "hit_points": 199,
    "hit_dice": "19d10",
    "hit_points_roll": "19d10+95",
    "speed": {
      "walk": "40 ft.",
      "fly": "60 ft."
    },
    "strength": 22,
    "dexterity": 10,
    "constitution": 20,
    "intelligence": 16,
    "wisdom": 18,
    "charisma": 23,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-int",
          "name": "Saving Throw: INT",
          "url": "/api/2014/proficiencies/saving-throw-int"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "skill-arcana",
          "name": "Skill: Arcana",
          "url": "/api/2014/proficiencies/skill-arcana"
        }
      },
      {
        "value": 10,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 15,
        "proficiency": {
          "index": "skill-religion",
          "name": "Skill: Religion",
          "url": "/api/2014/proficiencies/skill-religion"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "psychic",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "condition_immunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      }
    ],
    "senses": {
      "truesight": "120 ft.",
      "passive_perception": 20
    },
    "languages": "Common, Sphinx",
    "challenge_rating": 17,
    "proficiency_bonus": 6,
    "xp": 18000,
    "special_abilities": [
      {
        "name": "Inscrutable",
        "desc": "The sphinx is immune to any effect that would sense its emotions or read its thoughts, as well as any divination spell that it refuses. Wisdom (Insight) checks made to ascertain the sphinx's intentions or sincerity have disadvantage.",
        "damage": []
      },
      {
        "name": "Magic Weapons",
        "desc": "The sphinx's weapon attacks are magical.",
        "damage": []
      },
      {
        "name": "Spellcasting",
        "desc": "The sphinx is a 12th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 18, +10 to hit with spell attacks). It requires no material components to cast its spells. The sphinx has the following cleric spells prepared:\n\n- Cantrips (at will): sacred flame, spare the dying, thaumaturgy\n- 1st level (4 slots): command, detect evil and good, detect magic\n- 2nd level (3 slots): lesser restoration, zone of truth\n- 3rd level (3 slots): dispel magic, tongues\n- 4th level (3 slots): banishment, freedom of movement\n- 5th level (2 slots): flame strike, greater restoration\n- 6th level (1 slot): heroes' feast",
        "spellcasting": {
          "level": 12,
          "ability": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc": 18,
          "modifier": 10,
          "components_required": [
            "V",
            "S"
          ],
          "school": "cleric",
          "slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1
          },
          "spells": [
            {
              "name": "Sacred Flame",
              "level": 0,
              "url": "/api/2014/spells/sacred-flame"
            },
            {
              "name": "Spare the Dying",
              "level": 0,
              "url": "/api/2014/spells/spare-the-dying"
            },
            {
              "name": "Thaumaturgy",
              "level": 0,
              "url": "/api/2014/spells/thaumaturgy"
            },
            {
              "name": "Command",
              "level": 1,
              "url": "/api/2014/spells/command"
            },
            {
              "name": "Detect Evil and Good",
              "level": 1,
              "url": "/api/2014/spells/detect-evil-and-good"
            },
            {
              "name": "Detect Magic",
              "level": 1,
              "url": "/api/2014/spells/detect-magic"
            },
            {
              "name": "Lesser Restoration",
              "level": 2,
              "url": "/api/2014/spells/lesser-restoration"
            },
            {
              "name": "Zone of Truth",
              "level": 2,
              "url": "/api/2014/spells/zone-of-truth"
            },
            {
              "name": "Dispel Magic",
              "level": 3,
              "url": "/api/2014/spells/dispel-magic"
            },
            {
              "name": "Tongues",
              "level": 3,
              "url": "/api/2014/spells/tongues"
            },
            {
              "name": "Banishment",
              "level": 4,
              "url": "/api/2014/spells/banishment"
            },
            {
              "name": "Freedom of Movement",
              "level": 4,
              "url": "/api/2014/spells/freedom-of-movement"
            },
            {
              "name": "Flame Strike",
              "level": 5,
              "url": "/api/2014/spells/flame-strike"
            },
            {
              "name": "Greater Restoration",
              "level": 5,
              "url": "/api/2014/spells/greater-restoration"
            },
            {
              "name": "Heroes' Feast",
              "level": 6,
              "url": "/api/2014/spells/heroes-feast"
            }
          ]
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The sphinx makes two claw attacks.",
        "actions": [
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 17 (2d10 + 6) slashing damage.",
        "attack_bonus": 12,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d10+6"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Roar",
        "desc": "The sphinx emits a magical roar. Each time it roars before finishing a long rest, the roar is louder and the effect is different, as detailed below. Each creature within 500 feet of the sphinx and able to hear the roar must make a saving throw.\n\nFirst Roar. Each creature that fails a DC 18 Wisdom saving throw is frightened for 1 minute. A frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\n\nSecond Roar. Each creature that fails a DC 18 Wisdom saving throw is deafened and frightened for 1 minute. A frightened creature is paralyzed and can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\n\nThird Roar. Each creature makes a DC 18 Constitution saving throw. On a failed save, a creature takes 44 (8d10) thunder damage and is knocked prone. On a successful save, the creature takes half as much damage and isn't knocked prone.",
        "usage": {
          "type": "per day",
          "times": 3
        },
        "attacks": [
          {
            "name": "First Roar",
            "dc": {
              "dc_type": {
                "index": "wis",
                "name": "WIS",
                "url": "/api/2014/ability-scores/wis"
              },
              "dc_value": 18,
              "success_type": "none"
            }
          },
          {
            "name": "Second Roar",
            "dc": {
              "dc_type": {
                "index": "wis",
                "name": "WIS",
                "url": "/api/2014/ability-scores/wis"
              },
              "dc_value": 18,
              "success_type": "none"
            }
          },
          {
            "name": "Third Roar",
            "dc": {
              "dc_type": {
                "index": "con",
                "name": "CON",
                "url": "/api/2014/ability-scores/con"
              },
              "dc_value": 18,
              "success_type": "half"
            },
            "damage": [
              {
                "damage_type": {
                  "index": "thunder",
                  "name": "Thunder",
                  "url": "/api/2014/damage-types/thunder"
                },
                "damage_dice": "8d10"
              }
            ]
          }
        ],
        "actions": []
      }
    ],
    "legendary_actions": [
      {
        "name": "Claw Attack",
        "desc": "The sphinx makes one claw attack.",
        "damage": []
      },
      {
        "name": "Teleport (Costs 2 Actions)",
        "desc": "The sphinx magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see.",
        "damage": []
      },
      {
        "name": "Cast a Spell (Costs 3 Actions)",
        "desc": "The sphinx casts a spell from its list of prepared spells, using a spell slot as normal.",
        "damage": []
      }
    ],
    "image": "/api/images/monsters/androsphinx.png",
    "url": "/api/2014/monsters/androsphinx",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "reactions": []
  },
  {
    "index": "animated-armor",
    "name": "Animated Armor",
    "size": "Medium",
    "type": "construct",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 18
      }
    ],
    "hit_points": 33,
    "hit_dice": "6d8",
    "hit_points_roll": "6d8+6",
    "speed": {
      "walk": "25 ft."
    },
    "strength": 14,
    "dexterity": 11,
    "constitution": 13,
    "intelligence": 1,
    "wisdom": 3,
    "charisma": 1,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "poison",
      "psychic"
    ],
    "condition_immunities": [
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      },
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "deafened",
        "name": "Deafened",
        "url": "/api/2014/conditions/deafened"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "blindsight": "60 ft. (blind beyond this radius)",
      "passive_perception": 6
    },
    "languages": "",
    "challenge_rating": 1,
    "proficiency_bonus": 2,
    "xp": 200,
    "special_abilities": [
      {
        "name": "Antimagic Susceptibility",
        "desc": "The armor is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the armor must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute.",
        "damage": []
      },
      {
        "name": "False Appearance",
        "desc": "While the armor remains motionless, it is indistinguishable from a normal suit of armor.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The armor makes two melee attacks.",
        "actions": [
          {
            "action_name": "Slam",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Slam",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/animated-armor.png",
    "url": "/api/2014/monsters/animated-armor",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "ankheg",
    "name": "Ankheg",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 14
      },
      {
        "type": "condition",
        "value": 11,
        "condition": {
          "index": "prone",
          "name": "Prone",
          "url": "/api/2014/conditions/prone"
        }
      }
    ],
    "hit_points": 39,
    "hit_dice": "6d10",
    "hit_points_roll": "6d10+6",
    "speed": {
      "walk": "30 ft.",
      "burrow": "10 ft."
    },
    "strength": 17,
    "dexterity": 11,
    "constitution": 13,
    "intelligence": 1,
    "wisdom": 13,
    "charisma": 6,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "60 ft.",
      "tremorsense": "60 ft.",
      "passive_perception": 11
    },
    "languages": "",
    "challenge_rating": 2,
    "proficiency_bonus": 2,
    "xp": 450,
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage plus 3 (1d6) acid damage. If the target is a Large or smaller creature, it is grappled (escape DC 13). Until this grapple ends, the ankheg can bite only the grappled creature and has advantage on attack rolls to do so.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+3"
          },
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "1d6"
          }
        ],
        "actions": []
      },
      {
        "name": "Acid Spray",
        "desc": "The ankheg spits acid in a line that is 30 ft. long and 5 ft. wide, provided that it has no creature grappled. Each creature in that line must make a DC 13 Dexterity saving throw, taking 10 (3d6) acid damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 6
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 13,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "3d6"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/ankheg.png",
    "url": "/api/2014/monsters/ankheg",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "ape",
    "name": "Ape",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 12
      }
    ],
    "hit_points": 19,
    "hit_dice": "3d8",
    "hit_points_roll": "3d8+6",
    "speed": {
      "walk": "30 ft.",
      "climb": "30 ft."
    },
    "strength": 16,
    "dexterity": 14,
    "constitution": 14,
    "intelligence": 6,
    "wisdom": 12,
    "charisma": 7,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "skill-athletics",
          "name": "Skill: Athletics",
          "url": "/api/2014/proficiencies/skill-athletics"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 13
    },
    "languages": "",
    "challenge_rating": 0.5,
    "proficiency_bonus": 2,
    "xp": 100,
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The ape makes two fist attacks.",
        "actions": [
          {
            "action_name": "Fist",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Fist",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Rock",
        "desc": "Ranged Weapon Attack: +5 to hit, range 25/50 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/ape.png",
    "url": "/api/2014/monsters/ape",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "archmage",
    "name": "Archmage",
    "desc": "Archmages are powerful (and usually quite old) spellcasters dedicated to the study of the arcane arts. Benevolent ones counsel kings and queens, while evil ones rule as tyrants and pursue lichdom. Those who are neither good nor evil sequester themselves in remote towers to practice their magic without interruption. \n\nAn archmage typically has one or more apprentice mages, and an archmage’s abode has numerous magical wards and guardians to discourage interlopers.",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "alignment": "any alignment",
    "armor_class": [
      {
        "type": "dex",
        "value": 12
      },
      {
        "type": "spell",
        "value": 15,
        "spell": {
          "index": "mage-armor",
          "name": "Mage Armor",
          "url": "/api/2014/spells/mage-armor"
        }
      }
    ],
    "hit_points": 99,
    "hit_dice": "18d8",
    "hit_points_roll": "18d8+18",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 10,
    "dexterity": 14,
    "constitution": 12,
    "intelligence": 20,
    "wisdom": 15,
    "charisma": 16,
    "proficiencies": [
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-int",
          "name": "Saving Throw: INT",
          "url": "/api/2014/proficiencies/saving-throw-int"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 13,
        "proficiency": {
          "index": "skill-arcana",
          "name": "Skill: Arcana",
          "url": "/api/2014/proficiencies/skill-arcana"
        }
      },
      {
        "value": 13,
        "proficiency": {
          "index": "skill-history",
          "name": "Skill: History",
          "url": "/api/2014/proficiencies/skill-history"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "damage from spells",
      "bludgeoning, piercing, and slashing from nonmagical attacks (from stoneskin)"
    ],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 12
    },
    "languages": "any six languages",
    "challenge_rating": 12,
    "proficiency_bonus": 4,
    "xp": 8400,
    "special_abilities": [
      {
        "name": "Magic Resistance",
        "desc": "The archmage has advantage on saving throws against spells and other magical effects.",
        "damage": []
      },
      {
        "name": "Spellcasting",
        "desc": "The archmage is an 18th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 17, +9 to hit with spell attacks). The archmage can cast disguise self and invisibility at will and has the following wizard spells prepared:\n\n- Cantrips (at will): fire bolt, light, mage hand, prestidigitation, shocking grasp\n- 1st level (4 slots): detect magic, identify, mage armor*, magic missile\n- 2nd level (3 slots): detect thoughts, mirror image, misty step\n- 3rd level (3 slots): counterspell, fly, lightning bolt\n- 4th level (3 slots): banishment, fire shield, stoneskin*\n- 5th level (3 slots): cone of cold, scrying, wall of force\n- 6th level (1 slot): globe of invulnerability\n- 7th level (1 slot): teleport\n- 8th level (1 slot): mind blank*\n- 9th level (1 slot): time stop\n* The archmage casts these spells on itself before combat.",
        "spellcasting": {
          "level": 18,
          "ability": {
            "index": "int",
            "name": "INT",
            "url": "/api/2014/ability-scores/int"
          },
          "dc": 17,
          "modifier": 9,
          "components_required": [
            "V",
            "S",
            "M"
          ],
          "school": "wizard",
          "slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1
          },
          "spells": [
            {
              "name": "Disguise Self",
              "level": 1,
              "url": "/api/2014/spells/disguise-self",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Invisibility",
              "level": 2,
              "url": "/api/2014/spells/invisibility",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Fire Bolt",
              "level": 0,
              "url": "/api/2014/spells/fire-bolt"
            },
            {
              "name": "Light",
              "level": 0,
              "url": "/api/2014/spells/light"
            },
            {
              "name": "Mage Hand",
              "level": 0,
              "url": "/api/2014/spells/mage-hand"
            },
            {
              "name": "Prestidigitation",
              "level": 0,
              "url": "/api/2014/spells/prestidigitation"
            },
            {
              "name": "Shocking Grasp",
              "level": 0,
              "url": "/api/2014/spells/shocking-grasp"
            },
            {
              "name": "Detect Magic",
              "level": 1,
              "url": "/api/2014/spells/detect-magic"
            },
            {
              "name": "Identify",
              "level": 1,
              "url": "/api/2014/spells/identify"
            },
            {
              "name": "Mage Armor",
              "level": 1,
              "url": "/api/2014/spells/mage-armor",
              "notes": "Cast on self before combat"
            },
            {
              "name": "Magic Missile",
              "level": 1,
              "url": "/api/2014/spells/magic-missile"
            },
            {
              "name": "Detect Thoughts",
              "level": 2,
              "url": "/api/2014/spells/detect-thoughts"
            },
            {
              "name": "Mirror Image",
              "level": 2,
              "url": "/api/2014/spells/mirror-image"
            },
            {
              "name": "Misty Step",
              "level": 2,
              "url": "/api/2014/spells/misty-step"
            },
            {
              "name": "Counterspell",
              "level": 3,
              "url": "/api/2014/spells/counterspell"
            },
            {
              "name": "Fly",
              "level": 3,
              "url": "/api/2014/spells/fly"
            },
            {
              "name": "Lightning Bolt",
              "level": 3,
              "url": "/api/2014/spells/lightning-bolt"
            },
            {
              "name": "Banishment",
              "level": 4,
              "url": "/api/2014/spells/banishment"
            },
            {
              "name": "Fire Shield",
              "level": 4,
              "url": "/api/2014/spells/fire-shield"
            },
            {
              "name": "Stoneskin",
              "level": 4,
              "url": "/api/2014/spells/stoneskin",
              "notes": "Cast on self before combat"
            },
            {
              "name": "Cone of Cold",
              "level": 5,
              "url": "/api/2014/spells/cone-of-cold"
            },
            {
              "name": "Scrying",
              "level": 5,
              "url": "/api/2014/spells/scrying"
            },
            {
              "name": "Wall of Force",
              "level": 5,
              "url": "/api/2014/spells/wall-of-force"
            },
            {
              "name": "Globe of Invulnerability",
              "level": 6,
              "url": "/api/2014/spells/globe-of-invulnerability"
            },
            {
              "name": "Teleport",
              "level": 7,
              "url": "/api/2014/spells/teleport"
            },
            {
              "name": "Mind Blank",
              "level": 8,
              "url": "/api/2014/spells/mind-blank",
              "notes": "Cast on self before combat"
            },
            {
              "name": "Time Stop",
              "level": 9,
              "url": "/api/2014/spells/time-stop"
            }
          ]
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Dagger",
        "desc": "Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/archmage.png",
    "url": "/api/2014/monsters/archmage",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "assassin",
    "name": "Assassin",
    "desc": "Trained in the use of poison, assassins are remorseless killers who work for nobles, guildmasters, sovereigns, and anyone else who can afford them.",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "alignment": "any non-good alignment",
    "armor_class": [
      {
        "type": "armor",
        "value": 15,
        "armor": [
          {
            "index": "studded-leather-armor",
            "name": "Studded Leather Armor",
            "url": "/api/2014/equipment/studded-leather-armor"
          }
        ]
      }
    ],
    "hit_points": 78,
    "hit_dice": "12d8",
    "hit_points_roll": "12d8+24",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 11,
    "dexterity": 16,
    "constitution": 14,
    "intelligence": 13,
    "wisdom": 11,
    "charisma": 10,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "saving-throw-int",
          "name": "Saving Throw: INT",
          "url": "/api/2014/proficiencies/saving-throw-int"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "skill-acrobatics",
          "name": "Skill: Acrobatics",
          "url": "/api/2014/proficiencies/skill-acrobatics"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "skill-deception",
          "name": "Skill: Deception",
          "url": "/api/2014/proficiencies/skill-deception"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "poison"
    ],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 13
    },
    "languages": "Thieves' cant plus any two languages",
    "challenge_rating": 8,
    "proficiency_bonus": 3,
    "xp": 3900,
    "special_abilities": [
      {
        "name": "Assassinate",
        "desc": "During its first turn, the assassin has advantage on attack rolls against any creature that hasn't taken a turn. Any hit the assassin scores against a surprised creature is a critical hit.",
        "damage": []
      },
      {
        "name": "Evasion",
        "desc": "If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds on the saving throw, and only half damage if it fails.",
        "damage": []
      },
      {
        "name": "Sneak Attack (1/Turn)",
        "desc": "The assassin deals an extra 13 (4d6) damage when it hits a target with a weapon attack and has advantage on the attack roll, or when the target is within 5 ft. of an ally of the assassin that isn't incapacitated and the assassin doesn't have disadvantage on the attack roll.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The assassin makes two shortsword attacks.",
        "actions": [
          {
            "action_name": "Shortsword",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Shortsword",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+3"
          },
          {
            "dc": {
              "dc_type": {
                "index": "con",
                "name": "CON",
                "url": "/api/2014/ability-scores/con"
              },
              "dc_value": 15,
              "success_type": "half"
            },
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "7d6"
          }
        ],
        "actions": []
      },
      {
        "name": "Light Crossbow",
        "desc": "Ranged Weapon Attack: +6 to hit, range 80/320 ft., one target. Hit: 7 (1d8 + 3) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+3"
          },
          {
            "dc": {
              "dc_type": {
                "index": "con",
                "name": "CON",
                "url": "/api/2014/ability-scores/con"
              },
              "dc_value": 15,
              "success_type": "half"
            },
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "7d6"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/assassin.png",
    "url": "/api/2014/monsters/assassin",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "awakened-shrub",
    "name": "Awakened Shrub",
    "desc": "An awakened shrub is an ordinary shrub given sentience and mobility by the awaken spell or similar magic.",
    "size": "Small",
    "type": "plant",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 9
      }
    ],
    "hit_points": 10,
    "hit_dice": "3d6",
    "hit_points_roll": "3d6",
    "speed": {
      "walk": "20 ft."
    },
    "strength": 3,
    "dexterity": 8,
    "constitution": 11,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 6,
    "proficiencies": [],
    "damage_vulnerabilities": [
      "fire"
    ],
    "damage_resistances": [
      "piercing"
    ],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "one language known by its creator",
    "challenge_rating": 0,
    "proficiency_bonus": 2,
    "xp": 10,
    "special_abilities": [
      {
        "name": "False Appearance",
        "desc": "While the shrub remains motionless, it is indistinguishable from a normal shrub.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Rake",
        "desc": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) slashing damage.",
        "attack_bonus": 1,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d4-1"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/awakened-shrub.png",
    "url": "/api/2014/monsters/awakened-shrub",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "awakened-tree",
    "name": "Awakened Tree",
    "desc": "An awakened tree is an ordinary tree given sentience and mobility by the awaken spell or similar magic.",
    "size": "Huge",
    "type": "plant",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 13
      }
    ],
    "hit_points": 59,
    "hit_dice": "7d12",
    "hit_points_roll": "7d12+14",
    "speed": {
      "walk": "20 ft."
    },
    "strength": 19,
    "dexterity": 6,
    "constitution": 15,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 7,
    "proficiencies": [],
    "damage_vulnerabilities": [
      "fire"
    ],
    "damage_resistances": [
      "bludgeoning",
      "piercing"
    ],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "one language known by its creator",
    "challenge_rating": 2,
    "proficiency_bonus": 2,
    "xp": 450,
    "special_abilities": [
      {
        "name": "False Appearance",
        "desc": "While the tree remains motionless, it is indistinguishable from a normal tree.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Slam",
        "desc": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d6+4"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/awakened-tree.png",
    "url": "/api/2014/monsters/awakened-tree",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "axe-beak",
    "name": "Axe Beak",
    "desc": "An axe beak is a tall flightless bird with strong legs and a heavy, wedge-shaped beak. It has a nasty disposition and tends to attack any unfamiliar creature that wanders too close.",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 11
      }
    ],
    "hit_points": 19,
    "hit_dice": "3d10",
    "hit_points_roll": "3d10+3",
    "speed": {
      "walk": "50 ft."
    },
    "strength": 14,
    "dexterity": 12,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 5,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "",
    "challenge_rating": 0.25,
    "proficiency_bonus": 2,
    "xp": 50,
    "actions": [
      {
        "name": "Beak",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/axe-beak.png",
    "url": "/api/2014/monsters/axe-beak",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "azer",
    "name": "Azer",
    "size": "Medium",
    "type": "elemental",
    "alignment": "lawful neutral",
    "armor_class": [
      {
        "type": "natural",
        "value": 15
      },
      {
        "type": "armor",
        "value": 17,
        "armor": [
          {
            "index": "shield",
            "name": "Shield",
            "url": "/api/2014/equipment/shield"
          }
        ]
      }
    ],
    "hit_points": 39,
    "hit_dice": "6d8",
    "hit_points_roll": "6d8+12",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 17,
    "dexterity": 12,
    "constitution": 15,
    "intelligence": 12,
    "wisdom": 13,
    "charisma": 10,
    "proficiencies": [
      {
        "value": 4,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "fire",
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "passive_perception": 11
    },
    "languages": "Ignan",
    "challenge_rating": 2,
    "proficiency_bonus": 2,
    "xp": 450,
    "special_abilities": [
      {
        "name": "Heated Body",
        "desc": "A creature that touches the azer or hits it with a melee attack while within 5 ft. of it takes 5 (1d10) fire damage.",
        "damage": [
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "1d10"
          }
        ]
      },
      {
        "name": "Heated Weapons",
        "desc": "When the azer hits with a metal melee weapon, it deals an extra 3 (1d6) fire damage (included in the attack).",
        "damage": [
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "1d6"
          }
        ]
      },
      {
        "name": "Illumination",
        "desc": "The azer sheds bright light in a 10-foot radius and dim light for an additional 10 ft..",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Warhammer",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage, or 8 (1d10 + 3) bludgeoning damage if used with two hands to make a melee attack, plus 3 (1d6) fire damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d8+3"
          },
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "1d6"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/azer.png",
    "url": "/api/2014/monsters/azer",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "baboon",
    "name": "Baboon",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 12
      }
    ],
    "hit_points": 3,
    "hit_dice": "1d6",
    "hit_points_roll": "1d6",
    "speed": {
      "walk": "30 ft.",
      "climb": "30 ft."
    },
    "strength": 8,
    "dexterity": 14,
    "constitution": 11,
    "intelligence": 4,
    "wisdom": 12,
    "charisma": 6,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 11
    },
    "languages": "",
    "challenge_rating": 0,
    "proficiency_bonus": 2,
    "xp": 10,
    "special_abilities": [
      {
        "name": "Pack Tactics",
        "desc": "The baboon has advantage on an attack roll against a creature if at least one of the baboon's allies is within 5 ft. of the creature and the ally isn't incapacitated.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) piercing damage.",
        "attack_bonus": 1,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4-1"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/baboon.png",
    "url": "/api/2014/monsters/baboon",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "badger",
    "name": "Badger",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 10
      }
    ],
    "hit_points": 3,
    "hit_dice": "1d4",
    "hit_points_roll": "1d4+1",
    "speed": {
      "walk": "20 ft.",
      "burrow": "5 ft."
    },
    "strength": 4,
    "dexterity": 11,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 5,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "30 ft.",
      "passive_perception": 11
    },
    "languages": "",
    "challenge_rating": 0,
    "proficiency_bonus": 2,
    "xp": 10,
    "special_abilities": [
      {
        "name": "Keen Smell",
        "desc": "The badger has advantage on Wisdom (Perception) checks that rely on smell.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 piercing damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/badger.png",
    "url": "/api/2014/monsters/badger",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "balor",
    "name": "Balor",
    "size": "Huge",
    "type": "fiend",
    "subtype": "demon",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 19
      }
    ],
    "hit_points": 262,
    "hit_dice": "21d12",
    "hit_points_roll": "21d12+126",
    "speed": {
      "walk": "40 ft.",
      "fly": "80 ft."
    },
    "strength": 26,
    "dexterity": 15,
    "constitution": 22,
    "intelligence": 20,
    "wisdom": 16,
    "charisma": 22,
    "proficiencies": [
      {
        "value": 14,
        "proficiency": {
          "index": "saving-throw-str",
          "name": "Saving Throw: STR",
          "url": "/api/2014/proficiencies/saving-throw-str"
        }
      },
      {
        "value": 12,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 12,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "cold",
      "lightning",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damage_immunities": [
      "fire",
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "truesight": "120 ft.",
      "passive_perception": 13
    },
    "languages": "Abyssal, telepathy 120 ft.",
    "challenge_rating": 19,
    "proficiency_bonus": 6,
    "xp": 22000,
    "special_abilities": [
      {
        "name": "Death Throes",
        "desc": "When the balor dies, it explodes, and each creature within 30 feet of it must make a DC 20 Dexterity saving throw, taking 70 (20d6) fire damage on a failed save, or half as much damage on a successful one. The explosion ignites flammable objects in that area that aren't being worn or carried, and it destroys the balor's weapons.",
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 20,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "20d6"
          }
        ]
      },
      {
        "name": "Fire Aura",
        "desc": "At the start of each of the balor's turns, each creature within 5 feet of it takes 10 (3d6) fire damage, and flammable objects in the aura that aren't being worn or carried ignite. A creature that touches the balor or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage.",
        "damage": [
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "3d6"
          }
        ]
      },
      {
        "name": "Magic Resistance",
        "desc": "The balor has advantage on saving throws against spells and other magical effects.",
        "damage": []
      },
      {
        "name": "Magic Weapons",
        "desc": "The balor's weapon attacks are magical.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The balor makes two attacks: one with its longsword and one with its whip.",
        "actions": [
          {
            "action_name": "Longsword",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Whip",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Longsword",
        "desc": "Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) slashing damage plus 13 (3d8) lightning damage. If the balor scores a critical hit, it rolls damage dice three times, instead of twice.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "3d8+8"
          },
          {
            "damage_type": {
              "index": "lightning",
              "name": "Lightning",
              "url": "/api/2014/damage-types/lightning"
            },
            "damage_dice": "3d8"
          }
        ],
        "actions": []
      },
      {
        "name": "Whip",
        "desc": "Melee Weapon Attack: +14 to hit, reach 30 ft., one target. Hit: 15 (2d6 + 8) slashing damage plus 10 (3d6) fire damage, and the target must succeed on a DC 20 Strength saving throw or be pulled up to 25 feet toward the balor.",
        "attack_bonus": 14,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+8"
          },
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "3d6"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Teleport",
        "desc": "The balor magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see.",
        "actions": []
      }
    ],
    "image": "/api/images/monsters/balor.png",
    "url": "/api/2014/monsters/balor",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "bandit",
    "name": "Bandit",
    "desc": "**Bandits** rove in gangs and are sometimes led by thugs, veterans, or spellcasters. Not all bandits are evil. Oppression, drought, disease, or famine can often drive otherwise honest folk to a life of banditry.\n\n**Pirates** are bandits of the high seas. They might be freebooters interested only in treasure and murder, or they might be privateers sanctioned by the crown to attack and plunder an enemy nation’s vessels.",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "alignment": "any non-lawful alignment",
    "armor_class": [
      {
        "type": "armor",
        "value": 12,
        "armor": [
          {
            "index": "leather-armor",
            "name": "Leather Armor",
            "url": "/api/2014/equipment/leather-armor"
          }
        ]
      }
    ],
    "hit_points": 11,
    "hit_dice": "2d8",
    "hit_points_roll": "2d8+2",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 11,
    "dexterity": 12,
    "constitution": 12,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 10,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "any one language (usually Common)",
    "challenge_rating": 0.125,
    "proficiency_bonus": 2,
    "xp": 25,
    "actions": [
      {
        "name": "Scimitar",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      },
      {
        "name": "Light Crossbow",
        "desc": "Ranged Weapon Attack: +3 to hit, range 80/320 ft., one target. Hit: 5 (1d8 + 1) piercing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+1"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/bandit.png",
    "url": "/api/2014/monsters/bandit",
    "updated_at": "2026-04-25T18:44:21.126Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "bandit-captain",
    "name": "Bandit Captain",
    "desc": "It takes a strong personality, ruthless cunning, and a silver tongue to keep a gang of bandits in line. The **bandit captain** has these qualities in spades.\n\nIn addition to managing a crew of selfish malcontents, the **pirate captain** is a variation of the bandit captain, with a ship to protect and command. To keep the crew in line, the captain must mete out rewards and punishment on a regular basis.\n\nMore than treasure, a bandit captain or pirate captain craves infamy. A prisoner who appeals to the captain’s vanity or ego is more likely to be treated fairly than a prisoner who does not or claims not to know anything of the captain’s colorful reputation.",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "alignment": "any non-lawful alignment",
    "armor_class": [
      {
        "type": "armor",
        "value": 15,
        "armor": [
          {
            "index": "studded-leather-armor",
            "name": "Studded Leather Armor",
            "url": "/api/2014/equipment/studded-leather-armor"
          }
        ]
      }
    ],
    "hit_points": 65,
    "hit_dice": "10d8",
    "hit_points_roll": "10d8+20",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 15,
    "dexterity": 16,
    "constitution": 14,
    "intelligence": 14,
    "wisdom": 11,
    "charisma": 14,
    "proficiencies": [
      {
        "value": 4,
        "proficiency": {
          "index": "saving-throw-str",
          "name": "Saving Throw: STR",
          "url": "/api/2014/proficiencies/saving-throw-str"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-athletics",
          "name": "Skill: Athletics",
          "url": "/api/2014/proficiencies/skill-athletics"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-deception",
          "name": "Skill: Deception",
          "url": "/api/2014/proficiencies/skill-deception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "any two languages",
    "challenge_rating": 2,
    "proficiency_bonus": 2,
    "xp": 450,
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "action_options",
        "desc": "The captain makes three melee attacks: two with its scimitar and one with its dagger. Or the captain makes two ranged attacks with its daggers.",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Scimitar",
                    "count": 2,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Dagger",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "action",
                "action_name": "Dagger",
                "count": 2,
                "type": "ranged"
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Scimitar",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Dagger",
        "desc": "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+3"
          }
        ],
        "actions": []
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "desc": "The captain adds 2 to its AC against one melee attack that would hit it. To do so, the captain must see the attacker and be wielding a melee weapon."
      }
    ],
    "image": "/api/images/monsters/bandit-captain.png",
    "url": "/api/2014/monsters/bandit-captain",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "special_abilities": []
  },
  {
    "index": "barbed-devil",
    "name": "Barbed Devil",
    "size": "Medium",
    "type": "fiend",
    "subtype": "devil",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 15
      }
    ],
    "hit_points": 110,
    "hit_dice": "13d8",
    "hit_points_roll": "13d8+52",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 16,
    "dexterity": 17,
    "constitution": 18,
    "intelligence": 12,
    "wisdom": 14,
    "charisma": 14,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-str",
          "name": "Saving Throw: STR",
          "url": "/api/2014/proficiencies/saving-throw-str"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "skill-deception",
          "name": "Skill: Deception",
          "url": "/api/2014/proficiencies/skill-deception"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/2014/proficiencies/skill-insight"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "damage_immunities": [
      "fire",
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 18
    },
    "languages": "Infernal, telepathy 120 ft.",
    "challenge_rating": 5,
    "proficiency_bonus": 3,
    "xp": 1800,
    "special_abilities": [
      {
        "name": "Barbed Hide",
        "desc": "At the start of each of its turns, the barbed devil deals 5 (1d10) piercing damage to any creature grappling it.",
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10"
          }
        ]
      },
      {
        "name": "Devil's Sight",
        "desc": "Magical darkness doesn't impede the devil's darkvision.",
        "damage": []
      },
      {
        "name": "Magic Resistance",
        "desc": "The devil has advantage on saving throws against spells and other magical effects.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "action_options",
        "desc": "The devil makes three melee attacks: one with its tail and two with its claws. Alternatively, it can use Hurl Flame twice.",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Tail",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Claw",
                    "count": 2,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "action",
                "action_name": "Hurl Flame",
                "count": 2,
                "type": "ranged"
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Hurl Flame",
        "desc": "Ranged Spell Attack: +5 to hit, range 150 ft., one target. Hit: 10 (3d6) fire damage. If the target is a flammable object that isn't being worn or carried, it also catches fire.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "3d6"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/barbed-devil.png",
    "url": "/api/2014/monsters/barbed-devil",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "basilisk",
    "name": "Basilisk",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 12
      }
    ],
    "hit_points": 52,
    "hit_dice": "8d8",
    "hit_points_roll": "8d8+16",
    "speed": {
      "walk": "20 ft."
    },
    "strength": 16,
    "dexterity": 8,
    "constitution": 15,
    "intelligence": 2,
    "wisdom": 8,
    "charisma": 7,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 9
    },
    "languages": "",
    "challenge_rating": 3,
    "proficiency_bonus": 2,
    "xp": 700,
    "special_abilities": [
      {
        "name": "Petrifying Gaze",
        "desc": "If a creature starts its turn within 30 ft. of the basilisk and the two of them can see each other, the basilisk can force the creature to make a DC 12 Constitution saving throw if the basilisk isn't incapacitated. On a failed save, the creature magically begins to turn to stone and is restrained. It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the creature is petrified until freed by the greater restoration spell or other magic.\nA creature that isn't surprised can avert its eyes to avoid the saving throw at the start of its turn. If it does so, it can't see the basilisk until the start of its next turn, when it can avert its eyes again. If it looks at the basilisk in the meantime, it must immediately make the save.\nIf the basilisk sees its reflection within 30 ft. of it in bright light, it mistakes itself for a rival and targets itself with its gaze.",
        "dc": {
          "dc_type": {
            "index": "con",
            "name": "CON",
            "url": "/api/2014/ability-scores/con"
          },
          "dc_value": 12,
          "success_type": "none"
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage plus 7 (2d6) poison damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d6+3"
          },
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "2d6"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/basilisk.png",
    "url": "/api/2014/monsters/basilisk",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "bat",
    "name": "Bat",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 12
      }
    ],
    "hit_points": 1,
    "hit_dice": "1d4",
    "hit_points_roll": "1d4-1",
    "speed": {
      "walk": "5 ft.",
      "fly": "30 ft."
    },
    "strength": 2,
    "dexterity": 15,
    "constitution": 8,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 4,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "passive_perception": 11
    },
    "languages": "",
    "challenge_rating": 0,
    "proficiency_bonus": 2,
    "xp": 10,
    "special_abilities": [
      {
        "name": "Echolocation",
        "desc": "The bat can't use its blindsight while deafened.",
        "damage": []
      },
      {
        "name": "Keen Hearing",
        "desc": "The bat has advantage on Wisdom (Perception) checks that rely on hearing.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +0 to hit, reach 5 ft., one creature. Hit: 1 piercing damage.",
        "attack_bonus": 0,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/bat.png",
    "url": "/api/2014/monsters/bat",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "bearded-devil",
    "name": "Bearded Devil",
    "size": "Medium",
    "type": "fiend",
    "subtype": "devil",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 13
      }
    ],
    "hit_points": 52,
    "hit_dice": "8d8",
    "hit_points_roll": "8d8+16",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 16,
    "dexterity": 15,
    "constitution": 15,
    "intelligence": 9,
    "wisdom": 11,
    "charisma": 11,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-str",
          "name": "Saving Throw: STR",
          "url": "/api/2014/proficiencies/saving-throw-str"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "damage_immunities": [
      "fire",
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 10
    },
    "languages": "Infernal, telepathy 120 ft.",
    "challenge_rating": 3,
    "proficiency_bonus": 2,
    "xp": 700,
    "special_abilities": [
      {
        "name": "Devil's Sight",
        "desc": "Magical darkness doesn't impede the devil's darkvision.",
        "damage": []
      },
      {
        "name": "Magic Resistance",
        "desc": "The devil has advantage on saving throws against spells and other magical effects.",
        "damage": []
      },
      {
        "name": "Steadfast",
        "desc": "The devil can't be frightened while it can see an allied creature within 30 feet of it.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The devil makes two attacks: one with its beard and one with its glaive.",
        "actions": [
          {
            "action_name": "Beard",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Glaive",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Beard",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) piercing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. While poisoned in this way, the target can't regain hit points. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Glaive",
        "desc": "Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 8 (1d10 + 3) slashing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 12 Constitution saving throw or lose 5 (1d10) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 5 (1d10). Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d10+3"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/bearded-devil.png",
    "url": "/api/2014/monsters/bearded-devil",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "behir",
    "name": "Behir",
    "size": "Huge",
    "type": "monstrosity",
    "alignment": "neutral evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 17
      }
    ],
    "hit_points": 168,
    "hit_dice": "16d12",
    "hit_points_roll": "16d12+64",
    "speed": {
      "walk": "50 ft.",
      "climb": "40 ft."
    },
    "strength": 23,
    "dexterity": 16,
    "constitution": 18,
    "intelligence": 7,
    "wisdom": 14,
    "charisma": 12,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "lightning"
    ],
    "condition_immunities": [],
    "senses": {
      "darkvision": "90 ft.",
      "passive_perception": 16
    },
    "languages": "Draconic",
    "challenge_rating": 11,
    "proficiency_bonus": 4,
    "xp": 7200,
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The behir makes two attacks: one with its bite and one to constrict.",
        "actions": [
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Constrict",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 22 (3d10 + 6) piercing damage.",
        "attack_bonus": 10,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "3d10+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Constrict",
        "desc": "Melee Weapon Attack: +10 to hit, reach 5 ft., one Large or smaller creature. Hit: 17 (2d10 + 6) bludgeoning damage plus 17 (2d10 + 6) slashing damage. The target is grappled (escape DC 16) if the behir isn't already constricting a creature, and the target is restrained until this grapple ends.",
        "attack_bonus": 10,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d10+6"
          },
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d10+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Lightning Breath",
        "desc": "The behir exhales a line of lightning that is 20 ft. long and 5 ft. wide. Each creature in that line must make a DC 16 Dexterity saving throw, taking 66 (12d10) lightning damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 16,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "lightning",
              "name": "Lightning",
              "url": "/api/2014/damage-types/lightning"
            },
            "damage_dice": "12d10"
          }
        ],
        "actions": []
      },
      {
        "name": "Swallow",
        "desc": "The behir makes one bite attack against a Medium or smaller target it is grappling. If the attack hits, the target is also swallowed, and the grapple ends. While swallowed, the target is blinded and restrained, it has total cover against attacks and other effects outside the behir, and it takes 21 (6d6) acid damage at the start of each of the behir's turns. A behir can have only one creature swallowed at a time.\nIf the behir takes 30 damage or more on a single turn from the swallowed creature, the behir must succeed on a DC 14 Constitution saving throw at the end of that turn or regurgitate the creature, which falls prone in a space within 10 ft. of the behir. If the behir dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 15 ft. of movement, exiting prone.",
        "damage": [
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "6d6"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/behir.png",
    "url": "/api/2014/monsters/behir",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "berserker",
    "name": "Berserker",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "alignment": "any chaotic alignment",
    "armor_class": [
      {
        "type": "armor",
        "value": 13,
        "armor": [
          {
            "index": "hide-armor",
            "name": "Hide Armor",
            "url": "/api/2014/equipment/hide-armor"
          }
        ]
      }
    ],
    "hit_points": 67,
    "hit_dice": "9d8",
    "hit_points_roll": "9d8+27",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 16,
    "dexterity": 12,
    "constitution": 17,
    "intelligence": 9,
    "wisdom": 11,
    "charisma": 9,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "any one language (usually Common)",
    "challenge_rating": 2,
    "proficiency_bonus": 2,
    "xp": 450,
    "special_abilities": [
      {
        "name": "Reckless",
        "desc": "At the start of its turn, the berserker can gain advantage on all melee weapon attack rolls during that turn, but attack rolls against it have advantage until the start of its next turn.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Greataxe",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d12+3"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/berserker.png",
    "url": "/api/2014/monsters/berserker",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "black-bear",
    "name": "Black Bear",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 11
      }
    ],
    "hit_points": 19,
    "hit_dice": "3d8",
    "hit_points_roll": "3d8+6",
    "speed": {
      "walk": "40 ft.",
      "climb": "30 ft."
    },
    "strength": 15,
    "dexterity": 10,
    "constitution": 14,
    "intelligence": 2,
    "wisdom": 12,
    "charisma": 7,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 13
    },
    "languages": "",
    "challenge_rating": 0.5,
    "proficiency_bonus": 2,
    "xp": 100,
    "special_abilities": [
      {
        "name": "Keen Smell",
        "desc": "The bear has advantage on Wisdom (Perception) checks that rely on smell.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The bear makes two attacks: one with its bite and one with its claws.",
        "actions": [
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claws",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d4+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/black-bear.png",
    "url": "/api/2014/monsters/black-bear",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "black-dragon-wyrmling",
    "name": "Black Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 17
      }
    ],
    "hit_points": 33,
    "hit_dice": "6d8",
    "hit_points_roll": "6d8+6",
    "speed": {
      "walk": "30 ft.",
      "fly": "60 ft.",
      "swim": "30 ft."
    },
    "strength": 15,
    "dexterity": 14,
    "constitution": 13,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 13,
    "proficiencies": [
      {
        "value": 4,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "acid"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "10 ft.",
      "darkvision": "60 ft.",
      "passive_perception": 14
    },
    "languages": "Draconic",
    "challenge_rating": 2,
    "proficiency_bonus": 2,
    "xp": 450,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The dragon can breathe air and water.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 2 (1d4) acid damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+2"
          },
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "1d4"
          }
        ],
        "actions": []
      },
      {
        "name": "Acid Breath",
        "desc": "The dragon exhales acid in a 15-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 22 (5d8) acid damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 11,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "5d8"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/black-dragon-wyrmling.png",
    "url": "/api/2014/monsters/black-dragon-wyrmling",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "black-pudding",
    "name": "Black Pudding",
    "size": "Large",
    "type": "ooze",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 7
      }
    ],
    "hit_points": 85,
    "hit_dice": "10d10",
    "hit_points_roll": "10d10+30",
    "speed": {
      "walk": "20 ft.",
      "climb": "20 ft."
    },
    "strength": 16,
    "dexterity": 5,
    "constitution": 16,
    "intelligence": 1,
    "wisdom": 6,
    "charisma": 1,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "acid",
      "cold",
      "lightning",
      "slashing"
    ],
    "condition_immunities": [
      {
        "index": "blinded",
        "name": "Blinded",
        "url": "/api/2014/conditions/blinded"
      },
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      },
      {
        "index": "prone",
        "name": "Prone",
        "url": "/api/2014/conditions/prone"
      }
    ],
    "senses": {
      "blindsight": "60 ft. (blind beyond this radius)",
      "passive_perception": 8
    },
    "languages": "",
    "challenge_rating": 4,
    "proficiency_bonus": 2,
    "xp": 1100,
    "special_abilities": [
      {
        "name": "Amorphous",
        "desc": "The pudding can move through a space as narrow as 1 inch wide without squeezing.",
        "damage": []
      },
      {
        "name": "Corrosive Form",
        "desc": "A creature that touches the pudding or hits it with a melee attack while within 5 feet of it takes 4 (1d8) acid damage. Any nonmagical weapon made of metal or wood that hits the pudding corrodes. After dealing damage, the weapon takes a permanent and cumulative -1 penalty to damage rolls. If its penalty drops to -5, the weapon is destroyed. Nonmagical ammunition made of metal or wood that hits the pudding is destroyed after dealing damage. The pudding can eat through 2-inch-thick, nonmagical wood or metal in 1 round.",
        "damage": [
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "1d8+8"
          }
        ]
      },
      {
        "name": "Spider Climb",
        "desc": "The pudding can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Pseudopod",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 18 (4d8) acid damage. In addition, nonmagical armor worn by the target is partly dissolved and takes a permanent and cumulative -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+3"
          },
          {
            "damage_type": {
              "index": "acid",
              "name": "Acid",
              "url": "/api/2014/damage-types/acid"
            },
            "damage_dice": "4d8"
          }
        ],
        "actions": []
      }
    ],
    "reactions": [
      {
        "name": "Split",
        "desc": "When a pudding that is Medium or larger is subjected to lightning or slashing damage, it splits into two new puddings if it has at least 10 hit points. Each new pudding has hit points equal to half the original pudding's, rounded down. New puddings are one size smaller than the original pudding."
      }
    ],
    "image": "/api/images/monsters/black-pudding.png",
    "url": "/api/2014/monsters/black-pudding",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": []
  },
  {
    "index": "blink-dog",
    "name": "Blink Dog",
    "desc": "A blink dog takes its name from its ability to blink in and out of existence, a talent it uses to aid its attacks and to avoid harm.",
    "size": "Medium",
    "type": "fey",
    "alignment": "lawful good",
    "armor_class": [
      {
        "type": "dex",
        "value": 13
      }
    ],
    "hit_points": 22,
    "hit_dice": "4d8",
    "hit_points_roll": "4d8+4",
    "speed": {
      "walk": "40 ft."
    },
    "strength": 12,
    "dexterity": 17,
    "constitution": 12,
    "intelligence": 10,
    "wisdom": 13,
    "charisma": 11,
    "proficiencies": [
      {
        "value": 3,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "Blink Dog, understands Sylvan but can't speak it",
    "challenge_rating": 0.25,
    "proficiency_bonus": 2,
    "xp": 50,
    "special_abilities": [
      {
        "name": "Keen Hearing and Smell",
        "desc": "The dog has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Teleport",
        "desc": "The dog magically teleports, along with any equipment it is wearing or carrying, up to 40 ft. to an unoccupied space it can see. Before or after teleporting, the dog can make one bite attack.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 4
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/blink-dog.png",
    "url": "/api/2014/monsters/blink-dog",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "blood-hawk",
    "name": "Blood Hawk",
    "desc": "Taking its name from its crimson feathers and aggressive nature, the blood hawk fearlessly attacks almost any animal, stabbing it with its daggerlike beak. Blood hawks flock together in large numbers, attacking as a pack to take down prey.",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 12
      }
    ],
    "hit_points": 7,
    "hit_dice": "2d6",
    "hit_points_roll": "2d6",
    "speed": {
      "walk": "10 ft.",
      "fly": "60 ft."
    },
    "strength": 6,
    "dexterity": 14,
    "constitution": 10,
    "intelligence": 3,
    "wisdom": 14,
    "charisma": 5,
    "proficiencies": [
      {
        "value": 4,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 14
    },
    "languages": "",
    "challenge_rating": 0.125,
    "proficiency_bonus": 2,
    "xp": 25,
    "special_abilities": [
      {
        "name": "Keen Sight",
        "desc": "The hawk has advantage on Wisdom (Perception) checks that rely on sight.",
        "damage": []
      },
      {
        "name": "Pack Tactics",
        "desc": "The hawk has advantage on an attack roll against a creature if at least one of the hawk's allies is within 5 ft. of the creature and the ally isn't incapacitated.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Beak",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/blood-hawk.png",
    "url": "/api/2014/monsters/blood-hawk",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "blue-dragon-wyrmling",
    "name": "Blue Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 17
      }
    ],
    "hit_points": 52,
    "hit_dice": "8d8",
    "hit_points_roll": "8d8+16",
    "speed": {
      "walk": "30 ft.",
      "burrow": "15 ft.",
      "fly": "60 ft."
    },
    "strength": 17,
    "dexterity": 10,
    "constitution": 15,
    "intelligence": 12,
    "wisdom": 11,
    "charisma": 15,
    "proficiencies": [
      {
        "value": 2,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "lightning"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "10 ft.",
      "darkvision": "60 ft.",
      "passive_perception": 14
    },
    "languages": "Draconic",
    "challenge_rating": 3,
    "proficiency_bonus": 2,
    "xp": 700,
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage plus 3 (1d6) lightning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+3"
          },
          {
            "damage_type": {
              "index": "lightning",
              "name": "Lightning",
              "url": "/api/2014/damage-types/lightning"
            },
            "damage_dice": "1d6"
          }
        ],
        "actions": []
      },
      {
        "name": "Lightning Breath",
        "desc": "The dragon exhales lightning in a 30-foot line that is 5 feet wide. Each creature in that line must make a DC 12 Dexterity saving throw, taking 22 (4d10) lightning damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 12,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "4d10"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/blue-dragon-wyrmling.png",
    "url": "/api/2014/monsters/blue-dragon-wyrmling",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "boar",
    "name": "Boar",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 11
      }
    ],
    "hit_points": 11,
    "hit_dice": "2d8",
    "hit_points_roll": "2d8+2",
    "speed": {
      "walk": "40 ft."
    },
    "strength": 13,
    "dexterity": 11,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 9,
    "charisma": 5,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 9
    },
    "languages": "",
    "challenge_rating": 0.25,
    "proficiency_bonus": 2,
    "xp": 50,
    "special_abilities": [
      {
        "name": "Charge",
        "desc": "If the boar moves at least 20 ft. straight toward a target and then hits it with a tusk attack on the same turn, the target takes an extra 3 (1d6) slashing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.",
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6"
          }
        ]
      },
      {
        "name": "Relentless",
        "desc": "If the boar takes 7 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead.",
        "usage": {
          "type": "recharge after rest",
          "rest_types": [
            "short",
            "long"
          ]
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Tusk",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/boar.png",
    "url": "/api/2014/monsters/boar",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "bone-devil",
    "name": "Bone Devil",
    "size": "Large",
    "type": "fiend",
    "subtype": "devil",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 19
      }
    ],
    "hit_points": 142,
    "hit_dice": "15d10",
    "hit_points_roll": "15d10+60",
    "speed": {
      "walk": "40 ft.",
      "fly": "40 ft."
    },
    "strength": 18,
    "dexterity": 16,
    "constitution": 18,
    "intelligence": 13,
    "wisdom": 14,
    "charisma": 16,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-int",
          "name": "Saving Throw: INT",
          "url": "/api/2014/proficiencies/saving-throw-int"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-deception",
          "name": "Skill: Deception",
          "url": "/api/2014/proficiencies/skill-deception"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/2014/proficiencies/skill-insight"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "damage_immunities": [
      "fire",
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 12
    },
    "languages": "Infernal, telepathy 120 ft.",
    "challenge_rating": 9,
    "proficiency_bonus": 4,
    "xp": 5000,
    "special_abilities": [
      {
        "name": "Devil's Sight",
        "desc": "Magical darkness doesn't impede the devil's darkvision.",
        "damage": []
      },
      {
        "name": "Magic Resistance",
        "desc": "The devil has advantage on saving throws against spells and other magical effects.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The devil makes three attacks: two with its claws and one with its sting.",
        "actions": [
          {
            "action_name": "Claw",
            "count": "2",
            "type": "melee"
          },
          {
            "action_name": "Sting",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 8 (1d8 + 4) slashing damage.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d8+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Sting",
        "desc": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 17 (5d6) poison damage, and the target must succeed on a DC 14 Constitution saving throw or become poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d8+4"
          },
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "5d6"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/bone-devil.png",
    "url": "/api/2014/monsters/bone-devil",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "brass-dragon-wyrmling",
    "name": "Brass Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "chaotic good",
    "armor_class": [
      {
        "type": "natural",
        "value": 16
      }
    ],
    "hit_points": 16,
    "hit_dice": "3d8",
    "hit_points_roll": "3d8+3",
    "speed": {
      "walk": "30 ft.",
      "burrow": "15 ft.",
      "fly": "60 ft."
    },
    "strength": 15,
    "dexterity": 10,
    "constitution": 13,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 13,
    "proficiencies": [
      {
        "value": 2,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "fire"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "10 ft.",
      "darkvision": "60 ft.",
      "passive_perception": 14
    },
    "languages": "Draconic",
    "challenge_rating": 1,
    "proficiency_bonus": 2,
    "xp": 100,
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+2"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nFire Breath. The dragon exhales fire in an 20-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 14 (4d6) fire damage on a failed save, or half as much damage on a successful one.\nSleep Breath. The dragon exhales sleep gas in a 15-foot cone. Each creature in that area must succeed on a DC 11 Constitution saving throw or fall unconscious for 1 minute. This effect ends for a creature if the creature takes damage or someone uses an action to wake it.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Fire Breath",
                "dc": {
                  "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                  },
                  "dc_value": 11,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "fire",
                      "name": "Fire",
                      "url": "/api/2014/damage-types/fire"
                    },
                    "damage_dice": "4d6"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Sleep Breath",
                "dc": {
                  "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                  },
                  "dc_value": 11,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/brass-dragon-wyrmling.png",
    "url": "/api/2014/monsters/brass-dragon-wyrmling",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "bronze-dragon-wyrmling",
    "name": "Bronze Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "lawful good",
    "armor_class": [
      {
        "type": "natural",
        "value": 17
      }
    ],
    "hit_points": 32,
    "hit_dice": "5d8",
    "hit_points_roll": "5d8+10",
    "speed": {
      "walk": "30 ft.",
      "fly": "60 ft.",
      "swim": "30 ft."
    },
    "strength": 17,
    "dexterity": 10,
    "constitution": 15,
    "intelligence": 12,
    "wisdom": 11,
    "charisma": 15,
    "proficiencies": [
      {
        "value": 2,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "lightning"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "10 ft.",
      "darkvision": "60 ft.",
      "passive_perception": 14
    },
    "languages": "Draconic",
    "challenge_rating": 2,
    "proficiency_bonus": 2,
    "xp": 450,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The dragon can breathe air and water.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+3"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nLightning Breath. The dragon exhales lightning in a 40-foot line that is 5 feet wide. Each creature in that line must make a DC 12 Dexterity saving throw, taking 16 (3d10) lightning damage on a failed save, or half as much damage on a successful one.\nRepulsion Breath. The dragon exhales repulsion energy in a 30-foot cone. Each creature in that area must succeed on a DC 12 Strength saving throw. On a failed save, the creature is pushed 30 feet away from the dragon.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Lightning Breath",
                "dc": {
                  "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                  },
                  "dc_value": 12,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "lightning",
                      "name": "Lightning",
                      "url": "/api/2014/damage-types/lightning"
                    },
                    "damage_dice": "3d10"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Repulsion Breath",
                "dc": {
                  "dc_type": {
                    "index": "str",
                    "name": "STR",
                    "url": "/api/2014/ability-scores/str"
                  },
                  "dc_value": 12,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/bronze-dragon-wyrmling.png",
    "url": "/api/2014/monsters/bronze-dragon-wyrmling",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "brown-bear",
    "name": "Brown Bear",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 11
      }
    ],
    "hit_points": 34,
    "hit_dice": "4d10",
    "hit_points_roll": "4d10+12",
    "speed": {
      "walk": "40 ft.",
      "climb": "30 ft."
    },
    "strength": 19,
    "dexterity": 10,
    "constitution": 16,
    "intelligence": 2,
    "wisdom": 13,
    "charisma": 7,
    "proficiencies": [
      {
        "value": 3,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 13
    },
    "languages": "",
    "challenge_rating": 1,
    "proficiency_bonus": 2,
    "xp": 200,
    "special_abilities": [
      {
        "name": "Keen Smell",
        "desc": "The bear has advantage on Wisdom (Perception) checks that rely on smell.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The bear makes two attacks: one with its bite and one with its claws.",
        "actions": [
          {
            "action_name": "Bite",
            "count": "1",
            "type": "ability"
          },
          {
            "action_name": "Claws",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+4"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/brown-bear.png",
    "url": "/api/2014/monsters/brown-bear",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "bugbear",
    "name": "Bugbear",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "goblinoid",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "armor",
        "value": 16,
        "armor": [
          {
            "index": "shield",
            "name": "Shield",
            "url": "/api/2014/equipment/shield"
          },
          {
            "index": "hide-armor",
            "name": "Hide Armor",
            "url": "/api/2014/equipment/hide-armor"
          }
        ]
      }
    ],
    "hit_points": 27,
    "hit_dice": "5d8",
    "hit_points_roll": "5d8+5",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 15,
    "dexterity": 14,
    "constitution": 13,
    "intelligence": 8,
    "wisdom": 11,
    "charisma": 9,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "skill-survival",
          "name": "Skill: Survival",
          "url": "/api/2014/proficiencies/skill-survival"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 10
    },
    "languages": "Common, Goblin",
    "challenge_rating": 1,
    "proficiency_bonus": 2,
    "xp": 200,
    "special_abilities": [
      {
        "name": "Brute",
        "desc": "A melee weapon deals one extra die of its damage when the bugbear hits with it (included in the attack).",
        "damage": []
      },
      {
        "name": "Surprise Attack",
        "desc": "If the bugbear surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 7 (2d6) damage from the attack.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Morningstar",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d8+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Javelin",
        "desc": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 9 (2d6 + 2) piercing damage in melee or 5 (1d6 + 2) piercing damage at range.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d6+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/bugbear.png",
    "url": "/api/2014/monsters/bugbear",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "bulette",
    "name": "Bulette",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 17
      }
    ],
    "hit_points": 94,
    "hit_dice": "9d10",
    "hit_points_roll": "9d10+45",
    "speed": {
      "walk": "40 ft.",
      "burrow": "40 ft."
    },
    "strength": 19,
    "dexterity": 11,
    "constitution": 21,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 5,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "60 ft.",
      "tremorsense": "60 ft.",
      "passive_perception": 16
    },
    "languages": "",
    "challenge_rating": 5,
    "proficiency_bonus": 3,
    "xp": 1800,
    "special_abilities": [
      {
        "name": "Standing Leap",
        "desc": "The bulette's long jump is up to 30 ft. and its high jump is up to 15 ft., with or without a running start.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (4d12 + 4) piercing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "4d12+4"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Deadly Leap",
        "desc": "If the bulette jumps at least 15 ft. as part of its movement, it can then use this action to land on its feet in a space that contains one or more other creatures. Each of those creatures must succeed on a DC 16 Strength or Dexterity saving throw (target's choice) or be knocked prone and take 14 (3d6 + 4) bludgeoning damage plus 14 (3d6 + 4) slashing damage. On a successful save, the creature takes only half the damage, isn't knocked prone, and is pushed 5 ft. out of the bulette's space into an unoccupied space of the creature's choice. If no unoccupied space is within range, the creature instead falls prone in the bulette's space.",
        "actions": []
      }
    ],
    "image": "/api/images/monsters/bulette.png",
    "url": "/api/2014/monsters/bulette",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "camel",
    "name": "Camel",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 9
      }
    ],
    "hit_points": 15,
    "hit_dice": "2d10",
    "hit_points_roll": "2d10+4",
    "speed": {
      "walk": "50 ft."
    },
    "strength": 16,
    "dexterity": 8,
    "constitution": 14,
    "intelligence": 2,
    "wisdom": 8,
    "charisma": 5,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 9
    },
    "languages": "",
    "challenge_rating": 0.125,
    "proficiency_bonus": 2,
    "xp": 25,
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d4"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/camel.png",
    "url": "/api/2014/monsters/camel",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "cat",
    "name": "Cat",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 12
      }
    ],
    "hit_points": 2,
    "hit_dice": "1d4",
    "hit_points_roll": "1d4",
    "speed": {
      "walk": "40 ft.",
      "climb": "30 ft."
    },
    "strength": 3,
    "dexterity": 15,
    "constitution": 10,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 7,
    "proficiencies": [
      {
        "value": 3,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 13
    },
    "languages": "",
    "challenge_rating": 0,
    "proficiency_bonus": 2,
    "xp": 10,
    "special_abilities": [
      {
        "name": "Keen Smell",
        "desc": "The cat has advantage on Wisdom (Perception) checks that rely on smell.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 slashing damage.",
        "attack_bonus": 0,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/cat.png",
    "url": "/api/2014/monsters/cat",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "centaur",
    "name": "Centaur",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "neutral good",
    "armor_class": [
      {
        "type": "dex",
        "value": 12
      }
    ],
    "hit_points": 45,
    "hit_dice": "6d10",
    "hit_points_roll": "6d10+12",
    "speed": {
      "walk": "50 ft."
    },
    "strength": 18,
    "dexterity": 14,
    "constitution": 14,
    "intelligence": 9,
    "wisdom": 13,
    "charisma": 11,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "skill-athletics",
          "name": "Skill: Athletics",
          "url": "/api/2014/proficiencies/skill-athletics"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "skill-survival",
          "name": "Skill: Survival",
          "url": "/api/2014/proficiencies/skill-survival"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 13
    },
    "languages": "Elvish, Sylvan",
    "challenge_rating": 2,
    "proficiency_bonus": 2,
    "xp": 450,
    "special_abilities": [
      {
        "name": "Charge",
        "desc": "If the centaur moves at least 30 ft. straight toward a target and then hits it with a pike attack on the same turn, the target takes an extra 10 (3d6) piercing damage.",
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "3d6"
          }
        ]
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "action_options",
        "desc": "The centaur makes two attacks: one with its pike and one with its hooves or two with its longbow.",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Pike",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Hooves",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "action",
                "action_name": "Longbow",
                "count": 2,
                "type": "ranged"
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Pike",
        "desc": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 9 (1d10 + 4) piercing damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Hooves",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Longbow",
        "desc": "Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/centaur.png",
    "url": "/api/2014/monsters/centaur",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "chain-devil",
    "name": "Chain Devil",
    "size": "Medium",
    "type": "fiend",
    "subtype": "devil",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 16
      }
    ],
    "hit_points": 85,
    "hit_dice": "10d8",
    "hit_points_roll": "10d8+40",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 18,
    "dexterity": 15,
    "constitution": 18,
    "intelligence": 11,
    "wisdom": 12,
    "charisma": 14,
    "proficiencies": [
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "damage_immunities": [
      "fire",
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 11
    },
    "languages": "Infernal, telepathy 120 ft.",
    "challenge_rating": 8,
    "proficiency_bonus": 3,
    "xp": 3900,
    "special_abilities": [
      {
        "name": "Devil's Sight",
        "desc": "Magical darkness doesn't impede the devil's darkvision.",
        "damage": []
      },
      {
        "name": "Magic Resistance",
        "desc": "The devil has advantage on saving throws against spells and other magical effects.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The devil makes two attacks with its chains.",
        "actions": [
          {
            "action_name": "Chain",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Chain",
        "desc": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage. The target is grappled (escape DC 14) if the devil isn't already grappling a creature. Until this grapple ends, the target is restrained and takes 7 (2d6) piercing damage at the start of each of its turns.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+4"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Animate Chains",
        "desc": "Up to four chains the devil can see within 60 feet of it magically sprout razor-edged barbs and animate under the devil's control, provided that the chains aren't being worn or carried.\nEach animated chain is an object with AC 20, 20 hit points, resistance to piercing damage, and immunity to psychic and thunder damage. When the devil uses Multiattack on its turn, it can use each animated chain to make one additional chain attack. An animated chain can grapple one creature of its own but can't make attacks while grappling. An animated chain reverts to its inanimate state if reduced to 0 hit points or if the devil is incapacitated or dies.",
        "usage": {
          "type": "recharge after rest",
          "rest_types": [
            "short",
            "long"
          ]
        },
        "actions": []
      }
    ],
    "reactions": [
      {
        "name": "Unnerving Mask",
        "desc": "When a creature the devil can see starts its turn within 30 feet of the devil, the devil can create the illusion that it looks like one of the creature's departed loved ones or bitter enemies. If the creature can see the devil, it must succeed on a DC 14 Wisdom saving throw or be frightened until the end of its turn.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 14,
          "success_type": "none"
        }
      }
    ],
    "image": "/api/images/monsters/chain-devil.png",
    "url": "/api/2014/monsters/chain-devil",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": []
  },
  {
    "index": "chimera",
    "name": "Chimera",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 14
      }
    ],
    "hit_points": 114,
    "hit_dice": "12d10",
    "hit_points_roll": "12d10+48",
    "speed": {
      "walk": "30 ft.",
      "fly": "60 ft."
    },
    "strength": 19,
    "dexterity": 11,
    "constitution": 19,
    "intelligence": 3,
    "wisdom": 14,
    "charisma": 10,
    "proficiencies": [
      {
        "value": 8,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 18
    },
    "languages": "understands Draconic but can't speak",
    "challenge_rating": 6,
    "proficiency_bonus": 3,
    "xp": 2300,
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "action_options",
        "desc": "The chimera makes three attacks: one with its bite, one with its horns, and one with its claws. When its fire breath is available, it can use the breath in place of its bite or horns.",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Horns",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Claws",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Fire Breath",
                    "count": 1,
                    "type": "ability"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Horns",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Claws",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Fire Breath",
                    "count": 1,
                    "type": "ability"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Claws",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d6+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Horns",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (1d12 + 4) bludgeoning damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d12+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+4"
          }
        ],
        "actions": []
      },
      {
        "name": "Fire Breath",
        "desc": "The dragon head exhales fire in a 15-foot cone. Each creature in that area must make a DC 15 Dexterity saving throw, taking 31 (7d8) fire damage on a failed save, or half as much damage on a successful one.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 15,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "7d8"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/chimera.png",
    "url": "/api/2014/monsters/chimera",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "chuul",
    "name": "Chuul",
    "size": "Large",
    "type": "aberration",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 16
      }
    ],
    "hit_points": 93,
    "hit_dice": "11d10",
    "hit_points_roll": "11d10+33",
    "speed": {
      "walk": "30 ft.",
      "swim": "30 ft."
    },
    "strength": 19,
    "dexterity": 10,
    "constitution": 16,
    "intelligence": 5,
    "wisdom": 11,
    "charisma": 5,
    "proficiencies": [
      {
        "value": 4,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 14
    },
    "languages": "understands Deep Speech but can't speak",
    "challenge_rating": 4,
    "proficiency_bonus": 2,
    "xp": 1100,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The chuul can breathe air and water.",
        "damage": []
      },
      {
        "name": "Sense Magic",
        "desc": "The chuul senses magic within 120 feet of it at will. This trait otherwise works like the detect magic spell but isn't itself magical.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "action_options",
        "desc": "The chuul makes two pincer attacks. If the chuul is grappling a creature, the chuul can also use its tentacles once.",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "action",
                "action_name": "Pincer",
                "count": 2,
                "type": "melee"
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Pincer",
                    "count": 2,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Tentacles",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Pincer",
        "desc": "Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage. The target is grappled (escape DC 14) if it is a Large or smaller creature and the chuul doesn't have two other creatures grappled.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+4"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Tentacles",
        "desc": "One creature grappled by the chuul must succeed on a DC 13 Constitution saving throw or be poisoned for 1 minute. Until this poison ends, the target is paralyzed. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "dc": {
          "dc_type": {
            "index": "con",
            "name": "CON",
            "url": "/api/2014/ability-scores/con"
          },
          "dc_value": 13,
          "success_type": "none"
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/chuul.png",
    "url": "/api/2014/monsters/chuul",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "clay-golem",
    "name": "Clay Golem",
    "size": "Large",
    "type": "construct",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 14
      }
    ],
    "hit_points": 133,
    "hit_dice": "14d10",
    "hit_points_roll": "14d10+56",
    "speed": {
      "walk": "20 ft."
    },
    "strength": 20,
    "dexterity": 9,
    "constitution": 18,
    "intelligence": 3,
    "wisdom": 8,
    "charisma": 1,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "acid",
      "poison",
      "psychic",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't adamantine"
    ],
    "condition_immunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 9
    },
    "languages": "understands the languages of its creator but can't speak",
    "challenge_rating": 9,
    "proficiency_bonus": 4,
    "xp": 5000,
    "special_abilities": [
      {
        "name": "Acid Absorption",
        "desc": "Whenever the golem is subjected to acid damage, it takes no damage and instead regains a number of hit points equal to the acid damage dealt.",
        "damage": []
      },
      {
        "name": "Berserk",
        "desc": "Whenever the golem starts its turn with 60 hit points or fewer, roll a d6. On a 6, the golem goes berserk. On each of its turns while berserk, the golem attacks the nearest creature it can see. If no creature is near enough to move to and attack, the golem attacks an object, with preference for an object smaller than itself. Once the golem goes berserk, it continues to do so until it is destroyed or regains all its hit points.",
        "damage": []
      },
      {
        "name": "Immutable Form",
        "desc": "The golem is immune to any spell or effect that would alter its form.",
        "damage": []
      },
      {
        "name": "Magic Resistance",
        "desc": "The golem has advantage on saving throws against spells and other magical effects.",
        "damage": []
      },
      {
        "name": "Magic Weapons",
        "desc": "The golem's weapon attacks are magical.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The golem makes two slam attacks.",
        "actions": [
          {
            "action_name": "Slam",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Slam",
        "desc": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 15 Constitution saving throw or have its hit point maximum reduced by an amount equal to the damage taken. The target dies if this attack reduces its hit point maximum to 0. The reduction lasts until removed by the greater restoration spell or other magic.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d10+5"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Haste",
        "desc": "Until the end of its next turn, the golem magically gains a +2 bonus to its AC, has advantage on Dexterity saving throws, and can use its slam attack as a bonus action.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/clay-golem.png",
    "url": "/api/2014/monsters/clay-golem",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "cloaker",
    "name": "Cloaker",
    "size": "Large",
    "type": "aberration",
    "alignment": "chaotic neutral",
    "armor_class": [
      {
        "type": "natural",
        "value": 14
      }
    ],
    "hit_points": 78,
    "hit_dice": "12d10",
    "hit_points_roll": "12d10+12",
    "speed": {
      "walk": "10 ft.",
      "fly": "40 ft."
    },
    "strength": 17,
    "dexterity": 15,
    "constitution": 12,
    "intelligence": 13,
    "wisdom": 12,
    "charisma": 14,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 11
    },
    "languages": "Deep Speech, Undercommon",
    "challenge_rating": 8,
    "proficiency_bonus": 3,
    "xp": 3900,
    "special_abilities": [
      {
        "name": "Damage Transfer",
        "desc": "While attached to a creature, the cloaker takes only half the damage dealt to it (rounded down). and that creature takes the other half.",
        "damage": []
      },
      {
        "name": "False Appearance",
        "desc": "While the cloaker remains motionless without its underside exposed, it is indistinguishable from a dark leather cloak.",
        "damage": []
      },
      {
        "name": "Light Sensitivity",
        "desc": "While in bright light, the cloaker has disadvantage on attack rolls and Wisdom (Perception) checks that rely on sight.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The cloaker makes two attacks: one with its bite and one with its tail.",
        "actions": [
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Tail",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 10 (2d6 + 3) piercing damage, and if the target is Large or smaller, the cloaker attaches to it. If the cloaker has advantage against the target, the cloaker attaches to the target's head, and the target is blinded and unable to breathe while the cloaker is attached. While attached, the cloaker can make this attack only against the target and has advantage on the attack roll. The cloaker can detach itself by spending 5 feet of its movement. A creature, including the target, can take its action to detach the cloaker by succeeding on a DC 16 Strength check.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 7 (1d8 + 3) slashing damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d8+3"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Moan",
        "desc": "Each creature within 60 feet of the cloaker that can hear its moan and that isn't an aberration must succeed on a DC 13 Wisdom saving throw or become frightened until the end of the cloaker's next turn. If a creature's saving throw is successful, the creature is immune to the cloaker's moan for the next 24 hours.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 13,
          "success_type": "none"
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Phantasms",
        "desc": "The cloaker magically creates three illusory duplicates of itself if it isn't in bright light. The duplicates move with it and mimic its actions, shifting position so as to make it impossible to track which cloaker is the real one. If the cloaker is ever in an area of bright light, the duplicates disappear.\nWhenever any creature targets the cloaker with an attack or a harmful spell while a duplicate remains, that creature rolls randomly to determine whether it targets the cloaker or one of the duplicates. A creature is unaffected by this magical effect if it can't see or if it relies on senses other than sight.\nA duplicate has the cloaker's AC and uses its saving throws. If an attack hits a duplicate, or if a duplicate fails a saving throw against an effect that deals damage, the duplicate disappears.",
        "usage": {
          "type": "recharge after rest",
          "rest_types": [
            "short",
            "long"
          ]
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/cloaker.png",
    "url": "/api/2014/monsters/cloaker",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "cloud-giant",
    "name": "Cloud Giant",
    "size": "Huge",
    "type": "giant",
    "alignment": "neutral good (50%) or neutral evil (50%)",
    "armor_class": [
      {
        "type": "natural",
        "value": 14
      }
    ],
    "hit_points": 200,
    "hit_dice": "16d12",
    "hit_points_roll": "16d12+96",
    "speed": {
      "walk": "40 ft."
    },
    "strength": 27,
    "dexterity": 10,
    "constitution": 22,
    "intelligence": 12,
    "wisdom": 16,
    "charisma": 16,
    "proficiencies": [
      {
        "value": 10,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/2014/proficiencies/skill-insight"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 17
    },
    "languages": "Common, Giant",
    "challenge_rating": 9,
    "proficiency_bonus": 4,
    "xp": 5000,
    "special_abilities": [
      {
        "name": "Keen Smell",
        "desc": "The giant has advantage on Wisdom (Perception) checks that rely on smell.",
        "damage": []
      },
      {
        "name": "Innate Spellcasting",
        "desc": "The giant's innate spellcasting ability is Charisma. It can innately cast the following spells, requiring no material components:\n\nAt will: detect magic, fog cloud, light\n3/day each: feather fall, fly, misty step, telekinesis\n1/day each: control weather, gaseous form",
        "spellcasting": {
          "ability": {
            "index": "cha",
            "name": "CHA",
            "url": "/api/2014/ability-scores/cha"
          },
          "components_required": [
            "V",
            "S"
          ],
          "spells": [
            {
              "name": "Detect Magic",
              "level": 1,
              "url": "/api/2014/spells/detect-magic",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Fog Cloud",
              "level": 1,
              "url": "/api/2014/spells/fog-cloud",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Light",
              "level": 0,
              "url": "/api/2014/spells/light",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Feather Fall",
              "level": 1,
              "url": "/api/2014/spells/feather-fall",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Fly",
              "level": 3,
              "url": "/api/2014/spells/fly",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Misty Step",
              "level": 2,
              "url": "/api/2014/spells/misty-step",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Telekinesis",
              "level": 5,
              "url": "/api/2014/spells/telekinesis",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Control Weather",
              "level": 8,
              "url": "/api/2014/spells/control-weather",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Gaseous Form",
              "level": 3,
              "url": "/api/2014/spells/gaseous-form",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            }
          ]
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The giant makes two morningstar attacks.",
        "actions": [
          {
            "action_name": "Morningstar",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Morningstar",
        "desc": "Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) piercing damage.",
        "attack_bonus": 12,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "3d8+8"
          }
        ],
        "actions": []
      },
      {
        "name": "Rock",
        "desc": "Ranged Weapon Attack: +12 to hit, range 60/240 ft., one target. Hit: 30 (4d10 + 8) bludgeoning damage.",
        "attack_bonus": 12,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "4d10+8"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/cloud-giant.png",
    "url": "/api/2014/monsters/cloud-giant",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "cockatrice",
    "name": "Cockatrice",
    "size": "Small",
    "type": "monstrosity",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 11
      }
    ],
    "hit_points": 27,
    "hit_dice": "6d6",
    "hit_points_roll": "6d6+6",
    "speed": {
      "walk": "20 ft.",
      "fly": "40 ft."
    },
    "strength": 6,
    "dexterity": 12,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 13,
    "charisma": 5,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 11
    },
    "languages": "",
    "challenge_rating": 0.5,
    "proficiency_bonus": 2,
    "xp": 100,
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) piercing damage, and the target must succeed on a DC 11 Constitution saving throw against being magically petrified. On a failed save, the creature begins to turn to stone and is restrained. It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the creature is petrified for 24 hours.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+1"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/cockatrice.png",
    "url": "/api/2014/monsters/cockatrice",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "commoner",
    "name": "Commoner",
    "desc": "Commoners include peasants, serfs, slaves, servants, pilgrims, merchants, artisans, and hermits.",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "alignment": "any alignment",
    "armor_class": [
      {
        "type": "dex",
        "value": 10
      }
    ],
    "hit_points": 4,
    "hit_dice": "1d8",
    "hit_points_roll": "1d8",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 10,
    "dexterity": 10,
    "constitution": 10,
    "intelligence": 10,
    "wisdom": 10,
    "charisma": 10,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "any one language (usually Common)",
    "challenge_rating": 0,
    "proficiency_bonus": 2,
    "xp": 10,
    "actions": [
      {
        "name": "Club",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d4"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/commoner.png",
    "url": "/api/2014/monsters/commoner",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "constrictor-snake",
    "name": "Constrictor Snake",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 12
      }
    ],
    "hit_points": 13,
    "hit_dice": "2d10",
    "hit_points_roll": "2d10+2",
    "speed": {
      "walk": "30 ft.",
      "swim": "30 ft."
    },
    "strength": 15,
    "dexterity": 14,
    "constitution": 12,
    "intelligence": 1,
    "wisdom": 10,
    "charisma": 3,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "blindsight": "10 ft.",
      "passive_perception": 10
    },
    "languages": "",
    "challenge_rating": 0.25,
    "proficiency_bonus": 2,
    "xp": 50,
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Constrict",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 14). Until this grapple ends, the creature is restrained, and the snake can't constrict another target.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/constrictor-snake.png",
    "url": "/api/2014/monsters/constrictor-snake",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "copper-dragon-wyrmling",
    "name": "Copper Dragon Wyrmling",
    "size": "Medium",
    "type": "dragon",
    "alignment": "chaotic good",
    "armor_class": [
      {
        "type": "natural",
        "value": 16
      }
    ],
    "hit_points": 22,
    "hit_dice": "4d8",
    "hit_points_roll": "4d8+4",
    "speed": {
      "walk": "30 ft.",
      "climb": "30 ft.",
      "fly": "60 ft."
    },
    "strength": 15,
    "dexterity": 12,
    "constitution": 13,
    "intelligence": 14,
    "wisdom": 11,
    "charisma": 13,
    "proficiencies": [
      {
        "value": 3,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "acid"
    ],
    "condition_immunities": [],
    "senses": {
      "blindsight": "10 ft.",
      "darkvision": "60 ft.",
      "passive_perception": 14
    },
    "languages": "Draconic",
    "challenge_rating": 1,
    "proficiency_bonus": 2,
    "xp": 200,
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d10+2"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Breath Weapons",
        "desc": "The dragon uses one of the following breath weapons.\nAcid Breath. The dragon exhales acid in an 20-foot line that is 5 feet wide. Each creature in that line must make a DC 11 Dexterity saving throw, taking 18 (4d8) acid damage on a failed save, or half as much damage on a successful one.\nSlowing Breath. The dragon exhales gas in a 15-foot cone. Each creature in that area must succeed on a DC 11 Constitution saving throw. On a failed save, the creature can't use reactions, its speed is halved, and it can't make more than one attack on its turn. In addition, the creature can use either an action or a bonus action on its turn, but not both. These effects last for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself with a successful save.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "options": {
          "choose": 1,
          "type": "attack",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "breath",
                "name": "Acid Breath",
                "dc": {
                  "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                  },
                  "dc_value": 11,
                  "success_type": "half"
                },
                "damage": [
                  {
                    "damage_type": {
                      "index": "acid",
                      "name": "Acid",
                      "url": "/api/2014/damage-types/acid"
                    },
                    "damage_dice": "4d8"
                  }
                ]
              },
              {
                "option_type": "breath",
                "name": "Slowing Breath",
                "dc": {
                  "dc_type": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                  },
                  "dc_value": 11,
                  "success_type": "none"
                }
              }
            ]
          }
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/copper-dragon-wyrmling.png",
    "url": "/api/2014/monsters/copper-dragon-wyrmling",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "couatl",
    "name": "Couatl",
    "size": "Medium",
    "type": "celestial",
    "alignment": "lawful good",
    "armor_class": [
      {
        "type": "natural",
        "value": 19
      }
    ],
    "hit_points": 97,
    "hit_dice": "13d8",
    "hit_points_roll": "13d8+39",
    "speed": {
      "walk": "30 ft.",
      "fly": "90 ft."
    },
    "strength": 16,
    "dexterity": 20,
    "constitution": 17,
    "intelligence": 18,
    "wisdom": 20,
    "charisma": 18,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "radiant"
    ],
    "damage_immunities": [
      "psychic",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "condition_immunities": [],
    "senses": {
      "truesight": "120 ft.",
      "passive_perception": 15
    },
    "languages": "all, telepathy 120 ft.",
    "challenge_rating": 4,
    "proficiency_bonus": 2,
    "xp": 1100,
    "special_abilities": [
      {
        "name": "Innate Spellcasting",
        "desc": "The couatl's spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring only verbal components:\n\nAt will: detect evil and good, detect magic, detect thoughts\n3/day each: bless, create food and water, cure wounds, lesser restoration, protection from poison, sanctuary, shield\n1/day each: dream, greater restoration, scrying",
        "spellcasting": {
          "ability": {
            "index": "cha",
            "name": "CHA",
            "url": "/api/2014/ability-scores/cha"
          },
          "dc": 14,
          "components_required": [
            "V"
          ],
          "spells": [
            {
              "name": "Detect Evil and Good",
              "level": 1,
              "url": "/api/2014/spells/detect-evil-and-good",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Detect Magic",
              "level": 1,
              "url": "/api/2014/spells/detect-magic",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Detect Thoughts",
              "level": 2,
              "url": "/api/2014/spells/detect-thoughts",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Bless",
              "level": 1,
              "url": "/api/2014/spells/bless",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Create Food and Water",
              "level": 3,
              "url": "/api/2014/spells/create-food-and-water",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Cure Wounds",
              "level": 1,
              "url": "/api/2014/spells/cure-wounds",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Lesser Restoration",
              "level": 2,
              "url": "/api/2014/spells/lesser-restoration",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Protection from Poison",
              "level": 2,
              "url": "/api/2014/spells/protection-from-poison",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Sanctuary",
              "level": 1,
              "url": "/api/2014/spells/sanctuary",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Shield",
              "level": 1,
              "url": "/api/2014/spells/shield",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Dream",
              "level": 5,
              "url": "/api/2014/spells/dream",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Greater Restoration",
              "level": 5,
              "url": "/api/2014/spells/greater-restoration",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Scrying",
              "level": 5,
              "url": "/api/2014/spells/scrying",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            }
          ]
        },
        "damage": []
      },
      {
        "name": "Magic Weapons",
        "desc": "The couatl's weapon attacks are magical.",
        "damage": []
      },
      {
        "name": "Shielded Mind",
        "desc": "The couatl is immune to scrying and to any effect that would sense its emotions, read its thoughts, or detect its location.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +8 to hit, reach 5 ft., one creature. Hit: 8 (1d6 + 5) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 24 hours. Until this poison ends, the target is unconscious. Another creature can use an action to shake the target awake.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+5"
          }
        ],
        "actions": []
      },
      {
        "name": "Constrict",
        "desc": "Melee Weapon Attack: +6 to hit, reach 10 ft., one Medium or smaller creature. Hit: 10 (2d6 + 3) bludgeoning damage, and the target is grappled (escape DC 15). Until this grapple ends, the target is restrained, and the couatl can't constrict another target.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d6+3"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Change Shape",
        "desc": "The couatl magically polymorphs into a humanoid or beast that has a challenge rating equal to or less than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the couatl's choice).\nIn a new form, the couatl retains its game statistics and ability to speak, but its AC, movement modes, Strength, Dexterity, and other actions are replaced by those of the new form, and it gains any statistics and capabilities (except class features, legendary actions, and lair actions) that the new form has but that it lacks. If the new form has a bite attack, the couatl can use its bite in that form.",
        "actions": []
      }
    ],
    "image": "/api/images/monsters/couatl.png",
    "url": "/api/2014/monsters/couatl",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "crab",
    "name": "Crab",
    "size": "Tiny",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 11
      }
    ],
    "hit_points": 2,
    "hit_dice": "1d4",
    "hit_points_roll": "1d4",
    "speed": {
      "walk": "20 ft.",
      "swim": "20 ft."
    },
    "strength": 2,
    "dexterity": 11,
    "constitution": 10,
    "intelligence": 1,
    "wisdom": 8,
    "charisma": 2,
    "proficiencies": [
      {
        "value": 2,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "blindsight": "30 ft.",
      "passive_perception": 9
    },
    "languages": "",
    "challenge_rating": 0,
    "proficiency_bonus": 2,
    "xp": 10,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The crab can breathe air and water.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage.",
        "attack_bonus": 0,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/crab.png",
    "url": "/api/2014/monsters/crab",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "crocodile",
    "name": "Crocodile",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 12
      }
    ],
    "hit_points": 19,
    "hit_dice": "3d10",
    "hit_points_roll": "3d10+3",
    "speed": {
      "walk": "20 ft.",
      "swim": "20 ft."
    },
    "strength": 15,
    "dexterity": 10,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 5,
    "proficiencies": [
      {
        "value": 2,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "",
    "challenge_rating": 0.5,
    "proficiency_bonus": 2,
    "xp": 100,
    "special_abilities": [
      {
        "name": "Hold Breath",
        "desc": "The crocodile can hold its breath for 15 minutes.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target is grappled (escape DC 12). Until this grapple ends, the target is restrained, and the crocodile can't bite another target",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d10+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/crocodile.png",
    "url": "/api/2014/monsters/crocodile",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "cult-fanatic",
    "name": "Cult Fanatic",
    "desc": "Fanatics are often part of a cult’s leadership, using their charisma and dogma to influence and prey on those of weak will. Most are interested in personal power above all else.",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "alignment": "any non-good alignment",
    "armor_class": [
      {
        "type": "armor",
        "value": 13,
        "armor": [
          {
            "index": "leather-armor",
            "name": "Leather Armor",
            "url": "/api/2014/equipment/leather-armor"
          }
        ]
      }
    ],
    "hit_points": 22,
    "hit_dice": "6d8",
    "hit_points_roll": "6d8-5",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 11,
    "dexterity": 14,
    "constitution": 12,
    "intelligence": 10,
    "wisdom": 13,
    "charisma": 14,
    "proficiencies": [
      {
        "value": 4,
        "proficiency": {
          "index": "skill-deception",
          "name": "Skill: Deception",
          "url": "/api/2014/proficiencies/skill-deception"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-persuasion",
          "name": "Skill: Persuasion",
          "url": "/api/2014/proficiencies/skill-persuasion"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "skill-religion",
          "name": "Skill: Religion",
          "url": "/api/2014/proficiencies/skill-religion"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 11
    },
    "languages": "any one language (usually Common)",
    "challenge_rating": 2,
    "proficiency_bonus": 2,
    "xp": 450,
    "special_abilities": [
      {
        "name": "Dark Devotion",
        "desc": "The fanatic has advantage on saving throws against being charmed or frightened.",
        "damage": []
      },
      {
        "name": "Spellcasting",
        "desc": "The fanatic is a 4th-level spellcaster. Its spell casting ability is Wisdom (spell save DC 11, +3 to hit with spell attacks). The fanatic has the following cleric spells prepared:\n\nCantrips (at will): light, sacred flame, thaumaturgy\n- 1st level (4 slots): command, inflict wounds, shield of faith\n- 2nd level (3 slots): hold person, spiritual weapon",
        "spellcasting": {
          "level": 4,
          "ability": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc": 11,
          "modifier": 3,
          "components_required": [
            "V",
            "S",
            "M"
          ],
          "school": "cleric",
          "slots": {
            "1": 4,
            "2": 3
          },
          "spells": [
            {
              "name": "Light",
              "level": 0,
              "url": "/api/2014/spells/light"
            },
            {
              "name": "Sacred Flame",
              "level": 0,
              "url": "/api/2014/spells/sacred-flame"
            },
            {
              "name": "Thaumaturgy",
              "level": 0,
              "url": "/api/2014/spells/thaumaturgy"
            },
            {
              "name": "Command",
              "level": 1,
              "url": "/api/2014/spells/command"
            },
            {
              "name": "Inflict Wounds",
              "level": 1,
              "url": "/api/2014/spells/inflict-wounds"
            },
            {
              "name": "Shield of Faith",
              "level": 1,
              "url": "/api/2014/spells/shield-of-faith"
            },
            {
              "name": "Hold Person",
              "level": 2,
              "url": "/api/2014/spells/hold-person"
            },
            {
              "name": "Spiritual Weapon",
              "level": 2,
              "url": "/api/2014/spells/spiritual-weapon"
            }
          ]
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The fanatic makes two melee attacks.",
        "actions": [
          {
            "action_name": "Dagger",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Dagger",
        "desc": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one creature. Hit: 4 (1d4 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/cult-fanatic.png",
    "url": "/api/2014/monsters/cult-fanatic",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "cultist",
    "name": "Cultist",
    "desc": "Cultists swear allegiance to dark powers such as elemental princes, demon lords, or archdevils. Most conceal their loyalties to avoid being ostracized, imprisoned, or executed for their beliefs. Unlike evil acolytes, cultists often show signs of insanity in their beliefs and practices.",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "alignment": "any non-good alignment",
    "armor_class": [
      {
        "type": "armor",
        "value": 12,
        "armor": [
          {
            "index": "leather-armor",
            "name": "Leather Armor",
            "url": "/api/2014/equipment/leather-armor"
          }
        ]
      }
    ],
    "hit_points": 9,
    "hit_dice": "2d8",
    "hit_points_roll": "2d8",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 11,
    "dexterity": 12,
    "constitution": 10,
    "intelligence": 10,
    "wisdom": 11,
    "charisma": 10,
    "proficiencies": [
      {
        "value": 2,
        "proficiency": {
          "index": "skill-deception",
          "name": "Skill: Deception",
          "url": "/api/2014/proficiencies/skill-deception"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "skill-religion",
          "name": "Skill: Religion",
          "url": "/api/2014/proficiencies/skill-religion"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "any one language (usually Common)",
    "challenge_rating": 0.125,
    "proficiency_bonus": 2,
    "xp": 25,
    "special_abilities": [
      {
        "name": "Dark Devotion",
        "desc": "The cultist has advantage on saving throws against being charmed or frightened.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Scimitar",
        "desc": "Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6 + 1) slashing damage.",
        "attack_bonus": 3,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d6+1"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/cultist.png",
    "url": "/api/2014/monsters/cultist",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "darkmantle",
    "name": "Darkmantle",
    "size": "Small",
    "type": "monstrosity",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 11
      }
    ],
    "hit_points": 22,
    "hit_dice": "5d6",
    "hit_points_roll": "5d6+5",
    "speed": {
      "walk": "10 ft.",
      "fly": "30 ft."
    },
    "strength": 16,
    "dexterity": 12,
    "constitution": 13,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 5,
    "proficiencies": [
      {
        "value": 3,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "blindsight": "60 ft.",
      "passive_perception": 10
    },
    "languages": "",
    "challenge_rating": 0.5,
    "proficiency_bonus": 2,
    "xp": 100,
    "special_abilities": [
      {
        "name": "Echolocation",
        "desc": "The darkmantle can't use its blindsight while deafened.",
        "damage": []
      },
      {
        "name": "False Appearance",
        "desc": "While the darkmantle remains motionless, it is indistinguishable from a cave formation such as a stalactite or stalagmite.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Crush",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d6 + 3) bludgeoning damage, and the darkmantle attaches to the target. If the target is Medium or smaller and the darkmantle has advantage on the attack roll, it attaches by engulfing the target's head, and the target is also blinded and unable to breathe while the darkmantle is attached in this way.\nWhile attached to the target, the darkmantle can attack no other creature except the target but has advantage on its attack rolls. The darkmantle's speed also becomes 0, it can't benefit from any bonus to its speed, and it moves with the target.\nA creature can detach the darkmantle by making a successful DC 13 Strength check as an action. On its turn, the darkmantle can detach itself from the target by using 5 feet of movement.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Darkness Aura",
        "desc": "A 15-foot radius of magical darkness extends out from the darkmantle, moves with it, and spreads around corners. The darkness lasts as long as the darkmantle maintains concentration, up to 10 minutes (as if concentrating on a spell). Darkvision can't penetrate this darkness, and no natural light can illuminate it. If any of the darkness overlaps with an area of light created by a spell of 2nd level or lower, the spell creating the light is dispelled.",
        "usage": {
          "type": "per day",
          "times": 1
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/darkmantle.png",
    "url": "/api/2014/monsters/darkmantle",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "death-dog",
    "name": "Death Dog",
    "desc": "A death dog is an ugly two-headed hound that roams plains, and deserts. Hate burns in a death dog’s heart, and a taste for humanoid flesh drives it to attack travelers and explorers. Death dog saliva carries a foul disease that causes a victim’s flesh to slowly rot off the bone.",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "neutral evil",
    "armor_class": [
      {
        "type": "dex",
        "value": 12
      }
    ],
    "hit_points": 39,
    "hit_dice": "6d8",
    "hit_points_roll": "6d8+12",
    "speed": {
      "walk": "40 ft."
    },
    "strength": 15,
    "dexterity": 14,
    "constitution": 14,
    "intelligence": 3,
    "wisdom": 13,
    "charisma": 6,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 15
    },
    "languages": "",
    "challenge_rating": 1,
    "proficiency_bonus": 2,
    "xp": 200,
    "special_abilities": [
      {
        "name": "Two-Headed",
        "desc": "The dog has advantage on Wisdom (Perception) checks and on saving throws against being blinded, charmed, deafened, frightened, stunned, or knocked unconscious.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dog makes two bite attacks.",
        "actions": [
          {
            "action_name": "Bite",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage. If the target is a creature, it must succeed on a DC 12 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the creature must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. This reduction lasts until the disease is cured. The creature dies if the disease reduces its hit point maximum to 0.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/death-dog.png",
    "url": "/api/2014/monsters/death-dog",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "deep-gnome-svirfneblin",
    "name": "Deep Gnome (Svirfneblin)",
    "size": "Small",
    "type": "humanoid",
    "subtype": "gnome",
    "alignment": "neutral good",
    "armor_class": [
      {
        "type": "armor",
        "value": 15,
        "armor": [
          {
            "index": "chain-shirt",
            "name": "Chain Shirt",
            "url": "/api/2014/equipment/chain-shirt"
          }
        ]
      }
    ],
    "hit_points": 16,
    "hit_dice": "3d6",
    "hit_points_roll": "3d6+6",
    "speed": {
      "walk": "20 ft."
    },
    "strength": 15,
    "dexterity": 14,
    "constitution": 14,
    "intelligence": 12,
    "wisdom": 10,
    "charisma": 9,
    "proficiencies": [
      {
        "value": 3,
        "proficiency": {
          "index": "skill-investigation",
          "name": "Skill: Investigation",
          "url": "/api/2014/proficiencies/skill-investigation"
        }
      },
      {
        "value": 2,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 12
    },
    "languages": "Gnomish, Terran, Undercommon",
    "challenge_rating": 0.5,
    "proficiency_bonus": 2,
    "xp": 50,
    "special_abilities": [
      {
        "name": "Stone Camouflage",
        "desc": "The gnome has advantage on Dexterity (Stealth) checks made to hide in rocky terrain.",
        "damage": []
      },
      {
        "name": "Gnome Cunning",
        "desc": "The gnome has advantage on Intelligence, Wisdom, and Charisma saving throws against magic.",
        "damage": []
      },
      {
        "name": "Innate Spellcasting",
        "desc": "The gnome's innate spellcasting ability is Intelligence (spell save DC 11). It can innately cast the following spells, requiring no material components:\nAt will: nondetection (self only)\n1/day each: blindness/deafness, blur, disguise self",
        "spellcasting": {
          "ability": {
            "index": "int",
            "name": "INT",
            "url": "/api/2014/ability-scores/int"
          },
          "dc": 11,
          "components_required": [
            "V",
            "S"
          ],
          "spells": [
            {
              "name": "Nondetection",
              "level": 3,
              "notes": "Self only",
              "url": "/api/2014/spells/nondetection",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Blindness/Deafness",
              "level": 2,
              "url": "/api/2014/spells/blindness-deafness",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Blur",
              "level": 2,
              "url": "/api/2014/spells/blur",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Disguise Self",
              "level": 1,
              "url": "/api/2014/spells/disguise-self",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            }
          ]
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "War Pick",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Poisoned Dart",
        "desc": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/deep-gnome-svirfneblin.png",
    "url": "/api/2014/monsters/deep-gnome-svirfneblin",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "deer",
    "name": "Deer",
    "size": "Medium",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 13
      }
    ],
    "hit_points": 4,
    "hit_dice": "1d8",
    "hit_points_roll": "1d8",
    "speed": {
      "walk": "50 ft."
    },
    "strength": 11,
    "dexterity": 16,
    "constitution": 11,
    "intelligence": 2,
    "wisdom": 14,
    "charisma": 5,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 12
    },
    "languages": "",
    "challenge_rating": 0,
    "proficiency_bonus": 2,
    "xp": 10,
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/deer.png",
    "url": "/api/2014/monsters/deer",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "deva",
    "name": "Deva",
    "size": "Medium",
    "type": "celestial",
    "alignment": "lawful good",
    "armor_class": [
      {
        "type": "natural",
        "value": 17
      }
    ],
    "hit_points": 136,
    "hit_dice": "16d8",
    "hit_points_roll": "16d8+64",
    "speed": {
      "walk": "30 ft.",
      "fly": "90 ft."
    },
    "strength": 18,
    "dexterity": 18,
    "constitution": 18,
    "intelligence": 17,
    "wisdom": 20,
    "charisma": 20,
    "proficiencies": [
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/2014/proficiencies/skill-insight"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "radiant",
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damage_immunities": [],
    "condition_immunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      },
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "frightened",
        "name": "Frightened",
        "url": "/api/2014/conditions/frightened"
      }
    ],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 19
    },
    "languages": "all, telepathy 120 ft.",
    "challenge_rating": 10,
    "proficiency_bonus": 4,
    "xp": 5900,
    "special_abilities": [
      {
        "name": "Angelic Weapons",
        "desc": "The deva's weapon attacks are magical. When the deva hits with any weapon, the weapon deals an extra 4d8 radiant damage (included in the attack).",
        "damage": []
      },
      {
        "name": "Innate Spellcasting",
        "desc": "The deva's spellcasting ability is Charisma (spell save DC 17). The deva can innately cast the following spells, requiring only verbal components:\nAt will: detect evil and good\n1/day each: commune, raise dead",
        "spellcasting": {
          "ability": {
            "index": "cha",
            "name": "CHA",
            "url": "/api/2014/ability-scores/cha"
          },
          "dc": 17,
          "components_required": [
            "V"
          ],
          "spells": [
            {
              "name": "Detect Evil and Good",
              "level": 1,
              "url": "/api/2014/spells/detect-evil-and-good",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Commune",
              "level": 5,
              "url": "/api/2014/spells/commune",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Raise Dead",
              "level": 5,
              "url": "/api/2014/spells/raise-dead",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            }
          ]
        },
        "damage": []
      },
      {
        "name": "Magic Resistance",
        "desc": "The deva has advantage on saving throws against spells and other magical effects.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The deva makes two melee attacks.",
        "actions": [
          {
            "action_name": "Mace",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Mace",
        "desc": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage plus 18 (4d8) radiant damage.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+4"
          },
          {
            "damage_type": {
              "index": "radiant",
              "name": "Radiant",
              "url": "/api/2014/damage-types/radiant"
            },
            "damage_dice": "4d8"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Healing Touch",
        "desc": "The deva touches another creature. The target magically regains 20 (4d8 + 2) hit points and is freed from any curse, disease, poison, blindness, or deafness.",
        "usage": {
          "type": "per day",
          "times": 3
        },
        "actions": []
      },
      {
        "damage": [],
        "name": "Change Shape",
        "desc": "The deva magically polymorphs into a humanoid or beast that has a challenge rating equal to or less than its own, or back into its true form. It reverts to its true form if it dies. Any equipment it is wearing or carrying is absorbed or borne by the new form (the deva's choice).\nIn a new form, the deva retains its game statistics and ability to speak, but its AC, movement modes, Strength, Dexterity, and special senses are replaced by those of the new form, and it gains any statistics and capabilities (except class features, legendary actions, and lair actions) that the new form has but that it lacks.",
        "actions": []
      }
    ],
    "image": "/api/images/monsters/deva.png",
    "url": "/api/2014/monsters/deva",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "dire-wolf",
    "name": "Dire Wolf",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 14
      }
    ],
    "hit_points": 37,
    "hit_dice": "5d10",
    "hit_points_roll": "5d10+10",
    "speed": {
      "walk": "50 ft."
    },
    "strength": 17,
    "dexterity": 15,
    "constitution": 15,
    "intelligence": 3,
    "wisdom": 12,
    "charisma": 7,
    "proficiencies": [
      {
        "value": 3,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 13
    },
    "languages": "",
    "challenge_rating": 1,
    "proficiency_bonus": 2,
    "xp": 200,
    "special_abilities": [
      {
        "name": "Keen Hearing and Smell",
        "desc": "The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
        "damage": []
      },
      {
        "name": "Pack Tactics",
        "desc": "The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 ft. of the creature and the ally isn't incapacitated.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d6+3"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/dire-wolf.png",
    "url": "/api/2014/monsters/dire-wolf",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "djinni",
    "name": "Djinni",
    "size": "Large",
    "type": "elemental",
    "alignment": "chaotic good",
    "armor_class": [
      {
        "type": "natural",
        "value": 17
      }
    ],
    "hit_points": 161,
    "hit_dice": "14d10",
    "hit_points_roll": "14d10+84",
    "speed": {
      "walk": "30 ft.",
      "fly": "90 ft."
    },
    "strength": 21,
    "dexterity": 15,
    "constitution": 22,
    "intelligence": 15,
    "wisdom": 16,
    "charisma": 20,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "lightning",
      "thunder"
    ],
    "condition_immunities": [],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 13
    },
    "languages": "Auran",
    "challenge_rating": 11,
    "proficiency_bonus": 4,
    "xp": 7200,
    "special_abilities": [
      {
        "name": "Elemental Demise",
        "desc": "If the djinni dies, its body disintegrates into a warm breeze, leaving behind only equipment the djinni was wearing or carrying.",
        "damage": []
      },
      {
        "name": "Innate Spellcasting",
        "desc": "The djinni's innate spellcasting ability is Charisma (spell save DC 17, +9 to hit with spell attacks). It can innately cast the following spells, requiring no material components:\n\nAt will: detect evil and good, detect magic, thunderwave\n3/day each: create food and water (can create wine instead of water), tongues, wind walk\n1/day each: conjure elemental (air elemental only), creation, gaseous form, invisibility, major image, plane shift",
        "spellcasting": {
          "ability": {
            "index": "cha",
            "name": "CHA",
            "url": "/api/2014/ability-scores/cha"
          },
          "dc": 17,
          "modifier": 9,
          "components_required": [
            "V",
            "S"
          ],
          "spells": [
            {
              "name": "Detect Evil and Good",
              "level": 1,
              "url": "/api/2014/spells/detect-evil-and-good",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Detect Magic",
              "level": 1,
              "url": "/api/2014/spells/detect-magic",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Thunderwave",
              "level": 1,
              "url": "/api/2014/spells/thunderwave",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Create Food and Water",
              "level": 3,
              "notes": "Can create wine instead of water",
              "url": "/api/2014/spells/create-food-and-water",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Tongues",
              "level": 3,
              "url": "/api/2014/spells/tongues",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Wind Walk",
              "level": 6,
              "url": "/api/2014/spells/wind-walk",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Conjure Elemental",
              "level": 5,
              "notes": "Air Elemental Only",
              "url": "/api/2014/spells/conjure-elemental",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Creation",
              "level": 5,
              "url": "/api/2014/spells/creation",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Gaseous Form",
              "level": 3,
              "url": "/api/2014/spells/gaseous-form",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Invisibility",
              "level": 2,
              "url": "/api/2014/spells/invisibility",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Major Image",
              "level": 3,
              "url": "/api/2014/spells/major-image",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Plane Shift",
              "level": 7,
              "url": "/api/2014/spells/plane-shift",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            }
          ]
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The djinni makes three scimitar attacks.",
        "actions": [
          {
            "action_name": "Scimitar",
            "count": "3",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Scimitar",
        "desc": "Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage plus 3 (1d6) lightning or thunder damage (djinni's choice).",
        "attack_bonus": 9,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+5"
          },
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "lightning",
                    "name": "Lightning",
                    "url": "/api/2014/damage-types/lightning"
                  },
                  "damage_dice": "1d6"
                },
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "thunder",
                    "name": "Thunder",
                    "url": "/api/2014/damage-types/thunder"
                  },
                  "damage_dice": "1d6"
                }
              ]
            }
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Create Whirlwind",
        "desc": "A 5-foot-radius, 30-foot-tall cylinder of swirling air magically forms on a point the djinni can see within 120 feet of it. The whirlwind lasts as long as the djinni maintains concentration (as if concentrating on a spell). Any creature but the djinni that enters the whirlwind must succeed on a DC 18 Strength saving throw or be restrained by it. The djinni can move the whirlwind up to 60 feet as an action, and creatures restrained by the whirlwind move with it. The whirlwind ends if the djinni loses sight of it.\nA creature can use its action to free a creature restrained by the whirlwind, including itself, by succeeding on a DC 18 Strength check. If the check succeeds, the creature is no longer restrained and moves to the nearest space outside the whirlwind.",
        "dc": {
          "dc_type": {
            "index": "str",
            "name": "STR",
            "url": "/api/2014/ability-scores/str"
          },
          "dc_value": 18,
          "success_type": "none"
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/djinni.png",
    "url": "/api/2014/monsters/djinni",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "doppelganger",
    "name": "Doppelganger",
    "size": "Medium",
    "type": "monstrosity",
    "subtype": "shapechanger",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 14
      }
    ],
    "hit_points": 52,
    "hit_dice": "8d8",
    "hit_points_roll": "8d8+16",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 11,
    "dexterity": 18,
    "constitution": 14,
    "intelligence": 11,
    "wisdom": 12,
    "charisma": 14,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "skill-deception",
          "name": "Skill: Deception",
          "url": "/api/2014/proficiencies/skill-deception"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "skill-insight",
          "name": "Skill: Insight",
          "url": "/api/2014/proficiencies/skill-insight"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [
      {
        "index": "charmed",
        "name": "Charmed",
        "url": "/api/2014/conditions/charmed"
      }
    ],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 11
    },
    "languages": "Common",
    "challenge_rating": 3,
    "proficiency_bonus": 2,
    "xp": 700,
    "special_abilities": [
      {
        "name": "Shapechanger",
        "desc": "The doppelganger can use its action to polymorph into a Small or Medium humanoid it has seen, or back into its true form. Its statistics, other than its size, are the same in each form. Any equipment it is wearing or carrying isn't transformed. It reverts to its true form if it dies.",
        "damage": []
      },
      {
        "name": "Ambusher",
        "desc": "In the first round of combat, the doppelganger has advantage on attack rolls against any creature it has surprised.",
        "damage": []
      },
      {
        "name": "Surprise Attack",
        "desc": "If the doppelganger surprises a creature and hits it with an attack during the first round of combat, the target takes an extra 10 (3d6) damage from the attack.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The doppelganger makes two melee attacks.",
        "actions": [
          {
            "action_name": "Slam",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Slam",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+4"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Read Thoughts",
        "desc": "The doppelganger magically reads the surface thoughts of one creature within 60 ft. of it. The effect can penetrate barriers, but 3 ft. of wood or dirt, 2 ft. of stone, 2 inches of metal, or a thin sheet of lead blocks it. While the target is in range, the doppelganger can continue reading its thoughts, as long as the doppelganger's concentration isn't broken (as if concentrating on a spell). While reading the target's mind, the doppelganger has advantage on Wisdom (Insight) and Charisma (Deception, Intimidation, and Persuasion) checks against the target.",
        "actions": []
      }
    ],
    "image": "/api/images/monsters/doppelganger.png",
    "url": "/api/2014/monsters/doppelganger",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "draft-horse",
    "name": "Draft Horse",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 10
      }
    ],
    "hit_points": 19,
    "hit_dice": "3d10",
    "hit_points_roll": "3d10+3",
    "speed": {
      "walk": "40 ft."
    },
    "strength": 18,
    "dexterity": 10,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 11,
    "charisma": 7,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "",
    "challenge_rating": 0.25,
    "proficiency_bonus": 2,
    "xp": 50,
    "actions": [
      {
        "name": "Hooves",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) bludgeoning damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d4+4"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/draft-horse.png",
    "url": "/api/2014/monsters/draft-horse",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "dragon-turtle",
    "name": "Dragon Turtle",
    "size": "Gargantuan",
    "type": "dragon",
    "alignment": "neutral",
    "armor_class": [
      {
        "type": "natural",
        "value": 20
      }
    ],
    "hit_points": 341,
    "hit_dice": "22d20",
    "hit_points_roll": "22d20+110",
    "speed": {
      "walk": "20 ft.",
      "swim": "40 ft."
    },
    "strength": 25,
    "dexterity": 10,
    "constitution": 20,
    "intelligence": 10,
    "wisdom": 12,
    "charisma": 12,
    "proficiencies": [
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 11,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "fire"
    ],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 11
    },
    "languages": "Aquan, Draconic",
    "challenge_rating": 17,
    "proficiency_bonus": 6,
    "xp": 18000,
    "special_abilities": [
      {
        "name": "Amphibious",
        "desc": "The dragon turtle can breathe air and water.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "action_options",
        "desc": "The dragon turtle makes three attacks: one with its bite and two with its claws. It can make one tail attack in place of its two claw attacks.",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Claws",
                    "count": 2,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Tail",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 26 (3d12 + 7) piercing damage.",
        "attack_bonus": 13,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "3d12+7"
          }
        ],
        "actions": []
      },
      {
        "name": "Claw",
        "desc": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 16 (2d8 + 7) slashing damage.",
        "attack_bonus": 13,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d8+7"
          }
        ],
        "actions": []
      },
      {
        "name": "Tail",
        "desc": "Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 26 (3d12 + 7) bludgeoning damage. If the target is a creature, it must succeed on a DC 20 Strength saving throw or be pushed up to 10 feet away from the dragon turtle and knocked prone.",
        "attack_bonus": 13,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d12+7"
          }
        ],
        "actions": []
      },
      {
        "name": "Steam Breath",
        "desc": "The dragon turtle exhales scalding steam in a 60-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 52 (15d6) fire damage on a failed save, or half as much damage on a successful one. Being underwater doesn't grant resistance against this damage.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "dc": {
          "dc_type": {
            "index": "con",
            "name": "CON",
            "url": "/api/2014/ability-scores/con"
          },
          "dc_value": 18,
          "success_type": "half"
        },
        "damage": [
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "15d6"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/dragon-turtle.png",
    "url": "/api/2014/monsters/dragon-turtle",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "dretch",
    "name": "Dretch",
    "size": "Small",
    "type": "fiend",
    "subtype": "demon",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 11
      }
    ],
    "hit_points": 18,
    "hit_dice": "4d6",
    "hit_points_roll": "4d6+4",
    "speed": {
      "walk": "20 ft."
    },
    "strength": 11,
    "dexterity": 11,
    "constitution": 12,
    "intelligence": 5,
    "wisdom": 8,
    "charisma": 3,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "cold",
      "fire",
      "lightning"
    ],
    "damage_immunities": [
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 9
    },
    "languages": "Abyssal, telepathy 60 ft. (works only with creatures that understand Abyssal)",
    "challenge_rating": 0.25,
    "proficiency_bonus": 2,
    "xp": 25,
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The dretch makes two attacks: one with its bite and one with its claws.",
        "actions": [
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claws",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6"
          }
        ],
        "actions": []
      },
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 5 (2d4) slashing damage.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d4"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Fetid Cloud",
        "desc": "A 10-foot radius of disgusting green gas extends out from the dretch. The gas spreads around corners, and its area is lightly obscured. It lasts for 1 minute or until a strong wind disperses it. Any creature that starts its turn in that area must succeed on a DC 11 Constitution saving throw or be poisoned until the start of its next turn. While poisoned in this way, the target can take either an action or a bonus action on its turn, not both, and can't take reactions.",
        "usage": {
          "type": "per day",
          "times": 1
        },
        "dc": {
          "dc_type": {
            "index": "con",
            "name": "CON",
            "url": "/api/2014/ability-scores/con"
          },
          "dc_value": 11,
          "success_type": "none"
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/dretch.png",
    "url": "/api/2014/monsters/dretch",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": [],
    "special_abilities": []
  },
  {
    "index": "drider",
    "name": "Drider",
    "size": "Large",
    "type": "monstrosity",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 19
      }
    ],
    "hit_points": 123,
    "hit_dice": "13d10",
    "hit_points_roll": "13d10+52",
    "speed": {
      "walk": "30 ft.",
      "climb": "30 ft."
    },
    "strength": 16,
    "dexterity": 16,
    "constitution": 18,
    "intelligence": 13,
    "wisdom": 14,
    "charisma": 12,
    "proficiencies": [
      {
        "value": 5,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 9,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 15
    },
    "languages": "Elvish, Undercommon",
    "challenge_rating": 6,
    "proficiency_bonus": 3,
    "xp": 2300,
    "special_abilities": [
      {
        "name": "Fey Ancestry",
        "desc": "The drider has advantage on saving throws against being charmed, and magic can't put the drider to sleep.",
        "damage": []
      },
      {
        "name": "Innate Spellcasting",
        "desc": "The drider's innate spellcasting ability is Wisdom (spell save DC 13). The drider can innately cast the following spells, requiring no material components:\nAt will: dancing lights\n1/day each: darkness, faerie fire",
        "spellcasting": {
          "ability": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc": 13,
          "components_required": [
            "V",
            "S"
          ],
          "spells": [
            {
              "name": "Dancing Lights",
              "level": 1,
              "url": "/api/2014/spells/dancing-lights",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Darkness",
              "level": 2,
              "url": "/api/2014/spells/darkness",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Faerie Fire",
              "level": 1,
              "url": "/api/2014/spells/faerie-fire",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            }
          ]
        },
        "damage": []
      },
      {
        "name": "Spider Climb",
        "desc": "The drider can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.",
        "damage": []
      },
      {
        "name": "Sunlight Sensitivity",
        "desc": "While in sunlight, the drider has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.",
        "damage": []
      },
      {
        "name": "Web Walker",
        "desc": "The drider ignores movement restrictions caused by webbing.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "action_options",
        "desc": "The drider makes three attacks, either with its longsword or its longbow. It can replace one of those attacks with a bite attack.",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "action",
                "action_name": "Longsword",
                "count": 3,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Longbow",
                "count": 3,
                "type": "ranged"
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Longsword",
                    "count": 2,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Longbow",
                    "count": 2,
                    "type": "ranged"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Bite",
                    "count": 1,
                    "type": "melee"
                  }
                ]
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 2 (1d4) piercing damage plus 9 (2d8) poison damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d4"
          },
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "2d8"
          }
        ],
        "actions": []
      },
      {
        "name": "Longsword",
        "desc": "Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.",
        "attack_bonus": 6,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                  },
                  "damage_dice": "1d8+3",
                  "notes": "One handed"
                },
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                  },
                  "damage_dice": "1d10+3",
                  "notes": "Two handed"
                }
              ]
            }
          }
        ],
        "actions": []
      },
      {
        "name": "Longbow",
        "desc": "Ranged Weapon Attack: +6 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 4 (1d8) poison damage.",
        "attack_bonus": 6,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+3"
          },
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "1d8"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/drider.png",
    "url": "/api/2014/monsters/drider",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "drow",
    "name": "Drow",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "elf",
    "alignment": "neutral evil",
    "armor_class": [
      {
        "type": "armor",
        "value": 15,
        "armor": [
          {
            "index": "chain-shirt",
            "name": "Chain Shirt",
            "url": "/api/2014/equipment/chain-shirt"
          }
        ]
      }
    ],
    "hit_points": 13,
    "hit_dice": "3d8",
    "hit_points_roll": "3d8",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 10,
    "dexterity": 14,
    "constitution": 10,
    "intelligence": 11,
    "wisdom": 11,
    "charisma": 12,
    "proficiencies": [
      {
        "value": 2,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 12
    },
    "languages": "Elvish, Undercommon",
    "challenge_rating": 0.25,
    "proficiency_bonus": 2,
    "xp": 50,
    "special_abilities": [
      {
        "name": "Fey Ancestry",
        "desc": "The drow has advantage on saving throws against being charmed, and magic can't put the drow to sleep.",
        "damage": []
      },
      {
        "name": "Innate Spellcasting",
        "desc": "The drow's spellcasting ability is Charisma (spell save DC 11). It can innately cast the following spells, requiring no material components:\nAt will: dancing lights\n1/day each: darkness, faerie fire",
        "spellcasting": {
          "ability": {
            "index": "cha",
            "name": "CHA",
            "url": "/api/2014/ability-scores/cha"
          },
          "dc": 11,
          "modifier": 0,
          "components_required": [
            "V",
            "S"
          ],
          "spells": [
            {
              "name": "Dancing Lights",
              "level": 0,
              "url": "/api/2014/spells/dancing-lights",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Darkness",
              "level": 2,
              "url": "/api/2014/spells/darkness",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Faerie Fire",
              "level": 1,
              "url": "/api/2014/spells/faerie-fire",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            }
          ]
        },
        "damage": []
      },
      {
        "name": "Sunlight Sensitivity",
        "desc": "While in sunlight, the drow has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Shortsword",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Hand Crossbow",
        "desc": "Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 1 hour. If the saving throw fails by 5 or more, the target is also unconscious while poisoned in this way. The target wakes up if it takes damage or if another creature takes an action to shake it awake.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/drow.png",
    "url": "/api/2014/monsters/drow",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "druid",
    "name": "Druid",
    "desc": "**Druids** dwell in forests and other secluded wilderness locations, where they protect the natural world from monsters and the encroachment of civilization. Some are **tribal shamans** who heal the sick, pray to animal spirits, and provide spiritual guidance.",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "alignment": "any alignment",
    "armor_class": [
      {
        "type": "dex",
        "value": 11
      },
      {
        "type": "spell",
        "value": 16,
        "spell": {
          "index": "barkskin",
          "name": "Barkskin",
          "url": "/api/2014/spells/barkskin"
        }
      }
    ],
    "hit_points": 27,
    "hit_dice": "5d8",
    "hit_points_roll": "5d8+5",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 10,
    "dexterity": 12,
    "constitution": 13,
    "intelligence": 12,
    "wisdom": 15,
    "charisma": 11,
    "proficiencies": [
      {
        "value": 4,
        "proficiency": {
          "index": "skill-medicine",
          "name": "Skill: Medicine",
          "url": "/api/2014/proficiencies/skill-medicine"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "skill-nature",
          "name": "Skill: Nature",
          "url": "/api/2014/proficiencies/skill-nature"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 14
    },
    "languages": "Druidic plus any two languages",
    "challenge_rating": 2,
    "proficiency_bonus": 2,
    "xp": 450,
    "special_abilities": [
      {
        "name": "Spellcasting",
        "desc": "The druid is a 4th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). It has the following druid spells prepared:\n\n- Cantrips (at will): druidcraft, produce flame, shillelagh\n- 1st level (4 slots): entangle, longstrider, speak with animals, thunderwave\n- 2nd level (3 slots): animal messenger, barkskin",
        "spellcasting": {
          "level": 4,
          "ability": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc": 12,
          "modifier": 4,
          "components_required": [
            "V",
            "S",
            "M"
          ],
          "school": "druid",
          "slots": {
            "1": 4,
            "2": 3
          },
          "spells": [
            {
              "name": "Druidcraft",
              "level": 0,
              "url": "/api/2014/spells/druidcraft"
            },
            {
              "name": "Produce Flame",
              "level": 0,
              "url": "/api/2014/spells/produce-flame"
            },
            {
              "name": "Shillelagh",
              "level": 0,
              "url": "/api/2014/spells/shillelagh"
            },
            {
              "name": "Entangle",
              "level": 1,
              "url": "/api/2014/spells/entangle"
            },
            {
              "name": "Longstrider",
              "level": 1,
              "url": "/api/2014/spells/longstrider"
            },
            {
              "name": "Speak with Animals",
              "level": 1,
              "url": "/api/2014/spells/speak-with-animals"
            },
            {
              "name": "Thunderwave",
              "level": 1,
              "url": "/api/2014/spells/thunderwave"
            },
            {
              "name": "Animal Messenger",
              "level": 2,
              "url": "/api/2014/spells/animal-messenger"
            },
            {
              "name": "Barkskin",
              "level": 2,
              "url": "/api/2014/spells/barkskin"
            }
          ]
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Quarterstaff",
        "desc": " Melee Weapon Attack: +2 to hit (+4 to hit with shillelagh), reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage, 4 (1d8) bludgeoning damage if wielded with two hands, or 6 (1d8 + 2) bludgeoning damage with shillelagh.",
        "attack_bonus": 2,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "bludgeoning",
                    "name": "Bludgeoning",
                    "url": "/api/2014/damage-types/bludgeoning"
                  },
                  "damage_dice": "1d6",
                  "notes": "One handed"
                },
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "bludgeoning",
                    "name": "Bludgeoning",
                    "url": "/api/2014/damage-types/bludgeoning"
                  },
                  "damage_dice": "1d8",
                  "notes": "Two handed"
                },
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "bludgeoning",
                    "name": "Bludgeoning",
                    "url": "/api/2014/damage-types/bludgeoning"
                  },
                  "damage_dice": "1d8+2",
                  "notes": "With shillelagh"
                }
              ]
            }
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/druid.png",
    "url": "/api/2014/monsters/druid",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "dryad",
    "name": "Dryad",
    "size": "Medium",
    "type": "fey",
    "alignment": "neutral",
    "armor_class": [
      {
        "type": "dex",
        "value": 11
      },
      {
        "type": "spell",
        "value": 16,
        "spell": {
          "index": "barkskin",
          "name": "Barkskin",
          "url": "/api/2014/spells/barkskin"
        }
      }
    ],
    "hit_points": 22,
    "hit_dice": "5d8",
    "hit_points_roll": "5d8",
    "speed": {
      "walk": "30 ft."
    },
    "strength": 10,
    "dexterity": 12,
    "constitution": 11,
    "intelligence": 14,
    "wisdom": 15,
    "charisma": 18,
    "proficiencies": [
      {
        "value": 4,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 5,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 14
    },
    "languages": "Elvish, Sylvan",
    "challenge_rating": 1,
    "proficiency_bonus": 2,
    "xp": 200,
    "special_abilities": [
      {
        "name": "Innate Spellcasting",
        "desc": "The dryad's innate spellcasting ability is Charisma (spell save DC 14). The dryad can innately cast the following spells, requiring no material components:\n\nAt will: druidcraft\n3/day each: entangle, goodberry\n1/day each: barkskin, pass without trace, shillelagh",
        "spellcasting": {
          "ability": {
            "index": "cha",
            "name": "CHA",
            "url": "/api/2014/ability-scores/cha"
          },
          "dc": 14,
          "components_required": [
            "V",
            "S"
          ],
          "spells": [
            {
              "name": "Druidcraft",
              "level": 0,
              "url": "/api/2014/spells/druidcraft",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Entangle",
              "level": 1,
              "url": "/api/2014/spells/entangle",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Goodberry",
              "level": 1,
              "url": "/api/2014/spells/goodberry",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Barkskin",
              "level": 2,
              "url": "/api/2014/spells/barkskin",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Pass Without Trace",
              "level": 2,
              "url": "/api/2014/spells/pass-without-trace",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Shillelagh",
              "level": 0,
              "url": "/api/2014/spells/shillelagh",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            }
          ]
        },
        "damage": []
      },
      {
        "name": "Magic Resistance",
        "desc": "The dryad has advantage on saving throws against spells and other magical effects.",
        "damage": []
      },
      {
        "name": "Speak with Beasts and Plants",
        "desc": "The dryad can communicate with beasts and plants as if they shared a language.",
        "damage": []
      },
      {
        "name": "Tree Stride",
        "desc": "Once on her turn, the dryad can use 10 ft. of her movement to step magically into one living tree within her reach and emerge from a second living tree within 60 ft. of the first tree, appearing in an unoccupied space within 5 ft. of the second tree. Both trees must be large or bigger.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Club",
        "desc": "Melee Weapon Attack: +2 to hit (+6 to hit with shillelagh), reach 5 ft., one target. Hit: 2 (1 d4) bludgeoning damage, or 8 (1d8 + 4) bludgeoning damage with shillelagh.",
        "attack_bonus": 2,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d4"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Fey Charm",
        "desc": "The dryad targets one humanoid or beast that she can see within 30 feet of her. If the target can see the dryad, it must succeed on a DC 14 Wisdom saving throw or be magically charmed. The charmed creature regards the dryad as a trusted friend to be heeded and protected. Although the target isn't under the dryad's control, it takes the dryad's requests or actions in the most favorable way it can.\nEach time the dryad or its allies do anything harmful to the target, it can repeat the saving throw, ending the effect on itself on a success. Otherwise, the effect lasts 24 hours or until the dryad dies, is on a different plane of existence from the target, or ends the effect as a bonus action. If a target's saving throw is successful, the target is immune to the dryad's Fey Charm for the next 24 hours.\nThe dryad can have no more than one humanoid and up to three beasts charmed at a time.",
        "dc": {
          "dc_type": {
            "index": "wis",
            "name": "WIS",
            "url": "/api/2014/ability-scores/wis"
          },
          "dc_value": 14,
          "success_type": "none"
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/dryad.png",
    "url": "/api/2014/monsters/dryad",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "duergar",
    "name": "Duergar",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "dwarf",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "armor",
        "value": 16,
        "armor": [
          {
            "index": "scale-mail",
            "name": "Scale Mail",
            "url": "/api/2014/equipment/scale-mail"
          },
          {
            "index": "shield",
            "name": "Shield",
            "url": "/api/2014/equipment/shield"
          }
        ]
      }
    ],
    "hit_points": 26,
    "hit_dice": "4d8",
    "hit_points_roll": "4d8+8",
    "speed": {
      "walk": "25 ft."
    },
    "strength": 14,
    "dexterity": 11,
    "constitution": 14,
    "intelligence": 11,
    "wisdom": 10,
    "charisma": 9,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "poison"
    ],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 10
    },
    "languages": "Dwarvish, Undercommon",
    "challenge_rating": 1,
    "proficiency_bonus": 2,
    "xp": 200,
    "special_abilities": [
      {
        "name": "Duergar Resilience",
        "desc": "The duergar has advantage on saving throws against poison, spells, and illusions, as well as to resist being charmed or paralyzed.",
        "damage": []
      },
      {
        "name": "Sunlight Sensitivity",
        "desc": "While in sunlight, the duergar has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Enlarge",
        "desc": "For 1 minute, the duergar magically increases in size, along with anything it is wearing or carrying. While enlarged, the duergar is Large, doubles its damage dice on Strength-based weapon attacks (included in the attacks), and makes Strength checks and Strength saving throws with advantage. If the duergar lacks the room to become Large, it attains the maximum size possible in the space available.",
        "usage": {
          "type": "recharge after rest",
          "rest_types": [
            "short",
            "long"
          ]
        },
        "actions": []
      },
      {
        "name": "War Pick",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage, or 11 (2d8 + 2) piercing damage while enlarged.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+2"
          }
        ],
        "actions": []
      },
      {
        "name": "Javelin",
        "desc": "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 9 (2d6 + 2) piercing damage while enlarged.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+2"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Invisibility",
        "desc": "The duergar magically turns invisible until it attacks, casts a spell, or uses its Enlarge, or until its concentration is broken, up to 1 hour (as if concentrating on a spell). Any equipment the duergar wears or carries is invisible with it.",
        "usage": {
          "type": "recharge after rest",
          "rest_types": [
            "short",
            "long"
          ]
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/duergar.png",
    "url": "/api/2014/monsters/duergar",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "dust-mephit",
    "name": "Dust Mephit",
    "size": "Small",
    "type": "elemental",
    "alignment": "neutral evil",
    "armor_class": [
      {
        "type": "dex",
        "value": 12
      }
    ],
    "hit_points": 17,
    "hit_dice": "5d6",
    "hit_points_roll": "5d6",
    "speed": {
      "walk": "30 ft.",
      "fly": "30 ft."
    },
    "strength": 5,
    "dexterity": 14,
    "constitution": 10,
    "intelligence": 9,
    "wisdom": 11,
    "charisma": 10,
    "proficiencies": [
      {
        "value": 2,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      }
    ],
    "damage_vulnerabilities": [
      "fire"
    ],
    "damage_resistances": [],
    "damage_immunities": [
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 12
    },
    "languages": "Auran, Terran",
    "challenge_rating": 0.5,
    "proficiency_bonus": 2,
    "xp": 100,
    "special_abilities": [
      {
        "name": "Death Burst",
        "desc": "When the mephit dies, it explodes in a burst of dust. Each creature within 5 ft. of it must then succeed on a DC 10 Constitution saving throw or be blinded for 1 minute. A blinded creature can repeat the saving throw on each of its turns, ending the effect on itself on a success.",
        "dc": {
          "dc_type": {
            "index": "con",
            "name": "CON",
            "url": "/api/2014/ability-scores/con"
          },
          "dc_value": 10,
          "success_type": "none"
        },
        "damage": []
      },
      {
        "name": "Innate Spellcasting",
        "desc": "The mephit can innately cast sleep, requiring no material components. Its innate spellcasting ability is Charisma.",
        "spellcasting": {
          "ability": {
            "index": "cha",
            "name": "CHA",
            "url": "/api/2014/ability-scores/cha"
          },
          "dc": 10,
          "components_required": [
            "V",
            "S"
          ],
          "spells": [
            {
              "name": "Sleep",
              "level": 1,
              "url": "/api/2014/spells/sleep",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            }
          ]
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) slashing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Blinding Breath",
        "desc": "The mephit exhales a 15-foot cone of blinding dust. Each creature in that area must succeed on a DC 10 Dexterity saving throw or be blinded for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 6
        },
        "dc": {
          "dc_type": {
            "index": "dex",
            "name": "DEX",
            "url": "/api/2014/ability-scores/dex"
          },
          "dc_value": 10,
          "success_type": "none"
        },
        "actions": []
      }
    ],
    "image": "/api/images/monsters/dust-mephit.png",
    "url": "/api/2014/monsters/dust-mephit",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "eagle",
    "name": "Eagle",
    "size": "Small",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 12
      }
    ],
    "hit_points": 3,
    "hit_dice": "1d6",
    "hit_points_roll": "1d6",
    "speed": {
      "walk": "10 ft.",
      "fly": "60 ft."
    },
    "strength": 6,
    "dexterity": 15,
    "constitution": 10,
    "intelligence": 2,
    "wisdom": 14,
    "charisma": 7,
    "proficiencies": [
      {
        "value": 4,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 14
    },
    "languages": "",
    "challenge_rating": 0,
    "proficiency_bonus": 2,
    "xp": 10,
    "special_abilities": [
      {
        "name": "Keen Sight",
        "desc": "The eagle has advantage on Wisdom (Perception) checks that rely on sight.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Talons",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d4+2"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/eagle.png",
    "url": "/api/2014/monsters/eagle",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "earth-elemental",
    "name": "Earth Elemental",
    "size": "Large",
    "type": "elemental",
    "alignment": "neutral",
    "armor_class": [
      {
        "type": "natural",
        "value": 17
      }
    ],
    "hit_points": 126,
    "hit_dice": "12d10",
    "hit_points_roll": "12d10+60",
    "speed": {
      "walk": "30 ft.",
      "burrow": "30 ft."
    },
    "strength": 20,
    "dexterity": 8,
    "constitution": 20,
    "intelligence": 5,
    "wisdom": 10,
    "charisma": 5,
    "proficiencies": [],
    "damage_vulnerabilities": [
      "thunder"
    ],
    "damage_resistances": [
      "bludgeoning, piercing, and slashing from nonmagical weapons"
    ],
    "damage_immunities": [
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "exhaustion",
        "name": "Exhaustion",
        "url": "/api/2014/conditions/exhaustion"
      },
      {
        "index": "paralyzed",
        "name": "Paralyzed",
        "url": "/api/2014/conditions/paralyzed"
      },
      {
        "index": "petrified",
        "name": "Petrified",
        "url": "/api/2014/conditions/petrified"
      },
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      },
      {
        "index": "unconscious",
        "name": "Unconscious",
        "url": "/api/2014/conditions/unconscious"
      }
    ],
    "senses": {
      "darkvision": "60 ft.",
      "tremorsense": "60 ft.",
      "passive_perception": 10
    },
    "languages": "Terran",
    "challenge_rating": 5,
    "proficiency_bonus": 3,
    "xp": 1800,
    "special_abilities": [
      {
        "name": "Earth Glide",
        "desc": "The elemental can burrow through nonmagical, unworked earth and stone. While doing so, the elemental doesn't disturb the material it moves through.",
        "damage": []
      },
      {
        "name": "Siege Monster",
        "desc": "The elemental deals double damage to objects and structures.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The elemental makes two slam attacks.",
        "actions": [
          {
            "action_name": "Slam",
            "count": "2",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Slam",
        "desc": "Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d8+5"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/earth-elemental.png",
    "url": "/api/2014/monsters/earth-elemental",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "efreeti",
    "name": "Efreeti",
    "size": "Large",
    "type": "elemental",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 17
      }
    ],
    "hit_points": 200,
    "hit_dice": "16d10",
    "hit_points_roll": "16d10+112",
    "speed": {
      "walk": "40 ft.",
      "fly": "60 ft."
    },
    "strength": 22,
    "dexterity": 12,
    "constitution": 24,
    "intelligence": 16,
    "wisdom": 15,
    "charisma": 16,
    "proficiencies": [
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-int",
          "name": "Saving Throw: INT",
          "url": "/api/2014/proficiencies/saving-throw-int"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [
      "fire"
    ],
    "condition_immunities": [],
    "senses": {
      "darkvision": "120 ft.",
      "passive_perception": 12
    },
    "languages": "Ignan",
    "challenge_rating": 11,
    "proficiency_bonus": 4,
    "xp": 7200,
    "special_abilities": [
      {
        "name": "Elemental Demise",
        "desc": "If the efreeti dies, its body disintegrates in a flash of fire and puff of smoke, leaving behind only equipment the djinni was wearing or carrying.",
        "damage": []
      },
      {
        "name": "Innate Spellcasting",
        "desc": "The efreeti's innate spell casting ability is Charisma (spell save DC 15, +7 to hit with spell attacks). It can innately cast the following spells, requiring no material components:\n\nAt will: detect magic\n3/day: enlarge/reduce, tongues\n1/day each: conjure elemental (fire elemental only), gaseous form, invisibility, major image, plane shift, wall of fire",
        "spellcasting": {
          "ability": {
            "index": "cha",
            "name": "CHA",
            "url": "/api/2014/ability-scores/cha"
          },
          "dc": 15,
          "modifier": 7,
          "components_required": [
            "V",
            "S"
          ],
          "spells": [
            {
              "name": "Detect Magic",
              "level": 1,
              "url": "/api/2014/spells/detect-magic",
              "usage": {
                "type": "at will",
                "rest_types": []
              }
            },
            {
              "name": "Enlarge/Reduce",
              "level": 2,
              "url": "/api/2014/spells/enlarge-reduce",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Tongues",
              "level": 3,
              "url": "/api/2014/spells/tongues",
              "usage": {
                "type": "per day",
                "times": 3,
                "rest_types": []
              }
            },
            {
              "name": "Conjure Elemental",
              "level": 5,
              "notes": "Fire Elemental only",
              "url": "/api/2014/spells/conjure-elemental",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Gaseous Form",
              "level": 3,
              "url": "/api/2014/spells/gaseous-form",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Invisibility",
              "level": 2,
              "url": "/api/2014/spells/invisibility",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Major Image",
              "level": 3,
              "url": "/api/2014/spells/major-image",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Plane Shift",
              "level": 7,
              "url": "/api/2014/spells/plane-shift",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            },
            {
              "name": "Wall of Fire",
              "level": 4,
              "url": "/api/2014/spells/wall-of-fire",
              "usage": {
                "type": "per day",
                "times": 1,
                "rest_types": []
              }
            }
          ]
        },
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "action_options",
        "desc": "The efreeti makes two scimitar attacks or uses its Hurl Flame twice.",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "action",
                "action_name": "Scimitar",
                "count": 2,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Hurl Flame",
                "count": 2,
                "type": "ranged"
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Scimitar",
        "desc": "Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage plus 7 (2d6) fire damage.",
        "attack_bonus": 10,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d6+6"
          },
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "2d6"
          }
        ],
        "actions": []
      },
      {
        "name": "Hurl Flame",
        "desc": "Ranged Spell Attack: +7 to hit, range 120 ft., one target. Hit: 17 (5d6) fire damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "fire",
              "name": "Fire",
              "url": "/api/2014/damage-types/fire"
            },
            "damage_dice": "5d6"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/efreeti.png",
    "url": "/api/2014/monsters/efreeti",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "elephant",
    "name": "Elephant",
    "size": "Huge",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "natural",
        "value": 12
      }
    ],
    "hit_points": 76,
    "hit_dice": "8d12",
    "hit_points_roll": "8d12+24",
    "speed": {
      "walk": "40 ft."
    },
    "strength": 22,
    "dexterity": 9,
    "constitution": 17,
    "intelligence": 3,
    "wisdom": 11,
    "charisma": 6,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "",
    "challenge_rating": 4,
    "proficiency_bonus": 2,
    "xp": 1100,
    "special_abilities": [
      {
        "name": "Trampling Charge",
        "desc": "If the elephant moves at least 20 ft. straight toward a creature and then hits it with a gore attack on the same turn, that target must succeed on a DC 12 Strength saving throw or be knocked prone. If the target is prone, the elephant can make one stomp attack against it as a bonus action.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Gore",
        "desc": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 19 (3d8 + 6) piercing damage.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "3d8+6"
          }
        ],
        "actions": []
      },
      {
        "name": "Stomp",
        "desc": "Melee Weapon Attack: +8 to hit, reach 5 ft., one prone creature. Hit: 22 (3d10 + 6) bludgeoning damage.",
        "attack_bonus": 8,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "3d10+6"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/elephant.png",
    "url": "/api/2014/monsters/elephant",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "elk",
    "name": "Elk",
    "size": "Large",
    "type": "beast",
    "alignment": "unaligned",
    "armor_class": [
      {
        "type": "dex",
        "value": 10
      }
    ],
    "hit_points": 13,
    "hit_dice": "2d10",
    "hit_points_roll": "2d10+2",
    "speed": {
      "walk": "50 ft."
    },
    "strength": 16,
    "dexterity": 10,
    "constitution": 12,
    "intelligence": 2,
    "wisdom": 10,
    "charisma": 6,
    "proficiencies": [],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "passive_perception": 10
    },
    "languages": "",
    "challenge_rating": 0.25,
    "proficiency_bonus": 2,
    "xp": 50,
    "special_abilities": [
      {
        "name": "Charge",
        "desc": "If the elk moves at least 20 ft. straight toward a target and then hits it with a ram attack on the same turn, the target takes an extra 7 (2d6) damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.",
        "damage": []
      }
    ],
    "actions": [
      {
        "name": "Ram",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "1d6+3"
          }
        ],
        "actions": []
      },
      {
        "name": "Hooves",
        "desc": "Melee Weapon Attack: +5 to hit, reach 5 ft., one prone creature. Hit: 8 (2d4 + 3) bludgeoning damage.",
        "attack_bonus": 5,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d4+3"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/elk.png",
    "url": "/api/2014/monsters/elk",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "erinyes",
    "name": "Erinyes",
    "size": "Medium",
    "type": "fiend",
    "subtype": "devil",
    "alignment": "lawful evil",
    "armor_class": [
      {
        "type": "armor",
        "value": 18,
        "armor": [
          {
            "index": "plate-armor",
            "name": "Plate Armor",
            "url": "/api/2014/equipment/plate-armor"
          }
        ]
      }
    ],
    "hit_points": 153,
    "hit_dice": "18d8",
    "hit_points_roll": "18d8+72",
    "speed": {
      "walk": "30 ft.",
      "fly": "60 ft."
    },
    "strength": 18,
    "dexterity": 16,
    "constitution": 18,
    "intelligence": 14,
    "wisdom": 14,
    "charisma": 18,
    "proficiencies": [
      {
        "value": 7,
        "proficiency": {
          "index": "saving-throw-dex",
          "name": "Saving Throw: DEX",
          "url": "/api/2014/proficiencies/saving-throw-dex"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-con",
          "name": "Saving Throw: CON",
          "url": "/api/2014/proficiencies/saving-throw-con"
        }
      },
      {
        "value": 6,
        "proficiency": {
          "index": "saving-throw-wis",
          "name": "Saving Throw: WIS",
          "url": "/api/2014/proficiencies/saving-throw-wis"
        }
      },
      {
        "value": 8,
        "proficiency": {
          "index": "saving-throw-cha",
          "name": "Saving Throw: CHA",
          "url": "/api/2014/proficiencies/saving-throw-cha"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [
      "cold",
      "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
    ],
    "damage_immunities": [
      "fire",
      "poison"
    ],
    "condition_immunities": [
      {
        "index": "poisoned",
        "name": "Poisoned",
        "url": "/api/2014/conditions/poisoned"
      }
    ],
    "senses": {
      "truesight": "120 ft.",
      "passive_perception": 12
    },
    "languages": "Infernal, telepathy 120 ft.",
    "challenge_rating": 12,
    "proficiency_bonus": 4,
    "xp": 8400,
    "special_abilities": [
      {
        "name": "Hellish Weapons",
        "desc": "The erinyes's weapon attacks are magical and deal an extra 13 (3d8) poison damage on a hit (included in the attacks).",
        "damage": []
      },
      {
        "name": "Magic Resistance",
        "desc": "The erinyes has advantage on saving throws against spells and other magical effects.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "action_options",
        "desc": "The erinyes makes three attacks",
        "action_options": {
          "choose": 1,
          "type": "action",
          "from": {
            "option_set_type": "options_array",
            "options": [
              {
                "option_type": "action",
                "action_name": "Longsword",
                "count": 3,
                "type": "melee"
              },
              {
                "option_type": "action",
                "action_name": "Longbow",
                "count": 3,
                "type": "ranged"
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Longsword",
                    "count": 2,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Longbow",
                    "count": 1,
                    "type": "ranged"
                  }
                ]
              },
              {
                "option_type": "multiple",
                "items": [
                  {
                    "option_type": "action",
                    "action_name": "Longsword",
                    "count": 1,
                    "type": "melee"
                  },
                  {
                    "option_type": "action",
                    "action_name": "Longbow",
                    "count": 2,
                    "type": "ranged"
                  }
                ]
              }
            ]
          }
        },
        "actions": []
      },
      {
        "name": "Longsword",
        "desc": "Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands, plus 13 (3d8) poison damage.",
        "attack_bonus": 8,
        "damage": [
          {
            "choose": 1,
            "type": "damage",
            "from": {
              "option_set_type": "options_array",
              "options": [
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                  },
                  "damage_dice": "1d8+4",
                  "notes": "One handed"
                },
                {
                  "option_type": "damage",
                  "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                  },
                  "damage_dice": "1d10+4",
                  "notes": "Two handed"
                }
              ]
            }
          },
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "3d8"
          }
        ],
        "actions": []
      },
      {
        "name": "Longbow",
        "desc": "Ranged Weapon Attack: +7 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 13 (3d8) poison damage, and the target must succeed on a DC 14 Constitution saving throw or be poisoned. The poison lasts until it is removed by the lesser restoration spell or similar magic.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "1d8+3"
          },
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "3d8"
          }
        ],
        "actions": []
      }
    ],
    "reactions": [
      {
        "name": "Parry",
        "desc": "The erinyes adds 4 to its AC against one melee attack that would hit it. To do so, the erinyes must see the attacker and be wielding a melee weapon."
      }
    ],
    "image": "/api/images/monsters/erinyes.png",
    "url": "/api/2014/monsters/erinyes",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": []
  },
  {
    "index": "ettercap",
    "name": "Ettercap",
    "size": "Medium",
    "type": "monstrosity",
    "alignment": "neutral evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 13
      }
    ],
    "hit_points": 44,
    "hit_dice": "8d8",
    "hit_points_roll": "8d8+8",
    "speed": {
      "walk": "30 ft.",
      "climb": "30 ft."
    },
    "strength": 14,
    "dexterity": 15,
    "constitution": 13,
    "intelligence": 7,
    "wisdom": 12,
    "charisma": 8,
    "proficiencies": [
      {
        "value": 3,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      },
      {
        "value": 4,
        "proficiency": {
          "index": "skill-stealth",
          "name": "Skill: Stealth",
          "url": "/api/2014/proficiencies/skill-stealth"
        }
      },
      {
        "value": 3,
        "proficiency": {
          "index": "skill-survival",
          "name": "Skill: Survival",
          "url": "/api/2014/proficiencies/skill-survival"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 13
    },
    "languages": "",
    "challenge_rating": 2,
    "proficiency_bonus": 2,
    "xp": 450,
    "special_abilities": [
      {
        "name": "Spider Climb",
        "desc": "The ettercap can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.",
        "damage": []
      },
      {
        "name": "Web Sense",
        "desc": "While in contact with a web, the ettercap knows the exact location of any other creature in contact with the same web.",
        "damage": []
      },
      {
        "name": "Web Walker",
        "desc": "The ettercap ignores movement restrictions caused by webbing.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The ettercap makes two attacks: one with its bite and one with its claws.",
        "actions": [
          {
            "action_name": "Bite",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Claws",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Bite",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) piercing damage plus 4 (1d8) poison damage. The target must succeed on a DC 11 Constitution saving throw or be poisoned for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d6+2"
          },
          {
            "damage_type": {
              "index": "poison",
              "name": "Poison",
              "url": "/api/2014/damage-types/poison"
            },
            "damage_dice": "1d8"
          }
        ],
        "actions": []
      },
      {
        "name": "Claws",
        "desc": "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage.",
        "attack_bonus": 4,
        "damage": [
          {
            "damage_type": {
              "index": "bludgeoning",
              "name": "Bludgeoning",
              "url": "/api/2014/damage-types/bludgeoning"
            },
            "damage_dice": "2d4+2"
          }
        ],
        "actions": []
      },
      {
        "damage": [],
        "name": "Web",
        "desc": "Ranged Weapon Attack: +4 to hit, range 30/60 ft., one Large or smaller creature. Hit: The creature is restrained by webbing. As an action, the restrained creature can make a DC 11 Strength check, escaping from the webbing on a success. The effect ends if the webbing is destroyed. The webbing has AC 10, 5 hit points, is vulnerable to fire damage and immune to bludgeoning damage.",
        "usage": {
          "type": "recharge on roll",
          "dice": "1d6",
          "min_value": 5
        },
        "attack_bonus": 4,
        "actions": []
      }
    ],
    "image": "/api/images/monsters/ettercap.png",
    "url": "/api/2014/monsters/ettercap",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  },
  {
    "index": "ettin",
    "name": "Ettin",
    "size": "Large",
    "type": "giant",
    "alignment": "chaotic evil",
    "armor_class": [
      {
        "type": "natural",
        "value": 12
      }
    ],
    "hit_points": 85,
    "hit_dice": "10d10",
    "hit_points_roll": "10d10+30",
    "speed": {
      "walk": "40 ft."
    },
    "strength": 21,
    "dexterity": 8,
    "constitution": 17,
    "intelligence": 6,
    "wisdom": 10,
    "charisma": 8,
    "proficiencies": [
      {
        "value": 4,
        "proficiency": {
          "index": "skill-perception",
          "name": "Skill: Perception",
          "url": "/api/2014/proficiencies/skill-perception"
        }
      }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
      "darkvision": "60 ft.",
      "passive_perception": 14
    },
    "languages": "Giant, Orc",
    "challenge_rating": 4,
    "proficiency_bonus": 2,
    "xp": 1100,
    "special_abilities": [
      {
        "name": "Two Heads",
        "desc": "The ettin has advantage on Wisdom (Perception) checks and on saving throws against being blinded, charmed, deafened, frightened, stunned, and knocked unconscious.",
        "damage": []
      },
      {
        "name": "Wakeful",
        "desc": "When one of the ettin's heads is asleep, its other head is awake.",
        "damage": []
      }
    ],
    "actions": [
      {
        "damage": [],
        "name": "Multiattack",
        "multiattack_type": "actions",
        "desc": "The ettin makes two attacks: one with its battleaxe and one with its morningstar.",
        "actions": [
          {
            "action_name": "Battleaxe",
            "count": "1",
            "type": "melee"
          },
          {
            "action_name": "Morningstar",
            "count": "1",
            "type": "melee"
          }
        ]
      },
      {
        "name": "Battleaxe",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "slashing",
              "name": "Slashing",
              "url": "/api/2014/damage-types/slashing"
            },
            "damage_dice": "2d8+5"
          }
        ],
        "actions": []
      },
      {
        "name": "Morningstar",
        "desc": "Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) piercing damage.",
        "attack_bonus": 7,
        "damage": [
          {
            "damage_type": {
              "index": "piercing",
              "name": "Piercing",
              "url": "/api/2014/damage-types/piercing"
            },
            "damage_dice": "2d8+5"
          }
        ],
        "actions": []
      }
    ],
    "image": "/api/images/monsters/ettin.png",
    "url": "/api/2014/monsters/ettin",
    "updated_at": "2026-04-01T20:35:38.254Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
  }
]

export default monsters
