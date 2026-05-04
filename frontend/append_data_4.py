import json
import os

base_path = 'src/data/encyclopedia'

# Spells
spells_file = os.path.join(base_path, 'spells.json')
with open(spells_file, 'r', encoding='utf-8') as f:
    spells = json.load(f)

new_spells = [
    {
        "id": "disintegrate",
        "name": "Desintegrar / Disintegrate",
        "level": 6,
        "school": "Transmutación",
        "casting_time": "1 acción",
        "range": "60 pies",
        "components": "V, S, M",
        "duration": "Instantáneo",
        "desc": ["Inflige daño masivo; si reduce a 0 puntos de golpe, el objetivo se convierte en polvo. Un rayo verde fino sale disparado del dedo apuntando hacia un objetivo que puedas ver dentro del alcance."],
        "damage": "10d6 + 40 fuerza"
    },
    {
        "id": "teleport",
        "name": "Teletransporte / Teleport",
        "level": 7,
        "school": "Conjuración",
        "casting_time": "1 acción",
        "range": "10 pies",
        "components": "V",
        "duration": "Instantáneo",
        "desc": ["Permite viajar instantáneamente a grandes distancias con posibles riesgos según la familiaridad del destino. Puedes llevar contigo un objeto u otra criatura voluntaria."]
    },
    {
        "id": "power-word-kill",
        "name": "Palabra de poder: matar / Power Word Kill",
        "level": 9,
        "school": "Encantamiento",
        "casting_time": "1 acción",
        "range": "60 pies",
        "components": "V",
        "duration": "Instantáneo",
        "desc": ["Hablas una palabra de poder mortal a una criatura que puedas ver dentro del alcance. Mata instantáneamente a una criatura con menos de 100 puntos de golpe actuales. Si tiene 100 puntos de golpe o más, no tiene ningún efecto."]
    },
    {
        "id": "wish",
        "name": "Deseo / Wish",
        "level": 9,
        "school": "Conjuración",
        "casting_time": "1 acción",
        "range": "Personal",
        "components": "V",
        "duration": "Instantáneo",
        "desc": ["El conjuro más poderoso, capaz de replicar otros conjuros de nivel 8 o inferior, o alterar la realidad con efectos impredecibles a discreción del DM."]
    },
    {
        "id": "meteor-swarm",
        "name": "Meteoros / Meteor Swarm",
        "level": 9,
        "school": "Evocación",
        "casting_time": "1 acción",
        "range": "1 milla",
        "components": "V, S",
        "duration": "Instantáneo",
        "desc": ["Invoca múltiples meteoritos que explotan causando daño masivo en un área enorme (4 esferas de 40 pies de radio)."],
        "damage": "20d6 fuego + 20d6 contundente"
    }
]
spells.extend(new_spells)
with open(spells_file, 'w', encoding='utf-8') as f:
    json.dump(spells, f, indent=2, ensure_ascii=False)

# Monsters
monsters_file = os.path.join(base_path, 'monsters.json')
with open(monsters_file, 'r', encoding='utf-8') as f:
    monsters = json.load(f)

