// hooks/useProjects.ts
import { useEffect, useState } from 'react';
import { Project } from '@/types/Project';

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/projects') // Replace with your actual backend IP if needed
        .then((res) => res.json())
        .then((data) => {
            setProjects(data);
            setLoading(false);
        })
        .catch((err) => {
            console.error('Error fetching projects:', err);
            setLoading(false);
        });
    }, []);

    return { projects, loading };
}
