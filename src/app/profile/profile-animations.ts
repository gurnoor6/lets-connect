import {query,trigger,state,transition,style,animate,keyframes} from '@angular/animations';

export const showCaption=(

	trigger('showCaption',[
		state('image',style({
			opacity:"1",
		})),

		state('text',style({
			opacity:"0",
			display:"none"
		})),

		transition('image=>text',animate('0.25s ease-out',keyframes([
			style({opacity:"1",offset:0.0}),
			style({opacity:"0.5",offset:0.3}),
			style({opacity:"0.1",offset:0.9}),
		    style({display:"none",offset:1.0}),

		]))),
		transition('text=>image',animate('0.5s ease-in',keyframes([
			style({display:"initial",offset:0.0}),
			style({opacity:"0.5",offset:0.7}),
			style({opacity:"1",offset:1.0}),

		])))


	])

)
