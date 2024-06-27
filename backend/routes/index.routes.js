import {Router} from 'express'
import {enviarMensaje} from '../controllers/index.controllers.js'

const router = Router()

router.post('/chat',enviarMensaje)

export default router