new_monsters = [
    {
        "id": "lich",
        "name": "Lich",
        "type": "muerto viviente",
        "size": "Mediano",
        "challenge_rating": "21",
        "armor_class": "17",
        "hit_points": "135",
        "hit_dice": "18d8 + 54",
        "strength": 11,
        "dexterity": 16,
        "constitution": 16,
        "intelligence": 20,
        "wisdom": 14,
        "charisma": 16,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Hechicero inmortal que almacena su alma en un filacterio y lanza conjuros de alto nivel devastadores (incluyendo Palabra de poder matar). Posee gran resistencia mágica y ataques paralizantes."
            }
        ]
    },
    {
        "id": "balor",
        "name": "Balor",
        "type": "infernal (demonio)",
        "size": "Enorme",
        "challenge_rating": "19",
        "armor_class": "19",
        "hit_points": "262",
        "hit_dice": "21d12 + 126",
        "strength": 26,
        "dexterity": 15,
        "constitution": 22,
        "intelligence": 20,
        "wisdom": 16,
        "charisma": 22,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Señor demoníaco envuelto en fuego, armado con látigo y espada, extremadamente peligroso en combate. Explota al morir infligiendo daño masivo."
            }
        ]
    },
    {
        "id": "pit-fiend",
        "name": "Pit Fiend",
        "type": "infernal (diablo)",
        "size": "Enorme",
        "challenge_rating": "20",
        "armor_class": "19",
        "hit_points": "300",
        "hit_dice": "24d12 + 144",
        "strength": 26,
        "dexterity": 14,
        "constitution": 24,
        "intelligence": 22,
        "wisdom": 18,
        "charisma": 24,
        "actions": [
            {
                "name": "Descripción",
                "desc": "General infernal con gran resistencia, poder físico y habilidades mágicas devastadoras. Emite un aura de miedo paralizante."
            }
        ]
    },
    {
        "id": "ancient-red-dragon",
        "name": "Dragón rojo anciano / Ancient Red Dragon",
        "type": "dragón",
        "size": "Gargantuesco",
        "challenge_rating": "24",
        "armor_class": "22",
        "hit_points": "546",
        "hit_dice": "28d20 + 252",
        "strength": 30,
        "dexterity": 10,
        "constitution": 29,
        "intelligence": 18,
        "wisdom": 15,
        "charisma": 23,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Una de las criaturas más poderosas, con aliento de fuego devastador (26d6) y gran inteligencia. Usa su Presencia Pavorosa para aterrar enemigos."
            }
        ]
    },
    {
        "id": "kraken",
        "name": "Kraken",
        "type": "monstruosidad",
        "size": "Gargantuesco",
        "challenge_rating": "23",
        "armor_class": "18",
        "hit_points": "472",
        "hit_dice": "27d20 + 189",
        "strength": 30,
        "dexterity": 11,
        "constitution": 25,
        "intelligence": 22,
        "wisdom": 18,
        "charisma": 20,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Criatura marina titánica capaz de destruir barcos y controlar tormentas. Sus tentáculos pueden apresar y devorar presas enteras, e inflige daño con rayos mágicos."
            }
        ]
    }
]
monsters.extend(new_monsters)
with open(monsters_file, 'w', encoding='utf-8') as f:
    json.dump(monsters, f, indent=2, ensure_ascii=False)

# Equipment
equipment_file = os.path.join(base_path, 'equipment.json')
with open(equipment_file, 'r', encoding='utf-8') as f:
    equipment = json.load(f)

new_equipment = [
    {
        "id": "vorpal-sword",
        "name": "Espada vorpal / Vorpal Sword",
        "category": "magic",
        "equipment_category": { "name": "Magic Weapon" },
        "weight": 3,
        "desc": ["Arma mágica (legendaria, requiere sintonización). En un golpe crítico (20 natural) puede decapitar instantáneamente a criaturas que tengan cabeza, matándolas al instante si no tienen acciones legendarias ni el DM dictamina que son demasiado grandes para ser decapitadas."]
    },
    {
        "id": "rod-of-lordly-might",
        "name": "Vara de poder / Rod of Lordly Might",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 5,
        "desc": ["Vara (legendaria, requiere sintonización). Vara versátil que puede transformarse en distintas armas (espada, maza, lanza), emitir efectos mágicos, funcionar como brújula o ariete, y otorgar múltiples habilidades ofensivas a través de sus botones mágicos."]
    },
    {
        "id": "staff-of-power",
        "name": "Bastón de poder / Staff of Power",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 4,
        "desc": ["Bastón (muy raro, requiere sintonización por hechicero, brujo o mago). Otorga +2 a la CA, tiradas de ataque mágico y salvaciones. Permite gastar cargas para lanzar múltiples conjuros poderosos (Cono de frío, Bola de fuego, Muro de fuerza, etc.). Puede ser quebrado en un Golpe de Retribución mortal."]
    },
    {
        "id": "ring-of-invisibility",
        "name": "Anillo de invisibilidad / Ring of Invisibility",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Anillo (legendario, requiere sintonización). Permite al portador volverse invisible a voluntad (como acción), manteniendo el efecto incluso al moverse. Se rompe la invisibilidad si atacas o lanzas un hechizo."]
    },
    {
        "id": "armor-of-invulnerability",
        "name": "Armadura de invulnerabilidad / Armor of Invulnerability",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 65,
        "desc": ["Armadura de placas (legendaria, requiere sintonización). Otorga resistencia a daño no mágico contundente, perforante y cortante constantemente. Una vez por día, puede activarse durante 10 minutos para ser totalmente invulnerable (inmune) a daño no mágico."]
    }
]
equipment.extend(new_equipment)
with open(equipment_file, 'w', encoding='utf-8') as f:
    json.dump(equipment, f, indent=2, ensure_ascii=False)

