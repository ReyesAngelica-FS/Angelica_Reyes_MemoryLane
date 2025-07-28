import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CreateProjectScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigation = useNavigation();

    const handleCreate = async () => {
        if (!title.trim() || !description.trim()) {
        Alert.alert('Validation', 'Both title and description are required.');
        return;
        }

        try {
        await axios.post('http://192.168.1.81:5000/api/projects', {
            title,
            description,
        });

        Alert.alert('Success', 'Project created!');
        navigation.goBack(); // Or navigate('Home') if using named routes
        } catch (error) {
        console.error('Error creating project:', error);
        Alert.alert('Error', 'Failed to create project. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.heading}>🧶 Add New Project</Text>

        <Text style={styles.label}>Title</Text>
        <TextInput
            style={styles.input}
            placeholder="Ex: Cozy Winter Scarf"
            value={title}
            onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ex: Using chunky yarn, size 10 needles..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
        />

        <Button title="Create Project" onPress={handleCreate} />
        </View>
    );
};

export default CreateProjectScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginTop: 5,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});
