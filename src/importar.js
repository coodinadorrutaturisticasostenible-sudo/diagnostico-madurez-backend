const pool = require('./db');
require('dotenv').config();

const orgs = [
  {nombre:'ASOCIACIÓN DE MUJERES INDIGENAS MOKANÁ DE PALUATO -AMINPA',municipio:'Galapa',alcance:'Local, Intermunicipal',tiempo:'Entre 6 y 10 años',v:[1,4,1,2,4,1,1,1,1,2,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1]},
  {nombre:'ASOCIACIÓN ALTERNATIVAS BIÓTICAS',municipio:'Galapa',alcance:'Local, Intermunicipal, Departamental, Nacional, Internacional',tiempo:'Mas de 15 años',v:[4,4,4,4,4,4,4,3,3,4,4,3,3,4,4,1,4,3,3,4,4,4,4,3,3,3,4,4,3,4,4]},
  {nombre:'FUNDACIÓN BIOATMÓSFERA',municipio:'Galapa',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 4 y 5 años',v:[4,4,4,2,4,2,3,2,3,3,2,4,4,3,3,3,3,2,3,3,2,3,2,3,4,4,3,3,4,3,3]},
  {nombre:'FUNDACIÓN BUTTERFLY CARIBE',municipio:'Galapa',alcance:'Local, Intermunicipal, Departamental, Nacional, Internacional',tiempo:'Entre 4 y 5 años',v:[2,4,2,2,3,2,1,1,1,2,3,2,2,2,2,2,2,2,3,2,2,2,2,2,2,3,4,4,3,2,3]},
  {nombre:'ASOCIACIÓN DE ARTESANAS DE CHORRERA',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental, Nacional, Internacional',tiempo:'Mas de 15 años',v:[3,4,4,4,3,4,2,3,3,3,3,4,3,2,1,3,4,2,3,3,4,3,2,3,3,4,4,2,2,3,3]},
  {nombre:'FUNDACIÓN CUMBIA ORIGINAL DE CHORRERA',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental',tiempo:'Menos de 1 año',v:[1,2,1,1,1,1,2,2,1,3,1,1,2,2,1,1,3,1,1,1,3,1,1,1,1,1,2,1,1,2,1]},
  {nombre:'ASOCIACIÓN DE PRODUCTORES DE ALIMENTOS DEL DERIVADO DE LA YUCA DELICIAS DE CHORRERA',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 6 y 10 años',v:[3,4,4,4,3,4,2,3,3,3,3,4,3,2,1,3,3,2,2,3,4,2,2,3,3,4,4,4,3,3,3]},
  {nombre:'ASOCIACIÓN DE OPERADORES TURÍSTICOS DE SANTA VERÓNICA -ASOOTUSAVE',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal',tiempo:'Menos de 1 año',v:[2,3,2,2,3,4,1,2,2,3,2,2,2,3,2,2,2,1,1,3,4,4,4,2,2,2,2,2,2,2,2]},
  {nombre:'ASOCIACIÓN CAMPESINA DE LA VEREDA SARMIENTO',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 4 y 5 años',v:[4,4,4,2,3,4,1,2,2,2,2,1,2,3,2,2,2,1,1,3,2,3,2,2,2,1,1,2,2,2,3]},
  {nombre:'ASOCONFEJ',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal',tiempo:'Menos de 1 año',v:[2,3,1,2,2,2,1,1,1,2,3,1,1,1,1,1,1,1,1,1,1,1,2,1,2,2,1,1,1,1,1]},
  {nombre:'ASOCIACIÓN DE MUJERES CAMPESINAS DE CHORRERA -ASOMUCCHO',municipio:'Juan de Acosta',alcance:'Local, Departamental',tiempo:'Mas de 15 años',v:[3,4,2,4,3,4,1,1,2,3,2,3,2,3,3,1,2,1,3,3,2,3,2,2,3,3,3,4,2,3,2]},
  {nombre:'ASOCIACIÓN DE PESCADORES DE SAN JOSE DE SACO',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 1 y 3 años',v:[3,4,4,2,3,4,1,3,2,3,2,1,2,1,3,2,1,1,2,3,2,3,2,2,2,1,1,2,2,2,3]},
  {nombre:'ASOCIACIÓN DE PESCADORES DE SANTA VERONICA -ASOPESVE',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Mas de 15 años',v:[4,4,3,2,3,4,1,1,2,3,2,3,2,3,2,1,2,2,1,3,4,2,2,2,2,1,3,2,2,2,2]},
  {nombre:'CORPORACIÓN AUTÓNOMA DEL CARNAVAL Y REINADO INTERMUNICIPAL DEL MILLO -CARMILLO',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental',tiempo:'Mas de 15 años',v:[2,4,4,2,3,4,2,3,2,3,3,3,2,2,3,4,2,2,3,3,2,2,2,2,3,3,3,4,1,3,2]},
  {nombre:'FUNDACIÓN CARIBE AVENTURERO -FUNCRAV',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Menos de 1 año',v:[2,4,1,2,3,3,1,2,1,2,2,2,1,1,2,1,1,1,2,2,1,2,1,1,2,3,2,2,2,1,2]},
  {nombre:'FUNDACIÓN CARNAVAL INFANTIL Y FESTIVAL FOLCLORICO DELTURAL DE LA ALEGRÍA',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Menos de 1 año',v:[4,4,2,2,3,3,2,2,3,3,2,4,3,1,4,3,3,2,2,3,2,2,1,2,4,3,4,4,3,1,2]},
  {nombre:'FUNDACIÓN CULTURAL Y CARNAVAL DE CHORRERA',municipio:'Juan de Acosta',alcance:'Local, Departamental',tiempo:'Entre 1 y 3 años',v:[1,4,3,2,3,2,1,1,1,2,3,1,1,2,1,1,1,1,1,1,2,1,2,2,2,2,2,2,1,1,1]},
  {nombre:'FUNDACIÓN CELESTE',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental',tiempo:'Entre 1 y 3 años',v:[3,4,2,2,3,3,2,2,1,3,3,3,2,1,2,2,2,2,1,3,2,2,2,2,3,2,3,3,1,1,2]},
  {nombre:'FUNDACIÓN CULTURAL LA TIERRA DEL CÓNDOR',municipio:'Juan de Acosta',alcance:'Nacional',tiempo:'Entre 10 y 15 años',v:[1,4,3,2,3,4,1,1,2,3,3,3,3,2,3,3,2,2,1,2,2,2,2,2,3,3,3,4,1,2,1]},
  {nombre:'FUNDACIÓN DON TITO',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental, Nacional, Internacional',tiempo:'Entre 10 y 15 años',v:[3,4,4,4,4,3,3,2,2,3,2,2,1,1,4,1,2,2,1,3,1,2,3,2,2,3,4,3,1,1,1]},
  {nombre:'FUNDACIÓN SOCIAL BARACK OBAMA',municipio:'Juan de Acosta',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Mas de 15 años',v:[3,4,4,2,3,4,1,2,3,2,3,2,2,3,3,3,3,2,2,4,2,3,3,2,3,2,1,3,4,2,3]},
  {nombre:'ASOCIACIÓN CULTURAL Y ARTESANAL RAICES DE MALAMBO',municipio:'Malambo',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Menos de 1 año',v:[2,4,3,2,4,4,3,2,2,3,2,1,2,2,3,2,3,2,1,1,2,2,1,4,2,3,3,1,1,2,2]},
  {nombre:'ASOCIACIÓN DE USUARIOS CAMPESINOS DE MALAMBO -ANUC MALAMBO',municipio:'Malambo',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 6 y 10 años',v:[3,3,4,2,4,4,2,2,3,3,3,1,3,3,1,1,1,2,1,3,2,3,3,3,4,2,3,4,3,2,3]},
  {nombre:'ASOCIACIÓN DE PESCADORES - ASOPESGRIMA',municipio:'Malambo',alcance:'Local, Intermunicipal, Departamental',tiempo:'Entre 10 y 15 años',v:[3,4,2,3,4,3,1,2,3,2,1,1,1,1,1,2,1,1,1,3,2,3,2,2,2,2,1,1,3,2,2]},
  {nombre:'COMUNIDAD INDIGENA KAAMASH-HU KARIBE',municipio:'Malambo',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 1 y 3 años',v:[4,3,1,1,4,1,2,2,1,2,2,2,1,1,1,1,1,1,1,3,1,3,2,2,2,4,1,4,4,3,2]},
  {nombre:'FUNDACIÓN CÉSAR MIRANDA PÉREZ',municipio:'Malambo',alcance:'Local, Departamental, Nacional',tiempo:'Entre 4 y 5 años',v:[4,4,3,4,4,4,3,3,3,4,3,4,4,4,4,2,3,3,4,3,3,4,3,3,4,3,4,4,4,3,3]},
  {nombre:'ASOCIACIÓN AGROECOLÓGICA NUEVA GENERACIÓN DE PIOJÓ',municipio:'Piojo',alcance:'Local, Intermunicipal, Departamental',tiempo:'Menos de 1 año',v:[3,4,3,1,3,1,1,2,2,3,2,2,2,1,1,3,2,3,1,1,1,1,1,2,3,2,2,2,1,1,1]},
  {nombre:'ASOCIACIÓN COMITÉ PARA EL DESARROLLO Y RECONSTRUCCIÓN DEL MUNICIPIO DE PIOJÓ',municipio:'Piojo',alcance:'Local, Intermunicipal, Departamental',tiempo:'Menos de 1 año',v:[4,4,3,2,4,4,1,2,2,2,1,2,1,2,1,1,1,1,1,4,1,4,4,4,2,2,1,4,4,4,4]},
  {nombre:'ASOCIACIÓN MUNICIPAL DE MUJERES CAMPESINAS, NEGRAS E INDIGENAS DEL MUNICIPIO DE PIOJÓ',municipio:'Piojo',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 6 y 10 años',v:[2,2,2,1,4,1,1,1,4,4,2,1,1,2,1,1,1,1,1,4,4,4,4,4,2,4,2,4,4,3,4]},
  {nombre:'ASOCIACIÓN DE MUJERES CAMPESINAS DE PIOJÓ',municipio:'Piojo',alcance:'Local',tiempo:'Mas de 15 años',v:[4,4,4,2,4,4,2,3,3,4,2,3,3,3,1,3,3,2,1,4,4,1,4,3,2,2,2,4,4,4,4]},
  {nombre:'ASOGUACHARACAS',municipio:'Piojo',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Menos de 1 año',v:[1,3,1,1,2,1,2,2,1,2,2,2,1,1,2,2,1,1,2,1,1,1,1,1,2,1,3,2,2,1,2]},
  {nombre:'FUNDACIÓN ECOLOGICA LOS CHARCONES',municipio:'Piojo',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 6 y 10 años',v:[4,4,4,4,4,4,4,4,3,4,3,3,4,3,2,2,3,2,3,4,1,2,2,2,3,3,2,4,3,1,2]},
  {nombre:'FUNDACIÓN ECOSISTEMAS SECOS DE COLOMBIA',municipio:'Piojo',alcance:'Internacional',tiempo:'Entre 1 y 3 años',v:[3,4,4,4,4,3,3,3,3,4,3,4,3,3,3,3,3,4,4,3,3,1,2,3,3,4,4,3,4,3,3]},
  {nombre:'FUNDACIÓN PALMA PIOJONERA -FUNDAPJ',municipio:'Piojo',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 6 y 10 años',v:[4,4,4,4,4,3,1,1,1,4,1,3,2,1,1,2,1,1,1,3,3,3,4,4,4,4,3,1,4,1,1]},
  {nombre:'THE QUEEN FOUNDATION',municipio:'Piojo',alcance:'Local, Intermunicipal, Departamental, Nacional, Internacional',tiempo:'Entre 4 y 5 años',v:[4,4,2,4,4,4,4,1,4,4,2,2,3,2,1,4,4,4,4,4,4,4,4,4,4,4,4,4,2,4,4]},
  {nombre:'REGION DE PLANEACION Y GESTION PARA EL TURISMO SOSTENIBLE DEL ATLANTICO, RPG ATLANTUR',municipio:'Piojo',alcance:'Nacional',tiempo:'Entre 4 y 5 años',v:[3,4,4,4,4,4,4,4,4,4,3,4,4,3,4,4,4,3,4,3,3,3,4,3,4,4,3,4,3,3,2]},
  {nombre:'Isla la Soltería',municipio:'Santa Catalina',alcance:'Local, Intermunicipal',tiempo:'Menos de 1 año',v:[2,2,1,1,3,1,1,1,2,2,2,1,3,3,1,3,2,1,1,2,1,1,2,1,2,2,1,2,1,1,3]},
  {nombre:'Asociación ecoturistica Lomarena Tour',municipio:'Santa Catalina',alcance:'Local',tiempo:'Entre 1 y 3 años',v:[2,3,1,2,1,1,1,1,1,2,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,3,1,1,1,1,1]},
  {nombre:'ASOCIACIÓN DE MUJERES PESCADORAS Y EMPRENDEDORAS DE LOMA ARENA',municipio:'Santa Catalina',alcance:'Local, Intermunicipal, Departamental, Nacional, Internacional',tiempo:'Entre 1 y 3 años',v:[2,4,2,3,3,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,1,1,1,1,2,3,1,1,1,1,1]},
  {nombre:'ASOCIACIÓN DE PESCADORES ARTESANALES AFRODESCENDIENTES DEL MAR CARIBE Y CIENAGA DEL TOTUMO - ASOPESLOMA',municipio:'Santa Catalina',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'?',v:[3,4,3,4,3,2,2,2,2,2,2,2,1,1,2,1,1,1,1,2,2,1,2,1,1,1,1,1,1,1,1]},
  {nombre:'ASOCIACIÓN DE PESCADORES Y VENDEDORES DE PLAYAS DE LOMA ARENA - ASOPEVENPLA',municipio:'Santa Catalina',alcance:'Local',tiempo:'Mas de 15 años',v:[1,4,2,1,4,4,1,1,1,2,1,3,2,2,2,1,1,2,1,2,1,1,2,1,1,1,1,1,1,1,1]},
  {nombre:'ASOCIACION DE TRABAJADORES DEL VOLCAN DEL TOTUMO DE PUEBLO NUEVO - ASOTRAVOLTOPUEN',municipio:'Santa Catalina',alcance:'Local',tiempo:'Mas de 15 años',v:[2,4,2,2,4,4,2,2,2,3,1,3,1,3,1,1,3,1,1,3,2,4,3,2,1,1,4,4,3,1,1]},
  {nombre:'ASOCIACION DE VENDEDORES GASTRONOMICOS VOLCAN DEL TOTUMO - ASOVENGASVOLTO',municipio:'Santa Catalina',alcance:'Local',tiempo:'Mas de 15 años',v:[1,4,1,1,3,4,1,1,1,1,1,1,1,2,1,1,1,1,1,2,2,1,2,3,2,1,1,1,1,1,1]},
  {nombre:'CONSEJO COMUNITARIO DE COMUNIDADES NEGRAS AMANZAGUAPO',municipio:'Santa Catalina',alcance:'Local, Departamental',tiempo:'Mas de 15 años',v:[3,4,2,2,3,2,2,2,2,3,2,2,2,2,2,1,1,2,2,2,2,2,2,2,3,2,2,2,2,2,2]},
  {nombre:'COORPORACIÓN VIGIA DEL PATRIMONIO DE SANTA CATALINA -CORVIPA',municipio:'Santa Catalina',alcance:'Local',tiempo:'Entre 10 y 15 años',v:[3,4,1,2,3,2,1,1,1,2,2,1,2,1,1,1,2,1,2,1,2,2,1,3,3,3,2,1,2,2,1]},
  {nombre:'RHIZOTOUR D.A.',municipio:'Santa Catalina',alcance:'Local',tiempo:'Entre 1 y 3 años',v:[2,4,1,2,3,3,1,1,1,2,1,1,1,1,1,1,1,1,1,2,1,2,2,1,3,3,4,2,1,2,1]},
  {nombre:'ASOARTES',municipio:'Tubara',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Mas de 15 años',v:[3,4,3,3,3,4,1,1,2,3,2,3,2,2,3,3,2,1,2,3,3,4,2,1,3,2,3,3,3,2,2]},
  {nombre:'ASOCIACIÓN RED DEPARTAMENTAL DE TURISMO RURAL DEL ATLANTICO-REDETUR',municipio:'Tubara',alcance:'Local, Intermunicipal, Departamental',tiempo:'Entre 1 y 3 años',v:[2,3,1,2,3,1,1,1,2,2,1,3,2,3,1,2,1,2,2,2,2,1,1,1,4,2,4,3,2,2,3]},
  {nombre:'ASOCIACIÓN DE SERVIDORES TURISTICOS Y EMBELLECIMIENTO DE PUERTO VELERO -ASOSERTUVEL',municipio:'Tubara',alcance:'Local, Intermunicipal, Departamental',tiempo:'Mas de 15 años',v:[4,4,4,2,4,4,2,1,2,3,1,4,3,3,4,1,2,3,1,2,3,3,2,3,4,1,2,2,2,2,3]},
  {nombre:'COLECTIVO CAMINANTES X EL MORRO',municipio:'Tubara',alcance:'Local, Intermunicipal',tiempo:'Menos de 1 año',v:[2,1,1,1,1,1,2,2,2,3,3,2,1,1,1,1,1,1,2,2,2,2,2,3,2,1,4,2,2,1,1]},
  {nombre:'FUNDACIÓN PUEBLO SANTO',municipio:'Tubara',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 4 y 5 años',v:[4,3,2,2,1,2,2,3,3,3,3,4,2,3,2,2,1,2,3,2,3,2,3,2,4,4,4,4,3,4,2]},
  {nombre:'CONSEJO COMUNITARIO DE COMUNIDAD NEGRA PALMARITO',municipio:'Cartagena',alcance:'Local, Intermunicipal, Departamental, Nacional, Internacional',tiempo:'Entre 10 y 15 años',v:[4,3,2,2,4,4,2,4,4,3,2,4,4,4,4,2,2,2,1,2,2,3,4,1,4,4,4,4,3,4,1]},
  {nombre:'COOPERFRUTAS',municipio:'Cartagena',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 1 y 3 años',v:[3,4,1,2,3,4,1,1,1,2,2,3,3,2,1,1,1,1,1,1,1,2,2,2,2,3,3,3,1,1,1]},
  {nombre:'OPERADORA DE TURISMO RURAL ARROYO GRANDE TOURS',municipio:'Cartagena',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Entre 1 y 3 años',v:[4,4,1,2,4,4,2,1,1,2,2,3,3,1,3,1,1,1,1,1,1,2,2,1,2,3,4,3,1,1,1]},
  {nombre:'ASOCIACIÓN CULTURA Y TURISMO ALTERNATIVO PLAYA BELLA',municipio:'Cartagena',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Menos de 1 año',v:[2,4,1,2,3,4,2,2,1,2,1,1,2,1,1,1,1,2,1,3,3,3,1,2,4,2,1,2,1,1,1]},
  {nombre:'Asociacion de mujeres negras rurales',municipio:'Cartagena',alcance:'Internacional',tiempo:'Entre 6 y 10 años',v:[2,3,1,2,1,2,2,2,1,2,1,2,1,1,2,2,1,1,1,2,2,2,2,2,2,3,2,2,1,2,2]},
  {nombre:'ASOCATUR',municipio:'Puerto Colombia',alcance:'Local, Intermunicipal, Departamental, Nacional, Internacional',tiempo:'Entre 1 y 3 años',v:[4,4,2,2,3,2,1,1,1,4,2,1,1,4,1,3,4,2,2,3,2,4,4,4,3,2,3,3,3,2,2]},
  {nombre:'ASOCIACIÓN DE RECUPERADORES COLOMBO-VENEZOLANOS CANGREJO AZUL - ASORCOVE',municipio:'Puerto Colombia',alcance:'Local, Intermunicipal, Departamental, Nacional, Internacional',tiempo:'Entre 4 y 5 años',v:[4,4,2,2,4,2,2,2,2,4,2,3,3,4,4,3,4,3,4,4,3,4,4,4,4,4,4,3,4,4,4]},
  {nombre:'ASOCIACIÓN MUJERES ANCLA',municipio:'Puerto Colombia',alcance:'Local',tiempo:'Menos de 1 año',v:[3,4,2,2,4,2,1,1,1,1,4,2,2,2,1,3,2,2,2,3,3,2,2,2,3,3,2,3,3,2,2]},
  {nombre:'FUNDACIÓN BATIS',municipio:'Puerto Colombia',alcance:'Local, Intermunicipal, Departamental, Nacional, Internacional',tiempo:'Entre 6 y 10 años',v:[4,4,2,4,2,3,2,3,3,4,3,4,4,4,4,3,3,3,4,3,3,2,2,2,4,4,4,4,4,3,4]},
  {nombre:'FUNDACIÓN PUERTO COLOMBIA',municipio:'Puerto Colombia',alcance:'Local, Intermunicipal, Departamental, Nacional',tiempo:'Mas de 15 años',v:[4,4,4,4,4,4,4,4,3,3,2,3,2,2,2,3,3,2,2,3,3,2,3,2,4,4,4,4,2,4,4]}
];

const keys = ['v1_1','v1_2','v1_3','v1_4','v1_5','v1_6','v2_1','v2_2','v2_3','v2_4','v2_5','v3_1','v3_2','v3_3','v4_1','v4_2','v4_3','v4_4','v4_5','v5_1','v5_2','v5_3','v5_4','v5_5','v6_1','v6_2','v6_3','v6_4','v7_1','v7_2','v7_3'];

async function importar() {
  for (const o of orgs) {
    const res = await pool.query(
      'INSERT INTO organizaciones (nombre, municipio, alcance, tiempo_existencia) VALUES ($1,$2,$3,$4) RETURNING id',
      [o.nombre, o.municipio, o.alcance, o.tiempo]
    );
    const org_id = res.rows[0].id;
    await pool.query(
      `INSERT INTO diagnostico (org_id,${keys.join(',')}) VALUES ($1,${keys.map((_,i)=>'$'+(i+2)).join(',')})`,
      [org_id, ...o.v]
    );
  }
  console.log('61 organizaciones importadas');
  process.exit(0);
}

importar().catch(e => { console.error(e); process.exit(1); });
