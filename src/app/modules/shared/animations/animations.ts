import { animate, AnimationEntryMetadata, state, style, transition, keyframes, trigger } from '@angular/core';

export const fadeInOut: AnimationEntryMetadata = trigger('fadeInOut', [
  state('inactive', style({
    opacity: '0'
  })),
  state('trigger-once', style({
    opacity: '0'
  })),
  state('active',   style({
    opacity: '1'
  })),
  transition('* => active', animate('650ms ease-in')),
  transition('active => *', animate('650ms ease-out'))
]);

export const fadeOutOnly: AnimationEntryMetadata = trigger('fadeOutOnly', [
    state('inactive', style({
        opacity: '0'
    })),
    state('active',   style({
        opacity: '1'
    })),
    transition('inactive => active', animate('0ms ease-out')),
    transition('active => inactive', animate('500ms ease-out'))
]);

export const fadeAndHide: AnimationEntryMetadata = trigger('fadeAndHide', [
  state('inactive', style({
    display: 'none'
  })),
  state('active',   style({
    opacity: '1'
  })),
  transition('inactive => active', [
      style({
        opacity: 0
      }),
      animate('500ms ease-in')
  ]),
  transition('active => inactive', 
      animate('500ms ease-out',
          style({
              opacity: 0
          })
      )
  )
]);

export const fadeShrinkAndHide: AnimationEntryMetadata = trigger('fadeShrinkAndHide', [
  state('inactive', style({
    display: 'none',
    height: 0
  })),
  state('active',   style({
    height: '*',
    opacity: '1'
  })),
  transition('inactive => active', [
      style({
        opacity: 0
      }),
      animate('500ms ease-in')
  ]),
  transition('active => inactive', 
      animate('500ms ease-out',
          style({
              opacity: 0
          })
      )
  )
]);

export const slideInOutAnimation: AnimationEntryMetadata =
  trigger('slideInOutAnimation', [
    state('active',
      style({
        transform: 'translateX(-100%)'
      })
    ),
    state('inactive',
      style({
        transform: 'translateX(0)'
      })
    ),
    transition('inactive => active', animate('0.3s linear')),
    transition('active => inactive', animate('0.3s linear'))
  ]);

export const slideOutAfterMainNav: AnimationEntryMetadata =
  trigger('slideOutAfterMainNav', [
    state('active',
      style({
        transform: 'translateX(245px)'
      })
    ),
    state('inactive',
      style({
        transform: 'translateX(0)'
      })
    ),
    transition('inactive => active', animate('0.3s linear')),
    transition('active => inactive', animate('0.3s linear'))
]);

export const lefttoRightSlide: AnimationEntryMetadata =
  trigger('lefttoRightSlide', [
    state('active',
      style({
        transform: 'translateX(0)'
      })
    ),
    state('inactive',
      style({
        transform: 'translateX(-100%)'
      })
    ),
    transition('inactive => active', animate('0.3s linear')),
    transition('active => inactive', animate('0.3s linear'))
]);


export const fadeInOutRouteAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        width: '100%',
        opacity: 1
      })
    ),
    transition(':enter', [
      style({
        display: 'block',
        position: 'absolute',
        right: 0,
        left: 0,
        opacity: 0
      }),
      animate('.8s ease-in')
    ]),
    transition(':leave', [
      style({
        display: 'block',
        position: 'absolute',
        right: 0,
        left: 0
      }),
      animate('.8s ease-out', style({
        display: 'block',
        position: 'absolute',
        right: 0,
        left: 0,
        opacity: 0
      }))
    ])
  ]);


  
export const fadeInOutParentRouteAnimation: AnimationEntryMetadata =
  trigger('parentRouteAnimation', [
    state('*',
      style({
        width: '100%',
        opacity: 1
      })
    ),
    transition(':enter', [
      style({
        display: 'block',
        position: 'absolute',
        opacity: 0
      }),
      animate('.3s ease-in')
    ]),
    transition(':leave', [
      style({
        display: 'block',
        position: 'absolute'
      }),
      animate('.3s ease-out',
          style({
            display: 'block',
            position: 'absolute',
            opacity: 0
          })
      )
    ])
  ]);


