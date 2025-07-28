import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface Project {
  _id: string;
  title: string;
  description: string;
}

export default function HomeScreen() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const fetchProjects = () => {
        setLoading(true);
        axios
        .get('http://YOUR_LOCAL_IP:5000/api/projects') // Replace with your machine's local IP
        .then((res) => setProjects(res.data))
        .catch((err) => console.error('❌ Error fetching projects:', err))
        .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const renderItem = ({ item }: { item: Project }) => (
        <TouchableOpacity style={styles.card}>
        <Text style={styles.projectTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
        <Text style={styles.header}>🧶 My Knitting Projects</Text>
        <Button title="➕ Create New Project" onPress={() => navigation.navigate('CreateProject')} />

        {loading ? (
            <View style={styles.loader}>
            <ActivityIndicator size="large" color="#6C63FF" />
            <Text>Loading projects...</Text>
            </View>
        ) : (
            <FlatList
            data={projects}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 16 }}
            />
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF8F0',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#8B5E3C',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#FCEFEF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderColor: '#DDBDD5',
        borderWidth: 1,
    },
    projectTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#5D3A00',
        marginBottom: 6,
    },
});
