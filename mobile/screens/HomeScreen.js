// mobile/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../api/projects";

const HomeScreen = () => {
    const [projects, setProjects] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadProjects = async () => {
        try {
        const data = await getProjects();
        setProjects(data);
        } catch (err) {
        console.error("Failed to fetch projects:", err);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadProjects();
        setRefreshing(false);
    };

    const renderItem = ({ item }) => <ProjectCard project={item} />;

    return (
        <View style={styles.container}>
        <Text style={styles.title}>🧶 Knitting Projects</Text>
        <FlatList
            data={projects}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={<Text style={styles.empty}>No projects found.</Text>}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: "#FFF",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
        color: "#333",
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#999",
        fontSize: 16,
    },
});

export default HomeScreen;
