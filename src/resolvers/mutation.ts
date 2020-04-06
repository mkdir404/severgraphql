import { IResolvers } from "graphql-tools"
import { database } from "../data/data.store";
import  _  from 'lodash';
import e from "express";

const mutation  : IResolvers = {
    Mutation : {
        cursoNuevo(__void,{curso}):any{
            
            const iteamCurso  = {
                id : String(database.cursos.length + 1),
                title  :  curso.title,
                description : curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews : []
            }
            

            if( database.cursos.filter(iteamCur => iteamCur.title === iteamCurso.title ).length === 0 ){
                database.cursos.push(iteamCurso)
                return iteamCurso;
            }

            return {
                id : '-1',
                title  :  `El curso ${ iteamCurso.title } ya existe`,
                description : '',
                clases: -1,
                time: 0.0,
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews : []
            }
            
            
            
        },
        modificadorCurso(__void,{curso}):any{
            const elementoExistente = _.findIndex(database.cursos,function(curso){                
                return curso.id === curso.id
            });

            if(elementoExistente > 1){
                const valoraciones = database.cursos[elementoExistente].reviews;
                curso.reviews = valoraciones;
                database.cursos[elementoExistente] = curso;
                return curso;
            }

            return {
                id : '-1',
                title  :  `El curso ${ curso.id } no existe`,
                description : '',
                clases: -1,
                time: 0.0,
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews : []
            }
        },
        eliminarCurso(__void,{id}):any{
            const borrarCurso  = _.remove(database.cursos,function(curso){
                return curso.id === id
            })

            if(borrarCurso[0]  === undefined){
                return {
                    id : '-1',
                    title  :  `El curso ${ id } no existe`,
                    description : '',
                    clases: -1,
                    time: 0.0,
                    level: 'TODOS',
                    logo: '',
                    path: '',
                    teacher: '',
                    reviews : []
                }
            }

            return borrarCurso[0]
        }
    }
}

export default mutation;