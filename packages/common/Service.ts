import express from 'express'

export interface Service {
    name: string,
    methods: ServiceMethods
}


export interface ServiceMethods {
    [key:string]:(req:express.Request)=>any
}