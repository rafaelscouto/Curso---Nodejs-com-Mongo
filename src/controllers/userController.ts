import { Request, Response } from 'express';
import User from '../models/User';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

export const add = async (req: Request, res: Response) => {
    if(req.body.email && req.body.age && req.body.firstName) {
        try{
            let newUser = new User();
            newUser.email = req.body.email as string;
            newUser.age = parseInt(req.body.age) as number;
            newUser.interests = (req.body.interests).split(',') as [string];
            newUser.name = {
                firstName: req.body.firstName as string,
                lastName: req.body.lastName as string
            }
            let result = await newUser.save();
            console.log('Usuário salvo: ', result);
        } catch(e) {
            console.log('Erro ao salvar usuário: ', e);
        }
    } else {
        console.log('Preencha os campos obrigatórios');
    }
    res.redirect('/');
};

export const addAge = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let user = await User.findById(id);
    if(user) {
        user.age++;
        await user.save();
    }
    res.redirect('/');
};

export const subAge = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let user = await User.findById(id);
    if(user) {
        user.age--;
        await user.save();
    }
    res.redirect('/');
};

export const trash = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    await User.deleteOne({_id: id});
    res.redirect('/');
};