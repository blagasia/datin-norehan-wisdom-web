
import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create petals and leaves
    const elements: FloatingElement[] = [];
    const elementCount = Math.min(50, Math.floor(window.innerWidth / 40)); // Fewer elements than particles
    
    class FloatingElement {
      x: number;
      y: number;
      type: 'petal' | 'leaf';
      size: number;
      speedX: number;
      speedY: number;
      rotationSpeed: number;
      rotation: number;
      color: string;
      opacity: number;
      sway: number;
      swaySpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.type = Math.random() > 0.3 ? 'petal' : 'leaf';
        this.size = this.type === 'petal' 
          ? Math.random() * 10 + 5 // Petals a bit larger
          : Math.random() * 8 + 6; // Leaves
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.5 + 0.2; // Fall downward more
        this.rotationSpeed = (Math.random() * 0.02 - 0.01);
        this.rotation = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.sway = 0;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        
        // Colors for petals and leaves
        if (this.type === 'petal') {
          const petalColors = [
            'rgba(255, 222, 226, 0.8)', // Soft Pink
            'rgba(253, 225, 211, 0.7)', // Soft Peach
            'rgba(233, 209, 219, 0.8)', // brand-blush-rose
            'rgba(226, 223, 244, 0.7)', // brand-lavender-mist
            'rgba(229, 222, 255, 0.7)', // Soft Purple
          ];
          this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        } else {
          const leafColors = [
            'rgba(210, 223, 205, 0.7)', // brand-sage-mist
            'rgba(242, 252, 226, 0.6)', // Soft Green
            'rgba(184, 160, 132, 0.5)', // brand-creamy-ivory
            'rgba(222, 238, 216, 0.6)', // Lighter green
          ];
          this.color = leafColors[Math.floor(Math.random() * leafColors.length)];
        }
      }

      update() {
        // Update position with gentle sway
        this.sway += this.swaySpeed;
        this.x += this.speedX + Math.sin(this.sway) * 0.3;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Reset when off screen
        if (this.y > canvas.height + this.size) {
          this.y = -this.size * 2;
          this.x = Math.random() * canvas.width;
          this.speedY = Math.random() * 0.5 + 0.2;
        }

        // Wrap around sides
        if (this.x > canvas.width + this.size) {
          this.x = -this.size;
        } else if (this.x < -this.size) {
          this.x = canvas.width + this.size;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        
        if (this.type === 'petal') {
          // Draw a petal shape
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw a leaf shape
          ctx.beginPath();
          // Leaf body
          ctx.ellipse(0, 0, this.size / 2, this.size, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Leaf vein
          ctx.strokeStyle = `rgba(184, 160, 132, ${this.opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.lineTo(0, this.size);
          ctx.stroke();
        }
        
        ctx.restore();
      }
    }

    // Initialize floating elements
    for (let i = 0; i < elementCount; i++) {
      elements.push(new FloatingElement());
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      elements.forEach(element => {
        element.update();
        element.draw();
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};

export default AnimatedBackground;
