import * as THREE from './three/three.js';

import { GLTFLoader } from './three/GLTFLoader.js';

//const GLTFLoader = require('node-html-parser');

//#region 3DMODEL

/* export function Import_Model(ModelName){
    const loader = new GLTFLoader();
    loader.load('./model/'+ModelName+'/scene.gltf', gltf => {
        let Object_3d = gltf.scene     
        console.log("Model is good to go")
        return Object_3d
    }, undefined, function (error) {

        console.error(error);


    });} */

 export async function Import_Model(ModelName) {
        const loader = new GLTFLoader();
      
        // Wrap the loader in a Promise to handle asynchronous loading
        console.log("Loading models....")
        return new Promise((resolve, reject) => {
          loader.load(
            './model/'+ModelName+'/scene.gltf',
            (gltf) => {
              resolve(gltf); // Resolve the promise with the loaded model
            },
            undefined, // onProgress callback (optional)
            (error) => {
              reject(error); // Reject the promise if there's an error
            }
          );
        });
      }
      
    //#endregion 3DMODEL

    

const maxPoints = 10000; // Limit points to avoid performance issues
export function updatePathLine2(index, Sphere1_Name, Sphere1, pathGeometry, pathLine, Scale,origin) {
    let pathPositions = [];
    //index,"artemis",orion,pathGeometry_Orion,connectLine_Orion
    if (origin){
     console.log("ORIGION: "+String(origin)+" index: "+String(index))   
    }
    else{
        origin = 0
    }
    for (let j = origin; j <= index; j++) {

        pathPositions.push(
            new THREE.Vector3(
                artemisData[j][Sphere1_Name + "_p_x"] * Scale,
                artemisData[j][Sphere1_Name + "_p_y"] * Scale,
                artemisData[j][Sphere1_Name + "_p_z"] * Scale
            )
        );
    }
    pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPositions);
return pathGeometry
}

function updateConnectionLine(Sphere1, Sphere2, connectionLine) {
    const positions = connectionLine.geometry.attributes.position.array;

    // Set Earth's position (first point)
    positions[0] = Sphere2.position.x;
    positions[1] = Sphere2.position.y;
    positions[2] = Sphere2.position.z;

    // Set Orion's position (second point)
    positions[3] = Sphere1.position.x;
    positions[4] = Sphere1.position.y;
    positions[5] = Sphere1.position.z;

    connectionLine.geometry.attributes.position.needsUpdate = true;
}

function updatePathLine1(Sphere1, Sphere2, pathGeometry, currentPoint, maxPoints) {
    const positionAttribute = pathGeometry.attributes.position;
    positionAttribute.setXYZ(
        currentPoint,
        Sphere1.position.x,
        Sphere1.position.y,
        Sphere1.position.z
    );

    currentPoint = (currentPoint + 1) % maxPoints; // Loop back if max reached
    positionAttribute.needsUpdate = true;
    return currentPoint
}
//DO NOT USE
function Update(Sphere1, Sphere2, pathGeometry, currentPoint, maxPoints, connectionLine) {
    let Next_Count = updatePathLine(Sphere1, Sphere2, pathGeometry, currentPoint, maxPoints)

    updateConnectionLine(Sphere1, Sphere2, connectionLine)
    return Next_Count
}

export function Line(Main_Scene, Colors, Sphere1, Sphere2) {
    let pathGeometry = new THREE.BufferGeometry();
    const pathMaterial = new THREE.LineBasicMaterial({ color: Colors });

    let connectionLine = new THREE.Line(pathGeometry, pathMaterial);
    Main_Scene.add(connectionLine);
    let pathPositions = new THREE.Vector3(0, 0, 0);
    connectionLine.geometry = new THREE.BufferGeometry().setFromPoints(pathPositions);

    return [connectionLine, pathGeometry];

};

let count = 0;
let max = 1000;

