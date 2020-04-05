import { IResolvers } from "graphql-tools"

const query  : IResolvers = {
    Query : {        
        hola() : string {
            return 'Hola mundo'
        },
        holaConNombre(_:void,{ nombre }): string{
            return `Hola mundo ${nombre}`
        },
        holaAlCursoGraphQL() : string {
            return 'Hola a todos'
        }
    }
}

export default query;