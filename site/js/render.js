async function loadProfile() {
    const res = await fetch("./data/profile.json", {cache: "no-store"});
    if (!res.ok) throw new Error("Failed to load ./data/profile.json");
    return res.json();
}

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
}

function renderButtons(buttons = []) {
    const container = document.getElementById("headerButtons");
    container.innerHTML = "";

    for (const b of buttons) {
        const a = document.createElement("a");
        a.href = b.href || "#";
        a.className = b.class || "btn btn-primary";
        a.target = "_blank";
        a.rel = "noopener";

        if (b.icon) {
            const i = document.createElement("i");
            i.className = `${b.icon} me-2`;
            a.appendChild(i);
        }

        a.appendChild(document.createTextNode(b.text || "Link"));
        container.appendChild(a);
    }
}

function renderMeta(meta = []) {
    const container = document.getElementById("meta");
    container.innerHTML = "";

    for (const item of meta) {
        const row = el("div", "mb-2");

        const icon = el("i", item.icon || "fa-solid fa-circle-info");
        row.appendChild(icon);

        if (item.link) {
            const a = el("a", "clean-link", item.text || "");
            a.href = item.link;
            row.appendChild(a);
        } else {
            row.appendChild(document.createTextNode(item.text || ""));
        }

        container.appendChild(row);
    }
}

function renderExperience(experience = []) {
    const container = document.getElementById("experience");
    container.innerHTML = "";

    for (const job of experience) {
        const jobWrap = el("div", "job");

        const header = el("div", "job-header");
        header.appendChild(el("p", "job-title", job.title || ""));
        
        // Parsing meta for better layout if possible
        // Current meta format: "Company, Location (Type, Dates)"
        const metaParts = (job.meta || "").split(",");
        const company = metaParts[0] ? metaParts[0].trim() : "";
        const rest = metaParts.slice(1).join(",").trim();

        header.appendChild(el("span", "job-meta", company));
        jobWrap.appendChild(header);

        if (rest) {
            jobWrap.appendChild(el("div", "job-location-date", rest));
        }

        if (job.description) {
            jobWrap.appendChild(el("div", "job-desc", job.description));
        }

        if (Array.isArray(job.bullets) && job.bullets.length > 0) {
            const ul = el("ul", "job-bullets");
            for (const bullet of job.bullets) {
                ul.appendChild(el("li", "", bullet));
            }
            jobWrap.appendChild(ul);
        }

        // Combine tags/technologies/skills into one pill list
        const pills = []
            .concat(Array.isArray(job.tags) ? job.tags : [])
            .concat(Array.isArray(job.technologies) ? job.technologies : [])
            .concat(Array.isArray(job.skills) ? job.skills : []);

        if (pills.length > 0) {
            const pillsWrap = el("div", "mt-3");
            // Remove duplicates
            const uniquePills = [...new Set(pills)];
            for (const t of uniquePills) {
                pillsWrap.appendChild(el("span", "pill", t));
            }
            jobWrap.appendChild(pillsWrap);
        }

        container.appendChild(jobWrap);
    }
}

function renderEducation(education = []) {
    const container = document.getElementById("education");
    container.innerHTML = "";

    for (const e of education) {
        const wrap = el("div", "edu-item d-flex flex-column gap-1");
        wrap.appendChild(el("div", "fw-bold", e.school || ""));
        wrap.appendChild(el("div", "text-primary fw-medium", e.degree || ""));
        if (e.faculty) {
            wrap.appendChild(el("div", "text-muted small", e.faculty));
        }
        container.appendChild(wrap);
    }
}

async function initRender() {
    try {
        const data = await loadProfile();

        document.getElementById("name").textContent = data.name || "";
        document.getElementById("role").textContent = data.role || "";
        document.getElementById("footerName").textContent = data.name || "";

        if (data.avatar) {
            const avatar = document.getElementById("avatar");
            avatar.src = data.avatar;
            avatar.alt = data.name || "Profile";
        }

        renderButtons(data.buttons);
        renderMeta(data.meta);
        document.getElementById("summary").textContent = data.summary || "";

        renderExperience(data.experience);
        renderEducation(data.education);
    } catch (err) {
        console.error(err);
        const summary = document.getElementById("summary");
        if (summary) summary.textContent = "Failed to load profile data. Check profile.json and console.";
    }
}

document.addEventListener("DOMContentLoaded", initRender);
