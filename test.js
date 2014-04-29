/*global Isomer*/
'use strict';

var iso = new Isomer(document.getElementById("canvas"));
var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Color = Isomer.Color;
var Path = Isomer.Path;

var color1 = new Color(84, 162, 144);
var color2 = new Color(97, 136, 137);
var color3 = new Color(172, 120, 119);
var color4 = new Color(230, 89, 102);
var color5 = new Color(243, 132, 89);

function randomColor() {
    return new Color(
        parseInt(Math.random() * 256),
        parseInt(Math.random() * 256),
        parseInt(Math.random() * 256)
    );
}

/**
 * Draws an octohedron contained in a 1x1 cube location at origin
 */
function Octohedron(origin) {
  /* Declare the center of the shape to make rotations easy */
    var center = origin.translate(0.5, 0.5, 0.5);
    var faces = [];

  /* Draw the upper triangle /\ and rotate it */
    var upperTriangle = new Path([
        origin.translate(0, 0, 0.5),
        origin.translate(0.5, 0.5, 1),
        origin.translate(0, 1, 0.5)
    ]);

    var lowerTriangle = new Path([
        origin.translate(0, 0, 0.5),
        origin.translate(0, 1, 0.5),
        origin.translate(0.5, 0.5, 0)
    ]);

  for (var i = 0; i < 4; i++) {
    faces.push(upperTriangle.rotateZ(center, i * Math.PI / 2));
    faces.push(lowerTriangle.rotateZ(center, i * Math.PI / 2));
  }

  /* We need to scale the shape along the x & y directions to make the
   * sides equilateral triangles */
  return new Shape(faces).scale(center, Math.sqrt(2)/2, Math.sqrt(2)/2, 1);
}


//Base
iso.add(Shape.Prism(new Point(0, 0, -0.5), 3, 2.5, 0.5), new Color(180, 50, 60));
//6
iso.add(Shape.Prism(new Point(0.5, 2, 1), 0.5, 0.5, 2.5), color1);
//7
iso.add(Shape.Prism(new Point(0.5, 1.5, 1), 0.5, 0.5, 3), color3);
//8
iso.add(Shape.Prism(new Point(0, 0.5, 1), 0.5, 0.5, 4), color5);
//9
iso.add(Shape.Prism(new Point(0, 0, 0), 0.5, 0.5, 5.5), color4);
//10
iso.add(Shape.Prism(new Point(0, -0.5, 0.5), 0.5, 0.5, 5.5), color2);

iso.add(Shape.Prism(new Point(0, 2, 0), 0.5, 0.5, 3), color5);
iso.add(Shape.Prism(new Point(0, 1.5, 0), 0.5, 0.5, 2.5), color4);
iso.add(Shape.Prism(new Point(0, 1, 0), 0.5, 0.5, 2), color1);
iso.add(Shape.Prism(new Point(0, 0.5, 0), 0.5, 0.5, 1.5), color2);
//1
iso.add(Shape.Prism(new Point(0, 0, 0), 0.5, 0.5, 1), color3);


/* Rotation angle for our centerpiece 
var angle = 0;
function scene() {



  iso.add(Octohedron(new Point(3, 2, 3.2))
   .rotateZ(new Point(3.5, 2.5, 0), angle)
   , new Color(0, 180, 180));

  angle += 2 * Math.PI / 60;
}
*/

setInterval(scene, 1000 / 30);
