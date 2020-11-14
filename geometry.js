/* Author: @UnrealSec */

class Size {
    width = 0; height = 0;

    /**
    * Create new Size
    * @param {number} width
    * @param {number} height
    */
    constructor(width=0, height=0) {
        this.width = width;
        this.height = height;
    }

    get Width() { return this.width; } set Width(width) { this.width = width; }
    get Height() { return this.height; } set Height(height) { this.height = height; }
    
    copy() { return Object.assign(new Size(), this); }

    toString() {
        return `Size(Width = ${Math.round(this.width)}, Height = ${Math.round(this.height)})`;
    }
}

class Point {
    x = 0; y = 0;

    /**
    * Create new Point
    * @param {number} x
    * @param {number} y
    */
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    get X() { return this.x; } set X(x) { this.x = x; }
    get Y() { return this.y; } set Y(y) { this.y = y; }

    /**
    * Get distance between this Point and another Point
    * @param {Point} point
    * @returns {number}
    */
    distanceTo(point) {
        let a = this;
        let b = point;
        
        let distance = Math.sqrt(Math.pow(b.X-a.X, 2) + Math.pow(b.Y-a.Y, 2));
        
        return distance;
    }
    
    /**
    * Move this Point
    * @param {number} x
    * @param {number} y
    */
    move(x, y) {
        this.x += x;
        this.y += y;
    }

    /**
    * Get angle between this Point and another Point in radians and degrees
    * @param {Point} point
    * @returns {object} radians, degrees
    */
    angleTo(point) {
        let r = Math.atan2(point.Y - this.Y, point.X - this.X);
        let d = r * (180/Math.PI);
        return {radians: r, degrees: d};
    }

    /**
    * Return new point at n degrees and n steps away from this Point
    * @param {number} angle Angle in degrees
    * @param {number} steps
    * @returns {Point}
    */
    pointAtDegreesSteps(angle, steps) {
        let a = this;
        let b = new Point(steps*Math.cos(angle*Math.PI/180), steps*Math.sin(angle*Math.PI/180));
        return a.add(b);
    }

