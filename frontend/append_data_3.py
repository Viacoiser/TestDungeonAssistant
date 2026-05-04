import json
import os

base_path = 'src/data/encyclopedia'

# Spells
spells_file = os.path.join(base_path, 'spells.json')
with open(spells_file, 'r', encoding='utf-8') as f:
    spells = json.load(f)

new_spells = [
    {
        "id": "ray-of-frost",
        "name": "Rayo de escarcha / Ray of Frost",
        "level": 0,
        "school": "Evocación",
        "casting_time": "1 acción",
        "range": "60 pies",
        "components": "V, S",
        "duration": "Instantáneo",
        "desc": ["Inflige daño de frío y reduce la velocidad del objetivo en 10 pies hasta el inicio de tu próximo turno."],
        "damage": "1d8 frío"
    },
    {
        "id": "sleep",
        "name": "Dormir / Sleep",
        "level": 1,
        "school": "Encantamiento",
        "casting_time": "1 acción",
        "range": "90 pies",
        "components": "V, S, M",
        "duration": "1 minuto",
        "desc": ["Hace que criaturas en un área caigan inconscientes comenzando por las de menor cantidad de puntos de golpe actuales. Afecta a 5d8 puntos de golpe en total."]
    },
    {
        "id": "mirror-image",
        "name": "Imagen espejo / Mirror Image",
        "level": 2,
        "school": "Ilusión",
        "casting_time": "1 acción",
        "range": "Personal",
        "components": "V, S",
        "duration": "1 minuto",
        "desc": ["Crea tres duplicados ilusorios que dificultan que los ataques impacten al lanzador. Los atacantes deben tirar un d20 para ver si apuntan a un duplicado o a ti."]
    },
    {
        "id": "lightning-bolt",
        "name": "Relámpago / Lightning Bolt",
        "level": 3,
        "school": "Evocación",
        "casting_time": "1 acción",
        "range": "Personal (línea de 100 pies)",
        "components": "V, S, M",
        "duration": "Instantáneo",
        "desc": ["Lanza un rayo en línea de 100 pies de largo y 5 pies de ancho que inflige gran daño eléctrico a las criaturas en su trayectoria. Requiere salvación de Destreza (mitad de daño si tiene éxito)."],
        "damage": "8d6 relámpago"
    },
    {
        "id": "dimension-door",
        "name": "Puerta dimensional / Dimension Door",
        "level": 4,
        "school": "Conjuración",
        "casting_time": "1 acción",
        "range": "500 pies",
        "components": "V",
        "duration": "Instantáneo",
        "desc": ["Teletransporta al lanzador y a un acompañante de tamaño similar a gran distancia dentro del alcance (hasta 500 pies)."]
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
        "id": "hobgoblin",
        "name": "Hobgoblin",
        "type": "humanoide",
        "size": "Mediano",
        "challenge_rating": "1/2",
        "armor_class": "18",
        "hit_points": "11",
        "hit_dice": "2d8 + 2",
        "strength": 13,
        "dexterity": 12,
        "constitution": 12,
        "intelligence": 10,
        "wisdom": 10,
        "charisma": 9,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Guerrero disciplinado que combate mejor cuando tiene aliados cerca (Martial Advantage: +2d6 de daño si un aliado no incapacitado está a 5 pies del objetivo)."
            }
        ]
    },
    {
        "id": "troll",
        "name": "Trol / Troll",
        "type": "gigante",
        "size": "Grande",
        "challenge_rating": "5",
        "armor_class": "15",
        "hit_points": "84",
        "hit_dice": "8d10 + 40",
        "strength": 18,
        "dexterity": 13,
        "constitution": 20,
        "intelligence": 7,
        "wisdom": 9,
        "charisma": 7,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Se regenera rápidamente (10 pg por turno) salvo que reciba daño de fuego o ácido. Sus ataques de garras y mordisco son mortales."
            }
        ]
    },
    {
        "id": "manticore",
        "name": "Mantícora / Manticore",
        "type": "monstruosidad",
        "size": "Grande",
        "challenge_rating": "3",
        "armor_class": "14",
        "hit_points": "68",
        "hit_dice": "8d10 + 24",
        "strength": 17,
        "dexterity": 16,
        "constitution": 17,
        "intelligence": 7,
        "wisdom": 12,
        "charisma": 8,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Criatura voladora con cola que dispara púas a distancia. Puede hacer tres ataques (un mordisco y dos garras, o tres púas en la cola)."
            }
        ]
    },
    {
        "id": "owlbear",
        "name": "Oso lechuza / Owlbear",
        "type": "monstruosidad",
        "size": "Grande",
        "challenge_rating": "3",
        "armor_class": "13",
        "hit_points": "59",
        "hit_dice": "7d10 + 21",
        "strength": 20,
        "dexterity": 12,
        "constitution": 17,
        "intelligence": 3,
        "wisdom": 12,
        "charisma": 7,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Depredador salvaje que combina rasgos de oso y búho, extremadamente agresivo. Posee gran percepción de vista y olfato."
            }
        ]
    },
    {
        "id": "young-red-dragon",
        "name": "Dragón rojo joven / Young Red Dragon",
        "type": "dragón",
        "size": "Grande",
        "challenge_rating": "10",
        "armor_class": "18",
        "hit_points": "178",
        "hit_dice": "17d10 + 85",
        "strength": 23,
        "dexterity": 10,
        "constitution": 21,
        "intelligence": 14,
        "wisdom": 11,
        "charisma": 19,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Criatura poderosa con aliento de fuego (16d6 daño) en cono de 30 pies y gran capacidad destructiva con ataques múltiples."
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
        "id": "ball-bearings",
        "name": "Bolsa de rodamientos",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 1, "unit": "gp" },
        "weight": 2,
        "desc": ["Se esparcen en el suelo para cubrir un área de 10 pies cuadrados. Las criaturas que se muevan por ella a más de la mitad de su velocidad deben tener éxito en una salvación de Destreza o caer tumbadas (Prone)."]
    },
    {
        "id": "portable-ram",
        "name": "Ariete portátil",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 4, "unit": "gp" },
        "weight": 35,
        "desc": ["Otorga bonificaciones a pruebas de Fuerza (+4 a la tirada) para derribar puertas. Otorga ventaja si alguien te ayuda a usarlo."]
    },
    {
        "id": "holy-water",
        "name": "Agua bendita",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 25, "unit": "gp" },
        "weight": 1,
        "desc": ["Causa 2d6 de daño radiante a muertos vivientes e infernales (fiends) al impactar. Puede salpicar si se arroja."]
    },
    {
        "id": "ring-of-protection",
        "name": "Anillo de protección / Ring of Protection",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Anillo (raro, requiere sintonización). Otorga +1 a la CA (Clase de Armadura) y un bonificador de +1 a todas las tiradas de salvación mientras se lleva puesto."]
    },
    {
        "id": "cloak-of-protection",
        "name": "Capa de protección / Cloak of Protection",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Objeto maravilloso (incomún, requiere sintonización). Proporciona un bono de +1 a la CA y un bonificador de +1 a todas las tiradas de salvación mientras se viste."]
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
        "id": "resilient",
        "name": "Resistente / Resilient",
        "category": "feats",
        "desc": ["Elige una característica. Aumentas esa característica en +1 (hasta un máximo de 20) y obtienes competencia en las tiradas de salvación que usen esa característica."]
    },
    {
        "id": "tough",
        "name": "Duro / Tough",
        "category": "feats",
        "desc": ["Tus puntos de golpe máximos aumentan en una cantidad igual al doble de tu nivel cuando obtienes esta dote. Cada vez que subas de nivel, tu máximo aumenta en 2 adicionales."]
    },
    {
        "id": "observant",
        "name": "Observador / Observant",
        "category": "feats",
        "desc": ["Aumenta tu puntuación de Inteligencia o Sabiduría en 1 (máximo 20). Si puedes ver la boca de una criatura mientras habla un idioma que entiendes, puedes leer sus labios. Tienes un bonificador de +5 a tu Percepción (Sabiduría) e Investigación (Inteligencia) pasivas."]
    },
    {
        "id": "actor",
        "name": "Actor / Actor",
        "category": "feats",
        "desc": ["Aumenta tu Carisma en 1 (máx 20). Tienes ventaja en Engaño y en Interpretación al tratar de hacerte pasar por otra persona. Puedes imitar el habla de otra persona o el sonido de una criatura tras escucharlo 1 minuto."]
    },
    {
        "id": "martial-adept",
        "name": "Adepto marcial / Martial Adept",
        "category": "feats",
        "desc": ["Aprendes dos maniobras a tu elección de la lista del arquetipo Maestro de Batalla del guerrero. Obtienes un dado de superioridad (un d6) que usas para realizar las maniobras. Recuperas el dado tras un descanso corto o largo."]
    }
]
traits.extend(new_traits)
with open(traits_file, 'w', encoding='utf-8') as f:
    json.dump(traits, f, indent=2, ensure_ascii=False)

print("Data appended successfully!")