function velocity_vector(vx, vy, vz) {
    return Math.sqrt(vx * vx + vy * vy + vz * vz);
}
const antennas = {
    DSS24: 34,
    DSS34: 34,
    DSS54: 34,
    WPSA: 12,
};
function linkBudget(dr, R) {
    const pt = 10;
    const gt = 9;
    const losses = 19.43;
    const gse = 0.55
    const light = 0.136363636;
    const kb = -228.6;
    const ts = 222;
    let pi = Math.PI

    return Math.round(Math.pow(10,
        1 / 10 *
        (
            pt + gt - losses + 10 *
            Math.log10(gse * Math.pow(pi * dr / light, 2)) -
            20 * Math.log10(4000 * pi * R / light) -
            kb -
            10 * Math.log10(ts)
        )
    ) / 1000);


}

export function GetLink_budget_From_int(Index,Extra) {
    // vectors
    let someData = '';

    let row = artemisData[Index]
    let vector = velocity_vector(row[Extra+"artemis_v_x"], row[Extra+"artemis_v_y"], row[Extra+"artemis_v_z"]);
    // links
    let link1 = row.ds24_range == '' ? -1 : linkBudget(antennas.DSS24, row.ds24_range);
    let link2 = row.ds34_range == '' ? -1 : linkBudget(antennas.DSS34, row.ds34_range);
    let link3 = row.ds54_range == '' ? -1 : linkBudget(antennas.DSS54, row.ds54_range);
    let link4 = row.wpsa_range == '' ? -1 : linkBudget(antennas.WPSA, row.wpsa_range);


    if (link1 > 10000) {
        link1 = 10000;
    }
    if (link2 > 10000) {
        link2 = 10000;
    }
    if (link3 > 10000) {
        link3 = 10000;
    }
    if (link4 > 10000) {
        link4 = 10000;
    }

    if (link1 = -1) {
        
    }

    const MaxBudget = [
        { antennaName: 'DS24', baud: link1  },
        { antennaName: 'DS34', baud: link2 },
        { antennaName: 'DS54', baud: link3 },
        { antennaName: 'WPSA', baud: link4 }
    ];


    const domObjects = {
        'DS24': document.getElementById('DS24-on-mission'),
        'DS34': document.getElementById('DS34-on-mission'),
        'DS54': document.getElementById('DS54-on-mission'),
        'WPSA': document.getElementById('WPSA-on-mission'),
    };


    const domObjects2 = {
        'DS24': document.getElementById('DS24-on-mission2'),
        'DS34': document.getElementById('DS34-on-mission2'),
        'DS54': document.getElementById('DS54-on-mission2'),
        'WPSA': document.getElementById('WPSA-on-mission2'),
    };

    

    MaxBudget.sort(
        function (linkA, linkB) {
            if (linkA.baud < linkB.baud) {
                return 1;
            }


            if (linkA.baud > linkB.baud) {
                return -1;
            }
            return 0;

        }
    )

    for (const eachAntenna of MaxBudget ){
        domObjects[eachAntenna.antennaName].className = eachAntenna.baud == -1 ? 'antenna-off' : 'antenna-on';
        domObjects[eachAntenna.antennaName].getElementsByTagName('td')[1].innerText = eachAntenna.baud == -1 ? '' : eachAntenna.baud + ' kbps';
     }

    domObjects[MaxBudget[0].antennaName].className = 'antenna-chosen'; 

    
    for (const eachAntenna2 of MaxBudget ){
        domObjects2[eachAntenna2.antennaName].className = eachAntenna2.baud == -1 ? 'antenna-off' : 'antenna-on';
        domObjects2[eachAntenna2.antennaName].getElementsByTagName('td')[1].innerText = eachAntenna2.baud == -1 ? '' : eachAntenna2.baud + ' kbps';

    }
    domObjects2[MaxBudget[0].antennaName].className = 'antenna-chosen'; 



    const highestLink = MaxBudget[0];


    // display
    someData =
        '<b> Time: </b>' + row.time + '</br>' +
        '<b>Link Budget (DSS34): </b>' + link2 + '</br>' +
        '<b>Link Budget (DSS54): </b>' + link3 + '</br>' +
        '<b>Link Budget (WPSA): </b>' + link4 + '</br>' +
        '<b> Highest Link Budget: </b>' + highestLink.baud + '</br>' +
        '<b> Highest Antenna: </b>' + highestLink.antennaName + '</br>'
    return [highestLink, link1, link2, link3, link4]
}