    /**
    * Test if this Point is inside a Rectangle, Circle or a Polygon
    * @param {Object} obj Rectangle|Circle|Polygon
    * @returns {boolean}
    */
    isInside(obj) {
        let a = this;
        let b = obj;
        let inside = false;
        
        if (b instanceof Rectangle) {
            
            // test if this point is inside a rectangle
            if ((a.X >= b.X && a.X <= b.X+b.Width) &&
                (a.Y >= b.Y && a.Y <= b.Y+b.Height)) {
                return true;
            }

        } else if (b instanceof Circle) {

            // test if this point is inside a circle
            let c = new Circle(this, 0);
            return c.isInside(b);
            
        } else if (b instanceof Polygon) {
            
            // test if this point is inside a polygon
            let vs = b.Points;
            for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                let xi = vs[i].X, yi = vs[i].Y;
                let xj = vs[j].X, yj = vs[j].Y;
                let intersect = ((yi > a.Y) != (yj > a.Y))
                    && (a.X < (xj - xi) * (a.Y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
            return inside;
            
        }

        return false;
    }

    /**
    * Rotate this point n degrees around specified central Point
    * @param {Point} point
    * @param {number} angle Angle in degrees
    * @returns {Point}
    */
    rotate(point, angle) {
        let rad = (Math.PI/180)*angle,
            cx = point.X,
            cy = point.Y,
            cos = Math.cos(rad),
            sin = Math.sin(rad),
            nx = (cos*(this.X-cx)) + (sin*(this.Y-cy)) + cx,
            ny = (cos*(this.Y-cy)) - (sin*(this.X-cx)) + cy;

        this.X = nx;
        this.Y = ny;

        return this;
    }

    /**
    * Dot product for this Point and another Point
    * @param {Point} point
    * @returns {number}
    */
    dot(point) {
        let a = this;
        let b = point;
        return a.X * b.X+a.Y * b.Y;
    }

    /**
    * Signed area of a parallelogram with vectors as side lengths. Half of this is the area of a triangle (cross product)
    * @param {Point} point
    * @returns {number}
    */
    cross(point) {
        let a = this;
        let b = point;
        return a.X*b.Y - a.Y*b.X;
    }

    add(point){
        let a = this;
        let b = point;
        return new Point(a.X + b.X, a.Y + b.Y);
    }
    subtract(point){
        let a = this;
        let b = point;
        return new Point(a.X-b.X, a.Y-b.Y);
    }
    scale(factor) {
        return new Point(factor*this.X, factor*this.Y);
    }
    length() {
        return Math.sqrt(this.dot(this));
    }

    /**
    * Creates new Point along the segment n units from this Point towards another Point
    * @param {Point} point
    * @param {number} units
    */
    pointAt(point, units) {
        let a = this;
        let b = point;
        return a.add((b.subtract(a)).scale(units/(b.subtract(a)).length()));
    }

    copy() { return Object.assign(new Point(), this); }

    toString() {
        return `Point(X = ${Math.round(this.X)}, Y = ${Math.round(this.Y)})`;
    }
}

class Size3D {
    width = 0; height = 0; depth = 0;

    /**
    * Create new Size3D
    * @param {number} width
    * @param {number} height
    * @param {number} depth
    */
    constructor(width=0, height=0, depth=0) {
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    get Width() { return this.width; } set Width(width) { this.width = width; }
    get Height() { return this.height; } set Height(height) { this.height = height; }
    get Depth() { return this.depth; } set Depth(depth) { this.depth = depth; }
    
    copy() { return Object.assign(new Size3D(), this); }

    toString() {
        return `Size3D(Width = ${Math.round(this.Width)}, Height = ${Math.round(this.Height)}, Depth = ${Math.round(this.Depth)})`;
    }
}

class Point3D {
    x = 0; y = 0; z = 0;

    /**
    * Create new Point3D
    * @param {number} x
    * @param {number} y
    * @param {number} z
    */
    constructor(x=0, y=0, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get X() { return this.x; } set X(x) { this.x = x; }
    get Y() { return this.y; } set Y(y) { this.y = y; }
    get Z() { return this.z; } set Z(z) { this.z = z; }

    /**
    * Get distance between this Point3D and another Point3D
    * @param {Point3D} point
    * @returns {number}
    */
    distanceTo(point) {
        let a = this;
        let b = point;
        
        let distance = Math.sqrt(Math.pow(b.X-a.X, 2) + Math.pow(b.Y-a.Y, 2) + Math.pow(b.Z-a.Z, 2));
        
        return distance;
    }

    /**
    * Get angle between this Point3D and another Point3D in radians and degrees
    * @param {Point3D} point
    * @returns {object} radians, degrees
    */
    angleTo(point) {
        let r = Math.atan2(point.Y - this.Y, point.X - this.X);
        let d = r * (180/Math.PI);
        return {radians: r, degrees: d};
    }

    /**
    * Get angle between this Point3D and another Point3D in radians and degrees (XY plane)
    * @param {Point3D} point
    * @returns {object} radians, degrees
    */
    angleToXY(point) {
        return this.angleTo(point);
    }

    /**
    * Get angle between this Point3D and another Point3D in radians and degrees (YZ plane)
    * @param {Point3D} point
    * @returns {object} radians, degrees
    */
    angleToYZ(point) {
        let r = Math.atan2(point.Y - this.Y, point.Z - this.Z);
        let d = r * (180/Math.PI);
        return {radians: r, degrees: d};
    }

    /**
    * Get angle between this Point3D and another Point3D in radians and degrees (XZ plane)
    * @param {Point3D} point
    * @returns {object} radians, degrees
    */
    angleToXZ(point) {
        let r = Math.atan2(point.X - this.X, point.Z - this.Z);
        let d = r * (180/Math.PI);
        return {radians: r, degrees: d};
    }

    /**
    * Test if this Point3D is inside a Cube
    * @param {Cube} cube
    * @returns {boolean}
    */
    isInside(cube) {
        let a = this;
        let b = cube;

        if ((a.X >= b.X && a.X <= b.X+b.Width) &&
            (a.Y >= b.Y && a.Y <= b.Y+b.Height) &&
            (a.Z >= b.Z && a.Z <= b.Z+b.Width)) {
            return true;
        }

        return false;
    }
    
    /**
    * Move this Point3D
    * @param {number} x
    * @param {number} y
    * @param {number} z
    */
    move(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
    }

    /**
    * Dot product for this Point3D and another Point3D
    * @param {Point3D} point
    * @returns {number}
    */
    dot(point) {
        let a = this;
        let b = point;
        return a.X * b.X+a.Y * b.Y+a.Z * b.Z;
    }

    add(point){
        let a = this;
        let b = point;
        return new Point3D(a.X + b.X, a.Y + b.Y, a.Z + b.Z);
    }
    subtract(point){
        let a = this;
        let b = point;
        return new Point3D(a.X-b.X, a.Y-b.Y, a.Z-b.Z);
    }
    scale(factor) {
        return new Point3D(factor*this.X, factor*this.Y, factor*this.Z);
    }
    length() {
        return Math.sqrt(this.dot(this));
    }
    cross(point) {
        let a = this;
        let b = point;
        return new Point3D(a.Y*b.Z - a.Z*b.Y, b.Z*b.X - a.X*b.Z, a.X*b.Y - a.Y*b.X);
    }

    copy() { return Object.assign(new Point3D(), this); }

    toString() {
        return `Point3D(X = ${Math.round(this.X)}, Y = ${Math.round(this.Y)}, Z = ${Math.round(this.Z)})`;
    }
}

class Line {
    point_a = null;
    point_b = null;

    /**
    * Create new Line
    * @param {Point} a
    * @param {Point} b
    */
    constructor(a, b) {
        this.point_a = a;
        this.point_b = b;
    }

    get A() { return this.point_a; } set A(point) { this.point_a = point; }
    get B() { return this.point_b; } set B(point) { this.point_b = point; }

    /**
    * Get Line's length (distance between point A and B)
    * @returns {number}
    */
    length() {
        return this.point_a.distanceTo(this.point_b);
    }

    /**
    * Test if this Line intersects with another Line
    * @param {Line} line
    * @returns {boolean}
    */
    intersectsWith(line) {
        let a = this;
        let b = line;

        let det = (a.B.X - a.A.X) * (b.B.Y - b.A.Y) - (b.B.X - b.A.X) * (a.B.Y - a.A.Y);
        if (det === 0) {
            return false;
        } else {
            let lambda = ((b.B.Y - b.A.Y) * (b.B.X - a.A.X) + (b.A.X - b.B.X) * (b.B.Y - a.A.Y)) / det;
            let gamma = ((a.A.Y - a.B.Y) * (b.B.X - a.A.X) + (a.B.X - a.A.X) * (b.B.Y - a.A.Y)) / det;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    }

    /**
    * Get angle between Line's two points in radians and degrees
    * @returns {object} radians, degrees
    */
    angle() {
        return this.point_a.angleTo(this.point_b);
    }
    
    /**
    * Rotate this Line n degrees around specified central Point
    * @param {Point} point
    * @param {number} angle Angle in degrees
    * @returns {Line}
    */
    rotate(point, angle) {
        this.point_a.rotate(point, angle);
        this.point_b.rotate(point, angle);
        return this;
    }

    /**
    * Get n number of points along this line
    * @param {number} n
    * @returns {...Point}
    */
    getPoints(n) {
        const points = [];
        const length = this.length();
        const step = length/n;

        for (let i=0; i<length; i+=step) {
            points.push(this.point_a.pointAt(this.point_b, i));
        }

        return points;
    }
    
    /**
    * Move this Line
    * @param {number} x
    * @param {number} y
    */
    move(x, y) {
        this.point_a.move(x, y);
        this.point_b.move(x, y);
    }

    copy() { return new Line(this.point_a.copy(), this.point_b.copy()); }

    toString() {
        return `Line(A = ${this.A}, B = ${this.B}, length = ${Math.round(this.length())}, angle = ${Math.round(this.angle())})`;
    }
}

class Line3D {
    point_a = null;
    point_b = null;

    /**
    * Create new Line3D
    * @param {Point3D} a
    * @param {Point3D} b
    */
    constructor(a, b) {
        this.point_a = a;
        this.point_b = b;
    }

    get A() { return this.point_a; } set A(point) { this.point_a = point; }
    get B() { return this.point_b; } set B(point) { this.point_b = point; }

    /**
    * Get Line's length (distance between point A and B)
    * @returns {number}
    */
    length() {
        return this.point_a.distanceTo(this.point_b);
    }
    
    /**
    * Move this Line3D
    * @param {number} x
    * @param {number} y
    */
    move(x, y, z) {
        this.point_a.move(x, y, z);
        this.point_b.move(x, y, z);
    }

    copy() { return new Line(this.point_a.copy(), this.point_b.copy()); }

    toString() {
        return `Line3D(A = ${this.A}, B = ${this.B}, length = ${Math.round(this.length())})`;
    }
}

class Rectangle {
    point = null; size = null;

    /**
    * Create new Rectangle
    * @param {Point} point
    * @param {Size} size
    */
    constructor(point, size) {
        this.point = point;
        this.size = size;
    }

    get X() { return this.point.X; } set X(x) { this.point.X = x; }
    get Y() { return this.point.Y; } set Y(y) { this.point.Y = y; }
    get Width() { return this.size.Width; } set Width(width) { this.size.Width = width; }
    get Height() { return this.size.Height; } set Height(height) { this.size.Height = height; }
    get Point() { return this.point; } set Point(point) { this.point = point; }
    get Size() { return this.size; } set Size(size) { this.size = size; }

    /**
    * Test if this Rectangle intersects with another Rectangle
    * @param {Rectangle} rect
    * @returns {boolean}
    */
    intersectsWith(rect) {
        let a = this;
        let b = rect;

        if (((a.X >= b.X && a.X <= b.X+b.Width) || 
            (b.X >= a.X && b.X <= a.X+a.Width)) &&
            ((a.Y >= b.Y && a.Y <= b.Y+b.Height) || 
            (b.Y >= a.Y && b.Y <= a.Y+a.Height))) {
            return true;
        }

        return false;
    }

    /**
    * Test if this Rectangle is inside another Rectangle
    * @param {Rectangle} rect
    * @returns {boolean}
    */
    isInside(rect) {
        let a = this;
        let b = rect;

        if ((a.Y >= b.Y && a.Y+a.Height <= b.Y+b.Height) &&
            (a.X >= b.X && a.X+a.Width <= b.X+b.Width)) {
            return true;
        }

        return false;
    }
    
    /**
    * Move this Rectangle
    * @param {number} x
    * @param {number} y
    */
    move(x, y) {
        this.point.move(x, y);
    }

    copy() { return new Rectangle(this.point.copy(), this.size.copy()); }

    toString() {
        return `Rectangle(Point = ${this.Point}, Size = ${this.Size})`;
    }
}

class Circle {
    point = null; radius = 0;

    /**
    * Create new Circle
    * @param {Point} point
    * @param {number} radius
    */
    constructor(point, radius=0) {
        this.point = point;
        this.radius = radius;
    }

    get X() { return this.point.X; } set X(x) { this.point.X = x; }
    get Y() { return this.point.Y; } set Y(y) { this.point.Y = y; }
    get Point() { return this.point; } set Point(point) { this.point = point; }
    get Radius() { return this.radius; } set Radius(r) { this.radius = r; }

    /**
    * Get distance from this Circle's center point to another Circle's center point
    * @param {Circle} circle
    * @returns {number}
    */
    distanceTo(circle) {
        let a = this;
        let b = circle;

        let distance = Math.sqrt(Math.pow(b.X-a.X, 2) + Math.pow(b.Y-a.Y, 2));
        
        return distance;
    }

    /**
    * Get n number of Points on this Circle
    * @param {number} n Amount of Points to return
    * @returns {...Point}
    */
    getPoints(n=360) {
        let step = 2*Math.PI/n;
        let points = [];

        for (let theta=0; theta < 2*Math.PI; theta+=step) {
            points.push(new Point(this.X + this.radius*Math.cos(theta), this.Y - this.radius*Math.sin(theta)));
        }

        return points;
    }
    
    /**
    * Get Point at n degrees on this Circle
    * @param {number} angle Angle in degrees
    * @returns {Point}
    */
    getPoint(angle=0) {
        return this.point.pointAtDegreesSteps(angle, this.radius);
    }

    /**
    * Test if this Circle is inside another Circle
    * @param {Circle} circle
    * @returns {boolean}
    */
    isInside(circle) {
        let distance = this.distanceTo(circle);
        if (distance+this.Radius <= circle.Radius) {
            return true;
        }
        return false;
    }

    /**
    * Test if this Circle intersects with another Circle
    * @param {Circle} circle
    * @returns {boolean}
    */
    intersectsWith(circle) {
        let distance = this.distanceTo(circle);
        let radius_sum = this.Radius+circle.Radius;

        if (radius_sum > distance) {
            return true;
        }

        return false;
    }
    
    /**
    * Move this Circle
    * @param {number} x
    * @param {number} y
    */
    move(x, y) {
        this.point.move(x, y);
    }

    copy() { return new Circle(this.point.copy(), this.radius); }

    toString() {
        return `Circle(Point = ${this.Point}, Radius = ${this.Radius})`;
    }
}

class Cube {
    point = null; size = null;

    /**
    * Create new Cube
    * @param {Point3D} point
    * @param {Size3D} size
    */
    constructor(point, size) {
        this.point = point;
        this.size = size;
    }

    get X() { return this.point.X; } set X(x) { this.point.X = x; }
    get Y() { return this.point.Y; } set Y(y) { this.point.Y = y; }
    get Z() { return this.point.Z; } set Z(z) { this.point.Z = z; }
    get Width() { return this.size.Width; } set Width(width) { this.size.Width = width; }
    get Height() { return this.size.Height; } set Height(height) { this.size.Height = height; }
    get Depth() { return this.size.Depth; } set Depth(depth) { this.size.Depth = depth; }
    get Point3D() { return this.point; } set Point3D(point) { this.point = point; }
    get Size3D() { return this.size; } set Size3D(size) { this.size = size; }

    /**
    * Test if this Cube intersects with another Cube
    * @param {Cube} cube
    * @returns {boolean}
    */
    intersectsWith(cube) {
        let a = this;
        let b = cube;

        if (((a.X >= b.X && a.X <= b.X+b.Width) || 
            (b.X >= a.X && b.X <= a.X+a.Width)) &&
            ((a.Y >= b.Y && a.Y <= b.Y+b.Height) || 
            (b.Y >= a.Y && b.Y <= a.Y+a.Height)) &&
            ((a.Z >= b.Z && a.Z <= b.Z+b.Depth) || 
            (b.Z >= a.Z && b.Z <= a.Z+a.Depth))) {
            return true;
        }

        return false;
    }

    /**
    * Test if this Cube is inside another Cube
    * @param {Cube} cube
    * @returns {boolean}
    */
    isInside(cube) {
        let a = this;
        let b = cube;

        if ((a.X > b.X && a.X+a.Width < b.X+b.Width) &&
            (a.Y > b.Y && a.Y+a.Height < b.Y+b.Height) &&
            (a.Z > b.Z && a.Z+a.Depth < b.Z+b.Depth)) {
            return true;
        }

        return false;
    }
    
    /**
    * Move this Cube
    * @param {number} x
    * @param {number} y
    * @param {number} z
    */
    move(x, y, z) {
        this.point.move(x, y, z);
    }

    copy() { return new Circle(this.point.copy(), this.size.copy()); }

    toString() {
        return `Cube(Point3D = ${this.Point3D}, Size3D = ${this.Size3D})`;
    }
}

class Sphere {
    point = null; radius = 0;

    /**
    * Create new Sphere
    * @param {Point} point
    * @param {number} radius
    */
    constructor(point, radius=0) {
        this.point = point;
        this.radius = radius;
    }

    get X() { return this.point.X; } set X(x) { this.point.X = x; }
    get Y() { return this.point.Y; } set Y(y) { this.point.Y = y; }
    get Z() { return this.point.Z; } set Z(z) { this.point.Z = z; }
    get Point3D() { return this.point; } set Point3D(point) { this.point = point; }
    get Radius() { return this.radius; } set Radius(r) { this.radius = r; }

    /**
    * Get distance from this Sphere's center point to another Sphere's center point
    * @param {Sphere} sphere
    * @returns {number}
    */
    distanceTo(sphere) {
        let a = this;
        let b = sphere;

        let distance = Math.sqrt(Math.pow(b.X-a.X, 2) + Math.pow(b.Y-a.Y, 2) + Math.pow(b.Z-a.Z, 2));
        
        return distance;
    }

    /**
    * Test if this Sphere is inside another Sphere
    * @param {Sphere} sphere
    * @returns {boolean}
    */
    isInside(sphere) {
        let distance = this.distanceTo(sphere);
        if (distance+this.Radius <= sphere.Radius) {
            return true;
        }
        return false;
    }

    /**
    * Test if this Sphere intersects with another Sphere
    * @param {Sphere} sphere
    * @returns {boolean}
    */
    intersectsWith(sphere) {
        let distance = this.distanceTo(sphere);
        let radius_sum = this.Radius+sphere.Radius;

        if (radius_sum > distance) {
            return true;
        }

        return false;
    }
    
    /**
    * Move this Sphere
    * @param {number} x
    * @param {number} y
    * @param {number} z
    */
    move(x, y, z) {
        this.point.move(x, y, z);
    }

    copy() { return new Circle(this.point.copy(), this.radius); }

    toString() {
        return `Sphere(Point3D = ${this.Point3D}, Radius = ${Math.round(this.Radius)})`;
    }
}

class Polygon {
    points = [];

    /**
    * Create new Polygon
    * @param {...Point} points
    */
    constructor(...points) {
        if (points!=null && points.length > 0) {
            this.points = points;
        }
    }

    scale(factor) {
        for (let i = 0; i < this.Points.length; i++) {
            this.Points[i] = this.Points[i].scale(factor);
        }
    }

    get Center() {
        let centroidX = 0, centroidY = 0,
            det = 0, tempDet = 0, j = 0;

        for (let i = 0; i < this.points.length; i++) {
            if (i + 1 == this.points.length) {
                j = 0;
            } else {
                j = i + 1;
            }

            tempDet = (this.points[i].x * this.points[j].y) - (this.points[j].x * this.points[i].y);
            det += tempDet;

            centroidX += (this.points[i].x + this.points[j].x) * tempDet;
            centroidY += (this.points[i].y + this.points[j].y) * tempDet;
        }

        centroidX /= 3 * det;
        centroidY /= 3 * det;

        return new Point(centroidX, centroidY);
    }
    get Points() { return this.points; } set Points(points) { this.points = points; }

    /**
    * Add Points to Polygon
    * @param {...Point} points
    */
    add(...points) {
        if (points!=null && points.length > 0) {
            this.points.push(...points);
        }
    }

    /**
    * Automatically create a new Polygon with n number of sides
    * @param {Point} point
    * @param {number} radius
    * @param {number} sides
    * @returns {Polygon}
    */
    create(point, radius, sides=3) {
        let poly = new Polygon();
        let step = 2*Math.PI/sides;
        let h = point.X;
        let k = point.Y;
        let r = radius;

        for (let theta=0; theta < 2*Math.PI; theta+=step) {
            let x = h+r*Math.cos(theta);
            let y = k-r*Math.sin(theta);
            poly.add(new Point(x, y));
        }

        return poly;
    }

    /**
    * Rotate this Polygon n degrees around central Point
    * @param {Point} point
    * @param {number} angle Angle in degrees
    */
    rotate(point, angle) {
        for (let i=0; i<this.points.length; i++) {
            this.points[i].rotate(point, angle);
        }
    }

    /**
    * Move this Polygon
    * @param {number} x
    * @param {number} y
    */
    move(x, y) {
        for (let i=0; i<this.points.length; i++) {
            this.points[i].move(x, y);
        }
    }

    copy() { return new Polygon(...this.points.map(point => point.copy())); }

    toString() {
        const text = this.Points.map(p => p.toString()).join(', ');
        return `Polygon(Center = ${this.Center}, Points = [${text}])`;
    }
}

class Polygon3D {
    center = new Point3D(0, 0, 0);
    points = [];

    /**
    * Create new Polygon3D
    * @param {...Point3D} points
    */
    constructor(...points) {
        if (points!=null && points.length > 0) {
            this.points = points;
        }
    }

    scale(factor) {
        for (let i = 0; i < this.Points.length; i++) {
            this.Points[i] = this.Points[i].scale(factor);
        }
    }

    get Center() { return this.center; } set Center(point) { this.center = point; }
    get Points() { return this.points; } set Points(points) { this.points = points; }

    /**
    * Add Points to Polygon
    * @param {...Point3D} points
    */
    add(...points) {
        if (points!=null && points.length > 0) {
            this.points.push(...points);
        }
    }

    /**
    * Move this Polygon3D
    * @param {number} x
    * @param {number} y
    */
    move(x, y, z) {
        for (let i=0; i<this.points.length; i++) {
            this.points[i].move(x, y, z);
        }
    }

    copy() { return new Polygon(...this.points.map(point => point.copy())); }

    toString() {
        const text = this.Points.map(p => p.toString()).join(', ');
        return `Polygon3D(Points = [${text}])`;
    }
}

if (typeof(module)!='undefined') module.exports = { 
    Size, 
    Point, 
    Rectangle, 
    Circle, 
    Point3D, 
    Size3D, 
    Cube, 
    Sphere, 
    Line, 
    Line3D, 
    Polygon, 
    Polygon3D 
}
