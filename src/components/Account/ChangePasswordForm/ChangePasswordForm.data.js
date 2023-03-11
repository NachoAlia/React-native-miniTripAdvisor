import * as Yup from "yup";

export function initialValues(){
    return {
        password:"",
        new_password:"",
        confirmation_password:"",
    };
}

export function validationSchema(){
    return Yup.object({
        password: 
            Yup.string()
            .required("La contraseña actual es obligatoria"),
        new_password: 
            Yup.string()
            .required("La nueva contraseña es obligatoria"),
        confirmation_password: 
            Yup.string()
            .required("La confirmacion de contraseña es obligatoria") 
            .oneOf([Yup.ref("new_password")], "Las contraseñas tienen que ser iguales"),
    });
}