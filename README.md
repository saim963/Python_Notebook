# Python Notebook Playground 🚀

A complete, beautiful, production-ready static website to showcase and run your Python notebook entirely in the browser using [JupyterLite](https://jupyterlite.readthedocs.io/en/latest/) and WebAssembly.

## 📁 Repository Structure

Your project should look like this:
```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml        <-- GitHub Action for 1-click deployment!
├── static/
│   ├── script.js             <-- Site interactivity & animations
│   └── style.css             <-- Custom Tailwind + UI Styles
├── index.html                <-- Beautiful Landing Page
├── jupyter-lite.json         <-- Environment configuration
├── python_notebook.ipynb     <-- 🚨 YOUR NOTEBOOK GOES HERE 🚨
├── requirements.txt          <-- Required pip packages for Pyodide
└── README.md
```

## 🚀 How to Add Your Real Notebook

1. **Replace the notebook**: Delete the placeholder `python_notebook.ipynb` and upload your real Google Colab notebook into this repository. **Make sure it is named exactly `python_notebook.ipynb`**. 
   *(If your notebook has a different name, rename it OR update the `index.html` line where `iframe.src = 'lab/index.html?path=python_notebook.ipynb'`)*
2. **Update requirements**: Open `requirements.txt` and ensure every package your notebook uses (like `numpy`, `pandas`, `scipy`) is listed there. Pyodide will use this to preload the environment.

## 🌍 How to Deploy to GitHub Pages (One Click!)

This project is built to rely on JupyterLite's GitHub Action builder. You do not need to build anything locally!

1. Create a repository on GitHub and upload all these files.
2. In your GitHub repository, go to **Settings > Pages**.
3. Under **Source**, change it from "Deploy from a branch" to **"GitHub Actions"**.
4. GitHub will automatically detect the `.github/workflows/deploy.yml` file and start building your JupyterLite static site.
5. Wait ~2-3 minutes for the Action to complete.
6. Open your GitHub Pages URL — you will see your gorgeous custom landing page, and clicking "Launch Notebook" will magically boot up JupyterLab in the browser!

## 🎨 Customizing the Landing Page

To change the title, description, or subtitle, just open `index.html` and edit the HTML elements under `<header id="hero">`. It uses Tailwind CSS so you can easily modify colors by changing the classes (e.g., `text-blue-500`).

## ✨ Features included
- **Client-side execution:** Zero server costs.
- **Dark/Light Mode:** Saves to `localStorage`.
- **Responsive:** Looks great on mobile devices.
- **Shareable Hash URLs:** Send people `yourwebsite.com/#notebook` and it skips the hero page and loads the IDE instantly.
- **Toolbar:** Native restart kernel and download mechanics built right into your wrapper UI.
