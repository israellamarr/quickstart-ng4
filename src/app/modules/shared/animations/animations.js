"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.fadeInOut = core_1.trigger('fadeInOut', [
    core_1.state('inactive', core_1.style({
        opacity: '0'
    })),
    core_1.state('active', core_1.style({
        opacity: '1'
    })),
    core_1.transition('inactive => active', core_1.animate('650ms ease-in')),
    core_1.transition('active => inactive', core_1.animate('650ms ease-out'))
]);
exports.fadeOutOnly = core_1.trigger('fadeOutOnly', [
    core_1.state('inactive', core_1.style({
        opacity: '0'
    })),
    core_1.state('active', core_1.style({
        opacity: '1'
    })),
    core_1.transition('inactive => active', core_1.animate('0ms ease-out')),
    core_1.transition('active => inactive', core_1.animate('500ms ease-out'))
]);
exports.fadeAndHide = core_1.trigger('fadeAndHide', [
    core_1.state('inactive', core_1.style({
        display: 'none'
    })),
    core_1.state('active', core_1.style({
        opacity: '1'
    })),
    core_1.transition('inactive => active', [
        core_1.style({
            opacity: 0
        }),
        core_1.animate('500ms ease-in')
    ]),
    core_1.transition('active => inactive', core_1.animate('500ms ease-out', core_1.style({
        opacity: 0
    })))
]);
exports.fadeShrinkAndHide = core_1.trigger('fadeShrinkAndHide', [
    core_1.state('inactive', core_1.style({
        display: 'none',
        height: 0
    })),
    core_1.state('active', core_1.style({
        height: '*',
        opacity: '1'
    })),
    core_1.transition('inactive => active', [
        core_1.style({
            opacity: 0
        }),
        core_1.animate('500ms ease-in')
    ]),
    core_1.transition('active => inactive', core_1.animate('500ms ease-out', core_1.style({
        opacity: 0
    })))
]);
exports.navWrapperAnimation = core_1.trigger('navWrapperAnimation', [
    core_1.state('active', core_1.style({
        width: '100%',
        transform: 'translateX(200px)'
    })),
    core_1.state('inactive', core_1.style({
        width: '200px',
        transform: 'translateX(0)'
    })),
    core_1.state('route-triggered', core_1.style({
        width: '200px',
        transform: 'translateX(0)'
    })),
    core_1.transition('* => active', core_1.animate('650ms ease-in-out')),
    core_1.transition('active => inactive', core_1.animate('650ms ease-in-out')),
    core_1.transition('active => route-triggered', core_1.animate('0ms ease-in-out'))
]);
exports.navMaskAnimationPrimary = core_1.trigger('navMaskAnimationPrimary', [
    core_1.state('inactive', core_1.style({
        display: 'none',
        transform: 'translateX(-125%)'
    })),
    core_1.state('active', core_1.style({
        display: 'none',
        transform: 'translateX(150%)'
    })),
    core_1.transition('inactive => active', core_1.animate('1500ms ease-in', core_1.keyframes([
        core_1.style({ display: 'block', transform: 'translateX(-125%)', offset: 0 }),
        core_1.style({ display: 'block', transform: 'translateX(-50%)', offset: 0.25 }),
        core_1.style({ display: 'block', transform: 'translateX(0%)', offset: 0.35 }),
        core_1.style({ display: 'block', transform: 'translateX(0%)', offset: 0.5 }),
        core_1.style({ display: 'block', transform: 'translateX(0%)', offset: 0.65 }),
        core_1.style({ display: 'block', transform: 'translateX(75%)', offset: 0.8 }),
        core_1.style({ display: 'block', transform: 'translateX(100%)', offset: 0.95 }),
        core_1.style({ display: 'none', offset: 1 })
    ]))),
    core_1.transition('active => inactive', core_1.animate('1500ms ease-out', core_1.keyframes([
        core_1.style({ display: 'none', visibility: 'hidden', transform: 'translateX(125%)', offset: 0 }),
        core_1.style({ display: 'none', visibility: 'hidden', transform: 'translateX(150%)', offset: 0.5 }),
        core_1.style({ display: 'none', visibility: 'hidden', transform: 'translateX(175%)', offset: 1 })
    ])))
]);
exports.navMaskAnimationSecondary = core_1.trigger('navMaskAnimationSecondary', [
    core_1.state('inactive', core_1.style({
        display: 'none',
        transform: 'translateX(-125%)'
    })),
    core_1.state('active', core_1.style({
        display: 'none',
        transform: 'translateX(150%)'
    })),
    core_1.transition('inactive => active', core_1.animate('1500ms ease-in', core_1.keyframes([
        core_1.style({ display: 'block', transform: 'translateX(-125%)', offset: 0 }),
        core_1.style({ display: 'block', transform: 'translateX(-50%)', offset: 0.1 }),
        core_1.style({ display: 'block', transform: 'translateX(-5%)', offset: 0.2 }),
        core_1.style({ display: 'block', transform: 'translateX(0%)', offset: 0.3 }),
        core_1.style({ display: 'block', transform: 'translateX(0%)', offset: 0.35 }),
        core_1.style({ display: 'block', transform: 'translateX(0%)', offset: 0.5 }),
        core_1.style({ display: 'block', transform: 'translateX(0%)', offset: 0.65 }),
        core_1.style({ display: 'block', transform: 'translateX(75%)', offset: 0.8 }),
        core_1.style({ display: 'block', transform: 'translateX(100%)', offset: 0.95 }),
        core_1.style({ display: 'none', offset: 1 })
    ]))),
    core_1.transition('active => inactive', core_1.animate('1500ms ease-out', core_1.keyframes([
        core_1.style({ display: 'none', visibility: 'hidden', transform: 'translateX(125%)', offset: 0 }),
        core_1.style({ display: 'none', visibility: 'hidden', transform: 'translateX(150%)', offset: 0.5 }),
        core_1.style({ display: 'none', visibility: 'hidden', transform: 'translateX(175%)', offset: 1 })
    ])))
]);
exports.fadeInOutRouteAnimation = core_1.trigger('routeAnimation', [
    core_1.state('*', core_1.style({
        width: '100%',
        opacity: 1
    })),
    core_1.transition(':enter', [
        core_1.style({
            display: 'block',
            position: 'absolute',
            opacity: 0
        }),
        core_1.animate('1.4s ease-in')
    ]),
    core_1.transition(':leave', [
        core_1.style({
            display: 'block',
            position: 'absolute'
        }),
        core_1.animate('.8s ease-out', core_1.style({
            display: 'block',
            position: 'absolute',
            opacity: 0
        }))
    ])
]);
exports.fadeInOutParentRouteAnimation = core_1.trigger('parentRouteAnimation', [
    core_1.state('*', core_1.style({
        width: '100%',
        opacity: 1
    })),
    core_1.transition(':enter', [
        core_1.style({
            display: 'block',
            position: 'absolute',
            opacity: 0
        }),
        core_1.animate('.3s ease-in')
    ]),
    core_1.transition(':leave', [
        core_1.style({
            display: 'block',
            position: 'absolute'
        }),
        core_1.animate('.3s ease-out', core_1.style({
            display: 'block',
            position: 'absolute',
            opacity: 0
        }))
    ])
]);
//# sourceMappingURL=animations.js.map