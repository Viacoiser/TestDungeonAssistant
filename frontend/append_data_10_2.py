import json
import os

base_path = 'src/data/encyclopedia'

# Spells
spells_file = os.path.join(base_path, 'spells.json')
with open(spells_file, 'r', encoding='utf-8') as f:
    spells = json.load(f)

new_spells = [
    {
        "id": "psychic-scream",
        "name": "Explosión psíquica / Psychic Scream",
        "level": 9,
        "school": "Encantamiento",
        "casting_time": "1 acción",
        "range": "90 pies",
        "components": "S",
        "duration": "Instantáneo",
        "desc": ["Inflige daño psíquico masivo (14d6) a hasta 10 criaturas que elijas y las aturde si fallan su salvación de Inteligencia. Si mueren, sus cabezas explotan."],
        "damage": "14d6 psíquico"
    },
    {
        "id": "prismatic-wall",
        "name": "Muro prismático / Prismatic Wall",
        "level": 9,
        "school": "Abjuración",
        "casting_time": "1 acción",
        "range": "90 pies",
        "components": "V, S",
        "duration": "10 min",
        "desc": ["Crea una barrera multicolor y opaca de energía mágica. Tiene 7 capas con diferentes efectos letales (daño de fuego, ácido, rayo, veneno, frío, petrificación, ceguera y destierro) para quienes intenten cruzarlo."]
    },
    {
        "id": "shapechange",
        "name": "Forma dracónica / Shapechange",
        "level": 9,
        "school": "Transmutación",
        "casting_time": "1 acción",
        "range": "Personal",
        "components": "V, S, M",
        "duration": "Concentración, hasta 1 hora",
        "desc": ["Permite transformarse en cualquier criatura poderosa con un VD igual o menor a tu nivel (como un dragón) adquiriendo sus estadísticas y habilidades físicas."]
    },
    {
        "id": "simulacrum",
        "name": "Simulacro / Simulacrum",
        "level": 7,
        "school": "Ilusión",
        "casting_time": "12 horas",
        "range": "Toque",
        "components": "V, S, M",
        "duration": "Hasta que se disipe",
        "desc": ["Crea una copia de hielo/nieve de una bestia o humanoide con la mitad de sus puntos de golpe y sin capacidad para recuperar recursos o aprender."]
    },
    {
        "id": "finger-of-death",
        "name": "Dedo de la muerte / Finger of Death",
        "level": 7,
        "school": "Nigromancia",
        "casting_time": "1 acción",
        "range": "60 pies",
        "components": "V, S",
        "duration": "Instantáneo",
        "desc": ["Inflige 7d8 + 30 de daño necrótico extremo. Si el objetivo humanoide muere, se levanta permanentemente como un zombi bajo tu mando."],
        "damage": "7d8 + 30 necrótico"
    },
    {
        "id": "storm-of-vengeance",
        "name": "Tormenta de venganza / Storm of Vengeance",
        "level": 9,
        "school": "Conjuración",
        "casting_time": "1 acción",
        "range": "Visión",
        "components": "V, S",
        "duration": "Concentración, hasta 1 min",
        "desc": ["Invoca una tormenta devastadora en un radio de 360 pies. Cada asalto causa diferentes efectos progresivos: truenos ensordecedores, lluvia ácida, relámpagos, granizo gigante y lluvia helada."]
    },
    {
        "id": "true-resurrection",
        "name": "Resurrección verdadera / True Resurrection",
        "level": 9,
        "school": "Nigromancia",
        "casting_time": "1 hora",
        "range": "Toque",
        "components": "V, S, M",
        "duration": "Instantáneo",
        "desc": ["Devuelve a la vida a una criatura muerta hace no más de 200 años por cualquier causa. Restaura partes del cuerpo faltantes o crea un cuerpo nuevo si no existe."]
    },
    {
        "id": "antimagic-field",
        "name": "Antimagia / Antimagic Field",
        "level": 8,
        "school": "Abjuración",
        "casting_time": "1 acción",
        "range": "Personal (esfera de 10 pies)",
        "components": "V, S, M",
        "duration": "Concentración, hasta 1 hora",
        "desc": ["Crea una esfera a tu alrededor donde la magia no funciona. Los conjuros no pueden lanzarse, las criaturas convocadas desaparecen y los objetos mágicos se vuelven mundanos."]
    },
    {
        "id": "clone",
        "name": "Clone",
        "level": 8,
        "school": "Nigromancia",
        "casting_time": "1 hora",
        "range": "Toque",
        "components": "V, S, M",
        "duration": "Instantáneo",
        "desc": ["Permite cultivar un cuerpo de reemplazo de un ser vivo que tarda 120 días en madurar. Si la criatura original muere, su alma se transfiere a este clon."]
    },
    {
        "id": "summon-celestial",
        "name": "Invocar celestial / Summon Celestial",
        "level": 5,
        "school": "Conjuración",
        "casting_time": "1 acción",
        "range": "90 pies",
        "components": "V, S, M",
        "duration": "Concentración, hasta 1 hora",
        "desc": ["Invoca a un espíritu celestial (Vengador o Defensor) que lucha a tu lado y acata tus órdenes verbales en combate."]
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
        "id": "aboleth",
        "name": "Aboleth",
        "type": "aberración",
        "size": "Grande",
        "challenge_rating": "10",
        "armor_class": "17",
        "hit_points": "135",
        "hit_dice": "18d10 + 36",
        "strength": 21,
        "dexterity": 9,
        "constitution": 15,
        "intelligence": 18,
        "wisdom": 15,
        "charisma": 18,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Criatura acuática antigua con poderes psíquicos. Esclaviza mentes y su mucosidad obliga a respirar bajo el agua."
            }
        ]
    },
    {
        "id": "death-knight",
        "name": "Death Knight",
        "type": "no muerto",
        "size": "Mediano",
        "challenge_rating": "17",
        "armor_class": "20",
        "hit_points": "180",
        "hit_dice": "19d8 + 95",
        "strength": 20,
        "dexterity": 11,
        "constitution": 20,
        "intelligence": 12,
        "wisdom": 16,
        "charisma": 18,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Paladín corrompido, guerrero maldito con habilidades marciales superiores y magia nigromántica/fuego infernal (Hellfire Orb)."
            }
        ]
    },
    {
        "id": "solar",
        "name": "Solar",
        "type": "celestial",
        "size": "Grande",
        "challenge_rating": "21",
        "armor_class": "21",
        "hit_points": "243",
        "hit_dice": "18d10 + 144",
        "strength": 26,
        "dexterity": 22,
        "constitution": 26,
        "intelligence": 25,
        "wisdom": 25,
        "charisma": 30,
        "actions": [
            {
                "name": "Descripción",
                "desc": "El ángel más poderoso con ataques de gran espada y arco largo que infligen daño radiante extremo, y espada animada capaz de luchar por sí sola."
            }
        ]
    },
    {
        "id": "marilith",
        "name": "Marilith",
        "type": "infernal (demonio)",
        "size": "Grande",
        "challenge_rating": "16",
        "armor_class": "18",
        "hit_points": "189",
        "hit_dice": "18d10 + 90",
        "strength": 18,
        "dexterity": 20,
        "constitution": 20,
        "intelligence": 18,
        "wisdom": 16,
        "charisma": 20,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Demonio serpiente de 6 brazos y mente táctica brillante. Ataca con 7 armas y tiene una reacción en CADA turno de otra criatura para hacer paradas."
            }
        ]
    },
    {
        "id": "dracolich",
        "name": "Lich dragón / Dracolich",
        "type": "no muerto",
        "size": "Gargantuesco",
        "challenge_rating": "17",
        "armor_class": "19",
        "hit_points": "225",
        "hit_dice": "18d20 + 36",
        "strength": 27,
        "dexterity": 10,
        "constitution": 25,
        "intelligence": 16,
        "wisdom": 15,
        "charisma": 19,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Dragón que, buscando inmortalidad, se vincula a un filacterio volviéndose no muerto. Mantiene el poder de dragón pero gana resistencia de no muerto y Mirada Paralizante."
            }
        ]
    },
    {
        "id": "empyrean",
        "name": "Empyrean",
        "type": "celestial",
        "size": "Enorme",
        "challenge_rating": "23",
        "armor_class": "22",
        "hit_points": "313",
        "hit_dice": "19d12 + 190",
        "strength": 30,
        "dexterity": 21,
        "constitution": 30,
        "intelligence": 21,
        "wisdom": 22,
        "charisma": 27,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Hijos de los dioses, bellos y colosales. Golpean con maullos que aturden y alteran la realidad con sus emociones masivas."
            }
        ]
    },
    {
        "id": "nightwalker",
        "name": "Nightwalker",
        "type": "no muerto",
        "size": "Enorme",
        "challenge_rating": "20",
        "armor_class": "14",
        "hit_points": "297",
        "hit_dice": "22d12 + 154",
        "strength": 22,
        "dexterity": 19,
        "constitution": 24,
        "intelligence": 6,
        "wisdom": 9,
        "charisma": 8,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Entidad de muerte pura del Plano Negativo. Drena vida acercándose a él, y aquellos que mueren por su causa no pueden ser revividos a menos que la bestia sea destruida."
            }
        ]
    },
    {
        "id": "demogorgon",
        "name": "Demogorgon",
        "type": "infernal (demonio)",
        "size": "Enorme",
        "challenge_rating": "26",
        "armor_class": "22",
        "hit_points": "406",
        "hit_dice": "28d12 + 224",
        "strength": 29,
        "dexterity": 14,
        "constitution": 26,
        "intelligence": 20,
        "wisdom": 17,
        "charisma": 25,
        "actions": [
            {
                "name": "Descripción",
                "desc": "El Príncipe de los Demonios. De 2 cabezas, locura personificada, mirada que induce a confusión y locura, y tentáculos que pudren lo que tocan."
            }
        ]
    },
    {
        "id": "tarrasque",
        "name": "Tarrasque",
        "type": "monstruosidad",
        "size": "Gargantuesco",
        "challenge_rating": "30",
        "armor_class": "25",
        "hit_points": "676",
        "hit_dice": "33d20 + 330",
        "strength": 30,
        "dexterity": 11,
        "constitution": 30,
        "intelligence": 3,
        "wisdom": 11,
        "charisma": 11,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Criatura colosal casi imparable. Su caparazón refleja conjuros y realiza hasta 5 ataques devastadores que destrozan ejércitos."
            }
        ]
    },
    {
        "id": "leviathan",
        "name": "Leviatán",
        "type": "elemental",
        "size": "Gargantuesco",
        "challenge_rating": "20",
        "armor_class": "17",
        "hit_points": "328",
        "hit_dice": "16d20 + 160",
        "strength": 30,
        "dexterity": 14,
        "constitution": 30,
        "intelligence": 2,
        "wisdom": 18,
        "charisma": 17,
        "actions": [
            {
                "name": "Descripción",
                "desc": "Gigante elemental de agua. Destruye barcos creando enormes maremotos y olas aplastantes que devastan ciudades costeras."
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
        "id": "tent",
        "name": "Tienda de campaña",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 2, "unit": "gp" },
        "weight": 20,
        "desc": ["Refugio básico de lona o piel, caben 2 humanoides cómodamente, protegiendo del clima adverso."]
    },
    {
        "id": "blanket",
        "name": "Manta",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 5, "unit": "sp" },
        "weight": 3,
        "desc": ["Mantiene el calor y proporciona un lugar cómodo para dormir, ayudando a recuperarse en descansos al aire libre."]
    },
    {
        "id": "tinderbox",
        "name": "Pedernal y acero",
        "category": "tools",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 5, "unit": "sp" },
        "weight": 1,
        "desc": ["Permite encender fuego produciendo chispas sobre yesca frotando pedernal y acero. Iniciar un fuego toma 1 acción."]
    },
    {
        "id": "ink",
        "name": "Frasco de tinta",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 10, "unit": "gp" },
        "weight": 0,
        "desc": ["Tinta negra u oscura de alta calidad, a menudo usada para escribir conjuros, rituales y mensajes importantes (rinde 1 onza)."]
    },
    {
        "id": "parchment",
        "name": "Pergamino",
        "category": "adventuring-gear",
        "equipment_category": { "name": "Adventuring Gear" },
        "cost": { "quantity": 1, "unit": "sp" },
        "weight": 0,
        "desc": ["Hoja de piel animal tratada, superficie resistente usada para registrar mapas, diarios o conjuros."]
    },
    {
        "id": "sword-plus-three",
        "name": "Espada +3",
        "category": "magic",
        "equipment_category": { "name": "Magic Weapon" },
        "weight": 3,
        "desc": ["Arma mágica (muy rara). Tienes un bonificador de +3 en las tiradas de ataque y daño con esta espada larga."]
    },
    {
        "id": "shield-plus-two",
        "name": "Escudo +2",
        "category": "magic",
        "equipment_category": { "name": "Magic Armor" },
        "weight": 6,
        "desc": ["Escudo mágico (raro). Además del bono básico de CA, otorga un +2 adicional, subiendo tu Clase de Armadura total significativamente."]
    },
    {
        "id": "ring-of-regeneration",
        "name": "Anillo de regeneración",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Anillo (muy raro, requiere sintonización). Recuperas 1d6 puntos de golpe cada 10 minutos (1 por minuto), y puedes regenerar partes del cuerpo si lo usas por días."]
    },
    {
        "id": "cloak-of-displacement",
        "name": "Capa de desplazamiento / Cloak of Displacement",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Objeto maravilloso (raro, requiere sintonización). Proyecta ilusiones de tu posición. Todas las criaturas tienen desventaja en ataques contra ti. Falla hasta el próximo turno si recibes daño."]
    },
    {
        "id": "pearl-of-power",
        "name": "Perla de poder / Pearl of Power",
        "category": "magic",
        "equipment_category": { "name": "Magic Item" },
        "weight": 0,
        "desc": ["Objeto maravilloso (incomún, requiere sintonización por hechicero, mago o brujo). Como acción, recuperas un espacio de conjuro gastado de nivel 3 o inferior."]
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
        "id": "skulker",
        "name": "Adepto en sigilo / Skulker",
        "category": "feats",
        "desc": ["Prerrequisito: Destreza 13+. Puedes intentar esconderte estando ligeramente oculto (luz tenue). Cuando fallas un ataque a distancia oculto no revelas tu posición. La luz tenue no impone desventaja en tiradas de Sabiduría (Percepción)."]
    },
    {
        "id": "spell-expert",
        "name": "Lanzador experto / Spell Expert",
        "category": "features",
        "desc": ["(Homebrew-like). Mejora la eficiencia mágica. Puedes elegir un truco para lanzarlo como acción adicional y recuperar un uso de habilidad mágica menor en descansos cortos."]
    },
    {
        "id": "shield-training",
        "name": "Adepto en escudos pesados / Shield Training",
        "category": "features",
        "desc": ["Mejora el uso del escudo en combate. Puedes usar el escudo como arma improvisada competente e intentar empujones con ventaja si el enemigo falló un ataque en ese turno."]
    },
    {
        "id": "arcane-initiate",
        "name": "Iniciado arcano / Arcane Initiate",
        "category": "features",
        "desc": ["Otorga conexión con la urdimbre. Aprendes un truco de la lista del mago y adquieres competencia con herramientas de calígrafo o suministros de alquimista."]
    },
    {
        "id": "survivalist",
        "name": "Experto en supervivencia / Survivalist",
        "category": "features",
        "desc": ["Bonificación pasiva. Nunca te pierdes al viajar (excepto magia) y encuentras el doble de alimento y agua al recolectar (foraging) en terrenos hostiles."]
    },
    {
        "id": "menacing",
        "name": "Adepto en intimidación / Menacing",
        "category": "features",
        "desc": ["Aumenta Carisma +1. Cuando asestas un ataque crítico a una criatura, puedes forzarla a hacer una salvación de Sabiduría o quedará asustada (Frightened) de ti hasta tu próximo turno."]
    },
    {
        "id": "savage-attacker",
        "name": "Combatiente brutal / Savage Attacker",
        "category": "feats",
        "desc": ["Una vez por turno al realizar una tirada de daño cuerpo a cuerpo, puedes tirar los dados nuevamente y usar el resultado más alto. Asegura golpes devastadores constantes."]
    },
    {
        "id": "medium-armor-master",
        "name": "Maestro de armaduras medias / Medium Armor Master",
        "category": "feats",
        "desc": ["Prerrequisito: Competencia con armadura media. Usar armadura media no te impone desventaja al Sigilo. El bonificador máximo de Destreza a la CA usando armadura media sube de 2 a 3."]
    },
    {
        "id": "quick-draw",
        "name": "Adepto en iniciativa / Quick Draw",
        "category": "features",
        "desc": ["Aumentas tu tirada de iniciativa igual a tu modificador de competencia. Puedes desenfundar o guardar un arma cada vez que realices un ataque en tu turno sin gastar interacciones extra."]
    },
    {
        "id": "iron-will",
        "name": "Adepto en voluntad / Iron Will",
        "category": "features",
        "desc": ["Tus pensamientos no pueden ser leídos por magia sin tu permiso y tienes ventaja en tiradas de salvación contra ser asustado (frightened) o encantado (charmed)."]
    }
]
traits.extend(new_traits)
with open(traits_file, 'w', encoding='utf-8') as f:
    json.dump(traits, f, indent=2, ensure_ascii=False)

print("Data appended successfully!")