# Traits
traits_file = os.path.join(base_path, 'traits.json')
with open(traits_file, 'r', encoding='utf-8') as f:
    traits = json.load(f)

new_traits = [
    {
        "id": "war-caster",
        "name": "Lanzador de conjuros de guerra / War Caster",
        "category": "feats",
        "desc": ["Prerrequisito: Capacidad de lanzar al menos un conjuro. Otorga ventaja en salvaciones de Constitución para mantener concentración en conjuros. Permite realizar los componentes somáticos de los conjuros incluso si tienes armas o escudo en tus manos. Cuando el movimiento de una criatura hostil provoque que le hagas un ataque de oportunidad, puedes usar tu reacción para lanzarle un conjuro (que le apunte solo a ella) en lugar de un ataque de arma."]
    },
    {
        "id": "spell-sniper",
        "name": "Francotirador de conjuros / Spell Sniper",
        "category": "feats",
        "desc": ["Prerrequisito: Capacidad de lanzar al menos un conjuro. Duplica el alcance de tus conjuros que requieran tirada de ataque. Tus ataques de conjuro a distancia ignoran la cobertura media y tres cuartos. Aprendes un truco que requiera una tirada de ataque."]
    },
    {
        "id": "polearm-master",
        "name": "Maestro de armas de asta / Polearm Master",
        "category": "feats",
        "desc": ["Cuando tomas la acción de Ataque y atacas usando solo una guja, alabarda, bastón o lanza, puedes usar una acción adicional para dar un golpe cuerpo a cuerpo con el mango del arma (1d4 daño contundente). Mientras empuñes esas armas, las criaturas provocan ataques de oportunidad cuando ENTRAN en tu alcance."]
    },
    {
        "id": "shield-master",
        "name": "Experto en escudos / Shield Master",
        "category": "feats",
        "desc": ["Si atacas, puedes usar acción adicional para intentar empujar una criatura 5 pies con el escudo. Si no estás incapacitado, puedes sumar la CA de tu escudo a salvaciones de Destreza de hechizos que solo te afecten a ti. Además, si debes hacer una salvación de DES para recibir mitad de daño, puedes usar tu reacción para recibir cero daño si tienes éxito."]
    },
    {
        "id": "magic-initiate",
        "name": "Iniciado en magia / Magic Initiate",
        "category": "feats",
        "desc": ["Elige una clase (Bardo, Clérigo, Druida, Hechicero, Mago o Brujo). Aprendes dos trucos de esa clase. Además aprendes un conjuro de nivel 1 de esa clase y puedes lanzarlo a su nivel más bajo una vez hasta completar un descanso largo."]
    }
]
traits.extend(new_traits)
with open(traits_file, 'w', encoding='utf-8') as f:
    json.dump(traits, f, indent=2, ensure_ascii=False)

print("Data appended successfully!")
