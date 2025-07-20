import React, { useEffect, useState } from "react";
import AddProjectForm from "./AddProjectForm";

const Projects = () => {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        try {
        const res = await fetch("http://localhost:5000/api/projects");
        const data = await res.json();
        setProjects(data);
        } catch (err) {
        console.error("Error fetching projects:", err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleProjectAdded = (newProject) => {
        setProjects([newProject, ...projects]);
    };

    return (
        <div>
        <AddProjectForm onProjectAdded={handleProjectAdded} />
        {projects.length === 0 ? (
            <p>No knitting projects yet.</p>
        ) : (
            <ul style={{ paddingLeft: 0 }}>
            {projects.map((project) => (
                <li key={project._id} style={{ marginBottom: "1rem", listStyle: "none" }}>
                <strong>{project.project_name}</strong><br />
                Yarn: {project.yarn_type} <br />
                Pattern: {project.pattern_name} <br />
                Created: {new Date(project.created_at).toLocaleDateString()}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default Projects;
