// EditProject.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateProject, getProjectById } from "../api/projects";

const EditProject = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { projectId } = route.params;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProject = async () => {
        try {
            const project = await getProjectById(projectId);
            setTitle(project.title);
            setDescription(project.description);
        } catch (err) {
            Alert.alert("Error", "Failed to load project.");
        } finally {
            setLoading(false);
        }
        };

        loadProject();
    }, [projectId]);

    const handleUpdate = async () => {
        try {
        await updateProject(projectId, { title, description });
        Alert.alert("Success", "Project updated successfully.");
        navigation.goBack();
        } catch (err) {
        Alert.alert("Error", "Failed to update project.");
        }
    };

    if (loading) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6c5ce7" />
        </View>
        );
    }

    return (
        <View style={styles.container}>
        <Text style={styles.label}>Title:</Text>
        <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholder="Enter project title"
        />
        <Text style={styles.label}>Description:</Text>
        <TextInput
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 100 }]}
            placeholder="Enter project description"
            multiline
        />
        <Button title="Update Project" onPress={handleUpdate} color="#6c5ce7" />
        </View>
    );
};

export default EditProject;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
