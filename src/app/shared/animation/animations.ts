import { animate, animation, keyframes, style, transition, trigger, useAnimation } from "@angular/animations"

// animation() allows for more configuration than animate()
export const enterAnimation = animation(
  animate('0.8s cubic-bezier(.25,.5,0,1)', keyframes([
    style({
      transform: 'translate3d(20px, 0, 0)',
      opacity: 0
    }),
    style({
      transform: 'initial',
      opacity: 1
    }),
  ]))
);

export const leaveAnimation = animation(
  animate('0.4s cubic-bezier(0,.5,0,1)', keyframes([
    style({
      transform: 'initial',
      opacity: 1
    }),
    style({
      transform: 'translate3d(20px, 0, 0)',
      opacity: 0
    }),
  ]))
);

export const slideEnterLeaveTrigger = trigger('slideEnterLeave', [
  transition('void => enter', [
    useAnimation(enterAnimation)
  ]),
  transition('leave => void', [
    useAnimation(leaveAnimation)
  ])
]);
