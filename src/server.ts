import express from 'express';
import compression from 'compression';
import cors from 'cors'; 
import { IResolvers, makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import graphQLHTTP from 'express-graphql';

const app = express();

app.use('*',cors());
app.use(compression());


const typeDefs = `

    type Query {
        hola : String!
        holaConNombre(nombre : String!):String!
        holaAlCursoGraphQL : String!
    }
`;

const resolvers  : IResolvers = {
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

const schema : GraphQLSchema = makeExecutableSchema({
    typeDefs ,
    resolvers
});


app.use('/',graphQLHTTP({
    schema,
    graphiql : true
}))

const PORT = 5300;
app.listen({port:PORT},()=> console.log(`Hola mundo API Graphql http://localhost:${PORT}/graphql`))
