class Node{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.f = 0;
        this.g = 0;
        this.he = 0;
        this.parent;
        this.adjacents = [];
        this.draw = function(context, color){       
            context.fillStyle = color;
            context.fillRect(this.x * wi,this.y * he,this.w-1,this.h-1);
            context.strokeRect(this.x * wi,this.y * he,this.w-1,this.h-1);
           
        }
    }

    addAdjacentNode(nodes, cols, rows){
        if(this.x < cols-1){ this.adjacents.push(nodes[this.x+1][this.y]); }
        if(this.y < rows-1){ this.adjacents.push(nodes[this.x][this.y+1]); }
        if(this.x > 0){ this.adjacents.push(nodes[this.x-1][this.y]); }
        if(this.y > 0){ this.adjacents.push(nodes[this.x][this.y-1]); }
    }
}