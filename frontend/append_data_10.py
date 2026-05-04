import json
import os

base_path = 'src/data/encyclopedia'

# Spells
spells_file = os.path.join(base_path, 'spells.json')
with open(spells_file, 'r', encoding='utf-8') as f:
    spells = json.load(f)

new_spells = [
    {
        "id": "wall-of-force",
        "name": "Muro de fuerza / Wall of Force",
        "level": 5,
        "school": "Evocación",
        "casting_time": "1 acción",
        "range": "120 pies",
        "components": "V, S, M",
        "duration": "Concentración, hasta 10 min",
        "desc": ["Crea una barrera invisible impenetrable. El muro aparece en cualquier orientación y descansa en el aire u otra superficie sólida."]
    },
    {
        "id": "cloudkill",
        "name": "Nube aniquiladora / Cloudkill",
        "level": 5,
        "school": "Conjuración",
        "casting_time": "1 acción",
        "range": "120 pies",
        "components": "V, S",
        "duration": "Concentración, hasta 10 min",
        "desc": ["Genera una nube venenosa que daña a criaturas dentro de ella. La nube se mueve a nivel de suelo alejándose del lanzador."],
        "damage": "5d8 veneno"
    },
    {
        "id": "dominate-person",
        "name": "Dominar persona / Dominate Person",
        "level": 5,
        "school": "Encantamiento",
        "casting_time": "1 acción",
        "range": "60 pies",
        "components": "V, S",
        "duration": "Concentración, hasta 1 min",
        "desc": ["Permite controlar las acciones de un humanoide con el que tengas enlace telepático."]
    },
    {
        "id": "chain-lightning",
        "name": "Cadena de relámpagos / Chain Lightning",
        "level": 6,
        "school": "Evocación",
        "casting_time": "1 acción",
        "range": "150 pies",
        "components": "V, S, M",
        "duration": "Instantáneo",
        "desc": ["Rayo que salta entre múltiples objetivos. Eliges un blanco inicial y el relámpago salta a otros tres que estén a 30 pies del primero."],
        "damage": "10d8 relámpago"
    },
    {
        "id": "forcecage",
        "name": "Jaula de fuerza / Forcecage",
        "level": 7,
        "school": "Evocación",
        "casting_time": "1 acción",
        "range": "100 pies",
        "components": "V, S, M",
        "duration": "1 hora",
        "desc": ["Atrapa criaturas en una prisión mágica (caja o jaula sólida) sin salvación inicial. Impide teletransporte físico directo sin superar salvación de Carisma."]
    },
    {
        "id": "plane-shift",
        "name": "Plano cambiante / Plane Shift",
        "level": 7,
        "school": "Conjuración",
        "casting_time": "1 acción",
        "range": "Toque",
        "components": "V, S, M",
        "duration": "Instantáneo",
        "desc": ["Permite viajar entre planos junto a acompañantes voluntarios o intentar desterrar a una criatura hostil al otro lado del multiverso."]
    },
    {
        "id": "sunburst",
        "name": "Explosión solar / Sunburst",
        "level": 8,
        "school": "Evocación",
        "casting_time": "1 acción",
        "range": "150 pies",
        "components": "V, S, M",
        "duration": "Instantáneo",
        "desc": ["Explosión radiante que ciega y daña en un área inmensa. Hace luz diurna y disipa la oscuridad mágica."],
        "damage": "12d6 radiante"
    },
    {
        "id": "maze",
        "name": "Laberinto / Maze",
        "level": 8,
        "school": "Conjuración",
        "casting_time": "1 acción",
        "range": "60 pies",
        "components": "V, S",
        "duration": "Concentración, hasta 10 min",
        "desc": ["Atrapa a una criatura en un laberinto extradimensional. No hay salvación inicial; el blanco usa su acción cada turno para intentar escapar con prueba de Inteligencia (CD 20)."]
    },
    {
        "id": "time-stop",
        "name": "Detener el tiempo / Time Stop",
        "level": 9,
        "school": "Transmutación",
        "casting_time": "1 acción",
        "range": "Personal",
        "components": "V",
        "duration": "Instantáneo",
        "desc": ["Permite actuar durante 1d4+1 turnos sucesivos mientras el tiempo está detenido para todos los demás."]
    },
    {
        "id": "etherealness",
        "name": "Forma etérea / Etherealness",
        "level": 7,
        "school": "Transmutación",
        "casting_time": "1 acción",
        "range": "Personal",
        "components": "V, S",
        "duration": "Hasta 8 horas",
        "desc": ["Permite moverse en el plano etéreo atravesando objetos y evitando ser detectado en el plano material."]
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
        "id": "beholder",
        "name": "Beholder",
        "type": "aberración",
        "size": "Grande",
        "challenge_rating": "13",
        "armor_class": "18",
        "hit_points": "180",
        "hit_dice": "19d10 + 76",
        "strength": 10,
        "dexterity": 14,
        "constitution": 18,
        "intelligence": 17,
        "wisdom": 15,
        "charisma": 17,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Criatura flotante con múltiples ojos que disparan rayos mágicos variados (Desintegrar, Paralizar, Miedo, etc.) y un ojo central que proyecta antimagia."
            }
        ]
    },
    {
        "id": "mind-flayer",
        "name": "Mind Flayer / Devorador de mentes",
        "type": "aberración",
        "size": "Mediano",
        "challenge_rating": "7",
        "armor_class": "15",
        "hit_points": "71",
        "hit_dice": "13d8 + 13",
        "strength": 11,
        "dexterity": 12,
        "constitution": 12,
        "intelligence": 19,
        "wisdom": 17,
        "charisma": 17,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Psíquico poderoso que aturde en área (Mind Blast) y utiliza sus tentáculos para atrapar a sus víctimas y extraerles el cerebro."
            }
        ]
    },
    {
        "id": "vampire",
        "name": "Vampire / Vampiro",
        "type": "no muerto",
        "size": "Mediano",
        "challenge_rating": "13",
        "armor_class": "16",
        "hit_points": "144",
        "hit_dice": "17d8 + 68",
        "strength": 18,
        "dexterity": 18,
        "constitution": 18,
        "intelligence": 17,
        "wisdom": 15,
        "charisma": 18,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Depredador inmortal que drena vida, hechiza a sus presas y puede transformarse en niebla o murciélago. Se regenera constantemente."
            }
        ]
    },
    {
        "id": "werewolf",
        "name": "Werewolf / Hombre lobo",
        "type": "cambiaformas",
        "size": "Mediano",
        "challenge_rating": "3",
        "armor_class": "11",
        "hit_points": "58",
        "hit_dice": "9d8 + 18",
        "strength": 15,
        "dexterity": 13,
        "constitution": 14,
        "intelligence": 10,
        "wisdom": 11,
        "charisma": 10,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Humanoide que se transforma en bestia y es inmune a daño de armas no mágicas y no plateadas. Su mordisco puede propagar licantropía."
            }
        ]
    },
    {
        "id": "hydra",
        "name": "Hydra",
        "type": "monstruosidad",
        "size": "Enorme",
        "challenge_rating": "8",
        "armor_class": "15",
        "hit_points": "172",
        "hit_dice": "15d12 + 75",
        "strength": 20,
        "dexterity": 12,
        "constitution": 20,
        "intelligence": 2,
        "wisdom": 10,
        "charisma": 7,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Bestia de múltiples cabezas que realiza tantos ataques como cabezas tiene, regenerando el doble de cabezas si pierde una y no recibe daño de fuego."
            }
        ]
    },
    {
        "id": "chimera",
        "name": "Chimera",
        "type": "monstruosidad",
        "size": "Grande",
        "challenge_rating": "6",
        "armor_class": "14",
        "hit_points": "114",
        "hit_dice": "12d10 + 48",
        "strength": 19,
        "dexterity": 11,
        "constitution": 19,
        "intelligence": 3,
        "wisdom": 14,
        "charisma": 10,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Criatura híbrida con cabeza de dragón, león y cabra. Posee ataques variados incluyendo garras, cuernos y aliento de fuego."
            }
        ]
    },
    {
        "id": "banshee",
        "name": "Banshee",
        "type": "no muerto",
        "size": "Mediano",
        "challenge_rating": "4",
        "armor_class": "12",
        "hit_points": "58",
        "hit_dice": "13d8",
        "strength": 1,
        "dexterity": 14,
        "constitution": 10,
        "intelligence": 12,
        "wisdom": 11,
        "charisma": 17,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Espíritu elfo corrompido que puede usar una vez por día su Wail (Grito) aterrador que reduce a 0 los puntos de golpe a los que fallen su salvación."
            }
        ]
    },
    {
        "id": "ghost",
        "name": "Ghost / Fantasma",
        "type": "no muerto",
        "size": "Mediano",
        "challenge_rating": "4",
        "armor_class": "11",
        "hit_points": "45",
        "hit_dice": "10d8",
        "strength": 7,
        "dexterity": 13,
        "constitution": 10,
        "intelligence": 10,
        "wisdom": 12,
        "charisma": 17,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Espíritu incorpóreo que puede poseer cuerpos de humanoides (Possession) y atravesar objetos sólidos. Su toque envejece (Horrifying Visage)."
            }
        ]
    },
    {
        "id": "roc",
        "name": "Roc",
        "type": "bestia",
        "size": "Gargantuesco",
        "challenge_rating": "11",
        "armor_class": "15",
        "hit_points": "248",
        "hit_dice": "16d20 + 80",
        "strength": 28,
        "dexterity": 10,
        "constitution": 20,
        "intelligence": 3,
        "wisdom": 10,
        "charisma": 9,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Ave colosal (gigante) capaz de levantar presas de gran tamaño, como elefantes. Tiene garras y pico muy poderosos."
            }
        ]
    },
    {
        "id": "fire-elemental",
        "name": "Elemental de fuego",
        "type": "elemental",
        "size": "Grande",
        "challenge_rating": "5",
        "armor_class": "13",
        "hit_points": "102",
        "hit_dice": "12d10 + 36",
        "strength": 10,
        "dexterity": 17,
        "constitution": 16,
        "intelligence": 6,
        "wisdom": 10,
        "charisma": 7,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Ser de llamas vivientes que quema a las criaturas que lo toquen. Puede prender fuego a su paso."
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
        "id": "bullseye-lantern",
        "name": "Linterna de ojo de buey",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 10, "unit": "gp" },
        "weight": 2,
        "desc": ["Ilumina en un cono enfocado. Da luz brillante en un cono de 60 pies y luz tenue 60 pies más allá, consume aceite (1 pinta/6h)."]
    },
    {
        "id": "silk-rope",
        "name": "Cuerda de seda (50 pies)",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 10, "unit": "gp" },
        "weight": 5,
        "desc": ["Más ligera y resistente que la cuerda de cáñamo, ideal para escaladas peligrosas."]
    },
    {
        "id": "torch",
        "name": "Antorcha",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 1, "unit": "cp" },
        "weight": 1,
        "desc": ["Fuente de luz básica. Arde produciendo luz brillante en radio de 20 pies y tenue otros 20. Dura aproximadamente 1 hora."]
    },
    {
        "id": "rations",
        "name": "Raciones (1 día)",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 5, "unit": "sp" },
        "weight": 2,
        "desc": ["Provisiones secas (carne seca, frutos secos) suficientes para alimentar a una criatura durante un día de expedición."]
    },
    {
        "id": "waterskin",
        "name": "Cantimplora",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 2, "unit": "sp" },
        "weight": 5,
        "desc": ["Contiene 4 pintas de líquidos (1 día de agua). Esencial para la supervivencia en viajes largos."]
    },
    {
        "id": "flame-tongue",
        "name": "Espada flamígera / Flame Tongue",
        "category": "magic",
        "equipment_category": { "name": "Magic Weapon" },
        "weight": 3,
        "desc": ["Espada mágica (rara, requiere sintonización). Puede activarse con palabra de mando para envolver la hoja en llamas, causando 2d6 daño adicional de fuego e iluminando el entorno."]
    },
    {
        "id": "cloak-of-elvenkind",
        "name": "Capa élfica / Cloak of Elvenkind",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Objeto maravilloso (incomún, requiere sintonización). Otorga ventaja en tus tiradas de Sigilo y otorga desventaja en las de Percepción a quienes intentan detectar tu presencia visualmente."]
    },
    {
        "id": "boots-of-speed",
        "name": "Botas de velocidad / Boots of Speed",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Objeto maravilloso (raro, requiere sintonización). Puedes usarlas para duplicar tu velocidad a pie por 10 minutos al día. Las criaturas que hagan ataques de oportunidad contra ti tienen desventaja."]
    },
    {
        "id": "amulet-of-health",
        "name": "Amuleto de salud / Amulet of Health",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Objeto maravilloso (raro, requiere sintonización). Establece tu puntuación de Constitución en 19 mientras lo lleves puesto. No tiene efecto si tu CON ya es mayor."]
    },
    {
        "id": "belt-of-giant-strength",
        "name": "Cinturón de fuerza de gigante / Belt of Giant Strength",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 1,
        "desc": ["Objeto maravilloso (raro a legendario, requiere sintonización). Aumenta la Fuerza del portador a 21, 23, 25, 27 o 29 dependiendo de la variante del gigante (Hill, Frost, Fire, Cloud, Storm)."]
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
        "id": "sharpshooter",
        "name": "Tirador certero / Sharpshooter",
        "category": "feats",
        "desc": ["Tus ataques a distancia no sufren desventaja al disparar a largo alcance. Ignoras la cobertura media y tres cuartos. Antes de hacer el ataque de arma a distancia en el que eres competente, puedes decidir restar -5 a la tirada para sumar +10 al daño."]
    },
    {
        "id": "skill-expert",
        "name": "Experto en habilidades / Skill Expert",
        "category": "feats",
        "desc": ["Aumenta una característica en +1. Gana competencia en una habilidad de tu elección. Obtienes pericia (expertise) en una habilidad en la que ya tengas competencia (duplicas tu bonificador)."]
    },
    {
        "id": "metamagic-adept",
        "name": "Adepto metamagia / Metamagic Adept",
        "category": "feats",
        "desc": ["Aprendes 2 opciones de Metamagia de la clase hechicero. Obtienes 2 puntos de hechicería para gastar exclusivamente en estas opciones. Recuperas los puntos al terminar descanso largo."]
    },
    {
        "id": "fighting-initiate",
        "name": "Adepto marcial superior / Fighting Initiate",
        "category": "feats",
        "desc": ["Prerrequisito: Competencia con un arma marcial. Aprendes un Estilo de Combate de tu elección de los disponibles para la clase de guerrero."]
    },
    {
        "id": "ritual-caster",
        "name": "Lanzador ritual / Ritual Caster",
        "category": "feats",
        "desc": ["Prerrequisito: Inteligencia o Sabiduría 13+. Tienes un libro de rituales con dos conjuros de nivel 1 con etiqueta 'ritual'. Puedes lanzarlos como ritual y transcribir nuevos hechizos que encuentres."]
    },
    {
        "id": "heavy-armor-master",
        "name": "Adepto en armaduras pesadas / Heavy Armor Master",
        "category": "feats",
        "desc": ["Prerrequisito: Competencia con armadura pesada. Aumenta tu Fuerza +1. Mientras lleves armadura pesada, el daño cortante, perforante y contundente de ataques con armas no mágicas se reduce en 3."]
    },
    {
        "id": "mounted-combatant",
        "name": "Combate montado / Mounted Combatant",
        "category": "feats",
        "desc": ["Tienes ventaja en ataques cuerpo a cuerpo contra criaturas desmontadas más pequeñas que tu montura. Puedes obligar a ataques a apuntarte a ti en vez de tu montura. Tu montura recibe 0 daño en salvaciones de DES donde recibiría mitad."]
    },
    {
        "id": "poisoner",
        "name": "Adepto en venenos / Poisoner",
        "category": "feats",
        "desc": ["Ignoras la resistencia al veneno que tengan tus enemigos. Puedes aplicar venenos a armas o munición como acción adicional. Obtienes competencia con kit de envenenador para crear tus propios viales (causan daño extra y condición de envenenado)."]
    },
    {
        "id": "grappler",
        "name": "Iniciado en lucha / Grappler",
        "category": "feats",
        "desc": ["Prerrequisito: Fuerza 13+. Tienes ventaja al atacar a criaturas que tengas agarradas (grappled). Puedes usar tu acción para intentar apresar (restrain) a la criatura inmovilizándola junto a ti."]
    },
    {
        "id": "keen-mind",
        "name": "Adepto en percepción / Keen Mind",
        "category": "feats",
        "desc": ["Aumenta Inteligencia +1. Siempre sabes en qué dirección está el norte y cuántas horas faltan para amanecer/anochecer. Puedes recordar con exactitud cualquier cosa vista u oída en el último mes."]
    }
]
traits.extend(new_traits)
with open(traits_file, 'w', encoding='utf-8') as f:
    json.dump(traits, f, indent=2, ensure_ascii=False)

print("Data appended successfully!")
