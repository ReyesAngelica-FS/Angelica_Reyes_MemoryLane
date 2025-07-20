// src/components/AddProjectForm.js
import React, { useState } from "react";

const AddProjectForm = ({ onProjectAdded }) => {
    const [form, setForm] = useState({
        project_name: "",
        yarn_type: "",
        pattern_name: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch("http://localhost:5000/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const newProject = await res.json();
        onProjectAdded(newProject); // Notify parent to re-render
        setForm({ project_name: "", yarn_type: "", pattern_name: "" });
        } catch (err) {
        console.error("Error adding project:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <h3>Add New Project</h3>
        <input
            name="project_name"
            placeholder="Project Name"
            value={form.project_name}
            onChange={handleChange}
            required
            style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <input
            name="yarn_type"
            placeholder="Yarn Type"
            value={form.yarn_type}
            onChange={handleChange}
            required
            style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <input
            name="pattern_name"
            placeholder="Pattern Name"
            value={form.pattern_name}
            onChange={handleChange}
            required
            style={{ display: "block", marginBottom: "0.5rem" }}
        />
        <button type="submit">➕ Add Project</button>
        </form>
    );
};

export default AddProjectForm;
