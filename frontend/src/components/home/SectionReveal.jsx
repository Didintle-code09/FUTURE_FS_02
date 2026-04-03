import { useEffect, useRef, useState } from 'react';

function SectionReveal({
  as: Tag = 'section',
  children,
  className = '',
  id,
  trackSection = true,
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      className={`reveal-section ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      id={id}
      ref={sectionRef}
      {...(trackSection ? { 'data-section': true } : {})}
    >
      {children}
    </Tag>
  );
}

export default SectionReveal;
