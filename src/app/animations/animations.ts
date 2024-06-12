import { animate, animation, style } from "@angular/animations";

export let fadeInFromRight = animation([
  style({opacity:0, transform:'translate(20px,0)'}),
  animate('{{ duration }} {{ easing }}')
], {
  params: {
    duration: '200ms',
    easing: 'ease-in-out'
  }
});

export let fadeOutToRight = animation([
  animate(
    '{{ duration }} {{ easing }}',
    style({opacity:0, transform:'translate(20px,0)'})
  )
], {
  params: {
    duration: '200ms',
    easing: 'ease-in-out'
  }
});