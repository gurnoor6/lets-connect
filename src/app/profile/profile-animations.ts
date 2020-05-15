import {query,trigger,state,transition,style,animate,keyframes} from '@angular/animations';

export const showCaption=(

	trigger('showCaption',[
		state('image',style({
			display:"block",
		})),

		state('text',style({
			display:"none",
		})),

		transition('showCaption<=>text',animate('1s'))


	])

)