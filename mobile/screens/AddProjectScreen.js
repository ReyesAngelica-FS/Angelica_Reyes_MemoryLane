import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { addProject } from "../api/projects";

const AddProjectScreen = ({ navigation }) => {
    const [form, setForm] = useState({
        project_name: "",
        yarn_type: "",
        pattern_name: "",
    });

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        try {
        if (!form.project_name || !form.yarn_type || !form.pattern_name) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        await addProject(form);
        Alert.alert("Success", "Project added!");
        setForm({ project_name: "", yarn_type: "", pattern_name: "" });
        navigation.goBack(); // go back to HomeScreen
        } catch (err) {
        console.error(err);
        Alert.alert("Error", "Failed to add project.");
        }
    };

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
        >
        <ScrollView contentContainerStyle={styles.inner}>
            <Text style={styles.title}>➕ Add New Project</Text>

            <TextInput
            style={styles.input}
            placeholder="Project Name"
            value={form.project_name}
            onChangeText={(text) => handleChange("project_name", text)}
            />
            <TextInput
            style={styles.input}
            placeholder="Yarn Type"
            value={form.yarn_type}
            onChangeText={(text) => handleChange("yarn_type", text)}
            />
            <TextInput
            style={styles.input}
            placeholder="Pattern Name"
            value={form.pattern_name}
            onChangeText={(text) => handleChange("pattern_name", text)}
            />

            <Button title="Submit" onPress={handleSubmit} />
        </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    inner: {
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 12,
        marginBottom: 16,
        borderRadius: 8,
    },
});

export default AddProjectScreen;
