window.__require = function e(t, n, o) {
    function a(r, i) {
        if (!n[r]) {
            if (!t[r]) {
                var s = r.split("/");
                if (s = s[s.length - 1],
                !t[s]) {
                    var h = "function" == typeof __require && __require;
                    if (!i && h)
                        return h(s, !0);
                    if (c)
                        return c(s, !0);
                    throw new Error("Cannot find module '" + r + "'")
                }
            }
            var l = n[r] = {
                exports: {}
            };
            t[r][0].call(l.exports, function(e) {
                return a(t[r][1][e] || e)
            }, l, l.exports, e, t, n, o)
        }
        return n[r].exports
    }
    for (var c = "function" == typeof __require && __require, r = 0; r < o.length; r++)
        a(o[r]);
    return a
}({
    AniTools: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "e6159dpEOhBwogHHMk0hhTE", "AniTools");
        var o = {
            doLabStrAni: function(e, t, n) {
                e.node.stopAllActions(),
                e.string = "";
                var o = t.split("")
                  , a = 0
                  , c = n / o.length;
                e.node.runAction(cc.sequence(cc.callFunc(function() {
                    e.string = e.string + o[a],
                    a++
                }), cc.delayTime(c)).repeat(o.length))
            },
            gunNumLabAni: function(e, t) {
                var n = parseInt(e.string);
                if (t != n) {
                    var o = 0
                      , a = t - n >= 50 ? 50 : t - n;
                    e.node.runAction(cc.sequence(cc.callFunc(function() {
                        o >= a - 1 ? e.string = t : (n++,
                        e.string = n),
                        o++
                    }), cc.delayTime(.02)).repeat(a))
                }
            },
            openUIAni: function(e, t, n, o) {
                e.opacity = 0,
                t.scale = 0,
                e.runAction(cc.fadeTo(n, 100)),
                t.runAction(cc.sequence(cc.scaleTo(n, 1).easing(cc.easeBackOut()), cc.callFunc(o)))
            },
            closeUIAni: function(e, t, n, o) {
                e.runAction(cc.fadeOut(n)),
                t.runAction(cc.sequence(cc.scaleTo(n, 0).easing(cc.easeBackIn()), cc.callFunc(o)))
            },
            fireColorArr: ["#F5CD4D", "#F77986", "#D0F057", "#7ACCE8", "#E365EE"],
            fireworksAni: function(e, t, n, o) {
                for (var a = 0; a < t; a++) {
                    var c = ToolsJs.newSprite("fire" + this.returnRanNum(1, 4));
                    c.scale = .3 + .5 * Math.random(),
                    c.position = n,
                    c.color = cc.color(this.fireColorArr[this.returnRanNum(0, this.fireColorArr.length - 1)]),
                    e.addChild(c, 88);
                    var r = this.returnRanNum(o - 15, o + 15)
                      , i = this.returnRanNum(300, 1e3);
                    this.fireObjAni(c, r, i, 350, .005 * a)
                }
            },
            fireObjAni: function(e, t, n, o) {
                var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0
                  , c = .1 + .5 * Math.random();
                e.runAction(cc.rotateBy(c, this.returnRanNum(-360, 360)).repeatForever());
                var r = cc.misc.degreesToRadians(t)
                  , i = cc.v2(Math.cos(r) * n, Math.sin(r) * n)
                  , s = n / o;
                e.runAction(cc.sequence(cc.delayTime(a), cc.jumpBy(s, cc.v2(1.5 * i.x, 0), n, 1), cc.removeSelf(!0)))
            },
            bombObjAni: function(e, t, n, o, a, c) {
                t = t || this.returnRanNum(-180, 180);
                var r = cc.misc.degreesToRadians(t)
                  , i = cc.v2(Math.cos(r) * n, Math.sin(r) * n)
                  , s = n / o
                  , h = a ? 0 : e.scale
                  , l = c ? 0 : 255;
                e.runAction(cc.sequence(cc.spawn(cc.scaleTo(s + .1, h), cc.moveBy(s, i).easing(cc.easeQuadraticActionOut()), cc.fadeTo(s + .1, l)), cc.fadeOut(.1), cc.removeSelf(!0)))
            },
            playAni: function(e, t) {
                e.getComponent(cc.Animation).play(t)
            },
            stopAni: function(e, t) {
                e.getComponent(cc.Animation).stop(t)
            },
            addNodeAni: function(e, t, n, o, a, c, r) {
                for (var i = e.getComponent(cc.Animation), s = [], h = o; h <= a; h++) {
                    var l = new cc.SpriteFrame(cc.url.raw("resources/" + t + h + ".png"));
                    s.push(l)
                }
                var u = cc.AnimationClip.createWithSpriteFrames(s, 5);
                u.name = n,
                u.speed = r,
                u.wrapMode = c ? cc.WrapMode.Loop : cc.WrapMode.Normal,
                i.addClip(u)
            },
            returnRanNum: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            }
        };
        window.AniTools = o,
        cc._RF.pop()
    }
    , {}],
    Body: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "2de4fXGeYlLQ758FOxi6EV6", "Body");
        var o = e("GameTools");
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                this.Car = this.node.getComponent("Car")
            },
            start: function() {},
            onCollisionEnter: function(e, t) {
                if (!this.Car.over) {
                    console.log("on collision enter");
                    var n = t.world
                      , a = (n.aabb,
                    n.preAabb,
                    n.transform,
                    n.radius,
                    n.position,
                    n.points);
                    if ("Car" === e.node.group && 1 == this.Car.type) {
                        console.log("\u649e\u8f66\u4e86"),
                        this.Car.over = !0,
                        this.node.stopAllActions(),
                        this.currentline && this.currentline.stopAllActions(),
                        e.node.getComponent("Car").over = !0,
                        e.node.stopAllActions(),
                        this.Car.crash(a[0]);
                        var c = o.convetOtherNodeSpaceAR(e.node, this.node)
                          , r = o.convetOtherNodeSpaceAR(this.node, e.node)
                          , i = c.negSelf().mul(.5)
                          , s = r.negSelf().mul(.5)
                          , h = null
                          , l = null;
                        h = i.x > 0 ? -30 : 30,
                        l = s.x > 0 ? -30 : 30,
                        i = o.worldConvertLocalPointAR(this.node.parent, o.LocalCoordinatesToTheWorldAR(this.node, i)),
                        s = o.worldConvertLocalPointAR(this.node.parent, o.LocalCoordinatesToTheWorldAR(e.node, s)),
                        this.node.runAction(cc.spawn(cc.moveTo(1, i), cc.rotateBy(.2, h))),
                        e.node.runAction(cc.spawn(cc.moveTo(1, s), cc.rotateBy(.2, l)))
                    }
                }
            }
        }),
        cc._RF.pop()
    }
    , {
        GameTools: "GameTools"
    }],
    Car: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "de8d3yAM8pF77oG/4v4rbFZ", "Car");
        var o = this && this.__extends || function() {
            var e = function(t, n) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                )(t, n)
            };
            return function(t, n) {
                function o() {
                    this.constructor = t
                }
                e(t, n),
                t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype,
                new o)
            }
        }()
          , a = this && this.__decorate || function(e, t, n, o) {
            var a, c = arguments.length, r = c < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, o);
            else
                for (var i = e.length - 1; i >= 0; i--)
                    (a = e[i]) && (r = (c < 3 ? a(r) : c > 3 ? a(t, n, r) : a(t, n)) || r);
            return c > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("../commonJs/GameTools")
          , r = e("./PoolManager")
          , i = e("./MapManager")
          , s = e("./MusicManager")
          , h = e("./MainCamera")
          , l = cc._decorator
          , u = l.ccclass
          , g = l.property
          , d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.shadow = null,
                t.carSprite = null,
                t.tire1Pos = null,
                t.tire2Pos = null,
                t.tire3Pos = null,
                t.tire4Pos = null,
                t.badSmoke = null,
                t.butt = null,
                t.leftLight = null,
                t.RightLight = null,
                t.shadow1SpriteFrame = [],
                t.car1SpriteFrame = [],
                t.car2SpriteFrame = [],
                t.moveMusic = null,
                t.type = 0,
                t.colorType = 0,
                t.smoke1CountDown = .1,
                t.smoke2CountDown = 0,
                t.moveSpeed = 750,
                t.over = !1,
                t.success = !1,
                t.canMove = !1,
                t.touch = !1,
                t.isMoving = !1,
                t.sprite = null,
                t.shadowSprite = null,
                t.collider = null,
                t.park = null,
                t.currentline = null,
                t.tire1 = null,
                t.tire2 = null,
                t.tire3 = null,
                t.tire4 = null,
                t.currentMusic = null,
                t.lightOpenColor = null,
                t.lightCloseColor = null,
                t.lineArr = [],
                t.targetPosArr = [],
                t
            }
            return o(t, e),
            t.prototype.onLoad = function() {
                this.sprite = this.carSprite.getComponent(cc.Sprite),
                this.shadowSprite = this.shadow.getComponent(cc.Sprite),
                this.collider = this.node.getComponent(cc.BoxCollider),
                this.lightOpenColor = new cc.Color(255,54,23),
                this.lightCloseColor = new cc.Color(236,222,217)
            }
            ,
            t.prototype.start = function() {}
            ,
            t.prototype.initCar = function(e, t, n) {
                if (this.type = e,
                1 == e)
                    this.sprite.spriteFrame = this.car1SpriteFrame[t],
                    this.shadowSprite.spriteFrame = this.shadow1SpriteFrame[n],
                    3 != n && 2 != n || this.node.setScale(.8 * i.default.Instance.smallScale);
                else {
                    var o = c.getRndInteger(0, 5, !0);
                    this.sprite.spriteFrame = this.car2SpriteFrame[o],
                    o < 3 ? (this.shadowSprite.spriteFrame = this.shadow1SpriteFrame[4],
                    this.leftLight.setPosition(cc.v2(-24, -111)),
                    this.RightLight.setPosition(cc.v2(24, -111))) : (this.shadowSprite.spriteFrame = this.shadow1SpriteFrame[5],
                    this.leftLight.setPosition(cc.v2(-23, -84)),
                    this.leftLight.angle = 16,
                    this.RightLight.setPosition(cc.v2(23, -84)),
                    this.RightLight.angle = -16),
                    this.shadow.angle = 180,
                    this.leftLight.active = !0,
                    this.RightLight.active = !0
                }
                this.initSmokePos(),
                this.setBoxCollider()
            }
            ,
            t.prototype.initSmokePos = function() {
                this.badSmoke.y = -this.node.height / 2 + 22,
                this.butt.y = this.node.height / 2 - 22
            }
            ,
            t.prototype.initTire = function() {
                this.tire1 = r.default.Spawn("tire"),
                i.default.Instance.node.addChild(this.tire1, i.default.Instance.memberZIndex.tire),
                this.tire1Pos.setPosition(cc.v2(-30, this.node.height / 2 - 20)),
                this.tire2 = r.default.Spawn("tire"),
                i.default.Instance.node.addChild(this.tire2, i.default.Instance.memberZIndex.tire),
                this.tire2Pos.setPosition(cc.v2(30, this.node.height / 2 - 20)),
                this.tire3 = r.default.Spawn("tire"),
                i.default.Instance.node.addChild(this.tire3, i.default.Instance.memberZIndex.tire),
                this.tire3Pos.setPosition(cc.v2(-30, -this.node.height / 2 + 20)),
                this.tire4 = r.default.Spawn("tire"),
                i.default.Instance.node.addChild(this.tire4, i.default.Instance.memberZIndex.tire),
                this.tire4Pos.setPosition(cc.v2(30, -this.node.height / 2 + 20))
            }
            ,
            t.prototype.setBoxCollider = function() {
                var e = this.sprite.spriteFrame.getOriginalSize();
                this.node.setContentSize(e),
                this.collider.size = e
            }
            ,
            t.prototype.startMove = function() {
                1 == i.default.Instance.MainGame.gameScore && i.default.Instance.MainGame.UICon.beginnerOverAction(),
                this.canMove = !0,
                this.touch = !0,
                this.isMoving = !0;
                for (var e = 0; e < i.default.Instance.car2Arr.length; e++)
                    if (i.default.Instance.car2Arr[e].x < -i.default.Instance.MainGame.gameWidth / 2 - 150 || i.default.Instance.car2Arr[e].x > i.default.Instance.MainGame.gameWidth / 2 + 150) {
                        i.default.Instance.car2Arr[e].destroy(),
                        i.default.Instance.car2Arr.splice(e, 1);
                        break
                    }
                if (this.currentMusic = cc.audioEngine.play(this.moveMusic, !0, 1),
                this.currentline = this.lineArr[0],
                this.lineAnim(),
                this.lineArr.length > 1)
                    for (var t = 0; t < this.lineArr.length - 1; t++) {
                        var n = this.lineArr[t].position;
                        1 == t && (90 == this.lineArr[1].angle ? n.x -= 10 : -90 == this.lineArr[1].angle && (n.x += 10)),
                        this.targetPosArr.push(n),
                        this.lineArr[t + 1] && (this.lineArr[t].nextLine = this.lineArr[t + 1])
                    }
                this.targetPosArr.push(this.park.position)
            }
            ,
            t.prototype.lineAnim = function() {
                var e = Math.abs(this.currentline.height / this.moveSpeed);
                this.currentline.runAction(cc.sequence(cc.repeat(cc.sequence(cc.delayTime(e / 20), cc.callFunc(function() {
                    this.currentline.getComponent(cc.Sprite).fillRange -= .05
                }, this)), 20), cc.callFunc(function(e) {
                    e.nextLine && (this.currentline = e.nextLine,
                    this.lineAnim())
                }, this), cc.removeSelf()))
            }
            ,
            t.prototype.onCollisionEnter = function(e, t) {
                if (!this.over) {
                    var n = t.world;
                    n.aabb,
                    n.preAabb,
                    n.transform,
                    n.radius,
                    n.position,
                    n.points;
                    if (console.log("on collision enter"),
                    "Car" === e.node.group && (i.default.Instance.gameOverStart || 1 == this.type)) {
                        console.log("\u649e\u8f66\u4e86"),
                        this.over = !0,
                        this.initTire(),
                        this.node.stopAllActions(),
                        this.currentline && (this.currentline.stopAllActions(),
                        this.currentline = null,
                        cc.audioEngine.stop(this.currentMusic));
                        var o = e.node.getComponent("Car");
                        o.over = !0,
                        o.initTire(),
                        o.currentline && (o.currentline.stopAllActions(),
                        o.currentline = null,
                        cc.audioEngine.stop(o.currentMusic)),
                        e.node.stopAllActions(),
                        s.default.Instance.playMusic(1, 1, !1);
                        var a = c.convetOtherNodeSpaceAR(e.node, this.node)
                          , r = c.convetOtherNodeSpaceAR(this.node, e.node);
                        i.default.Instance.gameOver(c.LocalCoordinatesToTheWorldAR(this.node, a.mul(.5))),
                        h.default.Instance.cameraShake();
                        var l = a.negSelf().mul(.5)
                          , u = r.negSelf().mul(.5)
                          , g = null
                          , d = null;
                        g = l.x > 0 ? -30 : 30,
                        d = u.x > 0 ? -30 : 30,
                        l = c.worldConvertLocalPointAR(i.default.Instance.node, c.LocalCoordinatesToTheWorldAR(this.node, l)),
                        u = c.worldConvertLocalPointAR(i.default.Instance.node, c.LocalCoordinatesToTheWorldAR(e.node, u)),
                        this.node.runAction(cc.spawn(cc.moveTo(1, l), cc.rotateBy(.2, g))),
                        e.node.runAction(cc.spawn(cc.moveTo(1, u), cc.rotateBy(.2, d)))
                    }
                }
            }
            ,
            t.prototype.createBadSmoke = function() {
                this.smoke2CountDown = .1;
                var e = r.default.Spawn("smoke");
                i.default.Instance.node.addChild(e, i.default.Instance.memberZIndex.particle);
                var t = c.convetOtherNodeSpaceAR(this.badSmoke, i.default.Instance.node);
                e.setPosition(t),
                e.setScale(c.getRndInteger(20, 35, !0) / 10),
                e.color = new cc.Color(180,0,0);
                var n = cc.v2(0, 0);
                n.x = c.getRndInteger(-100, 100, !0),
                n.y = c.getRndInteger(200, 300, !0);
                var o = n.y / 80;
                e.runAction(cc.sequence(cc.spawn(cc.moveBy(o, n), cc.sequence(cc.tintTo(o / 7, 180, 80, 0), cc.tintTo(o / 10, 80, 80, 80)), cc.scaleTo(o, 1.5 * e.scaleX), cc.fadeOut(3 * o).easing(cc.easeExponentialOut())), cc.removeSelf()))
            }
            ,
            t.prototype.createSmoke = function() {
                this.smoke1CountDown = .03;
                var e = r.default.Spawn("smoke");
                i.default.Instance.node.addChild(e, i.default.Instance.memberZIndex.smoke);
                var t = c.convetOtherNodeSpaceAR(this.butt, i.default.Instance.node);
                t.x += c.getRndInteger(-20, 20, !0),
                e.setPosition(t),
                e.setScale(c.getRndInteger(10, 30, !0) / 10),
                e.opacity = c.getRndInteger(150, 255, !0),
                e.runAction(cc.sequence(cc.fadeOut(.15), cc.removeSelf()))
            }
            ,
            t.prototype.successful = function() {
                this.isMoving = !1,
                cc.audioEngine.stop(this.currentMusic),
                s.default.Instance.playMusic(2, 1, !1);
                for (var e = 0; e < c.getRndInteger(25, 30, !0); e++) {
                    var t = r.default.Spawn("cube");
                    i.default.Instance.node.addChild(t, i.default.Instance.memberZIndex.particle);
                    var n = this.node.position;
                    n.x += c.getRndInteger(-this.node.width * this.node.scaleX / 2 + 20, this.node.width * this.node.scaleX / 2 - 20, !0),
                    n.y += c.getRndInteger(-this.node.height * this.node.scaleY / 2, this.node.height * this.node.scaleY / 2, !0),
                    t.setPosition(n),
                    t.setScale(c.getRndInteger(8, 13, !0) / 10),
                    t.angle = c.getRndInteger(0, 360, !0),
                    t.getComponent(cc.Sprite).spriteFrame = i.default.Instance.cubeSpriteFrame[this.colorType];
                    var o = cc.misc.degreesToRadians(c.getRndInteger(0, 360, !0))
                      , a = c.getRndInteger(50, 300, !0)
                      , h = cc.v2(a * Math.cos(o), a * Math.sin(o));
                    cc.v2(0, 300).y = c.getRndInteger(80, 150, !0);
                    var l = a / 300;
                    t.runAction(cc.sequence(cc.spawn(cc.moveBy(l, h), cc.fadeOut(l).easing(cc.easeExponentialIn())), cc.removeSelf()))
                }
                i.default.Instance.rise()
            }
            ,
            t.prototype.update = function(e) {
                if (this.success || this.over || (this.smoke1CountDown -= e,
                this.smoke1CountDown <= 0 && this.createSmoke()),
                this.over && (this.smoke2CountDown -= e,
                this.smoke2CountDown <= 0 && this.createBadSmoke()),
                0 != Math.round(this.node.angle) && 360 != Math.round(this.node.angle) || this.shadow.setPosition(cc.v2(10, -10)),
                270 != Math.round(this.node.angle) && -90 != Math.round(this.node.angle) || this.shadow.setPosition(cc.v2(10, 10)),
                180 != Math.round(this.node.angle) && -180 != Math.round(this.node.angle) || this.shadow.setPosition(cc.v2(-10, 10)),
                90 == Math.round(this.node.angle) && this.shadow.setPosition(cc.v2(-10, -10)),
                this.tire1 && this.tire1.setPosition(c.convetOtherNodeSpaceAR(this.tire1Pos, this.node.parent)),
                this.tire2 && this.tire2.setPosition(c.convetOtherNodeSpaceAR(this.tire2Pos, this.node.parent)),
                this.tire3 && this.tire3.setPosition(c.convetOtherNodeSpaceAR(this.tire3Pos, this.node.parent)),
                this.tire4 && this.tire4.setPosition(c.convetOtherNodeSpaceAR(this.tire4Pos, this.node.parent)),
                0 == this.over && 1 == this.canMove)
                    if (0 != this.targetPosArr.length) {
                        this.canMove = !1;
                        var t = this.targetPosArr[0]
                          , n = t.sub(this.node.position).mag() / this.moveSpeed
                          , o = cc.v2(0, -1);
                        180 == Math.round(this.node.angle) ? o = cc.v2(0, 1) : 90 == Math.round(this.node.angle) ? o = cc.v2(1, 0) : 270 != Math.round(this.node.angle) && -90 != Math.round(this.node.angle) || (o = cc.v2(-1, 0));
                        var a = cc.misc.radiansToDegrees(o.signAngle(this.targetPosArr[0].sub(this.node.position)));
                        Math.abs(a) > 1 && (this.node.angle += a),
                        this.node.runAction(cc.sequence(cc.moveTo(n, t), cc.callFunc(function(e, t) {
                            this.targetPosArr.shift(),
                            this.canMove = !0,
                            2 == this.type && (this.leftLight.color = this.lightCloseColor,
                            this.RightLight.color = this.lightCloseColor)
                        }, this, this)))
                    } else if (2 == this.type) {
                        var r = i.default.Instance.car2Arr.indexOf(this.node);
                        i.default.Instance.car2Arr.splice(r, 1),
                        this.node.destroy()
                    } else {
                        if (this.success)
                            return;
                        this.success = !0,
                        this.park.getChildByName("frame2").runAction(cc.sequence(cc.delayTime(.08), cc.spawn(cc.scaleTo(.3, 2), cc.fadeOut(.3)))),
                        this.successful()
                    }
            }
            ,
            a([g(cc.Node)], t.prototype, "shadow", void 0),
            a([g(cc.Node)], t.prototype, "carSprite", void 0),
            a([g(cc.Node)], t.prototype, "tire1Pos", void 0),
            a([g(cc.Node)], t.prototype, "tire2Pos", void 0),
            a([g(cc.Node)], t.prototype, "tire3Pos", void 0),
            a([g(cc.Node)], t.prototype, "tire4Pos", void 0),
            a([g(cc.Node)], t.prototype, "badSmoke", void 0),
            a([g(cc.Node)], t.prototype, "butt", void 0),
            a([g(cc.Node)], t.prototype, "leftLight", void 0),
            a([g(cc.Node)], t.prototype, "RightLight", void 0),
            a([g(cc.SpriteFrame)], t.prototype, "shadow1SpriteFrame", void 0),
            a([g(cc.SpriteFrame)], t.prototype, "car1SpriteFrame", void 0),
            a([g(cc.SpriteFrame)], t.prototype, "car2SpriteFrame", void 0),
            a([g({
                type: cc.AudioClip
            })], t.prototype, "moveMusic", void 0),
            t = a([u], t)
        }(cc.Component);
        n.default = d,
        cc._RF.pop()
    }
    , {
        "../commonJs/GameTools": "GameTools",
        "./MainCamera": "MainCamera",
        "./MapManager": "MapManager",
        "./MusicManager": "MusicManager",
        "./PoolManager": "PoolManager"
    }],
    FloatScore: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "2f3b7KWUHFPKaAtPdK0kv4m", "FloatScore");
        var o = this && this.__extends || function() {
            var e = function(t, n) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                )(t, n)
            };
            return function(t, n) {
                function o() {
                    this.constructor = t
                }
                e(t, n),
                t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype,
                new o)
            }
        }()
          , a = this && this.__decorate || function(e, t, n, o) {
            var a, c = arguments.length, r = c < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, o);
            else
                for (var i = e.length - 1; i >= 0; i--)
                    (a = e[i]) && (r = (c < 3 ? a(r) : c > 3 ? a(t, n, r) : a(t, n)) || r);
            return c > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = cc._decorator
          , r = c.ccclass
          , i = c.property
          , s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.add = null,
                t.word = null,
                t.score = null,
                t.wordSpriteFrame = [],
                t.ding = null,
                t.colorArr = [],
                t
            }
            return o(t, e),
            t.prototype.onLoad = function() {
                this.wordSprite = this.word.getComponent(cc.Sprite),
                this.colorArr = [new cc.Color(0,0,255), new cc.Color(255,0,255), new cc.Color(255,255,0)]
            }
            ,
            t.prototype.start = function() {}
            ,
            t.prototype.init = function(e) {
                cc.audioEngine.play(this.ding, !1, .5),
                10 == e ? (this.wordSprite.spriteFrame = this.wordSpriteFrame[0],
                this.add.color = this.colorArr[0],
                this.score.node.color = this.colorArr[0]) : 30 == e ? (this.wordSprite.spriteFrame = this.wordSpriteFrame[1],
                this.add.color = this.colorArr[1],
                this.score.node.color = this.colorArr[1]) : 50 == e && (this.wordSprite.spriteFrame = this.wordSpriteFrame[2],
                this.add.color = this.colorArr[2],
                this.score.node.color = this.colorArr[2]),
                this.score.string = e.toString(),
                this.anim(e),
                this.node.setScale(2)
            }
            ,
            t.prototype.anim = function(e) {
                this.node.runAction(cc.sequence(cc.spawn(cc.scaleTo(.3, .7), cc.fadeIn(.3)), cc.scaleTo(.5, 1), cc.scaleTo(.5, .7), cc.scaleTo(.5, 1), cc.scaleTo(.5, .7), cc.callFunc(function() {
                    this.MainGame.gainScore(e)
                }, this), cc.fadeOut(.3), cc.callFunc(function() {
                    this.MapCon.floatScorePool.put(this.node)
                }, this)))
            }
            ,
            a([i(cc.Node)], t.prototype, "add", void 0),
            a([i(cc.Node)], t.prototype, "word", void 0),
            a([i(cc.Label)], t.prototype, "score", void 0),
            a([i(cc.SpriteFrame)], t.prototype, "wordSpriteFrame", void 0),
            a([i({
                type: cc.AudioClip
            })], t.prototype, "ding", void 0),
            t = a([r], t)
        }(cc.Component);
        n.default = s,
        cc._RF.pop()
    }
    , {}],
    GameConfig: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "f0663sWtfNKCKOL+Hvnt0cI", "GameConfig");
        var o = {
            GameClubButton: null,
            GameScene: null,
            launchScene: null,
            Bros: null,
            caS: null,
            MAIN_MENU_NUM: "Classic",
            gameScore: 0,
            standScore: 30,
            GAME_OVER_BOOL: !0,
            gameMaxScore: 0,
            publicGameBool: !1,
            mapConfig: [{
                lv: 1,
                roadType: 0,
                parkCount: 1,
                parkPos: [cc.v2(0, 300)],
                carPos: [cc.v2(0, -300)]
            }, {
                lv: 2,
                roadType: 3,
                parkCount: 2,
                parkPos: [cc.v2(250, 400), cc.v2(250, -400)],
                carPos: [cc.v2(-250, 400), cc.v2(-250, -400)]
            }, {
                lv: 3,
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(250, 300), cc.v2(-250, 300)],
                carPos: [cc.v2(-225, -300), cc.v2(225, -300)]
            }, {
                type: "\u53cc\u8f66X\u578b\u8def\u5f841",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(225, 300), cc.v2(-250, 300)],
                carPos: [cc.v2(-225, -300), cc.v2(250, -300)]
            }, {
                type: "\u53cc\u8f66X\u578b\u8def\u5f842",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(-250, 300), cc.v2(-225, -300)],
                carPos: [cc.v2(225, -300), cc.v2(250, 300)]
            }, {
                type: "\u53cc\u8f66X\u578b\u8def\u5f843",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(-250, -300), cc.v2(250, -300)],
                carPos: [cc.v2(225, 300), cc.v2(-225, 300)]
            }, {
                type: "\u53cc\u8f66X\u578b\u8def\u5f844",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(250, 300), cc.v2(225, -300)],
                carPos: [cc.v2(-250, -300), cc.v2(-225, 300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f841",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(250, 300), cc.v2(-250, 300)],
                carPos: [cc.v2(-225, 300), cc.v2(-250, -300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f842",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(250, 300), cc.v2(-250, 300)],
                carPos: [cc.v2(-225, 300), cc.v2(250, -300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f843",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(-250, 300), cc.v2(-225, -300)],
                carPos: [cc.v2(-250, -300), cc.v2(225, -300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f844",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(-250, 300), cc.v2(-225, -300)],
                carPos: [cc.v2(-250, -300), cc.v2(225, 300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f845",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(-250, -300), cc.v2(250, -300)],
                carPos: [cc.v2(225, -300), cc.v2(250, 300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f846",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(-250, -300), cc.v2(250, -300)],
                carPos: [cc.v2(225, -300), cc.v2(-225, 300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f847",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(250, -300), cc.v2(225, 300)],
                carPos: [cc.v2(250, 300), cc.v2(-225, 300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f848",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(250, -300), cc.v2(225, 300)],
                carPos: [cc.v2(250, 300), cc.v2(-225, -300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f849",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(250, 300), cc.v2(-250, -300)],
                carPos: [cc.v2(-225, -300), cc.v2(-250, 300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f8410",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(250, 300), cc.v2(-250, -300)],
                carPos: [cc.v2(-225, -300), cc.v2(225, -300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f8411",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(-250, 300), cc.v2(250, -300)],
                carPos: [cc.v2(225, -300), cc.v2(250, 300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f8412",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(-250, 300), cc.v2(250, -300)],
                carPos: [cc.v2(225, -300), cc.v2(-225, -300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f8413",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(-250, -300), cc.v2(250, 300)],
                carPos: [cc.v2(225, 300), cc.v2(250, -300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f8414",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(-250, -300), cc.v2(250, 300)],
                carPos: [cc.v2(225, 300), cc.v2(-225, 300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f8415",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(250, -300), cc.v2(-250, 300)],
                carPos: [cc.v2(-225, 300), cc.v2(-250, -300)]
            }, {
                type: "\u53cc\u8f66\u5360\u5751\u578b\u8def\u5f8416",
                roadType: 1,
                parkCount: 2,
                parkPos: [cc.v2(250, -300), cc.v2(-250, 300)],
                carPos: [cc.v2(-225, 300), cc.v2(225, 300)]
            }, {
                type: "\u4e09\u8f66\u5360\u5751\u578b\u8def\u5f841",
                roadType: 1,
                parkCount: 3,
                parkPos: [cc.v2(275, 300), cc.v2(225, -300), cc.v2(-250, -300)],
                carPos: [cc.v2(-275, -300), cc.v2(-225, 300), cc.v2(250, -300)]
            }, {
                type: "\u4e09\u8f66\u5360\u5751\u578b\u8def\u5f842",
                roadType: 1,
                parkCount: 3,
                parkPos: [cc.v2(225, -300), cc.v2(-275, 300), cc.v2(250, 300)],
                carPos: [cc.v2(225, 300), cc.v2(275, -300), cc.v2(-250, -300)]
            }, {
                type: "\u4e09\u8f66\u5360\u5751\u578b\u8def\u5f843",
                roadType: 1,
                parkCount: 3,
                parkPos: [cc.v2(-225, 300), cc.v2(-250, -300), cc.v2(275, 300)],
                carPos: [cc.v2(225, -300), cc.v2(250, 300), cc.v2(-275, 300)]
            }, {
                type: "\u4e09\u8f66\u5360\u5751\u578b\u8def\u5f844",
                roadType: 1,
                parkCount: 3,
                parkPos: [cc.v2(-225, 300), cc.v2(-250, -300), cc.v2(275, 300)],
                carPos: [cc.v2(225, -300), cc.v2(250, 300), cc.v2(-275, 300)]
            }, {
                type: "\u56db\u8f66\u8def\u5f84",
                roadType: 2,
                parkCount: 4,
                guidPosX: [-390, -200, 200, 390],
                guidPosY: [-420, -200, 200, 420],
                parkPos: [cc.v2(-280, 400), cc.v2(-130, -400), cc.v2(130, 180), cc.v2(280, 400)],
                carPos: [cc.v2(-280, -400), cc.v2(-130, 180), cc.v2(130, -400), cc.v2(280, -180)]
            }, {
                type: "\u4e94\u8f66\u8def\u5f84",
                roadType: 2,
                parkCount: 5,
                guidPosX: [-390, -200, 200, 390],
                guidPosY: [-420, -200, 200, 420],
                parkPos: [cc.v2(-280, 400), cc.v2(-130, -400), cc.v2(130, 180), cc.v2(280, 400), cc.v2(280, 400)],
                carPos: [cc.v2(-280, -400), cc.v2(-130, 180), cc.v2(130, -400), cc.v2(280, -180), cc.v2(280, 400)]
            }, {
                type: "\u76f4\u7ebf\u578b",
                parkPos: [cc.v2(-280, 400), cc.v2(-280, 400), cc.v2(-280, 400), cc.v2(-280, 400), cc.v2(-280, 400), cc.v2(-280, 400), cc.v2(-130, 400), cc.v2(-130, 400), cc.v2(-130, 400), cc.v2(-130, 400), cc.v2(-130, 400), cc.v2(-130, 400), cc.v2(130, 400), cc.v2(130, 400), cc.v2(130, 400), cc.v2(130, 400), cc.v2(130, 400), cc.v2(130, 400), cc.v2(280, 400), cc.v2(280, 400), cc.v2(280, 400), cc.v2(280, 400), cc.v2(280, 400), cc.v2(280, 400), cc.v2(-280, 180), cc.v2(-280, 180), cc.v2(-280, 180), cc.v2(-280, 180), cc.v2(-280, 180), cc.v2(-280, 180)],
                carPos: [cc.v2(-280, 180), cc.v2(-280, -180), cc.v2(-280, -400), cc.v2(-130, 400), cc.v2(130, 400), cc.v2(280, 400), cc.v2(-130, 180), cc.v2(-130, -180), cc.v2(-130, -400), cc.v2(-280, 400), cc.v2(130, 400), cc.v2(280, 400), cc.v2(130, 180), cc.v2(130, -180), cc.v2(130, -400), cc.v2(-280, 400), cc.v2(-130, 400), cc.v2(280, 400), cc.v2(280, 280), cc.v2(280, -180), cc.v2(280, -400), cc.v2(-280, 400), cc.v2(-130, 400), cc.v2(130, 400), cc.v2(-280, 400), cc.v2(-280, -180), cc.v2(-280, -400), cc.v2(-130, 400), cc.v2(130, 400), cc.v2(280, 400)]
            }],
            ranLinkData: null,
            recGameData: null,
            InfoData: null,
            endShow0: null,
            endShow1: null,
            endShow2: null,
            endShow3: null,
            infoGameName: null,
            showText: null,
            startText: null,
            moreGameText: null,
            playAgainText: null,
            playNum: 0,
            noTouchBool: !0,
            returnRanNum: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            }
        };
        t.exports = o,
        cc._RF.pop()
    }
    , {}],
    GameData: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "aff05VcW7lIjZOYTq3erU7E", "GameData");
        var o = {
            isOnline: !1,
            getData: function() {
                if (!this.isOnline) {
                    var e = cc.sys.localStorage.getItem("Parking_3");
                    return null == e || "" == e ? {
                        gameMaxScore: 1
                    } : JSON.parse(e)
                }
            },
            setData: function(e) {
                if (!this.isOnline) {
                    var t = {
                        gameMaxScore: e
                    };
                    cc.sys.localStorage.setItem("Parking_3", JSON.stringify(t))
                }
            }
        };
        t.exports = o,
        cc._RF.pop()
    }
    , {}],
    GameTools: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "9e4e7c2meZG2L0zrZOXU2Q0", "GameTools");
        var o = {
            localConvertWorldPointAR: function(e) {
                return e ? e.convertToWorldSpaceAR(cc.v2(0, 0)) : null
            },
            localConvertWorldPoint: function(e) {
                return e ? e.convertToWorldSpace(cc.v2(0, 0)) : null
            },
            worldConvertLocalPointAR: function(e, t) {
                return e ? e.convertToNodeSpaceAR(t) : null
            },
            worldConvertLocalPoint: function(e, t) {
                return e ? e.convertToNodeSpace(t) : null
            },
            convetOtherNodeSpaceAR: function(e, t) {
                if (!e || !t)
                    return null;
                var n = this.localConvertWorldPointAR(e);
                return this.worldConvertLocalPointAR(t, n)
            },
            convetOtherNodeSpace: function(e, t) {
                if (!e || !t)
                    return null;
                var n = this.localConvertWorldPoint(e);
                return this.worldConvertLocalPoint(t, n)
            },
            LocalCoordinatesToTheWorldAR: function(e, t) {
                return e ? e.convertToWorldSpaceAR(t) : null
            },
            LocalCoordinatesToTheWorld: function(e, t) {
                return e ? e.convertToWorldSpace(t) : null
            },
            vecEquals: function(e, t) {
                return e.x == t.x && e.y == t.y
            },
            PlayBgm: function(e, t) {
                var n = this.bgmId;
                cc.loader.loadRes(this.loadMusicPath + e, cc.AudioClip, function(e, o) {
                    e ? cc.error(e.message || e) : n.id = cc.audioEngine.play(o, !0, t)
                })
            },
            getRndInteger: function(e, t, n) {
                return n ? Math.floor(Math.random() * (t - e + 1)) + e : Math.random() * (t - e) + e
            },
            judgeInArr: function(e, t) {
                for (var n = 0; n < t.length; n++)
                    if (t[n].x == e.x && t[n].y == e.y)
                        return !0;
                return !1
            },
            judgeInArr2: function(e, t) {
                for (var n = 0; n < t.length; n++)
                    if (t[n] === e)
                        return !0;
                return !1
            }
        };
        t.exports = o,
        cc._RF.pop()
    }
    , {}],
    GameUiTools: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "b21e8tF461OFalpptyeuAE2", "GameUiTools");
        e("GameConfig");
        var o = {
            newSprite: function(e, t) {
                var n = new cc.Node;
                return t ? (e = e.split(".")[0],
                n.addComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame(e)) : n.addComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame("res/raw-assets/resources/" + e),
                n
            },
            setNodeSpriteFrame: function(e, t) {
                e.getComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame(t)
            },
            setButtonClickEvents: function(e, t, n, o, a) {
                var c = new Array;
                void 0 == t.length ? c[0] = t : c = t;
                for (var r = 0; r < c.length; r++) {
                    var i = new cc.Component.EventHandler;
                    i.target = e.node,
                    i.component = e.node.name,
                    i.handler = n,
                    void 0 == t.length ? i.customEventData = o : i.customEventData = r;
                    var s = c[r].addComponent(cc.Button);
                    s.clickEvents.push(i),
                    (void 0 == a || a) && (s.transition = cc.Button.Transition.SCALE,
                    s.duration = .1,
                    s.zoomScale = 1.2)
                }
            },
            scheduleOnce: function(e, t, n) {
                e.runAction(cc.sequence(cc.delayTime(n), cc.callFunc(t, e)))
            },
            loadingScene: function(e, t) {
                t ? cc.loader.loadRes("panel/LoadingLayer", function(t, n) {
                    var o = cc.instantiate(n);
                    cc.director.getScene().children[0].addChild(o),
                    cc.director.preloadScene(e, function() {
                        cc.director.loadScene(e)
                    })
                }) : cc.director.preloadScene(e, function() {
                    cc.director.loadScene(e)
                })
            },
            loadingLayer: function(e) {
                cc.loader.loadRes(e, function(e, t) {
                    if (!e) {
                        var n = cc.instantiate(t);
                        cc.director.getScene().children[0].addChild(n, 100)
                    }
                })
            }
        };
        t.exports = o,
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig"
    }],
    HttpManagerJs: [function(e, t, n) {
        "use strict";
        var o;
        function a(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        cc._RF.push(t, "197e1hfNnxIcJx73V3VhUxY", "HttpManagerJs");
        var c = e("GameConfig")
          , r = (a(o = {
            URL: "http://g.vsane.com/Service/Share/index",
            cacheList: null,
            isBusy: null,
            req: null,
            perform: null,
            retGameId: 0
        }, "cacheList", []),
        a(o, "ctor", function() {}),
        a(o, "checkHave", function() {
            this.isBusy || this.sendOne()
        }),
        a(o, "httpInitUrl", function(e) {
            var t = window.location.href
              , n = t.substring(0, t.lastIndexOf("//") + 2) + window.location.host + "/Service/Share/index";
            this.URL = n,
            console.log("data", this.URL),
            this.retGameId = e
        }),
        a(o, "send", function(e, t, n, o) {
            this.cacheList.push({
                type: e,
                data: t,
                func: n,
                target: o
            }),
            this.isBusy || this.sendOne()
        }),
        a(o, "sendOne", function() {
            if (0 != this.cacheList.length) {
                this.isBusy = !0,
                this.perform = this.cacheList.shift(),
                this.req = cc.loader.getXMLHttpRequest(),
                this.req.onreadystatechange = this.onDataHandler.bind(this),
                this.req.onerror = this.onErrorHandler.bind(this),
                this.req.ontimeout = this.onTimeoutHandler.bind(this),
                this.req.timeout = 2e3,
                cc.log("pos", this.URL),
                this.req.open("POST", this.URL),
                this.req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                var e = this.returnLanguage();
                console.log("gameIdid", this.retGameId);
                var t = this.retGameId
                  , n = {
                    type: this.perform.type,
                    gid: t,
                    mid: null,
                    data: this.perform.data,
                    languageType: e
                }
                  , o = "send=" + JSON.stringify(n);
                this.req.send(o)
            }
        }),
        a(o, "onDataHandler", function() {
            if (404 != this.req.status) {
                if (4 == this.req.readyState && this.req.status >= 200 && this.req.status <= 207 && this.req.responseText) {
                    var e = JSON.parse(this.req.responseText);
                    this.isBusy = !1,
                    this.perform.target ? this.perform.func.call(this.perform.target, e.error, e.data, e.commendGame, e.gameInfo) : this.perform.func(e)
                }
            } else {
                var t = c.launchScene
                  , n = c.Bros;
                c.caS;
                cc.director.loadScene(t, null, function() {
                    if (n) {
                        "";
                        var e = document.getElementById("GameDiv");
                        e && (e.style.backgroundImage = "")
                    }
                    cc.loader.onProgress = null,
                    console.log("Success to load scene: " + t)
                })
            }
        }),
        a(o, "returnLanguage", function() {
            return ("" + window.navigator.language).toLocaleLowerCase()
        }),
        a(o, "onErrorHandler", function() {
            cc.log("\u7f51\u7edc\u9519\u8bef"),
            this.isBusy = !1,
            this.perform.target ? this.perform.func.call(this.perform.target, -1) : this.perform.func(-1)
        }),
        a(o, "onTimeoutHandler", function() {
            cc.log("\u8bf7\u6c42\u8d85\u65f6"),
            this.isBusy = !1,
            this.perform.target ? this.perform.func.call(this.perform.target, -1) : this.perform.func(-1)
        }),
        a(o, "clearAll", function() {
            for (var e = this.cacheList.length, t = 0; t < e; t++) {
                var n = this.cacheList[t];
                n && (n.target ? n.func.call(n.target, -1) : n.func(-1))
            }
            this.cacheList.length = 0
        }),
        o);
        t.exports = r,
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig"
    }],
    LanguageSetJs: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "4754e8KuPZJCqklCNyKpG29", "LanguageSetJs");
        t.exports = {
            language_1: {
                game_name: "\u300c\u6309\u5e8f\u505c\u8f66\u300d",
                game_name1: "\u6309\u5e8f\u505c\u8f66",
                game_info: "\u6309\u7167\u4e00\u5b9a\u7684\u987a\u5e8f\u70b9\u51fb\u6c7d\u8f66\uff0c\u8ba9\u8f66\u987a\u5229\u5230\u8fbe\u505c\u8f66\u4f4d\u3002",
                txtStart: "\u5f00\u59cb",
                txtMore: "\u66f4\u591a\u6e38\u620f",
                txtAgain: "\u518d\u73a9\u4e00\u6b21",
                txtShare1: "\u5728\u6e38\u620f\u4e2d ",
                txtShare2: "\u5f97\u5206\u4e86\uff0c\u597d\u554a!\u4f60\u548c\u6211\u4e00\u8d77\u6765\u6bd4\u8d5b!",
                bgRgb: "#3698C5",
                gameT1: "\u5173\u6ce8\u6211\u4eec",
                gameT2: "\u7eb8\u724c\u63a5\u9f99",
                gameT3: "\u9526\u4e0a\u6dfb\u82b1",
                gameUrl1: "http://g.regogame.com/game/9/",
                gameUrl2: "http://g.regogame.com/game/3/",
                gameT11: "\u5173\u6ce8\u5fae\u4fe1",
                gameT12: "\u5173\u6ce8Kakao",
                gameT13: "\u5173\u6ce8Line",
                gameEndL: "\u6e38 \u620f \u7ed3 \u675f",
                gameEndL1: "\u7a0d \u5019 \u67e5 \u770b \u5206 \u6570"
            },
            language_2: {
                game_name: "\u300cOrder Parking\u300d",
                game_name1: "Order Parking",
                game_info: "Click the cars in a certain order to let the cars reach the parking space smoothly.",
                txtStart: "Start",
                txtMore: "More Game",
                txtAgain: "Play Again",
                txtShare1: "In Game ",
                txtShare2: " Let's play together!",
                bgRgb: "#3698C5",
                gameT1: "Follow Us",
                gameT2: "Thousand Flower",
                gameT3: "Eliminate Star",
                gameUrl1: "http://g.fromgame.com/game/53",
                gameUrl2: "http://g.fromgame.com/game/13",
                gameT11: "Focus WeChat",
                gameT12: "Focus Kakao",
                gameT13: "Focus Line",
                gameEndL: "Game OVer",
                gameEndL1: "View the score later"
            }
        },
        cc._RF.pop()
    }
    , {}],
    LoadSceneJs: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "3ef908fwfNIwJsOjET8tCh2", "LoadSceneJs");
        var o = {
            goToCover: function(e, t, n, o, a) {
                var c = e;
                c = null == c || void 0 == c || e,
                console.log("LoadBoolBeforeLoadS", c),
                this.needShow = !1,
                c && c ? (this.needShow = !0,
                showMyAds()) : this.needShow = !1,
                this.needShow ? (void 0 == preloader && this.startGoToGame(n, o, a),
                resCompleteFlag = !0,
                adCompleteFlag && resCompleteFlag && this.startGoToGame(n, o, a)) : this.startGoToGame(n, o, a)
            },
            startGoToGame: function(e, t, n) {
                console.log("goToScene"),
                noAdGoToScene()
            }
        };
        t.exports = o,
        cc._RF.pop()
    }
    , {}],
    MainCamera: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "0dcaaeOHctPUayletZO5Nut", "MainCamera");
        var o = this && this.__extends || function() {
            var e = function(t, n) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                )(t, n)
            };
            return function(t, n) {
                function o() {
                    this.constructor = t
                }
                e(t, n),
                t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype,
                new o)
            }
        }()
          , a = this && this.__decorate || function(e, t, n, o) {
            var a, c = arguments.length, r = c < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, o);
            else
                for (var i = e.length - 1; i >= 0; i--)
                    (a = e[i]) && (r = (c < 3 ? a(r) : c > 3 ? a(t, n, r) : a(t, n)) || r);
            return c > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("../commonJs/GameConfig")
          , r = e("./MapManager")
          , i = cc._decorator
          , s = i.ccclass
          , h = (i.property,
        function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.camera = null,
                t
            }
            var n;
            return o(t, e),
            n = t,
            t.prototype.onLoad = function() {
                null != n.Instance && n.Instance.destroy(),
                n.Instance = this,
                this.camera = this.node.getComponent(cc.Camera),
                this.addTouchEvents()
            }
            ,
            t.prototype.start = function() {}
            ,
            t.prototype.addTouchEvents = function() {
                var e = this;
                this.node.on(cc.Node.EventType.TOUCH_START, function(t) {
                    if (c.GAME_OVER_BOOL && c.noTouchBool) {
                        var n = cc.v2(0, 0);
                        return e.camera.getCameraToWorldPoint(t.getLocation(), n),
                        r.default.Instance.touchJudge(n),
                        !0
                    }
                }, this)
            }
            ,
            t.prototype.cameraMove = function() {
                c.noTouchBool = !1;
                var e = r.default.Instance.MainGame.gameHeight + .25 * r.default.Instance.MainGame.gameHeight
                  , t = cc.v2(0, this.node.y + e)
                  , n = t.sub(this.node.position).mag() / 1280;
                r.default.Instance.yBaseOffset += e,
                r.default.Instance.clearMap(n),
                this.node.runAction(cc.sequence(cc.moveTo(n, t), cc.callFunc(function() {
                    c.noTouchBool = !0
                }, this)))
            }
            ,
            t.prototype.cameraShake = function() {
                this.node.runAction(cc.sequence(cc.moveBy(.05, cc.v2(-10, 0)), cc.moveBy(.1, cc.v2(20, 0)), cc.moveBy(.1, cc.v2(-20, 0)), cc.moveBy(.1, cc.v2(20, 0)), cc.moveBy(.1, cc.v2(-20, 0)), cc.moveBy(.05, cc.v2(10, 0))))
            }
            ,
            t.prototype.update = function(e) {}
            ,
            t.Instance = null,
            t = n = a([s], t)
        }(cc.Component));
        n.default = h,
        cc._RF.pop()
    }
    , {
        "../commonJs/GameConfig": "GameConfig",
        "./MapManager": "MapManager"
    }],
    MainGameJS: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "0e7a8SkMLxEY7nCB1Bqi8WZ", "MainGameJS");
        var o = e("GameConfig")
          , a = e("GameUiTools")
          , c = e("MainManage")
          , r = e("GameData")
          , i = e("GameTools");
        cc.Class({
            extends: cc.Component,
            properties: {
                UIManager: cc.Node,
                MapManager: cc.Node,
                MusicManager: cc.Node,
                mainCamera: cc.Node,
                sceneScore: cc.Label,
                mute: {
                    type: cc.AudioClip,
                    default: null
                },
                over: {
                    type: cc.AudioClip,
                    default: null
                }
            },
            onLoad: function() {
                this.UICon = this.UIManager.getComponent("UIManager"),
                this.MapCon = this.MapManager.getComponent("MapManager"),
                this.MusicCon = this.MusicManager.getComponent("MusicManager"),
                this.MainCamera = this.mainCamera.getComponent("MainCamera"),
                this.CollisionFun(),
                this.gameData = r.getData(),
                this.gameScore = this.gameData.gameMaxScore,
                o.gameMaxScore = this.gameData.gameMaxScore,
                o.noTouchBool = !0,
                o.GAME_OVER_BOOL = !0,
                this.gameWidth = cc.winSize.width,
                this.gameHeight = cc.winSize.height,
                a.loadingLayer("panel/LinkIconSpr"),
                cc.audioEngine.play(this.mute, !1, 0)
            },
            CollisionFun: function() {
                cc.director.getPhysicsManager().enabled = !0,
                this.manager = cc.director.getCollisionManager(),
                this.manager.enabled = !0,
                this.manager.enabledDebugDraw = !0,
                cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit,
                cc.director.getPhysicsManager().debugDrawFlags = 0,
                cc.director.getCollisionManager().enabledDebugDraw = !1
            },
            init: function() {
                this.gameStart = !0,
                this.gameOver = !1,
                this.newRecord = !1
            },
            PlayBgm: function(e, t) {
                var n = this;
                cc.loader.loadRes("music/" + e, cc.AudioClip, function(e, o) {
                    if (e)
                        cc.error(e.message || e);
                    else {
                        var a = cc.audioEngine.play(o, !0, t);
                        n.bgm = a
                    }
                })
            },
            addTouchEvents: function() {
                var e = this;
                this.node.on(cc.Node.EventType.TOUCH_START, function(t) {
                    if (o.GAME_OVER_BOOL && o.noTouchBool) {
                        var n = i.worldConvertLocalPointAR(this.node, t.getLocation());
                        return e.MapCon.touchJudge(n),
                        !0
                    }
                }, this)
            },
            gainScore: function() {
                this.gameScore++,
                o.gameMaxScore < this.gameScore && (o.gameMaxScore = this.gameScore,
                this.newRecord = !0),
                r.setData(o.gameMaxScore),
                this.UICon.initLvBox(),
                this.UICon.cutscenes()
            },
            gameEnd: function() {
                this.gameOver || (cc.audioEngine.play(this.over, !1, 1),
                this.gameOver = !0,
                this.UICon.canNotTouch = !0,
                o.gameScore = this.gameScore,
                o.GAME_OVER_BOOL = !1,
                c.gameOverShowText(o.gameScore, 1),
                this.node.runAction(cc.sequence(cc.delayTime(.5), cc.callFunc(this.gameEnd1.bind(this)))))
            },
            gameEnd1: function() {
                this.UICon.gameOver()
            },
            initEndLayer: function() {
                c.gotoEndLayer()
            },
            play: function() {
                console.log(1);
                var e = this;
                adBreak({
                    type: "next",
                    name: "restart-game",
                    beforeBreak: function() {
                        e.enableButtons()
                    },
                    afterBreak: function() {
                        e.enableButtons()
                    }
                })
            },
            enableButtons: function() {},
            start: function() {
                this.init()
            },
            update: function(e) {}
        }),
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig",
        GameData: "GameData",
        GameTools: "GameTools",
        GameUiTools: "GameUiTools",
        MainManage: "MainManage"
    }],
    MainManage: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "946adGkxvdBmZXnlD952XtK", "MainManage");
        var o = e("HttpManagerJs")
          , a = e("LanguageSetJs")
          , c = e("GameConfig")
          , r = e("LoadSceneJs")
          , i = (e("GameUiTools"),
        {
            gameHttpId: 0,
            subScoreHttp: null,
            gameNameText: null,
            gameInfoText: null,
            txtStartText: null,
            txtMoreText: null,
            txtAgainText: null,
            gameEndLText: null,
            gameEndL1Text: null,
            bgLayRgb: null,
            gameEndName1: null,
            gameEndName2: null,
            gameEndUrl1: null,
            gameEndUrl2: null,
            langugeType: 1,
            ranLinkData: null,
            adShowBefore: !1,
            adShowAfter: !0,
            endLayCol: null,
            moreBtnBgCol: null,
            moreBtnTextCol: null,
            recGameData: null,
            recGameUrl: null,
            recGameDelPau: null,
            recGameDelPer: null,
            recGameimg1: null,
            recGameimg2: null,
            recGamePos: null,
            InfoData: null,
            endShow0: null,
            endShow1: null,
            endShow2: null,
            endShow3: null,
            infoGameName: null,
            showText: null,
            startText: null,
            moreGameText: null,
            playAgainText: null,
            endHttpShowInfo: null,
            moreGameUrl: null,
            init: function(e, t, n) {
                if (!c.publicGameBool) {
                    if (c.playNum >= 1)
                        return;
                    c.playNum++
                }
                c.launchScene = e,
                c.Bros = t,
                c.caS = n,
                this.curType = 1,
                this.getHttpGameId(),
                this.gamePV_load(),
                console.log("thisg", this.gameHttpId),
                o.httpInitUrl(this.gameHttpId),
                o.send("101", null, this.getLinkGameReturn, this);
                var a = this.initLanguage();
                this.gameNameText = a.game_name,
                this.gameInfoText = a.game_info,
                this.txtStartText = a.txtStart,
                this.txtMoreText = a.txtMore,
                this.txtAgainText = a.txtAgain,
                this.gameEndLText = a.gameEndL,
                this.gameEndL1Text = a.gameEndL1,
                this.bgLayRgb = a.bgRgb,
                this.gameEndName1 = a.gameT2,
                this.gameEndName2 = a.gameT3,
                this.gameEndUrl1 = a.gameUrl1,
                this.gameEndUrl2 = a.gameUrl2,
                this.langugeType = this.curType
            },
            getHttpGameId: function() {
                var e = window.location.href
                  , t = e.substring(0, e.lastIndexOf("//") + 2)
                  , n = window.location.host
                  , o = t + n + "/Service/Share/index";
                this.gameAllHttp = o,
                this.subScoreHttp = t + n + "/Service/Score/index",
                this.gamePvHttp = t + n + "/Service/GamePv/index";
                var a = document.URL
                  , c = a.lastIndexOf("/")
                  , r = a.substring(0, c)
                  , i = (c = r.lastIndexOf("/"),
                r.substring(c + 1, r.length));
                this.gameHttpId = i,
                console.log("gameIdNew", i);
                e.substring(e.lastIndexOf("//") + 4, e.lastIndexOf("com") + 3);
                var s = t + n;
                console.log("moreGame", s);
                var h = s.lastIndexOf("//")
                  , l = s.substring(h + 2, s.indexOf("//") + 4);
                if ("g." == l) {
                    var u = s.replace(l, "");
                    console.log("chagee", u),
                    s = u
                } else
                    console.log("noChange");
                this.moreGameUrl = s,
                console.log("moreGame", this.moreGameUrl)
            },
            gameOverShowText: function(e, t) {
                this.ajaxLoad(this.subScoreHttp, "gameScore=" + e + "&gameId=" + this.gameHttpId + "&gameType=" + t, this.scoreResult)
            },
            gamePV_load: function() {
                this.ajaxLoad(this.gamePvHttp, "gameId=" + this.gameHttpId, this.ajaxOnLogoResult)
            },
            ajaxOnLogoResult: function() {},
            ajaxLoad: function(e, t, n) {
                var o = cc.loader.getXMLHttpRequest();
                o.onreadystatechange = n,
                o.open("POST", e),
                o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                o.send(t)
            },
            scoreResult: function(e) {
                if (null != e.currentTarget.response && "" != e.currentTarget.response) {
                    var t = JSON.parse(e.currentTarget.response);
                    cc.log("endshow", t.content),
                    i.endHttpShowInfo = t.content
                }
            },
            initLanguage: function() {
                var e = null;
                return cc.sys.language == cc.sys.LANGUAGE_CHINESE ? (this.curType = 1,
                e = a.language_1) : (cc.log("\u82f1\u6587"),
                this.curType = 2,
                e = a.language_2),
                e
            },
            getLinkGameReturn: function(e, t, n, o) {
                if (console.log("err0", e),
                console.log("err1", t),
                console.log("err2", n),
                console.log("err3", o),
                0 == e) {
                    this.ranLinkData = t,
                    this.adShowBefore = this.ranLinkData.gameSet.adShowBefore,
                    this.adShowAfter = this.ranLinkData.gameSet.adShowAfter,
                    this.endLayCol = this.ranLinkData.gameSet.endLayerColor,
                    this.moreBtnBgCol = this.ranLinkData.gameSet.moreBtnBgCol,
                    this.moreBtnTextCol = this.ranLinkData.gameSet.moreBtnTextCol,
                    this.moreGameUrl = this.ranLinkData.gameSet.moreBtnUrl,
                    this.recGameData = n,
                    this.ranRecGameData(),
                    this.InfoData = o,
                    this.endShow0 = this.InfoData.endShow0,
                    this.endShow1 = this.InfoData.endShow1,
                    this.endShow2 = this.InfoData.endShow2,
                    this.endShow3 = this.InfoData.endShow3,
                    this.infoGameName = this.InfoData.gameName,
                    this.showText = this.InfoData.showText,
                    this.startText = this.InfoData.startText,
                    this.moreGameText = this.InfoData.moreGame,
                    this.playAgainText = this.InfoData.rePlay,
                    this.gameInfoText = this.InfoData.showText,
                    this.txtStartText = this.InfoData.startText,
                    this.txtMoreText = this.InfoData.moreGame,
                    this.txtAgainText = this.InfoData.rePlay,
                    console.log("LoadMainGameScnee");
                    var a = c.launchScene
                      , i = c.Bros
                      , s = c.caS;
                    r.goToCover(this.adShowBefore, this.adShowAfter, a, i, s)
                }
            },
            ranRecGameData: function() {
                if (null != this.recGameData && "" != this.recGameData) {
                    this.returnBool = !1;
                    var e = this.recGameData.length
                      , t = c.returnRanNum(1, e) - 1;
                    cc.log("ranNNN", t),
                    this.recGameUrl = this.recGameData[t].data_link,
                    this.recGameDelPer = this.recGameData[t].delay_per,
                    this.recGameDelPau = this.recGameData[t].delay_pau,
                    this.recGameimg1 = this.recGameData[t].img_1,
                    this.recGameimg2 = this.recGameData[t].img_2,
                    this.recGamePos = this.recGameData[t].poistion
                }
            },
            ranLinkUrl: function() {
                if (null != this.ranLinkData && this.ranLinkData.gameList && null != this.ranLinkData.gameList) {
                    var e = this.ranLinkData.gameList.length
                      , t = c.returnRanNum(1, e) - 1;
                    return cc.log("templ", t, this.ranLinkData.gameList),
                    cc.log("url", this.ranLinkData.gameList[0].gameName, this.ranLinkData.gameList[0].gameUrl),
                    t
                }
                return null
            },
            gotoEndLayer: function() {
                if (c.publicGameBool)
                    this.showGameEndLayer();
                else {
                    if (adEndComplete = !1,
                    resEndComplete = !1,
                    this.needShow = null,
                    1 == window.navigator.onLine) {
                        var e = this.adShowAfter;
                        console.log("ad", e),
                        (e = null == e || void 0 == e || this.adShowAfter) ? (this.needShow = !0,
                        console.log("showMyad"),
                        showMyAds()) : this.needShow = !1
                    } else
                        console.log("showOver1"),
                        this.showGameEndLayer(),
                        this.needShow = null;
                    console.log("showMyad2", this.needShow),
                    null != this.needShow && (console.log("showMyad3"),
                    this.needShow ? (console.log("pre", preloader),
                    void 0 == preloader && this.showGameEndLayer(),
                    resEndComplete = !0,
                    adEndComplete && resEndComplete && (console.log("showOver1"),
                    this.showGameEndLayer())) : (console.log("gam"),
                    this.showGameEndLayer()))
                }
            },
            showGameEndLayer: function() {
                cc.find("Canvas").getComponent("MainGameJS").gameEnd1()
            }
        });
        t.exports = i,
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        HttpManagerJs: "HttpManagerJs",
        LanguageSetJs: "LanguageSetJs",
        LoadSceneJs: "LoadSceneJs"
    }],
    MapManager: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "90655Wr6VtFWZFbE+GZoVXW", "MapManager");
        var o = this && this.__extends || function() {
            var e = function(t, n) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                )(t, n)
            };
            return function(t, n) {
                function o() {
                    this.constructor = t
                }
                e(t, n),
                t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype,
                new o)
            }
        }()
          , a = this && this.__decorate || function(e, t, n, o) {
            var a, c = arguments.length, r = c < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, o);
            else
                for (var i = e.length - 1; i >= 0; i--)
                    (a = e[i]) && (r = (c < 3 ? a(r) : c > 3 ? a(t, n, r) : a(t, n)) || r);
            return c > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("../commonJs/GameTools")
          , r = e("../commonJs/GameConfig")
          , i = e("./PoolManager")
          , s = e("./MainCamera")
          , h = cc._decorator
          , l = h.ccclass
          , u = h.property
          , g = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mainGame = null,
                t.cubeSpriteFrame = [],
                t.maxParkCount = 1,
                t.smallScale = 1,
                t.currentDifficulty = 0,
                t.currentCar1Count = 0,
                t.lastMapConfigIndex = 0,
                t.lastRoadType = 0,
                t.overPutLineNum = 0,
                t.yBaseOffset = 0,
                t.gameOverStart = !1,
                t.MainGame = null,
                t.memberZIndex = null,
                t.difficulty = null,
                t.car2BornConfig = null,
                t.linePColorArr = [],
                t.parkColorArr = [],
                t.bottomColorArr = [],
                t.car1Arr = [],
                t.car2Arr = [],
                t.treeArr = [],
                t.roadArr = [],
                t.parkArr = [],
                t.car2Config = [],
                t
            }
            var n;
            return o(t, e),
            n = t,
            t.prototype.onLoad = function() {
                null != n.Instance && n.Instance.destroy(),
                n.Instance = this,
                this.MainGame = this.mainGame.getComponent("MainGameJS"),
                this.memberZIndex = {
                    road: 2,
                    park: 3,
                    line: 4,
                    tire: 5,
                    tree: 8,
                    smoke: 10,
                    car: 15,
                    particle: 60
                },
                this.difficulty = {
                    simple: 0,
                    normal: 1,
                    hard: 2,
                    hell: 3
                },
                this.car2Config = [{
                    difficulty: 0,
                    minTime: 7,
                    maxTime: 10,
                    maxCarCount: 4
                }, {
                    difficulty: 1,
                    minTime: 5,
                    maxTime: 7,
                    maxCarCount: 4
                }, {
                    difficulty: 2,
                    minTime: 2,
                    maxTime: 4,
                    maxCarCount: 4
                }, {
                    difficulty: 3,
                    minTime: 1.2,
                    maxTime: 2,
                    maxCarCount: 4
                }],
                this.linePColorArr = [new cc.Color(112,148,247), new cc.Color(244,91,83), new cc.Color(218,137,230), new cc.Color(240,153,79), new cc.Color(243,234,95)],
                this.parkColorArr = [new cc.Color(71,85,207), new cc.Color(189,21,19), new cc.Color(196,52,237), new cc.Color(244,126,57), new cc.Color(255,243,25)],
                this.bottomColorArr = [new cc.Color(95,106,255), new cc.Color(255,97,95), new cc.Color(239,95,255), new cc.Color(255,154,95), new cc.Color(255,231,95)],
                this.smallScale = .9 * this.MainGame.gameHeight / 1280,
                this.smallScale > 1 && (this.smallScale = 1)
            }
            ,
            t.prototype.start = function() {
                this.initMap()
            }
            ,
            t.prototype.initMap = function() {
                this.car1Arr = [],
                this.car2Arr = [],
                this.roadArr = [],
                this.parkArr = [],
                this.MainGame.UICon.initLvBox(),
                this.createRoad()
            }
            ,
            t.prototype.createRoad = function() {
                var e = cc.v2(0, 0)
                  , t = []
                  , n = [0, 0, 0, 0]
                  , o = [0, 0, 0, 0]
                  , a = [0, 15, -15, -30]
                  , s = 1
                  , h = null;
                if (this.overPutLineNum = 0,
                this.MainGame.gameScore <= 3)
                    h = r.mapConfig[this.MainGame.gameScore - 1],
                    1 == this.MainGame.gameScore && this.MainGame.UICon.beginnerHandAction(h.carPos[0]);
                else {
                    var l = 0;
                    if (this.MainGame.gameScore >= 4 && this.MainGame.gameScore < 6)
                        do {
                            l = c.getRndInteger(7, 22, !0)
                        } while (l == this.lastMapConfigIndex);
                    else if (this.MainGame.gameScore >= 6 && this.MainGame.gameScore <= 7)
                        do {
                            l = c.getRndInteger(23, 26, !0)
                        } while (l == this.lastMapConfigIndex);
                    else
                        this.MainGame.gameScore >= 8 && this.MainGame.gameScore <= 15 ? (this.MainGame.gameScore >= 11 && 1 != this.currentDifficulty && (this.currentDifficulty = 1),
                        l = 27) : this.MainGame.gameScore > 15 && (this.MainGame.gameScore > 15 && this.MainGame.gameScore < 30 && 2 != this.currentDifficulty ? this.currentDifficulty = 2 : this.MainGame.gameScore >= 30 && 3 != this.currentDifficulty && (this.currentDifficulty = 3),
                        l = 28);
                    if (this.lastMapConfigIndex = l,
                    h = r.mapConfig[l],
                    27 == l || 28 == l) {
                        for (var u = [], g = [], d = 0; d < h.guidPosX.length; d++)
                            u.push(h.guidPosX[d]);
                        var p = Math.floor((this.MainGame.gameHeight / 2 - 100) / 4);
                        h.guidPosY[0] = -this.MainGame.gameHeight / 2 + p,
                        h.guidPosY[1] = -this.MainGame.gameHeight / 2 + 3 * p,
                        h.guidPosY[2] = this.MainGame.gameHeight / 2 - 3 * p,
                        h.guidPosY[3] = this.MainGame.gameHeight / 2 - p;
                        for (d = 0; d < h.guidPosY.length; d++)
                            g.push(h.guidPosY[d]);
                        for (d = 0; d < h.parkCount; d++) {
                            var f = cc.v2(0, 0)
                              , m = 0
                              , v = 0;
                            do {
                                m = c.getRndInteger(0, u.length - 1, !0),
                                v = c.getRndInteger(0, g.length - 1, !0),
                                f.x = u[m],
                                f.y = g[v]
                            } while (c.judgeInArr(f, t) || this.judgeZoom(f, n));
                            t.push(f),
                            h.parkPos[d] = cc.v2(f.x + a[o[m]], f.y),
                            o[m]++;
                            var y = cc.v2(0, 0)
                              , x = 0
                              , S = 0;
                            do {
                                x = c.getRndInteger(0, u.length - 1, !0),
                                S = c.getRndInteger(0, g.length - 1, !0),
                                y.x = u[x],
                                y.y = g[S]
                            } while (c.judgeInArr(y, t) || this.judgeZoom(y, n));
                            t.push(y),
                            m == x ? (h.carPos[d] = cc.v2(f.x + a[o[m] - 1], y.y),
                            o[m]++) : (h.carPos[d] = cc.v2(y.x + a[o[x]], y.y),
                            o[x]++)
                        }
                    }
                }
                s = h.roadType,
                this.MainGame.gameScore >= 7 && (1 == this.lastRoadType || 5 == this.lastRoadType ? s = 0 == c.getRndInteger(0, 1, !0) ? 1 : 4 : 2 == this.lastRoadType || 4 == this.lastRoadType ? s = 0 == c.getRndInteger(0, 1, !0) ? 2 : 5 : 0 == this.lastRoadType && 2 == s && (s = 0 == c.getRndInteger(0, 1, !0) ? 0 == c.getRndInteger(0, 1, !0) ? 1 : 2 : 0 == c.getRndInteger(0, 1, !0) ? 4 : 5),
                1 != s && 2 != s || this.MainGame.gameScore > 50 && 3 != c.getRndInteger(0, 5, !0) && (s = 0 == c.getRndInteger(0, 1, !0) ? 4 : 5),
                this.lastRoadType = s);
                var A = null;
                if (0 != s) {
                    A = i.default.Spawn("road" + s.toString()),
                    this.node.addChild(A, this.memberZIndex.road),
                    this.roadArr.push(A),
                    A.setPosition(cc.v2(e.x, e.y + this.yBaseOffset));
                    var C = A.getComponent("RoadManager");
                    this.currentDifficulty == this.difficulty.simple && (this.car2BornConfig = this.car2Config[0]),
                    this.currentDifficulty == this.difficulty.normal && (this.car2BornConfig = this.car2Config[1]),
                    this.currentDifficulty == this.difficulty.hard && (this.car2BornConfig = this.car2Config[2]),
                    this.currentDifficulty == this.difficulty.hell && (this.car2BornConfig = this.car2Config[3]),
                    C.init()
                }
                this.currentCar1Count = h.parkCount;
                var M = c.getRndInteger(0, 3, !0);
                for (d = 0; d < h.parkCount; d++) {
                    var T = this.createPark(h.parkPos[d], d)
                      , I = this.createCar(h.carPos[d], 1, d + 5 * M, M)
                      , P = this.createLine(T, I, d, t, h, n, o, a);
                    this.overPutLineNum++;
                    var B = I.getComponent("Car");
                    B.lineArr = P,
                    B.park = T,
                    B.colorType = d,
                    I.angle = cc.misc.radiansToDegrees(cc.v2(0, -1).signAngle(P[0].position.sub(I.position)))
                }
            }
            ,
            t.prototype.judgeZoom = function(e, t) {
                var n = 0;
                return 3 == t[n = e.x > 0 ? e.y > 0 ? 0 : 3 : e.y > 0 ? 1 : 2] || (t[n]++,
                !1)
            }
            ,
            t.prototype.judgePosInArr = function(e, t, n, o, a, r) {
                var i = e.x
                  , s = e.y
                  , h = t.x
                  , l = t.y
                  , u = n.indexOf(i)
                  , g = n.indexOf(h)
                  , d = o.indexOf(s)
                  , p = o.indexOf(l)
                  , f = Math.abs(u - g)
                  , m = Math.abs(d - p)
                  , v = 0;
                return 0 == f || 0 == m ? v = 1 : 1 == f ? 1 == m ? v = 11 : 2 == m ? v = 12 : 3 == m && (v = 13) : 2 == f ? 1 == m ? v = 21 : 2 == m ? v = 22 : 3 == m && (v = 23) : 3 == f && (1 == m ? v = 31 : 2 == m ? v = 32 : 3 == m && (v = 33)),
                c.judgeInArr2(v, a) ? !(r >= 50) : (a.push(v),
                !1)
            }
            ,
            t.prototype.createPark = function(e, t) {
                var n = i.default.Spawn("park");
                return this.node.addChild(n, this.memberZIndex.park),
                n.getChildByName("frame1").color = this.linePColorArr[t],
                n.getChildByName("frame2").color = this.linePColorArr[t],
                n.getChildByName("bg").color = this.linePColorArr[t],
                n.setPosition(cc.v2(e.x, e.y + this.yBaseOffset)),
                n.setScale(.8 * this.smallScale),
                this.parkArr.push(n),
                n
            }
            ,
            t.prototype.createCar = function(e, t, n, o) {
                var a = i.default.Spawn("car");
                return this.node.addChild(a, this.memberZIndex.car),
                a.setPosition(cc.v2(e.x, e.y + this.yBaseOffset)),
                a.setScale(.8 * this.smallScale),
                a.getComponent("Car").initCar(t, n, o),
                1 == t ? this.car1Arr.push(a) : this.car2Arr.push(a),
                a
            }
            ,
            t.prototype.createLine = function(e, t, n, o, a, r, s, h) {
                var l = 0
                  , u = []
                  , g = []
                  , d = []
                  , p = (t.getComponent("Car"),
                Math.floor((this.MainGame.gameHeight / 2 - 100) / 4))
                  , f = this.MainGame.gameHeight / 2 - p
                  , m = this.MainGame.gameHeight / 2 - 3 * p
                  , v = c.getRndInteger(-50, 50, !0);
                if (0 == this.overPutLineNum ? v = 0 : 1 == this.overPutLineNum ? v = -20 : 2 == this.overPutLineNum ? v = -40 : 3 == this.overPutLineNum ? v = 20 : 4 == this.overPutLineNum && (v = 40),
                e.x == t.x) {
                    if (e.y == t.y)
                        return void cc.log("Error:\u8f66\u4e0e\u505c\u8f66\u4f4d\u5750\u6807\u76f8\u540c");
                    if (e.y > t.y) {
                        var y = e.y - e.height * e.scaleY / 2 - 0 - (t.y + t.height * t.scaleY / 2 + 0);
                        l = 1,
                        g.push(y);
                        var x = cc.v2(t.x, t.y + t.height * t.scaleY / 2 + 0 + y);
                        u.push(x),
                        d.push(180)
                    } else if (e.y < t.y) {
                        y = t.y - t.height * t.scaleY / 2 - 0 - (e.y + e.height * e.scaleY / 2 + 0);
                        l = 1,
                        g.push(y);
                        x = cc.v2(t.x, t.y - t.height * t.scaleY / 2 - 0 - y);
                        u.push(x),
                        d.push(0)
                    }
                } else if (e.x > t.x) {
                    if (e.y == t.y) {
                        if (e.y < this.yBaseOffset + 0 || !(e.y > this.yBaseOffset + 0) && 1 == c.getRndInteger(0, 1, !0)) {
                            l = 3;
                            var S = c.getRndInteger(100, 150, !0);
                            t.y == -m + this.yBaseOffset && (S = m - 0 - e.height * e.scaleY / 2 + v);
                            var A = Math.abs(e.x - t.x)
                              , C = S
                              , M = cc.v2(t.x, e.y + e.height * e.scaleY / 2 + 0 + S)
                              , T = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0 + C)
                              , I = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0);
                            S += 35,
                            g.push(S),
                            g.push(A),
                            g.push(C),
                            u.push(M),
                            u.push(T),
                            u.push(I),
                            d.push(180, 90, 0)
                        } else {
                            l = 3;
                            S = c.getRndInteger(100, 150, !0);
                            t.y == m + this.yBaseOffset && (S = m - 0 - e.height * e.scaleY / 2 - v);
                            A = Math.abs(e.x - t.x),
                            C = S,
                            M = cc.v2(t.x, e.y - e.height * e.scaleY / 2 - 0 - S),
                            T = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0 - C),
                            I = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0);
                            S += 35,
                            g.push(S),
                            g.push(A),
                            g.push(C),
                            u.push(M),
                            u.push(T),
                            u.push(I),
                            d.push(0, 90, 180)
                        }
                    } else if (e.y > t.y) {
                        l = 3;
                        S = e.y - e.height * e.scaleY / 2 - 0 - c.getRndInteger(t.y + t.height * t.scaleY / 2 + 170, e.y - e.height * e.scaleY / 2 - 250, !0),
                        A = Math.abs(e.x - t.x),
                        C = e.y - e.height * e.scaleY / 2 - 0 - (t.y + t.height * t.scaleY / 2 + 0) - S;
                        var P = 180
                          , B = 90
                          , w = 180;
                        t.y == -m + this.yBaseOffset ? (S = m - 0 - t.height * t.scaleY / 2 + v,
                        e.y == m + this.yBaseOffset ? C = m - 0 - e.height * e.scaleY / 2 - v : e.y == f + this.yBaseOffset && (C = f - 0 - e.height * e.scaleY / 2 - v)) : t.y == -f + this.yBaseOffset ? (S = f - 0 - t.height * t.scaleY / 2 + v,
                        e.y == m + this.yBaseOffset ? C = m - 0 - e.height * e.scaleY / 2 - v : e.y == f + this.yBaseOffset ? C = f - 0 - e.height * e.scaleY / 2 - v : e.y == -m + this.yBaseOffset && (C = m - 0 - e.height * e.scaleY / 2 + v,
                        w = 0)) : t.y == m + this.yBaseOffset && (S = m - 0 - t.height * t.scaleY / 2 - v,
                        P = 0,
                        e.y == f + this.yBaseOffset && (C = f - 0 - e.height * e.scaleY / 2 - v));
                        M = cc.v2(t.x, t.y + t.height * t.scaleY / 2 + 0 + S);
                        0 == P && (M = cc.v2(t.x, t.y - t.height * t.scaleY / 2 - 0 - S));
                        T = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0 - C),
                        I = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0);
                        0 == w && (T = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0 + C),
                        I = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0)),
                        S += 35,
                        g.push(S),
                        g.push(A),
                        g.push(C),
                        u.push(M),
                        u.push(T),
                        u.push(I),
                        d.push(P),
                        d.push(B),
                        d.push(w)
                    } else if (e.y < t.y) {
                        l = 3;
                        S = t.y - t.height * t.scaleY / 2 - 0 - c.getRndInteger(e.y + e.height * e.scaleY / 2 + 170, t.y - t.height * t.scaleY / 2 - 250, !0),
                        A = Math.abs(e.x - t.x),
                        C = t.y - t.height * t.scaleY / 2 - 0 - (e.y + e.height * e.scaleY / 2 + 0) - S,
                        P = 0,
                        B = 90,
                        w = 0;
                        t.y == m + this.yBaseOffset ? (S = m - 0 - t.height * t.scaleY / 2 - v,
                        e.y == -f + this.yBaseOffset ? C = f - 0 - e.height * e.scaleY / 2 + v : e.y == -m + this.yBaseOffset && (C = m - 0 - e.height * e.scaleY / 2 + v)) : t.y == f + this.yBaseOffset ? (S = f - 0 - t.height * t.scaleY / 2 - v,
                        e.y == m + this.yBaseOffset ? (C = m - 0 - e.height * e.scaleY / 2 - v,
                        w = 180) : e.y == -f + this.yBaseOffset ? C = f - 0 - e.height * e.scaleY / 2 + v : e.y == -m + this.yBaseOffset && (C = m - 0 - e.height * e.scaleY / 2 + v)) : t.y == -m + this.yBaseOffset && (S = m - 0 - t.height * t.scaleY / 2 + v,
                        P = 180,
                        e.y == -f + this.yBaseOffset && (C = f - 0 - e.height * e.scaleY / 2 + v));
                        M = cc.v2(t.x, t.y - t.height * t.scaleY / 2 - 0 - S);
                        180 == P && (M = cc.v2(t.x, t.y + t.height * t.scaleY / 2 + 0 + S));
                        T = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0 + C),
                        I = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0);
                        180 == w && (T = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0 - C),
                        I = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0)),
                        S += 35,
                        g.push(S),
                        g.push(A),
                        g.push(C),
                        u.push(M),
                        u.push(T),
                        u.push(I),
                        d.push(P),
                        d.push(B),
                        d.push(w)
                    }
                } else if (e.x < t.x)
                    if (e.y == t.y) {
                        if (e.y < this.yBaseOffset + 0 || !(e.y > this.yBaseOffset + 0) && 1 == c.getRndInteger(0, 1, !0)) {
                            l = 3;
                            S = c.getRndInteger(100, 150, !0);
                            t.y == -m + this.yBaseOffset && (S = m - 0 - e.height * e.scaleY / 2 + v);
                            A = Math.abs(e.x - t.x),
                            C = S,
                            M = cc.v2(t.x, e.y + e.height * e.scaleY / 2 + 0 + S),
                            T = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0 + C),
                            I = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0);
                            S += 35,
                            g.push(S),
                            g.push(A),
                            g.push(C),
                            u.push(M),
                            u.push(T),
                            u.push(I),
                            d.push(180, -90, 0)
                        } else {
                            l = 3;
                            S = c.getRndInteger(100, 150, !0);
                            t.y == m + this.yBaseOffset && (S = m - 0 - e.height * e.scaleY / 2 - v);
                            A = Math.abs(e.x - t.x),
                            C = S,
                            M = cc.v2(t.x, e.y - e.height * e.scaleY / 2 - 0 - S),
                            T = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0 - C),
                            I = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0);
                            S += 35,
                            g.push(S),
                            g.push(A),
                            g.push(C),
                            u.push(M),
                            u.push(T),
                            u.push(I),
                            d.push(0, -90, 180)
                        }
                    } else if (e.y > t.y) {
                        l = 3;
                        S = e.y - e.height * e.scaleY / 2 - 0 - c.getRndInteger(t.y + t.height * t.scaleY / 2 + 250, e.y - e.height * e.scaleY / 2 - 170, !0),
                        A = Math.abs(e.x - t.x),
                        C = e.y - e.height * e.scaleY / 2 - 0 - (t.y + t.height * t.scaleY / 2 + 0) - S,
                        P = 180,
                        B = -90,
                        w = 180;
                        t.y == -m + this.yBaseOffset ? (S = m - 0 - t.height * t.scaleY / 2 + v,
                        e.y == m + this.yBaseOffset ? C = m - 0 - e.height * e.scaleY / 2 - v : e.y == f + this.yBaseOffset && (C = f - 0 - e.height * e.scaleY / 2 - v)) : t.y == -f + this.yBaseOffset ? (S = f - 0 - t.height * t.scaleY / 2 + v,
                        e.y == m + this.yBaseOffset ? C = m - 0 - e.height * e.scaleY / 2 - v : e.y == f + this.yBaseOffset ? C = f - 0 - e.height * e.scaleY / 2 - v : e.y == -m + this.yBaseOffset && (C = m - 0 - e.height * e.scaleY / 2 + v,
                        w = 0)) : t.y == m + this.yBaseOffset && (S = m - 0 - t.height * t.scaleY / 2 - v,
                        P = 0,
                        e.y == f + this.yBaseOffset && (C = f - 0 - e.height * e.scaleY / 2 - v));
                        M = cc.v2(t.x, t.y + t.height * t.scaleY / 2 + 0 + S);
                        0 == P && (M = cc.v2(t.x, t.y - t.height * t.scaleY / 2 - 0 - S));
                        T = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0 - C),
                        I = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0);
                        0 == w && (T = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0 + C),
                        I = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0)),
                        S += 35,
                        g.push(S),
                        g.push(A),
                        g.push(C),
                        u.push(M),
                        u.push(T),
                        u.push(I),
                        d.push(P),
                        d.push(B),
                        d.push(w)
                    } else if (e.y < t.y) {
                        l = 3;
                        S = t.y - t.height * t.scaleY / 2 - 0 - c.getRndInteger(e.y + e.height * e.scaleY / 2 + 170, t.y - t.height * t.scaleY / 2 - 250, !0),
                        A = Math.abs(e.x - t.x),
                        C = t.y - t.height * t.scaleY / 2 - 0 - (e.y + e.height * e.scaleY / 2 + 0) - S,
                        P = 0,
                        B = -90,
                        w = 0;
                        t.y == m + this.yBaseOffset ? (S = m - 0 - t.height * t.scaleY / 2 - v,
                        e.y == -f + this.yBaseOffset ? C = f - 0 - e.height * e.scaleY / 2 + v : e.y == -m + this.yBaseOffset && (C = m - 0 - e.height * e.scaleY / 2 + v)) : t.y == f + this.yBaseOffset ? (S = f - 0 - t.height * t.scaleY / 2 - v,
                        e.y == m + this.yBaseOffset ? (C = m - 0 - e.height * e.scaleY / 2 - v,
                        w = 180) : e.y == -f + this.yBaseOffset ? C = f - 0 - e.height * e.scaleY / 2 + v : e.y == -m + this.yBaseOffset && (C = m - 0 - e.height * e.scaleY / 2 + v)) : t.y == -m + this.yBaseOffset && (S = m - 0 - t.height * t.scaleY / 2 + v,
                        P = 180,
                        e.y == -f + this.yBaseOffset && (C = f - 0 - e.height * e.scaleY / 2 + v));
                        M = cc.v2(t.x, t.y - t.height * t.scaleY / 2 - 0 - S);
                        180 == P && (M = cc.v2(t.x, t.y + t.height * t.scaleY / 2 + 0 + S));
                        T = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0 + C),
                        I = cc.v2(e.x, e.y + e.height * e.scaleY / 2 + 0);
                        180 == w && (T = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0 - C),
                        I = cc.v2(e.x, e.y - e.height * e.scaleY / 2 - 0)),
                        S += 35,
                        g.push(S),
                        g.push(A),
                        g.push(C),
                        u.push(M),
                        u.push(T),
                        u.push(I),
                        d.push(P),
                        d.push(B),
                        d.push(w)
                    }
                for (var b = [], O = 0; O < l; O++) {
                    var G = i.default.Spawn("line");
                    this.node.addChild(G, this.memberZIndex.line),
                    G.setPosition(u[O]),
                    G.color = this.linePColorArr[n],
                    G.height = g[O],
                    G.angle = d[O],
                    1 == O && (G.height += 20,
                    90 == G.angle ? G.x += 10 : -90 == G.angle && (G.x -= 10)),
                    b.push(G)
                }
                if (this.parkArr.length > 1 && this.MainGame.gameScore >= 8) {
                    for (O = 0; O < b.length; O++)
                        for (var R = 0; R < this.parkArr.length; R++) {
                            if (cc.Intersection.rectRect(b[O].getBoundingBox(), this.parkArr[R].getBoundingBox()) && this.parkArr[R] != e) {
                                for (var _ = this.car1Arr[R].getComponent("Car"), L = 0; L < _.lineArr.length; L++) {
                                    if (cc.Intersection.rectRect(_.lineArr[L].getBoundingBox(), e.getBoundingBox()) && this.car1Arr[R] != t) {
                                        x = cc.v2(0, 0);
                                        var N = 0
                                          , F = 0
                                          , k = 0;
                                        do {
                                            if (N = c.getRndInteger(0, 3, !0),
                                            x.x = a.guidPosX[N],
                                            x.y = a.guidPosY[c.getRndInteger(0, 3, !0)],
                                            k++,
                                            cc.log(333),
                                            k >= 50)
                                                break
                                        } while (c.judgeInArr(x, o) || this.judgeZoom(x, r));
                                        this.zoomDelete(e.position, r),
                                        o = this.posArrDelete(e.position, o),
                                        F = this.judgeIndex(e.position, F),
                                        t.x < -300 && x.x < -300 || t.x > -300 && t.x < 0 && x.x > -300 && x.x < 0 || t.x > 0 && t.x < 300 && x.x > 0 && x.x < 300 || t.x > 300 && x.x > 300 ? e.setPosition(cc.v2(t.x, x.y + this.yBaseOffset)) : (e.setPosition(cc.v2(x.x + h[s[N]], x.y + this.yBaseOffset)),
                                        s[N]++),
                                        s[F]--,
                                        o.push(x);
                                        for (var D = 0; D < b.length; D++)
                                            b[D].destroy();
                                        return b = [],
                                        b = this.createLine(e, t, n, o, a, r, s, h)
                                    }
                                    for (var E = 0; E < this.parkArr.length; E++)
                                        if (cc.Intersection.rectRect(_.lineArr[L].getBoundingBox(), this.parkArr[E].getBoundingBox()) && this.parkArr[E] != e && this.parkArr[E] != this.parkArr[R])
                                            for (var H = this.car1Arr[E].getComponent("Car"), Y = 0; Y < H.lineArr.length; Y++)
                                                if (cc.Intersection.rectRect(H.lineArr[Y].getBoundingBox(), e.getBoundingBox())) {
                                                    x = cc.v2(0, 0);
                                                    var U = 0;
                                                    F = 0,
                                                    k = 0;
                                                    do {
                                                        if (U = c.getRndInteger(0, 3, !0),
                                                        x.x = a.guidPosX[U],
                                                        x.y = a.guidPosY[c.getRndInteger(0, 3, !0)],
                                                        k++,
                                                        cc.log(999),
                                                        k >= 50)
                                                            break
                                                    } while (c.judgeInArr(x, o) || this.judgeZoom(x, r));
                                                    this.zoomDelete(e.position, r),
                                                    o = this.posArrDelete(e.position, o),
                                                    F = this.judgeIndex(e.position, F),
                                                    t.x < -300 && x.x < -300 || t.x > -300 && t.x < 0 && x.x > -300 && x.x < 0 || t.x > 0 && t.x < 300 && x.x > 0 && x.x < 300 || t.x > 300 && x.x > 300 ? e.setPosition(cc.v2(t.x, x.y + this.yBaseOffset)) : (e.setPosition(cc.v2(x.x + h[s[U]], x.y + this.yBaseOffset)),
                                                    s[U]++),
                                                    s[F]--,
                                                    o.push(x);
                                                    for (D = 0; D < b.length; D++)
                                                        b[D].destroy();
                                                    return b = [],
                                                    b = this.createLine(e, t, n, o, a, r, s, h)
                                                }
                                }
                                for (var j = 0; j < b.length; j++)
                                    if (cc.Intersection.rectRect(b[j].getBoundingBox(), this.car1Arr[R].getBoundingBox()) && this.car1Arr[R] != t) {
                                        x = cc.v2(0, 0);
                                        var J = 0;
                                        F = 0,
                                        k = 0;
                                        do {
                                            if (J = c.getRndInteger(0, 3, !0),
                                            x.x = a.guidPosX[J],
                                            x.y = a.guidPosY[c.getRndInteger(0, 3, !0)],
                                            k++,
                                            cc.log(555),
                                            k >= 50)
                                                break
                                        } while (c.judgeInArr(x, o) || this.judgeZoom(x, r));
                                        this.zoomDelete(e.position, r),
                                        o = this.posArrDelete(e.position, o),
                                        F = this.judgeIndex(e.position, F),
                                        t.x < -300 && x.x < -300 || t.x > -300 && t.x < 0 && x.x > -300 && x.x < 0 || t.x > 0 && t.x < 300 && x.x > 0 && x.x < 300 || t.x > 300 && x.x > 300 ? e.setPosition(cc.v2(t.x, x.y + this.yBaseOffset)) : (e.setPosition(cc.v2(x.x + h[s[J]], x.y + this.yBaseOffset)),
                                        s[J]++),
                                        s[F]--,
                                        o.push(x);
                                        for (D = 0; D < b.length; D++)
                                            b[D].destroy();
                                        return b = [],
                                        b = this.createLine(e, t, n, o, a, r, s, h)
                                    }
                            }
                            if (cc.Intersection.rectRect(b[O].getBoundingBox(), this.car1Arr[R].getBoundingBox()) && this.car1Arr[R] != t)
                                for (var W = this.car1Arr[R].getComponent("Car"), q = 0; q < W.lineArr.length; q++) {
                                    if (cc.Intersection.rectRect(t.getBoundingBox(), W.lineArr[q].getBoundingBox()) && this.car1Arr[R] != t) {
                                        x = cc.v2(0, 0);
                                        var z = 0;
                                        F = 0,
                                        k = 0;
                                        do {
                                            if (z = c.getRndInteger(0, 3, !0),
                                            x.x = a.guidPosX[z],
                                            x.y = a.guidPosY[c.getRndInteger(0, 3, !0)],
                                            k++,
                                            cc.log(444),
                                            k >= 50)
                                                break
                                        } while (c.judgeInArr(x, o) || this.judgeZoom(x, r));
                                        this.zoomDelete(e.position, r),
                                        o = this.posArrDelete(e.position, o),
                                        F = this.judgeIndex(e.position, F),
                                        t.x < -300 && x.x < -300 || t.x > -300 && t.x < 0 && x.x > -300 && x.x < 0 || t.x > 0 && t.x < 300 && x.x > 0 && x.x < 300 || t.x > 300 && x.x > 300 ? e.setPosition(cc.v2(t.x, x.y + this.yBaseOffset)) : (e.setPosition(cc.v2(x.x + h[s[z]], x.y + this.yBaseOffset)),
                                        s[z]++),
                                        s[F]--,
                                        o.push(x);
                                        for (D = 0; D < b.length; D++)
                                            b[D].destroy();
                                        return b = [],
                                        b = this.createLine(e, t, n, o, a, r, s, h)
                                    }
                                    if (this.car1Arr.length >= 3)
                                        for (E = 0; E < this.car1Arr.length; E++)
                                            if (cc.Intersection.rectRect(W.lineArr[q].getBoundingBox(), this.car1Arr[E].getBoundingBox()) && this.car1Arr[E] != this.car1Arr[R])
                                                for (H = this.car1Arr[E].getComponent("Car"),
                                                L = 0; L < H.lineArr.length; L++)
                                                    if (cc.Intersection.rectRect(H.lineArr[L].getBoundingBox(), t)) {
                                                        x = cc.v2(0, 0);
                                                        var Z = 0;
                                                        F = 0,
                                                        k = 0;
                                                        do {
                                                            if (Z = c.getRndInteger(0, 3, !0),
                                                            x.x = a.guidPosX[Z],
                                                            x.y = a.guidPosY[c.getRndInteger(0, 3, !0)],
                                                            k++,
                                                            cc.log(888),
                                                            k >= 50)
                                                                break
                                                        } while (c.judgeInArr(x, o) || this.judgeZoom(x, r));
                                                        this.zoomDelete(e.position, r),
                                                        o = this.posArrDelete(e.position, o),
                                                        F = this.judgeIndex(e.position, F),
                                                        t.x < -300 && x.x < -300 || t.x > -300 && t.x < 0 && x.x > -300 && x.x < 0 || t.x > 0 && t.x < 300 && x.x > 0 && x.x < 300 || t.x > 300 && x.x > 300 ? e.setPosition(cc.v2(t.x, x.y + this.yBaseOffset)) : (e.setPosition(cc.v2(x.x + h[s[Z]], x.y + this.yBaseOffset)),
                                                        s[Z]++),
                                                        s[F]--,
                                                        o.push(x);
                                                        for (D = 0; D < b.length; D++)
                                                            b[D].destroy();
                                                        return b = [],
                                                        b = this.createLine(e, t, n, o, a, r, s, h)
                                                    }
                                }
                        }
                    if (this.car1Arr.length >= 2)
                        for (O = 0; O < this.car1Arr.length; O++) {
                            var X = this.car1Arr[O].getComponent("Car")
                              , K = !1
                              , V = !1
                              , Q = 0
                              , $ = null
                              , ee = null
                              , te = null
                              , ne = null;
                            for (L = 0; L < X.lineArr.length; L++) {
                                cc.Intersection.rectRect(X.lineArr[L].getBoundingBox(), t.getBoundingBox()) && (K = !0),
                                cc.Intersection.rectRect(X.lineArr[L].getBoundingBox(), e.getBoundingBox()) && (V = !0);
                                for (R = 0; R < this.parkArr.length; R++)
                                    O != R && (cc.Intersection.rectRect(X.lineArr[L].getBoundingBox(), this.parkArr[R].getBoundingBox()) && (Q++,
                                    $ = this.parkArr[R],
                                    ee = this.car1Arr[R]),
                                    cc.Intersection.rectRect(X.lineArr[L].getBoundingBox(), this.car1Arr[R].getBoundingBox()) && (Q++,
                                    te = this.car1Arr[R],
                                    ne = this.parkArr[R]))
                            }
                            if (K && V) {
                                x = cc.v2(0, 0);
                                var oe = 0;
                                F = 0,
                                k = 0;
                                do {
                                    if (oe = c.getRndInteger(0, 3, !0),
                                    x.x = a.guidPosX[oe],
                                    x.y = a.guidPosY[c.getRndInteger(0, 3, !0)],
                                    k++,
                                    cc.log(666),
                                    k >= 50)
                                        break
                                } while (c.judgeInArr(x, o) || this.judgeZoom(x, r));
                                this.zoomDelete(e.position, r),
                                o = this.posArrDelete(e.position, o),
                                F = this.judgeIndex(e.position, F),
                                t.x < -300 && x.x < -300 || t.x > -300 && t.x < 0 && x.x > -300 && x.x < 0 || t.x > 0 && t.x < 300 && x.x > 0 && x.x < 300 || t.x > 300 && x.x > 300 ? e.setPosition(cc.v2(t.x, x.y + this.yBaseOffset)) : (e.setPosition(cc.v2(x.x + h[s[oe]], x.y + this.yBaseOffset)),
                                s[oe]++),
                                s[F]--,
                                o.push(x);
                                for (D = 0; D < b.length; D++)
                                    b[D].destroy();
                                return b = [],
                                b = this.createLine(e, t, n, o, a, r, s, h)
                            }
                            if (te && $) {
                                var ae = ee.getComponent("Car");
                                for (L = 0; L < ae.lineArr.length; L++)
                                    if (cc.Intersection.rectRect(ae.lineArr[L].getBoundingBox(), ne.getBoundingBox())) {
                                        cc.log(this.car1Arr);
                                        x = cc.v2(0, 0);
                                        var ce = 0;
                                        F = 0,
                                        k = 0;
                                        do {
                                            if (ce = c.getRndInteger(0, 3, !0),
                                            x.x = a.guidPosX[ce],
                                            x.y = a.guidPosY[c.getRndInteger(0, 3, !0)],
                                            k++,
                                            cc.log(777),
                                            k >= 50)
                                                return b
                                        } while (c.judgeInArr(x, o) || this.judgeZoom(x, r));
                                        this.zoomDelete(e.position, r),
                                        o = this.posArrDelete(e.position, o),
                                        F = this.judgeIndex(e.position, F),
                                        t.x < -300 && x.x < -300 || t.x > -300 && t.x < 0 && x.x > -300 && x.x < 0 || t.x > 0 && t.x < 300 && x.x > 0 && x.x < 300 || t.x > 300 && x.x > 300 ? e.setPosition(cc.v2(t.x, x.y + this.yBaseOffset)) : (e.setPosition(cc.v2(x.x + h[s[ce]], x.y + this.yBaseOffset)),
                                        s[ce]++),
                                        s[F]--,
                                        o.push(x);
                                        for (D = 0; D < b.length; D++)
                                            b[D].destroy();
                                        return b = [],
                                        b = this.createLine(e, t, n, o, a, r, s, h)
                                    }
                                for (H = te.getComponent("Car"),
                                L = 0; L < H.lineArr.length; L++)
                                    if (cc.Intersection.rectRect(H.lineArr[L].getBoundingBox(), ee.getBoundingBox())) {
                                        cc.log(this.car1Arr);
                                        x = cc.v2(0, 0),
                                        ce = 0,
                                        F = 0,
                                        k = 0;
                                        do {
                                            if (ce = c.getRndInteger(0, 3, !0),
                                            x.x = a.guidPosX[ce],
                                            x.y = a.guidPosY[c.getRndInteger(0, 3, !0)],
                                            k++,
                                            cc.log(777777),
                                            k >= 50)
                                                return b
                                        } while (c.judgeInArr(x, o) || this.judgeZoom(x, r));
                                        this.zoomDelete(e.position, r),
                                        o = this.posArrDelete(e.position, o),
                                        F = this.judgeIndex(e.position, F),
                                        t.x < -300 && x.x < -300 || t.x > -300 && t.x < 0 && x.x > -300 && x.x < 0 || t.x > 0 && t.x < 300 && x.x > 0 && x.x < 300 || t.x > 300 && x.x > 300 ? e.setPosition(cc.v2(t.x, x.y + this.yBaseOffset)) : (e.setPosition(cc.v2(x.x + h[s[ce]], x.y + this.yBaseOffset)),
                                        s[ce]++),
                                        s[F]--,
                                        o.push(x);
                                        for (D = 0; D < b.length; D++)
                                            b[D].destroy();
                                        return b = [],
                                        b = this.createLine(e, t, n, o, a, r, s, h)
                                    }
                            }
                            if (Q >= 50) {
                                x = cc.v2(0, 0);
                                var re = 0;
                                F = 0,
                                k = 0;
                                do {
                                    if (re = c.getRndInteger(0, 3, !0),
                                    x.x = a.guidPosX[re],
                                    x.y = a.guidPosY[c.getRndInteger(0, 3, !0)],
                                    k++,
                                    cc.log(1111),
                                    k >= 50)
                                        return b
                                } while (c.judgeInArr(x, o) || this.judgeZoom(x, r));
                                this.zoomDelete(e.position, r),
                                o = this.posArrDelete(e.position, o),
                                F = this.judgeIndex(e.position, F),
                                t.x < -300 && x.x < -300 || t.x > -300 && t.x < 0 && x.x > -300 && x.x < 0 || t.x > 0 && t.x < 300 && x.x > 0 && x.x < 300 || t.x > 300 && x.x > 300 ? e.setPosition(cc.v2(t.x, x.y + this.yBaseOffset)) : (e.setPosition(cc.v2(x.x + h[s[re]], x.y + this.yBaseOffset)),
                                s[re]++),
                                s[F]--,
                                o.push(x);
                                for (D = 0; D < b.length; D++)
                                    b[D].destroy();
                                return b = [],
                                b = this.createLine(e, t, n, o, a, r, s, h)
                            }
                        }
                }
                return b
            }
            ,
            t.prototype.zoomDelete = function(e, t) {
                t[e.x > 0 ? e.y > 0 ? 0 : 3 : e.y > 0 ? 1 : 2]--
            }
            ,
            t.prototype.posArrDelete = function(e, t) {
                if (e.x < -300) {
                    var n = t.indexOf(cc.v2(-390, e.y));
                    t.splice(n, 1)
                } else if (e.x > -300 && e.x < 0) {
                    n = t.indexOf(cc.v2(-200, e.y));
                    t.splice(n, 1)
                } else if (e.x > 0 && e.x < 300) {
                    n = t.indexOf(cc.v2(200, e.y));
                    t.splice(n, 1)
                } else if (e.x > 300) {
                    n = t.indexOf(cc.v2(390, e.y));
                    t.splice(n, 1)
                }
                return t
            }
            ,
            t.prototype.judgeIndex = function(e, t) {
                return e.x < -300 ? t = 0 : e.x > -300 && e.x < 0 ? t = 1 : e.x > 0 && e.x < 300 ? t = 2 : e.x > 300 && (t = 3),
                t
            }
            ,
            t.prototype.createObj = function(e) {
                var t = i.default.Spawn("tree" + e.toString());
                this.node.addChild(t, this.memberZIndex.tree),
                t.setScale(c.getRndInteger(7, 13, !0) / 10 * this.smallScale);
                var n = cc.v2(0, 0);
                t.setPosition(n),
                this.treeArr.push(t)
            }
            ,
            t.prototype.touchJudge = function(e) {
                for (var t = c.worldConvertLocalPointAR(this.node, e), n = 0; n < this.car1Arr.length; n++) {
                    var o = this.car1Arr[n];
                    if (t.x > o.x - o.width / 2 && t.x < o.x + o.width / 2)
                        if (t.y > o.y - o.height / 2 && t.y < o.y + o.height / 2)
                            return void ((s = o.getComponent("Car")).success || s.touch || s.startMove());
                    var a = this.parkArr[n];
                    if (t.x > a.x - a.width * a.scaleX / 2 && t.x < a.x + a.width * a.scaleX / 2 && t.y > a.y - a.height * a.scaleY / 2 && t.y < a.y + a.height * a.scaleY / 2) {
                        for (var r = 0; r < this.car1Arr.length; r++)
                            if (cc.Intersection.rectRect(a.getBoundingBox(), this.car1Arr[r].getBoundingBox())) {
                                var i = this.car1Arr[r].getComponent("Car");
                                return void (i.success || i.touch || i.startMove())
                            }
                        var s;
                        return void ((s = o.getComponent("Car")).success || s.touch || s.startMove())
                    }
                }
            }
            ,
            t.prototype.rise = function() {
                this.currentCar1Count--;
                var e = 1 / this.car1Arr.length;
                this.MainGame.UICon.setProgress(e),
                0 == this.currentCar1Count && (this.gamePause(),
                this.scheduleOnce(function() {
                    this.MainGame.gainScore()
                }, 1))
            }
            ,
            t.prototype.gameOver = function(e) {
                this.gameOverStart || (this.gameOverStart = !0,
                this.gamePause(),
                this.gameOverAnim(e),
                this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {
                    this.MainGame.gameEnd()
                }, this))))
            }
            ,
            t.prototype.gamePause = function() {
                r.noTouchBool = !1;
                for (var e = 0; e < this.roadArr.length; e++)
                    this.roadArr[e].getComponent("RoadManager").launch = !1,
                    this.roadArr[e].stopAllActions()
            }
            ,
            t.prototype.gameOverAnim = function(e) {
                e = c.worldConvertLocalPointAR(this.node, e);
                for (var t = 0; t < 4; t++) {
                    var n = i.default.Spawn("ring");
                    this.node.addChild(n, this.memberZIndex.particle),
                    n.setPosition(e),
                    n.setScale(0),
                    n.setContentSize(200 - 50 * t, 200 - 50 * t),
                    n.runAction(cc.sequence(cc.delayTime(.2 * t), cc.scaleTo(.3, 1 + t), cc.fadeOut(.1), cc.removeSelf()))
                }
                for (t = 0; t < c.getRndInteger(25, 30, !0); t++) {
                    var o = i.default.Spawn("point");
                    this.node.addChild(o, this.memberZIndex.particle),
                    o.setPosition(e),
                    o.setScale(c.getRndInteger(10, 30, !0) / 10);
                    var a = cc.misc.degreesToRadians(c.getRndInteger(0, 360, !0))
                      , r = c.getRndInteger(50, 400, !0)
                      , s = cc.v2(r * Math.cos(a), r * Math.sin(a));
                    o.runAction(cc.sequence(cc.sequence(cc.moveBy(r / 400, s), cc.fadeOut(.1)), cc.removeSelf()))
                }
            }
            ,
            t.prototype.clearMap = function(e) {
                for (var t = this.roadArr.length, n = 0; n < t; n++)
                    this.roadArr[n].runAction(cc.sequence(cc.delayTime(e), cc.removeSelf()));
                var o = this.car1Arr.length;
                for (n = 0; n < o; n++)
                    this.car1Arr[n].runAction(cc.sequence(cc.delayTime(e), cc.removeSelf()));
                var a = this.car2Arr.length;
                for (n = 0; n < a; n++)
                    this.car2Arr[n].y > s.default.Instance.node.y + 1.25 * this.MainGame.gameHeight / 2 ? this.car2Arr[n].destroy() : (this.car2Arr[n].stopAllActions(),
                    this.car2Arr[n].runAction(cc.sequence(cc.delayTime(e), cc.removeSelf())));
                var c = this.parkArr.length;
                for (n = 0; n < c; n++)
                    this.parkArr[n].runAction(cc.sequence(cc.delayTime(e), cc.removeSelf()));
                var r = this.treeArr.length;
                for (n = 0; n < r; n++)
                    this.treeArr[n].runAction(cc.sequence(cc.delayTime(e), cc.removeSelf()))
            }
            ,
            t.Instance = null,
            a([u(cc.Node)], t.prototype, "mainGame", void 0),
            a([u(cc.SpriteFrame)], t.prototype, "cubeSpriteFrame", void 0),
            t = n = a([l], t)
        }(cc.Component);
        n.default = g,
        cc._RF.pop()
    }
    , {
        "../commonJs/GameConfig": "GameConfig",
        "../commonJs/GameTools": "GameTools",
        "./MainCamera": "MainCamera",
        "./PoolManager": "PoolManager"
    }],
    MusicManager: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "29b70ylQlVLNbeDp3lvsygj", "MusicManager");
        var o = this && this.__extends || function() {
            var e = function(t, n) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                )(t, n)
            };
            return function(t, n) {
                function o() {
                    this.constructor = t
                }
                e(t, n),
                t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype,
                new o)
            }
        }()
          , a = this && this.__decorate || function(e, t, n, o) {
            var a, c = arguments.length, r = c < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, o);
            else
                for (var i = e.length - 1; i >= 0; i--)
                    (a = e[i]) && (r = (c < 3 ? a(r) : c > 3 ? a(t, n, r) : a(t, n)) || r);
            return c > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = cc._decorator
          , r = c.ccclass
          , i = c.property
          , s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.allMusic = [],
                t
            }
            var n;
            return o(t, e),
            n = t,
            t.prototype.onLoad = function() {
                null != n.Instance && n.Instance.destroy(),
                n.Instance = this
            }
            ,
            t.prototype.start = function() {}
            ,
            t.prototype.playMusic = function(e, t, n) {
                cc.audioEngine.play(this.allMusic[e], n, t)
            }
            ,
            t.prototype.stopMusic = function() {}
            ,
            t.Instance = null,
            a([i({
                type: cc.AudioClip
            })], t.prototype, "allMusic", void 0),
            t = n = a([r], t)
        }(cc.Component);
        n.default = s,
        cc._RF.pop()
    }
    , {}],
    PoolManager: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "1e5c17orU9FKYboWaaUobsX", "PoolManager");
        var o = this && this.__extends || function() {
            var e = function(t, n) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                )(t, n)
            };
            return function(t, n) {
                function o() {
                    this.constructor = t
                }
                e(t, n),
                t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype,
                new o)
            }
        }()
          , a = this && this.__decorate || function(e, t, n, o) {
            var a, c = arguments.length, r = c < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, o);
            else
                for (var i = e.length - 1; i >= 0; i--)
                    (a = e[i]) && (r = (c < 3 ? a(r) : c > 3 ? a(t, n, r) : a(t, n)) || r);
            return c > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = cc._decorator
          , r = c.ccclass
          , i = c.property
          , s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.allPrefab = [],
                t.allPrefabMap = null,
                t.poolMap = null,
                t
            }
            var n;
            return o(t, e),
            n = t,
            t.prototype.onLoad = function() {
                null != n.Instance && n.Instance.destroy(),
                n.Instance = this,
                this.allPrefabMap = new Map,
                this.poolMap = new Map;
                for (var e = 0; e < this.allPrefab.length; e++) {
                    this.allPrefabMap.set(this.allPrefab[e].name, this.allPrefab[e]),
                    cc.log(this.allPrefab[e].name);
                    var t = new cc.NodePool;
                    this.poolMap.set(this.allPrefab[e].name, t)
                }
            }
            ,
            t.Spawn = function(e, t) {
                if (void 0 === t && (t = null),
                !n.Instance.poolMap.has(e))
                    return cc.warn("no prefab named " + e),
                    null;
                var o = n.Instance.poolMap.get(e);
                if (o.size() > 0) {
                    var a = o.get();
                    return null != t && (a.parent = t),
                    a
                }
                var c = cc.instantiate(n.Instance.allPrefabMap.get(e));
                return null != t && (c.parent = t),
                c
            }
            ,
            t.Despawn = function(e, t) {
                if (!n.Instance.poolMap.has(e))
                    return cc.log("\u56de\u6536\u5931\u8d25,\u8282\u70b9\u540d : " + e),
                    null;
                n.Instance.poolMap.get(e).put(t)
            }
            ,
            t.GetPrefab = function(e) {
                return n.Instance.allPrefabMap.has(e) ? n.Instance.allPrefabMap.get(e) : null
            }
            ,
            t.Preload = function(e, t) {
                if (!n.Instance.poolMap.has(e))
                    return null;
                for (var o = n.Instance.poolMap.get(e), a = 0; a < t; a++) {
                    var c = cc.instantiate(n.Instance.allPrefabMap.get(e));
                    o.put(c)
                }
            }
            ,
            t.Instance = null,
            a([i([cc.Prefab])], t.prototype, "allPrefab", void 0),
            t = n = a([r], t)
        }(cc.Component);
        n.default = s,
        cc._RF.pop()
    }
    , {}],
    Ribbon: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "9fc656MHrxPCJia7/r9vf0c", "Ribbon");
        var o = this && this.__extends || function() {
            var e = function(t, n) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                )(t, n)
            };
            return function(t, n) {
                function o() {
                    this.constructor = t
                }
                e(t, n),
                t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype,
                new o)
            }
        }()
          , a = this && this.__decorate || function(e, t, n, o) {
            var a, c = arguments.length, r = c < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, o);
            else
                for (var i = e.length - 1; i >= 0; i--)
                    (a = e[i]) && (r = (c < 3 ? a(r) : c > 3 ? a(t, n, r) : a(t, n)) || r);
            return c > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("../commonJs/GameTools")
          , r = cc._decorator
          , i = r.ccclass
          , s = r.property
          , h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.ribbonPre = null,
                t.ribbonSpriteFrame = [],
                t.ribbonPool = null,
                t.ribbonArr = [],
                t
            }
            return o(t, e),
            t.prototype.onLoad = function() {
                this.ribbonPool = new cc.NodePool;
                for (var e = 0; e < 80; e++) {
                    var t = cc.instantiate(this.ribbonPre);
                    t.getComponent(cc.Sprite).spriteFrame = this.ribbonSpriteFrame[c.getRndInteger(0, 4, !0)],
                    this.ribbonPool.put(t)
                }
            }
            ,
            t.prototype.start = function() {}
            ,
            t.prototype.createRibbon = function(e) {
                for (var t = [[360, 0], [-360, 0], [360, -71], [-360, -71]], n = 0; n < t.length; n++) {
                    if (t[n][0] >= 0)
                        var o = 1;
                    else
                        o = -1;
                    for (var a = 0; a < e; a++) {
                        var r = null;
                        (r = this.ribbonPool.size() > 0 ? this.ribbonPool.get() : cc.instantiate(this.ribbonPre)).parent = this.node,
                        r.setPosition(cc.v2(t[n][0], t[n][1])),
                        r.setScale(c.getRndInteger(6, 8, !0) / 10),
                        this.ribbonArr.push(r);
                        var i = r.position
                          , s = i.x + c.getRndInteger(.5 * -cc.winSize.width, .05 * -cc.winSize.width, !0) * o
                          , h = i.y + c.getRndInteger(100, 500, !0)
                          , l = cc.v2(i.x + .8 * (s - i.x), i.y + .5 * (h - i.y) + 200);
                        r.runAction(cc.spawn(cc.bezierTo(1, [i, l, cc.v2(s, h)]).easing(cc.easeCircleActionOut()), cc.moveBy(2.8, 0, 1.5 * -cc.winSize.height * c.getRndInteger(8, 12, !0) / 10).easing(cc.easeCubicActionIn()), cc.moveBy(2.8, c.getRndInteger(-300, 0, !0) * o, 0), cc.rotateBy(2, c.getRndInteger(360, 720, !0) * (2 * Math.round(Math.random()) - 1)), cc.sequence(cc.moveBy(2 * (.1 * Math.random() + .3), (25 * Math.random() + 25) * (2 * Math.round(Math.random()) - 1), 0), cc.moveBy(2 * (.1 * Math.random() + .3), (25 * Math.random() + 25) * (2 * Math.round(Math.random()) - 1), 0), cc.moveBy(2 * (.1 * Math.random() + .3), (25 * Math.random() + 25) * (2 * Math.round(Math.random()) - 1), 0))))
                    }
                }
                this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function() {
                    for (var e = 0; e < this.ribbonArr.length; e++)
                        this.ribbonPool.put(this.ribbonArr[e]);
                    this.ribbonArr = []
                }, this)))
            }
            ,
            t.prototype.clear = function() {
                this.node.stopAllActions();
                for (var e = 0; e < this.ribbonArr.length; e++)
                    this.ribbonArr[e].stopAllActions(),
                    this.ribbonPool.put(this.ribbonArr[e]);
                this.ribbonArr = []
            }
            ,
            a([s(cc.Prefab)], t.prototype, "ribbonPre", void 0),
            a([s([cc.SpriteFrame])], t.prototype, "ribbonSpriteFrame", void 0),
            t = a([i], t)
        }(cc.Component);
        n.default = h,
        cc._RF.pop()
    }
    , {
        "../commonJs/GameTools": "GameTools"
    }],
    RoadManager: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "e03bdl7gBNPKK+32p15bJjT", "RoadManager");
        var o = this && this.__extends || function() {
            var e = function(t, n) {
                return (e = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t
                }
                || function(e, t) {
                    for (var n in t)
                        t.hasOwnProperty(n) && (e[n] = t[n])
                }
                )(t, n)
            };
            return function(t, n) {
                function o() {
                    this.constructor = t
                }
                e(t, n),
                t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype,
                new o)
            }
        }()
          , a = this && this.__decorate || function(e, t, n, o) {
            var a, c = arguments.length, r = c < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                r = Reflect.decorate(e, t, n, o);
            else
                for (var i = e.length - 1; i >= 0; i--)
                    (a = e[i]) && (r = (c < 3 ? a(r) : c > 3 ? a(t, n, r) : a(t, n)) || r);
            return c > 3 && r && Object.defineProperty(t, n, r),
            r
        }
        ;
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var c = e("../commonJs/GameTools")
          , r = e("./MapManager")
          , i = cc._decorator
          , s = i.ccclass
          , h = i.property
          , l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.type = 0,
                t.launch = !1,
                t.isTwo = !0,
                t.posArr = [],
                t.endPosArr = [],
                t.launchDTArr = [],
                t
            }
            return o(t, e),
            t.prototype.onLoad = function() {
                if (1 == this.type) {
                    var e = cc.v2(-61.875, -r.default.Instance.MainGame.gameHeight / 2 - 300)
                      , t = cc.v2(61.875, -r.default.Instance.MainGame.gameHeight / 2 - 300);
                    this.posArr.push(e),
                    this.posArr.push(t);
                    var n = cc.v2(-61.875, r.default.Instance.MainGame.gameHeight / 2 + 300 + r.default.Instance.yBaseOffset)
                      , o = cc.v2(61.875, r.default.Instance.MainGame.gameHeight / 2 + 300 + r.default.Instance.yBaseOffset);
                    this.endPosArr.push(n),
                    this.endPosArr.push(o)
                } else if (2 == this.type) {
                    e = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, 0),
                    t = cc.v2(0, -r.default.Instance.MainGame.gameHeight / 2 - 300);
                    var a = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, 0)
                      , c = cc.v2(0, r.default.Instance.MainGame.gameHeight / 2 + 300)
                      , i = cc.v2(0, -r.default.Instance.MainGame.gameHeight / 2 - 300)
                      , s = cc.v2(0, -r.default.Instance.MainGame.gameHeight / 2 - 300);
                    cc.v2(0, r.default.Instance.MainGame.gameHeight / 2 + 300),
                    cc.v2(0, r.default.Instance.MainGame.gameHeight / 2 + 300);
                    this.posArr.push(t),
                    this.posArr.push(c);
                    n = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, r.default.Instance.yBaseOffset),
                    o = cc.v2(0, r.default.Instance.MainGame.gameHeight / 2 + 300 + r.default.Instance.yBaseOffset);
                    var h = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, r.default.Instance.yBaseOffset)
                      , l = cc.v2(0, -r.default.Instance.MainGame.gameHeight / 2 - 300 + r.default.Instance.yBaseOffset)
                      , u = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, r.default.Instance.yBaseOffset)
                      , g = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, r.default.Instance.yBaseOffset);
                    cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, r.default.Instance.yBaseOffset),
                    cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, r.default.Instance.yBaseOffset);
                    this.endPosArr.push(o),
                    this.endPosArr.push(l)
                } else if (3 == this.type) {
                    e = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, 0),
                    t = cc.v2(-61.875, r.default.Instance.MainGame.gameHeight / 2 + 300),
                    a = cc.v2(61.875, r.default.Instance.MainGame.gameHeight / 2 + 300);
                    this.posArr.push(t),
                    this.posArr.push(a);
                    n = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, r.default.Instance.yBaseOffset),
                    o = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, r.default.Instance.yBaseOffset),
                    h = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, r.default.Instance.yBaseOffset);
                    this.endPosArr.push(o),
                    this.endPosArr.push(h)
                } else if (4 == this.type) {
                    e = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, 0),
                    t = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, 0),
                    a = cc.v2(-61.875, -r.default.Instance.MainGame.gameHeight / 2 - 300),
                    c = cc.v2(61.875, -r.default.Instance.MainGame.gameHeight / 2 - 300),
                    i = cc.v2(0, r.default.Instance.MainGame.gameHeight / 2 + 300),
                    s = cc.v2(0, r.default.Instance.MainGame.gameHeight / 2 + 300);
                    this.posArr.push(a),
                    this.posArr.push(c),
                    this.posArr.push(i),
                    this.posArr.push(s);
                    n = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, r.default.Instance.yBaseOffset),
                    o = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, r.default.Instance.yBaseOffset),
                    h = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, r.default.Instance.yBaseOffset),
                    l = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, r.default.Instance.yBaseOffset),
                    u = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, r.default.Instance.yBaseOffset),
                    g = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, r.default.Instance.yBaseOffset);
                    this.endPosArr.push(h),
                    this.endPosArr.push(l),
                    this.endPosArr.push(u),
                    this.endPosArr.push(g)
                } else if (5 == this.type) {
                    e = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, 0),
                    t = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, 0),
                    a = cc.v2(0, -r.default.Instance.MainGame.gameHeight / 2 - 300),
                    c = cc.v2(0, -r.default.Instance.MainGame.gameHeight / 2 - 300),
                    i = cc.v2(-61.875, r.default.Instance.MainGame.gameHeight / 2 + 300),
                    s = cc.v2(61.875, r.default.Instance.MainGame.gameHeight / 2 + 300);
                    this.posArr.push(a),
                    this.posArr.push(c),
                    this.posArr.push(i),
                    this.posArr.push(s);
                    n = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, r.default.Instance.yBaseOffset),
                    o = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, r.default.Instance.yBaseOffset),
                    h = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, r.default.Instance.yBaseOffset),
                    l = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, r.default.Instance.yBaseOffset),
                    u = cc.v2(-r.default.Instance.MainGame.gameWidth / 2 - 150, r.default.Instance.yBaseOffset),
                    g = cc.v2(r.default.Instance.MainGame.gameWidth / 2 + 150, r.default.Instance.yBaseOffset);
                    this.endPosArr.push(h),
                    this.endPosArr.push(l),
                    this.endPosArr.push(u),
                    this.endPosArr.push(g)
                }
            }
            ,
            t.prototype.start = function() {}
            ,
            t.prototype.init = function() {
                2 == this.type && (0 == c.getRndInteger(0, 1, !0) ? (this.posArr.splice(0, 1),
                this.endPosArr.splice(0, 1)) : (this.posArr.splice(1, 1),
                this.endPosArr.splice(1, 1))),
                this.launchDTArr = [1.3],
                this.launch = !0
            }
            ,
            t.prototype.createCar = function(e) {
                var t = r.default.Instance.createCar(this.posArr[e], 2, 0, 0).getComponent("Car");
                if (2 == this.type) {
                    var n = cc.v2(0, r.default.Instance.yBaseOffset);
                    t.targetPosArr.push(n),
                    t.targetPosArr.push(this.endPosArr[e])
                } else if (3 == this.type) {
                    if (0 == e) {
                        n = cc.v2(-61.875, r.default.Instance.yBaseOffset);
                        t.targetPosArr.push(n),
                        t.leftLight.color = t.lightOpenColor
                    } else {
                        n = cc.v2(61.875, r.default.Instance.yBaseOffset);
                        t.targetPosArr.push(n),
                        t.RightLight.color = t.lightOpenColor
                    }
                    t.targetPosArr.push(this.endPosArr[e])
                } else if (4 == this.type) {
                    if (0 == e) {
                        n = cc.v2(-61.875, r.default.Instance.yBaseOffset);
                        t.targetPosArr.push(n),
                        t.RightLight.color = t.lightOpenColor
                    } else if (1 == e) {
                        n = cc.v2(61.875, r.default.Instance.yBaseOffset);
                        t.targetPosArr.push(n),
                        t.leftLight.color = t.lightOpenColor
                    } else if (2 == e || 3 == e) {
                        n = cc.v2(0, r.default.Instance.yBaseOffset);
                        t.targetPosArr.push(n),
                        2 == e ? t.leftLight.color = t.lightOpenColor : t.RightLight.color = t.lightOpenColor
                    }
                    t.targetPosArr.push(this.endPosArr[e])
                } else if (5 == this.type) {
                    if (0 == e || 1 == e) {
                        n = cc.v2(0, r.default.Instance.yBaseOffset);
                        t.targetPosArr.push(n),
                        0 == e ? t.RightLight.color = t.lightOpenColor : t.leftLight.color = t.lightOpenColor
                    } else if (2 == e) {
                        n = cc.v2(-61.875, r.default.Instance.yBaseOffset);
                        t.targetPosArr.push(n),
                        t.leftLight.color = t.lightOpenColor
                    } else if (3 == e) {
                        n = cc.v2(61.875, r.default.Instance.yBaseOffset);
                        t.targetPosArr.push(n),
                        t.RightLight.color = t.lightOpenColor
                    }
                    t.targetPosArr.push(this.endPosArr[e])
                } else
                    t.targetPosArr.push(this.endPosArr[e]);
                t.canMove = !0
            }
            ,
            t.prototype.update = function(e) {
                if (this.launch)
                    for (var t = function(t) {
                        if (n.launchDTArr[t] -= e,
                        n.launchDTArr[t] <= 0 && r.default.Instance.car2Arr.length < r.default.Instance.car2BornConfig.maxCarCount) {
                            var o = r.default.Instance.car2BornConfig;
                            if (n.launchDTArr[t] = c.getRndInteger(o.minTime, o.maxTime, !1),
                            1 == n.type) {
                                var a = c.getRndInteger(0, 1, !0);
                                n.createCar(a)
                            } else if (3 == n.type) {
                                a = c.getRndInteger(0, 1, !0);
                                n.createCar(a)
                            } else if (2 == n.type) {
                                n.launchDTArr[t] = 1e3;
                                var i = c.getRndInteger(o.minTime, o.maxTime, !1);
                                n.createCar(0),
                                n.node.runAction(cc.sequence(cc.delayTime(i), cc.callFunc(function() {
                                    this.launchDTArr[t] = 0
                                }, n)))
                            } else if (4 == n.type) {
                                var s = c.getRndInteger(1, 1, !0);
                                n.launchDTArr[t] = 1e3;
                                for (var h = c.getRndInteger(0, 3, !0), l = 0, u = 0; u < s; u++) {
                                    var g = c.getRndInteger(.4, 1.2, !1);
                                    if (u == s - 1) {
                                        i = 2;
                                        i = c.getRndInteger(o.minTime, o.maxTime, !1),
                                        n.node.runAction(cc.sequence(cc.delayTime(l), cc.callFunc(function() {
                                            this.createCar(h)
                                        }, n), cc.delayTime(i), cc.callFunc(function() {
                                            this.launchDTArr[t] = 0
                                        }, n)))
                                    } else
                                        n.node.runAction(cc.sequence(cc.delayTime(l), cc.callFunc(function() {
                                            this.createCar(h)
                                        }, n)));
                                    l += g
                                }
                            } else if (5 == n.type) {
                                s = c.getRndInteger(1, 1, !0);
                                n.launchDTArr[t] = 1e3;
                                var d = c.getRndInteger(0, 3, !0);
                                for (l = 0,
                                u = 0; u < s; u++) {
                                    g = c.getRndInteger(.4, 1.2, !1);
                                    if (u == s - 1) {
                                        i = 2;
                                        i = c.getRndInteger(o.minTime, o.maxTime, !1),
                                        n.node.runAction(cc.sequence(cc.delayTime(l), cc.callFunc(function() {
                                            this.createCar(d)
                                        }, n), cc.delayTime(i), cc.callFunc(function() {
                                            this.launchDTArr[t] = 0
                                        }, n)))
                                    } else
                                        n.node.runAction(cc.sequence(cc.delayTime(l), cc.callFunc(function() {
                                            this.createCar(d)
                                        }, n)));
                                    l += g
                                }
                            }
                        }
                    }, n = this, o = 0; o < this.launchDTArr.length; o++)
                        t(o)
            }
            ,
            a([h], t.prototype, "type", void 0),
            t = a([s], t)
        }(cc.Component);
        n.default = l,
        cc._RF.pop()
    }
    , {
        "../commonJs/GameTools": "GameTools",
        "./MapManager": "MapManager"
    }],
    ToolsJs: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "8eb19UW+mdM4YMqlqTLtShF", "ToolsJs");
        var o = {
            SpriteFrameJs: null,
            AudioArrJs: null,
            setStorage: function(e, t, n) {
                CC_WECHATGAME ? wx.setStorage({
                    key: e,
                    data: t
                }) : (n && (t = JSON.stringify(t)),
                cc.sys.localStorage.setItem(e, t))
            },
            getStorage: function(e, t) {
                if (CC_WECHATGAME)
                    return wx.getStorageSync(e);
                var n = cc.sys.localStorage.getItem(e);
                return isNaN(n) || (n = parseInt(n)),
                "NaN" == n.toString() && (n = null),
                t && null != n && (n = JSON.parse(n)),
                n
            },
            logJsonObject: function(e) {
                console.log(JSON.stringify(e))
            },
            loadJson: function(e, t) {},
            writeJson: function(e, t) {
                if (cc.sys.isBrowser) {
                    console.log("\u6d4f\u89c8\u5668");
                    var n = new Blob([e],{
                        type: "application/json"
                    })
                      , o = document.createElement("a");
                    o.download = t,
                    o.innerHTML = "Download File",
                    null != window.webkitURL ? o.href = window.webkitURL.createObjectURL(n) : (o.href = window.URL.createObjectURL(n),
                    o.onclick = destroyClickedElement,
                    o.style.display = "none",
                    document.body.appendChild(o)),
                    o.click()
                }
            },
            addNoArr: function(e, t) {
                return e.indexOf(t) < 0 && (e.push(t),
                !0)
            },
            newSprite: function(e) {
                if (null != this.SpriteFrameJs.getSpriteFrame(e)) {
                    var t = new cc.Node;
                    return t.addComponent(cc.Sprite).spriteFrame = this.SpriteFrameJs.getSpriteFrame(e),
                    t
                }
                return null
            },
            setTexture: function(e, t) {
                e.getComponent(cc.Sprite).spriteFrame = this.SpriteFrameJs.getSpriteFrame(t)
            },
            clonePrefabs: function(e, t, n) {
                var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
                  , a = this.PrefabArrJs.getPrefabs(e);
                if (null != a) {
                    var c = cc.instantiate(a);
                    return null != t && t.addChild(c, o),
                    null != n && (c.position = n),
                    c
                }
                return console.log("\u514b\u9686\u9884\u5236\u4f53\u5931\u8d25:" + e),
                null
            },
            newLabel: function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20
                  , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : .5
                  , a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : .5
                  , c = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0
                  , r = new cc.Node;
                r.anchorX = o,
                r.anchorY = a;
                var i = r.addComponent(cc.Label);
                return i.string = e,
                i.fontSize = n,
                t.addChild(r, c),
                r
            },
            playAudio: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .5
                  , n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return null != this.AudioArrJs ? this.AudioArrJs.playAudio(e, t, n) : cc.audioEngine.play(cc.url.raw("resources/music/" + e + ".mp3"), n, t)
            },
            stopAudio: function(e) {
                null != e && cc.audioEngine.stop(e)
            },
            newAduioSource: function(e) {
                var t = void 0;
                if (null != this.AudioArrJs)
                    t = this.AudioArrJs.getAudioClip(e);
                else {
                    if (null == e)
                        return console.log("clip\u4e0d\u80fd\u4e3a\u7a7a\uff01"),
                        null;
                    t = e
                }
                var n = new cc.Node;
                return n.addComponent(cc.AudioSource).clip = t,
                n.getComponent(cc.AudioSource)
            },
            delayTimeCall: function(e, t, n, o) {
                e.runAction(cc.sequence(cc.delayTime(n), cc.callFunc(t, o)))
            },
            getDistance: function(e, t) {
                return e.sub(t).mag()
            },
            getToNodePos: function(e, t) {
                var n = e.parent.convertToWorldSpaceAR(e.position);
                return t.convertToNodeSpaceAR(n)
            },
            getToWorldPosAR: function(e) {
                return e.parent.convertToWorldSpaceAR(e.position)
            },
            getToWorldPos: function(e) {
                return e.parent.convertToWorldSpace(e.position)
            },
            isBoxContainPos: function(e, t) {
                return e.getBoundingBox().contains(t)
            },
            isBoxContainWorldPos: function(e, t) {
                return e.getBoundingBoxToWorld().contains(t)
            },
            isRectInterRect: function(e, t) {
                return e.getBoundingBoxToWorld().intersects(t.getBoundingBoxToWorld())
            },
            returnRandom: function(e, t) {
                return e + Math.floor(Math.random() * (t - e + 1))
            }
        };
        window.ToolsJs = o,
        cc._RF.pop()
    }
    , {}],
    UIManager: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "b1cf83DTC9Fd4n4Be2sz1Oz", "UIManager");
        var o = e("GameUiTools")
          , a = e("MainManage")
          , c = (e("LoadSceneJs"),
        e("GameConfig"));
        e("GameData"),
        e("GameTools");
        cc.Class({
            extends: cc.Component,
            properties: {
                mainGame: cc.Node,
                startGamePlanel: cc.Node,
                lvBox: cc.Node,
                Particale: cc.Node,
                ribbon: cc.Node,
                FloatScore: cc.Node,
                maskFloor: cc.Node,
                gameOverInfo: cc.Node,
                gameOverPanel: cc.Node,
                continue: cc.Node,
                hand: cc.Node,
                gameSuccessPanel: cc.Node,
                jb: cc.Node,
                handSpriteFrame: [cc.SpriteFrame],
                gameMaxScore: cc.Label,
                overInfoT: cc.Label,
                score: cc.Label,
                moreBtn: cc.Button
            },
            onLoad: function() {
                this.MainGame = this.mainGame.getComponent("MainGameJS"),
                this.Ribbon = this.ribbon.getComponent("Ribbon"),
                this.handSprite = this.hand.getComponent(cc.Sprite),
                this.lvbox1 = this.lvBox.getChildByName("lvbox1"),
                this.lvbox2 = this.lvBox.getChildByName("lvbox2"),
                this.nextLv = this.lvbox2.getChildByName("nextLv").getComponent(cc.Label),
                this.progressBar = this.lvBox.getChildByName("progress").getComponent(cc.ProgressBar),
                this.lvBox.y = this.MainGame.gameHeight / 2 - 90,
                this.moreBtn.node.x = -this.MainGame.gameWidth / 2 + 60,
                this.moreBtn.node.y = this.MainGame.gameHeight / 2 - 60,
                this.gameOverPanel.getChildByName("info").y = this.moreBtn.node.y - 280 * this.MainGame.gameHeight / 1280,
                this.overInfoT.node.y = this.moreBtn.node.y - 480 * this.MainGame.gameHeight / 1280,
                this.gameOverPanel.getChildByName("park").y = -this.MainGame.gameHeight / 2 + 140,
                this.gameOverPanel.getChildByName("button").y = this.gameOverPanel.getChildByName("park").y + 350 * this.MainGame.gameHeight / 1280,
                this.standardScore = c.standScore,
                this.canNotTouch = !0,
                this.game_max_score = 5e3,
                this.over = !1,
                this.ads2Open = !0,
                this.gameOverInfo1StringArr = ["\u6e38  \u620f  \u7ed3  \u675f", "\u904a  \u6232  \u7d50  \u675f", "Game Over", "\uac8c\uc784 \ub05d"],
                this.gameOverInfo2StringArr = ["\u70b9 \u51fb \u67e5 \u770b \u5206 \u6570", "\u9ede \u64ca \u67e5 \u770b \u5206 \u6578", "Click to view points", "\ud3ec\uc778\ud2b8\ub97c \ubcf4\ub824\uba74 \ud074\ub9ad\ud558\uc138\uc694"],
                this.gameSuccessTitleStringArr = ["\u606d \u559c \u4f60 \u5df2 \u7a81 \u7834", "\u606d \u559c \u4f60 \u5df2 \u7a81 \u7834", "Level Up", "\ub808\ubca8 \uc5c5"],
                this.gameSuccessUintStringArr = ["\u5206", "\u5206", "P", "\ubd84"],
                this.continueStringArr = ["\u70b9\u51fb\u7ee7\u7eed", "\u9ede\u64ca\u7e7c\u7e8c", "Click to continue", "\uacc4\uc18d\ud558\ub824\uba74 \ud074\ub9ad\ud558\uc138\uc694"],
                this.moreGameStringArr = ["\u66f4\u591a\u6e38\u620f", "\u66f4\u591a\u904a\u6232", "More Game", "\ub354 \ub9ce\uc740 \uac8c\uc784"],
                this.maxScoreStringArr = ["\u6700\u9ad8\u5f97\u5206\uff1a", "\u6700\u9ad8\u5f97\u5206\uff1a", "Highest score:", "\ucd5c\uace0 \uc810\uc218 :"],
                this.langNumType = this.returnCurrentLanType(),
                this.continue.getComponent(cc.Label).string = this.continueStringArr[this.langNumType - 1],
                this.gameOverInfo.getChildByName("gameOverInfo1").getComponent(cc.Label).string = this.gameOverInfo1StringArr[this.langNumType - 1],
                this.gameOverInfo.getChildByName("gameOverInfo2").getComponent(cc.Label).string = this.gameOverInfo2StringArr[this.langNumType - 1],
                this.addClickBtns()
            },
            start: function() {},
            cutscenes: function() {
                this.maskFloor.opacity = 168.3,
                this.maskFloor.active = !1,
                this.MainGame.MainCamera.cameraMove(),
                this.MainGame.MapCon.initMap()
            },
            initLvBox: function() {
                this.lvBox.active = !0,
                this.progressBar.progress = 0,
                this.MainGame.sceneScore.string = this.MainGame.gameScore.toString();
                var e = this.MainGame.gameScore + 1;
                this.nextLv.string = e.toString(),
                e >= 10 && e < 100 ? (this.lvbox1.width = 100,
                this.lvbox2.width = 100) : e >= 100 && e < 1e3 ? (this.lvbox1.width = 130,
                this.lvbox2.width = 130) : e >= 1e3 && e < 1e4 ? (this.lvbox1.width = 170,
                this.lvbox2.width = 170) : e >= 1e4 && (this.lvbox1.width = 210,
                this.lvbox2.width = 210),
                this.lvbox1.x = -100 - this.lvbox1.width / 2,
                this.lvbox2.x = 100 + this.lvbox1.width / 2
            },
            setProgress: function(e) {
                for (var t = e / 30, n = 0; n < 30; n++)
                    this.lvBox.runAction(cc.sequence(cc.delayTime(.01 * n), cc.callFunc(function() {
                        this.progressBar.progress += t
                    }, this)))
            },
            beginnerHandAction: function(e) {
                this.hand.active = !0,
                c.noTouchBool = !0,
                this.hand.setPosition(cc.v2(e.x + 60, e.y + 50)),
                this.hand.runAction(cc.repeatForever(cc.sequence(cc.delayTime(.5), cc.callFunc(function() {
                    this.handSprite.spriteFrame = this.handSpriteFrame[1]
                }, this), cc.delayTime(.5), cc.callFunc(function() {
                    this.handSprite.spriteFrame = this.handSpriteFrame[0]
                }, this))))
            },
            beginnerOverAction: function() {
                this.hand.stopAllActions(),
                this.hand.active = !1
            },
            returnCurrentLanType: function() {
                var e = 1;
                switch (cc.sys.language) {
                case cc.sys.LANGUAGE_CHINESE:
                    "zh-TW" == window.navigator.language || "zh-tw" == window.navigator.language || "zh-HK" == window.navigator.language || "zh-hk" == window.navigator.language ? (cc.log("\u7e41\u4f53"),
                    e = 2) : (cc.log("\u7b80\u4f53"),
                    e = 1);
                    break;
                case cc.sys.LANGUAGE_KOREAN:
                    e = 4;
                    break;
                default:
                    e = 3
                }
                return e
            },
            addTouchEvents: function() {
                var e = this
                  , t = {
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: function(t, n) {
                        if (!e.canNotTouch)
                            return e.MainGame.gameOver && o.loadingScene("MainGameScene"),
                            !0
                    },
                    onTouchMoved: function(e, t) {},
                    onTouchEnded: function(e, t) {}
                };
                cc.eventManager.addListener(t, e.node)
            },
            initGameSuccessPanel: function() {
                this.gameSuccessPanel.opacity = 0,
                this.gameSuccessPanel.getChildByName("gongxi").stopAllActions(),
                this.gameSuccessPanel.getChildByName("gongxi").setScale(1),
                this.gameSuccessPanel.getChildByName("park").getChildByName("car").setScale(0),
                this.gameSuccessPanel.active = !1,
                this.continue.stopAllActions(),
                this.continue.active = !1,
                this.continue.opacity = 255,
                this.Ribbon.clear(),
                this.MainGame.gainScore()
            },
            gameSuccessAction: function() {
                this.maskFloor.active = !0,
                this.lvBox.active = !1,
                this.ribbon.active = !0,
                this.gameSuccessPanel.active = !0,
                this.gameSuccessPanel.runAction(cc.sequence(cc.fadeIn(.2), cc.callFunc(function() {
                    this.MainGame.MusicCon.playMusic(3, 1, !1),
                    this.Ribbon.createRibbon(15),
                    this.gameSuccessPanel.getChildByName("gongxi").runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.4, 1.2), cc.scaleTo(.4, 1)))),
                    this.gameSuccessPanel.getChildByName("park").getChildByName("car").runAction(cc.sequence(cc.scaleTo(.4, 1), cc.callFunc(function() {
                        this.continue.active = !0,
                        this.continue.setPosition(cc.v2(0, -250)),
                        this.continue.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(.7, 50), cc.fadeTo(.7, 255)))),
                        this.canNotTouch = !1
                    }, this)))
                }, this)))
            },
            gameOver: function() {
                this.maskFloor.active = !0,
                this.lvBox.active = !1,
                this.gameOverInfo.active = !0,
                this.gameOverInfo.runAction(cc.sequence(cc.delayTime(.2), cc.spawn(cc.fadeIn(1), cc.moveBy(1, 0, -50)), cc.callFunc(function() {
                    this.canNotTouch = !1
                }, this)))
            },
            gameOverAction: function() {
                this.over || (this.gameOverInfo.active = !1,
                this.over = !0,
                this.score.string = this.MainGame.gameScore.toString(),
                this.gameMaxScore.string = c.gameMaxScore.toString(),
                c.gameMaxScore >= 10 && c.gameMaxScore < 100 ? (this.jb.x = -40,
                this.gameMaxScore.node.x = 30) : c.gameMaxScore >= 100 && c.gameMaxScore < 1e3 ? (this.jb.x = -60,
                this.gameMaxScore.node.x = 30) : c.gameMaxScore >= 1e3 && c.gameMaxScore < 1e4 ? (this.jb.x = -75,
                this.gameMaxScore.node.x = 30) : c.gameMaxScore >= 1e4 && (this.jb.x = -95,
                this.gameMaxScore.node.x = 30),
                this.UIPosChange(),
                this.gameOverPanel.active = !0,
                this.gameOverPanel.runAction(cc.sequence(cc.fadeIn(.2), cc.callFunc(function() {
                    this.MainGame.newRecord && this.score.node.children[0].runAction(cc.sequence(cc.spawn(cc.fadeIn(.2), cc.scaleTo(.2, 1)), cc.callFunc(function(e) {
                        e.runAction(cc.repeatForever(cc.sequence(cc.delayTime(2), cc.scaleTo(.2, 1.2), cc.scaleTo(.2, 1), cc.scaleTo(.2, 1.2), cc.scaleTo(.2, 1))))
                    }, this))),
                    this.gameOverPanel.getChildByName("button").runAction(cc.repeatForever(cc.sequence(cc.delayTime(1), cc.scaleTo(.2, 1.2), cc.scaleTo(.2, 1), cc.scaleTo(.2, 1.2), cc.scaleTo(.2, 1)))),
                    this.gameOverPanel.getChildByName("park").getChildByName("car").runAction(cc.sequence(cc.scaleTo(.4, 1), cc.callFunc(function() {
                        this.canNotTouch = !1
                    }, this)))
                }, this))))
            },
            addClickBtns: function() {
                var e = this;
                e.moreBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}),
                e.moreBtn.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                    console.log("MoreGame"),
                    window.location.href = a.moreGameUrl
                }),
                e.gameSuccessPanel.on(cc.Node.EventType.TOUCH_START, function(e) {}),
                e.gameSuccessPanel.on(cc.Node.EventType.TOUCH_END, function(t) {
                    e.canNotTouch || (c.noTouchBool = !0,
                    e.canNotTouch = !0,
                    c.publicGameBool || adBreak({
                        type: "next",
                        name: "restart-game"
                    }),
                    e.initGameSuccessPanel())
                }),
                e.gameOverInfo.on(cc.Node.EventType.TOUCH_START, function(e) {}),
                e.gameOverInfo.on(cc.Node.EventType.TOUCH_END, function(t) {
                    e.canNotTouch || (e.canNotTouch = !0,
                    c.publicGameBool || adBreak({
                        type: "next",
                        name: "restart-game"
                    }),
                    e.gameOverAction())
                }),
                e.gameOverPanel.on(cc.Node.EventType.TOUCH_START, function(e) {}),
                e.gameOverPanel.on(cc.Node.EventType.TOUCH_END, function(t) {
                    e.canNotTouch || (e.canNotTouch = !0,
                    console.log("\u8bed\u8a00\u73af\u5883" + e.langNumType),
                    c.publicGameBool || adBreak({
                        type: "next",
                        name: "restart-game"
                    }),
                    c.playNum++,
                    o.loadingScene("MainGameScene"))
                })
            },
            UIPosChange: function() {
                console.log("lang", a.langugeType);
                var e = null
                  , t = null;
                1 == a.langugeType ? (e = this.getContentByScore(c.gameScore, a.gameNameText, !0),
                t = this.getContentByScore(c.gameScore, a.gameNameText, !1)) : (e = this.getContentByScore2(c.gameScore, a.gameNameText, !0),
                t = this.getContentByScore(c.gameScore, a.gameNameText, !1)),
                console.log("nihao", a.endHttpShowInfo),
                null != a.endHttpShowInfo && "" != a.endHttpShowInfo && (cc.log("gototo"),
                t = a.endHttpShowInfo),
                this.overInfoT.string = e,
                document.title = t
            },
            getContentByScore: function(e, t, n) {
                var o = "\u6211\u771f\u662f\u592a\u5389\u5bb3\uff0c\u5728" + t + "\u4e2d\u7adf\u7136\u5f97\u4e860\u5206\uff0c\u5168\u7403\u53ea\u67091\u4e2a\u4eba\u5f970\u5206\uff01"
                  , a = "\u51fb\u8d25\u4e86\u5168\u74030%\u7684\u73a9\u5bb6\uff01"
                  , c = parseInt(.6 * this.standardScore)
                  , r = parseInt(1.5 * this.standardScore)
                  , i = parseInt(2.5 * this.standardScore)
                  , s = parseInt(4 * this.standardScore);
                if (e >= 0 && e <= c)
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u5f97\u5fc3\u5e94\u624b!",
                    a = "\u51fb\u8d25\u4e86\u5168\u7403" + Math.floor(10 * e / c) + "%\u7684\u73a9\u5bb6\uff01";
                else if (e > c && e <= this.standardScore) {
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u8fbe\u5230\u6e38\u5203\u6709\u4f59\u7684\u5883\u754c\uff01",
                    a = "\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(15 * (e - this.standardScore) / (c - this.standardScore)) + 20) + "%\u7684\u73a9\u5bb6\uff01"
                } else if (e > this.standardScore && e <= r) {
                    var h = Math.floor(20 * (e - this.standardScore) / (r - this.standardScore)) + 35;
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + h + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u4fe1\u624b\u62c8\u6765\u7684\u5883\u754c\uff01",
                    a = "\u51fb\u8d25\u4e86\u5168\u7403" + h + "%\u7684\u73a9\u5bb6\uff01"
                } else if (e > r && e <= i) {
                    var l = Math.floor(30 * (e - r) / (i - r)) + 55;
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + l + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u8fd0\u7528\u81ea\u5982\u7684\u5883\u754c\uff01",
                    a = "\u51fb\u8d25\u4e86\u5168\u7403" + l + "%\u7684\u73a9\u5bb6\uff01"
                } else if (e > i && e <= s) {
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u740399%\u7684\u73a9\u5bb6\uff0c\u8fbe\u5230\u4e86\u884c\u4e91\u6d41\u6c34\u7684\u5883\u754c\uff01",
                    a = "\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(10 * (e - i) / (s - i)) + 85) + "%\u7684\u73a9\u5bb6\uff01"
                } else if (e > s && e < this.game_max_score) {
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u636e\u8bf4\u5168\u7403\u53ea\u6709 " + (20 - Math.ceil(17 * (e - s) / (this.game_max_score - s))) + "\u4e2a\u4eba\u8fbe\u5230\u8fd9\u4e2a\u6c34\u5e73\uff0c\u72ec\u5b64\u6c42\u8d25\uff01",
                    a = "\u51fb\u8d25\u4e86\u5168\u740399%\u7684\u73a9\u5bb6\uff01"
                } else
                    e >= this.game_max_score && (o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u8d85\u8d8a\u4e86\u72ec\u5b64\u6c42\u8d25\uff0c\u5fc3\u6709\u7075\u7280\uff01",
                    a = "\u51fb\u8d25\u4e86\u5168\u7403100%\u7684\u73a9\u5bb6\uff01");
                return n ? a : o
            },
            getContentByScore2: function(e, t, n) {
                var o = "I'm awesome\uff0cin" + t + "get 0 score\uff0conly one person in the world has a 0\uff01"
                  , a = "Only 0 points, the only one in the world!"
                  , c = parseInt(.6 * this.standardScore)
                  , r = parseInt(1.5 * this.standardScore)
                  , i = parseInt(2.5 * this.standardScore)
                  , s = parseInt(4 * this.standardScore);
                if (e >= 0 && e <= c)
                    o = "I got " + e + " points in the game, really great\uff01",
                    a = "Defeated " + Math.floor(10 * e / c) + "% of players worldwide!";
                else if (e > c && e <= this.standardScore) {
                    o = "I got " + e + " points in the game, really great\uff01",
                    a = "Defeated " + (Math.floor(15 * (e - this.standardScore) / (c - this.standardScore)) + 20) + "% of players worldwide!"
                } else if (e > this.standardScore && e <= r) {
                    var h = Math.floor(20 * (e - this.standardScore) / (r - this.standardScore)) + 35;
                    o = "I got in the game in " + e + " points, beating out " + h + "% of global players\uff01",
                    a = "Defeated " + h + "% of players worldwide!"
                } else if (e > r && e <= i) {
                    var l = Math.floor(30 * (e - r) / (i - r)) + 55;
                    o = "I got in the game in " + e + " points, beating out " + l + "% of global players\uff01",
                    a = "Defeated " + l + "% of players worldwide!"
                } else if (e > i && e <= s) {
                    o = "I got in the game in " + e + " points, beating out 99% of global players\uff01",
                    a = "Defeated " + (Math.floor(10 * (e - i) / (s - i)) + 85) + "% of players worldwide!"
                } else if (e > s && e < this.game_max_score) {
                    o = "I got " + e + " points in the game, it said to be the world's only " + (20 - Math.ceil(17 * (e - s) / (this.game_max_score - s))) + " people to reach this level! Have you?",
                    a = "Defeated 99% of players worldwide!"
                } else
                    e >= this.game_max_score && (o = "I got " + e + " points in the game, defeating all players worldwide, waiting for you to fight!",
                    a = "Defeated 100% of players worldwide!");
                return n ? a : o
            },
            getContentByScore3: function(e, t, n) {
                var o = "\u6211\u771f\u662f\u592a\u5389\u5bb3\uff0c\u5728" + t + "\u4e2d\u7adf\u7136\u5f97\u4e860\u5206\uff0c\u5168\u7403\u53ea\u67091\u4e2a\u4eba\u5f970\u5206\uff01"
                  , a = "\u64ca\u6557\u4e86\u5168\u74030%\u7684\u73a9\u5bb6\uff01"
                  , c = parseInt(.6 * this.standardScore)
                  , r = parseInt(1.5 * this.standardScore)
                  , i = parseInt(2.5 * this.standardScore)
                  , s = parseInt(4 * this.standardScore);
                if (e >= 0 && e <= c)
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u5f97\u5fc3\u5e94\u624b!",
                    a = "\u64ca\u6557\u4e86\u5168\u7403" + Math.floor(10 * e / c) + "%\u7684\u73a9\u5bb6\uff01";
                else if (e > c && e <= this.standardScore) {
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u8fbe\u5230\u6e38\u5203\u6709\u4f59\u7684\u5883\u754c\uff01",
                    a = "\u64ca\u6557\u4e86\u5168\u7403" + (Math.floor(15 * (e - this.standardScore) / (c - this.standardScore)) + 20) + "%\u7684\u73a9\u5bb6\uff01"
                } else if (e > this.standardScore && e <= r) {
                    var h = Math.floor(20 * (e - this.standardScore) / (r - this.standardScore)) + 35;
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + h + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u4fe1\u624b\u62c8\u6765\u7684\u5883\u754c\uff01",
                    a = "\u64ca\u6557\u4e86\u5168\u7403" + h + "%\u7684\u73a9\u5bb6\uff01"
                } else if (e > r && e <= i) {
                    var l = Math.floor(30 * (e - r) / (i - r)) + 55;
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + l + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u8fd0\u7528\u81ea\u5982\u7684\u5883\u754c\uff01",
                    a = "\u64ca\u6557\u4e86\u5168\u7403" + l + "%\u7684\u73a9\u5bb6\uff01"
                } else if (e > i && e <= s) {
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u740399%\u7684\u73a9\u5bb6\uff0c\u8fbe\u5230\u4e86\u884c\u4e91\u6d41\u6c34\u7684\u5883\u754c\uff01",
                    a = "\u64ca\u6557\u4e86\u5168\u7403" + (Math.floor(10 * (e - i) / (s - i)) + 85) + "%\u7684\u73a9\u5bb6\uff01"
                } else if (e > s && e < this.game_max_score) {
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u636e\u8bf4\u5168\u7403\u53ea\u6709 " + (20 - Math.ceil(17 * (e - s) / (this.game_max_score - s))) + "\u4e2a\u4eba\u8fbe\u5230\u8fd9\u4e2a\u6c34\u5e73\uff0c\u72ec\u5b64\u6c42\u8d25\uff01",
                    a = "\u64ca\u6557\u4e86\u5168\u740399%\u7684\u73a9\u5bb6\uff01"
                } else
                    e >= this.game_max_score && (o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u8d85\u8d8a\u4e86\u72ec\u5b64\u6c42\u8d25\uff0c\u5fc3\u6709\u7075\u7280\uff01",
                    a = "\u64ca\u6557\u4e86\u5168\u7403100%\u7684\u73a9\u5bb6\uff01");
                return n ? a : o
            },
            getContentByScore4: function(e, t, n) {
                var o = "\u6211\u771f\u662f\u592a\u5389\u5bb3\uff0c\u5728" + t + "\u4e2d\u7adf\u7136\u5f97\u4e860\u5206\uff0c\u5168\u7403\u53ea\u67091\u4e2a\u4eba\u5f970\u5206\uff01"
                  , a = "\uc804 \uc138\uacc4 \ud50c\ub808\uc774\uc5b4 0%\ub97c \ubb3c\ub9ac \ucce4\uc2b5\ub2c8\ub2e4!"
                  , c = parseInt(.6 * this.standardScore)
                  , r = parseInt(1.5 * this.standardScore)
                  , i = parseInt(2.5 * this.standardScore)
                  , s = parseInt(4 * this.standardScore);
                if (e >= 0 && e <= c)
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u5f97\u5fc3\u5e94\u624b!",
                    a = "\uc804 \uc138\uacc4 \ud50c\ub808\uc774\uc5b4 " + Math.floor(10 * e / c) + "%\ub97c \ubb3c\ub9ac \ucce4\uc2b5\ub2c8\ub2e4!";
                else if (e > c && e <= this.standardScore) {
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u8fbe\u5230\u6e38\u5203\u6709\u4f59\u7684\u5883\u754c\uff01",
                    a = "\uc804 \uc138\uacc4 \ud50c\ub808\uc774\uc5b4 " + (Math.floor(15 * (e - this.standardScore) / (c - this.standardScore)) + 20) + "%\ub97c \ubb3c\ub9ac \ucce4\uc2b5\ub2c8\ub2e4!"
                } else if (e > this.standardScore && e <= r) {
                    var h = Math.floor(20 * (e - this.standardScore) / (r - this.standardScore)) + 35;
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + h + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u4fe1\u624b\u62c8\u6765\u7684\u5883\u754c\uff01",
                    a = "\uc804 \uc138\uacc4 \ud50c\ub808\uc774\uc5b4 " + h + "%\ub97c \ubb3c\ub9ac \ucce4\uc2b5\ub2c8\ub2e4!"
                } else if (e > r && e <= i) {
                    var l = Math.floor(30 * (e - r) / (i - r)) + 55;
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + l + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u8fd0\u7528\u81ea\u5982\u7684\u5883\u754c\uff01",
                    a = "\uc804 \uc138\uacc4 \ud50c\ub808\uc774\uc5b4 " + l + "%\ub97c \ubb3c\ub9ac \ucce4\uc2b5\ub2c8\ub2e4!"
                } else if (e > i && e <= s) {
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u740399%\u7684\u73a9\u5bb6\uff0c\u8fbe\u5230\u4e86\u884c\u4e91\u6d41\u6c34\u7684\u5883\u754c\uff01",
                    a = "\uc804 \uc138\uacc4 \ud50c\ub808\uc774\uc5b4 " + (Math.floor(10 * (e - i) / (s - i)) + 85) + "%\ub97c \ubb3c\ub9ac \ucce4\uc2b5\ub2c8\ub2e4!"
                } else if (e > s && e < this.game_max_score) {
                    o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u636e\u8bf4\u5168\u7403\u53ea\u6709 " + (20 - Math.ceil(17 * (e - s) / (this.game_max_score - s))) + "\u4e2a\u4eba\u8fbe\u5230\u8fd9\u4e2a\u6c34\u5e73\uff0c\u72ec\u5b64\u6c42\u8d25\uff01",
                    a = "\uc804 \uc138\uacc4 \ud50c\ub808\uc774\uc5b4 99%\ub97c \ubb3c\ub9ac \ucce4\uc2b5\ub2c8\ub2e4!"
                } else
                    e >= this.game_max_score && (o = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u8d85\u8d8a\u4e86\u72ec\u5b64\u6c42\u8d25\uff0c\u5fc3\u6709\u7075\u7280\uff01",
                    a = "\uc804 \uc138\uacc4 \ud50c\ub808\uc774\uc5b4 100%\ub97c \ubb3c\ub9ac \ucce4\uc2b5\ub2c8\ub2e4!");
                return n ? a : o
            },
            update: function(e) {}
        }),
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig",
        GameData: "GameData",
        GameTools: "GameTools",
        GameUiTools: "GameUiTools",
        LoadSceneJs: "LoadSceneJs",
        MainManage: "MainManage"
    }],
    gameOverJs: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "3621brbM61BsYFG7fM/74TL", "gameOverJs");
        var o = e("GameUiTools")
          , a = e("GameConfig")
          , c = e("MainManage");
        cc.Class({
            extends: cc.Component,
            properties: {
                bgLayer: cc.Node,
                scoreBg: cc.Node,
                overScoreT: cc.Label,
                overInfoT: cc.Label,
                moreBtn: cc.Button,
                leftBtn: cc.Button,
                rightBtn: cc.Button,
                midGameText: cc.Label,
                leftBtnText: cc.Label,
                rightBtnText: cc.Label,
                maxScoreText: cc.Label
            },
            onLoad: function() {
                this.bgLayer.color = cc.color("#68b951"),
                this.standardScore = a.standScore,
                this.game_max_score = 200,
                this.rigthBtnGameName = null,
                this.rightBtnGameUrl = null,
                this.UIPosChange(),
                this.addClickBtns();
                var e = "\u6700\u9ad8\u7eaa\u5f55:"
                  , t = this.returnCurrentLanType();
                e = 1 == t ? "\u6700\u9ad8\u7eaa\u5f55:" : 2 == t ? "\u6700\u9ad8\u7d00\u9304:" : 4 == t ? "\ucd5c\uace0 \uae30\ub85d:" : "Highest Record:";
                var n = a.gameScore
                  , o = this.getHighScore();
                o ? o < a.gameScore && (this.setHisSocre(a.gameScore),
                o = a.gameScore) : (this.setHisSocre(a.gameScore),
                o = n),
                this.maxScoreText.string = e + o
            },
            returnCurrentLanType: function() {
                var e = 1;
                switch (cc.sys.language) {
                case cc.sys.LANGUAGE_CHINESE:
                    "zh-TW" == window.navigator.language || "zh-tw" == window.navigator.language || "zh-HK" == window.navigator.language || "zh-hk" == window.navigator.language ? (cc.log("\u7e41\u4f53"),
                    e = 2) : (cc.log("\u7b80\u4f53"),
                    e = 1);
                    break;
                case cc.sys.LANGUAGE_KOREAN:
                    e = 4;
                    break;
                default:
                    e = 3
                }
                return e
            },
            setHisSocre: function(e) {
                cc.sys.localStorage.setItem("HigScore_JiaoTong", e)
            },
            getHighScore: function() {
                return cc.sys.localStorage.getItem("HigScore_JiaoTong")
            },
            UIPosChange: function() {
                this.overScoreT.string = a.gameScore,
                console.log("lang", c.langugeType);
                var e = null;
                e = 1 == c.langugeType ? this.getContentByScore(a.gameScore, c.gameNameText) : this.getContentByScore2(a.gameScore, c.gameNameText),
                console.log("nihao", c.endHttpShowInfo),
                null != c.endHttpShowInfo && "" != c.endHttpShowInfo && (cc.log("gototo"),
                e = c.endHttpShowInfo),
                this.overInfoT.string = e;
                var t = this.overInfoT.node.height;
                if (this.overInfoT.node.height = Math.ceil(e.length * this.overInfoT.fontSize / this.overInfoT.node.width) * t,
                document.title = e,
                console.log("gameOver txtMoreText", c.txtMoreText),
                this.midGameText.string = c.txtMoreText,
                this.leftBtnText.string = c.txtAgainText,
                this.tempArr = this.gameFocus(),
                null != c.ranLinkUrl()) {
                    var n = c.ranLinkUrl()
                      , o = c.ranLinkData.gameList[n].gameName;
                    this.rigthBtnGameName = o,
                    this.rightBtnGameUrl = c.ranLinkData.gameList[n].gameUrl
                }
                null != this.rigthBtnGameName && "" != this.rigthBtnGameName ? this.rightBtnText.string = this.rigthBtnGameName : this.rightBtnText.string = this.tempArr[0]
            },
            gameFocus: function() {
                var e = []
                  , t = null
                  , n = null;
                return Math.random() <= .5 ? (t = c.gameEndName1,
                n = c.gameEndUrl1) : (t = c.gameEndName2,
                n = c.gameEndUrl2),
                e.push(t),
                e.push(n),
                e
            },
            addClickBtns: function() {
                var e = this;
                e.moreBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}),
                e.moreBtn.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                    console.log("MoreGame"),
                    window.location.href = c.moreGameUrl
                }),
                e.leftBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}),
                e.leftBtn.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                    a.GAME_OVER_BOOL = !0,
                    a.gameScore = 0,
                    o.loadingScene("MainGameScene")
                }),
                e.rightBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {}),
                e.rightBtn.node.on(cc.Node.EventType.TOUCH_END, function(t) {
                    var n = null;
                    n = null != e.rightBtnGameUrl && "" != e.rightBtnGameUrl ? e.rightBtnGameUrl : e.tempArr[1],
                    window.location.href = n
                })
            },
            getContentByScore: function(e, t) {
                var n = "\u6211\u771f\u662f\u592a\u5389\u5bb3\uff0c\u5728" + t + "\u4e2d\u7adf\u7136\u5f97\u4e861\u5206\uff0c\u5168\u7403\u53ea\u67091\u4e2a\u4eba\u5f971\u5206\uff01"
                  , o = parseInt(.3 * this.standardScore)
                  , a = parseInt(1.5 * this.standardScore)
                  , c = parseInt(2.5 * this.standardScore)
                  , r = parseInt(4 * this.standardScore);
                if (e > 0 && e <= o)
                    n = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u8fbe\u5230\u6e38\u5203\u6709\u4f59\u7684\u5883\u754c\uff01";
                else if (e > o && e <= this.standardScore)
                    n = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u771f\u662f\u592a\u68d2\u4e86\uff0c\u518d\u7ec3\u7ec3\u5c31\u80fd\u8fbe\u5230\u6e38\u5203\u6709\u4f59\u7684\u5883\u754c\uff01";
                else if (e > this.standardScore && e <= a) {
                    n = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(12 * (e - this.standardScore) / (a - this.standardScore)) + 80) + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u4fe1\u624b\u62c8\u6765\u7684\u5883\u754c\uff01"
                } else if (e > a && e <= c) {
                    n = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u7403" + (Math.floor(7 * (e - a) / (c - a)) + 92) + "%\u7684\u73a9\u5bb6\uff0c\u8fdb\u5165\u4e86\u8fd0\u7528\u81ea\u5982\u7684\u5883\u754c\uff01"
                } else if (e > c && e <= r)
                    n = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u51fb\u8d25\u4e86\u5168\u740399%\u7684\u73a9\u5bb6\uff0c\u8fbe\u5230\u4e86\u884c\u4e91\u6d41\u6c34\u7684\u5883\u754c\uff01";
                else if (e > r && e < this.game_max_score) {
                    n = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u636e\u8bf4\u5168\u7403\u53ea\u6709 " + (20 - Math.ceil(17 * (e - r) / (this.game_max_score - r))) + "\u4e2a\u4eba\u8fbe\u5230\u8fd9\u4e2a\u6c34\u5e73\uff0c\u72ec\u5b64\u6c42\u8d25\uff01"
                } else
                    e >= this.game_max_score && (n = "\u6211\u5728" + t + "\u4e2d\u5f97\u4e86" + e + "\u5206\uff0c\u8d85\u8d8a\u4e86\u72ec\u5b64\u6c42\u8d25\uff0c\u5fc3\u6709\u7075\u7280\uff01");
                return n
            },
            strlen: function(e) {
                for (var t = 0, n = 0; n < e.length; n++) {
                    var o = e.charCodeAt(n);
                    o >= 1 && o <= 126 || 65376 <= o && o <= 65439 ? t++ : t += 2
                }
                return t
            },
            getContentByScore2: function(e, t) {
                var n = "I'm awesome\uff0cin" + t + "get 0 score\uff0conly one person in the world has a 0\uff01"
                  , o = parseInt(.3 * this.standardScore)
                  , a = parseInt(1.5 * this.standardScore)
                  , c = parseInt(2.5 * this.standardScore)
                  , r = parseInt(4 * this.standardScore);
                if (e >= this.game_max_score)
                    n = "I got " + e + " points in the game, defeating all players worldwide, waiting for you to fight!";
                else if (e > 0 && e <= o)
                    n = "I got " + e + " points in the game, really great\uff01";
                else if (e > o && e <= this.standardScore)
                    n = "I got " + e + " points in the game, really great\uff01";
                else if (e > this.standardScore && e <= a) {
                    n = "I got in the game in " + e + " points, beating out " + (Math.floor(12 * (e - this.standardScore) / (a - this.standardScore)) + 80) + "% of global players\uff01"
                } else if (e > a && e <= c) {
                    n = "I got in the game in " + e + " points, beating out " + (Math.floor(7 * (e - a) / (c - a)) + 92) + "% of global players\uff01"
                } else if (e > c && e <= r)
                    n = "I got in the game in " + e + " points, beating out 99% of global players\uff01";
                else if (e > r && e < this.game_max_score) {
                    n = "I got " + e + " points in the game, it said to be the world's only " + (20 - Math.ceil(17 * (e - r) / (this.game_max_score - r))) + " people to reach this level! Have you?"
                }
                return n
            },
            start: function() {}
        }),
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        MainManage: "MainManage"
    }],
    linkHttpIconJs: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "95474fr0oNDP7SAidILF03q", "linkHttpIconJs");
        var o = e("MainManage")
          , a = e("GameConfig");
        cc.Class({
            extends: cc.Component,
            properties: {
                iconSpr: cc.Node,
                iconSpr1: cc.Node
            },
            onLoad: function() {
                if (this._imageArr = [],
                this.stopUpdateBool = !0,
                this.gameWidth = cc.director.getWinSize().width,
                this.gameHeight = cc.director.getWinSize().height,
                null != o.recGameData && "" != o.recGameData && null != o.recGameimg1 && "" != o.recGameimg1) {
                    var e = 50 - this.gameWidth / 2
                      , t = this.gameHeight - 50 - this.gameHeight / 2;
                    null != o.recGamePos && "" != o.recGamePos && (1 == o.recGamePos ? (e = 50 - this.gameWidth / 2,
                    t = this.gameHeight - 50 - this.gameHeight / 2) : 2 == o.recGamePos ? (e = this.gameWidth - 50 - this.gameWidth / 2,
                    t = this.gameHeight - 50 - this.gameHeight / 2) : 3 == o.recGamePos ? (e = this.gameWidth - 50 - this.gameWidth / 2,
                    t = 50 - this.gameHeight / 2) : 4 == o.recGamePos && (e = 50 - this.gameWidth / 2,
                    t = 50 - this.gameHeight / 2));
                    var n = o.recGameimg1
                      , a = o.recGameimg2
                      , c = this.iconSpr
                      , r = this.iconSpr1
                      , i = this;
                    cc.loader.load(n, function(n, o) {
                        c.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(o),
                        i.iconSpr.opacity = 0,
                        i.iconSpr.x = e,
                        i.iconSpr.y = t,
                        i._imageArr.push(i.iconSpr)
                    }),
                    cc.loader.load(a, function(n, o) {
                        r.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(o),
                        i.iconSpr1.opacity = 0,
                        i.iconSpr1.x = e,
                        i.iconSpr1.y = t,
                        i._imageArr.push(i.iconSpr1)
                    })
                }
                this.addTouchEvents()
            },
            showLinkPic: function() {
                var e = 0
                  , t = 0;
                e = null != o.recGameDelPau ? o.recGameDelPau : 6,
                cc.log("dMainManager.recGameDelPer", o.recGameDelPer),
                t = null != o.recGameDelPer ? o.recGameDelPer : .7,
                this._imageArr[0].opacity = 255,
                this._imageArr[0].runAction(cc.repeatForever(cc.sequence(cc.delayTime(e), cc.rotateBy(t, 0, 180), cc.callFunc(function() {
                    this._imageArr[0].setRotation(0),
                    this._imageArr[0].opacity = 0,
                    this._imageArr[1].opacity = 255
                }, this), cc.delayTime(e), cc.callFunc(function() {
                    this.flowerAction(this._imageArr[1], t)
                }, this), cc.delayTime(t), cc.callFunc(function() {
                    this._imageArr[1].opacity = 0,
                    this._imageArr[0].opacity = 255
                }, this))))
            },
            flowerAction: function(e, t) {
                e.runAction(cc.sequence(cc.rotateBy(t, 0, 180), cc.callFunc(function() {
                    e.setRotation(0)
                })))
            },
            start: function() {},
            addTouchEvents: function() {
                var e = this
                  , t = {
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: function(t, n) {
                        var c = t.getLocation();
                        if (e._imageArr.length >= 2) {
                            var r = Math.abs(c.x - e.gameWidth / 2 - e._imageArr[0].x)
                              , i = Math.abs(c.y - e.gameHeight / 2 - e._imageArr[0].y);
                            r <= 30 && i <= 30 && (a.noTouchBool = !1,
                            null != o.recGameUrl && "" != o.recGameUrl && (e._imageArr[0].runAction(cc.sequence(cc.scaleTo(.1, .8), cc.scaleTo(.1, 1), cc.callFunc(function() {
                                window.location.href = o.recGameUrl
                            }))),
                            e._imageArr[1].runAction(cc.sequence(cc.scaleTo(.1, .8), cc.scaleTo(.1, 1)))),
                            console.log("touchLinkHttp"))
                        }
                        return !0
                    },
                    onTouchMoved: function(e, t) {},
                    onTouchEnded: function(e, t) {}
                };
                cc.eventManager.addListener(t, e.node)
            },
            update: function(e) {
                this.stopUpdateBool && this._imageArr.length >= 2 && (this.stopUpdateBool = !1,
                this.showLinkPic())
            }
        }),
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig",
        MainManage: "MainManage"
    }],
    resArr: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "36b14EoJxtHtJEeP2jXVvPf", "resArr"),
        cc.Class({
            extends: cc.Component,
            properties: {
                SpriteFrameArr: [cc.SpriteFrame],
                PrefabArr: [cc.Prefab],
                audiosArr: {
                    type: cc.AudioClip,
                    default: []
                }
            },
            onLoad: function() {
                void 0 != ToolsJs && (ToolsJs.PrefabArrJs = this,
                ToolsJs.SpriteFrameJs = this,
                ToolsJs.AudioArrJs = this),
                this.addPrefabs(),
                this.addSpriteFrame(),
                this.audioClipDic = {};
                for (var e = 0; e < this.audiosArr.length; e++) {
                    var t = this.audiosArr[e];
                    this.audioClipDic[t.name] = t
                }
            },
            playAudio: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : .3
                  , n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return null != this.audioClipDic[e] ? cc.audioEngine.play(this.audioClipDic[e], n, t) : (console.log("\u6ca1\u6709\u627e\u5230\u97f3\u9891\uff1a" + e),
                null)
            },
            getAudioClip: function(e) {
                return null != this.audioClipDic[e] ? this.audioClipDic[e] : (console.log("\u6ca1\u6709\u627e\u5230\u97f3\u9891\uff1a" + e),
                null)
            },
            addSpriteFrame: function() {
                this.spriteArr = {};
                for (var e = 0; e < this.SpriteFrameArr.length; e++) {
                    var t = this.SpriteFrameArr[e];
                    null != t && (this.spriteArr[t.name] = t)
                }
            },
            getSpriteFrame: function(e) {
                return null != this.spriteArr[e] ? this.spriteArr[e] : (console.log("\u6ca1\u6709\u6dfb\u52a0\u56fe\u7247\uff1a" + e),
                null)
            },
            addPrefabs: function() {
                this.prefabsArr = {};
                for (var e = 0; e < this.PrefabArr.length; e++) {
                    var t = this.PrefabArr[e];
                    this.prefabsArr[t.name] = t
                }
            },
            getPrefabs: function(e) {
                return null != this.prefabsArr[e] ? this.prefabsArr[e] : (console.log("\u6ca1\u6709\u9884\u5236\u4f53\uff1a" + e),
                null)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    startGameJs: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "280c3rsZJJKnZ9RqbALVwtK", "startGameJs");
        var o = e("GameUiTools")
          , a = (e("HttpManagerJs"),
        e("MainManage"))
          , c = (e("LoadSceneJs"),
        e("GameConfig"));
        cc.Class({
            extends: cc.Component,
            properties: {
                showInfoT: cc.Label,
                startT: cc.Label
            },
            onLoad: function() {
                c.publicGameBool && a.init(),
                this.showInfoT.string = a.gameInfoText,
                this.startT.string = a.txtStartText,
                this.node.on("touchend", function(e) {
                    this.node.x = -2e3
                }, this)
            },
            addTouchEvents: function() {
                var e = {
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    onTouchBegan: function(e, t) {
                        return o.loadingScene("MainGameScene"),
                        !0
                    },
                    onTouchMoved: function(e, t) {},
                    onTouchEnded: function(e, t) {}
                };
                cc.eventManager.addListener(e, this.node)
            },
            update: function(e) {}
        }),
        cc._RF.pop()
    }
    , {
        GameConfig: "GameConfig",
        GameUiTools: "GameUiTools",
        HttpManagerJs: "HttpManagerJs",
        LoadSceneJs: "LoadSceneJs",
        MainManage: "MainManage"
    }],
    "use_v2.1.x_cc.Action": [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "c382eNvNvFEVqcM3zUHzwkK", "use_v2.1.x_cc.Action"),
        cc.macro.ROTATE_ACTION_CCW = !0,
        cc._RF.pop()
    }
    , {}]
}, {}, ["Body", "Car", "FloatScore", "MainCamera", "MapManager", "MusicManager", "PoolManager", "Ribbon", "RoadManager", "HttpManagerJs", "LanguageSetJs", "LoadSceneJs", "AniTools", "MainGameJS", "ToolsJs", "UIManager", "resArr", "MainManage", "GameConfig", "GameData", "GameTools", "GameUiTools", "gameOverJs", "linkHttpIconJs", "startGameJs", "use_v2.1.x_cc.Action"]);
