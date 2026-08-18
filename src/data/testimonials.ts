export type TestimonialLang = 'es' | 'en' | 'de' | 'fr';

export interface Testimonial {
	id: string;
	name: string;
	location: string;
	lang: TestimonialLang;
	quote: string;
	stars: 4 | 5;
}

export const TESTIMONIALS: Testimonial[] = [];
