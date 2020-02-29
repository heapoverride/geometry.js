/* Author: @UnrealSec */

class Size {
    width = 0; height = 0;

    constructor(width=0, height=0) {
        this.width = width;
        this.height = height;
    }

    get Width() { return this.width; } set Width(width) { this.width = width; }
    get Height() { return this.height; } set Height(height) { this.height = height; }
    
    copy() { return Object.assign(new Size(), this); }
}

class Point {
    x = 0; y = 0;

    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    get X() { return this.x; } set X(x) { this.x = x; }
    get Y() { return this.y; } set Y(y) { this.y = y; }

    distanceTo(point) {
        var a = this;
        var b = point;
        
        var distance = Math.sqrt(Math.pow(b.X-a.X, 2) + Math.pow(b.Y-a.Y, 2));
        
        return distance;
    }

    angleTo(point) {
        var r = Math.atan2(point.Y - this.Y, point.X - this.X);
        var d = radians * (180/Math.PI);
        return {radians: r, degrees: d};
    }

    copy() { return Object.assign(new Point(), this); }
}

class Rectangle {
    point = null; size = null;

    constructor(x=0, y=0, width=0, height=0) {
        this.point = new Point(x, y);
        this.size = new Size(width, height);
    }

    get X() { return this.point.X; } set X(x) { this.point.X = x; }
    get Y() { return this.point.Y; } set Y(y) { this.point.Y = y; }
    get Width() { return this.size.Width; } set Width(width) { this.size.Width = width; }
    get Height() { return this.size.Height; } set Height(height) { this.size.Height = height; }
    get Point() { return this.point; } set Point(point) { this.point = point; }
    get Size() { return this.size; } set Size(size) { this.size = size; }

    intersectsWith(rect) {
        var a = this;
        var b = rect;

        if (((a.Y >= b.Y && a.Y <= b.Y+b.Height) || 
            (b.Y >= a.Y && b.Y <= a.Y+a.Height)) && 
            ((a.X >= b.X && a.X <= b.X+b.Width) || 
            (b.X >= a.X && b.X <= a.X+a.Width))) {
            return true;
        }

        return false;
    }

    isInside(rect) {
        var a = this;
        var b = rect;

        if ((a.Y > b.Y && a.Y+a.Height < b.Y+b.Height) &&
            (a.X > b.X && a.X+a.Width < b.X+b.Width)) {
            return true;
        }

        return false;
    }
}

class Circle {
    point = null; radius = 0;

    constructor(x=0, y=0, radius=0) {
        this.point = new Point(x, y);
        this.radius = radius;
    }

    get X() { return this.point.X; } set X(x) { this.point.X = x; }
    get Y() { return this.point.Y; } set Y(y) { this.point.Y = y; }
    get Radius() { return this.radius; } set Radius(r) { this.radius = r; }

    distanceTo(circle) {
        var a = this;
        var b = circle;

        var distance = Math.sqrt(Math.pow(b.X-a.X, 2) + Math.pow(b.Y-a.Y, 2));
        
        return distance;
    }

    isInside(circle) {
        var distance = this.distanceTo(circle);
        if (distance+this.Radius < circle.Radius) {
            return true;
        }
        return false;
    }

    intersectsWith(circle) {
        var distance = this.distanceTo(circle);
        var radius_sum = this.Radius+circle.Radius;

        if (radius_sum > distance) {
            return true;
        }

        return false;
    }
}

if (typeof(module)!='undefined') module.exports = { Size, Point, Rectangle, Circle };