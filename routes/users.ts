import { Router } from 'express';
import {deleteUser, getUser, getUsers, postUser, putUser} from "../controllers/user";

export const usersRoutes = Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/:id', getUser);
usersRoutes.post('/', postUser);
usersRoutes.put('/:id', putUser);
usersRoutes.delete('/:id',deleteUser);