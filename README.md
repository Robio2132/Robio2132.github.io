# Solo-Sprint 2: Personal Portfolio

---

## **Abstract**

This sprint focuses on creating an interactive and responsive personal portfolio website, hosted on GitHub Pages.  
The objective of this sprint is to show a fundamental understanding of HTML, CSS, JavaScript, and GitHub Pages.  

I developed a multi-section layout with smooth scrolling, fade-in animations, funny games developed in JavaScript that hold relevance to myself and my hireability, and an interactive 3D Pac-Man and ghosts render using Three.js.  

The site is successfully deployed through GitHub Pages, maintaining high performance and visual consistency across browsers, and adheres to SOLID principles and coding designs while maintaining low or inconsequential code smells.  

---

## **Results**

**Home pages of the GitHub Pages Website:**  
🔗 [https://robio2132.github.io](https://robio2132.github.io)

---

The final product of this sprint was a fully deployed and interactive portfolio website, hosted on GitHub Pages.  
The portfolio presents a clean, responsive design that adapts seamlessly across devices, from mobile to desktop.  

It includes multiple sections: **Home, About, Projects, Skills, and Games.** Each section is enhanced with smooth fade-in animations triggered by the JavaScript Intersection Observer API.  

The highlight of the homepage is a dynamic **3D Pac-Man Ghost model** rendered through Three.js, which rotates and hovers to create a visually engaging introduction.  
Additionally, the site features playable JavaScript-based games, such as **Flappy Bird** and **Space Invaders**, that have been modified to include images of myself and my resume.  
This gives my portfolio both a creative and technical flair.  

The code across my portfolio project was developed with clear adherence to the **SOLID principles** of software design, emphasizing readability, modularity, and maintainability.  
Each file follows the **Single Responsibility Principle**, with HTML managing structure, CSS handling styling, and JavaScript implementing interactivity — both in the functionality of the portfolio code and within the game logic code.  

Within the scripts, functions are concise and self-contained, making the code both easy to extend and test.  
For example, the `moveInvaders()`, `shoot()`, and `update()` functions inside `app.js` in the Space Invader file each handle distinct gameplay responsibilities without unnecessary overlap, aligning with **Open/Closed** and **Interface Segregation** principles.  

The design avoids deep nesting, global dependencies, and redundant logic, reducing the risk of **code smells** such as long methods or tight coupling.  
Minor unavoidable duplication (like repeated draw or reset calls across game files) is acceptable within a lightweight client-side context, as it improves clarity and debugging simplicity.  

Overall, the codebase demonstrates clean structure, maintainable logic, and thoughtful adherence to software engineering best practices without unnecessary abstraction.  

The site was implemented and deployed through **GitHub** using a live repository for version control and collaboration.  
I organized the project structure with separate folders for images, JavaScript scripts, and game files, maintaining relative paths to ensure all assets loaded properly in the hosted environment.  

Once the core design and functionality were finalized, I pushed all changes to the main branch of my repository and configured **GitHub Pages** for automatic deployment.  
I then did follow-up pushes for debugging and additional features.  

Debugging layout issues within the hosted environment helped me understand how GitHub Pages serves static content and caches CSS and JavaScript files.  
The final deployment reflects a professional, creative, and technically robust website that demonstrates both **front-end design skill** and **problem-solving persistence**.  

---

## **Reflection**

This sprint challenged me to combine both front-end creativity and technical execution in a live web environment.  

In the base project, I learned how to properly structure and host multi-file JavaScript applications on GitHub Pages, troubleshoot 3D rendering issues, and implement user-friendly transitions.  
I grew more familiar with transitioning through GitHub and how SOLID design adheres to HTML, CSS, and JavaScript.  

For debugging and extensions, CSS scaling and ensuring full-width responsiveness on hosted pages taught me about browser rendering contexts, caching behavior, and relative vs. absolute paths.  
I also deepened my understanding of how asynchronous loading works for 3D assets and scripts like GLTF models.  

Debugging was a nightmare because my designs in the live server were not transferring well to GitHub Pages, which required me to further my code’s sophistication to account for these issues.  

If I had more time, I would have implemented a full 3D environment into the world — I plan on doing this outside of the assignment someday.  

---

## **Extensions**

### 3D Pac-Man Ghost Integration

One of the main extensions I pursued was the integration of a **3D Pac-Man Ghost model** into the homepage using **Three.js**.  
This was an ambitious addition designed to introduce depth, movement, and interactivity to the site’s landing section.  

I used `GLTFLoader` to import and render the 3D model, applied lighting to enhance dimensional realism, and programmed smooth rotational animation using JavaScript’s animation loop.  
This process required adjusting object centering, camera position, and scaling to ensure the ghost fit naturally within the scene without clipping.  

I learned how to do this from a [YouTube tutorial](https://www.youtube.com/watch?v=lGokKxJ8D2c) and its corresponding [GitHub repository](https://github.com/gjmolter/web-3dmodel-threejs).  
The final result created an interactive focal point that reflected both my technical interests and design creativity.  

**3D Model Author:**  
- Pac-Man Ghost by [Elina_ailurophile on Sketchfab](https://sketchfab.com/3d-models/pacman-ghost-a1c987366ca54b098ca24adfe374aa44)

---

### Custom JavaScript Games

Two other major extensions involved the creation and embedding of **custom JavaScript mini-games**, including **Flappy Bird** and **Space Invaders**.  
Each game was coded using HTML, CSS, and JavaScript, and integrated into the portfolio through a clean overlay system that launches the game in a full-screen modal when selected.  

This feature demonstrated my ability to build **event-driven, object-oriented JavaScript applications** while providing an engaging way for visitors to explore my coding projects and credentials.  
These games not only showcase logic and interaction design but also serve as practical demonstrations of real-time rendering, keyboard input handling, and animation synchronization within a browser environment.  

**Flappy Bird Tutorial and Source:**  
- [YouTube Video](https://www.youtube.com/watch?v=jj5ADM2uywg)  
- [GitHub Repository](https://github.com/ImKennyYip/flappy-bird)  

**Space Invaders Tutorial:**  
- [YouTube Video](https://www.youtube.com/watch?v=ec8vSKJuZTk)  

---

### Fade-In Transition System

Another extension is the fade-in transition system that was implemented to make navigation between sections smooth and visually appealing.  

Using the **Intersection Observer API**, I programmed animations that trigger when elements come into the viewport, gradually increasing their opacity and translating their position upward.  

This technique replaced static scrolling with a sense of progression and depth, improving the overall user experience.  
Implementing this feature helped reinforce my understanding of DOM observation, scroll behavior optimization, and animation performance tuning to maintain fluidity across devices.  

---

### Original Template and Design System

I built the portfolio layout, typography system, and responsive grid completely from scratch instead of relying on pre-built frameworks like **Bootstrap** or **Figma templates**.  
I used consistent accent colors, spacing ratios, and text hierarchy to create a unified brand identity.  

This approach gave me full control over the site’s aesthetic, encouraged me to think critically about **visual accessibility**, and emphasized how small adjustments in layout and typography can change a user’s perception of professionalism and polish.  

All of this was done with the intention of growing my understanding of **website design without reliance on frameworks** as a crutch.  

I also made a detailed **Markdown documentation file** in the repository, which was not required by the base project.  

---

## **References and AI Usage Statement**

The project description recommended the following YouTube tutorials to learn more about JavaScript.  
Additionally, I used these YouTube videos to learn more about implementing the games and 3D visuals for this website.  

I also linked their GitHub repositories that were associated with the videos.  
I followed the tutorials, but the inclusion of their code as reference material was extremely helpful for maintaining correctness and receiving certain image assets (especially for **Flappy Bird**).  

**Citations Summary:**
- [Flappy Bird YouTube Tutorial](https://www.youtube.com/watch?v=jj5ADM2uywg)  
- [Flappy Bird GitHub Repository](https://github.com/ImKennyYip/flappy-bird)  
- [Space Invaders YouTube Tutorial](https://www.youtube.com/watch?v=ec8vSKJuZTk)  
- [Three.js 3D Model Integration Video](https://www.youtube.com/watch?v=lGokKxJ8D2c)  
- [Three.js GitHub Repository](https://github.com/gjmolter/web-3dmodel-threejs)  
- [Pac-Man Ghost 3D Model on Sketchfab](https://sketchfab.com/3d-models/pacman-ghost-a1c987366ca54b098ca24adfe374aa44)  

---

### **AI and Research Usage**

AI was used to automate repetitive tasks, such as repeating the logic of creating similar buttons and explaining why CSS code was not producing the desired effects.  
There were also general Google searches used to troubleshoot bugs encountered during translation from my local environment to GitHub Pages.  

I also conferred with **Professor Al Madi** during office hours and checked **lecture slides** for advice and best practices throughout the sprint.  

---

**End of Report**
