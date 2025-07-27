// mobile/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import { getProjects } from "../api/projects";
import ProjectCard from "../components/ProjectCard";

const HomeScreen = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProjects = async () => {
        try {
        const data = await getProjects();
        setProjects(data);
        } catch (error) {
        console.error("Failed to fetch projects:", error);
        } finally {
        setLoading(false);
        setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchProjects();
    };

    if (loading) {
        return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#6c5ce7" />
        </View>
        );
    }

    return (
        <View style={styles.container}>
        <Text style={styles.heading}>🧶 My Knit Projects</Text>
        <FlatList
            data={projects}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ProjectCard project={item} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            contentContainerStyle={{ paddingBottom: 100 }}
        />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f7f1f1",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#2d3436",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
