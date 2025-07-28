import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface Project {
    _id: string;
    title: string;
    description: string;
}

const HomeScreen = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/projects');
            setProjects(res.data);
        } catch (err) {
            console.error('❌ Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
        };

        fetchProjects();
    }, []);

    const renderItem = ({ item }: { item: Project }) => (
        <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('EditProject' as never, {project: item } as never)} >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
        <Text style={styles.header}>🧶 My Knitting Projects</Text>
        {loading ? (
            <ActivityIndicator size="large" color="#6a1b9a" />
        ) : (
            <FlatList
            data={projects}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            />
        )}
        </View>
    );
};

export default HomeScreen;


const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#fff',
        },
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            color: '#6a1b9a',
        },
        list: {
            paddingBottom: 20,
        },
        card: {
            backgroundColor: '#f3e5f5',
            padding: 16,
            borderRadius: 12,
            marginBottom: 12,
        },
        title: {
            fontSize: 18,
            fontWeight: '600',
            color: '#4a148c',
        },
        description: {
            fontSize: 14,
            color: '#6a1b9a',
            marginTop: 4,
        },
});
