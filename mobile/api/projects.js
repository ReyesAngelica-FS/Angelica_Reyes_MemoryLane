// mobile/api/project.js
const API_URL = "http://localhost:5000/api/projects"; // or your local IP for real device testing

export const getProjects = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching projects:", error);
        throw error;
    }
};

export const addProject = async (projectData) => {
    try {
        const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
        });
        return await response.json();
    } catch (error) {
        console.error("❌ Error adding project:", error);
        throw error;
    }
};

export const updateProject = async (id, updatedData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT", // or PATCH if you're partially updating
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
        });
        return await response.json();
    } catch (error) {
        console.error("❌ Error updating project:", error);
        throw error;
    }
};

export const deleteProject = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        });
        return await response.json();
    } catch (error) {
        console.error("❌ Error deleting project:", error);
        throw error;
    }
};
