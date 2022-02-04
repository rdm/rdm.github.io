// derived from https://rosettacode.org/wiki/Maze_generation#JavaScript
// todo: use the table display mechanism which was documented there

function genmaze(x,y,target) {
	var n=x*y-1;
	if (n<0) {alert("illegal maze dimensions");return;}
	var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
	    verti =[]; for (var j= 0; j<x+1; j++) verti[j]= [],
	    here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
	    path = [here],
	    unvisited = [];
	for (var j = 0; j<x+2; j++) {
		unvisited[j] = [];
		for (var k= 0; k<y+1; k++) {
			unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
		}
	}
	function step() {
		if (0<n) {
			var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
		    	[here[0]-1, here[1]], [here[0],here[1]-1]];
			var neighbors = [];
			for (var j = 0; j < 4; j++) {
				if (unvisited[potential[j][0]+1][potential[j][1]+1]) {
					neighbors.push(potential[j]);
				}
			}
			if (neighbors.length) {
				n = n-1;
				next= neighbors[Math.floor(Math.random()*neighbors.length)];
				unvisited[next[0]+1][next[1]+1]= false;
				if (next[0] == here[0]) {
					horiz[next[0]][(next[1]+here[1]-1)/2]= true;
				} else {
					verti[(next[0]+here[0]-1)/2][next[1]]= true;
				}
				here= next;
				if (1 < neighbors.length) path.push(here);
			} else {
				here = path.pop();
			}
			setTimeout(step, 100);	
		}
		document.getElementById(target).innerHTML=
			display({x: x, y: y, horiz: horiz, verti: verti, here: here, n: n});
	}
	step();
}
 
function display(m) {
	var text= [];
	for (var j= 0; j<m.x*2+1; j++) {
		var line= [];
		if (0 == j%2) {
			for (var k=0; k<m.y*4+1; k++) {
				if (0 == k%4) {
					line[k]= '+';
				} else {
					if (j>0 && m.verti[j/2-1][Math.floor(k/4)]) {
						line[k]= ' ';
					} else {
						line[k]= '-';
					}
				}
			}
		} else {
			for (var k=0; k<m.y*4+1; k++) {
				if (0<m.n && m.here && m.here[0]*2+1 == j && m.here[1]*4+2 == k) {
					line[k]= '#'
				} else if (0 == k%4) {
					if (k>0 && m.horiz[(j-1)/2][k/4-1]) {
						line[k]= ' ';
					} else {
						line[k]= '|';
					}
				} else {
					line[k]= ' ';
				}
			}
		}
		if (0 == j) line[1]= line[2]= line[3]= ' ';
		if (m.x*2-1 == j) line[4*m.y]= ' ';
		text.push(line.join('')+'\r\n');
	}
	return text.join('');
}
