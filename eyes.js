class Eyes {

    constructor() {

        const self = this;

        this.height = 400;
        this.width = 400;

        const container = $('#content')[0];

        Two.Resolution = 24;

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
            makeEye(eye1, fixedEyeColor),
            makeEye(eye2, fixedEyeColor),
        ];

        self.eyes[0].domElement = eye1.renderer.domElement;
        self.eyes[1].domElement = eye2.renderer.domElement;

        const releaseEyes = _.debounce(function () {
            _.each(self.eyes, function (eye) {
                eye.parts.ball.destination.clear();
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
            eye.parts.ball.translation.x += (eye.parts.ball.destination.x - eye.parts.ball.translation.x) * 0.0625;
            eye.parts.ball.translation.y += (eye.parts.ball.destination.y - eye.parts.ball.translation.y) * 0.0625;
        }).play();
        eye2.bind('update', function () {
            const eye = self.eyes[1];
            eye.parts.ball.translation.x += (eye.parts.ball.destination.x - eye.parts.ball.translation.x) * 0.0625;
            eye.parts.ball.translation.y += (eye.parts.ball.destination.y - eye.parts.ball.translation.y) * 0.0625;
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
                eye.parts.ball.destination.set(radius * Math.cos(theta), radius * Math.sin(theta));
            });

            releaseEyes();

        }

        function makeEye(two, color) {

            const self = this;

            var background = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
            background.noStroke();
            // background.fill = 'rgb(255, 255, 175)';
            background.name = 'background';

            var eyeMask = two.makeGroup(background);

            const ball = two.makeGroup();
            const eye = two.makeGroup();


            const retina = two.makeCircle(0, 0, two.height / 4);
            retina.fill = color || self.getRandomColor();
            retina.noStroke();

            const pupil = two.makeCircle(0, 0, two.height / 6);
            pupil.fill = '#333';
            pupil.linewidth = 10;
            pupil.noStroke();
            const reflection = two.makeCircle(two.height / 12, -two.height / 12, two.height / 12);
            reflection.fill = 'rgba(255, 255, 255, 0.9)';
            reflection.noStroke();

            let lid = two.makeEllipse(0, 0, two.height / 3, two.height / 4);
            lid.stroke = '#333';
            lid.linewidth = 15;
            lid.noFill();


            ball.add(retina, pupil, reflection);
            ball.destination = new Two.Vector();

            eye.add(ball, lid);
            eye.translation.set(two.width / 2, two.height / 2);


            const mask = two.makeEllipse(two.width / 2, two.height / 2, two.height / 3, two.height / 4)
            eye.parts = {
                mask,
                ball,
                lid,
                pupil,
                retina
            };

            eyeMask.add(eye);

            eyeMask.mask = mask;
            return eye;

        }
    }

    getRandomColor() {
        return 'rgba('
            + Math.floor(Math.random() * 255) + ','
            + Math.floor(Math.random() * 255) + ','
            + Math.floor(Math.random() * 255) + ','
            + 0.66 + ')';
    }


    _doToBothEyes(func) {
        this.eyes.map(eye => {
            func(eye);
        })
    }

    _doToLidAndMask(eye, func) {
        func(eye.parts.mask);
        func(eye.parts.lid);
    }

    reset() {
        const speed = 200;
        const self = this;
        this._doToBothEyes(eye => {

            this._doToLidAndMask(eye, function (part) {
                createjs.Tween.get(part)
                    .to({height: self.height / 2}, speed);
            })
        })
    }

    squint() {
        const squintHeight = 100;
        const speed = 200;

        this._doToBothEyes(eye => {
            this._doToLidAndMask(eye, function (part) {
                createjs.Tween.get(part)
                    .to({height: squintHeight}, speed);
            });
        });

    }

    blink() {
        const closedHeight = 15;
        const speed = 100;

        this._doToBothEyes(eye => {
            const startHeight = eye.parts.lid.height;
            this._doToLidAndMask(eye, function (part) {
                createjs.Tween.get(part)
                    .to({height: closedHeight}, speed)
                    .to({height: startHeight}, speed);
            });
        })
    }


    kawaii() {
        this._doToBothEyes(eye => {
            // const startHeight = eye.parts.lid.height;
            this._doToLidAndMask(eye, function (part) {

                part.height = 15;
                part.curved = true;
                console.log(part);
            });
        });
    }

    /**
     * Change eye colors
     * @param color1
     * @param color2 (optional)
     */
    changeColors(color1, color2) {


        this.eyes[0].parts.retina.fill = color1;
        this.eyes[1].parts.retina.fill = color2 || color1;

    }
}

window.Eyes = Eyes;
