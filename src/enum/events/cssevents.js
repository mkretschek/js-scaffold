define(function () {
  // Unless otherwise stated, all events are defined in the CSS3
  // specification.
  //
  // @see CSS3 Animation Events http://www.w3.org/TR/css3-animations/#animation-events
  // @see CSS3 Transition Events http://www.w3.org/TR/css3-transitions/#transition-events
  //
  return {
    // @interface AnimationEvent
    // A CSS animation has completed.
    ANIMATION_END : 'animationend',

    // @interface AnimationEvent
    // A CSS animation is repeated.
    ANIMATION_ITERATION : 'animationiteration',

    // @interface AnimationEvent
    // A CSS animation has started.
    ANIMATION_START : 'animationstart',

    // @interface TransitionEvent
    // A CSS transition has completed.
    TRANSITION_END : 'transitionend'
  };
});
