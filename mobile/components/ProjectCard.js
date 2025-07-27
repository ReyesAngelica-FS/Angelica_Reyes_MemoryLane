import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ProjectCard = ({ project, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{project.project_name}</Text>
            <Text style={styles.detail}>🧶 Yarn: {project.yarn_type}</Text>
            <Text style={styles.detail}>📜 Pattern: {project.pattern_name}</Text>
            <Text style={styles.date}>
                📅 Created: {new Date(project.created_at).toLocaleDateString()}
            </Text>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(project)}>
                <Text style={styles.btnText}>✏️ Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(project._id)}>
                <Text style={styles.btnText}>🗑️ Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProjectCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#333",
    },
    detail: {
        fontSize: 14,
        color: "#555",
    },
    date: {
        fontSize: 12,
        color: "#888",
        marginTop: 6,
    },
    actions: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between",
    },
    editBtn: {
        backgroundColor: "#4CAF50",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    deleteBtn: {
        backgroundColor: "#f44336",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
