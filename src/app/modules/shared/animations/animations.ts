import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

export const fadeInOut: AnimationEntryMetadata = trigger('fadeInOut', [
  state('inactive', style({
    opacity: '0'
  })),
  state('active',   style({
    opacity: '1'
  })),
  transition('inactive => active', animate('500ms ease-in')),
  transition('active => inactive', animate('500ms ease-out'))
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

export const advancedSearchFadeInOut: AnimationEntryMetadata = trigger('advancedSearchFadeInOut', [
  state('inactive', style({
    opacity: '0',
    height: 0,
    'pointer-events': 'none'
  })),
  state('active',   style({
    opacity: '1',
    height: 'auto',
    'pointer-events': 'auto'
  })),
  transition('inactive => active', animate('300ms linear')),
  transition('active => inactive', animate('300ms linear'))
]);


export const slideInOutAnimation: AnimationEntryMetadata =
  trigger('slideInOutAnimation', [
    state('active',
      style({
        transform: 'translateX(100%)'
      })
    ),
    state('inactive',
      style({
        transform: 'translateX(0)'
      })
    ),
    transition('inactive => active', animate('0.5s ease-in')),
    transition('active => inactive', animate('0.5s ease-out'))
]);

export const slideRightLeftAnimation: AnimationEntryMetadata =
  trigger('slideRightLeftAnimation', [
    state('inactive',
      style({
        transform: 'translateX(0%)'
      })
    ),
    state('active',
      style({
        transform: 'translateX(-100%)'
      })
    ),
    transition('inactive => active', animate('0.35s ease')),
    transition('active => inactive', animate('0.35s ease'))
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
        opacity: 0
      }),
      animate('1.4s ease-in')
    ]),
    transition(':leave', [
      style({
        display: 'block',
        position: 'absolute'
      }),
      animate('.8s ease-out', style({
        display: 'block',
        position: 'absolute',
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
      animate('.3s ease-out', style({
        display: 'block',
        position: 'absolute',
        opacity: 0
      }))
    ])
]);

export const formSwitch: AnimationEntryMetadata = trigger('fadeOutOnly', [
    state('inactive', style({
        opacity: '0'
    })),
    state('active',   style({
        opacity: '1'
    })),
    transition('active => inactive', animate('500ms ease-out'))
]);


export const formFadeInOut: AnimationEntryMetadata = trigger('formFadeInOut', [
    state('viewMode', style({
        height: 0,
        opacity: '0'
    })),
    state('editMode', style({
        height: '*',
        opacity: '1'
    })),
    transition('viewMode => editMode', animate('400ms ease-out')),
    transition('editMode => viewMode', animate('400ms ease-out'))
]);

export const editModeAnimation: AnimationEntryMetadata = trigger('editMode', [
    state('inactive', style({
        height: 0,
        opacity: '0'
    })),
    state('active', style({
        height: '*',
        opacity: '1'
    })),
    transition('inactive => active', animate('700ms ease-in')),
    transition('active => inactive', animate('600ms ease-out'))
]);
export const viewModeAnimation: AnimationEntryMetadata = trigger('viewMode', [
    state('inactive', style({
        height: 0,
        opacity: '0'
    })),
    state('active', style({
        height: '*',
        opacity: '1'
    })),
    transition('inactive => active', animate('100ms ease-in')),
    transition('active => inactive', animate('900ms ease-out'))
]);

