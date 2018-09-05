import $ from 'jquery';
import Two from 'two.js';
import _ from 'lodash';
import * as createjs from '@createjs/tweenjs';

// console.log(Tween);

class Eye {
    constructor(two, color) {

        const self = this;
        this.two = two;
        this.color = color;

        this.height = two.height;
        this.width = two.width;


        this.background = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
        this.background.noStroke();
        this.background.name = 'background';

        var eyeMask = two.makeGroup(this.background);

        this.ball = two.makeGroup();
        this.eye = two.makeGroup();


        this.retina = two.makeCircle(0, 0, two.height / 4);
        this.retina.fill = color || self.getRandomColor();
        this.retina.noStroke();

        this.pupil = two.makeCircle(0, 0, two.height / 6);
        this.pupil.fill = '#333';
        this.pupil.linewidth = 10;
        this.pupil.noStroke();
        this.reflection = two.makeCircle(two.height / 12, -two.height / 12, two.height / 12);
        this.reflection.fill = 'rgba(255, 255, 255, 0.9)';
        this.reflection.noStroke();

        this.lid = two.makeEllipse(0, 0, two.height / 3, two.height / 4);
        this.lid.stroke = '#333';
        this.lid.linewidth = 15;
        this.lid.noFill();


        this.ball.add(this.retina, this.pupil, this.reflection);
        this.ball.destination = new Two.Vector();

        this.eye.add(this.ball, this.lid);
        this.eye.translation.set(two.width / 2, two.height / 2);


        this.mask = two.makeEllipse(two.width / 2, two.height / 2, two.height / 3, two.height / 4);

        eyeMask.add(this.eye);
        eyeMask.mask = this.mask;

        this.resetLidvertices = _.clone(this.lid.vertices);

        // return eye;

    }

    reset() {
        const startHeight = this.height / 2;
        const speed = 100;

        return Promise.all(
            [
                new Promise((good, bad) => {
                    createjs.Tween.get(this.lid)
                        .to({height: startHeight}, speed)
                        .call(good)
                }),
                new Promise((good, bad) => {
                    createjs.Tween.get(this.mask)
                        .to({height: startHeight}, speed)
                        .call(good)
                })
            ]
        );
    }

    blink() {
        const closedHeight = 15;
        const speed = 100;
        const startHeight = this.height / 2;

        createjs.Tween.get(this.lid)
            .to({height: closedHeight}, speed)
            .to({height: startHeight}, speed);

        createjs.Tween.get(this.mask)
            .to({height: closedHeight}, speed)
            .to({height: startHeight}, speed);
    }

    squint() {
        //todo reset first
        this.reset()
            .then(() => {
                const closedHeight = 100;
                const speed = 1000;

                createjs.Tween.get(this.lid)
                    .to({height: closedHeight}, speed);

                createjs.Tween.get(this.mask)
                    .to({height: closedHeight}, speed);
            });

    }


    excited() {
        //todo reset first
        this.reset()
            .then(() => {

                const speed = 400;
                for (let i = 0; i < this.lid.vertices.length; i++) {
                    let v = this.lid.vertices[i];
                    let vv = this.mask.vertices[i];


                    if (v.y > 0) {
                        createjs.Tween.get(v)
                            .to({y: 0}, speed);
                    }

                    if (vv.y > 0) {
                        createjs.Tween.get(vv)
                            .to({y: 0}, speed);
                    }

                    this.two.update();
                }
            });
    }

    annoyed() {
        //todo reset first
        this.reset()
            .then(() => {

                const speed = 400;
                for (let i = 0; i < this.lid.vertices.length; i++) {
                    let v = this.lid.vertices[i];
                    let vv = this.mask.vertices[i];


                    if (v.y < 0) {
                        createjs.Tween.get(v)
                            .to({y: 0}, speed);
                    }

                    if (vv.y < 0) {
                        createjs.Tween.get(vv)
                            .to({y: 0}, speed);
                    }

                    this.two.update();
                }
            })
    }
}

class Eyes {

    constructor() {

        const self = this;

        this.height = 400;
        this.width = 400;

        const container = $('#content')[0];

        Two.Resolution = 32;

        const eye1 = new Two({
            width: this.width,
            height: this.height
        }).appendTo(container);
        const eye2 = new Two({
            width: this.width,
            height: this.height,
        }).appendTo(container);


        // const test = new Two({
        //     width: 400,
        //     height: 400,
        // }).appendTo(container);

        const fixedEyeColor = self.getRandomColor();
        self.eyes = [
            new Eye(eye1, fixedEyeColor),
            new Eye(eye2, fixedEyeColor),
        ];

        for (let i = 0; i < this.eyes.length; i++) {
            setInterval(() => {
                this.eyes[i].lid.y += 10;
            }, 500);
        }

        self.eyes[0].domElement = eye1.renderer.domElement;
        self.eyes[1].domElement = eye2.renderer.domElement;

        const releaseEyes = _.debounce(function () {
            _.each(self.eyes, function (eye) {
                eye.ball.destination.clear();
            });
        }, 1000);

        const $window = $(window)
            .bind('mousemove', mousemove)
            .bind('touchmove', function (e) {
                const touch = e.originalEvent.changedTouches[0];
                mousemove({
                    clientX: touch.pageX,
                    clientY: touch.pageY
                });
                return false;
            });

        eye1.bind('update', function () {
            const eye = self.eyes[0];
            eye.ball.translation.x += (eye.ball.destination.x - eye.ball.translation.x) * 0.0625;
            eye.ball.translation.y += (eye.ball.destination.y - eye.ball.translation.y) * 0.0625;
        }).play();
        eye2.bind('update', function () {
            const eye = self.eyes[1];
            eye.ball.translation.x += (eye.ball.destination.x - eye.ball.translation.x) * 0.0625;
            eye.ball.translation.y += (eye.ball.destination.y - eye.ball.translation.y) * 0.0625;
        }).play();

        function mousemove(e) {

            const mouse = new Two.Vector(e.clientX, e.clientY);
            _.each(self.eyes, function (eye) {
                const rect = eye.domElement.getBoundingClientRect();
                const center = {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                };
                const theta = Math.atan2(mouse.y - center.y, mouse.x - center.x);
                const distance = mouse.distanceTo(center);
                const pct = distance / $window.width();
                const radius = 75 * pct;
                eye.ball.destination.set(radius * Math.cos(theta), radius * Math.sin(theta));
            });

            releaseEyes();

        }

    }

    getRandomColor() {
        return 'rgba('
            + Math.floor(Math.random() * 255) + ','
            + Math.floor(Math.random() * 255) + ','
            + Math.floor(Math.random() * 255) + ','
            + 0.66 + ')';
    }

    squint() {
        this.eyes.map(eye => {
            eye.squint();
        })
    }

    blink() {
        this.eyes.map(eye => {
            eye.blink();
        })
    }


    excited() {
        this.eyes.map(eye => {
            eye.excited();
        })
    }

    annoyed() {
        this.eyes.map(eye => {
            eye.annoyed();
        })
    }

    /**
     * Change eye colors
     * @param color1
     * @param color2 (optional)
     */
    changeColors(color1, color2) {


        this.eyes[0].retina.fill = color1;
        this.eyes[1].retina.fill = color2 || color1;

    }
}

window.Eyes = Eyes;
