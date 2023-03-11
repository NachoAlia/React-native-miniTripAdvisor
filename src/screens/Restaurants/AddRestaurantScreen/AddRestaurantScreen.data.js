import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    address: "",
    description: "",
    phone: "",
    web: "",
    images: [],
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("El campo nombre es obligatorio"),
    address: Yup.string().required("El campo direccion es obligatorio"),
    description: Yup.string().required("El campo direccion es obligatorio"),
    phone: Yup.string().required("El campo telefono es obligatorio"),
    web: Yup.string()
      .url("Debes ingresar una url valida")
      .required("El campo web es obligatorio"),
    images: Yup.array()
      .min(1, "Debes subir como minimo una imagen")
      .required("La imagen es obligatoria"),
  });
}
