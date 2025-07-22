const API_BASE = "http://localhost:5000/api"; // Replace with your deployed URL if testing on a physical device

// Fetch all projects
export const fetchProjects = async () => {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
};

// Add a new project
export const addProject = async (project) => {
    const res = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error("Failed to add project");
    return await res.json();
};

// Update a project by ID
export const updateProject = async (id, updates) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to update project");
    return await res.json();
};

// Delete a project by ID
export const deleteProject = async (id) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete project");
    return await res.json();
};
