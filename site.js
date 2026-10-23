"use strict";
const p = window.profile;
const el = (tag, text, cls) => { const n = document.createElement(tag); n.textContent = text; if (cls) n.className = cls; return n; };
const safeLink = value => { try { const u = new URL(value, location.href); return ["https:", "http:"].includes(u.protocol) ? u.href : null; } catch { return null; } };
document.querySelector("#profile-name").textContent = p.name;
document.querySelector("#hero-name").textContent = p.name;
document.title = p.name + " | Transportation Engineering";
document.querySelector("#profile-role").textContent = p.role;
document.querySelector("#profile-school").textContent = p.school;
p.biography.forEach(text => document.querySelector("#biography").append(el("p", text)));
if (p.photo && safeLink(p.photo)) {
  const img = new Image(); img.alt = p.name; img.src = safeLink(p.photo);
  img.onload = () => document.querySelector("#portrait").replaceChildren(img);
}
if (p.cv && safeLink(p.cv)) { const link = document.querySelector("#cv-link"); link.href = safeLink(p.cv); link.hidden = false; }
p.education.forEach(item => {
  const row = el("article", "", "record");
  if (item.years) row.append(el("p", item.years, "record-date"));
  row.append(el("h3", item.degree), el("p", item.institution, "muted")); document.querySelector("#education-list").append(row);
});
function empty(id, message) { document.querySelector(id).append(el("p", message, "empty")); }
if (!p.publications.length) empty("#publication-list", "Publications will be listed here as they become available.");
p.publications.forEach((item, i) => {
  const row = el("article", "", "record paper"); row.append(el("span", String(i + 1).padStart(2, "0"), "paper-number"));
  const body = el("div", ""); const title = el("h3", "");
  const href = safeLink(item.url); if (href) { const a = el("a", item.title + " ↗"); a.href = href; title.append(a); } else title.textContent = item.title;
  body.append(title, el("p", item.authors, "muted"), el("p", item.venue, "venue")); row.append(body); document.querySelector("#publication-list").append(row);
});
if (!p.updates.length) empty("#update-list", "Academic news and research updates will appear here.");
p.updates.forEach(item => { const row = el("article", "", "update"); row.append(el("span", item.date, "record-date"), el("p", item.text)); document.querySelector("#update-list").append(row); });
document.querySelector("#year").textContent = new Date().getFullYear();
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const sections = [...document.querySelectorAll("main section")];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    document.querySelectorAll("nav a").forEach(a => a.classList.toggle("active", a.hash === "#" + entry.target.id));
  }
}), { rootMargin: "-15% 0px -60% 0px" });
sections.forEach(s => observer.observe(s));
function progress() { const total = document.documentElement.scrollHeight - innerHeight; document.querySelector(".reading-progress").style.width = (total > 0 ? scrollY / total * 100 : 0) + "%"; }
addEventListener("scroll", progress, {passive:true}); progress();
if (!reducedMotion) document.querySelectorAll(".section-heading, .record, .empty").forEach((n,i) => n.animate([{opacity:0,transform:"translateY(12px)"},{opacity:1,transform:"translateY(0)"}],{duration:650,delay:Math.min(i*70,450),fill:"backwards"}));
