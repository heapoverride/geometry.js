# drawing.js
Some useful structures for graphics programming in JavaScript I guess...

### Structures included
- [x] **Point** `(x, y)`
- [x] **Size** `(width, height)`
- [x] **Rectangle** `(point, size)`
- [x] **Circle** `(Point, radius)`
- [x] **Point3D** `(x, y, z)`
- [x] **Size3D** `(width, height, depth)`
- [x] **Cube** `(Point3D, Size3D)`
- [ ] **Sphere** 

### Some examples
Get angle between two points in degrees
```javascript
var a = new Point(0, 0);
var b = new Point(40, 40);
console.log(a.angleTo(b).degrees);
```

Get distance between two points
```javascript
var a = new Point(50, 50);
var b = new Point(100, 400);
console.log(a.distanceTo(b));
```

Determine if a rectangle is completely inside another rectangle
```javascript
var a = new Rectangle(new Point(0, 0), new Size(20, 15));
var b = new Rectangle(new Point(5, 5), new Size(10, 8));
console.log(b.isInside(a));
```

Determine if two circles intersect
```javascript
var a = new Circle(new Point(-20, -20), 40);
var b = new Circle(new Point(50, 50), 90);
console.log(b.intersectsWith(a));
```

Determine if two cubes intersect
```javascript
var a = new Cube(new Point3D(0, 0, 0), new Size3D(200, 50, 50));
var b = new Cube(new Point3D(100, 0, 0), new Size3D(200, 50, 50));
console.log(a.intersectsWith(b));
```

Get distance between two points in 3d space
```javascript
var a = new Point3D(0, 0, 0);
var b = new Point3D(100, 100, 100);
console.log(a.distanceTo(b));
```
