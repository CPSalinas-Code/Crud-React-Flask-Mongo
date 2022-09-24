import React, { useState, useEffect } from "react";
//useffect permite volver ejecutar codigo despues del renderizado del comp
export const Users = () => {

    const api = process.env.REACT_APP_API;
    const [editing,setediting] = useState(false);
    const [campoNombre, setcampoNombre] = useState('');
    const [campoEmail, setcampoEmail] = useState('');
    const [campoPassWord, setcampoPassword] = useState('');
    const [id, setId] = useState(''); //id general par actualizar

    //variables de lista de datos a mostrar
    const [users, setUsers] = useState([]);

    const actualizarCampoNombre = (e) => {
        setcampoNombre(e.target.value);
        //console.log(e.target.value);
    };
    const actualizarCampoEmail = (e) => {
        setcampoEmail(e.target.value);
    };
    const actualizarCampoPassword = (e) => {
        setcampoPassword(e.target.value);
    };

    const enviarDatos = async (e) => {
        //console.log(e);
        e.preventDefault(); //evitar que se actualizar la pagina completamente
        //fetch('http://localhost') --> si se va a hacer de manera local
        //uso de variables de entorno .env
        //fetch(REACT_APP_API)
        //console.log(api+'/users');
        /*const datos = {
            id: uuidv4(),
            nombre: campoNombre,
            email: campoEmail,
            password: campoPassWord

        };*/
        if(!editing){
            await fetch(`${api}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    campoNombre,
                    campoEmail,
                    campoPassWord
                })
            })
            //respues de la peticion
            // -->FETCH peticion request modulo API dentro del navegador para usarlo dentro de React
            //console.log(campoNombre,campoEmail,campoPassWord);
            //const data = await respuesta.json();
        }else{
            if(window.confirm('Are you sure you want to update this user?')){
                await fetch(`${api}/users/${id}`,{
                    method: 'PUT',
                    headers :{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        campoNombre,
                        campoEmail,
                        campoPassWord
                    })
                });
            }
            setId('');
            setediting(false);
        }
        //console.log(data);
        await getUsers();
        setcampoNombre('');
        setcampoEmail('');
        setcampoPassword('');
    };

    //fetch por defecto realizar el metodo GET
    const getUsers = async () => {
        const res = await fetch(`${api}/users`);
        const data = await res.json();
        //console.log(data);
        setUsers(data);
    };
    ////useffect permite volver ejecutar codigo despues del renderizado del comp
    useEffect(() => {
        getUsers();
    }, [])

    const deleteUser = async (id) =>{
        //console.log(id);
        //la linea de abajo fue hecha como ejemplo de una aplicacion solo FrontEnd
        //const newUsers = users.filter(userEliminado => userEliminado._id !== id);
        //en la vida real cuando se desea consumir una API/ DB etc se debe consumirla
        //setUsers(newUsers);
        if (window.confirm('Are you sure you want to delete it?')){
            await fetch(`${api}/users/${id}`,{
                method: 'DELETE'
            });
            //const data = await res.json();
            await getUsers();
        }
        
    };


    const editUser = async (id) => {
        //POR PASOS PRIMERO OBTENER DATOS Y PINTARLOS EN FORMULARIO
        //obtener datos
        const res = await fetch(`${api}/user/${id}`);
        const data = await res.json();
        console.log(data);
        setediting(true);
        setId(id);
        //ponerlos en form
        setcampoNombre(data.nombre);
        setcampoEmail(data.email);
        setcampoPassword(data.password);


        //estadobtn=false;
        /*if(window.confirm('Are you sure you want to update this user?')){
            await fetch(`${api}/users/${id}`,{
                method: 'Put'
            });
            await getUsers();
        }*/
        
    };

    return (
        <div className='row'>
            <div className="col-md-4">
                <form onSubmit={enviarDatos} className='card card-body'>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type='text'
                            onChange={actualizarCampoNombre}
                            name='campNombre'
                            placeholder="Escriba el nombre"
                            value={campoNombre}
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type='email'
                            onChange={actualizarCampoEmail}
                            id='campEmail'
                            placeholder="Escriba el email"
                            value={campoEmail}
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type='password'
                            onChange={actualizarCampoPassword}
                            id='campPassword'
                            placeholder="Escriba el password"
                            value={campoPassWord}
                            autoFocus
                        />
                    </div>
                    <button 
                        className="btn btn-primary btn-block" 
                        >
                        {editing?'ACTUALIZAR':'CREAR'}
                    </button>

                </form>
            </div>
            <div className="col-md-8">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button 
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={() => editUser(user._id)}>
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={() => deleteUser(user._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

//export default Users;