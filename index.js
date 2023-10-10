import { createRequire } from 'node:module'
import db from './db/connection.js'
import express from 'express'
import Productos from './modelos/productos.js'
import Usuarios from './modelos/usuarios.js'

const require = createRequire(import.meta.url)

const html = '<h1>Bienvenido a la API</h1><p>Los comandos disponibles son:</p><ul><li>GET: /productos/</li><li>GET: /productos/id</li>    <li>POST: /productos/</li>    <li>DELETE: /productos/id</li>    <li>PUT: /productos/id</li>    <li>PATCH: /productos/id</li>    <li>GET: /usuarios/</li>    <li>GET: /usuarios/id</li>    <li>POST: /usuarios/</li>    <li>DELETE: /usuarios/id</li>    <li>PUT: /usuarios/id</li>    <li>PATCH: /usuarios/id</li></ul>'

const app = express()

try {
  await db.authenticate();
  console.log("La coneccion se establecio correctamente!");
} catch (error) {
  console.error("No se pudo conectar con la base de datos:", error);
}

const exposedPort = 1234

app.get('/', (req, res) => {
    res.status(200).send(html)
})

app.get('/productos/', async (req, res) =>{
    try {
         let allProducts = await Productos.findAll()

        res.status(200).json(allProducts)

    } catch (error) {
        res.status(204).json({"message": error})
    }
})

app.get('/usuarios/', async (req, res) =>{
    try {
        let allUsers = await Usuarios.findAll()

        res.status(200).json(allUsers)

    } catch (error) {
        res.status(204).json({"message": error})
    }
})

app.get('/productos/:id', async (req, res) => {
    try {
        let productoId = parseInt(req.params.id)
        let productoEncontrado = await Productos.findByPk(productoId)

        res.status(200).json(productoEncontrado)

    } catch (error) {
        res.status(204).json({"message": error})
    }
})

app.get('/productos/:id/precio', async (req, res) => {
    try {
        let productoId = parseInt(req.params.id)
        let productoEncontrado = await Productos.findByPk(productoId)

        res.status(200).json(productoEncontrado.precio)

    } catch (error) {
        res.status(204).json({"message": error})
    }
})

app.get('/stock', async (req, res) => {
    try {
        var preciototal = 0;
        var stock = await Productos.count();
        for (let i = 1; i <= stock; i++) { 
            let productofound = await Productos.findByPk(i);
            if (productofound) { 
                preciototal = preciototal + productofound.precio;
            }
        }

        res.status(200).json("Stock de productos actual: " + stock + " Precios individuales sumados: " + preciototal);

    } catch (error) {
        res.status(500).json({"message": error.message});
    }
})


app.get('/productos/:id/nombre', async (req, res) => {
    try {
        let productoId = parseInt(req.params.id)
        let productoEncontrado = await Productos.findByPk(productoId)

        res.status(200).json(productoEncontrado.nombre)

    } catch (error) {
        res.status(204).json({"message": error})
    }
})

app.get('/usuarios/:id', async (req, res) => {
    try {
        let usuarioId = parseInt(req.params.id)
        let usuarioEncontrado = await Usuarios.findByPk(usuarioId)

        res.status(200).json(usuarioEncontrado)

    } catch (error) {
        res.status(204).json({"message": error})
    }
})

app.get('/usuarios/:id/nombre', async (req, res) => {
    try {
        let usuarioId = parseInt(req.params.id)
        let usuarioEncontrado = await Usuarios.findByPk(usuarioId)

        res.status(200).json(usuarioEncontrado.nombre)

    } catch (error) {
        res.status(204).json({"message": error})
    }
})

app.get('/usuarios/:id/dni', async (req, res) => {
    try {
        let usuarioId = parseInt(req.params.id)
        let usuarioEncontrado = await Usuarios.findByPk(usuarioId)

        res.status(200).json(usuarioEncontrado.dni)

    } catch (error) {
        res.status(204).json({"message": error})
    }
})

app.post('/productos', async (req, res) => {
    try {
        let bodyTemp = ''

        req.on('data', (chunk) => {
            bodyTemp += chunk.toString()
        })
    
        req.on('end', async () => {
            const data = JSON.parse(bodyTemp)
            req.body = data
            
             const productoAGuardar = new Productos(req.body)
             await productoAGuardar.save()
        })
    
        res.status(201).json({"message": "success"})

    } catch (error) {
        res.status(204).json({"message": "error"})
    }
})

app.post('/usuarios', (req, res) => {
    try {
        let bodyTemp = ''

        req.on('data', (chunk) => {
            bodyTemp += chunk.toString()
        })
    
        req.on('end', async () => {
            const data = JSON.parse(bodyTemp)
            req.body = data
            
            const usuarioAGuardar = new Usuarios(req.body)
            await usuarioAGuardar.save()
        })
    
        res.status(201).json({"message": "success"})

    } catch (error) {
        res.status(204).json({"message": "error"})
    }
})

app.patch('/productos/:id', async (req, res) => {
    let idProductoAEditar = parseInt(req.params.id)
try {
    let productoAActualizar = await Productos.findByPk(idProductoAEditar)

    if (!productoAActualizar) {
        res.status(204).json({"message":"Producto no encontrado"})
    }

    let bodyTemp = ''

    req.on('data', (chunk) => {
        bodyTemp += chunk.toString()
    })

    req.on('end', async () => {
        const data = JSON.parse(bodyTemp)
        req.body = data
        
        await productoAActualizar.update(req.body)

        res.status(200).send('Producto actualizado')
    })
} catch (error) {
    res.status(204).json({"message":"Producto no encontrado"})
}
})

app.patch('/usuarios/:id', async (req, res) => {
    let idUsuarioAEditar = parseInt(req.params.id)

try {
    let usuarioAActualizar = await Usuarios.findByPk(idUsuarioAEditar)

    if (!usuarioAActualizar) {
        res.status(204).json({"message":"Usuario no encontrado"})
    }

    let bodyTemp = ''

    req.on('data', (chunk) => {
        bodyTemp += chunk.toString()
    })

    req.on('end', async () => {
        const data = JSON.parse(bodyTemp)
        req.body = data
        
        await usuarioAActualizar.update(req.body)

        res.status(200).send('Usuario actualizado')
    })
} catch (error) {
    res.status(204).json({"message":"Usuario no encontrado"})
}
})

app.delete('/productos/:id', async (req, res) => {
    let idProductoABorrar = parseInt(req.params.id)
try {
    let productoABorrar = await Productos.findByPk(idProductoABorrar)
    if (!productoABorrar){
        res.status(204).json({"message":"Producto no encontrado"})
    }

    await productoABorrar.destroy()
    res.status(200).json({message: "Producto Borrado"})

} catch (error) {
    res.status(204).json({message: error})
}    
})

app.delete('/usuarios/:id', async (req, res) => {
    let idUsuarioABorrar = parseInt(req.params.id)
try {
    let usuarioABorrar = await Usuarios.findByPk(idUsuarioABorrar)
    if (!usuarioABorrar){
        res.status(204).json({"message":"Usuario no encontrado"})
    }

    await usuarioABorrar.destroy()
    res.status(200).json({message: "Usuario Borrado"})

} catch (error) {
    res.status(204).json({message: error})
}    
})

app.use((req, res) => {
    res.status(404).send('<h1>404</h1>')
})

app.listen( exposedPort, () => {
    console.log('Servidor escuchando en http://localhost:' + exposedPort)
})




