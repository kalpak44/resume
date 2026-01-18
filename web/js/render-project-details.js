async function loadData(url) {
    const res = await fetch(url, {cache: "no-store"});
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    return await res.json();
}

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
}

function renderProjectDetails(project) {
    const container = document.getElementById("project-details-container");
    container.innerHTML = "";

    if (!project) {
        container.innerHTML = `<div class="alert alert-warning mt-4">Project not found.</div>`;
        return;
    }

    document.getElementById("project-title-header").textContent = project.title || "Project Details";
    document.title = `${project.title || "Project"} — Pavel Usanli`;

    const card = el("div", "card-flat mt-4");
    
    // Title
    const title = el("h2", "section-title", project.title || "Untitled Project");
    card.appendChild(title);

    // Links
    const linksWrap = el("div", "mt-3 d-flex flex-wrap gap-2");
    if (project.github) {
        const ghLink = el("a", "btn btn-outline-dark", "");
        ghLink.href = project.github;
        ghLink.target = "_blank";
        ghLink.rel = "noopener";
        ghLink.innerHTML = '<i class="fab fa-github me-2"></i>GitHub Repo';
        linksWrap.appendChild(ghLink);
    }
    if (project.url) {
        const webLink = el("a", "btn btn-primary", "");
        webLink.href = project.url;
        webLink.target = "_blank";
        webLink.rel = "noopener";
        webLink.innerHTML = '<i class="fa-solid fa-rocket me-2"></i>Live Demo';
        linksWrap.appendChild(webLink);
    }
    if (linksWrap.children.length > 0) {
        card.appendChild(linksWrap);
    }

    // Summary
    if (project.summary) {
        card.appendChild(el("p", "mt-4 fw-bold mb-1", "Summary"));
        card.appendChild(el("p", "summary-text", project.summary));
    }

    // Description
    if (project.description) {
        card.appendChild(el("p", "mt-4 fw-bold mb-1", "Description"));
        card.appendChild(el("p", "summary-text", project.description));
    }

    // Details/Key Features
    if (Array.isArray(project.details) && project.details.length > 0) {
        card.appendChild(el("p", "mt-4 fw-bold mb-1", "Key Features & Tech Stack"));
        const ul = el("ul", "job-bullets");
        for (const detail of project.details) {
            ul.appendChild(el("li", "", detail));
        }
        card.appendChild(ul);
    }

    // Technologies (Pills)
    if (Array.isArray(project.technologies) && project.technologies.length > 0) {
        card.appendChild(el("p", "mt-4 fw-bold mb-1", "Technologies"));
        const pillsWrap = el("div", "mt-2");
        for (const t of project.technologies) {
            pillsWrap.appendChild(el("span", "pill", t));
        }
        card.appendChild(pillsWrap);
    }

    container.appendChild(card);
}

async function init() {
    try {
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get("id");

        const [profile, projects] = await Promise.all([
            loadData("./data/profile.json"),
            loadData("./data/projects.json")
        ]);

        // Fill basic profile info
        document.getElementById("name").textContent = profile.name || "";
        document.getElementById("footerName").textContent = profile.name || "";
        if (profile.avatar) {
            const avatar = document.getElementById("avatar");
            avatar.src = profile.avatar;
            avatar.alt = profile.name || "Profile";
        }

        const project = projects.find(p => p.id === projectId);
        renderProjectDetails(project);
    } catch (err) {
        console.error(err);
        const container = document.getElementById("project-details-container");
        if (container) {
            container.innerHTML = `<div class="alert alert-danger mt-4">Failed to load project details.</div>`;
        }
    }
}

document.addEventListener("DOMContentLoaded", init);
