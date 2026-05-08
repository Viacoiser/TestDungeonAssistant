import json
import os

base_path = 'src/data/encyclopedia'

# Spells
spells_file = os.path.join(base_path, 'spells.json')
with open(spells_file, 'r', encoding='utf-8') as f:
    spells = json.load(f)

new_spells = [
    {
        "id": "pass-without-trace",
        "name": "Pasar sin dejar rastro / Pass without Trace",
        "level": 2,
        "school": "Abjuración",
        "casting_time": "1 acción",
        "range": "Personal",
        "components": "V, S, M",
        "duration": "Concentración, hasta 1 hora",
        "desc": ["Otorga un bonificador de +10 a las pruebas de Sigilo (Destreza) a ti y a tus compañeros a 30 pies. Además, no pueden ser rastreados por medios no mágicos ni dejan rastros."]
    },
    {
        "id": "greater-invisibility",
        "name": "Invisibilidad mayor / Greater Invisibility",
        "level": 4,
        "school": "Ilusión",
        "casting_time": "1 acción",
        "range": "Toque",
        "components": "V, S",
        "duration": "Concentración, hasta 1 min",
        "desc": ["Vuelve a la criatura tocada invisible. A diferencia de Invisibilidad normal, este conjuro no termina si el objetivo ataca o lanza un conjuro."]
    },
    {
        "id": "wall-of-stone",
        "name": "Muro de piedra / Wall of Stone",
        "level": 5,
        "school": "Evocación",
        "casting_time": "1 acción",
        "range": "120 pies",
        "components": "V, S, M",
        "duration": "Concentración, hasta 10 min",
        "desc": ["Crea un muro sólido de piedra de hasta 6 pulgadas de grosor. Si mantienes la concentración durante toda la duración, el muro se vuelve permanente."]
    },
    {
        "id": "telekinesis",
        "name": "Telequinesis / Telekinesis",
        "level": 5,
        "school": "Transmutación",
        "casting_time": "1 acción",
        "range": "60 pies",
        "components": "V, S",
        "duration": "Concentración, hasta 10 min",
        "desc": ["Puedes mover objetos (hasta 1,000 libras) o criaturas con la mente. En tu turno, puedes moverlos hasta 30 pies en cualquier dirección."]
    },
    {
        "id": "sunbeam",
        "name": "Rayo solar / Sunbeam",
        "level": 6,
        "school": "Evocación",
        "casting_time": "1 acción",
        "range": "Personal (línea de 60 pies)",
        "components": "V, S, M",
        "duration": "Concentración, hasta 1 min",
        "desc": ["Emite un rayo de luz radiante en una línea de 60 pies. Ciega e inflige daño a las criaturas. Puedes crear un nuevo rayo en cada turno como acción."],
        "damage": "6d8 radiante"
    },
    {
        "id": "mass-invisibility",
        "name": "Invisibilidad en masa / Mass Invisibility",
        "level": 7,
        "school": "Ilusión",
        "casting_time": "1 acción",
        "range": "120 pies",
        "components": "V, S",
        "duration": "Concentración, hasta 1 hora",
        "desc": ["(Homebrew o variable). Vuelve invisibles a múltiples criaturas dentro del alcance. Termina en cada objetivo si este ataca o lanza un conjuro."]
    },
    {
        "id": "astral-projection",
        "name": "Proyección astral / Astral Projection",
        "level": 9,
        "school": "Nigromancia",
        "casting_time": "1 hora",
        "range": "10 pies",
        "components": "V, S, M",
        "duration": "Especial",
        "desc": ["Tú y hasta 8 voluntarios dejan sus cuerpos físicos suspendidos y proyectan sus cuerpos astrales al Plano Astral."]
    },
    {
        "id": "gate",
        "name": "Portal / Gate",
        "level": 9,
        "school": "Conjuración",
        "casting_time": "1 acción",
        "range": "60 pies",
        "components": "V, S, M",
        "duration": "Concentración, hasta 1 min",
        "desc": ["Abre un portal que conecta con un lugar preciso en un plano de existencia diferente. Puedes también llamar a una entidad específica para que cruce el portal."]
    },
    {
        "id": "mass-heal",
        "name": "Curación en masa / Mass Heal",
        "level": 9,
        "school": "Evocación",
        "casting_time": "1 acción",
        "range": "60 pies",
        "components": "V, S",
        "duration": "Instantáneo",
        "desc": ["Fluye energía curativa pura distribuyendo hasta 700 puntos de golpe para curar criaturas que puedas ver a tu alrededor. Cura ceguera, sordera y cualquier enfermedad."]
    },
    {
        "id": "horrid-wilting",
        "name": "Horrendo marchitamiento / Horrid Wilting",
        "level": 8,
        "school": "Nigromancia",
        "casting_time": "1 acción",
        "range": "150 pies",
        "components": "V, S, M",
        "duration": "Instantáneo",
        "desc": ["Extrae la humedad vital de toda criatura en un cubo de 30 pies. Las criaturas tipo planta y los elementales de agua tienen desventaja."],
        "damage": "12d8 necrótico"
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
        "id": "doppelganger",
        "name": "Doppelganger",
        "type": "monstruosidad",
        "size": "Mediano",
        "challenge_rating": "3",
        "armor_class": "14",
        "hit_points": "52",
        "hit_dice": "8d8 + 16",
        "strength": 11,
        "dexterity": 18,
        "constitution": 14,
        "intelligence": 11,
        "wisdom": 12,
        "charisma": 14,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Cambiaformas letal. Puede imitar la apariencia de humanoides y leer mentes superficiales, atacando con sorpresa para daño masivo extra."
            }
        ]
    },
    {
        "id": "iron-golem",
        "name": "Golem de hierro / Iron Golem",
        "type": "constructo",
        "size": "Grande",
        "challenge_rating": "16",
        "armor_class": "20",
        "hit_points": "210",
        "hit_dice": "20d10 + 100",
        "strength": 24,
        "dexterity": 9,
        "constitution": 20,
        "intelligence": 3,
        "wisdom": 11,
        "charisma": 1,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Constructo extremadamente duro. Inmune a casi toda la magia, sus ataques son contundentes mortales y tiene un Aliento Venenoso potente."
            }
        ]
    },
    {
        "id": "stone-golem",
        "name": "Golem de piedra / Stone Golem",
        "type": "constructo",
        "size": "Grande",
        "challenge_rating": "10",
        "armor_class": "17",
        "hit_points": "178",
        "hit_dice": "17d10 + 85",
        "strength": 22,
        "dexterity": 9,
        "constitution": 20,
        "intelligence": 3,
        "wisdom": 11,
        "charisma": 1,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Estatua animada de roca. Golpea con fuerza masiva e incorpora un Mirada Desaceleradora que reduce la velocidad y prohíbe acciones múltiples."
            }
        ]
    },
    {
        "id": "gorgon",
        "name": "Gorgon",
        "type": "monstruosidad",
        "size": "Grande",
        "challenge_rating": "5",
        "armor_class": "19",
        "hit_points": "114",
        "hit_dice": "12d10 + 48",
        "strength": 20,
        "dexterity": 11,
        "constitution": 18,
        "intelligence": 2,
        "wisdom": 12,
        "charisma": 7,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Toro acorazado cubierto de placas de acero. Su ataque de carga atropella y derriba, y su aliento tóxico petrifica a sus víctimas permanentemente."
            }
        ]
    },
    {
        "id": "minotaur",
        "name": "Minotauro",
        "type": "monstruosidad",
        "size": "Grande",
        "challenge_rating": "3",
        "armor_class": "14",
        "hit_points": "76",
        "hit_dice": "9d10 + 27",
        "strength": 18,
        "dexterity": 11,
        "constitution": 16,
        "intelligence": 6,
        "wisdom": 16,
        "charisma": 9,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Humanoide con cabeza de toro. Agresivo, experto en laberintos (Recall), ataca embistiendo con sus cuernos causando daño masivo al cargar."
            }
        ]
    },
    {
        "id": "guardian-naga",
        "name": "Naga guardiana / Guardian Naga",
        "type": "monstruosidad",
        "size": "Grande",
        "challenge_rating": "10",
        "armor_class": "15",
        "hit_points": "122",
        "hit_dice": "15d10 + 40",
        "strength": 19,
        "dexterity": 18,
        "constitution": 16,
        "intelligence": 16,
        "wisdom": 19,
        "charisma": 18,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Serpiente con rostro divino. Posee un fuerte mordisco venenoso y la habilidad de lanzar hechizos divinos poderosos, además es inmortal."
            }
        ]
    },
    {
        "id": "salamander",
        "name": "Salamandra",
        "type": "elemental",
        "size": "Grande",
        "challenge_rating": "5",
        "armor_class": "15",
        "hit_points": "90",
        "hit_dice": "12d10 + 24",
        "strength": 18,
        "dexterity": 14,
        "constitution": 15,
        "intelligence": 11,
        "wisdom": 10,
        "charisma": 12,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Ser ígneo reptiliano que calienta armas pasivamente. Cualquiera que lo toque o golpee cuerpo a cuerpo sufre daño de fuego."
            }
        ]
    },
    {
        "id": "shadow",
        "name": "Sombra / Shadow",
        "type": "no muerto",
        "size": "Mediano",
        "challenge_rating": "1/2",
        "armor_class": "12",
        "hit_points": "16",
        "hit_dice": "3d8 + 3",
        "strength": 6,
        "dexterity": 14,
        "constitution": 13,
        "intelligence": 6,
        "wisdom": 10,
        "charisma": 8,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Esencia oscura no muerta. Su ataque 'Drenar Fuerza' reduce permanentemente la Fuerza de la víctima, matándola al instante si llega a 0."
            }
        ]
    },
    {
        "id": "wraith",
        "name": "Wraith / Espectro",
        "type": "no muerto",
        "size": "Mediano",
        "challenge_rating": "5",
        "armor_class": "13",
        "hit_points": "67",
        "hit_dice": "9d8 + 27",
        "strength": 6,
        "dexterity": 16,
        "constitution": 16,
        "intelligence": 12,
        "wisdom": 14,
        "charisma": 15,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Espíritu incorpóreo de odio absoluto. Su toque drena vida máxima. Puede crear espectros controlando los espíritus de humanoides que asesina."
            }
        ]
    },
    {
        "id": "wyvern",
        "name": "Wyvern",
        "type": "dragón",
        "size": "Grande",
        "challenge_rating": "6",
        "armor_class": "13",
        "hit_points": "110",
        "hit_dice": "13d10 + 39",
        "strength": 19,
        "dexterity": 10,
        "constitution": 16,
        "intelligence": 5,
        "wisdom": 12,
        "charisma": 6,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Pariente de los dragones sin patas delanteras ni aliento de fuego. Ataca con su aguijón de cola que inyecta un veneno letal masivo."
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
        "id": "lamp",
        "name": "Lámpara de aceite",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 5, "unit": "sp" },
        "weight": 1,
        "desc": ["Fuente de luz direccional y reutilizable que consume aceite. Emite luz brillante en 15 pies y luz tenue 30 pies más allá."]
    },
    {
        "id": "oil-flask",
        "name": "Aceite (frasco)",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 1, "unit": "sp" },
        "weight": 1,
        "desc": ["Puede usarse para alimentar lámparas (6 horas por pinta) o arrojarse como combustible inflamable que causa daño extra de fuego al encenderse."]
    },
    {
        "id": "hammer",
        "name": "Martillo",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 1, "unit": "gp" },
        "weight": 3,
        "desc": ["Herramienta útil. A menudo se usa junto con pitones de hierro para escalar o clavar cuñas."]
    },
    {
        "id": "pitons",
        "name": "Pitones",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 5, "unit": "cp" },
        "weight": 0.25,
        "desc": ["Clavos metálicos gruesos con un ojo u orificio, usados clavados en roca o grietas para fijar cuerdas y facilitar la escalada."]
    },
    {
        "id": "bucket",
        "name": "Cubo",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 5, "unit": "cp" },
        "weight": 2,
        "desc": ["Contenedor de madera o hierro. Puede albergar hasta 3 galones de líquido o media pulgada cúbica de sólidos pequeños."]
    },
    {
        "id": "animated-shield",
        "name": "Escudo animado / Animated Shield",
        "category": "magic",
        "equipment_category": { "name": "Magic Armor" },
        "weight": 6,
        "desc": ["Escudo mágico (muy raro, requiere sintonización). Con una palabra de mando, flota a tu alrededor protegiéndote y otorgando su bono de CA sin usar tus manos (1 minuto)."]
    },
    {
        "id": "dancing-sword",
        "name": "Espada danzante / Dancing Sword",
        "category": "magic",
        "equipment_category": { "name": "Magic Weapon" },
        "weight": 3,
        "desc": ["Arma mágica (muy rara). Como acción adicional la lanzas al aire. Vuela hasta 30 pies atacando a una criatura independientemente en cada uno de tus turnos durante 4 turnos."]
    },
    {
        "id": "wand-of-magic-detection",
        "name": "Vara de detección / Wand of Detection",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 1,
        "desc": ["Varita (incomún). Contiene cargas que puedes usar para lanzar conjuros de Detectar Magia de forma inmediata sin gastar espacios."]
    },
    {
        "id": "ioun-stone",
        "name": "Piedra Ioun / Ioun Stone",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Objeto maravilloso (rareza varía, requiere sintonización). Cristal que orbita alrededor de tu cabeza otorgando bonificaciones pasivas, como protección (+1 CA), o características aumentadas."]
    },
    {
        "id": "boots-of-levitation",
        "name": "Botas de levitación / Boots of Levitation",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Objeto maravilloso (raro, requiere sintonización). Al llevarlas puestas, puedes usar el conjuro de Levitar a voluntad (solo sobre ti mismo) sin gastar componentes."]
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
        "id": "lightly-armored",
        "name": "Adepto en armas ligeras / Lightly Armored",
        "category": "feats",
        "desc": ["Otorga competencia con armaduras ligeras. Aumenta tu puntuación de Fuerza o Destreza en 1 (hasta un máximo de 20)."]
    },
    {
        "id": "moderately-armored",
        "name": "Moderadamente blindado / Moderately Armored",
        "category": "feats",
        "desc": ["Prerrequisito: Competencia con armadura ligera. Obtienes competencia con armaduras medias y escudos. Aumenta tu Fuerza o Destreza en +1."]
    },
    {
        "id": "heavily-armored",
        "name": "Fuertemente blindado / Heavily Armored",
        "category": "feats",
        "desc": ["Prerrequisito: Competencia con armadura media. Obtienes competencia con armaduras pesadas. Aumenta tu puntuación de Fuerza en +1."]
    },
    {
        "id": "light-armor-master",
        "name": "Adepto en armaduras ligeras / Light Armor Master",
        "category": "features",
        "desc": ["Mejora el uso de armaduras ligeras. Si te atacan y llevas armadura ligera, puedes usar tu reacción para añadir 1d4 a tu CA en ese ataque (movilidad defensiva)."]
    },
    {
        "id": "alert-mind",
        "name": "Experto en percepciones / Alert Mind",
        "category": "features",
        "desc": ["Inmunidad natural a ser sorprendido. Tienes un +5 en tiradas de iniciativa pasiva y activa, mejorando tu capacidad de reaccionar rápidamente a emboscadas."]
    },
    {
        "id": "tactical-fighter",
        "name": "Maestro de combate táctico / Tactical Fighter",
        "category": "features",
        "desc": ["Una vez por turno, tras impactar con un ataque cuerpo a cuerpo, puedes desplazarte 5 pies sin provocar ataques de oportunidad."]
    },
    {
        "id": "enduring",
        "name": "Adepto en resistencia / Enduring",
        "category": "features",
        "desc": ["Tienes una resistencia corporal inigualable. Cada descanso corto reduce tu nivel de fatiga/agotamiento en 1, y tienes ventaja en salvaciones de Constitución."]
    },
    {
        "id": "improvised-weapon-master",
        "name": "Adepto en armas improvisadas / Improvised Weapon Master",
        "category": "features",
        "desc": ["Tus ataques con armas improvisadas usan 1d6 de base (o el del objeto si es mayor). Eres competente con cualquier cosa que arrojes o golpees que no sea un arma diseñada."]
    },
    {
        "id": "focused-caster",
        "name": "Adepto en concentración / Focused Caster",
        "category": "features",
        "desc": ["Mientras estás concentrado en un conjuro, tu CA aumenta en +1 y sufres 1 punto menos de daño por cada ataque de arma que recibas."]
    },
    {
        "id": "lightning-reflexes",
        "name": "Adepto en reflejos / Lightning Reflexes",
        "category": "features",
        "desc": ["Tienes una velocidad de respuesta sobrehumana. Ganas ventaja en todas las tiradas de salvación de Destreza de fuentes que puedas ver, como trampas y conjuros."]
    }
]
traits.extend(new_traits)
with open(traits_file, 'w', encoding='utf-8') as f:
    json.dump(traits, f, indent=2, ensure_ascii=False)

print("Data appended successfully!")
