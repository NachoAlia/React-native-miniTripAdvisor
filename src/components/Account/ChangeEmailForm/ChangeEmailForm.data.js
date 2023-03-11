import * as Yup from "yup";


export function initialValues(){
    return {
        email:"",
        password:""
    };    
}

export function validationSchema(){
    return Yup.object({
        email: Yup.string().email("El email no es valido").required("El campo email es obligatorio"),
        password: Yup.string().required("El campo contraseña es obligatorio")
    });
}
