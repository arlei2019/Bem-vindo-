/**
 * ÁRLEI BATISTA - PORTFÓLIO 2025
 * JavaScript Interativo e Moderno
 */

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCursor();
    initNavigation();
    initScrollAnimations();
    initRoleAnimation();
    initCounters();
    initSkillTabs();
    initContactForm();
    initBackToTop();
    initThemeToggle();
    initSmoothScroll();
});

// ============================================
// SISTEMA DE PARTÍCULAS
// ============================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let isActive = true;
    
    // Configurações
    const config = {
        particleCount: window.innerWidth < 768 ? 25 : 50,
        connectionDistance: 150,
        mouseDistance: 200,
        speed: 0.5,
        size: 2
    };
    
    // Redimensionar canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Classe Particle
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * config.speed;
            this.vy = (Math.random() - 0.5) * config.speed;
            this.size = Math.random() * config.size + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce nas bordas
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Criar partículas
    for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Mouse tracking
    let mouse = { x: null, y: null };
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Desenhar conexões
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.connectionDistance) {
                    const opacity = (1 - distance / config.connectionDistance) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
            
            // Conexão com o mouse
            if (mouse.x && mouse.y) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.mouseDistance) {
                    const opacity = (1 - distance / config.mouseDistance) * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Loop de animação
    let frameCount = 0;
    function animate() {
        if (!isActive) return;
        
        // Renderizar a cada 2 frames para performance
        frameCount++;
        if (frameCount % 2 === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            drawConnections();
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Pausar quando não visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isActive = false;
            cancelAnimationFrame(animationId);
        } else {
            isActive = true;
            animate();
        }
    });
    
    animate();
}

// ============================================
// CURSOR PERSONALIZADO
// ============================================
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animação suave
    function animateCursor() {
        // Cursor principal (rápido)
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX - 6 + 'px';
        cursor.style.top = cursorY - 6 + 'px';
        
        // Follower (mais lento)
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX - 20 + 'px';
        follower.style.top = followerY - 20 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Efeito em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
            follower.style.borderColor = 'var(--secondary)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = 'var(--primary)';
        });
    });
}

// ============================================
// NAVEGAÇÃO
// ============================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect no navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Menu mobile toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Active link baseado na seção
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animar barras de habilidade
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos
    document.querySelectorAll('.section-header, .about-content, .skill-card, .project-card, .contact-content').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
    
    // Stagger animation para cards
    document.querySelectorAll('.skills-grid, .projects-grid').forEach(grid => {
        const items = grid.querySelectorAll('.skill-card, .project-card');
        items.forEach((item, index) => {
            item.classList.add('stagger-item');
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    });
}

// Animar barras de habilidade
function animateSkillBars(container) {
    const bars = container.querySelectorAll('.skill-progress');
    bars.forEach(bar => {
        const progress = bar.dataset.progress;
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200);
    });
}

// ============================================
// ANIMAÇÃO DE ROLE (TYPING EFFECT)
// ============================================
function initRoleAnimation() {
    const words = document.querySelectorAll('.role-word');
    if (words.length === 0) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        words[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % words.length;
        words[currentIndex].classList.add('active');
    }, 2500);
}

// ============================================
// CONTADORES ANIMADOS
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ============================================
// TABS DE HABILIDADES
// ============================================
function initSkillTabs() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const skillGrids = document.querySelectorAll('.skills-grid');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Atualizar botões
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Atualizar grids
            skillGrids.forEach(grid => {
                grid.classList.remove('active');
                if (grid.dataset.category === category) {
                    grid.classList.add('active');
                    animateSkillBars(grid);
                }
            });
        });
    });
}

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const success = document.getElementById('form-success');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular envio
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        setTimeout(() => {
            form.style.display = 'none';
            success.classList.add('show');
            
            // Reset após 5 segundos
            setTimeout(() => {
                form.reset();
                form.style.display = 'grid';
                success.classList.remove('show');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 5000);
        }, 1500);
    });
}

// ============================================
// BOTÃO VOLTAR AO TOPO
// ============================================
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// THEME TOGGLE
// ============================================
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    
    const icon = toggle.querySelector('i');
    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// PERFORMANCE: REDUZIR ANIMAÇÕES QUANDO NECESSÁRIO
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Olá, curioso!', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%cBem-vindo ao meu portfólio! Quer ver o código fonte? Visite meu GitHub:', 'font-size: 14px; color: #666;');
console.log('%chttps://github.com/arlei2019', 'font-size: 14px; color: #00d4ff; text-decoration: underline;');
