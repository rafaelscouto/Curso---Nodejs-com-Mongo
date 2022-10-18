import { Request, Response } from 'express';
import User from '../models/User';

export const home = async (req: Request, res: Response)=>{
    
    let usuarios = await User.find({}).sort({
        name: 1 // ordenação ascendente
        // name: -1 // ordenação descendente
    });

    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    res.render('pages/home', {
        name: '',
        lastName: '',
        showOld,
        usuarios
    });
};