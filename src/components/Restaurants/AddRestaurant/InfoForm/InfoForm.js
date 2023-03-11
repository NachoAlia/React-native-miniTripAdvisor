import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./InfoForm.styles";
import { Input } from "react-native-elements";

export function InfoForm(props) {
  const { formik } = props;

  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Nombre del restaurante"
          inputContainerStyle={styles.text}
          onChangeText={(text) => formik.setFieldValue("name", text)}
          errorMessage={formik.errors.name}
        />
        <Input
          placeholder="Dirección"
          inputContainerStyle={styles.text}
          onChangeText={(text) => formik.setFieldValue("address", text)}
          errorMessage={formik.errors.address}
        />
        <Input
          placeholder="Telefono"
          inputContainerStyle={styles.text}
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          errorMessage={formik.errors.phone}
        />
        <Input
          placeholder="www.example.com"
          inputContainerStyle={styles.text}
          onChangeText={(text) => formik.setFieldValue("web", text)}
          errorMessage={formik.errors.web}
        />
        <Input
          placeholder="Descripción"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => formik.setFieldValue("description", text)}
          errorMessage={formik.errors.description}
        />
      </View>
    </>
  );
}
