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

function renderProjects(projects = []) {
    const container = document.getElementById("projects-container");
    container.innerHTML = "";

    for (const project of projects) {
        const card = el("div", "card-flat mt-4");
        
        const titleLine = el("div", "d-flex justify-content-between align-items-center");
        const title = el("div", "section-title mb-0", project.title || "Untitled Project");
        titleLine.appendChild(title);

        if (project.link && project.link !== "#") {
            const link = el("a", "btn btn-sm btn-outline-primary", "View Project");
            link.href = project.link;
            link.target = "_blank";
            link.rel = "noopener";
            titleLine.appendChild(link);
        }
        
        card.appendChild(titleLine);

        if (project.summary) {
            card.appendChild(el("p", "mt-3 mb-0 summary-text", project.summary));
        }

        if (Array.isArray(project.details) && project.details.length > 0) {
            const ul = el("ul", "mt-3 mb-0 job-bullets");
            for (const detail of project.details) {
                ul.appendChild(el("li", "", detail));
            }
            card.appendChild(ul);
        }

        if (Array.isArray(project.technologies) && project.technologies.length > 0) {
            const pillsWrap = el("div", "mt-3");
            for (const t of project.technologies) {
                pillsWrap.appendChild(el("span", "pill", t));
            }
            card.appendChild(pillsWrap);
        }

        container.appendChild(card);
    }
}

async function init() {
    try {
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

        renderProjects(projects);
    } catch (err) {
        console.error(err);
        const container = document.getElementById("projects-container");
        if (container) {
            container.innerHTML = `<div class="alert alert-danger mt-4">Failed to load projects.</div>`;
        }
    }
}

document.addEventListener("DOMContentLoaded", init);
