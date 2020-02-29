# drawing.js
Some useful structures for graphics programming in JavaScript I guess...

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
var a = new Rectangle(0, 0, 20, 15);
var b = new Rectangle(5, 5, 10, 8);
console.log(b.isInside(a));
```

Determine if a two circles intersect
```javascript
var a = new Circle(-20, -20, 40);
var b = new Circle(50, 50, 90);
console.log(b.intersectsWith(a));
```
