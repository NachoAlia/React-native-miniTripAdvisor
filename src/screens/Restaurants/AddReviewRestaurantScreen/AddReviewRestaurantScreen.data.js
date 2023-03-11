import * as Yup from "yup";

export function initialValues(){
    return {
        title:"",
        comment:"",
        rating:3
    }
}

export function validationSchema(){
    return Yup.object({
        title: Yup.string().required("El campo titulo es obligatorio"),
        comment: Yup.string().required("El campo commentario es obligatorio"),
        rating:Yup.number().required("La calificacion es obligatoria")
    });
}