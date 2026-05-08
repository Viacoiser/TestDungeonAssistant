import json
import os

base_path = 'src/data/encyclopedia'

# Spells
spells_file = os.path.join(base_path, 'spells.json')
with open(spells_file, 'r', encoding='utf-8') as f:
    spells = json.load(f)

new_spells = [
    {
        "id": "detect-magic",
        "name": "Detectar magia / Detect Magic",
        "level": 1,
        "school": "Adivinación",
        "casting_time": "1 acción",
        "range": "Personal",
        "components": "V, S",
        "duration": "Concentración, hasta 10 min",
        "desc": ["Permite percibir la presencia de magia cercana durante un tiempo."]
    },
    {
        "id": "misty-step",
        "name": "Paso brumoso / Misty Step",
        "level": 2,
        "school": "Conjuración",
        "casting_time": "1 acción adicional",
        "range": "Personal",
        "components": "V",
        "duration": "Instantáneo",
        "desc": ["Teletransporta al lanzador hasta 30 pies a un espacio desocupado que pueda ver."]
    },
    {
        "id": "web",
        "name": "Telaraña / Web",
        "level": 2,
        "school": "Conjuración",
        "casting_time": "1 acción",
        "range": "60 pies",
        "components": "V, S, M",
        "duration": "Concentración, hasta 1 hora",
        "desc": ["Crea un área de telarañas que puede restringir a las criaturas y generar terreno difícil."]
    },
    {
        "id": "counterspell",
        "name": "Contrahechizo / Counterspell",
        "level": 3,
        "school": "Abjuración",
        "casting_time": "1 reacción",
        "range": "60 pies",
        "components": "S",
        "duration": "Instantáneo",
        "desc": ["Interrumpe el lanzamiento de un conjuro enemigo como reacción. Éxito automático contra conjuros de nivel 3 o inferior."]
    },
    {
        "id": "fly",
        "name": "Volar / Fly",
        "level": 3,
        "school": "Transmutación",
        "casting_time": "1 acción",
        "range": "Toque",
        "components": "V, S, M",
        "duration": "Concentración, hasta 10 min",
        "desc": ["Otorga velocidad de vuelo (60 pies) a una criatura durante la duración del conjuro."]
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
        "id": "kobold",
        "name": "Kobold",
        "type": "humanoide",
        "size": "Pequeño",
        "challenge_rating": "1/8",
        "armor_class": "12",
        "hit_points": "5",
        "hit_dice": "2d6 - 2",
        "strength": 7,
        "dexterity": 15,
        "constitution": 9,
        "intelligence": 8,
        "wisdom": 7,
        "charisma": 8,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Criaturas débiles pero peligrosas en grupo gracias a sus tácticas de manada (Pact Tactics)."
            }
        ]
    },
    {
        "id": "bugbear",
        "name": "Bugbear",
        "type": "humanoide",
        "size": "Mediano",
        "challenge_rating": "1",
        "armor_class": "16",
        "hit_points": "27",
        "hit_dice": "5d8 + 5",
        "strength": 15,
        "dexterity": 14,
        "constitution": 13,
        "intelligence": 8,
        "wisdom": 11,
        "charisma": 9,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Emboscador fuerte que inflige gran daño en ataques sorpresa (Surprise Attack: extra 2d6 daño)."
            }
        ]
    },
    {
        "id": "ghoul",
        "name": "Ghoul",
        "type": "muerto viviente",
        "size": "Mediano",
        "challenge_rating": "1",
        "armor_class": "12",
        "hit_points": "22",
        "hit_dice": "5d8",
        "strength": 13,
        "dexterity": 15,
        "constitution": 10,
        "intelligence": 7,
        "wisdom": 10,
        "charisma": 6,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Ataca con garras paralizantes (salvación de CON o paralizado) y se alimenta de carne humanoide."
            }
        ]
    },
    {
        "id": "ogre",
        "name": "Ogro / Ogre",
        "type": "gigante",
        "size": "Grande",
        "challenge_rating": "2",
        "armor_class": "11",
        "hit_points": "59",
        "hit_dice": "7d10 + 21",
        "strength": 19,
        "dexterity": 8,
        "constitution": 16,
        "intelligence": 5,
        "wisdom": 7,
        "charisma": 7,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Brutal y simple, usa fuerza pura con su enorme garrote. Gran cantidad de vida para su nivel de desafío."
            }
        ]
    },
    {
        "id": "gelatinous-cube",
        "name": "Cubo gelatinoso / Gelatinous Cube",
        "type": "cieno",
        "size": "Grande",
        "challenge_rating": "2",
        "armor_class": "6",
        "hit_points": "84",
        "hit_dice": "8d10 + 40",
        "strength": 14,
        "dexterity": 3,
        "constitution": 20,
        "intelligence": 1,
        "wisdom": 6,
        "charisma": 1,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Se desplaza lentamente absorbiendo criaturas y disolviéndolas con ácido. Es transparente y difícil de percibir (Transparent)."
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
        "id": "antitoxin",
        "name": "Antitoxina",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 50, "unit": "gp" },
        "weight": 0,
        "desc": ["Otorga ventaja en tiradas de salvación contra veneno durante 1 hora."]
    },
    {
        "id": "caltrops",
        "name": "Abrojos",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 1, "unit": "gp" },
        "weight": 2,
        "desc": ["Se esparcen en el suelo para cubrir un área de 5 pies cuadrados. Cualquier criatura que entre en el área debe superar una salvación de Destreza o detenerse y sufrir 1 punto de daño penetrante, reduciendo su velocidad en 10 pies hasta recuperar vida."]
    },
    {
        "id": "crowbar",
        "name": "Palanqueta",
        "category": "tools",
        "equipment_category": { "name": "Tools" },
        "cost": { "quantity": 2, "unit": "gp" },
        "weight": 5,
        "desc": ["Otorga ventaja en pruebas de Fuerza para forzar o abrir objetos cuando se usa como palanca."]
    },
    {
        "id": "boots-of-elvenkind",
        "name": "Botas élficas / Boots of Elvenkind",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Objeto maravilloso (incomún). Permiten moverse sin hacer ruido y otorgan ventaja en pruebas de Sigilo relacionadas con el movimiento."]
    },
    {
        "id": "wand-of-magic-missiles",
        "name": "Vara de proyectiles mágicos / Wand of Magic Missiles",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 1,
        "desc": ["Varita (incomún). Contiene 7 cargas que permiten lanzar el conjuro Proyectil mágico sin gastar espacios de conjuro. Recupera 1d6 + 1 cargas expandidas al amanecer."]
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
        "id": "defensive-duelist",
        "name": "Duelista defensivo / Defensive Duelist",
        "category": "feats",
        "desc": ["Si el personaje empuña un arma sutil con la que es competente, puede usar su reacción para sumar su bonificador de competencia a su CA contra un ataque cuerpo a cuerpo, lo que potencialmente puede causar que el ataque falle."]
    },
    {
        "id": "inspiring-leader",
        "name": "Líder inspirador / Inspiring Leader",
        "category": "feats",
        "desc": ["Prerrequisito: Carisma 13 o superior. Tras dar un discurso motivador (10 minutos), puedes otorgar puntos de golpe temporales a hasta 6 criaturas aliadas (incluyéndote) iguales a tu nivel + tu modificador de Carisma."]
    },
    {
        "id": "elemental-adept",
        "name": "Adepto elemental / Elemental Adept",
        "category": "feats",
        "desc": ["Prerrequisito: Capacidad para lanzar al menos un conjuro. Elige un tipo de daño elemental (ácido, frío, fuego, rayo, trueno). Los conjuros que lances ignoran las resistencias a ese tipo de daño y cualquier resultado de 1 en los dados de daño de ese tipo se tratan como 2."]
    },
    {
        "id": "sentinel",
        "name": "Centinela / Sentinel",
        "category": "feats",
        "desc": ["Cuando aciertas un ataque de oportunidad, la velocidad de la criatura se reduce a 0 por el resto del turno. Las criaturas provocan ataques de oportunidad incluso si se destraban (Disengage). Cuando una criatura cercana ataca a un objetivo que no seas tú, puedes usar tu reacción para hacer un ataque cuerpo a cuerpo contra ella."]
    },
    {
        "id": "crossbow-expert",
        "name": "Experto en ballestas / Crossbow Expert",
        "category": "feats",
        "desc": ["Ignoras la propiedad de carga de las ballestas. Estar a 5 pies de un enemigo no te impone desventaja en las tiradas de ataque a distancia. Cuando atacas con un arma a una mano, puedes usar una acción adicional para atacar con una ballesta de mano que estés empuñando."]
    }
]
traits.extend(new_traits)
with open(traits_file, 'w', encoding='utf-8') as f:
    json.dump(traits, f, indent=2, ensure_ascii=False)

print("Data appended successfully!")
