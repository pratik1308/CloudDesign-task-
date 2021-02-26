export class Todo {
    id: number;
    name: string;
    content: string;
    state: string;


    constructor( 
        name: string = '',
        content: string = '',
        state: string = ''
        ) {
           
            this.name = name;
            this.content = content;
            this.state = state;
            }
            }