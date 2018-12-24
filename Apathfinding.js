let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let wi;
let he;

let cols = 25;
let rows = 25;
let nodes;

let openSet;
let closedSet;
var path;

let goal;

let reqId;

function constructPath(current){
    path = [];
    var p = current;
    path.push(p);
    while(p.parent){
        path.push(p.parent);
        p = p.parent;
    }
}

function heuristic(nodeA, nodeB){
    //Manhattan distance
    //(Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y));
    return Math.sqrt(Math.pow(nodeA.x - nodeB.x,2) + Math.pow(nodeA.y - nodeB.y,2));
}

function remove(array, value){
    for(let i=array.length-1; i>=0; i--){
        if(array[i] == value)
            array.splice(i,1);
    }
}

function setup(){
    wi = canvas.width/cols;
    he = canvas.height/rows;
    openSet = [];
    closedSet = [];

    nodes = new Array(cols);

    for(let i=0; i<cols; i++){
        nodes[i] = new Array(rows);
    }

    for(let x=0; x<cols; x++){
        for(let y=0; y<rows; y++){
            nodes[x][y] = new Node(x, y, x * wi, y * he, wi,he);
        }
    }

    for(let x=0; x<cols; x++){
        for(let y=0; y<rows; y++){
            nodes[x][y].addAdjacentNode(nodes,cols,rows);
        }
    }

    goal = nodes[cols-1][rows-1];

    nodes[0][0].isAWall = false;
    goal.isAWall = false;

    for(let x=0; x<cols; x++){
        for(let y=0; y<rows; y++){
            nodes[x][y].draw(context,"white");
        }
    }
 
    openSet.push(nodes[0][0]);
}

function render(){
    reqId = requestAnimationFrame(render);

    if(openSet.length > 0){
        let index = 0;
        for(let i=0; i<openSet.length; i++){
            if(openSet[i].f < openSet[index].f){
                index = i;
            }
        }

        var current = openSet[index];

        if(current === goal){  
            console.log(path.length);
            cancelAnimationFrame(reqId);
        }
        
        remove(openSet,current);
        closedSet.push(current);

        //checking adjacents nodes of the current node.
        for(let i=0; i<current.adjacents.length; i++){
            //console.log("entro a vecinos");

            let adjacent = current.adjacents[i];
            
            if(closedSet.includes(adjacent) || adjacent.isAWall)
                continue;

            //Distance from current to adjacent node..
            let tentativeGscore = current.g + heuristic(adjacent,current);
            //let tentativeGscore = current.g + 1;

            if(!openSet.includes(adjacent))
                openSet.push(adjacent);
            else if(tentativeGscore >= adjacent.g)
                continue;

            adjacent.parent = current;
            adjacent.g = tentativeGscore;
            adjacent.f = adjacent.g + heuristic(adjacent,goal);
            
        }
    }
    else{
        console.log("No path");
        cancelAnimationFrame(reqId);
        return;
    }

    for(let i=0; i<openSet.length; i++)
        openSet[i].draw(context,"green");

    for(let j=0; j<closedSet.length; j++)
        closedSet[j].draw(context,"red");

    constructPath(current);

    for(let i=0; i<path.length; i++)
        path[i].draw(context,"yellow");

}

setup();
//render();