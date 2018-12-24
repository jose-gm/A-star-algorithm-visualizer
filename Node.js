class Node{
    constructor(i,j,x,y,w,h){
        this.i = i;
        this.j = j;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.f = 0;
        this.g = 0;
        this.he = 0;
        this.isAWall = false;
        this.parent;
        this.adjacents = [];

        if(Math.random() < 0.4)
            this.isAWall = true;

        this.draw = function(context, color){       
            context.fillStyle = (this.isAWall) ? "black" : color;
            context.fillRect(this.x,this.y,this.w-1,this.h-1);
            context.strokeRect(this.x,this.y,this.w-1,this.h-1);
           
        }
    }

    addAdjacentNode(nodes, cols, rows){
        if(this.i < cols-1){ this.adjacents.push(nodes[this.i+1][this.j]); }
        if(this.j < rows-1){ this.adjacents.push(nodes[this.i][this.j+1]); }
        if(this.i > 0){ this.adjacents.push(nodes[this.i-1][this.j]); }
        if(this.j > 0){ this.adjacents.push(nodes[this.i][this.j-1]); }
        
        if(this.i > 0 && this.j > 0){ this.adjacents.push(nodes[this.i-1][this.j-1]); }
        if(this.i > 0 && this.j < rows-1){ this.adjacents.push(nodes[this.i-1][this.j+1]); }
        if(this.i < cols-1 && this.j > 0){ this.adjacents.push(nodes[this.i+1][this.j-1]); }
        if(this.i < cols-1 && this.j < rows-1){ this.adjacents.push(nodes[this.i+1][this.j+1]); }
    }
}